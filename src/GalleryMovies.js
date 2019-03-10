import React from 'react'

import './GalleryMovies.css'

const GalleryMovies = props => {
    console.log(props)
    return (
    <ul className="showcase">
        {
            props.items.map (item =>
                <li key={props.keyFn(item)} className="showcase__item">
                    {props.render(item)}
                </li>    
            )
        }
    </ul>
    )
}

export default GalleryMovies