import React from 'react'
import { Link } from 'react-router-dom'

import MoviedabaContext from './MoviedabaContext'

class Collections extends React.Component {
    state = {
        collectionsList: [],
        collectionName: "",
    }

    componentDidMount () {
        const collectionsList = this.props.getCollections()
        this.setState({collectionsList: collectionsList})
    }

    render () {
        const { collectionsList, collectionName } = this.state
        return (
            <div className="collection__view">
                <div className="collection__nav">
                    <form onSubmit={this.createCollection} className="collection__form">
                        <input name="collectionName" value={collectionName} onChange={this.update} placeholder={"nombre de colleccion"}/>
                        <input type="submit" value='crear'/>
                    </form>
                </div>
                <div className="collections__list">
                    {
                        collectionsList?
                        (
                            collectionsList.map ((item, index) =>
                                <Link  key={index} to={`/collections/${item.name}`}><li>{item.name}</li></Link>)
                        ):(
                            <p>No hay colecciones</p>
                        )
                    }
                </div>
            </div>
        )
    }

    update = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    createCollection = event => {
        event.preventDefault()
        let { collectionsList } = this.state
        const colName = this.state.collectionName
        if (colName){
            const collectionsResult = this.props.addCollection(colName)
            this.setState({collectionsList: collectionsResult})
        }
        
    }


}

export default props =>
    <MoviedabaContext.Consumer>
        {
            ({ collectionGet, collectionAdd }) => 
            <Collections getCollections={collectionGet} addCollection={collectionAdd} />
        }
    </MoviedabaContext.Consumer>