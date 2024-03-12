import { useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { OilBarrel } from "@mui/icons-material";

const BackdropsCard = ({drop})=> {
    return (
        <div className="b-card">
            <div className="b-image-cont">
                <img src="" alt="" />
            </div>
            <div className="b-info">
                <div className="b-header">
                    <span>info</span>
                    <LockOpenRoundedIcon />
                </div>
            </div>
        </div>
    )
};

const Backdrops = () => {

    const [backdrops,setBackdrops] = useState({});
    const [backdropsLang,setBackdropsLang] = useState([]);
    const [selectedLang,setSelectedLang] = useState('null');

    useEffect(()=> {
        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setBackdrops(Object.groupBy(data,c=> c.iso_639_1))
        })
        fetchData(`configuration/languages`)
        .then(lang=> {
            setBackdropsLang(lang)
        })
    },[mediaType,id]);

  return (
    <div className="backdrops">
        <div className="backdrop-container">
            <nav className="back-nav">

            </nav>
            <div className="back-content">
                {
                    backdrops?.map((drop)=> (
                        <BackdropsCard key={drop} drop={drop} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Backdrops