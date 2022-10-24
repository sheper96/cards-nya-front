import {Checkbox, FormControlLabel, TextField } from "@mui/material";
import {ChangeEvent, useState } from "react";
import { ModalContainer } from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { deletePackTC, editPackTC } from "../../../CardsPack/cards-pack-reducer";
type AddNewPactType ={
    editPackActive:boolean
    setEditPackActive:any
    packId : string
}

export const ModalEditPack = (props:AddNewPactType) => {

    const dispatch = useAppDispatch()


    const [namePack,setNamePack] = useState('Name Pack')
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
 
    

    const save = () => {
        alert('save')
    }

    return (
        <div >
            <ModalContainer title={'Edit pack'} active={props.editPackActive} setActive={props.setEditPackActive} buttonName={'Save'} buttonHandler={editPack}>
                <TextField id="standard-basic" label="Name Pack" variant="standard" value={namePack} onChange={onChangeInputHandler}/>
                <FormControlLabel control={<Checkbox value={checked} onChange={onChangeCheckBoxHandler} />} label="Private Pack" />
                </ModalContainer>
        </div>
    );
};
