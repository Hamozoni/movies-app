import { Outlet } from "react-router-dom"
import SeasonHeader from "../../Components/tvComponents/seasonMainNav/SeasonHeader"
import SeasonMainNav from "../../Components/tvComponents/seasonMainNav/SeasonMainNav"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext"


const EpisodesLayout = () => {
  return (
    <div>
        <MediaColorContext>
                <SeasonMainNav />
                {/* <SeasonHeader details={episodes} /> */}
                <Outlet />
        </MediaColorContext>
    </div>
  )
}

export default EpisodesLayout