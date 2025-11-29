export function CarModelDropdown({ label, value, options, onChange }) {
return (
<div style={{ marginBottom: 10 }}>
<p>{label}</p>
<select value={value} onChange={(e) => onChange(e.target.value)}>
<option value="">-- เลือก --</option>
{options.map((opt) => (
<option key={opt}>{opt}</option>
))}
</select>
</div>
);
}