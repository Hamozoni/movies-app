
import Sort from "./sort/Sort";
import WhereToWatch from "./whereToWatch/WhereToWatch";
import Filters from "./filters/Filters";
import { useParams } from "react-router-dom";


const MediaFilter = ({mediaType}) => {

    const {filter} = useParams();


  return (
    <section className="filters">
        <h4 className="filt-title">
            {filter?.replace('_',' ')} {mediaType}
        </h4>
        <Sort />
        <WhereToWatch />
        <Filters />
    </section>
  )
}

export default MediaFilter