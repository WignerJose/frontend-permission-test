import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HeaderComponent } from './Components/Header/header.component';
import { AppRouter } from './routers/app.route';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
    <Router>
     <HeaderComponent/>
     <AppRouter/>
     </Router>
    </div>
  );
}

export default App;
