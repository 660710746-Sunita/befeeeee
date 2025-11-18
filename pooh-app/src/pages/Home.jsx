import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { CarBrandCard } from "../components/CarBrandCard";

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
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>เลือกยี่ห้อรถ</h1>
      
      {/* Grid สำหรับแสดงการ์ด - แถวละ 3 รูป */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        marginBottom: 40
      }}>
        {brands.map((b) => (
          <CarBrandCard
            key={b.code}
            brand={b.name}
            img={b.img}
            onSelect={() => {
              setBrand(b.code); // ส่ง code แทน name
              navigate("/select");
            }}
          />
        ))}
      </div>

      {/* Dropdown อยู่ล่างสุด */}
      <div style={{ 
        marginTop: 40,
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        textAlign: "center"
      }}>
        <label style={{ fontSize: 18, marginRight: 10, fontWeight: "bold" }}>
          เลือกยี่ห้อ:
        </label>
        <select 
          onChange={(e) => {
            if (e.target.value) {
              setBrand(e.target.value); // ส่ง code
              navigate("/select");
            }
          }}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #ddd",
            minWidth: 200,
            cursor: "pointer"
          }}
        >
          <option value="">-- กรุณาเลือก --</option>
          {brands.map((b) => (
            <option key={b.code} value={b.code}>{b.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}