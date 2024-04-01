import { useContext, useState } from "react";

import "./SortingGauge.scss";
import { globalContext } from "../../../../GlobalStateContext/GlobalContext";

import { mediaFilter } from "../../../../Pages/filteredMediaList/FilteredMediaList";

const SortingGauge = ({title,renderFrom}) => {


    const {mediaFiltering,setMediaFiltering} = useContext(mediaFilter);
    const {theme} = useContext(globalContext);
    
    const [isRatedPanel,setIsRatedPanel] = useState(false);

    const handleRatingRang = (e)=> {

        setIsRatedPanel(true);
         setMediaFiltering(prev=> {
            const isFalidArea =  e.clientX !== 0 && e.clientX < 230 &&  e.clientX > 27;
                if(e.clientX < 119 ) {
                    if(renderFrom === 'rating'){
                        return {
                            ...prev,
                            'vote_average.gte' : isFalidArea ?  ((e.clientX - 27) / 20).toFixed(0) : Number(prev['vote_average.gte'])
                        }
                    }else if (renderFrom === 'runtime') {
                        return {
                            ...prev,
                            'with_runtime.gte' : isFalidArea ?  ((e.clientX - 27) * 2).toFixed(0) : Number(prev['with_runtime.gte'])
                        }
                    }
                }else if(e.clientX > 119 ) {
                    if(renderFrom === 'rating') {
                        return {
                            ...prev,
                            'vote_average.lte': isFalidArea ? ((e.clientX - 27) / 20).toFixed(0) : Number(prev['vote_average.lte'])
                        }
                    }else if(renderFrom === 'runtime'){
                        return {
                            ...prev,
                            'with_runtime.lte': isFalidArea ? ((e.clientX - 27) * 2).toFixed(0) : Number(prev['with_runtime.lte'])
                        }
                    }
                }

        });
    };

    const handleDragingRate = (e,dir)=> {
        setMediaFiltering(prev=> {
            setIsRatedPanel(true);

            console.log(e);
            const isFalidArea = e.clientX !== 0 && e.clientX < 230 &&  e.clientX > 27;

            if(dir === 'left'){
                if(renderFrom === 'rating'){
                    return {
                        ...prev,
                        'vote_average.gte' : isFalidArea ?  ((e.clientX - 27) / 20).toFixed(0) : Number(prev['vote_average.gte'])
                    }
                }else if (renderFrom === 'runtime') {
                    return {
                        ...prev,
                        'with_runtime.gte' : isFalidArea ?  ((e.clientX - 27) * 2).toFixed(0) : Number(prev['with_runtime.gte'])
                    }
                }
            }else if (dir === 'right') {
                if(renderFrom === 'rating') {
                    return {
                        ...prev,
                        'vote_average.lte': isFalidArea ? ((e.clientX - 27) / 20).toFixed(0) : Number(prev['vote_average.lte'])
                    }
                }else if(renderFrom === 'runtime'){
                    return {
                        ...prev,
                        'with_runtime.lte': isFalidArea ? ((e.clientX - 27) * 2).toFixed(0) : Number(prev['with_runtime.lte'])
                    }
                }
            }
        })
    };

    const GaugeCol = ()=> {
        const spa = [];
        const maxRate = renderFrom === 'rating' ? 10 : 28;
        for(let i = 0; i < maxRate; i++ ){
            spa.push(i);
        }
        return (
            <ul
                onClick={(e)=> handleRatingRang(e)}
                className="gage"
                 >
                {
                    spa?.map( s =>(
                        <li className={s === 0 || s % 5 === 0 ? 'active' : ''}> 
                            <span >
                            </span>
                            {
                                s === spa?.length - 1 && 
                                <span></span>
                            }
                        </li>
                    ))
                }
            </ul>
        )


    }

  return (
    <section className="user-score">
        <h5 className={`t-color-${theme} us-score`}>
           { title}
        </h5>
        <div   
            onMouseLeave={()=> setIsRatedPanel(false)}  
            onClick={(e)=> handleRatingRang(e)} 
            className="rang"
            >
                <GaugeCol />

            <div  
                onDrag={(e)=> handleDragingRate(e,'left') }
                style={{left: `${renderFrom === 'rating' ? mediaFiltering['vote_average.gte']  * 10 : mediaFiltering['with_runtime.gte']  / 4}%`}}
                className="left"
                >
            </div>
            <div 
                style={{left: `${renderFrom === 'rating' ? mediaFiltering['vote_average.lte'] * 10 : mediaFiltering['with_runtime.lte']  / 4}%`}}
                className="right"
                onDrag={(e)=> handleDragingRate(e,'right')}
                >
            </div>
            {
                isRatedPanel &&
                <div className="shows-rate-panel" >
                    {`${renderFrom === 'rating' ? 'rated' + mediaFiltering['vote_average.gte'] :  mediaFiltering['with_runtime.gte'] + 'm' } - ${renderFrom === 'rating' ? mediaFiltering['vote_average.lte'] : mediaFiltering['with_runtime.lte'] + 'm'}`}
                </div>
            }
            <div 
                onClick={(e)=> handleRatingRang(e)}
                style={{
                        width:
                         `${renderFrom === 'rating' ? (mediaFiltering['vote_average.lte'] - mediaFiltering['vote_average.gte'] ) * 10 :(mediaFiltering['with_runtime.lte'] - mediaFiltering['with_runtime.gte'] ) / 4 }%`,
                        left: `${renderFrom === 'rating' ?  mediaFiltering['vote_average.gte']  * 10 :mediaFiltering['with_runtime.gte'] / 4 }%`}}
                className="reng-fill">
            </div>
        </div>

 </section>
  )
}

export default SortingGauge