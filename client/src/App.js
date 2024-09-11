import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login_Signup from './pages/Login_Signup';
import GeneralDetailsForm from './pages/GeneralDetailsForm';
import { FacultyDetailsForm } from './pages/FacultyDetailsForm';
import { ResourceDetailsForm } from './pages/ResourceDetailsForm';
import { Hero } from './pages/Hero';
import { Dashboard } from './pages/Dashboard';
import { CreateTableForm } from './pages/CreateTableForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hero/>}></Route>
          <Route path='/home' element={<Dashboard/>}></Route>
          <Route path='/login' element={<Login_Signup/>}></Route>
          <Route path='/generalDetailForm' element={<GeneralDetailsForm />}></Route>
          <Route path='/facultyDetailForm' element={<FacultyDetailsForm />}></Route>
          <Route path='/resourceDetailForm' element={<ResourceDetailsForm />}></Route>
          <Route path='/createTimetableForm' element={<CreateTableForm />}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
