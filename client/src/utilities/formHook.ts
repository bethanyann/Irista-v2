
import React, { useState } from 'react';

export const useForm = (callback: any, initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value});
        console.log(values);
    }

    const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        callback();
    }

    return { onChange, onSubmit, values } 
}