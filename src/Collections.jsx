import React from 'react'

class Collections extends React.Component {
    state = {
        collectionsList: [],
        collectionName: "",
        label: "nombre de colleccion"
    }

    componentDidMount () {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        if (collectionsList){
            console.log(collectionsList)
        }else{
            console.log('no hay lista')
        }
        this.setState({collectionsList: collectionsList})

    }

    render () {
        const { collectionsList, collectionName, label } = this.state
        return (
            <div className="showcase">
                <div className="collection__view">
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
                                <li>{item.name}</li>)
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
                    collectionsList.push({name: colName})
                    this.setState({collectionsList: collectionsList})
                }
            }else{
                collectionsList = [{name: colName}]
                this.setState({collectionsList: [{name: colName}]})
            }
            localStorage.setItem('collectionsList',JSON.stringify(collectionsList))
        }
        
    }


}

export default Collections