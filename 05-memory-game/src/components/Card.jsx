import './Card.css'

export function Card({children, setCardUp, index}){
    return(
        <div className="flip-card" onClick={() => setCardUp(index, event)}>
            <div className="flip-card-inner">
                <div className="card flip-card-front"></div>
                <div className="card flip-card-back">
                    {children}
                </div>
            </div>
        </div>
     )
}