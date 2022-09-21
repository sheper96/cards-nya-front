import BoxContainer from "../../common/components/BoxContainer/BoxContainer";
import {useFormik} from "formik";
import s from './NewPassword.module.css'
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";

type FormikErrorType = {
    password?: string
}
export const NewPassword = () => {
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.password.length <= 7) {
                errors.password = 'Password mast be 8 symbol'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm();
        }

    })
    return (
        <div className={s.container}>
            <BoxContainer title={'Create new password'}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <TextField className={s.field} error={
                        Boolean(formik.errors.password && formik.touched.password)
                    }
                               helperText={
                                   formik.errors.password &&
                                   formik.touched.password &&
                                   String(formik.errors.password)
                               }
                               placeholder='password'
                               {...formik.getFieldProps('password')} type="password" label="Password"
                               margin="normal"
                    />
                    <span>Create new password and we will send you further instructions to email</span>
                    <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
                        Create new password
                    </Button>
                </form>

            </BoxContainer>
        </div>
    )
}