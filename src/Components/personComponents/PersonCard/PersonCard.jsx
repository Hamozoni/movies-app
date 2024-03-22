
import "./PersonCard.scss";

import persinImg from '../../../assets/person.jpg'
import { useNavigate } from "react-router-dom";
import fitLongString from "../../../utilities/fitLongString";

const PersonCard = ({person})=> {

    const navigate = useNavigate();
  return (
    <div className="person-card scale" onClick={()=> navigate(`/person/${person?.id}`)}>
        <div className="person-image">
            <img 
                 className="image-hover"
                src={person?.profile_path ?
                      process.env.REACT_APP_BASE_URL + 'original' + person?.profile_path
                       : persinImg
                    } 
                alt={person?.name}/>
        </div>
        <div className="person-content">
            <h4 className="name">{fitLongString(person?.name,20)}</h4>
            <p className="char">{fitLongString( person?.character,15) || fitLongString( person?.job,15)}</p>
        </div>
    </div>
  )
}

export default PersonCard