import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useFormik } from "formik";
import {ChangeEvent, useEffect, useState } from "react";
import { ModalContainer } from "../../../../common/components/ModalContainer/ModalContainer";
import { SvgSelector } from "../../../../common/components/SvgSelector/svgSelector";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { deletePackTC, editPackTC } from "../../../CardsPack/cards-pack-reducer";

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

    type FormikErrorsType = {
        newPackName?: string
    }


    const formik = useFormik({
        initialValues: {
            newPackName: props.packName
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.newPackName) {
                errors.newPackName = 'required'
            }
            if (values.newPackName.length > 40) {
                errors.newPackName = 'your pack name is too long'
            }
            if (values.newPackName === props.packName) {
                errors.newPackName = 'your new pack name is the same'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
           // props.handleClose()
            props.setEditPackActive(false)
            //dispatch(changePackTC({_id: props.packId, name: values.newPackName}))
            dispatch(editPackTC(props.packId,values.newPackName,checked))
        }
    })
    

    return (
        <div >
            <ModalContainer title={'Edit pack'} active={props.editPackActive} setActive={props.setEditPackActive} buttonName={'Save'} buttonHandler={editPack}>
                <TextField id="standard-basic" label="Name Pack" variant="standard" value={namePack} onChange={onChangeInputHandler}/>
                <FormControlLabel control={<Checkbox value={checked} onChange={onChangeCheckBoxHandler} />} label="Private Pack" />
                </ModalContainer>

        </div>
    );
};
