import React from 'react'

import './FilmDetail.css'
import Film from './Fetch'

class FilmDetail extends React.Component {
    state = {loading: false, filmInfo: {}, errors: false}

    async componentDidMount() {
        
    }

    render () {
        
        return (
            <Film path={`movie/${this.props.match.params.id}`}>
                {
                    ({data, loading, error}) => {
                        if (loading){
                            return <p>Loading...</p>
                        }
                        if (error) {
                            return <p>Error 500! ...</p>
                        }
                        if (data){
                            return (
                                <div className="filmcard__layout">
                                    <div className="filmcard">
                                        <img className="film__poster" src={data.picture} alt=""/>
                                        <h1 className="film__title">{data.title} <span className="film__date">({data.release_date})</span> </h1>
                                        <div className="film__overview">
                                            <h2>Overview:</h2>
                                            <p>{data.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return <p>Not data yet ...</p>
                    }
                }
            </Film>  
        )
        
    }
}

export default FilmDetail
