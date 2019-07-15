import React from 'react'

import GalleryMovies from './GalleryMovies'
import Film from './Film'

class CollectionsDetail extends React.Component {
    state = { 
        loading: true,
        collectionName: "",
        movies: [],
        result: "",
    }

    async getMovies(collectionToFind) {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        let nameFound = []
        if (collectionsList){
            nameFound = collectionsList.find(item => item.name===collectionToFind)
            if (nameFound){
                this.setState({movies: nameFound.movies})
                this.setState({loading: false})
            }else{
                this.setState({ result: "La colección especificada no existe"})
            }
        }else{
            this.setState({ result: "No hay colecciones almacenadas"})
        }
    }

    async componentDidMount () {
        const nameToFind = this.props.match.params.name
        this.setState({collectionName: nameToFind})
        this.getMovies(nameToFind)
    }

    render(){
        const { loading, result, movies, collectionName } = this.state
        if (result){
            return (
                <p>{result}</p>
            )
        }
        if (loading){
            return (
                <p>loading....</p>
            )
        }

        return (
          <GalleryMovies items={movies} keyFn={movies => movies.id} render=
          { film =>
            
              <Film details={film} collectionName={collectionName} puntuacion={movies.puntuacion} reload={this.reload}>
                <button>Eliminar de coleccion</button>
              </Film>
            
          }
          /> 
        )
    }

    reload = () => {
        const { collectionName } = this.state
        this.setState({loading: true})
        this.getMovies(collectionName)
    }
}

export default CollectionsDetail