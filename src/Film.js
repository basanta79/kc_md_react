import React from 'react'

import './Film.css'

const IMG_URL = "https://image.tmdb.org/t/p/w200"

const Film = props => {
    // console.log(props)
    return(
        <div className="film">
            <img className="film__pic" src={IMG_URL + props.details.poster_path} alt=""/>
            <h1 className="film__name">{props.details.title}</h1>
        </div>
    )
}

export default Film