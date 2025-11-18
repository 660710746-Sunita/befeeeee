import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CarProvider } from './context/CarContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <CarProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CarProvider>
  );
}

export default App;