import React from "react";
import { useAppState } from "../AppState";
import { Route, Link } from "react-router-dom"
import Form from "../components/Form";

const button = {
    margin: "5px",
    textAlign: "center",
    borderRadius: "7px",
    backgroundColor: "cornflowerblue",
    color: "black"
};

const Dashboard = (props) => {

    const { state, dispatch } = useAppState()
    const { token, url, posts, username } = state

    const getPosts = async () => {
        if (!token) {
            return
        }
        const response = await fetch(url + "/mondays/", {
            method: "get",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.ok === false) {
            props.history.push("/")
        }
        const fetchedPosts = await response.json()
        dispatch({ type: "getPosts", payload: fetchedPosts })
    }

    React.useEffect(() => { getPosts() }, [url, token, dispatch])

    const loaded = () => {
        return (
            <>
                <div className="dashboard">
                    <h1>{username}'s Day</h1>
                    <Link to="/dashboard/new"><button style={button}>Create New Item</button></Link>
                    <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getPosts={getPosts} />} />
                    <ul>
                        {state.posts.map(post => (
                            <div className="post" key={post.id}>
                                <h2>{post.name} @ {post.time}</h2>
                                <h4>{post.details}</h4>
                                <button style={button} onClick={() => {
                                    dispatch({type: "select", payload: post})
                                    props.history.push("/dashboard/edit")
                                }}>Edit</button>
                                <button style={button} onClick={() => {
                                    fetch(url + "/mondays/" + post.id, {
                                        method: "delete",
                                        headers: {
                                            Authorization: "bearer " + token
                                        }
                                    })
                                    .then(() => getPosts())
                                }}>Delete</button>
                            </div>
                        ))}
                    </ul>
                </div>
            </>

        )
    }

    return posts ? loaded() : <h1>Loading...</h1>;
}

export default Dashboard