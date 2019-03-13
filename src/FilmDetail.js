import React from 'react'

import './FilmDetail.css'

const API_KEY="4cf05ebaede3dab03c74b32f4b5a3174"
const IMG_URL = "https://image.tmdb.org/t/p/w200"

// https://api.themoviedb.org/3/movie/299537?api_key=4cf05ebaede3dab03c74b32f4b5a3174
const MOVIE_URL = "https://api.themoviedb.org/3/movie/"

class FilmDetail extends React.Component {
    state = {loading: false, filmInfo: {}, errors: false}

    async componentDidMount() {
        this.setState({ loading: true })
        try {
            const response = await fetch(`${MOVIE_URL}${this.props.match.params.id}?api_key=${API_KEY}`)
            const film = await response.json()
            console.log(film);
            this.setState({filmInfo: film})
        }catch(err){
            this.setState({ errors: true })
        }finally{
            this.setState({ loading: false })
        }
    }

    render () {
        const { loading, filmInfo, errors } = this.state
        const { genres, homepage, id, imdb_id, original_language, 
            original_title, overview, popularity, poster_path, 
            release_date, status, title, vote_average, vote_count } = filmInfo
        console.log(title)
        if (loading) {
            return <p>Loading...</p>
        }
        if (errors) {
            return <p>Error 500! ...</p>
        }
        return (

            <div class="filmcard__layout">
                <div class="filmcard">
                    <img className="film__poster" src={IMG_URL + poster_path} alt=""/>
                    <h1 className="film__title">{title} <span className="film__date">({release_date})</span> </h1>
                    <div class="film__overview">
                        <h2>Overview:</h2>
                        <p>{overview}</p>
                    </div>
                </div>
            </div>


        )
        
    }
}

export default FilmDetail

/* 
genres: Array(3)
    0: {id: 16, name: "Animation"}
    1: {id: 10751, name: "Family"}
    2: {id: 12, name: "Adventure"}
    length: 3
homepage: "https://www.howtotrainyourdragon.com/"
id: 166428
imdb_id: "tt2386490"
original_language: "en"
original_title: "How to Train Your Dragon: The Hidden World"
overview: "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind."
popularity: 337.563
poster_path: "/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg"
release_date: "2019-01-03"
status: "Released"
title: "How to Train Your Dragon: The Hidden World"
vote_average: 7.8
vote_count: 990 
*/