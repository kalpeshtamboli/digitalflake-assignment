import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";


const Input = ({
    label = "label",
    textColor="black",
    value,
    onChange,
    placeholder = "Enter message",
    name = "name",
    type = "type",
    variant,
    standard,
    labelColor,
    borderColor="blue",
    required,
    onKeyDown
  }) => {
    const handleChange = (e) => {
      if (onChange) {
        const { name, value } = e.target;
        onChange(name, value);
      }
    };

    
  
    return (
      <div className="my-5">
        <Box
           sx={{
          width: "full", // Make the box full width
          // md: { width: "2/3" }, // On medium screens, make it 2/3 width
          // lg: { width: "1/2" }, // On large screens, make it 1/2 width
        }}
        
        >
          <TextField
            size="small"
            sx={{
              "& label.Mui-focused": {
                color: {textColor},
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: {borderColor},
              },
              "& .MuiOutlinedInput-root": {
                color: {textColor}, // 
                "& fieldset": {
                  borderColor:{borderColor},
                },
                "&:hover fieldset": {
                  borderColor:{borderColor},
                },
                "&.Mui-focused fieldset": {
                  borderColor:{borderColor},
                },
              },
            }}
            autoComplete="off"
            type={type}
            name={name}
            value={value}
            label={label}
            onChange={handleChange}
            placeholder={placeholder}
            variant={variant}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onKeyDown();
              }
            }}
          />
        </Box>
      </div>
    );
  };
  
  // ... (PropTypes and default export)
  

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
