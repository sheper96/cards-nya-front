import {Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { ModalContainer } from "../../../common/components/ModalContainer/ModalContainer";
type AddNewPactType ={
    addNewPackActive:boolean
    setNewPackActive:any
}

export const ModalAddNewPack = (props:AddNewPactType) => {
    
    const [namePack,setNamePack] = useState('Name Pack')

    const save = () => {
        alert('save')
    }

    return (
        <div >
            <ModalContainer title={'Add new Pack'} active={props.addNewPackActive} setActive={props.setNewPackActive} buttonName={'Save'} buttonHandler={()=>save()}>
                <TextField id="standard-basic" label="Name Pack" variant="standard" value={namePack} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Private Pack" />
                </ModalContainer>
        </div>
    );
};
