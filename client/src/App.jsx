import { useState } from 'react'
import Navbar from './components/Navbar'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='m-1'>
        Testingggg
        <Navbar />
        
      </div>
    </>
  )
}

export default App
