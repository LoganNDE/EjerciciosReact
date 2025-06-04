import { Card } from "./components/Card"
import { CARDS, TOTAL_CARDS } from "./logic"
import './App.css'
import JSConfetti from 'js-confetti'
import { useEffect, useState } from "react"
import { Popup } from "./components/Popup"



function App() {

  const cardGame = [... TOTAL_CARDS].fill(null);
  console.log(cardGame)
  
  const MAX_CARDS_UP = 2;

  const [cards, setCards] = useState(cardGame)
  const [countCardsUP, setCountCardsUP] = useState(0);
  const [cardPairs, setCardPairs] = useState([]);
  const [pairsFounded, setPairsFounded] = useState([]);
  const [pairsDOM, setPairsDOM] = useState([]);
  const [winner, setWinner] = useState(false);



  const restGame = () =>{
    setCards(cardGame);
    setCardUp(0)
    setCardPairs([])
    setPairsFounded([])
    setPairsDOM([])
    setWinner(false);
    const allCards = document.querySelectorAll('.flipEffect');
    allCards.forEach((card) => card.classList.remove('flipEffect'));
  }

    // Comprobar ganador
      const displayConfetti = () =>{
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti()
  }

 
  // Comprobamos si todas las cartas han sido encontradas
  useEffect(() =>{
    if (cards.every((card) => card != null)){
      console.log("Tenemos ganador");
      setWinner(true);
      displayConfetti();
    }
  }, [cards])
    
  
  
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
    if (countCardsUP < MAX_CARDS_UP && !winner){

      // Actualización del estado de las cartas
      if (cards[index] === null){

        // Flip card
        const targetFlipCard = event.target.closest('.flip-card-inner');
        targetFlipCard.classList.add('flipEffect', 'no-pair')
        const newPairsDOM = [ ... pairsDOM];
        newPairsDOM.push(targetFlipCard)
        setPairsDOM(newPairsDOM);

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


  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6 md:text-4xl md:mb-12">Memory Game | Desafía tu mente</h1>
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
      {winner && <Popup textDisplay={"Enhorabuena has ganado"} textButton={"Volver a jugar"} actionButton={restGame}/>}
    </>
  )
}

export default App
