import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { CarBrandCard } from "../components/CarBrandCard";

export default function Home() {
  const navigate = useNavigate();
  const { setBrand } = useCar();

  const brands = [
    { 
      name: "Toyota", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/toyota-logo-png-transparent.png" 
    },
    { 
      name: "Honda", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/honda-logo-png-transparent.png" 
    },
    { 
      name: "Mazda", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/mazda-logo-png-transparent.png" 
    },
    { 
      name: "Nissan", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/nissan-6-logo-png-transparent.png" 
    },
    { 
      name: "Ford", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/ford-logo-png-transparent.png" 
    },
    { 
      name: "BMW", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/bmw-logo-png-transparent.png" 
    },
    { 
      name: "Mercedes-Benz", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-logo-png-transparent.png" 
    },
    { 
      name: "Chevrolet", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/chevrolet-logo-png-transparent.png" 
    },
    { 
      name: "Mitsubishi", 
      img: "https://cdn.freebiesupply.com/logos/large/2x/mitsubishi-motors-logo-png-transparent.png" 
    }
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