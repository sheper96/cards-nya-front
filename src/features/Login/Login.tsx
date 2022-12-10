import React, {useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks";
import BoxContainer from "../../common/components/BoxContainer/BoxContainer";
import s from './login.module.css'
import {useNavigate} from "react-router-dom";
import {IconButton, InputAdornment, Link} from "@mui/material";
import Box from '@material-ui/core/Box';
import { loginTC } from './auth-reducer';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import { font } from '../../app/App';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: string
}

export const Login = () => {
    let [isShowPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!isShowPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        }, validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length <= 7) {
                errors.password = 'Password must be 8 symbol'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        }

    })
    let isLoggedIn=useAppSelector(state=>state.auth.isLoggedIn)


    useEffect(() => {

    }, )

    if (isLoggedIn) {
        navigate('/profile')
    }
    return (<div className={s.container}>
        <BoxContainer title={'Sing in'} subTextForm={'Already have an account?'} subLinkUrlText={'Sign up'}
                      subLinkUrl={'/registration'}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <FormControl>
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
                        <Box className={s.row}>
                            <FormControlLabel {...formik.getFieldProps('rememberMe')} label={'Remember me'}
                                              control={<Checkbox/>}/>

                            <Link href="/forgotpassword" underline="hover">
                                Forgot Password?
                            </Link>
                        </Box>
                        <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
                            Sign in
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </BoxContainer>
    </div>)

}