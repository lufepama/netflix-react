import React, { useEffect, useState } from 'react'
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube'


const base_url = 'https://image.tmdb.org/t/p/original/'

const  Row =  ({title, fetchUrl, isLargeRow}) =>  {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

    useEffect( () => {
        
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl] )
    
    
    const handleClick = async (movie) => {
        console.log('cliked')
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=0cafde5bbe4bc3ede0c2dac3c6c2b9fb`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
      };

    return (
        <div className='row'>
            <h1 >{title}</h1>
            <div className='row__posters'>
                {/* several row__poster */}
                {movies.map( movie =>(
                    <img 
                        key={movie.id}
                        onClick={ () => handleClick(movie) }
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={`${base_url}${isLargeRow? movie.poster_path:movie.backdrop_path}`} 
                        alt={movie.name}/>
                 ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;