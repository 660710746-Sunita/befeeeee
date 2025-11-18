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
    <div style={{ 
      padding: 20, 
      maxWidth: 900, 
      margin: "0 auto",
      backgroundColor: "#128C3B",
      minHeight: "100vh"
    }}>
      {/* ⭐ Header พร้อมวงรี */}
      <div style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: "40px 30px",
        marginBottom: 30,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        textAlign: "center",
        border: "3px solid #128C3B"
      }}>
        {/* ⭐ วงรีสีเขียว */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#128C3B",
          borderRadius: "50%",
          width: 180,                    // ⭐ กว้าง
          height: 120,                   // ⭐ สูงน้อยกว่า
          marginBottom: 20
        }}>
          <span style={{ fontSize: 50 }}>🚗</span>
        </div>
        
        <h1 style={{ 
          fontSize: 56,
          fontWeight: "bold",
          color: "#128C3B",
          margin: "10px 0",
          letterSpacing: "-1px"
        }}>
          เลือกยี่ห้อรถ
        </h1>
        
        <p style={{
          color: "#666",
          fontSize: 20,
          marginTop: 15,
          marginBottom: 0,
          fontWeight: 500
        }}>
          คลิกที่การ์ดเพื่อเลือกยี่ห้อรถที่คุณต้องการ
        </p>
      </div>
      
      {/* Grid สำหรับแสดงการ์ด - แถวละ 3 รูป */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20
      }}>
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
  );
}