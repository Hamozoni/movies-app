
import Sort from "./sort/Sort";
import WhereToWatch from "./whereToWatch/WhereToWatch";
import Filters from "./filters/Filters";
import { useParams } from "react-router-dom";


const MediaFilter = ({mediaType}) => {

    const {filter} = useParams();


  return (
    <section className="filters">
        <Sort />
        <WhereToWatch />
        <Filters />
    </section>
  )
}

export default MediaFilter