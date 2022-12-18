import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useFormik } from "formik";
import {useState} from "react";
import { font } from "../../../../app/App";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks/react-redux-hooks";
import {addNewCardTC, SetCardDataTC } from "../../../Card/cards-reducer";
import s from './ModalAddNewCard.module.css'


type AddNewCardType = {
    addNewCardActive: boolean
    setNewPackActive: (arg:boolean)=>void
    packId: string
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

    type FormikErrorType = {
        question?: string
        answer?: string

    }


    const formik = useFormik({
        initialValues: {
            question: '',
            answer:''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.question.length < 1) {
                errors.question = 'pack name'
            }
            if (values.question.length > 40) {
                errors.question = 'pack name is too long'
            }
            if (values.answer.length < 1) {
                errors.answer = 'enter answer'
            }
            if (values.answer.length > 40) {
                errors.answer = 'answer is too long'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(addNewCardTC(props.packId,values.question,values.answer))
            formik.resetForm()
        }
    })

    return (
        <div>
            <ModalContainer title={'Add new Card'} active={props.addNewCardActive} setActive={props.setNewPackActive}
                            buttonName={'Add New Card'} buttonHandler={addNewCard}>
               {/* <TextField onChange={questionHandler}  label="Question" variant="standard" value={cardQuestion}/>
                <TextField onChange={answerHandler}  label="Answer" variant="standard" value={cardAnswer}/>*/}
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <TextField variant="standard"
                               error={
                                   Boolean(formik.errors.question && formik.touched.question)
                               }
                               helperText={
                                   formik.errors.question &&
                                   formik.touched.question &&
                                   String(formik.errors.question)
                               }
                               label="Qustion"
                               type="text"
                               margin="normal"
                               {...formik.getFieldProps('question')}
                               inputProps={{style: {fontFamily: font}}}
                               InputLabelProps={{style: {fontFamily: font}}}
                    />
                    <TextField variant="standard"
                               error={
                                   Boolean(formik.errors.answer && formik.touched.answer)
                               }
                               helperText={
                                   formik.errors.answer &&
                                   formik.touched.answer &&
                                   String(formik.errors.answer)
                               }
                               label="Answer"
                               type="text"
                               margin="normal"
                               {...formik.getFieldProps('answer')}
                               inputProps={{style: {fontFamily: font}}}
                               InputLabelProps={{style: {fontFamily: font}}}
                    />

                    <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
                        Submit
                    </Button>

                </form>
            </ModalContainer>
        </div>
    );
};
