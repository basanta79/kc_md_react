import React from 'react'

import GalleryMovies from './GalleryMovies'
import MoviedabaContext from './MoviedabaContext'
import Film from './Film'

class CollectionsDetail extends React.Component {
    state = { 
        loading: true,
        collectionName: "",
        movies: [],
        result: "",
    }

    async componentDidMount () {
        const nameToFind = this.props.collection
        this.setState({collectionName: nameToFind})
        const collection = this.props.readCollection(nameToFind)
        if(collection!=null){
            if(collection===0){
                this.setState({ result: "La colección especificada no existe"})
            }else{
                this.setState({movies: collection})
                this.setState({loading: false})
            }
        }else{
            this.setState({ result: "No hay colecciones almacenadas"})
        }
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
        this.props.readCollection(collectionName)
    }
}

export default props =>
    <MoviedabaContext.Consumer>
        {
            ({ readCollection }) =>
            <CollectionsDetail readCollection={readCollection} collection={props.match.params.name} />
        }
    </MoviedabaContext.Consumer>