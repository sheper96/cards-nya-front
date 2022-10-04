import {Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { ModalContainer } from "../../../common/components/ModalContainer/ModalContainer";
type AddNewPactType ={
    editPackActive:boolean
    setEditPackActive:any
}

export const ModalEditPack = (props:AddNewPactType) => {
    
    const [namePack,setNamePack] = useState('Name Pack')

    const save = () => {
        alert('save')
    }

    return (
        <div >
            <ModalContainer title={'Edit pack'} active={props.editPackActive} setActive={props.setEditPackActive} buttonName={'Save'} buttonHandler={()=>save()}>
                <TextField id="standard-basic" label="Name Pack" variant="standard" value={namePack} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Private Pack" />
                </ModalContainer>
        </div>
    );
};
