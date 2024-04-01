
import Sort from "./sort/Sort";
import WhereToWatch from "./whereToWatch/WhereToWatch";
import Filters from "./filters/Filters";



const MediaFilter = () => {

  return (
    <section className="filters">
        <Sort />
        <WhereToWatch />
        <Filters />
    </section>
  )
}

export default MediaFilter