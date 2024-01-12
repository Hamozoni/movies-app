
import "./PageNumber.scss";

const PageNumber = ({page,setPage,totalPages}) => {
  return (
    <div className="next-page">
        <ul className="next">
            {
                page > 1 &&
                <li onClick={()=> setPage(page - 1)}>prev</li>
            }
            <li className="active" onClick={()=> setPage(page)}>{page}</li>
            {
            (page + 5) < totalPages &&
                <>
                    <li 
                        onClick={()=> setPage(page + 1)}
                        >
                            {page + 1}
                        </li>
                    <li onClick={()=> setPage(page + 2)}>{page + 2}</li>
                    <li onClick={()=> setPage(page + 3)}>{page + 3}</li>
                    <li onClick={()=> setPage(page + 4)}>{page + 4}</li>
                    <li onClick={()=> setPage(page + 5)}>{page + 5}</li>
                </>
            }
            {
                page < totalPages &&
                <>
                    <li onClick={()=> setPage(totalPages)}>{totalPages}</li>
                    <li onClick={()=> setPage(page + 1)}>next</li>
                </>
            }
        </ul>
    </div>
  )
}

export default PageNumber