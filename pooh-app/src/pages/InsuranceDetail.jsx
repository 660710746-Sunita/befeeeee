import { useLocation, useNavigate } from "react-router-dom";


export default function InsuranceDetail() {
const { state } = useLocation();
const navigate = useNavigate();


return (
<div style={{ padding: 20 }}>
<h1>รายละเอียดแผนประกัน</h1>


<h2>{state?.name}</h2>
<p>ราคา: {state?.price} บาท</p>
<p>คุ้มครองพื้นฐาน + ซ่อมห้าง + น้ำท่วม</p>


<button onClick={() => navigate(-1)}>ย้อนกลับ</button>
</div>
);
}