import fs from "fs"
import path from "path"

// Tipos para nuestros datos
export type Usuario = {
  id: string
  nombre: string
  email: string
  rol: "admin" | "piloto" | "instructor"
}

export type Avion = {
  id: string
  modelo: string
  matricula: string
  estado: "disponible" | "mantenimiento" | "reservado"
  asientos: number
  potencia: string
  velocidadCrucero: string
  autonomia: string
  descripcion: string
}

export type Reserva = {
  id: string
  usuarioId: string
  avionId: string
  fecha: string // ISO date string
  horaInicio: string
  horaFin: string
  estado: "pendiente" | "confirmada" | "cancelada" | "completada"
  notas?: string
}

// Estructura de nuestra base de datos
type Database = {
  usuarios: Usuario[]
  aviones: Avion[]
  reservas: Reserva[]
}

// Ruta a nuestro archivo JSON
const DB_PATH = path.join(process.cwd(), "data/db.json")

// Función para inicializar la base de datos si no existe
export function initDatabase() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: Database = {
      usuarios: [
        {
          id: "1",
          nombre: "Administrador",
          email: "admin@aeroclub.com",
          rol: "admin",
        },
      ],
      aviones: [
        {
          id: "1",
          modelo: "Cessna 152",
          matricula: "EC-ABC",
          estado: "disponible",
          asientos: 2,
          potencia: "110 HP",
          velocidadCrucero: "95 kts",
          autonomia: "4 horas",
          descripcion: "Avión biplaza ideal para formación básica y vuelos locales.",
        },
        {
          id: "2",
          modelo: "Cessna 172",
          matricula: "EC-DEF",
          estado: "mantenimiento",
          asientos: 4,
          potencia: "160 HP",
          velocidadCrucero: "122 kts",
          autonomia: "5 horas",
          descripcion: "Avión de cuatro plazas perfecto para viajes y formación avanzada.",
        },
        {
          id: "3",
          modelo: "Piper PA-28",
          matricula: "EC-GHI",
          estado: "disponible",
          asientos: 4,
          potencia: "180 HP",
          velocidadCrucero: "135 kts",
          autonomia: "5.5 horas",
          descripcion: "Avión versátil de cuatro plazas con excelente rendimiento para viajes.",
        },
      ],
      reservas: [],
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2))
  }
}

// Función para leer la base de datos
export function getDatabase(): Database {
  initDatabase()
  const data = fs.readFileSync(DB_PATH, "utf-8")
  return JSON.parse(data)
}

// Función para escribir en la base de datos
export function writeDatabase(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// Funciones para usuarios
export function getUsuarios(): Usuario[] {
  return getDatabase().usuarios
}

export function getUsuarioPorId(id: string): Usuario | undefined {
  return getDatabase().usuarios.find((usuario) => usuario.id === id)
}

export function crearUsuario(usuario: Omit<Usuario, "id">): Usuario {
  const db = getDatabase()
  const nuevoUsuario: Usuario = {
    id: Date.now().toString(),
    ...usuario,
  }
  db.usuarios.push(nuevoUsuario)
  writeDatabase(db)
  return nuevoUsuario
}

// Funciones para aviones
export function getAviones(): Avion[] {
  return getDatabase().aviones
}

export function getAvionPorId(id: string): Avion | undefined {
  return getDatabase().aviones.find((avion) => avion.id === id)
}

export function actualizarEstadoAvion(id: string, estado: Avion["estado"]) {
  const db = getDatabase()
  const index = db.aviones.findIndex((avion) => avion.id === id)
  if (index !== -1) {
    db.aviones[index].estado = estado
    writeDatabase(db)
    return db.aviones[index]
  }
  return undefined
}

// Funciones para reservas
export function getReservas(): Reserva[] {
  return getDatabase().reservas
}

export function getReservasPorUsuario(usuarioId: string): Reserva[] {
  return getDatabase().reservas.filter((reserva) => reserva.usuarioId === usuarioId)
}

export function getReservasPorAvion(avionId: string): Reserva[] {
  return getDatabase().reservas.filter((reserva) => reserva.avionId === avionId)
}

export function getReservasPorFecha(fecha: string): Reserva[] {
  return getDatabase().reservas.filter((reserva) => {
    // Comparamos solo la fecha (no la hora)
    return reserva.fecha.split("T")[0] === fecha.split("T")[0]
  })
}

export function crearReserva(reserva: Omit<Reserva, "id">): Reserva {
  const db = getDatabase()
  const nuevaReserva: Reserva = {
    id: Date.now().toString(),
    ...reserva,
  }
  db.reservas.push(nuevaReserva)
  writeDatabase(db)
  return nuevaReserva
}

export function actualizarReserva(id: string, datos: Partial<Reserva>): Reserva | undefined {
  const db = getDatabase()
  const index = db.reservas.findIndex((reserva) => reserva.id === id)
  if (index !== -1) {
    db.reservas[index] = { ...db.reservas[index], ...datos }
    writeDatabase(db)
    return db.reservas[index]
  }
  return undefined
}

export function eliminarReserva(id: string): boolean {
  const db = getDatabase()
  const index = db.reservas.findIndex((reserva) => reserva.id === id)
  if (index !== -1) {
    db.reservas.splice(index, 1)
    writeDatabase(db)
    return true
  }
  return false
}
