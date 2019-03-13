/* eslint no-use-before-define: 2 */  // --> OFF
import React from 'react'
import { Link } from 'react-router-dom'

import GalleryMovies from './GalleryMovies'
import Film from './Film'

const API_KEY="4cf05ebaede3dab03c74b32f4b5a3174"
// --------- REQUEST TOKEN
const REQUEST_TOKEN_URL="https://api.themoviedb.org/3/authentication/token/new?api_key="
/* {
    "success": true,
    "expires_at": "2019-03-09 07:38:01 UTC",
    "request_token": "31fbb3aeb76392094584d4b78a3078d14a95bd33"
} */
//const REQUEST_TOKEN="31fbb3aeb76392094584d4b78a3078d14a95bd33"

//---------- APPROVE REQUEST_TOKEN
//https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
const PERMISSION_USER_URL="https://www.themoviedb.org/authenticate/"
const REDIRECTION_URL = "?redirect_to=http://www.yourapp.com/approved"

// ---------- SESSION ID
// https://api.themoviedb.org/3/authentication/session/new?api_key=4cf05ebaede3dab03c74b32f4b5a3174
const SESSION_ID_URL = "https://api.themoviedb.org/3/authentication/session/new?api_key="
/* {
    "request_token": "31fbb3aeb76392094584d4b78a3078d14a95bd33"
} */
/* {
    "success": true,
    "session_id": "41ad5b9e8f20bbbc1f2ee3284a485c35756aa01d"
} */
const SESSION_ID = "41ad5b9e8f20bbbc1f2ee3284a485c35756aa01d"

// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4cf05ebaede3dab03c74b32f4b5a3174
const DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="


class FilmList extends React.Component {
    state={
        loading: true,
        errors: false,
        movies: [],
    }

    async componentDidMount () {
        this.setState({ loading: true })
        try {
            const response = await fetch(DISCOVER_MOVIE_URL + API_KEY)
            const { results } = await response.json()
            this.setState({movies: results})
        }catch(err){
            this.setState({ errors: true })
        }finally{
            this.setState({ loading: false })
        }
    }

    render () {
        const { loading, errors, movies} = this.state
        if (loading) {
            return <p> loading..... </p>
        }
        if (errors) {
            return <p> Error 500 !!! </p>
        }
        return (<GalleryMovies items={movies} keyFn={item => item.id} render={ film =>
            <Link to={`/detail/${film.id}`}>
                <Film details={film}/>
            </Link>

        }/>)
    }

}

export default FilmList