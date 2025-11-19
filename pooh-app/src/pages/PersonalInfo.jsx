import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import Layout from "../components/Layout";

export default function PersonalInfo() {
  const navigate = useNavigate();
  const { brand, model, subModel, year, selectedPlan } = useCar();
  
  const [formData, setFormData] = useState({
    idCard: "",
    prefix: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    email: "",
    phone: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/insurance-selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          car_brand_code: brand,
          car_model_code: model,
          car_submodel_code: subModel,
          car_year: parseInt(year),
          insurance_type: selectedPlan?.insuranceType || "3+",
          price: selectedPlan?.price || 0,
          sum_insured: selectedPlan?.sumInsured || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("ไม่สามารถบันทึกข้อมูลได้");
      }

      const data = await response.json();
      console.log("✓ ข้อมูลที่บันทึกสำเร็จ:", data);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const prefixes = ["นาย", "นาง", "นางสาว"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 border-t-4 border-[#128C3B]">
          <div className="mb-8 pb-6 border-b-2 border-gray-200">
            <h1 className="text-3xl font-bold text-[#128C3B] mb-2">
              ข้อมูลเจ้าของรถ
            </h1>
            {selectedPlan && (
              <div className="bg-green-50 p-3 rounded-lg mt-3">
                <p className="text-gray-700">
                  แผนที่เลือก: <span className="font-bold text-[#128C3B]">{selectedPlan.name}</span>
                  <span className="ml-2 text-[#128C3B]">({selectedPlan.price.toLocaleString()} บาท)</span>
                </p>
              </div>
            )}
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded animate-pulse">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-semibold">บันทึกข้อมูลสำเร็จ! 🎉</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                เลขบัตรประชาชน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idCard"
                value={formData.idCard}
                onChange={handleChange}
                placeholder="x-xxxx-xxxxx-xx-x"
                maxLength="13"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                คำนำหน้า <span className="text-red-500">*</span>
              </label>
              <select
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white"
              >
                <option value="">เลือกคำนำหน้า</option>
                {prefixes.map((prefix) => (
                  <option key={prefix} value={prefix}>{prefix}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                วันเดือนปีเกิด <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white"
                >
                  <option value="">วัน</option>
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                
                <select
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white"
                >
                  <option value="">เดือน</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>{month}</option>
                  ))}
                </select>
                
                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition bg-white"
                >
                  <option value="">ปี (พ.ศ.)</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year + 543}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                อีเมล <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                เบอร์โทรศัพท์ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0xx-xxx-xxxx"
                maxLength="10"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#128C3B] focus:border-[#128C3B] outline-none transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="sm:w-1/3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                ← ย้อนกลับ
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`sm:w-2/3 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#128C3B] hover:bg-[#0f7330] hover:shadow-xl"
                }`}
              >
                {loading ? "กำลังบันทึก..." : "✓ ยืนยันข้อมูล"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
