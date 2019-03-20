import React from 'react'


class CollectionsDetail extends React.Component {
    state = { 
        loading: true,
        collections: [],
        result: "",
    }

    async componentDidMount () {
        const collectionsList = JSON.parse(localStorage.getItem('collectionsList'))
        console.log(this.props.match.params.name)
        const nameToFind = this.props.match.params.name
        if (collectionsList){
            const nameFound = collectionsList.find(item => item.name===nameToFind)
            if (nameFound){
                // this.setState({collections: nameFound.})
                console.log(nameFound.filmsId)
            }else{
                this.setState({ result: "La colección especificada no existe"})
            }
        }else{
            this.setState({ result: "No hay colecciones almacenadas"})
        }
        this.setState({collectionsList: collectionsList})
    }

    render(){
        const { result, collectionsList } = this.state
        if (result){
            return (
                <p>{result}</p>
            )
        }

        return (
            <p>detalle de colección</p>
        )
    }
}

export default CollectionsDetail