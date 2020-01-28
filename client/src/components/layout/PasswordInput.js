import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  IconButton,
  FilledInput,
  InputLabel,
  InputAdornment,
  FormControl
} from "@material-ui/core";

const PasswordInput = ({ error, label, className, name, inputRef }) => {
  const [password, setPassword] = useState({
    showPassword: false
  });
  const onClickShowPassword = () => {
    setPassword({ showPassword: !password.showPassword });
  };
  const onMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl variant="filled" error={error} fullWidth>
        <InputLabel htmlFor="filled-adornment-password">{label}</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          className={className}
          name={name}
          type={password.showPassword ? "text" : "password"}
          inputRef={inputRef}
          disableUnderline
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onClickShowPassword}
                onMouseDown={onMouseDownPassword}
              >
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default PasswordInput;
