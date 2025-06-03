import { Card } from "./components/Card"
import { CARDS, TOTAL_CARDS } from "./logic"
import './App.css'
import JSConfetti from 'js-confetti'
import { useEffect, useState } from "react"



function App() {

  const cardGame = [... TOTAL_CARDS].fill(null);
  console.log(cardGame)
  
  const MAX_CARDS_UP = 2;

  const [cards, setCards] = useState(cardGame)
  const [countCardsUP, setCountCardsUP] = useState(0);
  const [cardPairs, setCardPairs] = useState([]);
  const [pairsFounded, setPairsFounded] = useState([]);
  const [pairsDOM, setPairsDOM] = useState([]);

    
  
  
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
        const firstCardUP = cardPairs[0]

        const isPairs = cardPairs.every((cards) => cards === firstCardUP)
        const delay = isPairs ? 0 : 800;

        const idTimeout = setTimeout(() => {
          if (isPairs){
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti()

            const copyPairsDOM = [... pairsDOM];
            copyPairsDOM.forEach((cardDOM) =>{
              cardDOM.classList.remove('no-pair')
            })

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


            const cardsFlipped = document.querySelectorAll('.no-pair');
            console.log(cardsFlipped);
            cardsFlipped.forEach(element => {
                element.classList.remove('flipEffect', 'no-pairs');
            });
              
              // Reiniciamos el contador de cartas para permitir continuar el juego
              refreshCrads()
              setCardPairs([])
              setCountCardsUP(0)
            }
        }, delay);

        
        return () => clearTimeout(idTimeout);

      }

  },[cardPairs, pairsFounded])


  const setCardUp = (index, event) =>{
    if (countCardsUP < MAX_CARDS_UP){

      // Flip card
      const targetFlipCard = event.target.closest('.flip-card-inner');
      targetFlipCard.classList.add('flipEffect', 'no-pair')
      const newPairsDOM = [ ... pairsDOM];
      newPairsDOM.push(targetFlipCard)
      setPairsDOM(newPairsDOM);

      
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
