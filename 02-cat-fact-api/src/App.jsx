import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [fact, setFact] = useState()
  const [image, setImage] = useState();


  // Recuperamos el fact con la api
  useEffect(() =>{
      fetch('https://catfact.ninja/fact')
        .then(res => res.json())
        .then(data => setFact(data.fact))
  }, [])

  
  useEffect(() =>{
    if (!fact) return
    
    const factSplit = fact.split(" ").slice(0,3).join(' ');

    fetch(`https://cataas.com/cat/says/${factSplit}?json=true`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setImage(data.url)
      })
        
  },[fact])


  return (
    <>
    <h1>Hola mundo</h1>
    {image && <img src={image}></img>}
    {fact && <p>{fact}</p>}
    </>
  )
}

export default App
