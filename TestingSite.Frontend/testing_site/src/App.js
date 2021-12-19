import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home/Home";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { TopicContext } from "./contexts/TopicContext";
import { ErrorNotificationContext } from "./contexts/ErrorNotificationContext";
import axios from "axios";
import ErrorNotification from "./components/common/error_notification/ErrorNotification";

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
  const [topic, setTopic] = useState({});
  const topicValue = { topic, setTopic };
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const setErrorMessage = (message) =>{
    setMessage(message);
    setOpen(true);
  }
  return (
    <TopicContext.Provider value={topicValue}>
      <ErrorNotificationContext.Provider value={setErrorMessage}>
        <BrowserRouter>
          <Home />
          <ErrorNotification message={message} open={open} setOpen={setOpen} />
        </BrowserRouter>
      </ErrorNotificationContext.Provider>
    </TopicContext.Provider>
  );
}

export default App;
