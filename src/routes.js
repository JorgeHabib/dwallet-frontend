import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login';
import Profile from './pages/Profile';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import StockDetail from './pages/StockInfos';
import SignUp from './pages/SignUp';

import PrivateRoute from './privateRoute';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/register' component={SignUp} />
                <PrivateRoute path='/profile' exact component={Profile}/>
                <PrivateRoute path='/stocks/buy' exact component={Buy}/>
                <PrivateRoute path='/stocks/sell' exact component={Sell}/>
                <PrivateRoute path='/stocks/:name' component={StockDetail}/>
            </Switch>
        </BrowserRouter>
    )
}