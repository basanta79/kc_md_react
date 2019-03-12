import React from 'react'

import './Nav.css'
import { NavLink } from 'react-router-dom'

export default props =>
    <nav className="menu">
        <ul className="menu__options">
            <li className="menu__title">
                <NavLink className="menu__title" to='/'>MOVIEDABA</NavLink>
            </li>
            <li className="menu__option"> 
                <NavLink className="menu__link menu__button" to='/discover'>Descubrir</NavLink>
            </li>
            <li className="menu__option">
                <NavLink className="menu__link menu__button" to='/collections'>Colecciones</NavLink>
            </li>
        </ul>
        <form action="" className="search__form">
            <input type="text" className="search__input" placeholder="Busca pelicula" />
            <button className="search__button">Buscar</button>
        </form>
    </nav>