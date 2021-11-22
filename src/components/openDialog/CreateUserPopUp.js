import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUserPopUp({
  rajoniOnChange,
  data,
  onChange,
  handleFormSubmit,
  handleClose,
  open,
}) {
  const {
    id,
    FirstName,
    LastName,
    Contact,
    City,
    Street,
    PostalCode,
    RajoniId,
  } = data;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{id ? "UPDATE" : "Add new consumer"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="FirstName"
              value={FirstName}
              onChange={(e) => onChange(e)}
              placeholder="Enter name"
              label="Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="LastName"
              value={LastName}
              onChange={(e) => onChange(e)}
              placeholder="Enter lastname"
              label="Lastname"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Street"
              value={Street}
              onChange={(e) => onChange(e)}
              placeholder="Street"
              label="Street"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="City"
              value={City}
              onChange={(e) => onChange(e)}
              placeholder="City"
              label="City"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="PostalCode"
              value={PostalCode}
              onChange={(e) => onChange(e)}
              placeholder="PostalCode"
              label="PostalCode"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Contact"
              value={Contact}
              onChange={(e) => onChange(e)}
              placeholder="Contact"
              label="Contact"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            {/* <TextField id="RajoniId"     value={RajoniId} onChange={e=>onChange(e)} placeholder="RajoniId" label="RajoniId" variant="outlined" margin="dense" fullWidth /> */}
            <div>
              <br />
              <select
                className=" bg-white text-black  custom-select mr-sm-8"
                id="inlineFormCustomSelect"
                value={RajoniId}
                onChange={rajoniOnChange}
              >
                <option value="0">Region</option>
                <option value="1">Tetove</option>
                <option value="2">Struge</option>
                <option value="3">Shkup</option>
              </select>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleFormSubmit()}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
