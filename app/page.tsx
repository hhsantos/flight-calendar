import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Users, CalendarIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-rose-600" />
            <h1 className="text-xl font-bold">Ala2 Club de Vuelo</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="font-medium">
              Inicio
            </Link>
            <Link href="/reservas" className="font-medium">
              Reservas
            </Link>
            <Link href="/aviones" className="font-medium">
              Aviones
            </Link>
          </nav>
          <div>
            <Link href="/api/auth/signin">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Sistema de Reservas del Club de Vuelo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gestiona tus reservas de vuelo de manera sencilla. Consulta disponibilidad, reserva aviones y administra
              tu calendario de vuelo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Plane className="h-5 w-5 mr-2 text-rose-600" />
                  Flota de Aviones
                </CardTitle>
                <CardDescription>Consulta nuestra flota disponible</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Disponemos de varios modelos para diferentes necesidades de vuelo.</p>
                <Link href="/aviones">
                  <Button variant="outline" className="w-full">
                    Ver Aviones
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-rose-600" />
                  Reservas
                </CardTitle>
                <CardDescription>Gestiona tus reservas de vuelo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Consulta disponibilidad y reserva en nuestro calendario interactivo.</p>
                <Link href="/reservas">
                  <Button variant="outline" className="w-full">
                    Ir al Calendario
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-rose-600" />
                  Mi Perfil
                </CardTitle>
                <CardDescription>Gestiona tu cuenta de usuario</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Accede a tu historial de vuelos y gestiona tus datos personales.</p>
                <Link href="/perfil">
                  <Button variant="outline" className="w-full">
                    Mi Perfil
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Próximas Disponibilidades</h3>
            <p className="text-muted-foreground mb-6">
              Consulta las fechas disponibles para los próximos días y planifica tu vuelo con antelación.
            </p>
            <Link href="/reservas">
              <Button className="bg-rose-600 hover:bg-rose-700">Reservar Ahora</Button>
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <Calendar mode="single" className="rounded-md" />
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Plane className="h-5 w-5 text-rose-600" />
              <span className="font-semibold">Ala2 Club de Vuelo</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Club de Vuelo. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
