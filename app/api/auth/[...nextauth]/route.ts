import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUsuarioPorId, getUsuarios, crearUsuario } from "@/lib/db"

// Configuración de NextAuth
export const authOptions = {
  providers: [
    // Proveedor de Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Proveedor de credenciales para desarrollo/pruebas
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Esto es solo para desarrollo, en producción usaríamos autenticación real
        if (!credentials?.email || !credentials?.password) return null

        // Buscar usuario en nuestra base de datos JSON
        const usuarios = getUsuarios()
        const usuario = usuarios.find((u) => u.email === credentials.email)

        // En un entorno real, verificaríamos la contraseña con hash
        if (usuario) {
          return {
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.email,
            role: usuario.rol,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Añadir datos personalizados al token
      if (user) {
        token.userId = user.id
        token.role = (user as any).role || "piloto" // Por defecto, rol de piloto
      }
      return token
    },
    async session({ session, token }) {
      // Añadir datos personalizados a la sesión
      if (session.user) {
        ;(session.user as any).id = token.userId(session.user as any).role = token.role
      }
      return session
    },
    async signIn({ user, account }) {
      // Si el usuario inicia sesión con un proveedor externo y no existe en nuestra BD
      if (account?.provider === "google") {
        const existingUser = getUsuarioPorId(user.id)

        if (!existingUser && user.email) {
          // Crear nuevo usuario en nuestra base de datos
          crearUsuario({
            nombre: user.name || "Usuario",
            email: user.email,
            rol: "piloto", // Por defecto, asignamos rol de piloto
          })
        }
      }

      return true
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
