

const WhereToWatch = () => {
  return (
    <section className="watch">
        <h5 className="w-ti">
            Where To Watch <ChevronRightIcon />
        </h5>
        <div className="watch-content">
            <section className="country">
                <h5 className="c-ti">
                    country
                </h5>
                <select name="" id="">
                    {
                        countries?.map((country)=>(
                            <option 
                                key={country?.native_name} 
                                value={country?.iso_3166_1}
                                >
                                    {country?.native_name} 
                                </option>
                        ))
                    }
                </select>
                <div className="movie-providers">
                    {
                        providers?.map((provider)=> (
                            <div key={provider?.provider_id} className="provider-image">
                                <img 
                                loading="lazy" 
                                src={process.env.REACT_APP_BASE_URL + "original" + provider?.logo_path}
                                alt="" 
                                />

                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    </section>
  )
}

export default WhereToWatch