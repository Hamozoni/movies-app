

const Error = ({error}) => {
  return (
    <div className="error">
        <div className="error-container">
            <h3 className="er">{error?.response?.data?.status_message}</h3>
        </div>
    </div>
  )
}

export default Error