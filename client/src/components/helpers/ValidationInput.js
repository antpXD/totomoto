import React from "react";
import { FilledInput, InputLabel, FormControl } from "@material-ui/core";

export const ValidationInput = ({
  error,
  label,
  className,
  name,
  inputRef
}) => {
  return (
    <>
      <FormControl variant="filled" error={error} fullWidth>
        <InputLabel htmlFor={`filled-input-${name}`}>{label}</InputLabel>
        <FilledInput
          id={`filled-input-${name}`}
          className={className}
          name={name}
          inputRef={inputRef}
          disableUnderline
          fullWidth
        />
      </FormControl>
    </>
  );
};

export default ValidationInput;
