import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./login-reducer";
import {useAppDispatch} from "../../common/hooks/react-redux-hooks";
import BoxContainer from "../../common/components/BoxContainer/BoxContainer";
import s from './login.module.css'
import {LinearProgress} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../app/app-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: string
}
export const Login = () => {
    const isLoggedIn=useSelector<AppRootStateType,boolean>(state=>state.app.isInitialized)
    const dispatch = useAppDispatch()
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
                errors.password = 'Password mast be 8 symbol'
            }


            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        }

    })
    if (isLoggedIn){
        return <Navigate to={'/'}/>
    }
    return (<div className={s.container}>
        <BoxContainer title={'Sing in'} subTextForm={'Already have an account?'} subLinkUrlText={'Sign up'}
                      subLinkUrl={'/registration'}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <FormControl>
                    <FormGroup>
                        <TextField error={
                            Boolean(formik.errors.email && formik.touched.email)
                        }
                                   helperText={
                                       formik.errors.email &&
                                       formik.touched.email &&
                                       String(formik.errors.email)
                                   }
                                   {...formik.getFieldProps('email')} label="Email" margin="normal"/>
                        <TextField error={
                            Boolean(formik.errors.password && formik.touched.password)
                        }
                                   helperText={
                                       formik.errors.password &&
                                       formik.touched.password &&
                                       String(formik.errors.password)
                                   }
                                   {...formik.getFieldProps('password')} type="password" label="Password"
                                   margin="normal"
                        />
                        <FormControlLabel {...formik.getFieldProps('rememberMe')} label={'Remember me'}
                                          control={<Checkbox/>}/>
                        <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
                            Sign in
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </BoxContainer>
    </div>)

}