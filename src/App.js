 
  import React from "react";
import MovieApp from "./components/MovieApp";

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return <MovieApp/>;
}

export default App;
