import React from 'react'
import { Link } from 'react-router-dom'

import './Film.css'
import MoviedabaContext from './MoviedabaContext'
import Modal from './Modal'

const IMG_URL = "https://image.tmdb.org/t/p/w200"

class Film extends React.Component{
    state = {
        loading: false, 
        filmInfo: {}, 
        errors: false, 
        isOpen: false,
        collectionsList: [],
    }

    async componentDidMount() {
        const collectionsList = this.props.getCollections()
        this.setState({ collectionsList: collectionsList })
    }

    render () {
        const { collectionsList } = this.state
        return(
            <div className="film">
                <Link to={`/detail/${this.props.details.id}`}>
                    <img className="film__pic" src={IMG_URL + this.props.details.poster_path} alt=""/>
                    <h1 className="film__name">{this.props.details.title}</h1>
                </Link>
                 <p>
                     puntuacion: {this.props.details.puntuacion}
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
        alert('hola')
    }

}


export default props =>
    <MoviedabaContext.Consumer>
    {
        ({ collectionGet, addFilmCollection}) => 
        <Film getCollections={collectionGet} details={props.details} saveFilm={addFilmCollection}>
            {props.children}
        </Film>
    }
    </MoviedabaContext.Consumer>