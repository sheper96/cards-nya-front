import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { createNewPackTC, updateCardTC } from "../../../CardsPack/cards-pack-reducer";

type AddNewCardType = {
    editCardActive: boolean
    setEditCardActive: any
    cardId:string

}

export const ModalEditCard = (props: AddNewCardType) => {

    const [cardQuestion, setCardQuestion] = useState('')
    const [cardAnswer, setCardAnswer] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

    const editCard = () => {
        dispatch(updateCardTC(props.cardId,cardQuestion,cardAnswer))
        setCardQuestion('')
        setCardAnswer('')
        /*props.setEditCardActive(false)*/
        /* dispatch(SetCardDataTC(props.packId))*/
        // разлогинивает апп
    }

    const questionHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCardQuestion(e.currentTarget.value)
    }
    const answerHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCardAnswer(e.currentTarget.value)
    }



    return (
        <div>
            <ModalContainer title={'Edit Card'} active={props.editCardActive} setActive={props.setEditCardActive}
                            buttonName={'Save'} buttonHandler={editCard}>
                <TextField onChange={questionHandler}  label="Question" variant="standard" value={cardQuestion}/>
                <TextField onChange={answerHandler}  label="Answer" variant="standard" value={cardAnswer}/>
            </ModalContainer>
        </div>
    );
};
