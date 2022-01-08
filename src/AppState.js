import React from "react"
import { useReducer } from "react"

// INITIAL STATE


const initialState = {
    url: "https://itineraryapi.herokuapp.com",
    posts: null,
    new: {
        name: "",
        details: "",
        time: ""
    },
    edit: {
        id: 0,
        name: "",
        details: "",
        time: ""
    }
}
try {
    const auth = window.localStorage.getItem("auth")
    const parsed = JSON.parse(auth)
    initialState.token = parsed.token
    initialState.username = parsed.username
} catch (error) {
    
}
// REDUCER

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth":
            newState = {...state, ...action.payload };
            return newState;
        case "logout":
            newState = {...state, token: null, username: null}
            window.localStorage.removeItem("auth")
            return newState;
        case "getPosts":
            newState = {...state, posts: action.payload}
            return newState;
        case "select":
            newState = {...state, edit: action.payload}
            return newState;
        default:
            return state;
    }
}

// AppContext
const AppContext = React.createContext(null)

// AppState Component
export const AppState = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const ctx = { state, dispatch };
    return <AppContext.Provider value={ctx}>
        {props.children}
    </AppContext.Provider>
}

// useAppState hook
export const useAppState = () => {
    return React.useContext(AppContext)
}

