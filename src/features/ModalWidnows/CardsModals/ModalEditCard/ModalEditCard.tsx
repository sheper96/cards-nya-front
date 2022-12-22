import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useFormik } from "formik";
import {useState} from "react";
import { font } from "../../../../app/App";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { updateCardTC } from "../../../Card/cards-reducer";
import s from './ModalEditCard.module.css'


type AddNewCardType = {
    cardId:string
    question:string
    answer:string
    handleClose:()=>void

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
            props.handleClose()
        }
    })

    return (
        <div>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <TextField variant="standard" fullWidth
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
                    <TextField variant="standard" fullWidth
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
                    <div className={s.buttons}>
                    <Button
                        onClick={props.handleClose}
                        style={{
                            backgroundColor: "#ffffff",
                            color: '#000'
                        }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Cancel</Button>
                    <Button  variant="contained" type={'submit'} size="large" sx={{borderRadius: 7.5}}>Save</Button>
                        </div>
                    </form>
        </div>
    );
};
