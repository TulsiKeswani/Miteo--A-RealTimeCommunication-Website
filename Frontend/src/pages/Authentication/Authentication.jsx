import React from "react";
import Footer from "../LandingPage/Footer.jsx";
import "./Authentication.css";
import "../LandingPage/Landingpage.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useSearchParams } from "react-router-dom";


function Authentication() {
 
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [formState, setFormState] = React.useState(searchParams.get("type") === "signup"? 1 : 0);
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  let handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (formState === 0) {

        let result = await handleLogin(username,password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setMessage(result);
        setOpen(true);
        setError("");
        setPassword("");
        setUsername("")
        setFormState(0);
      }
    } catch (err) {
      let message = (err.response.data.message);  
      setError(message);
      setMessage(message);
      setOpen(true);
      setUsername("");
      setPassword("");
      setName("");
    }
  };
  return (
    <div className="Auth_Form">
      <div className="main_section">
        <div className="image">
          <img src="/assets/Group 1.png" />
        </div>

        <div className="form">
          <form >
        
            <div className="for_logo">
              <img
                src="/assets/video-call.png"
                style={{ height: "2rem", width: "2rem" }}
              />
              <p>Miteo</p>
            </div>

            <div className="buttons">
              <div className="icon">
                <LockOpenRoundedIcon></LockOpenRoundedIcon>
              </div>
              <div className="btn">
                <Button
                  variant={formState === 0 ? "contained" : ""}
                  onClick={() => {
                    setFormState(0);
                  }}
                >
                  Sing In
                </Button>
                <Button
                  variant={formState === 1 ? "contained" : ""}
                  onClick={() => {
                    setFormState(1);
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>

            <div className="inputs">
              {formState === 1 ? (
                <>
                  <label htmlFor="FullName" className="labels">
                    Name
                  </label>
                  <TextField
                    className="input"
                    id="FullName"
                    label="Enter Full Name"
                    variant="filled"
                    size="small"
                    name="FullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />{" "}
                  <br />
                </>
              ) : (
                <></>
              )}

              <label htmlFor="username" className="labels">
                Username
              </label>
              <TextField
                className="input"
                id="username"
                label="Enter Unique Username"
                variant="filled"
                size="small"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
    
              <br />
              <label htmlFor="password" className="labels">
                Password
              </label>
              <TextField
                className="input"
                id="password"
                label="Enter Strong Password"
                variant="filled"
                size="small"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                style={{
                  color: "red",
                }}
              >
                {error}
              </p>
             
            </div>

            <div className="bottom_text">
              <Button variant="contained" type="submit" onClick={handleAuth}>Submit</Button>
              <span style={{ cursor: "pointer" }}>Forgot your Password?</span>
            </div>
          </form>
          <Snackbar open={open} autoHideDuration={4000} message={message} onClose={() => setOpen(false)}/>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Authentication;
