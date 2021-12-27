import './index.css';

const Card = (props) => {
   return (
      <div className="card">
         <img className="card__image" src={props.src} alt={props.alt} />
         <p className="card__title">{props.title}</p>
         <p className="card__subtitle">{props.subtitle}</p>
      </div>
   )
}

export default Card;