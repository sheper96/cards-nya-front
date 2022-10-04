import {Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { ModalContainer } from "../../../common/components/ModalContainer/ModalContainer";
type AddNewPactType ={
    deletePackActive:boolean
    setDeletePackActive:any

}

export const ModalDeletePack = (props:AddNewPactType) => {
    

    const deletePack = () => {
        alert('Delete')
    }

    return (
        <div >
            <ModalContainer title={'Delete Pack'} active={props.deletePackActive} setActive={props.setDeletePackActive} buttonName={'Delete'} buttonHandler={()=>deletePack()}>
                    <p>Do you really want to remove <b>Pack Name? </b>
                       <br/> All cards will be deleted.</p>
                </ModalContainer>
        </div>
    );
};
