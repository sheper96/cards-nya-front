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
    handleClose:()=>void 
}

export const ModalAddNewCard = (props: AddNewCardType) => {

    const [cardQuestion, setCardQuestion] = useState('')
    const [cardAnswer, setCardAnswer] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

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
                errors.question = 'enter question'
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
            props.handleClose()
            formik.resetForm()
        }
    })

    return (
        <div>
                <form className={s.form} onSubmit={formik.handleSubmit}>
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
