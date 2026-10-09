export interface Noticia {
  id: number
  titulo: string
  resumen?: string
  contenido?: string
  extracto?: string
  categoria?: string
  fecha?: string
  tiempo?: string
  destacada?: boolean
}

export interface Partido {
  id: number
  equipoLocal?: string
  local?: string
  equipoVisitante?: string
  visita?: string
  precio?: number
  fase?: string
  fecha?: string
  hora?: string
  sede?: string
}

export interface Jugador {
  id: number
  nombre: string
  posicion?: string
  equipo?: string
  dorsal?: number
  pj?: number
  goles?: number
  ta?: number
  tr?: number
}

export interface Solicitud {
  id: number
  [campo: string]: unknown
}

export interface Usuario {
  rol: string // 'admin' u otros; lo afinamos cuando migremos login/registro
  [campo: string]: unknown
}

export type ClaveColeccion = 'noticias' | 'jugadores' | 'partidos' | 'solicitudes'

const CLAVE_USUARIO = 'LIF_USUARIO_ACTIVO'

export const DatosLIF = {
  init(): void {
    const claves: ClaveColeccion[] = ['noticias', 'jugadores', 'partidos', 'solicitudes']
    claves.forEach((clave) => {
      if (!localStorage.getItem(`lif_${clave}`)) {
        localStorage.setItem(`lif_${clave}`, JSON.stringify([]))
      }
    })
  },

  get<T>(clave: ClaveColeccion): T[] {
    const raw = localStorage.getItem(`lif_${clave}`)
    return raw ? (JSON.parse(raw) as T[]) : []
  },

  guardar<T>(clave: ClaveColeccion, lista: T[]): void {
    localStorage.setItem(`lif_${clave}`, JSON.stringify(lista))
  },

  agregar<T extends object>(clave: ClaveColeccion, item: T): T & { id: number } {
    const lista = this.get<T & { id: number }>(clave)
    const nuevo = { ...item, id: Date.now() } // ID único basado en la hora
    lista.push(nuevo)
    this.guardar(clave, lista)
    return nuevo
  },

  eliminar(clave: ClaveColeccion, id: number): void {
    const lista = this.get<{ id: number }>(clave).filter((item) => item.id !== id)
    this.guardar(clave, lista)
  },

  // --- Sesión de usuario ---
  setUsuario(usuario: Usuario): void {
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario))
  },

  getUsuario(): Usuario | null {
    const raw = localStorage.getItem(CLAVE_USUARIO)
    return raw ? (JSON.parse(raw) as Usuario) : null
  },

  cerrarSesion(): void {
    localStorage.removeItem(CLAVE_USUARIO)
  },
}

DatosLIF.init()