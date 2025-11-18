import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";
import { CarBrandCard } from "../components/CarBrandCard";


export default function Home() {
const navigate = useNavigate();
const { setBrand } = useCar();


const brands = [
{ name: "Toyota", img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.png" },
{ name: "Honda", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Honda-logo.png" },
{ name: "Mazda", img: "https://upload.wikimedia.org/wikipedia/commons/6/66/Mazda_logo.png" }
];


return (
<div style={{ padding: 20 }}>
<h1>เลือกยี่ห้อรถ</h1>
<div style={{ display: "flex", gap: 20 }}>
{brands.map((b) => (
<CarBrandCard
key={b.name}
brand={b.name}
img={b.img}
onSelect={() => {
setBrand(b.name);
navigate("/select");
}}
/>
))}
</div>
</div>
);
}