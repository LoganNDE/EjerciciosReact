import './Card.css'


export function Card({children, setCardUp, index}){
    return(
        <div className="card" onClick={() => setCardUp(index)}>
            <span>{children}</span>
        </div>
    )
}