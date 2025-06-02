import { Card } from "./components/Card"
import { CARDS, TOTAL_CARDS } from "./logic"
import './App.css'
import { useState } from "react"



function App() {


  const cardGame = Array(TOTAL_CARDS.length).fill(null);
  console.log(cardGame)
  
  const [cards, setCards] = useState(cardGame)
  const [countCardsUP, setCountCardsUP] = useState(0);

  const setCardUp = (index) =>{
    if (countCardsUP < 2){
      const newCards = [... cards];
      newCards[index] = TOTAL_CARDS[index]
      setCards(newCards);
      const countCards = countCardsUP + 1;
      setCountCardsUP(countCards)
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
