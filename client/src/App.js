import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Data from "./Pages/Data";
import './App.css';
import LoginSignup from './Pages/LoginSignup';
import Welcome from './Pages/welcome';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginSignup />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/data" element={<Data />}/>
          <Route path="/welcome" element={<Welcome />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;