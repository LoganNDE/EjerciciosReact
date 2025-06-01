import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [player, setPlayer] = useState();
  const [search, setSearch] = useState();



  function handdleKey(event){ 
    if (event.key == 'Enter'){
      setSearch(event.target.value);
    }
  }


  useEffect(() =>{
    if (!search) return

    const playerName = search;
    fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${playerName}`)
      .then(res => res.json())
      .then(data => { setPlayer(data.player) })
      }, [search])

      
  return (
    <>
        <input type="text" className='rounded-lg border-solid border-1 border-blue-200 px-2 py-1 mb-12' id='searchBar' onKeyDown={() => handdleKey(event)} placeholder={search ?? "Cristiano"}/>

        <div className='grid grid-cols-4 gap-6'>
          {player && player.map((player, index) =>{5
              return (
                <div className='childGrid'>
                  <div key={index}></div>
                  <h2>{player.strPlayer}</h2>
                  <img src={player.strThumb} alt="" />
                </div>
              )
          })}
        </div>

    </>
    
  )
}

export default App
