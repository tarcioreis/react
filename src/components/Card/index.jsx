import './styles.css'

function Card (props) {
    return (
      <div className="card">
        <strong>{props.name}</strong>
        <img src={props.avatar} alt='foto de perfil'/>
      </div>
    );
}

export default Card;