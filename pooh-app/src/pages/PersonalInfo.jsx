import { useCar } from "../context/CarContext";


export default function PersonalInfo() {
const { selectedPlan } = useCar();


return (
<div style={{ padding: 20 }}>
<h1>กรอกข้อมูลลูกค้า</h1>


<p>แผนที่เลือก: {selectedPlan?.name}</p>


<input placeholder="ชื่อ" /> <br /><br />
<input placeholder="เบอร์โทร" /> <br /><br />
<input placeholder="อีเมล" /> <br /><br />


<button>ยืนยัน</button>
</div>
);
}