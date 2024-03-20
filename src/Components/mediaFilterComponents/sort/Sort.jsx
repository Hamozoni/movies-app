import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./Sort.scss";
import { useContext, useState} from 'react';
import { mediaFilter } from '../../../Pages/filteredMediaList/FilteredMediaList';

const Sort = () => {

    const {setMediaFiltering} = useContext(mediaFilter);
    const [isSortOpen,setIsSortOpen] = useState(false);

    const handleSelection = (e)=> {
        setMediaFiltering( prev=> {
            return {
                ...prev,
                sort_by: e.target.value
            }
        })
    };

  return (
    <section className="sort card">
        <h4 className="filter-t" onClick={()=> setIsSortOpen(!isSortOpen)}>
            sort{isSortOpen ? <ExpandMoreIcon />:<ChevronRightIcon />}
        </h4>
        {
            isSortOpen &&
            <div className="sort-content">
                <h5 className="c-ti">
                    Sort Results By 
                </h5>
                <select 
                    onChange={(e)=> handleSelection(e)}
                    className='selections'
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