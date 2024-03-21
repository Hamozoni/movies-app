import { useNavigate } from "react-router-dom"
import fitLongString from "../../../utilities/fitLongString"

import persinImg from "../../../assets/person.jpg";

import "./crewCard.scss";


const CrewCard = ({person}) => {

    const navigate = useNavigate()

  return (
    <div 
        className="crew-card card" 
        onClick={()=> navigate(`/person/${person?.id}`)}
        >
        <div className="crew-image">
            <img 
                 className="image-hover"
                src={person?.profile_path ?
                      process.env.REACT_APP_BASE_URL + 'original' + person?.profile_path
                       : persinImg
                    } 
                alt={person?.name}/>
        </div>
        <div className="crew-content">
            <h4 className="name">{fitLongString(person?.name,13)}</h4>
            <h5>{fitLongString( person?.character,15) || fitLongString( person?.job,15)}</h5>
        </div>
    </div>
  )
}

export default CrewCard