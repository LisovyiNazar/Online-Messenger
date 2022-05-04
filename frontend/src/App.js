import { Routes,Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Messenger from './components/Messenger/Messenger'

function App() {
  return (
    <Routes>
      <Route path='/messenger/login' element={<Login/>}/>
      <Route path='/messenger/register' element={<Register/>}/>
      <Route path='/' element={<Messenger/>}/>
    </Routes>
  )
}

export default App
