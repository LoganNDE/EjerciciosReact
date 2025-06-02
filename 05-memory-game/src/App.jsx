import { Card } from "./components/Card"
import { CARDS, TOTAL_CARDS } from "./logic"
import './App.css'
import { useState } from "react"



function App() {


  const cardGame = Array(TOTAL_CARDS.length).fill(null);
  console.log(cardGame)
  
  const MAX_CARDS_UP = 2;
  const [cards, setCards] = useState(cardGame)
  const [countCardsUP, setCountCardsUP] = useState(0);
  const [cardPairs, setCardPairs] = useState([]);
  const [indexPairs, setIndexPairs] = useState();


  const setCardUp = (index) =>{
    if (countCardsUP < MAX_CARDS_UP){
      
      // Actualización del estado de las cartas
      const newCards = [... cards];
      newCards[index] = TOTAL_CARDS[index]
      setCards(newCards);
      
      
      const newCardPairs = cardPairs ?? [];
      newCardPairs.push(newCards[index])
      setCardPairs(newCardPairs);

      
      //Conteo de cartas levantadass
      const countCards = countCardsUP + 1;
      setCountCardsUP(countCards)


      if (cardPairs.length == 2){
        const firstCardUP = cardPairs[0]
        if (cardPairs.every((cards) => cards === firstCardUP)){

          cardPairs.forEach(cardPair => {
            const newIndexPairs = [];
              
            for (let i = 0; i < cards.length; i++){
              if (cards[i] == cardPair){
                newIndexPairs.push(i)
              }
            }

            console.log(newIndexPairs);
                      
            setIndexPairs(newIndexPairs);
          });

          console.log(indexPairs)


          console.log("Pareja econtrada")
        }else{
          console.log("Error. La pareja de cartas levantada no coincide")

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
