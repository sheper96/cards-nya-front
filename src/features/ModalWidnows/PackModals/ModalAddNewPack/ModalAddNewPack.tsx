import {Box, Button, Checkbox, FormControlLabel, Modal, TextField} from "@mui/material";
import { useFormik } from "formik";
import {useEffect, useState} from "react";
import { font } from "../../../../app/App";
import {ModalContainer, ModalContainers} from "../../../../common/components/ModalContainer/ModalContainer";
import { ModalContainerTwo } from "../../../../common/components/ModalContainer/ModalContainerTwo";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { createNewPackTC } from "../../../Packs/packs-reducer";
import s from './ModalAddNewPack.module.css'


type AddNewPactType = {
    addNewPackActive?: boolean
    setNewPackActive?: (arg:boolean)=>void
    handleClose:()=>void
}

export const ModalAddNewPack = (props: AddNewPactType) => {

    const [namePack, setNamePack] = useState('Name Pack')
    const [isPrivate, setIsPrivate] = useState(false)


    const dispatch = useAppDispatch()

    const saveButtonHandler = () => {
        dispatch(createNewPackTC(namePack,isPrivate))
        props.handleClose()
    }

    const setPackHameHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNamePack(e.currentTarget.value)
       
    }

    type FormikErrorType = {
        packName?: string
        privatePack?: string

    }


    const formik = useFormik({
        initialValues: {
            packName: '',
            privatePack: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.packName.length < 1) {
                errors.packName = 'enter pack name'
            }
            if (values.packName.length > 40) {
                errors.packName = 'your pack name is too long'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(createNewPackTC(values.packName,values.privatePack))
            formik.resetForm()
            props.handleClose()
        }
    })


        return (
                <form  className={s.form} onSubmit={formik.handleSubmit}>
                   
                            <TextField variant="standard" fullWidth
                                       error={
                                    Boolean(formik.errors.packName && formik.touched.packName)
                                }
                                helperText={
                                    formik.errors.packName &&
                                    formik.touched.packName &&
                                    String(formik.errors.packName)
                                }
                                label="Pack Name"
                                type="text"
                                margin="normal"
                                {...formik.getFieldProps('packName')}
                                inputProps={{style: {fontFamily: font}}}
                                InputLabelProps={{style: {fontFamily: font}}}
                            />
                                <FormControlLabel {...formik.getFieldProps('privatePack')} label={'Private Pack'}
                                                  control={<Checkbox/>}/>
                        <div className={s.buttons}>
                        <Button
                            onClick={props.handleClose}
                            style={{
                                backgroundColor: "#ffffff",
                                color: '#000'
                            }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Cancel</Button>
                            <Button  variant="contained" type={'submit'} size="large" sx={{borderRadius: 7.5}}>Save</Button>
                        </div>
                </form>
    );
};
