import { useLocation, useNavigate } from "react-router-dom";
import coverageData from "../data/coverageData";

export default function InsuranceDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log("state from navigate:", state);

    if (!state) {
        return <h2 style={{ padding: 20 }}>ไม่พบข้อมูลแผนประกัน</h2>;
    }

    const detail = coverageData[state.id];

    return (
        <div style={{ padding: 20 }}>
            <h1>รายละเอียดแผนประกัน</h1>

            <h2>{state.name}</h2>
            <p>ราคา: {state.price.toLocaleString()} บาท</p>

            <h3>คุ้มครองรถยนต์ที่เอาประกัน</h3>
            <ul>
                <li>รถเสียหาย: {detail.car.damage.toLocaleString()} บาท</li>
                <li>รถสูญหาย: {detail.car.lost.toLocaleString()} บาท</li>
                <li>รถไฟไหม้: {detail.car.fire.toLocaleString()} บาท</li>
                <li>รถน้ำท่วม: {detail.car.flood.toLocaleString()} บาท</li>
            </ul>

            <h3>คุ้มครองบุคคลภายนอก</h3>
            <ul>
                <li>ความเสียหายต่อชีวิตร่างกายบุคคลภายนอกต่อคน: {detail.thirdParty.person.toLocaleString()} บาท/ต่อคน</li>
                <li>ความเสียหายต่อชีวิตร่างกายบุคคลภายนอกต่อครั้ง: {detail.thirdParty.accident.toLocaleString()} บาท/ต่อครั้ง</li>
                <li>ทรัพย์สินต่อบุคคลภายนอกต่อครั้ง: {detail.thirdParty.property.toLocaleString()} บาท/ต่อครั้ง</li>
                <li>ค่าเสียหายส่วนแรก: {detail.thirdParty.deductible}</li>
            </ul>

            <h3>คุ้มครองเพิ่มเติม</h3>
            <ul>
                <li>อุบัติเหตุส่วนบุคคล: {detail.extra.personalAccident}</li>
                <li>ค่ารักษาพยาบาล: {detail.extra.medicalExpense}</li>
                <li>ประกันตัวผู้ขับขี่: {detail.extra.bail}</li>
            </ul>

            {detail.service.condolence !== "-" || detail.service.death !== "-" ? (
                <>
                    <h3>บริการเสริม</h3>
                    <ul>
                        <li>เงินปลอบขวัญ: {detail.service.condolence}</li>
                        <li>กรณีเสียชีวิต: {detail.service.death}</li>
                    </ul>
                </>
            ) : (
                <>
                    <h3>บริการเสริม</h3>
                    <p>-</p>
                </>
            )}

            <button onClick={() => navigate(-1)}>ย้อนกลับ</button>
        </div>
    );
}/**/
