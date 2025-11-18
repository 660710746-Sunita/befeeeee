import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectCar from "./pages/SelectCar";
import InsuranceList from "./pages/InsuranceList";
import InsuranceDetail from "./pages/InsuranceDetail";
import PersonalInfo from "./pages/PersonalInfo";


export default function AppRoutes() {
return (
<Routes>
<Route path="/" element={<Home />} />
<Route path="/select" element={<SelectCar />} />
<Route path="/list" element={<InsuranceList />} />
<Route path="/detail" element={<InsuranceDetail />} />
<Route path="/info" element={<PersonalInfo />} />
</Routes>
);
}