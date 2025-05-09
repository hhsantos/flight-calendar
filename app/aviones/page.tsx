import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Info, Plane } from "lucide-react"

// Datos de ejemplo - esto vendría de nuestro JSON
const aviones = [
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
  {
    id: "4",
    modelo: "Diamond DA20",
    matricula: "EC-JKL",
    estado: "disponible",
    asientos: 2,
    potencia: "125 HP",
    velocidadCrucero: "138 kts",
    autonomia: "5 horas",
    descripcion: "Avión biplaza moderno con excelente eficiencia de combustible.",
  },
]

export default function AvionesPage() {
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

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Nuestra Flota</h2>
          <p className="text-muted-foreground">Explora los aviones disponibles en nuestro club de vuelo.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aviones.map((avion) => (
            <Card key={avion.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={`/placeholder.svg?height=300&width=500&text=${avion.modelo}`}
                  alt={avion.modelo}
                  fill
                  className="object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    avion.estado === "disponible"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {avion.estado === "disponible" ? "Disponible" : "En mantenimiento"}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{avion.modelo}</CardTitle>
                <CardDescription>Matrícula: {avion.matricula}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="font-medium">Asientos:</span> {avion.asientos}
                  </div>
                  <div>
                    <span className="font-medium">Potencia:</span> {avion.potencia}
                  </div>
                  <div>
                    <span className="font-medium">Crucero:</span> {avion.velocidadCrucero}
                  </div>
                  <div>
                    <span className="font-medium">Autonomía:</span> {avion.autonomia}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{avion.descripcion}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-full mr-2">
                  <Info className="h-4 w-4 mr-2" />
                  Detalles
                </Button>
                <Link href="/reservas" className="w-full">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700" disabled={avion.estado !== "disponible"}>
                    Reservar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
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
