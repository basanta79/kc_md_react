import React from 'react'

const IMG_URL = "https://image.tmdb.org/t/p/w200"

const Film = props => {
    // console.log(props)
    return(
        <div>
            <img src={IMG_URL + props.details.poster_path} alt=""/>
            <h1>{props.details.title}</h1>
        </div>
    )
}

export default Film