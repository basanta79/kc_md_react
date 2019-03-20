import React from 'react'

import './FilmDetail.css'
import Film from './Fetch'
import Modal from './Modal'

class FilmDetail extends React.Component {
    state = {loading: false, filmInfo: {}, errors: false, isOpen: false}

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
                                        <button onClick={this.toggleModal}>
                                            Open the modal
                                        </button>
                                        
                                    </div>
                                    <Modal show={this.state.isOpen} onClose={this.toggleModal}>Contenido del modal</Modal>
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
}

export default FilmDetail
