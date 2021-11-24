import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home/Home";
import React,{useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { TopicContext } from "./contexts/TopicContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";

//requests middleware
axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//response middleware
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

function App() {
  const [topic,setTopic] = useState({});
  const value = {topic,setTopic};
  return (
    <TopicContext.Provider value={value}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </TopicContext.Provider>
  );
}

export default App;
