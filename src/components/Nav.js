import React from "react";
import { Link } from "react-router-dom"
import { useAppState } from "../AppState";
import Hamburger from "./Hamburger";

const h1 = {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    margin: "10px",
    borderRadius: "7px",
};

const Nav = (props) => {
    const { state, dispatch } = useAppState()
    return <header>
        <h1 style={h1}>Itinerary Planner</h1>
        <Hamburger/>
        <nav>
            <Link to="/"><div>Home</div></Link>
            <Link to="/dashboard"><div>Your Day</div></Link>
            {!state.token ? (<>
                <Link to="/auth/signup"><div>Signup</div></Link>
                <Link to="/auth/login"><div>Login</div></Link>
            </>) : null}
            {state.token ? <div onClick={() => {
                dispatch({ type: "logout" });
                props.history.push("/")
            }}>Logout</div> : null}
        </nav>
    </header>
}

export default Nav