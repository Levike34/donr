import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Routes, Route} from 'react-router-dom';
import FundForm from './pages/FundForm';
import Search from './pages/Search';
import MyPage from './pages/MyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
    <Route path='/' element={<App />} />
    <Route path='/fund-form' element={<FundForm />} />
    <Route path='/search' element={<Search />} />
    <Route path='/me' element={<MyPage />} />
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
