import { useCar } from "../context/CarContext";
import { Link } from "react-router-dom";


export function Navbar() {
const { brand, model } = useCar();
return (
<div style={{ padding: 15, background: "#eee", marginBottom: 20 }}>
<Link to="/">หน้าแรก</Link>
<span style={{ marginLeft: 20 }}>ยี่ห้อ: {brand || "-"}</span>
<span style={{ marginLeft: 20 }}>รุ่น: {model || "-"}</span>
</div>
);
}