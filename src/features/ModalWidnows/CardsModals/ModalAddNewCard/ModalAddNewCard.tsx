import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/react-redux-hooks";
import {addNewCardTC, createNewPackTC, SetCardDataTC } from "../../../CardsPack/cards-pack-reducer";

type AddNewCardType = {
    addNewCardActive: boolean
    setNewPackActive: (arg:boolean)=>void
    packId: string | undefined
}

export const ModalAddNewCard = (props: AddNewCardType) => {

    const [cardQuestion, setCardQuestion] = useState('')
    const [cardAnswer, setCardAnswer] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

    const addNewCard = () => {
        dispatch(addNewCardTC(props.packId,cardQuestion,cardAnswer))
        setCardQuestion('')
        setCardAnswer('')
        props.setNewPackActive(false)
     
    }

    const questionHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCardQuestion(e.currentTarget.value)
    }
    const answerHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCardAnswer(e.currentTarget.value)
    }

    return (
        <div>
            <ModalContainer title={'Add new Card'} active={props.addNewCardActive} setActive={props.setNewPackActive}
                            buttonName={'Add New Card'} buttonHandler={addNewCard}>
                <TextField onChange={questionHandler}  label="Question" variant="standard" value={cardQuestion}/>
                <TextField onChange={answerHandler}  label="Answer" variant="standard" value={cardAnswer}/>
            </ModalContainer>
        </div>
    );
};
