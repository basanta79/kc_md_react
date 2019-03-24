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

    async componentDidMount () {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        console.log(this.props.match.params.name)
        const nameToFind = this.props.match.params.name
        let nameFound = []
        if (collectionsList){
            nameFound = collectionsList.find(item => item.name===nameToFind)
            if (nameFound){
                // this.setState({collections: nameFound.})
                this.setState({loading: false})
            }else{
                this.setState({ result: "La colección especificada no existe"})
            }
        }else{
            this.setState({ result: "No hay colecciones almacenadas"})
        }
        console.log(nameFound.movies)
        this.setState({movies: nameFound.movies})
        this.setState({collectionName: nameToFind})
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
            
              <Film details={film} collectionName={collectionName} puntuacion={movies.puntuacion}>
                <button>Eliminar de coleccion</button>
              </Film>
            
          }
          /> 
        )
    }
}

export default CollectionsDetail