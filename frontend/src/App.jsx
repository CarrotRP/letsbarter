
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Login from "./page/Login"
import Signup from "./page/Signup"
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"

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
        <Route path="/" element={<MainLayout />}>
          
        </Route>
      </Routes>
    </Router>
  )
}

export default App
