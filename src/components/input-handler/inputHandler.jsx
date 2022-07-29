import React from 'react';
import {ErrorMessage, useField} from "formik";
import {TextField} from "@mui/material";

const InputHandler = (props) => {
    const [field, meta] = useField(props)
    return (
        <TextField
            error={!!(meta.touched && meta.error)}
            autoComplete="off"
            fullWidth
            variant={"outlined"}
            helperText={<ErrorMessage name={field.name}/>}
            {...field}
            {...props}
        />
    );
};

export default InputHandler;