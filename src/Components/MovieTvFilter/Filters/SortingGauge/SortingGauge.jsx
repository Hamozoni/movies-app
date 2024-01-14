import { useContext, useState } from "react";
import { movieFilter } from "../../../../Pages/Movies/Movies";


const SortingGauge = ({title,renderFrom}) => {


    const [isRatedPanel,setIsRatedPanel] = useState(false);
    const [moviesFilter,setMoviesFilter] = useContext(movieFilter);

    const handleRatingRang = (e)=> {

        console.log(e)

        setIsRatedPanel(true);
         setMoviesFilter(prev=> {

            const isFalidArea =  e.clientX !== 0 && e.clientX < 230 &&  e.clientX > 27;

                if(e.clientX < 119 ) {
                    if(renderFrom === 'rating'){
                        return {
                            ...prev,
                            'vote_average.gte' : isFalidArea ?  ((e.clientX - 27) / 20).toFixed(0) : prev['vote_average.gte']
                        }
                    }else if (renderFrom === 'runtime') {
                        return {
                            ...prev,
                            'with_runtime.gte' : isFalidArea ?  ((e.clientX - 27) * 2).toFixed(0) : prev['with_runtime.gte']
                        }
                    }
                }else if(e.clientX > 119 ) {
                    if(renderFrom === 'rating') {
                        return {
                            ...prev,
                            'vote_average.lte': isFalidArea ? ((e.clientX - 27) / 20).toFixed(0) : prev['vote_average.lte']
                        }
                    }else if(renderFrom === 'runtime'){
                        return {
                            ...prev,
                            'with_runtime.lte': isFalidArea ? ((e.clientX - 27) * 2).toFixed(0) : prev['with_runtime.lte']
                        }
                    }
                }

        });
    };

    const handleDragingRate = (e,dir)=> {
        setMoviesFilter(prev=> {
            setIsRatedPanel(true);

            console.log(e);
            const isFalidArea = e.clientX !== 0 && e.clientX < 230 &&  e.clientX > 27;

            if(dir === 'left'){
                if(renderFrom === 'rating'){
                    return {
                        ...prev,
                        'vote_average.gte' : isFalidArea ?  ((e.clientX - 27) / 20).toFixed(0) : prev['vote_average.gte']
                    }
                }else if (renderFrom === 'runtime') {
                    return {
                        ...prev,
                        'with_runtime.gte' : isFalidArea ?  ((e.clientX - 27) * 2).toFixed(0) : prev['with_runtime.gte']
                    }
                }
            }else if (dir === 'right') {
                if(renderFrom === 'rating') {
                    return {
                        ...prev,
                        'vote_average.lte': isFalidArea ? ((e.clientX - 27) / 20).toFixed(0) : prev['vote_average.lte']
                    }
                }else if(renderFrom === 'runtime'){
                    return {
                        ...prev,
                        'with_runtime.lte': isFalidArea ? ((e.clientX - 27) * 2).toFixed(0) : prev['with_runtime.lte']
                    }
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
                style={{left: `${renderFrom === 'rating' ? moviesFilter['vote_average.gte']  * 10 : moviesFilter['with_runtime.gte']  / 4}%`}}
                className="left"
                >
            </div>
            <div 
                style={{left: `${renderFrom === 'rating' ? moviesFilter['vote_average.lte'] * 10 : moviesFilter['with_runtime.lte']  / 4}%`}}
                className="right"
                onDrag={(e)=> handleDragingRate(e,'right')}
                >
            </div>
            {
                isRatedPanel &&
                <div className="shows-rate-panel" >
                    {`${renderFrom === 'rating' ? 'rated' + moviesFilter['vote_average.gte'] :  moviesFilter['with_runtime.gte'] + 'm' } - ${renderFrom === 'rating' ? moviesFilter['vote_average.lte'] : moviesFilter['with_runtime.lte'] + 'm'}`}
                </div>
            }
            <div 
                onClick={(e)=> handleRatingRang(e)}
                style={{
                        width:
                         `${renderFrom === 'rating' ? (moviesFilter['vote_average.lte'] - moviesFilter['vote_average.gte'] ) * 10 :(moviesFilter['with_runtime.lte'] - moviesFilter['with_runtime.gte'] ) / 4 }%`,
                        left: `${renderFrom === 'rating' ?  moviesFilter['vote_average.gte']  * 10 :moviesFilter['with_runtime.gte'] / 4 }%`}}
                className="reng-fill">
            </div>
        </div>

 </section>
  )
}

export default SortingGauge