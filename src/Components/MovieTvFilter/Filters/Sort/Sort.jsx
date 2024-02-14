import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import "./Sort.scss";
import { useContext} from 'react';
import { meidaFilter } from '../../../../Pages/FilteredMediaList/FilteredMediaList';

const Sort = () => {

    const {setMoviesFilter} = useContext(meidaFilter);

    const handleSelection = (e)=> {
        setMoviesFilter( prev=> {
            return {
                ...prev,
                sort_by: e.target.value
            }
        })
    };

  return (
    <section className="sort">
        <h4 className="filter-t">
            sort <ChevronRightIcon />
        </h4>
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
    </section>
  )
}

export default Sort