import { useNavigate } from "react-router-dom";
import { useCar } from "../context/CarContext";


export default function InsuranceList() {
const navigate = useNavigate();
const { setSelectedPlan } = useCar();


const plans = [
{ id: 1, name: "2+", price: 12000 },
{ id: 2, name: "3+", price: 15000 },
{ id: 3, name: "3 ธรรมดา", price: 18000 }
];


return (
<div style={{ padding: 20 }}>
<h1>รายการเบี้ยประกัน</h1>


{plans.map((p) => (
<div key={p.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
<h3>{p.name}</h3>
<p>ราคา: {p.price} บาท</p>
<button onClick={() => navigate("/detail", { state: p })}>ดูรายละเอียด</button>
&nbsp;
<button
onClick={() => {
setSelectedPlan(p);
navigate("/info");
}}
>
เลือกแผน
</button>
</div>
))}
</div>
);
}