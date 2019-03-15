import React from 'react'

// /movie/
const API_HOST = "https://api.themoviedb.org/3/"
const API_KEY="4cf05ebaede3dab03c74b32f4b5a3174"
const IMG_URL = "https://image.tmdb.org/t/p/w200"

class Film extends React.Component {

    state = { data: null, loading: false, error: null }

    fetchData = async () => {
        this.setState({loading: true})
        let data = {}
        try{
            const data1 = await (await fetch(`${API_HOST}${this.props.path}?api_key=${API_KEY}`)).json()
            console.log ('data:   ', data)
            data = {
                ...data1,
                picture: `${IMG_URL}${data1.poster_path}`,
            }
            console.log(data.picture)
            this.setState({data, loading:false})
        }catch (error){
            this.setState({error, loading:false})
        }
    }

    componentDidMount () {
        this.fetchData()
    }

    render() {
        return this.props.children(this.state)
    }

}

export default Film

/* 
genres: Array(3)
    0: {id: 16, name: "Animation"}
    1: {id: 10751, name: "Family"}
    2: {id: 12, name: "Adventure"}
    length: 3
homepage: "https://www.howtotrainyourdragon.com/"
id: 166428
imdb_id: "tt2386490"
original_language: "en"
original_title: "How to Train Your Dragon: The Hidden World"
overview: "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind."
popularity: 337.563
poster_path: "/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg"
release_date: "2019-01-03"
status: "Released"
title: "How to Train Your Dragon: The Hidden World"
vote_average: 7.8
vote_count: 990 
*/