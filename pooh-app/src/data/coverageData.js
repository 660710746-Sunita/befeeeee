const coverageData = {
  1: { // 2+
    car: { damage: 100000, lost: 100000, fire: 100000, flood: 0 },
    thirdParty: { person: 500000, accident: 10000000, property: 15000000, deductible: "-" },
    extra: {personalAccident: "100,000 (1+6)",medicalExpense: "100,000 (1+6)",bail: "200,000"},
    service: { condolence: "5,000 / ต่อคน", death: "10,000 / ต่อคน"}
  },
  2: { // 3+
    car: { damage: 100000, lost: 0, fire: 0, flood: 0 },
    thirdParty: { person: 500000, accident: 10000000, property: 150000000, deductible: "-" },
    extra: {personalAccident: "100,000 (1+6)",medicalExpense: "100,000 (1+6)",bail: "200,000"},
    service: { condolence: "-", death: "-"}
  },
  3: { // 3 ธรรมดา
    car: { damage: 0, lost: 0, fire: 0, flood: 0 },
    thirdParty: { person: 500000, accident: 10000000, property: 1000000, deductible: "-" },
    extra: {personalAccident: "50,000 (1+5)",medicalExpense: "50,000 (1+5)",bail: "50,000"},
    service: { condolence: "-", death: "-"}
  }
};

export default coverageData;/**/
