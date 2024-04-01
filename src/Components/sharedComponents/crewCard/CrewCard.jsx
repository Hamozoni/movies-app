import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";

import "./crewCard.scss";

import fitLongString from "../../../utilities/fitLongString"
import persinImg from "../../../assets/person.jpg";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

const CrewCard = ({person}) => {

    const navigate = useNavigate()

    const {theme} = useContext(globalContext);

  return (
    <div className="crew-card card">
        <div 
            className="crew-image" 
            onClick={()=> navigate(`/person/${person?.id}`)}
            >
            <img 
                 className="image-hover"
                  src={person?.profile_path ?
                      process.env.REACT_APP_BASE_URL + 'original' + person?.profile_path
                       : persinImg
                    } 
                alt={person?.name}/>
        </div>
        <div className="crew-content">
            <h4 
                onClick={()=> navigate(`/person/${person?.id}`)} 
                className={`name link-hover t-color-${theme}`}
                >
                  {fitLongString(person?.name,13)}
            </h4>
           <div>
              {
                person?.known_for?.map((title)=> (
                   <Link 
                        to={`/${title?.media_type}/${title.id}`} 
                        key={title?.title || title?.name}
                        className={`link-hover t-color-${theme}-2`}
                        >
                          {title?.title || title?.name}, 
                    </Link>
                ))
              
              }
            </div>
        </div>
    </div>
  )
}

export default CrewCard