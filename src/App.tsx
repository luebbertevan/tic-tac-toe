import { useState } from 'react'
import './App.css'

const Box = () => <div className='box-container'>X</div>

const Grid = () => {
  return ( 
    <div className='grid-container'>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </div>
  )
}

function App() {
  const [box, setBox] = useState(Box)

  return ( 
    <div>
       <Grid/>
       <h1 className="text-red-500">Hello Tailwind!</h1>
  
    </div>
  )
}

export default App
