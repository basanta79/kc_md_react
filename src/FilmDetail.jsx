import React from 'react'

import './FilmDetail.css'
import Film from './Fetch'
import Modal from './Modal/Modal'
import MoviedabaContext from './MoviedabaContext'

class FilmDetail extends React.Component {
    state = {
        loading: false, 
        filmInfo: {}, 
        errors: false, 
        isOpen: false,
        collectionsList: [],
        score: 0,
        scoreList: [],
    }

    async componentDidMount() {
        const collectionsList = this.props.getCollections()
        this.setState({ collectionsList: collectionsList })
        const scoreRead = this.props.readScore(this.props.filmId)
        this.setState({score: scoreRead})
    }

    render () {
        const { collectionsList, score } = this.state
        return (
            <Film path={`movie/${this.props.filmId}`}>
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
                                            <form onSubmit={this.processScore}>
                                                <label htmlFor="puntuacion">Puntuación: </label>
                                                <input type="text"name="score" value={score} onChange={this.changePuntuacion}/>
                                                <input type="submit" value="cambiar"/>
                                            </form>
                                            <h2>Overview:</h2>
                                            <p>{data.overview}</p>
                                        </div>
                                        <button onClick={this.toggleModal}>
                                            Añadir a collección
                                        </button>
                                        
                                    </div>
                                    <Modal 
                                        show={this.state.isOpen} 
                                        onClose={this.toggleModal} 
                                        coleccion={collectionsList}
                                        saveFilm={this.props.saveFilm}
                                        film={data}></Modal>
                                </div>
                            )
                        }
                        return <p>Not data yet ...</p>
                    }
                }
            </Film>  
        )
        
    }
    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    changePuntuacion = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    processScore = event => {
        event.preventDefault()
        let { score } = this.state
        score>10? score=10:score=score
        const result = this.props.saveScore(this.props.filmId, score)
    }
}

export default props =>
    <MoviedabaContext.Consumer>
    {
        ({ collectionGet, addFilmCollection, readScore, saveScore }) => 
        <FilmDetail  
            getCollections={collectionGet} 
            filmId={props.match.params.id} 
            saveFilm={addFilmCollection}
            readScore={readScore}
            saveScore={saveScore} />
    }
    </MoviedabaContext.Consumer>