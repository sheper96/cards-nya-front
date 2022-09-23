import React, {useState} from 'react';
import BoxContainer from "../../common/components/BoxContainer/BoxContainer";

import {useFormik} from "formik";
import {Button, FormGroup, IconButton, InputAdornment} from "@mui/material";
import TextField from '@material-ui/core/TextField';

import {font} from "../../app/App";
import s from './Registration.module.css'
import {useAppDispatch} from "../../common/hooks/react-redux-hooks";
import {registerTC} from "./registration-reducer";
import {Visibility, VisibilityOff} from '@mui/icons-material';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}


const Registration = () => {
    const dispatch = useAppDispatch()
    let [isShowPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length <= 7) {
                errors.password = 'Password mast be 8 symbol'
            }
            if (values.confirmPassword.length <= 7) {
                errors.confirmPassword = 'Password mast be 8 symbol'
            }
            if (values.confirmPassword.length >1 )
            {
                if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = 'Passwords must be the same'
                }
            }
            return errors
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm();
        },
    });
    const handleClickShowPassword = () => {
        setShowPassword(!isShowPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={s.container}>
            <BoxContainer title={'Sing in'} subTextForm={'Already have an account?'} subLinkUrlText={'Sign In'} subLinkUrl={'/login'} >
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
                        <TextField
                            error={
                                Boolean(formik.errors.password && formik.touched.password)
                            }
                            helperText={
                                formik.errors.password &&
                                formik.touched.password &&
                                String(formik.errors.password)
                            }
                            label="Password"
                            type={isShowPassword? "text": "password"}
                            margin="normal"
                            {...formik.getFieldProps('password')}
                            inputProps={{style: {fontFamily: font}}}
                            InputLabelProps={{style: {fontFamily: font}}}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                           {isShowPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />

                        <TextField
                            error={
                                Boolean( formik.errors.confirmPassword && formik.touched.confirmPassword )
                            }
                            helperText={
                                formik.errors.confirmPassword &&
                                formik.touched.confirmPassword &&
                                String(formik.errors.confirmPassword)
                            }
                            label="Confirm password"
                            type={isShowPassword? "text": "password"}
                            margin="normal"
                            {...formik.getFieldProps('confirmPassword')}
                            inputProps={{style: {fontFamily: font}}}
                            InputLabelProps={{style: {fontFamily: font}}}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {isShowPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Button sx={{borderRadius: 7.5, mt: 3}} type={'submit'} variant={'contained'} color={'primary'}>
                            Sing up
                        </Button>
                    </FormGroup>
                </form>
            </BoxContainer>
        </div>
    );
};

export default Registration;