import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import fetchData from '../../../utilities/fetchData';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

const MainMediaNav = ({mediaType}) => {
    const {id} = useParams();

    const [mediaData,setMediaData] = useState({});
    const [videos,setVideos] = useState({});

    const {innerWidth} = useContext(globalContext);


    useEffect(()=> {
        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setMediaData(data);
        }) 
        fetchData(`${mediaType}/${id}/videos?language=en-US`)
        .then((data)=>{
            setVideos(Object.groupBy(data?.results,e=> e.type))
        }) 
    },[mediaType,id]);
    const arrowIcon = innerWidth > 460 &&  <span className='icon'><ArrowDropDownIcon /></span>

  return (
    <nav className='media-header'>
        <div className='media-nav'>
             <div className='med-title'>
                 <span className='head'>overview</span>
                 {arrowIcon}
                 <ul className='links-list'>
                    <li className='nav-btn' ><Link to={`/${mediaType}/${id}`}>main</Link></li>
                    <li className='nav-btn' ><Link to={`/${mediaType}/${id}/titles`}>alternative tiltes</Link></li>
                    <li className='nav-btn' ><Link to={`/${mediaType}/${id}/cast`}>cast & crew</Link></li>
                    {
                        mediaType === 'tv' ? 
                        (
                            <>
                               <li className='nav-btn'><Link to={`/${mediaType}/${id}/episode_groups`}>episode groups</Link></li>
                               <li className='nav-btn'><Link to={`/${mediaType}/${id}/seasons`}>seasons</Link></li>
                            </>
                        ): 
                        (

                           <li className='nav-btn'><Link to={`/${mediaType}/${id}/releases`}>release dates</Link></li>
                        )
                    }
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/translations`}>
                            translations
                        </Link>
                    </li>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/changes`}>
                            changes
                        </Link>
                    </li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span className='head'>media</span>
                 {arrowIcon}
                 <ul className='links-list'>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/backdrops`} >
                             backdrops
                            <span>{mediaData?.backdrops?.length}</span>
                         </Link>
                     </li>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/logos`} >
                            logos
                            <span>{mediaData?.logos?.length}</span>
                        </Link>
                    </li>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/posters`} >
                            posters
                            <span>{mediaData?.posters?.length}</span>
                       </Link>
                    </li >
                    <li className='nav-btn videos'>
                        <Link>videos </Link>
                        <span><ArrowRightIcon/></span>
                        <ul className={`${innerWidth < 520 && 'mobile'} videos-ul`}>
                            {
                                Object.keys(videos)?.map(video=> (
                                    <li 
                                        className='nav-btn'
                                        key={video}>
                                            <Link to={`/${mediaType}/${id}/videos?type=${video}`}>
                                                {video} 
                                                <span>{videos[video]?.length}</span>
                                            </Link>
                                        </li>
                                ))
                            }
                        </ul>
                    </li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span className='head'> fandom</span>
                 {arrowIcon}
                 <ul className='links-list'>
                    <li className='nav-btn'><Link>discussions</Link></li>
                    <li className='nav-btn'><Link to={`/${mediaType}/${id}/reviews`}>reviews</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span className='head'> share</span>
                 {arrowIcon}
                 <ul className={`${innerWidth < 560 && 'last'} links-list`}>
                    <li className='nav-btn'><Link>share link</Link></li>
                    <li className='nav-btn'><Link>facebook</Link></li>
                    <li className='nav-btn'><Link>tweet</Link></li>
                 </ul>
             </div>
        </div>
    </nav>
  )
}

export default MainMediaNav