const FreeToWatch = ()=> {
    return (
        <div className="free-to-watch">
            <section className={`${type} free-to-watch trending`}>
                <div className="trending-container">
                    <header className="trend-header">
                        <h3 className="trend-title">
                            {languages[lang].trending + " "}  
                            {type === 'movie' ? languages[lang].movies : type === 'tv'  ? languages[lang].tvShows :languages[lang].people }
                        </h3>
                        <nav className="trend-nav">
                            <ul>
                                <li 
                                    className={filter === 'day' && 'active'}
                                    onClick={()=> setFilter('day')}
                                    >
                                    {languages[lang].today}
                            </li>
                                <li 
                                    className={filter === 'week' && 'active'}
                                    onClick={()=> setFilter('week')}
                                    >
                                    {languages[lang].thisWeek}
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div className="movies">
                        {
                            movies?.map((movie)=>(
                                <MovieCard movie={movie} type={type} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FreeToWatch;