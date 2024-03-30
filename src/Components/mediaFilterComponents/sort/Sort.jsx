import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./Sort.scss";
import { useContext, useState} from 'react';
import { mediaFilter } from '../../../Pages/filteredMediaList/FilteredMediaList';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

const Sort = () => {

    const {setMediaFiltering} = useContext(mediaFilter);
    const [isSortOpen,setIsSortOpen] = useState(false);
    const {lang,theme} = useContext(globalContext);

    const handleSelection = (e)=> {
        setMediaFiltering( prev=> {
            return {
                ...prev,
                sort_by: e.target.value
            }
        })
    };

  return (
    <section className="sort card b">
        <h4 
            className={`t-color-${theme} filter-t b-b`}
            onClick={()=> setIsSortOpen(!isSortOpen)}
            >
            {lang === 'en' ? 'sort' : 'رتب'}
            {isSortOpen ? <ExpandMoreIcon />:<ChevronRightIcon />}
        </h4>
        {
            isSortOpen &&
            <div className="sort-content">
                <h5 className={`t-color-${theme}-1 c-ti`}>
                    {lang === 'en' ? 'Sort Results By ' : 'رتب النتائج بواسطة'}
                </h5>
                <select 
                    onChange={(e)=> handleSelection(e)}
                    className={`back-color-${theme}-2 t-color-${theme} selections card`}
                    id='selecteions'
                    >
                    <option value="popularty.desc">popularty descending</option>
                    <option value="popularty.asc">popularty ascending</option>
                    <option value="vote_average.desc">rating descending</option>
                    <option value="vote_average.asc">rating ascending</option>
                    <option value="primary_release_date.desc">release date descending</option>
                    <option value="primary_release_date.asc">release date ascending</option>
                </select>
            </div>
        }
    </section>
  )
}

export default Sort