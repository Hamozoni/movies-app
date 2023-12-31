import { useContext, useEffect, useState } from "react";
import "./PersonCover.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";


const PersonCover = ({details,id}) => {

    const {lang} = useContext(globalContext);
    const [knownFor,setKnownFor] = useState([]);

    useEffect(()=>{
        fetchData(`person/${id}/combined_credits?language=${lang}`)
        .then(data=> {
            console.log(data);
            setKnownFor(data);
        })
    },[id]);

  return (
    <section className="person-cover">
        <div className="per-cover-container">
            <div className="person-img">
                <img src="" alt="" />
            </div>
            <div className="person-cov-conrent">
                <div className="person-name">
                    <h3></h3>
                </div>
                <div className="piagrahpy">
                    <h4 className="pi-ti">

                    </h4>
                    <aside></aside>
                </div>
                <section className="known-for">
                    <h4 className="kn-for">

                    </h4>
                    <div className="kn-for-container">
                        
                    </div>

                </section>
            </div>
        </div>
    </section>
  )
}

export default PersonCover;