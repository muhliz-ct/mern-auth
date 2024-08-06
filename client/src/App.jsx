import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import About from "./Pages/About"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Home from "./Pages/Home"
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import { useSelector } from "react-redux"
import Admin from "./Pages/Admin"
import UserEdit from "./Pages/userEdit"

export default function App() {


  const {currentUser} = useSelector((state)=>state.user);
  return <BrowserRouter>

    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/admin"  element={(currentUser&&currentUser?.isAdmin?<Admin/>:<Navigate to={'/sign-in'}/>)}></Route>
      <Route path="/user/:id"  element={(currentUser&&currentUser?.isAdmin?<UserEdit/>:<Navigate to={'/sign-in'}/>)}></Route>
    </Routes>
  </BrowserRouter>
}
