export function InsurancePlanCard({ plan, onDetail, onSelect }) {
return (
<div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
<h3>{plan.name}</h3>
<p>ราคา: {plan.price} บาท</p>
<button onClick={onDetail}>ดูรายละเอียด</button>
&nbsp;
<button onClick={onSelect}>เลือกแผน</button>
</div>
);
}