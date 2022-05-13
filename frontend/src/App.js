import { Routes, Route } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Messenger from "./components/Messenger/Messenger"
import ProtectRoutes from "./components/ProtectRoutes/ProtectRoutes"

function App() {

  return (
    <Routes>
      <Route path="*" element={<ProtectRoutes/>}/>
      <Route path="/" element={<Messenger/>}/>
      <Route path="/messenger/login" element={<Login/>}/>
      <Route path="/messenger/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
