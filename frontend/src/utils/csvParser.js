import Papa from 'papaparse';

// แยกข้อมูล CSV เป็น array ของ objects
const parseCSV = (csvText) => {
  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

// รวมข้อมูล CSV ทั้งหมด
/*export const getAllInsuranceData = async () => {
  try {
    const response1 = await fetch('/data/Insurance_plan2+.csv');
    const response2 = await fetch('/data/Insurance_plan3.csv');
    const response3 = await fetch('/data/Insurance_plan3+.csv');
    
    const csv1 = await response1.text();
    const csv2 = await response2.text();
    const csv3 = await response3.text();
    
    const data1 = await parseCSV(csv1);
    const data2 = await parseCSV(csv2);
    const data3 = await parseCSV(csv3);
    
    return [...data1, ...data2, ...data3];
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
};*/
export const getAllInsuranceData = async () => {
  try {
    const response1 = await fetch('/data/Insurance_plan2+.csv');
    const response2 = await fetch('/data/Insurance_plan3.csv');
    const response3 = await fetch('/data/Insurance_plan3+.csv');
    
    const csv1 = await response1.text();
    const csv2 = await response2.text();
    const csv3 = await response3.text();
    
    const data1 = (await parseCSV(csv1)).map(row => ({ ...row, INS_TYPE: "2+" }));
    const data2 = (await parseCSV(csv2)).map(row => ({ ...row, INS_TYPE: "3" }));
    const data3 = (await parseCSV(csv3)).map(row => ({ ...row, INS_TYPE: "3+" }));
    
    return [...data1, ...data2, ...data3];
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
};


// ดึง CAR_MODEL_CODE ตามที่เลือก CAR_BRAND_CODE
export const getModelsByBrand = async (brandCode) => {
  const allData = await getAllInsuranceData();
  
  const models = [...new Set(
    allData
      .filter(row => row.CAR_BRAND_CODE?.trim() === brandCode?.trim())
      .map(row => row.CAR_MODEL_CODE)
      .filter(Boolean)
  )];
  
  return models.sort();
};

// ดึง CAR_SUBMODEL_CODE ตามที่เลือก brand และ model
export const getSubModelsByBrandAndModel = async (brandCode, modelCode) => {
  const allData = await getAllInsuranceData();
  
  const subModels = [...new Set(
    allData
      .filter(row => 
        row.CAR_BRAND_CODE?.trim() === brandCode?.trim() && 
        row.CAR_MODEL_CODE?.trim() === modelCode?.trim()
      )
      .map(row => row.CAR_SUBMODEL_CODE)
      .filter(Boolean)
  )];
  
  return subModels.sort();
};

// ดึง CAR_YEAR ตามที่เลือก brand, model และ submodel
export const getYearsByBrandModelSubModel = async (brandCode, modelCode, subModelCode) => {
  const allData = await getAllInsuranceData();
  
  const years = [...new Set(
    allData
      .filter(row => 
        row.CAR_BRAND_CODE?.trim() === brandCode?.trim() && 
        row.CAR_MODEL_CODE?.trim() === modelCode?.trim() &&
        row.CAR_SUBMODEL_CODE?.trim() === subModelCode?.trim()
      )
      .map(row => row.CAR_YEAR)
      .filter(Boolean)
  )];
  
  return years.sort((a, b) => b - a); // เรียงจากใหม่ไปเก่า
};

// ดึงทั้ง brand codes
export const getAllBrands = async () => {
  const allData = await getAllInsuranceData();
  
  const brands = [...new Set(
    allData
      .map(row => row.CAR_BRAND_CODE)
      .filter(Boolean)
  )];
  
  return brands.sort();
};

// ดึงข้อมูลแผนประกันและราคาตรงตามที่เลือก
export const getInsurancePlansBySelection = async (brandCode, modelCode, subModelCode, year) => {
  const allData = await getAllInsuranceData();
  
  const plans = allData
    .filter(row => 
      row.CAR_BRAND_CODE?.trim() === brandCode?.trim() && 
      row.CAR_MODEL_CODE?.trim() === modelCode?.trim() &&
      row.CAR_SUBMODEL_CODE?.trim() === subModelCode?.trim() &&
      row.CAR_YEAR?.toString().trim() === year?.toString().trim()
    )
    .map((row, index) => {
      // กำหนดชื่อแผนตามประเภท
      let displayName = row.SUB_PACKAGE_NAME || 'Unknown Plan';
      
      if (row.INS_TYPE === "2+") {
        displayName = "เบี้ยประกันชั้น 2+";
      } else if (row.INS_TYPE === "3") {
        displayName = "เบี้ยประกันชั้น 3";
      } else if (row.INS_TYPE === "3+") {
        displayName = "เบี้ยประกันชั้น 3+";
      }
      
      return {
        id: index,
        name: displayName,
        price: parseFloat(row.GROSS_PREMIUM) || 0,
        sumInsured: parseFloat(row.SUM_INSURED) || 0,
        packageCode: row.SUB_PACKAGE_CODE,
        insuranceType: row.INS_TYPE,
        original: row // เก็บข้อมูลเดิมไว้เผื่อต้องใช้ในภายหลัง
      };
    })
    // ลบ duplicates โดยเก็บเฉพาะแผนที่ไม่ซ้ำ
    .filter((plan, index, self) => 
      index === self.findIndex(p => p.name === plan.name && p.price === plan.price)
    );
  
  return plans;
};
