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
            data = {
                ...data1,
                picture: `${IMG_URL}${data1.poster_path}`,
            }
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
