import { useState } from 'react'
import './App.css'

import Contect from './App/Contect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Contect />
    </>
  )
}

export default App
