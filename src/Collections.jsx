import React from 'react'
import { Link } from 'react-router-dom'

import MoviedabaContext from './MoviedabaContext'

class Collections extends React.Component {
    state = {
        collectionsList: [],
        collectionName: "",
        label: "nombre de colleccion"
    }

    componentDidMount () {
        const collectionsList = this.props.getCollections()
        this.setState({collectionsList: collectionsList})
    }

    render () {
        const { collectionsList, collectionName, label } = this.state
        return (
            <div className="collection__view">
                <div className="collection__nav">
                    <form onSubmit={this.createCollection} className="collection__form">
                        <input name="collectionName" value={collectionName} onChange={this.update} placeholder={label}/>
                        <input type="submit" value='crear'/>
                    </form>
                </div>
                <div className="collections__list">
                    {
                        collectionsList?
                        (
                            collectionsList.map (item =>
                                <Link to={`/collections/${item.name}`}><li>{item.name}</li></Link>)
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
        let { collectionsList} = this.state
        const colName = this.state.collectionName
        if (colName){
            if (collectionsList) {
                console.log(colName)
                const found = collectionsList.find(collection => collection.name===colName)
                if (found){
                    console.log(found)
                    console.log('El nombre está repetido')
                }else{
                    collectionsList.push({name: colName, movies:[]})
                    this.setState({collectionsList: collectionsList})
                }
            }else{
                collectionsList = [{name: colName, movies:[]}]
                this.setState({collectionsList: [{name: colName, movies:[]}]})
            }
            localStorage.setItem('collectionsList',JSON.stringify(collectionsList))
        }
        
    }


}

export default props =>
    <MoviedabaContext.Consumer>
        {
            ({ collectionGet}) => 
            <Collections getCollections={collectionGet}></Collections>
        }
    </MoviedabaContext.Consumer>