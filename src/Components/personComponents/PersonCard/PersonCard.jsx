
import "./PersonCard.scss";

import persinImg from '../../../Images/person.jpg'
import { useNavigate } from "react-router-dom";
import fitLongString from "../../../utilities/fitLongString";

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
            <h4>{fitLongString(person?.name,13)}</h4>
            <h5>{fitLongString( person?.character,15) || fitLongString( person?.job,15)}</h5>
        </div>
    </div>
  )
}

export default PersonCard