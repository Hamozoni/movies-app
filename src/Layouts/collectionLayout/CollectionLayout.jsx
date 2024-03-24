import { Outlet, useParams } from "react-router-dom"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext"

const CollectionLayout = () => {
    const {id} = useParams()
  return (
    <MediaColorContext>
        <div className="collection-Layout">
            <Outlet />
        </div>
    </MediaColorContext>
  )
}

export default CollectionLayout