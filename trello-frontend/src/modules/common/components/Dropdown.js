import React, { useState } from "react";
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

/* 
  @label: string
  @options: array -> No admite null
  El formato de options debe ser:
  options = [
    {label: "Opción 1", action: () => {}, icon: <IconComponent />, description: "Descripción opcional" },
    {label: "Opción 2", action: () => {}, icon: <IconComponent /> },
  ]
*/
const Dropdown = ({ label = "", options = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
          <div key={option.label}>
            <MenuItem onClick={() => handleAction(option.action)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
            {/* Aca va la descripcion de Crear un Espacio de Trabajo */}
            {option.description && (
              <div style={{ padding: "5px 10px", fontSize: "14px", color: "#666",maxWidth: "250px", borderBottom: "3px solid #eee"}}>
                {option.description}
              </div>
            )}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
