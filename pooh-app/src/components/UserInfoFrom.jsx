export function UserInfoForm({ onSubmit }) {
return (
<div>
<input placeholder="ชื่อ" name="name" /> <br /><br />
<input placeholder="เบอร์โทร" name="phone" /> <br /><br />
<input placeholder="อีเมล" name="email" /> <br /><br />
<button onClick={onSubmit}>ยืนยัน</button>
</div>
);
}