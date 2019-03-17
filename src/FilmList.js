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

    getSearchString = () => {
      const result = ""
      if(window.location.search){
        const param = new URLSearchParams(window.location.search)
        const queryToSearch = param.get('search')
        if (queryToSearch){
          return queryToSearch
        }else{
          return result
        }
      } else {
        return result
      }
    }

    // TODO: Extract logic outside ??
    async componentDidMount () {
        this.setState({ loading: true })
        let movies = {}
        const searchString = this.getSearchString()
        if (searchString){
          movies = await this.props.searchFilm(searchString)
        }else{
          movies = await this.props.getPopular()
        }
        this.setState({ loading: false })
        this.setState({ movies: movies })
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
          ({popular, searchFilm}) =>
            <FilmList getPopular={popular} searchFilm={searchFilm}></FilmList>
        }
    </MoviedabaContext.Consumer>