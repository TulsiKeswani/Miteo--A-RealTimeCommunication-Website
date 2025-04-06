import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "./history.module.css";


function History() {
  const { getUserHistory } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let history = await getUserHistory();
        setMeetings(history);
        console.log(history); 
      } catch (error) {
        throw error;
      }
    };

    fetchHistory();
  }, []);
  return (
    <div>
    <button onClick={() => {routeTo("/home")}} className={styles.history_back_btn}>{<ArrowBackIcon/>}Back</button>
    <div className = {styles.history_container}>
      
      {meetings.length > 0 ? (
        meetings.map((history,i) => {
          return (
            <div key={i} className={styles.history}>
              
              <p><b>username : {history.user_id}</b></p>
              <p>meeting_code : {history.meeting_code}</p>
              <p>Date : {history.date.split("T")[0]}</p>
            </div>
          );
        })
      ) : (
        <p>No meetings yet — your activity will show up here once you start collaborating! </p>
      )}
    </div>
    </div>
  );
}

export default History;
