import { useLocation, useNavigate } from "react-router-dom";
import coverageData from "../data/coverageData";
import Layout from "../components/Layout";

export default function InsuranceDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log("state from navigate:", state);

    if (!state) {
        return (
            <Layout>
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-red-600">⚠️ ไม่พบข้อมูลแผนประกัน</h2>
                            <button 
                                onClick={() => navigate(-1)}
                                className="mt-4 px-6 py-3 bg-[#128C3B] text-white font-bold rounded-lg hover:bg-[#0f7330] transition"
                            >
                                ← ย้อนกลับ
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    const detail = coverageData[state.id];

    return (
        <Layout>
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-[#128C3B] mb-2">
                            รายละเอียดแผนประกัน
                        </h1>
                        <div className="inline-block bg-[#128C3B] text-white px-6 py-3 rounded-full shadow-lg">
                            <h2 className="text-2xl font-bold">{state.name}</h2>
                        </div>
                        <p className="text-4xl font-bold text-gray-800 mt-4">
                            {state.price.toLocaleString()} 
                            <span className="text-xl text-gray-600"> บาท/ปี</span>
                        </p>
                    </div>

                    {/* คุ้มครองรถยนต์ที่เอาประกัน */}
                    <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-l-4 border-[#128C3B]">
                        <h3 className="text-2xl font-bold text-[#128C3B] mb-4 flex items-center">
                            🚗 คุ้มครองรถยนต์ที่เอาประกัน
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-gray-600 mb-1">รถเสียหาย</p>
                                <p className="text-2xl font-bold text-[#128C3B]">
                                    {detail.car.damage.toLocaleString()} บาท
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-gray-600 mb-1">รถสูญหาย</p>
                                <p className="text-2xl font-bold text-[#128C3B]">
                                    {detail.car.lost.toLocaleString()} บาท
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-gray-600 mb-1">รถไฟไหม้</p>
                                <p className="text-2xl font-bold text-[#128C3B]">
                                    {detail.car.fire.toLocaleString()} บาท
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-gray-600 mb-1">รถน้ำท่วม</p>
                                <p className="text-2xl font-bold text-[#128C3B]">
                                    {detail.car.flood.toLocaleString()} บาท
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* คุ้มครองบุคคลภายนอก */}
                    <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-l-4 border-blue-500">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                            👥 คุ้มครองบุคคลภายนอก
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-gray-700 font-semibold mb-1">
                                    ความเสียหายต่อชีวิตร่างกายบุคคลภายนอก
                                </p>
                                <p className="text-xl font-bold text-blue-600">
                                    {detail.thirdParty.person.toLocaleString()} บาท/คน
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-gray-700 font-semibold mb-1">
                                    ความเสียหายต่อชีวิตร่างกายบุคคลภายนอกต่อครั้ง
                                </p>
                                <p className="text-xl font-bold text-blue-600">
                                    {detail.thirdParty.accident.toLocaleString()} บาท/ครั้ง
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-gray-700 font-semibold mb-1">
                                    ทรัพย์สินบุคคลภายนอกต่อครั้ง
                                </p>
                                <p className="text-xl font-bold text-blue-600">
                                    {detail.thirdParty.property.toLocaleString()} บาท/ครั้ง
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-gray-700 font-semibold mb-1">
                                    ค่าเสียหายส่วนแรก
                                </p>
                                <p className="text-xl font-bold text-blue-600">
                                    {detail.thirdParty.deductible}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* คุ้มครองเพิ่มเติม */}
                    <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-l-4 border-purple-500">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                            ➕ คุ้มครองเพิ่มเติม
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <p className="text-gray-600 mb-1 text-sm">อุบัติเหตุส่วนบุคคล</p>
                                <p className="text-lg font-bold text-purple-600">
                                    {detail.extra.personalAccident}
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <p className="text-gray-600 mb-1 text-sm">ค่ารักษาพยาบาล</p>
                                <p className="text-lg font-bold text-purple-600">
                                    {detail.extra.medicalExpense}
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <p className="text-gray-600 mb-1 text-sm">ประกันตัวผู้ขับขี่</p>
                                <p className="text-lg font-bold text-purple-600">
                                    {detail.extra.bail}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* บริการเสริม */}
                    <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-l-4 border-orange-500">
                        <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                            🎁 บริการเสริม
                        </h3>
                        {detail.service.condolence !== "-" || detail.service.death !== "-" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                    <p className="text-gray-600 mb-1">เงินปลอบขวัญ</p>
                                    <p className="text-xl font-bold text-orange-600">
                                        {detail.service.condolence}
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                    <p className="text-gray-600 mb-1">กรณีเสียชีวิต</p>
                                    <p className="text-xl font-bold text-orange-600">
                                        {detail.service.death}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                                <p className="text-gray-500 text-lg">ไม่มีบริการเสริม</p>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 justify-center mt-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                        >
                            ← ย้อนกลับ
                        </button>
                        <button
                            onClick={() => navigate("/info")}
                            className="px-8 py-4 bg-[#128C3B] hover:bg-[#0f7330] text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                        >
                            เลือกแผนนี้ →
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}