import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [enabled, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0});

  useEffect(() =>{

    const handleMouse = (event) =>{
      const { clientX, clientY } = event;
      console.log(clientX, clientY);
      setPosition({x: clientX, y: clientY});
    }

    if (enabled){
      window.addEventListener('pointermove', handleMouse)
    }
    
    return () => {
      console.log("EventListener limpiado")
      window.removeEventListener('pointermove', handleMouse);
    }

  }, [enabled])

  

  return(
    <main>
      <div style={{
        background: 'red',
        width: '40px',
        height: '40px',
        position: 'absolute',
        top: '0px',
        left: '0px',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}></div>
      <button onClick={()=> setEnable(!enabled)}>{enabled ? 'Desactivar' : 'Activar'} efecto</button>
    </main> 
  )
}

export default App
