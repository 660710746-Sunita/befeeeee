const calculateCarCoverage = (price) => {
  let baseCoverage = 0;

  if (price <= 5900) baseCoverage = 100000;
  else if (price <= 6900) baseCoverage = 200000;
  else if (price <= 7900) baseCoverage = 300000;
  else baseCoverage = 100000;

  return {
    damage: baseCoverage,
    lost: baseCoverage,
    fire: baseCoverage,
    flood: 0,
  };
};

const coverageData = {
  "2+": { 
    // ⭐ Dynamic
    car: (price) => calculateCarCoverage(price),
    thirdParty: { person: 500000, accident: 10000000, property: 15000000, deductible: "-" },
    extra: { personalAccident: "100,000 (1+6)", medicalExpense: "100,000 (1+6)", bail: "200,000" },
    service: { condolence: "5,000 / ต่อคน", death: "10,000 / ต่อคน" }
  },

  "3+": { 
    // ⭐ FIX ค่าเดิม (ไม่เปลี่ยนตามราคา)
    car: { 
      damage: 100000,
      lost: 0,
      fire: 0,
      flood: 0
    },
    thirdParty: { person: 500000, accident: 10000000, property: 150000000, deductible: "-" },
    extra: { personalAccident: "100,000 (1+6)", medicalExpense: "100,000 (1+6)", bail: "200,000" },
    service: { condolence: "-", death: "-" }
  },

  "3": { 
    // ⭐ FIX = 0 (ธรรมดา)
    car: { 
      damage: 0,
      lost: 0,
      fire: 0,
      flood: 0
    },
    thirdParty: { person: 500000, accident: 10000000, property: 1000000, deductible: "-" },
    extra: { personalAccident: "50,000 (1+5)", medicalExpense: "50,000 (1+5)", bail: "50,000" },
    service: { condolence: "-", death: "-" }
  }
};

export default coverageData;
