import React from 'react'

import './GalleryMovies.css'

const GalleryMovies = props => {
    return (
    <ul className="showcase">
        {
            props.items.length ?
            (props.items.map (item =>
                <li key={props.keyFn(item)} className="showcase__item">
                    {props.render(item)}
                </li>
            )):(
                <div>no hay resultados</div>
            )    
            
        }
    </ul>
    )
}

export default GalleryMovies