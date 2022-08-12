import React, { useState } from 'react';

interface IValues {
    username: string,
    email?: string | undefined,
    password: string,
    confirmPassword?: string | undefined
}

export const useForm = (callback: any, initialState: IValues) => {

    const [values, setValues] = useState(initialState);

    const onChange = (event:any) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const onSubmit = (event:any) => {
        event.preventDefault();
        callback();
    }

    return { onChange, onSubmit, values } 
}