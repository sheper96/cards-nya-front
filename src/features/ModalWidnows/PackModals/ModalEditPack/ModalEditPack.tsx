import {Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useFormik } from "formik";
import {ChangeEvent, useEffect, useState } from "react";
import { font } from "../../../../app/App";
import { ModalContainer } from "../../../../common/components/ModalContainer/ModalContainer";
import { SvgSelector } from "../../../../common/components/SvgSelector/svgSelector";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { editPackTC } from "../../../Packs/packs-reducer";
import s from './ModalEditPack.module.css'


type EditPackType ={
    editPackActive:boolean
    setEditPackActive:(arg:boolean)=>void
    packId : string
    packName:string
}

export const ModalEditPack = (props:EditPackType) => {

    const dispatch = useAppDispatch()


    const [namePack,setNamePack] = useState(props.packName)
    const [checked,setChecked] = useState(false)


    const onChangeInputHandler = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setNamePack(e.currentTarget.value)
    }

    const onChangeCheckBoxHandler = () =>{
        setChecked(!checked)
    }
    
    const editPack = ()=>{
        dispatch(editPackTC(props.packId,namePack,checked))
        props.setEditPackActive(false)
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
            dispatch(editPackTC(props.packId,values.packName,values.privatePack))
            formik.resetForm()
        }
    })
    

    return (
        <div >
            <ModalContainer title={'Edit pack'} active={props.editPackActive} setActive={props.setEditPackActive} buttonName={'Save'} buttonHandler={editPack}>
               {/* <TextField id="standard-basic" label="Name Pack" variant="standard" value={namePack} onChange={onChangeInputHandler}/>
                <FormControlLabel control={<Checkbox value={checked} onChange={onChangeCheckBoxHandler} />} label="Private Pack" />*/}
                <form onSubmit={formik.handleSubmit} className={s.form}>

                    <TextField variant="standard"
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

                    <Box className={s.row}>
                        <FormControlLabel {...formik.getFieldProps('privatePack')} label={'Private Pack'}
                                          control={<Checkbox/>}/>

                    </Box>
                    <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
                        Submit
                    </Button>

                </form>
                </ModalContainer>

        </div>
    );
};
