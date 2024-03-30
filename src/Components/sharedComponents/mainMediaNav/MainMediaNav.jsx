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

    const {innerWidth,lang,theme} = useContext(globalContext);

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


  const arrowIcon = innerWidth > 460 &&  
            <span className='icon'>
                <ArrowDropDownIcon className={`t-color-${theme} `} />
            </span>

  const Overview = ()=> {
    return (
        <div className='med-title'>
            <h5 className={`t-color-${theme} head`}>
                {languages[lang].overview}
            </h5>
            {arrowIcon}
            <ul className={`back-color-${theme}-2 links-list card`}>
                 <li className='nav-btn'>
                    <Link 
                        to={`/${linkUrl}`} 
                        className={`t-color-${theme}-1 link-hover`}
                        >
                        {languages[lang].main}
                    </Link>
                </li>
                {
                    overview?.map((text)=> (
                        <li key={text} className='nav-btn'>
                            <Link 
                                className={`t-color-${theme}-1 link-hover`}
                                to={`/${linkUrl}/${text}`}
                                >
                                    {languages[lang][text]}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
  };



  return (
    <nav className={`back-color-${theme}-2 media-header`}>
        <div className='media-nav'>
            <Overview />
             <div className='med-title'>
                 <h5 className={`t-color-${theme} head`}>
                    {languages[lang].media}
                 </h5>
                 {arrowIcon}
                 <ul className={`back-color-${theme}-2 links-list card`}>

                    {
                        media?.map((text)=> (
                            <li key={text} className='nav-btn'>
                                <Link  
                                    className={`t-color-${theme}-1 link-hover`}
                                    to={`/${linkUrl}/${text}`} 
                                    >
                                        {languages[lang][text]}
                                    <span className={`t-color-${theme}-1`}>
                                          {isPending ?  '0' : mediaData ? mediaData[text]?.length : error && '0'}
                                    </span>
                                </Link>
                            </li>
                        ))
                    }

                    {
                        isVideos &&
                        <li className='nav-btn videos'>
                            <h5 className={`t-color-${theme}-1  head link-hover`}>
                                {languages[lang].videos} 
                            </h5>
                            <span className={`t-color-${theme}-1`}>
                                <ArrowRightIcon/>
                            </span>
                            <ul className={`${innerWidth < 520 ? 'mobile' : ''} videos-ul back-color-${theme}-2`}>
                                {
                                    isPending ? <Loading width='100%' height='200px'/> :
                                    videos ?
                                    Object.keys(videos)?.map(video=> (
                                        <li 
                                            className={`t-color-${theme}-1 van-btn`}
                                            key={video}>
                                                <Link 
                                                    className={`t-color-${theme}-1 link-hover`}
                                                    to={`/${linkUrl}/videos?type=${video}`}
                                                    >
                                                    {video} 
                                                    <span> 
                                                        {isPending ? '0'  : videos ? videos[video]?.length : '0'}
                                                    </span>
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
                linkUrl.split('/').includes('person') || linkUrl.split('/').includes('episode')  || linkUrl.split('/').includes('collection')  ?  ""
                :
                <div className='med-title'>
                    <h5 className={`t-color-${theme} head`}>
                         {languages[lang].fandom}
                    </h5>
                    {arrowIcon}
                    <ul className={`back-color-${theme}-2 links-list card`}>
                        <li className='nav-btn'>
                            <Link 
                                className={`t-color-${theme}-1 link-hover`}
                                to={`/${linkUrl}/reviews`}>
                                    {languages[lang].reviews}
                            </Link>
                        </li>
                    </ul>
                </div>
             }
             <div className='med-title'>
                 <h5 className={`t-color-${theme} head`}> 
                    {languages[lang].share}
                </h5>
                 {arrowIcon}
                 <ul className={`${innerWidth < 560 && 'last'} links-list back-color-${theme}-2 card`}>
                    <li className='nav-btn'>
                        <Link className={`t-color-${theme}-1 link-hover`}>
                            {languages[lang].shareLink}
                        </Link>
                    </li>
                    <li className='nav-btn'>
                        <Link className={`t-color-${theme}-1 link-hover`}>facebook</Link>
                    </li>
                    <li className='nav-btn'>
                        <Link className={`t-color-${theme}-1 link-hover`}>tweeter</Link>
                    </li>
                 </ul>
             </div>
        </div>
    </nav>
  )
}

export default MainMediaNav