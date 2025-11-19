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
              <div className="bg-white rounded-full p-2 shadow-md">
                <svg 
                  className="w-8 h-8 text-[#128C3B]" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  ประกันภัยไทยวิวัฒน์
                </h1>
                <p className="text-xs md:text-sm text-white/90 hidden sm:block">
                  Thai Vivat Insurance
                </p>
              </div>
            </Link>

            {/* Navigation Menu (Optional) */}
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
                เลือกรถ
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#128C3B]">
                ประกันภัยไทยวิวัฒน์
              </h3>
              <p className="text-gray-400 text-sm">
                บริษัทประกันภัยชั้นนำของไทย มุ่งมั่นให้บริการที่ดีที่สุด
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">ติดต่อเรา</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 โทร: 02-xxx-xxxx</p>
                <p>📧 อีเมล: info@thaivivat.com</p>
                <p>🏢 ที่อยู่: กรุงเทพมหานคร</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">เมนูด่วน</h4>
              <div className="space-y-2 text-sm">
                <Link to="/" className="block text-gray-400 hover:text-[#128C3B] transition">
                  หน้าแรก
                </Link>
                <Link to="/select" className="block text-gray-400 hover:text-[#128C3B] transition">
                  เลือกรถ
                </Link>
                <a href="#" className="block text-gray-400 hover:text-[#128C3B] transition">
                  เกี่ยวกับเรา
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 ประกันภัยไทยวิวัฒน์ สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
    </div>
  );
}