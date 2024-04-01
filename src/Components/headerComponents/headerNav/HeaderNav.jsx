import { useContext} from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';

import {languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

import "./headerNav.scss";

const HeaderNav = ({isMenu,setIsMenu}) => {

  const {theme,lang,innerWidth} = useContext(globalContext);
  const navigate = useNavigate();

  const handleNavigate = (filter,mediaType)=>{
      navigate(`list/${mediaType}/${filter}`);
  };

  return (
    <nav className="nav-links">
        <div className={`nav-container ${isMenu ? 'active' : ''}`}  
            onClick={()=> setIsMenu(false)} 
            >
                {
                    innerWidth < 667 && 

                    <div className={`back-color-${theme}-1 close-icon-logo`}>
                            <CloseIcon   
                                  onClick={()=> setIsMenu(false)} 
                                  className={`t-color-${theme}-1 close-icon`}
                                  />
                        <h2 className="l">
                             {languages[lang].logo}
                        </h2>
                    </div>
                }
                <div className={`filters-container ${innerWidth < 667 && `back-color-${theme}-2`}`}>
                  <div className="filter-box">
                      <h4 className={`link t-color-${theme}`}> 
                          {languages[lang].movies} 
                        </h4>
                      <ul className={`fiter back-color-${theme}-2`}>
                          <li 
                              className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('popular','movie')}>
                                  {languages[lang].popular}
                          </li>
                          <li 
                            className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('now_playing','movie')}>
                                  {languages[lang].nowPlaying}
                              </li>
                          <li 
                              className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('upcoming','movie')}>
                                  {languages[lang].upComing}
                              </li>
                          <li 
                              className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('top_rated','movie')}>
                                  {languages[lang].topRated}
                          </li>
                      </ul>
                  </div>
                  <div className="filter-box">
                      <h4 className={`link t-color-${theme}`}>
                          {languages[lang].tvShows}
                      </h4>
                      <ul className={`fiter back-color-${theme}-2`}>
                          <li 
                            className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('popular','tv')}>
                                  {languages[lang].popular}
                              </li>
                          <li 
                            className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('airing_today','tv')}>
                                  {languages[lang].airingToday}
                          </li>
                          <li 
                              className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('on_the_air','tv')}>
                                  {languages[lang].onTv}
                          </li>
                          <li 
                            className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('top_rated','tv')}
                              >
                              {languages[lang].topRated}
                          </li>
                      </ul>
                  </div>
                  <div className="filter-box">
                      <h4 className={`link t-color-${theme}`}> 
                          {languages[lang].people}
                      </h4>
                      <ul className={`fiter back-color-${theme}-2`}>
                          <li 
                              className={`nav-btn link-hover t-color-${theme}-2`}
                              onClick={()=> handleNavigate('popular','person')}>
                                  {lang === 'ar' ?  'مشاهير': 'popular people'}
                          </li>
                      </ul>
                  </div>

                </div>
        </div>
    </nav>
  )
}

export default HeaderNav