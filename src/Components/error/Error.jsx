import './error.scss';

const Error = ({error,height,onClick}) => {
  return (
    <div className="error" style={{height}}>
        <div className="error-container" >
            <h3 className="er-m">{error?.message}</h3>
            <button 
                  onClick={onClick}
                  className='try-btn' 
                  type="button"
                  > try agin
            </button>
        </div>
    </div>
  )
}

export default Error