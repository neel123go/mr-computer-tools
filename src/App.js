import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/LoginRegister/Login';
import Signup from './Components/Pages/LoginRegister/Signup';
import Footer from './Components/Pages/Shared/Footer';
import Header from './Components/Pages/Shared/Header';
import Purchase from './Components/Pages/purchase/purchase';
import RequireAuth from './Components/Pages/LoginRegister/RequireAuth';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/purchase' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;