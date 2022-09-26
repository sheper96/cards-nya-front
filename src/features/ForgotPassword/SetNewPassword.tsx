import {Button, FormGroup, IconButton, InputAdornment, TextField} from '@mui/material';
import React, {ChangeEventHandler, useEffect, useState} from 'react';
import BoxContainer from '../../common/components/BoxContainer/BoxContainer';
import s from './SetNewPassword.module.css'
import {useFormik} from "formik";
import {font} from '../../app/App';
import {authAPI} from '../../app/api';
import {forgotPasswordTC, setNewPasswordTC} from '../Login/auth-reducer';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../common/hooks/react-redux-hooks';
import {Visibility, VisibilityOff } from '@mui/icons-material';

export const SetNewPassword = () => {
   
    const dispatch = useAppDispatch()
    const params = useParams()
    
    const token = params.token
    
    let [isShowPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => {
        setShowPassword(!isShowPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    type FormikErrorType = {
        password?: string

    }

    const formik = useFormik({
        initialValues: {
            password: "",
            resetPasswordToken: token,
        },

        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Password is required'
            }
            if (values.password.length <= 7) {
                errors.password = 'Password mast be 8 symbol'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values))
            formik.resetForm();
        },
    });

    return (
        <div className={s.container}>
            <BoxContainer
                title={'Create new password'} 
               >
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            error={
                                Boolean(formik.errors.password && formik.touched.password)
                            }
                            helperText={
                                formik.errors.password &&
                                formik.touched.password &&
                                String(formik.errors.password)
                            }
                            label="password"
                            type={isShowPassword ? "text" : "password"}
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
                        <span className={s.instructions}>Create new password and we will send you further instructions to email</span>
                        <Button sx={{borderRadius: 7.5, mt: 3}} type={'submit'} variant={'contained'} color={'primary'}>
                            Send Instructions
                        </Button>
                    </FormGroup>
                </form>
            </BoxContainer>
        </div>
    );
};

