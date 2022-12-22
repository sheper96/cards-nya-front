import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import {useAppDispatch} from "../../../../common/hooks/react-redux-hooks";
import { deleteCardTC } from "../../../Card/cards-reducer";
import s from './ModalDeleteCard.module.css'


type DeleteCardType = {
    cardId:string
    question:string
    handleClose:()=>void
}

export const ModalDeleteCard = (props: DeleteCardType) => {

    const [cardName, setCardName] = useState('Card Name')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

    const deleteCard = () => {
        dispatch(deleteCardTC(props.cardId))
        props.handleClose()
    }
    
    return (
        <div>
            
                <span>Do you really want to remove {props.question} card?
                       </span>
            <div className={s.buttons}>
            <Button
                onClick={props.handleClose}
                style={{
                    backgroundColor: "#ffffff",
                    color: '#000'
                }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Cancel</Button>
            <Button
                onClick={deleteCard}
                style={{
                    backgroundColor: "#ff3636",
                    color: '#ffff'
                }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Delete</Button>
                </div>
        </div>
    );
};
