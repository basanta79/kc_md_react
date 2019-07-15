import React from 'react'
import { Switch, Route } from 'react-router'

import FilmList from './FilmList'
import FilmDetail from './FilmDetail'
import Collections from './Collections'
import CollectionsDetail from './CollectionsDetail'

export default () =>
    <Switch>
        <Route exact path='/' component={FilmList} />
        <Route exact path='/discover' component={FilmList} />
        <Route exact path='/detail/:id' component={FilmDetail} />
        <Route exact path='/collections' component={Collections} />
        <Route exact path='/collections/:name' component={CollectionsDetail} />
    </Switch>