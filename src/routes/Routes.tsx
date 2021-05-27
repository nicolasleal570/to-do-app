import React from "react"
import {Switch, Route, BrowserRouter} from "react-router-dom"

export default function Routes(){
return (
    <BrowserRouter>
    <Switch>
        <Route path="/to-do" render={()=> <p>TO-DO LIST</p>} exact />
        <Route path="/to-do/favorites" render={()=> <p>TO-DO LIST FAVORITES</p>} exact />
        <Route path="/" render={()=> <p>HOME PAGE</p>} exact />
    </Switch>
</BrowserRouter>
)
}
