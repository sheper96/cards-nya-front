import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useFormik } from "formik";
import {useState} from "react";
import { font } from "../../../../app/App";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { updateCardTC } from "../../../Card/cards-reducer";
import s from './ModalEditCard.module.css'


type AddNewCardType = {
    editCardActive: boolean
    setEditCardActive: (arg:boolean)=>void
    cardId:string
    question:string
    answer:string

}

export const ModalEditCard = (props: AddNewCardType) => {

    const [isPrivate, setIsPrivate] = useState(false)
    const dispatch = useAppDispatch()

    type FormikErrorType = {
        question?: string
        answer?: string

    }

    const formik = useFormik({
        initialValues: {
            question: props.question,
            answer: props.answer
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.question.length < 1) {
                errors.question = 'enter question'
            }
            if (values.question.length > 40) {
                errors.question = 'question is too long'
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
            dispatch(updateCardTC(props.cardId,values.question,values.answer))
            formik.resetForm()
            props.setEditCardActive(false)
        }
    })

    return (
        <div>
            <ModalContainer title={'Edit Card'} active={props.editCardActive} setActive={props.setEditCardActive}
                            buttonName={'Save'} buttonHandler={formik.handleSubmit}>
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
