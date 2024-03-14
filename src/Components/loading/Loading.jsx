import './loading.scss';

const Loading = ({width,height}) => {
  return (
    <div className="loading">
        <div 
            className="loading-container"
            style={{width,height}}
            >
            <div className="spin">
            </div>
        </div>
    </div>
  )
}

export default Loading