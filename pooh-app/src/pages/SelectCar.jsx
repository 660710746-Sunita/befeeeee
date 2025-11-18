import { useCar } from "../context/CarContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getModelsByBrand,
  getSubModelsByBrandAndModel,
  getYearsByBrandModelSubModel,
} from "../utils/csvParser";

export default function SelectCar() {
  const { brand, model, setModel, year, setYear, subModel, setSubModel } = useCar();
  const navigate = useNavigate();

  const [models, setModels] = useState([]);
  const [subModels, setSubModels] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  // ดึง models เมื่อ brand เปลี่ยน
  useEffect(() => {
    if (brand) {
      setLoading(true);
      getModelsByBrand(brand).then((data) => {
        setModels(data);
        setModel(""); // รีเซ็ต model
        setSubModel(""); // รีเซ็ต submodel
        setYear(""); // รีเซ็ต year
        setSubModels([]);
        setYears([]);
        setLoading(false);
      });
    }
  }, [brand, setModel, setSubModel, setYear]);

  // ดึง subModels เมื่อ model เปลี่ยน
  useEffect(() => {
    if (brand && model) {
      setLoading(true);
      getSubModelsByBrandAndModel(brand, model).then((data) => {
        setSubModels(data);
        setSubModel(""); // รีเซ็ต submodel
        setYear(""); // รีเซ็ต year
        setYears([]);
        setLoading(false);
      });
    }
  }, [brand, model, setSubModel, setYear]);

  // ดึง years เมื่อ subModel เปลี่ยน
  useEffect(() => {
    if (brand && model && subModel) {
      setLoading(true);
      getYearsByBrandModelSubModel(brand, model, subModel).then((data) => {
        setYears(data);
        setYear(""); // รีเซ็ต year
        setLoading(false);
      });
    }
  }, [brand, model, subModel, setYear]);


  return (
    <div style={{ padding: 20 }}>
      <h1>เลือกข้อมูลรถ: {brand}</h1>

      {loading && <p style={{ color: 'blue' }}>กำลังโหลดข้อมูล...</p>}

      <p>เลือกรุ่น:</p>
      <select 
        value={model} 
        onChange={(e) => setModel(e.target.value)}
        disabled={!brand || models.length === 0}
      >
        <option value="">-- เลือกรุ่นรถ --</option>
        {models.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <p>เลือกรุ่นย่อย:</p>
      <select 
        value={subModel} 
        onChange={(e) => setSubModel(e.target.value)}
        disabled={!model || subModels.length === 0}
      >
        <option value="">-- เลือกรุ่นย่อย --</option>
        {subModels.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <p>เลือกปี:</p>
      <select 
        value={year} 
        onChange={(e) => setYear(e.target.value)}
        disabled={!subModel || years.length === 0}
      >
        <option value="">-- เลือกปี --</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <br /><br />
      <button 
        onClick={() => navigate("/list")}
        disabled={!year}
      >
        ถัดไป
      </button>
    </div>
  );
}