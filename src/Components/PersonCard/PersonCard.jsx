
import "./PersonCard.scss";

import persinImg from '../../Images/person.png'
import { useNavigate } from "react-router-dom";

const PersonCard = ({person})=> {

    const navigate = useNavigate();
  return (
    <div className="person-card" onClick={()=> navigate(`/person/${person?.id}`)}>
        <div className="person-image">
            <img 
                src={person?.profile_path ?
                      process.env.REACT_APP_BASE_URL + 'original' + person?.profile_path
                       : persinImg
                    } 
                alt={person?.name}/>
        </div>
        <div className="person-content">
            <h4>{person?.name?.length > 13 ? person?.name?.slice(0,13) + '...' : person?.name}</h4>
            <h5>{person?.character?.length > 15 ? person?.character?.slice(0,15) + "..." : person?.character}</h5>
        </div>
    </div>
  )
}

export default PersonCard