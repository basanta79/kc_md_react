import React from 'react'

import './Nav.css'
import { NavLink } from 'react-router-dom'
import Search from './Search';

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
        <div className="search__form">
            <Search></Search>
        </div>
    </nav>