import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='p-2 h-[100vh] w-full'>
        
        <Navbar />

        <Home />
      </div>
    </>
  )
}

export default App
