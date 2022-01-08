import React from "react";
import { useAppState } from "../AppState";

const title = {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    margin: "10px",
    borderRadius: "7px",

};

const Auth = (props) => {
    const type = props.match.params.form
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    });
    const [userData, setUserData] = React.useState();
    const { state, dispatch } = useAppState()
    // console.log(state)

    React.useEffect(() => {
        if (userData) {
            // console.log(userData)
            const { token, user } = userData;
            dispatch({ type: "auth", payload: { token, username: user.username } });
            window.localStorage.setItem("auth", JSON.stringify({ token, username: user.username }))
            props.history.push("/dashboard")
        }
    }, [userData]);

    const actions = {
        signup: () => {
            return fetch(state.url + "/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json());
        },
        login: () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json());
        },
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        actions[type]().then((data) => {
            setUserData(data)
        });
    };

    return <div style={title}>
        <form onSubmit={handleSubmit}>
            <h1>Please {type}</h1>
            <input type="text" name="username" value={formData.username} placeholder="username" onChange={handleChange} />
            <input type="text" name="password" value={formData.password} placeholder="password" onChange={handleChange} />
            <input type="submit" value={type} />
        </form>
    </div>
}

export default Auth