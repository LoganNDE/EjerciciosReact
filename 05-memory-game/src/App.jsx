import { Card } from "./components/Card"
import { CARDS, TOTAL_CARDS } from "./logic"
import './App.css'
import { useState } from "react"



function App() {

  const cardGame = [... TOTAL_CARDS].fill(null);
  console.log(cardGame)
  
  const MAX_CARDS_UP = 2;
  const [cards, setCards] = useState(cardGame)
  const [countCardsUP, setCountCardsUP] = useState(0);
  const [cardPairs, setCardPairs] = useState([]);
  const [indexPairs, setIndexPairs] = useState([]);

    const refreshCrads = () =>{
    const newCards = [... cards];
    
    const updatedCards = newCards.map((cardMap, index) => {
      if (!indexPairs.includes(index)){
        cardMap = null
      }
    })

    console.log(updatedCards);
    setCards(updatedCards)
  }


  const setCardUp = (index) =>{
    if (countCardsUP < MAX_CARDS_UP){
      
      // Actualización del estado de las cartas
      const newCards = [... cards];
      newCards[index] = TOTAL_CARDS[index]
      setCards(newCards);      
      
      const newCardPairs = cardPairs ?? [];
      newCardPairs.push(newCards[index])
      setCardPairs(newCardPairs);
      

      const newIndex = indexPairs ?? [];
      newIndex.push(index);
      setIndexPairs(newIndex);

      
      //Conteo de cartas levantadass
      const countCards = countCardsUP + 1;
      setCountCardsUP(countCards)


      if (cardPairs.length == 2){
        const firstCardUP = cardPairs[0]
        if (cardPairs.every((cards) => cards === firstCardUP)){

          console.log('Indice de parejas: ' + indexPairs)
          console.log("Pareja econtrada")
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
