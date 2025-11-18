import { useCar } from "../context/CarContext";
import { useNavigate } from "react-router-dom";


export default function SelectCar() {
const { brand, model, setModel, year, setYear, subModel, setSubModel } = useCar();
const navigate = useNavigate();


const models = ["รุ่น A", "รุ่น B", "รุ่น C"];
const years = [2021, 2022, 2023];
const subModels = ["ตัวท็อป", "ตัวกลาง", "ตัวรอง"];


return (
<div style={{ padding: 20 }}>
<h1>เลือกข้อมูลรถ: {brand}</h1>


<p>เลือกรุ่น:</p>
<select value={model} onChange={(e) => setModel(e.target.value)}>
<option value="">-- เลือกรุ่นรถ --</option>
{models.map((m) => (
<option key={m}>{m}</option>
))}
</select>


<p>เลือกปี:</p>
<select value={year} onChange={(e) => setYear(e.target.value)}>
<option value="">-- เลือกปี --</option>
{years.map((y) => (
<option key={y}>{y}</option>
))}
</select>


<p>เลือกรุ่นย่อย:</p>
<select value={subModel} onChange={(e) => setSubModel(e.target.value)}>
<option value="">-- เลือกรุ่นย่อย --</option>
{subModels.map((s) => (
<option key={s}>{s}</option>
))}
</select>


<br /><br />
<button onClick={() => navigate("/list")}>ถัดไป</button>
</div>
);
}