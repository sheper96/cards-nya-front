import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import {useAppDispatch} from "../../../../common/hooks/react-redux-hooks";
import {deletePackTC} from "../../../Packs/packs-reducer";
import s from './ModalDeletePack.module.css'


type DeletePackType = {
    deletePackActive: boolean
    setDeletePackActive: (arg: boolean) => void
    packId: string
    packName: string
    handleClose:()=>void

}

export const ModalDeletePack = (props: DeletePackType) => {

    const dispatch = useAppDispatch()

    const deletePack = () => {
        dispatch(deletePackTC(props.packId))
       // props.setDeletePackActive(false)
        props.handleClose()
    }

    return (
        <div>
            <p>Do you really want to remove <b>{props.packName}</b>
                <br/> All cards will be deleted.</p>
            <div className={s.buttons}>
            <Button
                onClick={props.handleClose}
                style={{
                    backgroundColor: "#ffffff",
                    color: '#000'
                }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Cancel</Button>
            <Button
                onClick={deletePack}
                style={{
                    backgroundColor: "#ff3636",
                    color: '#ffff'
                }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Delete</Button>
                </div>
        </div>
    );
};

