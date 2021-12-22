import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  MenuList,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Typography,
} from "@mui/material";
import "./MainPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { TopicContext } from "../../../contexts/TopicContext";
import { ErrorNotificationContext } from "../../../contexts/ErrorNotificationContext";
import { logError } from "../../../services/logger";

const MainPage = () => {
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const topicContext = useContext(TopicContext);
  const setErrorMesssage = useContext(ErrorNotificationContext);

  const handleChange = (event) => {
    setTopic(event.target.value);
    topicContext.setTopic(topics.find((top) => top._id === event.target.value));
  };

  const isTopicEmpty = () =>{
    return topic==="";
  }

  useEffect(() => {
    const asyncHandler = async () => {
      let topics = await getTopics();
      if (topics == null) setErrorMesssage("Cannot get topics from server atm");
      if(topics.length===0) setErrorMesssage("No topics exist in this organization");
      else setTopics(topics);
    };
    asyncHandler();
  }, []);


  return (
    <Paper className="centerize">
      <Typography variant="h6" className="title-instructions">Choose topic before starting</Typography>
      <FormControl fullWidth variant="filled">
        <InputLabel id="topic-select-label">Choose a field of study</InputLabel>
        <Select
          labelId="topic-select-label"
          id="topic-select"
          value={topic}
          onChange={handleChange}
        >
          {topics.map((topic) => {
            return (
              <MenuItem key={topic._id} value={topic._id}>
                <Typography className="center-typography">
                  {topic.name}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Paper>
        <MenuList>
          <MenuItem disabled={isTopicEmpty()} component={Link} to="/questions/manage">
            <Typography className="center-typography">
              Manage questions {">>"}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem disabled={isTopicEmpty()} component={Link} to="/tests/manage">
            <Typography className="center-typography">
              Manage tests {">>"}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem disabled={isTopicEmpty()} component={Link} to="/report">
            <Typography className="center-typography">
              Reports {">>"}
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </Paper>
  );
};
/**
 * get topics from the servers
 * Returns array of topics
 */
const getTopics = async () => {
  try {
    const res = await axios.get("Topics");
    if (res.status === 200 && res.data != null) {
      return res.data;
    } else {
      return null;
    }
  } catch (err) {
    logError(err);
    return null;
  }
};
export default MainPage;
