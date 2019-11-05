import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login';
import Profile from './pages/Profile';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import StockDetail from './pages/StockInfos';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/profile' exact component={Profile}/>
                <Route path='/stocks/buy' exact component={Buy}/>
                <Route path='/stocks/sell' exact component={Sell}/>
                <Route path='/stocks/:name' component={StockDetail}/>
            </Switch>
        </BrowserRouter>
    )
}