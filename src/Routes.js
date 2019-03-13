import React from 'react'
import { Switch, Route } from 'react-router'

import FilmList from './FilmList'
import FilmDetail from './FilmDetail'

export default () =>
    <Switch>
        <Route exact path='/' component={FilmList} />
        <Route exact path='/detail/:id' component={FilmDetail} />
    </Switch>