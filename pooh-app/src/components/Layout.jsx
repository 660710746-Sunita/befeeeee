export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-[#128C3B] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">ระบบประกันภัยรถยนต์</h1>
        </div>
      </header>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 ระบบประกันภัยรถยนต์. สงวนลิขสิทธิ์.</p>
        </div>
      </footer>
    </div>
  );
}