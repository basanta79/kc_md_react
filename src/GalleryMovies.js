import React from 'react'

const IMG_URL = "https://image.tmdb.org/t/p/w200"

const GalleryMovies = props => {
    console.log(props)
    return (
    <ul>
        {
            props.items.map (item =>
                <li>
                    {IMG_URL + item.poster_path} - {item.title}
                </li>    
            )
        }
    </ul>
    )
}

export default GalleryMovies