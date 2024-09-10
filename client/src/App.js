import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login_Signup from './pages/Login_Signup';
import GeneralDetailsForm from './pages/GeneralDetailsForm';
import { FacultyDetailsForm } from './pages/FacultyDetailsForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login_Signup/>}></Route>
          <Route path='/generalDetailForm' element={<GeneralDetailsForm />}></Route>
          <Route path='/facultyDetailForm' element={<FacultyDetailsForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
