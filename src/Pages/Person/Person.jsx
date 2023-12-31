import { useParams } from "react-router-dom";
import PersonCover from "../../Components/PersonCover/PersonCover";

const Person = ()=> {

    const {id} = useParams()
    return (
        <div className="person">
           <PersonCover id={id}/>
        </div>
    );
};

export default Person;