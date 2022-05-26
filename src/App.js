import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/LoginRegister/Login';
import Signup from './Components/Pages/LoginRegister/Signup';
import Footer from './Components/Pages/Shared/Footer';
import Header from './Components/Pages/Shared/Header';
import Purchase from './Components/Pages/Purchase/Purchase';
import RequireAuth from './Components/Pages/LoginRegister/RequireAuth';
import { Toaster } from 'react-hot-toast';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import MyOrders from './Components/Pages/Dashboard/MyOrders';
import AddReview from './Components/Pages/Dashboard/AddReview';
import MyProfile from './Components/Pages/Dashboard/MyProfile';
import ManageOrders from './Components/Pages/Dashboard/ManageOrders';
import MakeAdmin from './Components/Pages/Dashboard/MakeAdmin';
import AddProduct from './Components/Pages/Dashboard/AddProduct';
import ManageProducts from './Components/Pages/Dashboard/ManageProducts';
import RequireAdmin from './Components/Pages/LoginRegister/RequireAdmin';
import RequireNormalUser from './Components/Pages/LoginRegister/RequireNormalUser';
import Payment from './Components/Pages/Dashboard/Payment';
import NotFound from './Components/Pages/Shared/NotFound';
import Blogs from './Components/Pages/Blogs/Blogs';
import MyPortfolio from './Components/Pages/MyPortfolio/MyPortfolio';
import AddBlogs from './Components/Pages/Dashboard/AddBlogs';

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
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='payment/:id' element={
            <RequireAuth>
              <Payment></Payment>
            </RequireAuth>
          }></Route>
          <Route path='myOrder' element={
            <RequireNormalUser>
              <MyOrders></MyOrders>
            </RequireNormalUser>
          }></Route>
          <Route path="addReview" element={
            <RequireNormalUser>
              <AddReview></AddReview>
            </RequireNormalUser>
          }></Route>
          <Route path="manageOrders" element={
            <RequireAdmin>
              <ManageOrders></ManageOrders>
            </RequireAdmin>
          }></Route>
          <Route path="makeAdmin" element={
            <RequireAdmin>
              <MakeAdmin></MakeAdmin>
            </RequireAdmin>
          }></Route>
          <Route path="addProduct" element={
            <RequireAdmin>
              <AddProduct></AddProduct>
            </RequireAdmin>
          }></Route>
          <Route path="manageProducts" element={
            <RequireAdmin>
              <ManageProducts></ManageProducts>
            </RequireAdmin>
          }></Route>
          <Route path="addBlogs" element={
            <RequireAdmin>
              <AddBlogs></AddBlogs>
            </RequireAdmin>
          }></Route>
        </Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/myPortfolio' element={<MyPortfolio />}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
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