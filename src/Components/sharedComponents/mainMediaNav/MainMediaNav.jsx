import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import fetchData from '../../../utilities/fetchData';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';
import { languages } from '../../../utilities/languages';
import Loading from '../../loading/Loading';
import Error from '../../error/Error';

const MainMediaNav = ({linkUrl,overview,media,isVideos = false}) => {
    const {id} = useParams();

    const [mediaData,setMediaData] = useState(null);
    const [videos,setVideos] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const {innerWidth,lang} = useContext(globalContext);

    const fetchImages = ()=> {

        setIsPending(true);
        setError(null);
        fetchData(`${linkUrl}/images`)
        .then((data)=>{
            setMediaData(data);
            if(isVideos){
                fetchData(`${linkUrl}/videos?language=${lang}`)
                .then((data)=>{
                    setVideos(Object.groupBy(data?.results,e=> e.type));
                })
                .catch((error)=> {
                    setError(error);
                })
            }
        })
        .catch((error)=> {
            setError(error);
        }) 
        .finally(()=> {
            setIsPending(false);
        });

    }
    useEffect(fetchImages,[linkUrl,id,lang,isVideos]);


  const arrowIcon = innerWidth > 460 &&  <span className='icon'><ArrowDropDownIcon /></span>

  const Overview = ()=> {
    return (
        <div className='med-title'>
            <span className='head'>
                {languages[lang].overview}
            </span>
            {arrowIcon}
            <ul className='links-list'>
                 <li className='nav-btn'>
                    <Link to={`/${linkUrl}`}>{languages[lang].main}</Link>
                </li>
                {
                    overview?.map((text)=> (
                        <li key={text} className='nav-btn'>
                            <Link to={`/${linkUrl}/${text}`}>{languages[lang][text]}</Link>
                        </li>
                    ))
                }
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

                    {
                        media?.map((text)=> (
                            <li key={text} className='nav-btn'>
                                <Link to={`/${linkUrl}/${text}`} >
                                        {languages[lang][text]}
                                    <span>{isPending ?  '0' : mediaData ? mediaData[text]?.length : error && '0'}</span>
                                </Link>
                            </li>
                        ))
                    }

                    {
                        isVideos &&
                        <li className='nav-btn videos'>
                            <Link>{languages[lang].videos} </Link>
                            <span><ArrowRightIcon/></span>
                            <ul className={`${innerWidth < 520 && 'mobile'} videos-ul`}>
                                {
                                    isPending ? <Loading width='100%' height='200px'/> :
                                    videos ?
                                    Object.keys(videos)?.map(video=> (
                                        <li 
                                            className='nav-btn'
                                            key={video}>
                                                <Link to={`/${linkUrl}/videos?type=${video}`}>
                                                    {video} 
                                                    <span> {isPending ? '0'  : videos ? videos[video]?.length : '0'}</span>
                                                </Link>
                                            </li>
                                    ))
                                    : error && <Error error={error} height='200px' onClick={fetchImages} />
                                }
                            </ul>
                        </li>
                    }
                     
                 </ul>
             </div>
             {
                linkUrl.split('/').includes('person')  ?  ""
                :
                <div className='med-title'>
                    <span className='head'> {languages[lang].fandom}</span>
                    {arrowIcon}
                    <ul className='links-list'>
                        <li className='nav-btn'>
                            <Link to={`/${linkUrl}/reviews`}>{languages[lang].reviews}</Link>
                        </li>
                    </ul>
                </div>
             }
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