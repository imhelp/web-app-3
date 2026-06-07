import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './MenuReView/Header';
import TopMenu from './MenuReView/TopMenu';
import Map from './map/Map';
import App1 from './congestion/App1';
import MainPage from './mainPage/mainPage';
import Login from './login/Login';
import SignUp from './login/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/menu"
        element={
          <div>
            <Header />
            <TopMenu />
          </div>
        }
      />
      <Route path="/map" element={<Map />} />
      <Route path="/congestion" element={<App1 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
