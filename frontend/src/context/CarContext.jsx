import React, { createContext, useContext, useState } from "react";


const CarContext = createContext();
export const useCar = () => useContext(CarContext);


export const CarProvider = ({ children }) => {
const [brand, setBrand] = useState("");
const [model, setModel] = useState("");
const [year, setYear] = useState("");
const [subModel, setSubModel] = useState("");
const [selectedPlan, setSelectedPlan] = useState(null);


return (
<CarContext.Provider
value={{ brand, setBrand, model, setModel, year, setYear, subModel, setSubModel, selectedPlan, setSelectedPlan }}
>
{children}
</CarContext.Provider>
);
};