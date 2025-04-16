import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen("paper")}>Terms & Conditions</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography variant="body2" gutterBottom>
              1. By using this platform, you agree to comply with all applicable
              laws and regulations.
            </Typography>
            <Typography variant="body2" gutterBottom>
              2. Do not use this service for any illegal, harmful, or abusive
              purpose including harassment, hate speech, or unauthorized
              recording.
            </Typography>
            <Typography variant="body2" gutterBottom>
              3. Users must not share meeting links publicly unless it's a
              public session.
            </Typography>
            <Typography variant="body2" gutterBottom>
              4. We are not responsible for the behavior of other users in the
              meetings.
            </Typography>
            <Typography variant="body2" gutterBottom>
              5. Any misuse of the platform may result in termination of access
              without notice.
            </Typography>
            <Typography variant="body2" gutterBottom>
              6. Terms may change over time. Continued use of the platform means
              you agree to the updated terms.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function ScrollDialog2() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen("paper")}>Privacy Policy</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography variant="body2" gutterBottom>
              1. We collect basic user information such as name and email for
              account and session management.
            </Typography>
            <Typography variant="body2" gutterBottom>
              2. Your video and audio streams are only used for real-time
              communication and are not stored on our servers.
            </Typography>
            <Typography variant="body2" gutterBottom>
              3. Any chat messages sent during a session are temporary and not
              saved.
            </Typography>
            <Typography variant="body2" gutterBottom>
              4. We use secure WebRTC connections to handle all video and audio
              data.
            </Typography>
            <Typography variant="body2" gutterBottom>
              5. Your data will not be sold or shared with any third party
              without consent.
            </Typography>
            <Typography variant="body2" gutterBottom>
              6. By using this platform, you consent to the collection and use
              of information as described.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export{ScrollDialog,ScrollDialog2};