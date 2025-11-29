import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { useState, useEffect } from "react";
import { getInsurancePlansBySelection } from "../utils/csvParser";
import Layout from "../components/Layout";

export default function InsuranceList() {
  const navigate = useNavigate();
  const { brand, model, subModel, year, setSelectedPlan } = useCar();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลแผนประกันจาก CSV
  useEffect(() => {
    if (brand && model && subModel && year) {
      setLoading(true);
      getInsurancePlansBySelection(brand, model, subModel, year).then((data) => {
        setPlans(data);
        setLoading(false);
      });
    }
  }, [brand, model, subModel, year]);

  if (!brand || !model || !subModel || !year) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ ข้อมูลไม่สมบูรณ์</h2>
              <p className="text-gray-700 mb-6">กรุณาเลือกข้อมูลรถให้ครบถ้วน</p>
              <button
                onClick={() => navigate("/select")}
                className="px-6 py-3 bg-[#128C3B] text-white font-bold rounded-lg hover:bg-[#0f7330] transition transform hover:scale-105"
              >
                ← กลับไปเลือกรถ
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-[#128C3B] mb-2">
              📋 รายการแผนประกัน
            </h1>
            <p className="text-gray-600">เลือกแผนประกันที่เหมาะสมกับคุณ</p>
          </div>

          {/* ⭐ Progress Indicator - สีเขียวถึงขั้นตอนที่ 3 */}
          <div className="flex items-center justify-center gap-2 mb-8 max-w-2xl mx-auto">
            {/* Step 1 - เลือกยี่ห้อ (เสร็จแล้ว - สีเขียว) */}
            <div className="flex items-center">
              <div className="bg-[#128C3B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                ✓
              </div>
              <span className="ml-2 font-semibold text-[#128C3B] text-sm md:text-base">
                เลือกยี่ห้อ
              </span>
            </div>
            
            {/* Line 1-2 (สีเขียว) */}
            <div className="flex-1 h-1 bg-[#128C3B] rounded mx-2"></div>
            
            {/* Step 2 - เลือกรุ่น (เสร็จแล้ว - สีเขียว) */}
            <div className="flex items-center">
              <div className="bg-[#128C3B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                ✓
              </div>
              <span className="ml-2 font-semibold text-[#128C3B] text-sm md:text-base">
                เลือกรุ่น
              </span>
            </div>
            
            {/* Line 2-3 (สีเขียว) */}
            <div className="flex-1 h-1 bg-[#128C3B] rounded mx-2"></div>
            
            {/* Step 3 - เลือกแผน (กำลังทำ - สีเขียว) */}
            <div className="flex items-center">
              <div className="bg-[#128C3B] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg ring-4 ring-[#128C3B]/30">
                3
              </div>
              <span className="ml-2 font-semibold text-[#128C3B] text-sm md:text-base">
                เลือกแผน
              </span>
            </div>
          </div>

          {/* ข้อมูลรถที่เลือก */}
          <div className="bg-gradient-to-r from-[#128C3B] to-[#0f7330] rounded-xl shadow-xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              🚗 ข้อมูลรถที่เลือก
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">ยี่ห้อรถ</p>
                <p className="text-xl font-bold">{brand}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">รุ่น</p>
                <p className="text-xl font-bold">{model}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">รุ่นย่อย</p>
                <p className="text-xl font-bold">{subModel}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">ปี</p>
                <p className="text-xl font-bold">{year}</p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#128C3B] border-t-transparent mb-4"></div>
              <p className="text-xl text-[#128C3B] font-semibold">กำลังโหลดข้อมูลแผนประกัน...</p>
            </div>
          ) : plans.length > 0 ? (
            <>

              {/* รายการแผนประกัน */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {plans.map((p, index) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 overflow-hidden"
                  >
                    {/* Header ของการ์ด */}
                    <div className="bg-gradient-to-r from-[#128C3B] to-[#0f7330] text-white p-5 relative">
                      {/* Badge แนะนำ (ถ้าเป็นแผนแรก) */}
                      {index === 0 && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ แนะนำ
                        </div>
                      )}
                      <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">
                          {p.price.toLocaleString()}
                        </span>
                        <span className="text-lg ml-2 opacity-90">บาท/ปี</span>
                      </div>
                    </div>

                    {/* เนื้อหาของการ์ด */}
                    <div className="p-5">
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                          <span className="text-gray-600">ทุนประกัน</span>
                          <span className="text-xl font-bold text-[#128C3B]">
                            {p.sumInsured.toLocaleString()} บาท
                          </span>
                        </div>
                      </div>

                      {/* ปุ่ม */}
                      <div className="space-y-3">
                        <button
                          onClick={() => navigate("/detail", { state: p })}
                          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-300 transform hover:scale-105 border-2 border-gray-300"
                        >
                          📄 ดูรายละเอียด
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPlan(p);
                            navigate("/info");
                          }}
                          className="w-full px-4 py-3 bg-[#128C3B] hover:bg-[#0f7330] text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          ✓ เลือกแผนนี้
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* ไม่พบแผนประกัน */
            <div className="text-center py-16">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">😔</div>
                <h2 className="text-2xl font-bold text-yellow-700 mb-2">
                  ไม่พบแผนประกัน
                </h2>
                <p className="text-gray-700 mb-6">
                  ไม่พบแผนประกันสำหรับตัวเลือกนี้ กรุณาลองเลือกรถคันอื่น
                </p>
                <button
                  onClick={() => navigate("/select")}
                  className="px-6 py-3 bg-[#128C3B] text-white font-bold rounded-lg hover:bg-[#0f7330] transition transform hover:scale-105"
                >
                  ← เลือกรถใหม่
                </button>
              </div>
            </div>
          )}

          {/* ปุ่มย้อนกลับ */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/select")}
              className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}