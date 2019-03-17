import React from 'react'
import Redirect from 'react-router-dom/Redirect'

import MoviedabaContext from './MoviedabaContext';

class Search extends React.Component {
    state = {
        film: "", 
        label:"Pelicula a buscar",
        redirect: false,
        redirecting: false,
    }

    render () {
        const { film, label } = this.state
        return (
            <div>
                <form onSubmit={this.search} className="form__search">
                    <input name="film" value={film} onChange={this.update} placeholder={label}/>
                    <input type="submit" value='Buscar'/>
                </form> 
                {this.doSomething()}
            </div>
        )
    }
    doSomething = () => {
        if (this.state.redirect){
            this.setState({redirect: false})
            if (this.state.film===""){
                return <Redirect to={`/`} />
            }else{
                return <Redirect to={`/?search=${this.state.film}`} />
            }
             
        }
    }

    search = async event => {
        event.preventDefault()
        const { film } = this.state
        console.log(film)
        const searchResults = await this.props.onSearch(film)
        console.log(searchResults)
        localStorage.setItem('movies', JSON.stringify(searchResults))
        this.setState({redirect: true})

    }

    update = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export default props =>
    <MoviedabaContext.Consumer>
        {
            ({ searchFilm }) =>
            <Search onSearch={searchFilm} />
        }
    </MoviedabaContext.Consumer>