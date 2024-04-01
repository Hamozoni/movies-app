import { useContext, useState} from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./Sort.scss";

import { mediaFilter } from '../../../Pages/filteredMediaList/FilteredMediaList';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';


const optionList = {
    en : {
        popDes: 'popularty descending',
        popAsc :'popularty ascending',
        ratDes: 'rating descending',
        ratAsc: 'rating ascending',
        relDaDes: 'release date descending',
        relDaAsc: 'release date ascending',
    },
    ar : {
        popDes: 'الشهرة تصاعديا',
        popAsc :'الشهرة تنازليا',
        ratDes: 'التقيم تصاعديا',
        ratAsc: 'التقيم تنازليا',
        relDaDes: 'تاريخ الإصدار تصاعديا',
        relDaAsc: 'تاريخ الإصدار تنازليا',
    }
}

const Sort = () => {

    const {setMediaFiltering} = useContext(mediaFilter);
    const {lang,theme} = useContext(globalContext);

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
                    <option value="popularty.desc">
                        {optionList[lang].popDes}
                    </option>
                    <option value="popularty.asc">
                        {optionList[lang].popAsc}
                    </option>
                    <option value="vote_average.desc">
                        {optionList[lang].ratDes}
                    </option>
                    <option value="vote_average.asc">
                        {optionList[lang].ratAsc}
                    </option>
                    <option value="primary_release_date.desc">
                        {optionList[lang].relDaDes}
                    </option>
                    <option value="primary_release_date.asc">
                        {optionList[lang].relDaAsc}
                    </option>
                </select>
            </div>
        }
    </section>
  )
}

export default Sort