import { useState } from 'react'
import './App.css'

function App() {
  const [circle, setCircle] = useState([])
  const [undid, setUndid] = useState([])

  const handleClick = (event) => { 
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    console.log(newDot);
    setCircle((prev) => [...prev, newDot]);
    setUndid([])
  }

  const handleDesfazer = (event) => {
    event.stopPropagation()

    if(circle.length === 0) {
      return
    }

    const lastItem = circle[circle.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setCircle((prev) => {
      const newArray = [...prev].slice(0,-1);
      return newArray;
    })
  }

  const handleRedo = (event) => {
    event.stopPropagation()

    if(undid.length === 0) {
      return
    }

    const recoveredCircle = undid[undid.length - 1];

    setUndid((prev) => {
      const newArray = [...prev].slice(0,-1);
      return newArray;
    })

    setCircle((prev) => [...prev, recoveredCircle])
  }

  return (
    <div className="App" onClick={handleClick}>
      <button onClick={handleDesfazer} className='botaoDesfazer'>Desfazer</button>
      <button onClick={handleRedo} className='botaoRedo'>Refazer</button>
      {circle.map((circulo, index) =>(
        <span key={index} className='redondo' style={{left: circulo.clientX, top: circulo.clientY}}/>
      ))}
    </div>
  )
}

export default App