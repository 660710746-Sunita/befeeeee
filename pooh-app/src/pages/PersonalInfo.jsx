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
      /*const birthYearAD = parseInt(formData.birthYear); // ค.ศ.
      const birthMonth = String(formData.birthMonth).padStart(2, "0");
      const birthDay = String(formData.birthDay).padStart(2, "0");*/

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
          insurance_type: selectedPlan?.insuranceType || "3",
          price: Number(selectedPlan?.price) || 0,
          sum_insured: Number(selectedPlan?.sumInsured) || 0,

          owner_id_card: formData.idCard,
          owner_prefix: formData.prefix,
          owner_first_name: formData.firstName,
          owner_last_name: formData.lastName,
          owner_birthdate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
          owner_email: formData.email,
          owner_phone: formData.phone,
        })
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
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // ค.ศ.

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
              ✓ บันทึกข้อมูลสำเร็จ!
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ID Card */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                เลขบัตรประชาชน *
              </label>
              <input
                type="text"
                name="idCard"
                value={formData.idCard}
                onChange={handleChange}
                maxLength="13"
                required
                className="w-full px-4 py-3 border-2 rounded-lg"
              />
            </div>

            {/* Prefix */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                คำนำหน้า *
              </label>
              <select
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 rounded-lg"
              >
                <option value="">เลือก</option>
                {prefixes.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  ชื่อ *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  นามสกุล *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 rounded-lg"
                />
              </div>
            </div>

            {/* Birthdate */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                วันเดือนปีเกิด *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
                  <option value="">วัน</option>
                  {days.map(day => <option key={day}>{day}</option>)}
                </select>
                <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
                  <option value="">เดือน</option>
                  {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                </select>
                <select name="birthYear" value={formData.birthYear} onChange={handleChange} required>
                  <option value="">ปี (พ.ศ.)</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y + 543}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                อีเมล *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 rounded-lg"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                เบอร์โทรศัพท์ *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                required
                className="w-full px-4 py-3 border-2 rounded-lg"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => navigate(-1)} className="w-1/3 bg-gray-600 text-white py-3 rounded-lg">
                ← ย้อนกลับ
              </button>
              <button type="submit" disabled={loading} className="w-2/3 bg-[#128C3B] text-white py-3 rounded-lg">
                {loading ? "กำลังบันทึก..." : "✓ ยืนยันข้อมูล"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </Layout>
  );
}
