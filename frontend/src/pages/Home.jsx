import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { CarBrandCard } from "../components/CarBrandCard";
import Layout from "../components/Layout";

export default function Home() {
  const navigate = useNavigate();
  const { setBrand } = useCar();

  const brands = [
    { name: "BMW", code: "BMW", img: "/assets/BMW.jpg" },
    { name: "Chevrolet", code: "CHEVROLET", img: "/assets/Chevrolet.jpg" },
    { name: "Ford", code: "FORD", img: "/assets/Ford.jpg" },
    { name: "Haval", code: "HAVAL", img: "/assets/Haval.jpg" },
    { name: "Honda", code: "HONDA", img: "/assets/Honda.jpg" },
    { name: "Hyundai", code: "HYUNDAI", img: "/assets/Hyundai.jpg" },
    { name: "Isuzu", code: "ISUZU", img: "/assets/Isuzu.jpg" },
    { name: "KIA", code: "KIA", img: "/assets/KIA.jpg" },
    { name: "MG", code: "MG", img: "/assets/MG.jpg" },
    { name: "Mazda", code: "MAZDA", img: "/assets/Mazda.jpg" },
    { name: "Mercedes Benz", code: "MERCEDES BENZ", img: "/assets/Mercedes_benz.jpg" },
    { name: "Mitsubishi", code: "MITSUBISHI", img: "/assets/Mitsubishi.jpg" },
    { name: "Nissan", code: "NISSAN", img: "/assets/Nissan.jpg" },
    { name: "Proton", code: "PROTON", img: "/assets/Proton.jpg" },
    { name: "Suzuki", code: "SUZUKI", img: "/assets/Suzuki.jpg" },
    { name: "Tata", code: "TATA", img: "/assets/Tata.jpg" },
    { name: "Toyota", code: "TOYOTA", img: "/assets/Toyota.jpg" }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full w-32 h-32 mb-6 transform hover:scale-110 transition duration-300">
            <span className="text-9xl">🚗</span>
          </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#128C3B] mb-4">
              เลือกยี่ห้อรถ
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              คลิกที่การ์ดเพื่อเลือกยี่ห้อรถที่คุณต้องการทำประกันภัย
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-3 mt-8 max-w-md mx-auto">
              <div className="flex items-center">
                <div className="bg-[#128C3B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                  1
                </div>
                <span className="ml-2 font-semibold text-[#128C3B]">เลือกยี่ห้อ</span>
              </div>
              <div className="flex-1 h-1 bg-gray-300 rounded"></div>
              <div className="flex items-center">
                <div className="bg-gray-300 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  2
                </div>
                <span className="ml-2 text-gray-500">เลือกรุ่น</span>
              </div>
              <div className="flex-1 h-1 bg-gray-300 rounded"></div>
              <div className="flex items-center">
                <div className="bg-gray-300 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  3
                </div>
                <span className="ml-2 text-gray-500">เลือกแผน</span>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold text-blue-800 text-lg mb-1">
                  คำแนะนำ
                </h3>
                <p className="text-blue-700">
                  เลือกยี่ห้อรถของคุณจากรายการด้านล่าง จากนั้นระบบจะนำคุณไปเลือกรุ่นรถและคำนวณเบี้ยประกันโดยอัตโนมัติ
                </p>
              </div>
            </div>
          </div>

          {/* Brand Grid - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((b) => (
              <CarBrandCard
                key={b.code}
                brand={b.name}
                img={b.img}
                onSelect={() => {
                  setBrand(b.code);
                  navigate("/select");
                }}
              />
            ))}
          </div>


        </div>
      </div>
    </Layout>
  );
}