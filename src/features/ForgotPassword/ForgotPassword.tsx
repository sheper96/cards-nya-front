import {Button, FormGroup, TextField} from '@mui/material';
import React, {ChangeEventHandler, useEffect, useState} from 'react';
import BoxContainer from '../../common/components/BoxContainer/BoxContainer';
import s from './ForgotPassword.module.css'
import {useFormik} from "formik";
import {font} from '../../app/App';
import {authAPI} from '../../app/api';
import {forgotPasswordTC} from '../Login/auth-reducer';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../common/hooks/react-redux-hooks';

const ForgotPassword = () => {
   
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [text, setText] = useState("")
    
    const isPasswordReset = useAppSelector(state=>state.auth.isPasswordReset)

    const emailHandler = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    type FormikErrorType = {
        email?: string

    }

    const formik = useFormik({
        initialValues: {
            email: "",
            from: "test",
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                        <a href='http://localhost:3000/#/set-new-password/$token$'>
                        link</a>
                      </div>`
        },

        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotPasswordTC(values))
            formik.resetForm();
        },
    });

    useEffect(() => {
        if (isPasswordReset) {
            navigate('/checkemail')
        }
    }, [isPasswordReset])
    
    
    return (
        <div className={s.container}>
            <BoxContainer
                title={'Forgot your password?'} subTextForm={'Did you remember your password?'}
                subLinkUrlText={'Try logging in'}
                subLinkUrl={'/registration'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            error={
                                Boolean(formik.errors.email && formik.touched.email)
                            }
                            helperText={
                                formik.errors.email &&
                                formik.touched.email &&
                                String(formik.errors.email)
                            }
                            label="Email"
                            type="text"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                            inputProps={{style: {fontFamily: font}}}
                            InputLabelProps={{style: {fontFamily: font}}}
                        />
                        <span className={s.instructions}>Enter your email address and we will send you further instructions </span>
                        <Button sx={{borderRadius: 7.5, mt: 3}} type={'submit'} variant={'contained'} color={'primary'}>
                            Send Instructions
                        </Button>
                    </FormGroup>
                </form>
            </BoxContainer>
        </div>
    );
};

export default ForgotPassword;