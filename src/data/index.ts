// ============================================
// DATOS SIMULADOS - TALLERES, RESEÑAS Y REPUESTOS
// En producción, estos datos vendrían de una API (Node.js/Python)
// conectada a una base de datos (MongoDB/PostgreSQL)
// ============================================

export interface Taller {
  id: string;
  nombre: string;
  ruc: string;
  direccion: string;
  distrito: string;
  departamento: string;
  telefono: string;
  whatsapp: string;
  servicios: string[];
  horario: string;
  calificacion: number;
  numResenas: number;
  fotos: string[];
  descripcion: string;
  verificado: boolean;
  lat?: number;
  lng?: number;
  distancia?: string;
}

export interface Resena {
  id: string;
  tallerId: string;
  clienteNombre: string;
  fecha: string;
  calificacion: number;
  comentario: string;
  servicio: string;
}

export interface Repuesto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  proveedor: string;
  compatible: string[];
  stock: number;
  imagen?: string;
}

export const SERVICIOS = [
  "Frenos",
  "Aceite y lubricación",
  "Motor",
  "Eléctrico",
  "Suspensión",
  "Transmisión",
  "Alineamiento y balanceo",
  "Pintura y latonería",
  "Aire acondicionado",
  "Diagnóstico computarizado",
  "Auxilio mecánico",
  "Revisión técnica"
];

export const DISTRITOS_LIMA = [
  "Lima Cercado", "San Isidro", "Miraflores", "Surco", "La Molina",
  "San Borja", "Barranco", "Chorrillos", "Lince", "Jesús María",
  "Pueblo Libre", "Magdalena", "San Miguel", "Callao", "Los Olivos",
  "San Juan de Lurigancho", "Ate", "Santa Anita", "Comas", "Independencia"
];

export const departamentos = [
  "Lima", "Arequipa", "Cusco", "Trujillo", "Piura",
  "Chiclayo", "Huancayo", "Ica", "Tacna", "Chimbote"
];

export const talleres: Taller[] = [
  {
    id: "t1",
    nombre: "AutoService Pro",
    ruc: "20512345678",
    direccion: "Av. Industrial 1234",
    distrito: "Los Olivos",
    departamento: "Lima",
    telefono: "+51 987654321",
    whatsapp: "+51987654321",
    servicios: ["Frenos", "Aceite y lubricación", "Motor", "Diagnóstico computarizado"],
    horario: "Lun-Sáb 8:00-18:00",
    calificacion: 4.8,
    numResenas: 156,
    fotos: [],
    descripcion: "Taller especializado en mecánica general con más de 15 años de experiencia. Contamos con equipos de diagnóstico de última generación y técnicos certificados.",
    verificado: true,
    distancia: "2.3 km"
  },
  {
    id: "t2",
    nombre: "ElectroCar Lima",
    ruc: "20698765432",
    direccion: "Jr. Los Mecánicos 567",
    distrito: "San Miguel",
    departamento: "Lima",
    telefono: "+51 912345678",
    whatsapp: "+51912345678",
    servicios: ["Eléctrico", "Diagnóstico computarizado", "Aire acondicionado"],
    horario: "Lun-Vie 9:00-17:00",
    calificacion: 4.5,
    numResenas: 89,
    fotos: [],
    descripcion: "Especialistas en sistemas eléctricos automotrices. Diagnóstico computarizado, reparación de alternadores, motores de arranque y sistemas de inyección electrónica.",
    verificado: true,
    distancia: "5.1 km"
  },
  {
    id: "t3",
    nombre: "Frenos Express Perú",
    ruc: "20456789012",
    direccion: "Av. Brasil 2890",
    distrito: "Lima Cercado",
    departamento: "Lima",
    telefono: "+51 945678901",
    whatsapp: "+51945678901",
    servicios: ["Frenos", "Suspensión", "Alineamiento y balanceo"],
    horario: "Lun-Sáb 7:00-19:00",
    calificacion: 4.9,
    numResenas: 234,
    fotos: [],
    descripcion: "Líderes en sistema de frenos y suspensión. Atendemos todo tipo de vehículos con repuestos originales y garantizados. Servicio express disponible.",
    verificado: true,
    distancia: "3.7 km"
  },
  {
    id: "t4",
    nombre: "Motor Total SAC",
    ruc: "20789012345",
    direccion: "Av. Perú 456",
    distrito: "Callao",
    departamento: "Lima",
    telefono: "+51 956789012",
    whatsapp: "+51956789012",
    servicios: ["Motor", "Transmisión", "Aceite y lubricación"],
    horario: "Lun-Sáb 8:00-17:00",
    calificacion: 4.3,
    numResenas: 67,
    fotos: [],
    descripcion: "Reparación integral de motores y transmisiones. Rectificado de culatas, cambio de juntas, reparación de cajas automáticas y manuales.",
    verificado: true,
    distancia: "8.2 km"
  },
  {
    id: "t5",
    nombre: "Pintura & Color Auto",
    ruc: "20345678901",
    direccion: "Calle Los Artistas 789",
    distrito: "Ate",
    departamento: "Lima",
    telefono: "+51 967890123",
    whatsapp: "+51967890123",
    servicios: ["Pintura y latonería", "Aire acondicionado"],
    horario: "Lun-Vie 8:30-17:30",
    calificacion: 4.6,
    numResenas: 112,
    fotos: [],
    descripcion: "Especialistas en pintura automotriz con cabina profesional. Trabajamos con pinturas al agua ecológicas. Latonería, pulido y encerado.",
    verificado: false,
    distancia: "12.5 km"
  },
  {
    id: "t6",
    nombre: "Suspensión & Control",
    ruc: "20234567890",
    direccion: "Av. Universitaria 1500",
    distrito: "San Juan de Lurigancho",
    departamento: "Lima",
    telefono: "+51 978901234",
    whatsapp: "+51978901234",
    servicios: ["Suspensión", "Alineamiento y balanceo", "Frenos"],
    horario: "Lun-Sáb 7:30-18:30",
    calificacion: 4.7,
    numResenas: 198,
    fotos: [],
    descripcion: "Expertos en suspensión y dirección. Alineamiento computarizado 3D, cambio de amortiguadores, rotulas y terminales de dirección.",
    verificado: true,
    distancia: "6.8 km"
  },
  {
    id: "t7",
    nombre: "Turbo Mecánica Arequipa",
    ruc: "20123456789",
    direccion: "Calle Mercaderes 234",
    distrito: "Cercado",
    departamento: "Arequipa",
    telefono: "+51 989012345",
    whatsapp: "+51989012345",
    servicios: ["Motor", "Turbo", "Diagnóstico computarizado", "Aceite y lubricación"],
    horario: "Lun-Sáb 8:00-18:00",
    calificacion: 4.4,
    numResenas: 76,
    fotos: [],
    descripcion: "Especialistas en motores turbo y diésel. Reparación y calibración de turbos, inyectores y bombas de alta presión.",
    verificado: true,
    distancia: "1.2 km"
  },
  {
    id: "t8",
    nombre: "Auxilio 24 Horas Cusco",
    ruc: "20678901234",
    direccion: "Av. de la Cultura 890",
    distrito: "Wanchaq",
    departamento: "Cusco",
    telefono: "+51 990123456",
    whatsapp: "+51990123456",
    servicios: ["Auxilio mecánico", "Frenos", "Eléctrico", "Motor"],
    horario: "24/7 - Todos los días",
    calificacion: 4.9,
    numResenas: 312,
    fotos: [],
    descripcion: "Servicio de auxilio mecánico las 24 horas. Llegamos a cualquier punto de la ciudad y carreteras cercanas. Grúa, cambio de llantas, carga de batería y más.",
    verificado: true,
    distancia: "0.8 km"
  }
];

export const resenas: Resena[] = [
  {
    id: "r1",
    tallerId: "t1",
    clienteNombre: "Carlos M.",
    fecha: "2024-12-15",
    calificacion: 5,
    comentario: "Excelente servicio. Me arreglaron el motor en tiempo récord y a un precio justo. Totalmente recomendado.",
    servicio: "Motor"
  },
  {
    id: "r2",
    tallerId: "t1",
    clienteNombre: "María L.",
    fecha: "2024-12-10",
    calificacion: 5,
    comentario: "Muy profesionales. Me explicaron todo lo que le hicieron a mi auto. El personal es amable y honesto.",
    servicio: "Diagnóstico computarizado"
  },
  {
    id: "r3",
    tallerId: "t3",
    clienteNombre: "Roberto P.",
    fecha: "2024-12-08",
    calificacion: 5,
    comentario: "Los mejores en frenos de Lima. Me cambiaron las pastillas y discos, ahora frena perfecto. Precio justo.",
    servicio: "Frenos"
  },
  {
    id: "r4",
    tallerId: "t2",
    clienteNombre: "Ana G.",
    fecha: "2024-11-28",
    calificacion: 4,
    comentario: "Buen trabajo con el sistema eléctrico. Solo demoraron un día más de lo esperado pero el resultado fue perfecto.",
    servicio: "Eléctrico"
  },
  {
    id: "r5",
    tallerId: "t8",
    clienteNombre: "Jorge T.",
    fecha: "2024-12-20",
    calificacion: 5,
    comentario: "Se me averió el auto en la carretera a las 11pm y llegaron en 30 minutos. ¡Salvadores! Muy agradecido.",
    servicio: "Auxilio mecánico"
  },
  {
    id: "r6",
    tallerId: "t6",
    clienteNombre: "Lucía R.",
    fecha: "2024-12-05",
    calificacion: 5,
    comentario: "Excelente alineamiento. Mi auto ya no vibra y se siente como nuevo. Precios competitivos.",
    servicio: "Alineamiento y balanceo"
  },
  {
    id: "r7",
    tallerId: "t5",
    clienteNombre: "Fernando S.",
    fecha: "2024-11-20",
    calificacion: 4,
    comentario: "Buen trabajo de pintura. El color quedó perfecto, igual al original. Recomiendo.",
    servicio: "Pintura y latonería"
  },
  {
    id: "r8",
    tallerId: "t4",
    clienteNombre: "Patricia V.",
    fecha: "2024-12-12",
    calificacion: 4,
    comentario: "Repararon la transmisión de mi SUV. Trabajo de calidad, aunque el precio fue un poco alto.",
    servicio: "Transmisión"
  }
];

export const repuestos: Repuesto[] = [
  {
    id: "rep1",
    nombre: "Pastillas de freno delanteras",
    categoria: "Frenos",
    precio: 85.00,
    proveedor: "Repuestos Perú SAC",
    compatible: ["Toyota Yaris", "Honda City", "Nissan Versa"],
    stock: 45
  },
  {
    id: "rep2",
    nombre: "Filtro de aceite universal",
    categoria: "Motor",
    precio: 25.00,
    proveedor: "AutoPartes Lima",
    compatible: ["Universal"],
    stock: 200
  },
  {
    id: "rep3",
    nombre: "Amortiguador delantero",
    categoria: "Suspensión",
    precio: 180.00,
    proveedor: "Suspensiones del Perú",
    compatible: ["Toyota Corolla", "Hyundai Elantra"],
    stock: 30
  },
  {
    id: "rep4",
    nombre: "Bujías de iridio (juego x4)",
    categoria: "Motor",
    precio: 120.00,
    proveedor: "Repuestos Perú SAC",
    compatible: ["Universal 4 cilindros"],
    stock: 80
  },
  {
    id: "rep5",
    nombre: "Batería 12V 60Ah",
    categoria: "Eléctrico",
    precio: 280.00,
    proveedor: "ElectroAuto Perú",
    compatible: ["Universal"],
    stock: 25
  },
  {
    id: "rep6",
    nombre: "Aceite sintético 5W-30 (4L)",
    categoria: "Lubricantes",
    precio: 95.00,
    proveedor: "Lubricantes Premium",
    compatible: ["Universal"],
    stock: 150
  },
  {
    id: "rep7",
    nombre: "Kit de correa de distribución",
    categoria: "Motor",
    precio: 350.00,
    proveedor: "AutoPartes Lima",
    compatible: ["Toyota Corolla", "Kia Cerato", "Hyundai Tucson"],
    stock: 15
  },
  {
    id: "rep8",
    nombre: "Disco de freno ventilado",
    categoria: "Frenos",
    precio: 145.00,
    proveedor: "Repuestos Perú SAC",
    compatible: ["Toyota Yaris", "Mazda 3"],
    stock: 40
  }
];

export const testimonios = [
  {
    id: "test1",
    nombre: "Carlos Mendoza",
    rol: "Cliente - Lima",
    texto: "Encontré un taller excelente cerca de casa gracias a TallerYa. El sistema de calificaciones me dio confianza para elegir. ¡Mi auto quedó como nuevo!",
    calificacion: 5
  },
  {
    id: "test2",
    nombre: "Roberto Quispe",
    rol: "Dueño de Taller - Callao",
    texto: "Desde que me registré en TallerYa, mis clientes aumentaron un 40%. La plataforma me dio visibilidad que nunca tuve. Ahora tengo lista de espera.",
    calificacion: 5
  },
  {
    id: "test3",
    nombre: "María Fernández",
    rol: "Cliente - Arequipa",
    texto: "Se me averió el auto en carretera y gracias a TallerYa encontré auxilio mecánico a las 10pm. Llegaron en 30 minutos. ¡Increíble servicio!",
    calificacion: 5
  },
  {
    id: "test4",
    nombre: "Jorge Ramírez",
    rol: "Proveedor de repuestos",
    texto: "Vendo 3 veces más repuestos desde que estoy en TallerYa. Los talleres confían en mi calidad gracias al sistema de la plataforma.",
    calificacion: 5
  }
];
