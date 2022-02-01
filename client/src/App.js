import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DoctorProfile from './pages/DoctorProfile';
import PatientProfile from './pages/PatientProfile';
import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {

    const [exampleData, setExampleData] = useState([{}])

    // one test of calling to backend
    useEffect(() => {

        const callCheckHealth = async () => {

            try {

                const url = "http://localhost:8080/api"
                const headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                const res = await axios(url);
                console.log("Data from backend---",res.data)
                setExampleData(res.data)
                console.log('the example data is: ', res.data)


            }
            catch (err) {
            }
        }
        callCheckHealth();
    }, [])

    //second test using cookies

    function secondTest(){
        axios.get(
            "http://localhost:8080/api", {withCredentials:true}).then(res =>{console.log(res)})

    }
useEffect(() => {secondTest()}, [])

  return (
      <div className="App">
        <CssBaseline />
        
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/DoctorProfile' element={<DoctorProfile/>} />
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/PatientProfile' element={<PatientProfile/>}/>
          
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;