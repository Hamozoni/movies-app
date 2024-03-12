import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchData from '../../../utilities/fetchData';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const MainMediaNav = ({mediaType}) => {
    const {id} = useParams();

    const [mediaData,setMediaData] = useState({})
    const [videos,setVideos] = useState({})

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

  return (
    <header className='media-header'>
        <nav className='media-nav'>
             <div className='med-title'>
                 <span>overview</span>
                 <span><ArrowDropDownIcon /></span>
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
                    <li className='nav-btn'><Link to={`/${mediaType}/${id}/translations`}>translations</Link></li>
                    <li className='nav-btn'><Link to={`/${mediaType}/${id}/changes`}>changes</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span>media</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/backdrops`} > backdrops </Link>
                        <span>{mediaData?.backdrops?.length}</span>
                     </li>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/logos`} >logos</Link>
                        <span>{mediaData?.logos?.length}</span>
                    </li>
                    <li className='nav-btn'>
                        <Link to={`/${mediaType}/${id}/posters`} >posters</Link>
                        <span>{mediaData?.posters?.length}</span>
                    </li >
                    <li className='nav-btn videos'>
                        <Link>videos </Link>
                        <span><ArrowRightIcon/></span>
                        <ul className="videos-ul">
                            {
                                Object.keys(videos)?.map(video=> (
                                    <li 
                                        className='nav-btn'
                                        key={video}>
                                            {video} 
                                            <span>{videos[video]?.length}</span>
                                        </li>
                                ))
                            }
                        </ul>
                    </li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span> fandom</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li className='nav-btn'><Link>discussions</Link></li>
                    <li className='nav-btn'><Link to={`/${mediaType}/${id}/reviews`}>reviews</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span> share</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li className='nav-btn'><Link>share link</Link></li>
                    <li className='nav-btn'><Link>facebook</Link></li>
                    <li className='nav-btn'><Link>tweet</Link></li>
                 </ul>
             </div>
        </nav>
    </header>
  )
}

export default MainMediaNav