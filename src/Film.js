import React from 'react'
import { Link } from 'react-router-dom'

import './Film.css'
import MoviedabaContext from './MoviedabaContext'
import Modal from './Modal'

const IMG_URL = "https://image.tmdb.org/t/p/w200"

class Film extends React.Component{
    state = {
        loading: false, 
        filmId: 0, 
        errors: false, 
        isOpen: false,
        collectionsList: [],
        score: 0,
    }

    async componentDidMount() {
        const collectionsList = this.props.getCollections()
        this.setState({ collectionsList: collectionsList })
        const scoreReaded = this.props.readScore(this.props.details.id)
        console.log(this.props.details.id, ":" , scoreReaded)
        this.setState({filmId: this.props.details.id})
        this.setState({score: scoreReaded})
    }

    render () {
        const { collectionsList, score } = this.state
        return(
            <div className="film">
                <Link to={`/detail/${this.props.details.id}`}>
                    <img className="film__pic" src={IMG_URL + this.props.details.poster_path} alt=""/>
                    <h1 className="film__name">{this.props.details.title}</h1>
                </Link>
                 <p>
                     puntuacion: {score}
                 </p>
                <button onClick={this.toggleModal}>
                    Añadir a collección
                </button>
                <p onClick={this.al}>{this.props.children}</p>
                <Modal 
                    show={this.state.isOpen} 
                    onClose={this.toggleModal} 
                    coleccion={collectionsList}
                    saveFilm={this.props.saveFilm}
                    film={this.props.details}></Modal>
            </div>
        )
    }

    toggleModal = (event) => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    al = (event) => {
        const result = this.props.removeFilm(this.props.collectionName,this.props.details)
        window.location.reload()
        
    }

}


export default props =>
    <MoviedabaContext.Consumer>
    {
        ({ collectionGet, addFilmCollection, removeFilmCollection, readScore}) => 
        <Film getCollections={collectionGet} details={props.details} 
                saveFilm={addFilmCollection} removeFilm={removeFilmCollection}
                collectionName={props.collectionName}
                readScore={readScore}>
            {props.children}
        </Film>
    }
    </MoviedabaContext.Consumer>