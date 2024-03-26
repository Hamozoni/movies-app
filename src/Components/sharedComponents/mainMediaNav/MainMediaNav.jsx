import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import fetchData from '../../../utilities/fetchData';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';
import { languages } from '../../../utilities/languages';

const MainMediaNav = ({mediaType,linkUrl}) => {
    const {id} = useParams();

    const [mediaData,setMediaData] = useState({});
    const [videos,setVideos] = useState({});

    const {innerWidth,lang} = useContext(globalContext);

    useEffect(()=> {
        fetchData(`${linkUrl}/images`)
        .then((data)=>{
            setMediaData(data);
        }) 
        fetchData(`${linkUrl}/videos?language=${lang}`)
        .then((data)=>{
            setVideos(Object.groupBy(data?.results,e=> e.type))
        }) 
    },[mediaType,id,lang]);


  const arrowIcon = innerWidth > 460 &&  <span className='icon'><ArrowDropDownIcon /></span>

  const Overview = ()=> {
    return (
        <div className='med-title'>
            <span className='head'>{languages[lang].overview}</span>
            {arrowIcon}
            <ul className='links-list'>
                <li className='nav-btn'>
                    <Link to={`/${linkUrl}`}>{languages[lang].main}</Link>
                </li>
                {
                    (mediaType !== 'person' && mediaType !== 'collection') && 
                     <>
                        <li className='nav-btn' >
                            <Link to={`/${linkUrl}/titles`}>{languages[lang].tiltes}</Link>
                        </li>
                        <li className='nav-btn' >
                            <Link to={`/${linkUrl}/cast`}>{languages[lang].castCrew}</Link>
                        </li>
                     </>
                }
                {  mediaType === 'tv' && 
                    (
                        <>
                            <li className='nav-btn'>
                                <Link to={`/${linkUrl}/episode_groups`}>{languages[lang].episodeGroups}</Link>
                            </li>
                            <li className='nav-btn'>
                                <Link to={`/${linkUrl}/seasons`}>{languages[lang].seasons}</Link>
                            </li>
                        </>
                    )
                }
                {  
                    (mediaType !== 'person' && mediaType !== 'collection') && 
                        <li className='nav-btn'>
                            <Link to={`/${linkUrl}/releases`}>{languages[lang].releaseDates}</Link>
                        </li>
                }
                <li className='nav-btn'>
                    <Link to={`/${linkUrl}/translations`}>
                        {languages[lang].translations}
                    </Link>
                </li>
                <li className='nav-btn'>
                    <Link to={`/${linkUrl}/changes`}>
                        {languages[lang].changes}
                    </Link>
                </li>
            </ul>
        </div>
    )
  };



  return (
    <nav className='media-header'>
        <div className='media-nav'>
            <Overview />
             <div className='med-title'>
                 <span className='head'>{languages[lang].media}</span>
                 {arrowIcon}
                 <ul className='links-list'>
                    {  mediaType === 'person' ? 
                        <li className='nav-btn'>
                        <Link to={`/${linkUrl}/profile`} >
                                {languages[lang].profile}
                            <span>{mediaData?.profiles?.length}</span>
                            </Link>
                        </li>

                        :
                        <>
                            <li className='nav-btn'>
                                <Link to={`/${linkUrl}/backdrops`} >
                                    {languages[lang].backdrops}
                                    <span>{mediaData?.backdrops?.length}</span>
                                </Link>
                            </li>
                            <li className='nav-btn'>
                                <Link to={`/${linkUrl}/logos`} >
                                    {languages[lang].logos}
                                    <span>{mediaData?.logos?.length}</span>
                                </Link>
                            </li>
                            <li className='nav-btn'>
                                <Link to={`/${linkUrl}/posters`} >
                                    {languages[lang].posters}
                                    <span>{mediaData?.posters?.length}</span>
                            </Link>
                            </li >
                            <li className='nav-btn videos'>
                                <Link>{languages[lang].videos} </Link>
                                <span><ArrowRightIcon/></span>
                                <ul className={`${innerWidth < 520 && 'mobile'} videos-ul`}>
                                    {
                                        Object.keys(videos)?.map(video=> (
                                            <li 
                                                className='nav-btn'
                                                key={video}>
                                                    <Link to={`/${linkUrl}/videos?type=${video}`}>
                                                        {video} 
                                                        <span>{videos[video]?.length}</span>
                                                    </Link>
                                                </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        </>
                    
                    } 
                     
                 </ul>
             </div>
             <div className='med-title'>
                 <span className='head'> {languages[lang].fandom}</span>
                 {arrowIcon}
                 <ul className='links-list'>
                    <li className='nav-btn'>
                         <Link to={`/${linkUrl}/reviews`}>{languages[lang].reviews}</Link>
                    </li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span className='head'> {languages[lang].share}</span>
                 {arrowIcon}
                 <ul className={`${innerWidth < 560 && 'last'} links-list`}>
                    <li className='nav-btn'><Link>{languages[lang].shareLink}</Link></li>
                    <li className='nav-btn'><Link>facebook</Link></li>
                    <li className='nav-btn'><Link>tweeter</Link></li>
                 </ul>
             </div>
        </div>
    </nav>
  )
}

export default MainMediaNav