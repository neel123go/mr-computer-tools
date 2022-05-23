import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/LoginRegister/Login';
import Signup from './Components/Pages/LoginRegister/Signup';
import Footer from './Components/Pages/Shared/Footer';
import Header from './Components/Pages/Shared/Header';
import Purchase from './Components/Pages/Purchase/Purchase';
import RequireAuth from './Components/Pages/LoginRegister/RequireAuth';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/purchase/:toolId' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
      </Routes>
      <Footer></Footer>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;