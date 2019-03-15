import React from 'react'

class Search extends React.Component {
    state = {pelicula: ""}

    render () {
        const { pelicula } = this.state
        return (
            <form onSubmit={this.search} className="form__search">
                <input name="film" value={pelicula} />
                <input type="submit" value='Buscar'/>
            </form> 
        )
    }

    search = () => null
}

export default Search