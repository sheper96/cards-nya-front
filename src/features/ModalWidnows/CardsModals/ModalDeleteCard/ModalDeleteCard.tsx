import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import {useAppDispatch} from "../../../../common/hooks/react-redux-hooks";
import {createNewPackTC, deleteCardTC} from "../../../CardsPack/cards-pack-reducer";

type DeleteCardType = {
    deleteCardActive: boolean
    setDeleteCardActive: (arg:boolean)=>void
    cardId:string
}

export const ModalDeleteCard = (props: DeleteCardType) => {

    const [cardName, setCardName] = useState('Card Name')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

    const deleteCard = () => {
        dispatch(deleteCardTC(props.cardId))

    }


    return (
        <div>
            <ModalContainer title={'Delete Card'} active={props.deleteCardActive} setActive={props.setDeleteCardActive}
                            buttonName={'Delete'} buttonHandler={deleteCard}>
                <span>Do you really want to remove {cardName}?
                        All cards will be deleted.</span>
            </ModalContainer>
        </div>
    );
};
