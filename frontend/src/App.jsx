
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Login from "./page/Login"
import Signup from "./page/Signup"
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"
import Landing from "./page/Landing"
import Home from "./page/Home"
import Detail from "./page/Detail"
import Profile from "./page/Profile"
import Search from "./page/Search"
import Chat from "./component/Chat"
import Upload from "./page/Upload"
import Trade from "./page/Trade"
import OtherProfile from './page/OtherProfile'
import Report from "./component/Report"
import TradePopup from "./component/TradePopup"
import Query from "./page/Query"

function App() {

  return (
    <Router>
      <Routes>
        {/* nested route for login layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        {/* nested route for other pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/product/:id" element={<Detail />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/add" element={<Upload/>}></Route>
          <Route path="/trade" element={<Trade/>}></Route>
          <Route path="/user/:id" element={<OtherProfile/>}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/item" element={<Query/>}></Route>
        </Route>
        {/* temp path for debug */}
        <Route path="/test" element={<TradePopup />}></Route>
      </Routes>
    </Router>
  )
}

export default App
