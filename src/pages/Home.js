import React from "react"
const h1 = {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    margin: "10px"
};
const div = {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",

    
}
const Home = (props) => {
    return (
    <div>
        <h1 style={h1}>Welcome!</h1>
        <div style={div}>Hello! My name is Anthony Surace, and I am a Junior Software Engineer. This is my Itinerary day planner application. Here you can sign in a create a profile unique to you. You are able to create various notes that you can reference to help you stay organized throughout your day. I hope you like my application, feedback is welcomed!
        </div>
    </div>
    )
}

export default Home