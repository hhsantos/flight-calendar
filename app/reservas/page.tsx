"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Clock, Plane } from "lucide-react"

// Datos de ejemplo - esto vendría de nuestro JSON
const avionesDisponibles = [
  { id: "1", modelo: "Cessna 152", matricula: "EC-ABC" },
  { id: "2", modelo: "Cessna 172", matricula: "EC-DEF" },
  { id: "3", modelo: "Piper PA-28", matricula: "EC-GHI" },
]

const reservasExistentes = [
  { id: "1", avionId: "1", fecha: new Date(2023, 4, 15), horaInicio: "10:00", horaFin: "12:00", piloto: "Juan Pérez" },
  { id: "2", avionId: "2", fecha: new Date(2023, 4, 16), horaInicio: "14:00", horaFin: "16:00", piloto: "Ana García" },
]

export default function ReservasPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedAvion, setSelectedAvion] = useState<string>("")
  const [reservaDialogOpen, setReservaDialogOpen] = useState(false)

  // Filtrar reservas para la fecha seleccionada
  const reservasDelDia = selectedDate
    ? reservasExistentes.filter(
        (reserva) =>
          reserva.fecha.getDate() === selectedDate.getDate() &&
          reserva.fecha.getMonth() === selectedDate.getMonth() &&
          reserva.fecha.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-rose-600" />
            <h1 className="text-xl font-bold">AeroClub Reservas</h1>
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
            <Button variant="outline">Cerrar Sesión</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver al inicio
          </Link>
        </div>

        <h2 className="text-3xl font-bold mb-6">Calendario de Reservas</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Selecciona una fecha</CardTitle>
              <CardDescription>Elige el día para ver o crear reservas</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Reservas para {selectedDate?.toLocaleDateString()}</CardTitle>
                  <CardDescription>Gestiona las reservas del día seleccionado</CardDescription>
                </div>
                <Dialog open={reservaDialogOpen} onOpenChange={setReservaDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-rose-600 hover:bg-rose-700">Nueva Reserva</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Reserva</DialogTitle>
                      <DialogDescription>Completa el formulario para reservar un avión.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="avion">Avión</Label>
                        <Select value={selectedAvion} onValueChange={setSelectedAvion}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un avión" />
                          </SelectTrigger>
                          <SelectContent>
                            {avionesDisponibles.map((avion) => (
                              <SelectItem key={avion.id} value={avion.id}>
                                {avion.modelo} ({avion.matricula})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fecha">Fecha</Label>
                        <Input
                          id="fecha"
                          type="date"
                          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                          onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="horaInicio">Hora de inicio</Label>
                          <Input id="horaInicio" type="time" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="horaFin">Hora de fin</Label>
                          <Input id="horaFin" type="time" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notas">Notas adicionales</Label>
                        <Textarea id="notas" placeholder="Información adicional sobre el vuelo..." />
                      </div>
                    </form>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setReservaDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button
                        className="bg-rose-600 hover:bg-rose-700"
                        onClick={() => {
                          // Aquí guardaríamos la reserva en nuestro JSON
                          setReservaDialogOpen(false)
                          // Mostrar mensaje de éxito
                        }}
                      >
                        Confirmar Reserva
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {reservasDelDia.length > 0 ? (
                  <div className="space-y-4">
                    {reservasDelDia.map((reserva) => {
                      const avion = avionesDisponibles.find((a) => a.id === reserva.avionId)

                      return (
                        <div key={reserva.id} className="flex items-center p-4 border rounded-lg">
                          <div className="mr-4">
                            <Plane className="h-8 w-8 text-rose-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {avion?.modelo} ({avion?.matricula})
                            </h4>
                            <p className="text-sm text-muted-foreground">Piloto: {reserva.piloto}</p>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">
                              {reserva.horaInicio} - {reserva.horaFin}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-4">
                            Editar
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No hay reservas para este día.</p>
                    <Button variant="outline" onClick={() => setReservaDialogOpen(true)}>
                      Crear la primera reserva
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Plane className="h-5 w-5 text-rose-600" />
              <span className="font-semibold">AeroClub Reservas</span>
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
