ถ้าจะลองดูใช้งานจริงใช้ port 3000 นะ ทำ 80 ไม่ได้ แต่ 3000 ก็ call api ไปเพิ่มข้อมุลหลังบ้านได้อยุ่เท่าที่ลอง
แต่ไม่แน่ใจว่าถุกมั้ย ลองเทสแล้วถุก แต่อาจจะพลาดมั้ยไม่รุ้ 

** ยังไม่ได้ทำส่วนของ get personalInfo นะ ทำแค่ get ประกัน กับ รถ **



### Backend
```bash

cd backend

docker-compose up -d

docker-compose ps
```

### Frontend
```bash

cd pooh-app

npm install

npm start
```


### Frontend
```bash
# http://localhost:3000 ใน
```

### Backend API
```bash
curl http://localhost:8080/api/health
# response: {"status":"healthy"}
```

### Database (pgAdmin)
 ดูใน .env
---

cd backend
docker-compose down


cd backend
docker-compose down -v  
docker-compose up -d    


## API Endpoints

- **POST** `/api/insurance-selection` - สร้างการเลือกใหม่
- **GET** `/api/insurance-selections` - ดูทั้งหมด
- **GET** `/api/insurance-selection/:id` - ดูรายการเดียว
- **PUT** `/api/insurance-selection/:id` - แก้ไข
- **DELETE** `/api/insurance-selection/:id` - ลบ
- **GET** `/api/health` - ตรวจสอบ API


## ตัวอย่าง POST Request

```bash
curl -X POST http://localhost:8080/api/insurance-selection \
  -H "Content-Type: application/json" \
  -d '{
    "car_brand_code": "TOYOTA",
    "car_model_code": "YARIS",
    "car_submodel_code": "1.5",
    "car_year": 2023,
    "insurance_type": "2+",
    "price": 5000,
    "sum_insured": 100000
  }'
```

---

## ตัวอย่าง Response

```json
{
  "message": "Insurance selection created successfully",
  "data": {
    "id": 5,
    "car_brand_code": "TOYOTA",
    "car_model_code": "YARIS",
    "car_submodel_code": "1.5",
    "car_year": 2023,
    "insurance_type": "2+",
    "price": 5000,
    "sum_insured": 100000,
    "created_at": "2025-11-19T13:17:35.081687Z",
    "updated_at": "2025-11-19T13:17:35.081687Z"
  }
}
```

