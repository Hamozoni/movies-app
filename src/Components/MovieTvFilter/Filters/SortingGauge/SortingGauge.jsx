import { useState } from "react";


const SortingGauge = ({title,min,max,renderedFrom}) => {

    const [userScore,setUserScore] = useState({minRate: 0, maxRate: 10});
    const [isRatedPanel,setIsRatedPanel] = useState(false);

    const handleRatingRang = (e)=> {

        console.log(e)

        setIsRatedPanel(true);
         setUserScore(prev=> {

            const isFalidArea =  e.clientX !== 0 && e.clientX < 225 &&  e.clientX > 29;;

                if(e.clientX < 119 ) {
                    return {
                        ...prev,
                        minRate: isFalidArea ?  ((e.clientX - 20) / 20).toFixed(0) : prev.minRate

                    }
                }else if(e.clientX > 119 ) {
                    return {
                        ...prev,
                        maxRate: isFalidArea ?  ((e.clientX - 20) / 20).toFixed(0) : prev.maxRate

                    }
                }

        });
    };

    const handleDragingRate = (e,dir)=> {
        setUserScore(prev=> {
            setIsRatedPanel(true)
            console.log(e);
            const isFalidArea = e.clientX !== 0 && e.clientX < 225 &&  e.clientX > 29;

            if(dir === 'left'){
                return {
                    ...prev,
                    minRate : isFalidArea ?  ((e.clientX - 20) / 20).toFixed(0) : prev.minRate
                }
            }else if (dir === 'right') {
                return {
                    ...prev,
                    maxRate : isFalidArea ? ((e.clientX - 20) / 20).toFixed(0) : prev.maxRate
                }
            }
        })
    };

  return (
    <section className="user-score">
        <h5 className="us-score">
           { title}
        </h5>
        <div   
            onMouseLeave={()=> setIsRatedPanel(false)}  
            onClick={(e)=> handleRatingRang(e)} 
            className="rang"
            >
            <ul 
                onClick={(e)=> handleRatingRang(e)}
                className="gage">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span><span></span></li>
            </ul>
            <div  
                onDrag={(e)=> handleDragingRate(e,'left') }
                style={{left: `${userScore?.minRate * 10}%`}}
                className="left"
                >
            </div>
            <div 
                style={{left: `${userScore?.maxRate * 10}%`}}
                className="right"
                onDrag={(e)=> handleDragingRate(e,'right')}
                >
            </div>
            {
                isRatedPanel &&
                <div className="shows-rate-panel" >
                    {`rated ${userScore?.minRate} - ${userScore?.maxRate}`}
                </div>
            }
            <div 
                onClick={(e)=> handleRatingRang(e)}
                style={{width: `${(userScore?.maxRate - userScore?.minRate) * 10}%`,left: `${userScore?.minRate * 10}%`}}
                className="reng-fill">
            </div>
        </div>

 </section>
  )
}

export default SortingGauge