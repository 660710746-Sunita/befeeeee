import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { CarBrandCard } from "../components/CarBrandCard";

export default function Home() {
  const navigate = useNavigate();
  const { setBrand } = useCar();

  const brands = [
  { name: "BMW", img: "/assets/BMW.jpg" },
  { name: "Chevrolet", img: "/assets/Chevrolet.jpg" },
  { name: "Ford", img: "/assets/Ford.jpg" },
  { name: "Haval", img: "/assets/Haval.jpg" },
  { name: "Honda", img: "/assets/Honda.jpg" },
  { name: "Hyundai", img: "/assets/Hyundai.jpg" },
  { name: "Isuzu", img: "/assets/Isuzu.jpg" },
  { name: "KIA", img: "/assets/KIA.jpg" },
  { name: "MG", img: "/assets/MG.jpg" },
  { name: "Mazda", img: "/assets/Mazda.jpg" },
  { name: "Mercedes Benz", img: "/assets/Mercedes_benz.jpg" }, // ⚠️ มีเว้นวรรค
  { name: "Mitsubishi", img: "/assets/Mitsubishi.jpg" },
  { name: "Nissan", img: "/assets/Nissan.jpg" },
  { name: "Proton", img: "/assets/Proton.jpg" },
  { name: "Suzuki", img: "/assets/Suzuki.jpg" },
  { name: "Tata", img: "/assets/Tata.jpg" },
  { name: "Toyota", img: "/assets/Toyota.jpg" }
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
            key={b.name}
            brand={b.name}
            img={b.img}
            onSelect={() => {
              setBrand(b.name);
              navigate("/select-car");
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
              setBrand(e.target.value);
              navigate("/select-car");
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
            <option key={b.name} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}