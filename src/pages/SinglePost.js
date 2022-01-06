import React from "react"
import {Link} from "react-router-dom"

const SinglePost = ({posts, match, edit, deleteTodo}) => {

    // grab the id from params
    const id = parseInt(match.params.id)
    // find the single post from the posts array
    const post = posts.find((post) => post.id === id )

    ///////////////////
    // Style objects
    ////////////////////
    const div = {
        textAlign:"center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }

    return (
        <div style={div}>
            <h1>{post.name} @ {post.time}</h1>
            <h2>{post.details}</h2>
            <button onClick={(event) => edit(post)}>Edit</button>
            <button onClick={(event) => deleteTodo(post)}>Delete</button>
            <Link to="/">
                <button>go back</button>
            </Link>
        </div>
    )
}

export default SinglePost