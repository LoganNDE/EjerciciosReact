import { Card } from "./components/Card"
import { CARDS, TOTAL_CARDS } from "./logic"
import './App.css'
import { useEffect, useState } from "react"



function App() {

  const cardGame = [... TOTAL_CARDS].fill(null);
  console.log(cardGame)
  
  const MAX_CARDS_UP = 2;
  const [cards, setCards] = useState(cardGame)
  const [countCardsUP, setCountCardsUP] = useState(0);
  const [cardPairs, setCardPairs] = useState([]);
  const [pairsFounded, setPairsFounded] = useState([]);

    
  
  
  const refreshCrads = () =>{
    const newCards = [... cards];
    
    const updatedCards = newCards.map((cardMap) => {
      if (!pairsFounded.includes(cardMap)){
        return cardMap = null
      }else{
        const tempCardMap = cardMap
        return cardMap = tempCardMap;
      }
    })

    console.log(updatedCards);
    setCards(updatedCards)
  }


  useEffect(() =>{
    if (cardPairs.length == 2){
      console.log("tenemos las dos parejas")
        const firstCardUP = cardPairs[0]
      if (cardPairs.every((cards) => cards === firstCardUP)){

          const newPairsFounded = [... pairsFounded];          
          newPairsFounded.push(firstCardUP);
          setPairsFounded(newPairsFounded);

          console.log("Pareja econtrada")
          console.log("CARTAS ACERTADAS:" + newPairsFounded)
          
          // Reiniciamos el estado del juego
          setCountCardsUP(0)
          setCardPairs([])
        }else{
          console.log("Error. La pareja de cartas levantada no coincide")
          
          // Reiniciamos el contador de cartas para permitir continuar el juego
          refreshCrads()
          setCardPairs([])
          setCountCardsUP(0)
        }
      }

  },[cardPairs, pairsFounded])


  const setCardUp = (index) =>{
    if (countCardsUP < MAX_CARDS_UP){
      
      // Actualización del estado de las cartas
      const newCards = [... cards];
      newCards[index] = TOTAL_CARDS[index]
      setCards(newCards);
      
      const newCardPairs = [... cardPairs];
      newCardPairs.push(newCards[index])
      setCardPairs(newCardPairs);
      
      //Conteo de cartas levantadass
      const newCountCardsUP = countCardsUP + 1;
      setCountCardsUP(newCountCardsUP)
    }


  }

  return (
    <>
      <div className="board">
          {cards.map((card, index) => {
            return(
              <>
              <Card key={index} index={index} setCardUp={setCardUp}>
                {card}
              </Card>
              </>

            )
          })}
      </div>
    </>
  )
}

export default App
