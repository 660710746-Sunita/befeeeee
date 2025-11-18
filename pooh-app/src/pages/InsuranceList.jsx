import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { useState, useEffect } from "react";
import { getInsurancePlansBySelection } from "../utils/csvParser";

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
      <div style={{ padding: 20 }}>
        <h1>ข้อมูลไม่สมบูรณ์</h1>
        <p>กรุณาเลือกข้อมูลรถให้ครบถ้วน</p>
        <button onClick={() => navigate("/select")}>กลับไป</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>รายการเบี้ยประกัน</h1>
      <div style={{ marginBottom: 20, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 5 }}>
        <p><strong>ยี่ห้อรถ:</strong> {brand}</p>
        <p><strong>รุ่น:</strong> {model}</p>
        <p><strong>รุ่นย่อย:</strong> {subModel}</p>
        <p><strong>ปี:</strong> {year}</p>
      </div>

      {loading ? (
        <p style={{ color: 'blue' }}>กำลังโหลดข้อมูลแผนประกัน...</p>
      ) : plans.length > 0 ? (
        plans.map((p) => (
          <div 
            key={p.id} 
            style={{ 
              border: "1px solid #ccc", 
              padding: 15, 
              marginBottom: 15,
              borderRadius: 5,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{p.name}</h3>
            <p><strong>ราคาเบี้ย:</strong> {p.price.toLocaleString()} บาท</p>
            <p><strong>ทุนประกัน:</strong> {p.sumInsured.toLocaleString()} บาท</p>
            <div style={{ marginTop: 10 }}>
              <button 
                onClick={() => navigate("/detail", { state: p })}
                style={{ marginRight: 10, padding: "8px 16px", cursor: "pointer" }}
              >
                ดูรายละเอียด
              </button>
              <button
                onClick={() => {
                  setSelectedPlan(p);
                  navigate("/info");
                }}
                style={{ padding: "8px 16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: 4 }}
              >
                เลือกแผน
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: 'red' }}>ไม่พบแผนประกันสำหรับตัวเลือกนี้</p>
      )}

      <div style={{ marginTop: 20 }}>
        <button 
          onClick={() => navigate("/select")}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          กลับไป
        </button>
      </div>
    </div>
  );
}