import {Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { ModalContainer } from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { deletePackTC } from "../../../Packs/packs-reducer";


type DeletePackType ={
    deletePackActive:boolean
    setDeletePackActive:(arg:boolean)=>void
    packId:string
    packName:string

}

export const ModalDeletePack = (props:DeletePackType) => {

    console.log(props.packId)

    const dispatch = useAppDispatch()

    const deletePack = () =>{
        dispatch(deletePackTC(props.packId))
        props.setDeletePackActive(false)
    }
   

    return (
        <div >
            <ModalContainer title={'Delete Pack'} active={props.deletePackActive} setActive={props.setDeletePackActive} buttonName={'Delete'} buttonHandler={deletePack} >
                    <p>Do you really want to remove <b>{props.packName}</b>
                       <br/> All cards will be deleted.</p>
                </ModalContainer>
        </div>
    );
};

