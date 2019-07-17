import React from 'react'
import Redirect from 'react-router-dom/Redirect'
import { NavLink } from 'react-router-dom'
import { browserHistory } from 'react-router';


class Search extends React.Component {
    state = {
        search: "", 
        label:"Pelicula a buscar",
        redirect: false,
    }

    render () {
        const { search, label } = this.state
        return (
            <div>
                <form onSubmit={this.doSomething} className="form__search">
                    <input name="search" value={search} onChange={this.update} placeholder={label}/>
                    <input type="submit" value='Buscar'/>
                </form> 
            </div>
        )
    }

    doSomething = (event) => {
        event.preventDefault()
        this.setState({redirect: false})
        if (this.state.search===""){
            window.location='/discover';
        }else{
            window.location=`/?search=${this.state.search}`;
        }
    }

    update = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export default Search