export function CarBrandCard({ brand, img, onSelect }) {
return (
<div onClick={onSelect} style={{ cursor: "pointer", border: "1px solid #ccc", padding: 10, width: 120 }}>
<img src={img} alt={brand} width="100" />
<p>{brand}</p>
</div>
);
}