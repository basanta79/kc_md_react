/* eslint no-use-before-define: 2 */  // --> OFF
import React from 'react'
import { Link } from 'react-router-dom'

import GalleryMovies from './GalleryMovies'
import Film from './Film'
import MoviedabaContext from './MoviedabaContext'

class FilmList extends React.Component {
    state={
        loading: true,
        errors: false,
        movies: [],
    }

    async componentDidMount () {
        this.setState({ loading: true })
        const movies = await this.props.getPopular()
        console.log(movies)
        this.setState({ loading: false})
        this.setState({movies: movies})
    }

    render () 
    {
        const { loading, errors, movies} = this.state
        if (loading) {
            return <p> loading..... </p>
        }
        if (errors) {
            return <p> Error 500 !!! </p>
        }


        return (
          <GalleryMovies items={movies} keyFn={item => item.id} render=
          { film =>
            <Link to={`/detail/${film.id}`}>
              <Film details={film}/>
            </Link>
          }
          /> 
        )
    }
}

export default  props =>
    <MoviedabaContext.Consumer>
        {
          ({popular}) =>
            <FilmList getPopular={popular}></FilmList>
        }
    </MoviedabaContext.Consumer>