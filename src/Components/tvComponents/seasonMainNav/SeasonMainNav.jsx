import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "../../sharedComponents/mainMediaNav/MainmediaNav.scss";
import { Link} from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import fetchData from '../../../utilities/fetchData';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const SeasonMainNav = () => {
  return (
        <nav className='media-header'>
            <div className='media-nav'>
                <div className='med-title'>
                    <span>overview</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li 
                            className='nav-btn' 
                            >
                                <Link to={''}>main</Link>
                        </li>
                        <li 
                            className='nav-btn' >
                                <Link to={``}>cast & crew</Link>
                        </li>
                        <li className='nav-btn'>
                            <Link to={``}>
                                translations
                            </Link>
                        </li>
                        <li className='nav-btn'>
                            <Link to={``}>
                                changes
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='med-title'>
                    <span>media</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li className='nav-btn'>
                            <Link to={``} >
                                posters
                                {/* <span>{mediaData?.posters?.length}</span> */}
                        </Link>
                        </li >
                        <li className='nav-btn videos'>
                            <Link>videos </Link>
                            <span><ArrowRightIcon/></span>
                            {/* <ul className="videos-ul">
                                {
                                    Object.keys(videos)?.map(video=> (
                                        <li 
                                            className='nav-btn'
                                            key={video}>
                                                <Link to={``}>
                                                    {video} 
                                                    <span>{videos[video]?.length}</span>
                                                </Link>
                                            </li>
                                    ))
                                }
                            </ul> */}
                        </li>
                    </ul>
                </div>
                <div className='med-title'>
                    <span> fandom</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li className='nav-btn'><Link>discussions</Link></li>
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
            </div>
        </nav>
  )
}

export default SeasonMainNav