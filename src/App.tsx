import { Routes, Route } from 'react-router-dom'
import PrimaryLayout from 'layout/Primary'
import Home from 'pages/home'
import Explore from 'pages/explore'
import './App.css'

const App = (): JSX.Element => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<PrimaryLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='explore' element={<Explore />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
