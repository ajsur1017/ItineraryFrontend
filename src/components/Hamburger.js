import React from "react"

const Hamburger = (props) => {
    return (
        <div class="dropdown">
            <button class="dropbtn">|||</button>
            <div class="dropdown-content">
                <a href="https://destiny-locker.herokuapp.com/user/login">Guardian Locker</a>
                <a href="https://events-n-stuff.netlify.app/">Events-N-Stuff</a>
                <a href="https://ajsur1017.github.io/poke-search.github.io/">PokeSearch</a>
                <a href="https://the-big-cheese.netlify.app/">The Big Cheese</a>
            </div>
        </div>
    )
}
export default Hamburger