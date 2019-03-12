import React from 'react'
import { Switch, Route } from 'react-router'

import FilmList from './FilmList'

export default () =>
    <Switch>
        <Route exact path='/' component={FilmList} />
    </Switch>