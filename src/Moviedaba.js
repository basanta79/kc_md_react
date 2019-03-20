import React from 'react'

import Nav from './Nav'
import Routes from './Routes'
import MoviedabaContext from './MoviedabaContext'

const API_KEY="4cf05ebaede3dab03c74b32f4b5a3174"
const DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="
// https://api.themoviedb.org/3/search/movie?api_key=4cf05ebaede3dab03c74b32f4b5a3174&query=ocean
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key="

export default class Moviedaba extends React.Component{
    state = {data: {}, loading: true, error: false}
    render() {
        return (
            <MoviedabaContext.Provider value={{
                data : {},
                loading: false,
                error: false,
                popular: this.popular,
                searchFilm: this.search,
                collectionGet: this.collectionRead,
            }}>
                <Nav />
                <Routes />
            </MoviedabaContext.Provider>
        )
    }

    popular = async () => {
        const response = await fetch(DISCOVER_MOVIE_URL + API_KEY)
        const { results } = await response.json()
        return results
    }

    search = async (searchField) => {
        const response = await fetch(`${SEARCH_URL}${API_KEY}&query=${searchField}`)
        const { results } = await response.json()
        return results
    }

    collectionRead = () => {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        if (collectionsList){
            return collectionsList
        }else{
            return null
        }
    }
}