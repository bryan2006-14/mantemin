"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4);
          }
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .hero-pattern {
          background-color: #1a202c;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Navbar con Login Super Notorio */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              <span className="text-xl font-bold text-gray-800">TechMaintenance Pro</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#servicios" className="text-gray-700 hover:text-blue-600 transition font-medium">Servicios</a>
              <a href="#nosotros" className="text-gray-700 hover:text-blue-600 transition font-medium">Nosotros</a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition font-medium">Contacto</a>
              <Link href="/login" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-2xl transform hover:scale-105 font-bold text-lg pulse-glow">
                🔐 Iniciar Sesión
              </Link>
            </div>
            <Link href="/login" className="md:hidden px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition shadow-lg font-bold">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Banner Superior con Login */}
      <div className="fixed top-16 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-2 z-40 shimmer">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center space-x-4">
          <span className="text-sm font-semibold">🎉 ¡Accede a tu panel de control ahora!</span>
          <Link href="/login" className="px-4 py-1 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition font-bold text-sm">
            Entrar →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-pattern pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Mantenimiento Profesional de <span className="text-yellow-400">Maquinaria Pesada</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Expertos en mantenimiento preventivo y correctivo de equipos Caterpillar, Komatsu, Volvo y más. 
                Maximiza la vida útil de tu maquinaria con nuestro servicio especializado.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contacto" className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-bold hover:bg-yellow-300 transition shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105">
                  Solicitar Cotización
                </a>
                <a href="#servicios" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/20 transition border-2 border-white/30">
                  Ver Servicios
                </a>
                <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold hover:from-blue-600 hover:to-blue-700 transition shadow-2xl transform hover:scale-105 border-2 border-white/50">
                  🔐 Acceso Cliente
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">15+</div>
                  <div className="text-sm text-gray-300">Años Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">500+</div>
                  <div className="text-sm text-gray-300">Clientes Satisfechos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-gray-300">Soporte Técnico</div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block float-animation">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-8xl text-center mb-4">🚜</div>
                  <h3 className="text-2xl font-bold text-center mb-4">Maquinaria Certificada</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                      <span className="text-2xl">✅</span>
                      <span>Excavadoras</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                      <span className="text-2xl">✅</span>
                      <span>Cargadores Frontales</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                      <span className="text-2xl">✅</span>
                      <span>Bulldozers</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                      <span className="text-2xl">✅</span>
                      <span>Motoniveladoras</span>
                    </div>
                  </div>
                  
                  {/* Botón Login en Card */}
                  <Link href="/login" className="mt-6 block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition shadow-xl transform hover:scale-105">
                    Portal de Clientes 🚀
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* CTA Banner Login */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">¿Ya eres nuestro cliente?</h3>
              <p className="text-blue-100">Accede a tu historial de servicios y solicita mantenimientos</p>
            </div>
            <Link href="/login" className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition shadow-2xl transform hover:scale-105 text-lg pulse-glow whitespace-nowrap">
              🔑 Iniciar Sesión Ahora
            </Link>
          </div>
        </div>
      </div>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">Soluciones integrales para tu maquinaria pesada</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mantenimiento Preventivo</h3>
              <p className="text-gray-600 mb-6">
                Programas personalizados de mantenimiento preventivo para evitar fallas costosas y maximizar la disponibilidad operativa.
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Inspecciones programadas</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Cambio de aceites y filtros</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Diagnóstico computarizado</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Reportes detallados</li>
              </ul>
              <Link href="/login" className="block w-full py-2 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition">
                Solicitar en Portal
              </Link>
            </div>

            {/* Servicio 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mantenimiento Correctivo</h3>
              <p className="text-gray-600 mb-6">
                Reparaciones especializadas con técnicos certificados y repuestos originales para resolver cualquier falla mecánica o eléctrica.
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Reparación de motores</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Sistema hidráulico</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Sistema eléctrico</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Transmisión y tren rodante</li>
              </ul>
              <Link href="/login" className="block w-full py-2 bg-orange-600 text-white text-center rounded-lg font-semibold hover:bg-orange-700 transition">
                Solicitar en Portal
              </Link>
            </div>

            {/* Servicio 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Servicio de Emergencia</h3>
              <p className="text-gray-600 mb-6">
                Atención inmediata 24/7 para emergencias. Nuestro equipo móvil llega a tu ubicación en el menor tiempo posible.
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Respuesta rápida 24/7</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unidades móviles equipadas</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Diagnóstico en sitio</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Soluciones inmediatas</li>
              </ul>
              <Link href="/login" className="block w-full py-2 bg-purple-600 text-white text-center rounded-lg font-semibold hover:bg-purple-700 transition">
                Solicitar en Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Por Qué Elegirnos?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Con más de 15 años de experiencia en el sector, somos líderes en mantenimiento de maquinaria pesada en Trujillo. 
                Nuestro equipo de técnicos certificados garantiza un servicio de excelencia.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍🔧</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Técnicos Certificados</h4>
                    <p className="text-gray-600">Personal altamente capacitado con certificaciones de fabricantes como Caterpillar, Komatsu y Volvo.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Garantía Total</h4>
                    <p className="text-gray-600">Todos nuestros servicios cuentan con garantía completa en mano de obra y repuestos.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Sistema de Gestión Digital</h4>
                    <p className="text-gray-600">Plataforma en línea para seguimiento en tiempo real de todos tus servicios y historial de mantenimiento.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/login" className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-xl transform hover:scale-105">
                Acceder a Mi Portal 🚀
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900">Certificaciones</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">🔷</div>
                    <p className="font-semibold text-sm">Caterpillar Certified</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">🟡</div>
                    <p className="font-semibold text-sm">Komatsu Partner</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">⚪</div>
                    <p className="font-semibold text-sm">Volvo Authorized</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">🟢</div>
                    <p className="font-semibold text-sm">ISO 9001</p>
                  </div>
                </div>
                <Link href="/login" className="block w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-center rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition shadow-lg">
                  Iniciar Sesión 🔐
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-xl text-gray-600">Estamos listos para atender tus necesidades</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-sm opacity-90">Av. Industrial 456, Trujillo, La Libertad</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <p className="text-sm opacity-90">+51 937 392 900</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm opacity-90">contacto@techmaintenance.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">⏰</span>
                  </div>
                  <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-sm opacity-90">24/7 - Servicio de Emergencia</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <Link href="/login" className="block w-full py-3 bg-white text-blue-600 text-center rounded-lg font-bold hover:bg-gray-100 transition shadow-xl">
                  Portal de Clientes →
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicita una Cotización</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Nombre completo" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="tel" placeholder="Teléfono" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Tipo de servicio</option>
                  <option>Mantenimiento Preventivo</option>
                  <option>Mantenimiento Correctivo</option>
                  <option>Servicio de Emergencia</option>
                </select>
                <textarea placeholder="Describe tu necesidad" rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <span className="text-xl font-bold">TechMaintenance</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Expertos en mantenimiento de maquinaria pesada desde 2009.</p>
              <Link href="/login" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
                Iniciar Sesión
              </Link>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Mantenimiento Preventivo</a></li>
                <li><a href="#" className="hover:text-white transition">Mantenimiento Correctivo</a></li>
                <li><a href="#" className="hover:text-white transition">Servicio de Emergencia</a></li>
                <li><a href="#" className="hover:text-white transition">Diagnóstico</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#nosotros" className="hover:text-white transition">Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition">Certificaciones</a></li>
                <li><a href="#" className="hover:text-white transition">Casos de Éxito</a></li>
                <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-3 mb-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                  <span>📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                  <span>📸</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                  <span>🐦</span>
                </a>
              </div>
              <Link href="/login" className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold text-sm">
                🔐 Portal Clientes
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TechMaintenance Pro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/51937392900?text=Hola,%20necesito%20información%20sobre%20sus%20servicios" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition transform hover:scale-110 z-50 animate-bounce"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}