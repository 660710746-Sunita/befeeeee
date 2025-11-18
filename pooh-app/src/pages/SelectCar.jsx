import { useCar } from "../context/CarContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getModelsByBrand,
  getSubModelsByBrandAndModel,
  getYearsByBrandModelSubModel,
} from "../utils/csvParser";
import Layout from "../components/Layout";

export default function SelectCar() {
  const { brand, model, setModel, year, setYear, subModel, setSubModel } = useCar();
  const navigate = useNavigate();

  const [models, setModels] = useState([]);
  const [subModels, setSubModels] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  // ดึง models เมื่อ brand เปลี่ยน
  useEffect(() => {
    if (brand) {
      setLoading(true);
      getModelsByBrand(brand).then((data) => {
        setModels(data);
        setModel(""); 
        setSubModel(""); 
        setYear(""); 
        setSubModels([]);
        setYears([]);
        setLoading(false);
      });
    }
  }, [brand, setModel, setSubModel, setYear]);

  // ดึง subModels เมื่อ model เปลี่ยน
  useEffect(() => {
    if (brand && model) {
      setLoading(true);
      getSubModelsByBrandAndModel(brand, model).then((data) => {
        setSubModels(data);
        setSubModel(""); 
        setYear(""); 
        setYears([]);
        setLoading(false);
      });
    }
  }, [brand, model, setSubModel, setYear]);

  // ดึง years เมื่อ subModel เปลี่ยน
  useEffect(() => {
    if (brand && model && subModel) {
      setLoading(true);
      getYearsByBrandModelSubModel(brand, model, subModel).then((data) => {
        setYears(data);
        setYear(""); 
        setLoading(false);
      });
    }
  }, [brand, model, subModel, setYear]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#128C3B] mb-2">
              เลือกข้อมูลรถยนต์
            </h1>
            <p className="text-gray-600">
              ยี่ห้อ: <span className="font-bold text-[#128C3B]">{brand}</span>
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-[#128C3B]">
            {/* Loading Indicator */}
            {loading && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-semibold">กำลังโหลดข้อมูล...</span>
              </div>
            )}

            <form className="space-y-6">
              {/* เลือกรุ่น */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  เลือกรุ่น <span className="text-red-500">*</span>
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand || models.length === 0}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">-- เลือกรุ่นรถ --</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {!brand && (
                  <p className="mt-2 text-sm text-gray-500">
                    กรุณาเลือกยี่ห้อรถก่อน
                  </p>
                )}
              </div>

              {/* เลือกรุ่นย่อย */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  เลือกรุ่นย่อย <span className="text-red-500">*</span>
                </label>
                <select
                  value={subModel}
                  onChange={(e) => setSubModel(e.target.value)}
                  disabled={!model || subModels.length === 0}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">-- เลือกรุ่นย่อย --</option>
                  {subModels.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {!model && (
                  <p className="mt-2 text-sm text-gray-500">
                    กรุณาเลือกรุ่นรถก่อน
                  </p>
                )}
              </div>

              {/* เลือกปี */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  เลือกปี <span className="text-red-500">*</span>
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  disabled={!subModel || years.length === 0}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">-- เลือกปี --</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {!subModel && (
                  <p className="mt-2 text-sm text-gray-500">
                    กรุณาเลือกรุ่นย่อยก่อน
                  </p>
                )}
              </div>

              {/* Summary Card */}
              {(brand || model || subModel || year) && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">ข้อมูลที่เลือก:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ ยี่ห้อ: <span className="font-semibold">{brand || "-"}</span></li>
                    <li>✓ รุ่น: <span className="font-semibold">{model || "-"}</span></li>
                    <li>✓ รุ่นย่อย: <span className="font-semibold">{subModel || "-"}</span></li>
                    <li>✓ ปี: <span className="font-semibold">{year || "-"}</span></li>
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => navigate("/list")}
                disabled={!year}
                className="w-full bg-[#128C3B] hover:bg-[#0f7330] text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg text-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                🔍 เช็คราคาเบี้ยประกัน
              </button>
              
              {!year && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  กรุณากรอกข้อมูลให้ครบถ้วนเพื่อดำเนินการต่อ
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}