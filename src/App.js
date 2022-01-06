// Import our components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Nav from "./components/Nav";

// import React Hooks
import { useState, useEffect } from "react";

// Import React Router Components
import { Route, Switch, Link } from "react-router-dom";


function App(props) {
  ////////////
  // Style Objects
  ///////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }

  //////////////////
  // State & Other Variables
  //////////////////

  //api url
  const url = "https://vast-gorge-85508.herokuapp.com/mondays/"
  // const urlMonday = "https://vast-gorge-85508.herokuapp.com/mondays";
  // const urlTuesday = "https://vast-gorge-85508.herokuapp.com/tuesdays";
  // const urlWednesday = "https://vast-gorge-85508.herokuapp.com/wednesdays";
  // const urlThursday = "https://vast-gorge-85508.herokuapp.com/thursdays";
  // const urlFriday = "https://vast-gorge-85508.herokuapp.com/fridays";
  // const urlSaturday = "https://vast-gorge-85508.herokuapp.com/saturdays";
  // const urlSunday = "https://vast-gorge-85508.herokuapp.com/sundays"

  // state to hold list of todos
  const [posts, setPosts] = useState([]);

  // an object that represents a null todo as a starting point
  const nullTodo = {
    name: "",
    details: "",
    time: ""
  }

  // const stat to hold todo for editing

  const [targetTodo, setTargetTodo] = useState(nullTodo)

  ///////////////
  // Functions
  ////////////////

  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    getTodos();
  }

  const getTargetTodo = (todo) => {
    setTargetTodo(todo);
    props.history.push("/edit");
  }

  const updateTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo),
    });

    // get updated list of todos
    getTodos();
  }
  // Function to edit todo on form submission
  const deleteTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "delete",
    });

    // get updated list of todos
    getTodos();
    props.history.push("/");
  };
  ///////////////
  // useEffects
  ///////////////
  // make the api call when the component
  // loads only the first time
  useEffect(() => {
    getTodos()
  }, [])

  /////////////////
  // Returned JSX
  /////////////////
  return (
    <div className="App">
      <h1 style={h1}>My Itinerary</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <h2>Monday</h2>
      <Switch>
        {/* INDEX PAGE */}
        <Route
          exact path="/"
          render={(rp) => {
            return <AllPosts {...rp} posts={posts} />;
          }}
        />
        {/* LOGIN PAGE */}
        <Route
          path="/auth/:form" 
          component={Auth} />;

        <Route
          path="/dashboard"
          component={Dashboard} />
        {/* SHOW PAGE */}
        <Route
          path="/post/:id"
          render={(rp) => {
            return <SinglePost
              {...rp}
              posts={posts}
              edit={getTargetTodo}
              deleteTodo={deleteTodo}
            />;
          }}
        />
        {/* NEW AND EDIT FORM PAGES */}
        <Route
          path="/new"
          render={(rp) => {
            return <Form {...rp}
              initialTodo={nullTodo}
              handleSubmit={addTodos}
              buttonLabel="Add to my list"
            />;
          }}
        />
        <Route
          path="/edit"
          render={(rp) => {
            return <Form
              {...rp}
              initialTodo={targetTodo}
              handleSubmit={updateTodo}
              buttonLabel="Edit"
            />;
          }}
        />
      </Switch>
      <h2>Tuesday</h2>

      <h2>Wednesday</h2>

      <h2>Thursday</h2>

      <h2>Friday</h2>

      <h2>Saturday</h2>

      <h2>Sunday</h2>
    </div>
  );
}

export default App;

// todos_ordered = Todo.where(…..).order(column_order: :asc)