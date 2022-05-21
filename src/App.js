import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Footer from './Components/Pages/Shared/Footer';
import Header from './Components/Pages/Shared/Header';
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;