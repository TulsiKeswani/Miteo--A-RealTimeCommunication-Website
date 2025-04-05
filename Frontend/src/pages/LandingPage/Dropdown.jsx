import React from "react";  // React import karo
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";


export default function Dropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <i class="fa-solid fa-bars"></i>

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate("/home")} className="menuitem"> {<VideoCallIcon style={{ marginRight: "10px" }} ></VideoCallIcon>} Join As Guest</MenuItem>
        <hr style={{opacity : "0.5",width : "70%", margin: "auto"}}/>
        <MenuItem onClick={() => navigate("/auth?type=login")} className="menuitem"> {<LoginIcon style={{ marginRight: "10px" }} ></LoginIcon>} Login</MenuItem>
        <MenuItem onClick={() => navigate("/auth?type=signup")} className="menuitem"> {<AccountCircleIcon style={{ marginRight: "10px" }} ></AccountCircleIcon>} Register</MenuItem>
      </Menu>
    </div>
  );
}
