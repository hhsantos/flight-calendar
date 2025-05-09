import { type NextRequest, NextResponse } from "next/server"
import {
  getReservas,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
  getReservasPorFecha,
  actualizarEstadoAvion,
} from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET - Obtener todas las reservas o filtrar por fecha
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  // Verificar autenticación
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // Obtener parámetros de consulta
  const searchParams = request.nextUrl.searchParams
  const fecha = searchParams.get("fecha")

  try {
    // Si se proporciona fecha, filtrar por fecha
    const reservas = fecha ? getReservasPorFecha(fecha) : getReservas()

    return NextResponse.json(reservas)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener reservas" }, { status: 500 })
  }
}

// POST - Crear una nueva reserva
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  // Verificar autenticación
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Validar datos requeridos
    if (!data.avionId || !data.fecha || !data.horaInicio || !data.horaFin) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    // Crear la reserva
    const nuevaReserva = crearReserva({
      usuarioId: (session.user as any).id,
      avionId: data.avionId,
      fecha: data.fecha,
      horaInicio: data.horaInicio,
      horaFin: data.horaFin,
      estado: "pendiente",
      notas: data.notas,
    })

    // Actualizar estado del avión a reservado
    actualizarEstadoAvion(data.avionId, "reservado")

    return NextResponse.json(nuevaReserva, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear la reserva" }, { status: 500 })
  }
}

// PUT - Actualizar una reserva existente
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  // Verificar autenticación
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Validar ID de reserva
    if (!data.id) {
      return NextResponse.json({ error: "ID de reserva requerido" }, { status: 400 })
    }

    // Actualizar la reserva
    const reservaActualizada = actualizarReserva(data.id, {
      fecha: data.fecha,
      horaInicio: data.horaInicio,
      horaFin: data.horaFin,
      estado: data.estado,
      notas: data.notas,
    })

    if (!reservaActualizada) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 })
    }

    return NextResponse.json(reservaActualizada)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la reserva" }, { status: 500 })
  }
}

// DELETE - Eliminar una reserva
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  // Verificar autenticación
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // Obtener ID de la reserva
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID de reserva requerido" }, { status: 400 })
  }

  try {
    // Eliminar la reserva
    const resultado = eliminarReserva(id)

    if (!resultado) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar la reserva" }, { status: 500 })
  }
}
