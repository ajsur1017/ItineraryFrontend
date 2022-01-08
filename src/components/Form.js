import React from "react";
import { useAppState } from "../AppState";

const button = {
    margin: "5px",
    textAlign: "center",
    borderRadius: "7px",
    backgroundColor: "cornflowerblue",
    color: "black",
    border: "black",
    margin: "auto"
};
const Form = (props) => {
    const { state, dispatch } = useAppState()
    const { token } = state
    const action = props.match.params.action
    const [formData, setFormData] = React.useState(state[action])

    const actions = {
        new: () => {
            return fetch(state.url + "/mondays", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json());
        },
        edit: () => {
            return fetch(state.url + "/mondays/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
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
        actions[action]().then((data) => {
            props.getPosts()
            props.history.push("/dashboard/")
        });
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div>Name:</div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} ></input>
                <div>Time:</div>
                <input type="text" name="time" value={formData.time} onChange={handleChange} ></input>
                <div>Details:</div>
                <input type="text" name="details" value={formData.details} onChange={handleChange} ></input>
                <input type="submit" value={action} style={button}/>

            </form>
        </div>
    );
}

export default Form