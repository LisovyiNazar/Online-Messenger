import { Routes,Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

function App() {
  return (
    <Routes>
      <Route path='/messenger/login' element={<Login /> }/>
      <Route path='/messenger/register' element={<Register /> }/>
    </Routes>
  );
}

export default App;
