import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityList from './components/CityList';
import ZoneList from './components/ZoneList';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Accueil from './components/Accueil';
import Abar from './components/Abar';
import { Login, Logout } from '@mui/icons-material';
import PharmacieList from './components/PharmacieList';
import Auth from './components/Auth';
import UserList from './components/UserList';
import LoginPage from './components/Auth';
const App = () => {
    

return (
    <>
    
        <BrowserRouter>
            <Abar/>
            <Routes>
                <Route path='/' element={<Accueil/>} />
                <Route path='/Auth' element={<LoginPage/>} />
                <Route path="/Villes" element={<CityList/>}/>
                <Route path="/Zones" element={<ZoneList/>}/>
                <Route path='/Pharmacies' element={<PharmacieList/>}/>
                <Route path='/Users' element={<UserList/>}/>
                
            </Routes>
          
        </BrowserRouter>    
    </>
    
);
};


export default App;

