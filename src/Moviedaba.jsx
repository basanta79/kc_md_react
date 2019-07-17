import React from 'react'

import Nav from './Nav/Nav'
import Routes from './Routes'
import MoviedabaContext from './MoviedabaContext'

const API_KEY="4cf05ebaede3dab03c74b32f4b5a3174"
const DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="
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
                addFilmCollection: this.addFilmToCollection,
                removeFilmCollection: this.removeFilmFromCollection,
                readScore: this.readScore,
                saveScore: this.saveScore,
                readCollection: this.readCollection,
                collectionAdd : this.collectionAdd,
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

    collectionAdd = (collectionName) => {
        let collectionsList = this.collectionRead()
        if (collectionsList){
            const found = collectionsList.find(collection => collection.name===collectionName)
            if (!found){
                collectionsList.push({name: collectionName, movies:[]})
            }
        }else{
            collectionsList = [{name: collectionName, movies:[]}]
        }
        localStorage.setItem('collectionsList',JSON.stringify(collectionsList))
        return collectionsList
    }

    addFilmToCollection = (collectionName, film) => {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        const collection = collectionsList.find( col => 
            col.name === collectionName
        )
        film['puntuacion']=0
        collection.movies.push(film)
        localStorage.setItem('collectionsList',JSON.stringify(collectionsList))
        return true
    }

    removeFilmFromCollection = (collectionName, film) => {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        const collection = collectionsList.find( col => 
            col.name === collectionName
        )
        const found = collection.movies.find(item => {
            return item.id===film.id
        })
        const filtered = collection.movies.filter(item => item.id!=film.id)
        collection.movies=filtered
        localStorage.setItem('collectionsList',JSON.stringify(collectionsList))
        return true

    }

    readCollection = (collectionName) => {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        let nameFound = []
        if (collectionsList){
            nameFound = collectionsList.find(item => item.name===collectionName)
            if (nameFound){
                return nameFound.movies
            }else{
                return 0
            }
        }else{
            return null
        }
    }

    readScore = (filmId) => {
        const scoreList = JSON.parse(localStorage.getItem('scoreList'))
        const scoreItem = scoreList.find( item => {
            return item.id == filmId
            }
        )
        if (scoreItem){
            return(scoreItem.score)
        }else{
            return 0
        }
    }

    saveScore = (filmId, score) => {
        let scoreList = []
        scoreList = JSON.parse(localStorage.getItem('scoreList'))
        if(scoreList){
            const scoreItem = scoreList.find( item => {
                return item.id  === filmId
            })
            scoreItem?
                scoreItem.score=score
            :
                scoreList.push({
                    id: filmId,
                    score: score})
        }else{
            scoreList=[]
            scoreList.push({
                id: filmId,
                score: score})
        }
        localStorage.setItem('scoreList',JSON.stringify(scoreList))
        return true
    }

}