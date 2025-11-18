import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <CarProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CarProvider>
  );
}