import React from "react"
import { Switch, Route } from "react-router-dom"
import Nav from "./Nav"
import Home from "../pages/Home"
import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import { useAppState } from "../AppState"

export const App = (props) => {

    const {state, dispatch} = useAppState()
    React.useState(() => {
        
        if (state.token) {
            props.history.push("/dashboard")
        } else {
            props.history.push("/")
        }
    }, [])

    return (
        <>

            <Route path="/" component={Nav}/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth/:form" component={Auth} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </>
    );
};