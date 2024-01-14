import { useContext, useState } from "react";
import { movieFilter } from "../../../../Pages/Movies/Movies";


const SortingGauge = ({title}) => {


    const [isRatedPanel,setIsRatedPanel] = useState(false);
    const [moviesFilter,setMoviesFilter] = useContext(movieFilter);

    const handleRatingRang = (e)=> {

        console.log(e)

        setIsRatedPanel(true);
         setMoviesFilter(prev=> {

            const isFalidArea =  e.clientX !== 0 && e.clientX < 225 &&  e.clientX > 29;;

                if(e.clientX < 119 ) {
                    return {
                        ...prev,
                        'vote_average.gte' : isFalidArea ?  ((e.clientX - 20) / 20).toFixed(0) : prev['vote_average.gte']
                    }
                }else if(e.clientX > 119 ) {
                    return {
                        ...prev,
                        'vote_average.lte': isFalidArea ? ((e.clientX - 20) / 20).toFixed(0) : prev['vote_average.lte']
                    }
                }

        });
    };

    const handleDragingRate = (e,dir)=> {
        setMoviesFilter(prev=> {
            setIsRatedPanel(true);

            console.log(e);
            const isFalidArea = e.clientX !== 0 && e.clientX < 225 &&  e.clientX > 29;

            if(dir === 'left'){
                return {
                    ...prev,
                    'vote_average.gte' : isFalidArea ?  ((e.clientX - 20) / 20).toFixed(0) : prev['vote_average.gte']
                }
            }else if (dir === 'right') {
                return {
                    ...prev,
                    'vote_average.lte': isFalidArea ? ((e.clientX - 20) / 20).toFixed(0) : prev['vote_average.lte']
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
                style={{left: `${moviesFilter['vote_average.gte']  * 10}%`}}
                className="left"
                >
            </div>
            <div 
                style={{left: `${moviesFilter['vote_average.lte'] * 10}%`}}
                className="right"
                onDrag={(e)=> handleDragingRate(e,'right')}
                >
            </div>
            {
                isRatedPanel &&
                <div className="shows-rate-panel" >
                    {`rated ${moviesFilter['vote_average.gte'] } - ${moviesFilter['vote_average.lte']}`}
                </div>
            }
            <div 
                onClick={(e)=> handleRatingRang(e)}
                style={{width: `${(moviesFilter['vote_average.lte'] - moviesFilter['vote_average.gte'] ) * 10}%`,left: `${moviesFilter['vote_average.gte']  * 10}%`}}
                className="reng-fill">
            </div>
        </div>

 </section>
  )
}

export default SortingGauge