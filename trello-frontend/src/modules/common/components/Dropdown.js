import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

/* 
  @label: string
  @options: array -> No admite null
  El formato de options debe ser:
  options = [
    {label: "Opción 1", action: () => {}},
    {label: "Opción 2", action: () => {}},
  ]
*/
const Dropdown = ({ label = "", options = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log("handleClick");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("handleClose");
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    action();
    handleClose();
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        {label}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem onClick={() => handleAction(option.action)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
