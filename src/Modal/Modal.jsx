import React from 'react'; 

import './Modal.css'

class Modal extends React.Component {
  
  render() {
    // console.log(this.props.coleccion)
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }


    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.film.title}
          {
            this.props.coleccion?(
              <ul className="modal__list">
                {this.props.coleccion.map(
                  item => 
                    <li key={item.name} value={item.name} onClick={this.save}>
                      {item.name}
                    </li>  
                )}
              </ul>
            ):(
              <p>No hay colecciones. Primero cree una</p>
            )
          }
          <div className="footer">
            <button onClick={this.props.onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }
  save = (event) => {
    this.props.saveFilm(event.target.textContent, this.props.film)
    this.props.onClose()
  }
}


export default Modal;