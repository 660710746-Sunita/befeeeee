import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-gradient-to-r from-[#128C3B] to-[#0f7330] shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
              {/* ⭐ เปลี่ยนเป็นโลโก้ไทยวิวัฒน์ */}
              
                <img 
                  src="/assets/Thaivivatt.jpg" 
                  alt="Thaivivat Logo"
                  className="w-12 h-12 object-contain rounded-full"
                />
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  ประกันภัยไทยวิวัฒน์
                </h1>
                <p className="text-xs md:text-sm text-white/90 hidden sm:block">
                  Thaivivat Insurance
                </p>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition font-semibold"
              >
                หน้าแรก
              </Link>
              <Link 
                to="/select" 
                className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition font-semibold"
              >
                
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Info - ⭐ เปลี่ยนข้อความใหม่ */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#128C3B]">
                ประกันภัยไทยวิวัฒน์
              </h3>
              <div className="text-gray-400 text-sm space-y-1">
                <p className="font-semibold text-gray-300">
                  บริษัท ประกันภัยไทยวิวัฒน์ จำกัด (มหาชน)
                </p>
                <p>
                  71 ถนนดินแดง แขวงสามเสนใน
                </p>
                <p>
                  เขตพญาไท กรุงเทพฯ 10400
                </p>
                <p className="mt-3 text-[#128C3B] font-semibold">
                  ใบอนุญาตเลขที่ 8/2516
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">ติดต่อเรา</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 โทร: 02-xxx-xxxx</p>
                <p>📧 อีเมล: info@thaivivat.com</p>
                <p>🏢 สำนักงานใหญ่: กรุงเทพมหานคร</p>
              </div>
            </div>
          </div>

          {/* ⭐ เอา Copyright ออก - ไม่มีอะไรในส่วนนี้แล้ว */}
        </div>
      </footer>
    </div>
  );
}