import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useFormik } from "formik";
import {useState} from "react";
import { font } from "../../../../app/App";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { createNewPackTC } from "../../../Packs/packs-reducer";
import s from './ModalAddNewPack.module.css'


type AddNewPactType = {
    addNewPackActive: boolean
    setNewPackActive: (arg:boolean)=>void
}

export const ModalAddNewPack = (props: AddNewPactType) => {

    const [namePack, setNamePack] = useState('Name Pack')
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

    const saveButtonHandler = () => {
        dispatch(createNewPackTC(namePack,isPrivate))
        props.setNewPackActive(false)
    }

    const setPackHameHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNamePack(e.currentTarget.value)
       
    }

    type FormikErrorType = {
        packName?: string
        privatePack?: string

    }


    const formik = useFormik({
        initialValues: {
            packName: '',
            privatePack: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.packName.length < 1) {
                errors.packName = 'enter pack name'
            }
            if (values.packName.length > 40) {
                errors.packName = 'your pack name is too long'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(createNewPackTC(values.packName,values.privatePack))
            formik.resetForm()
        }
    })


        return (
        <div>
            <ModalContainer title={'Add new Pack'} active={props.addNewPackActive} setActive={props.setNewPackActive}
                            buttonName={'Save'} buttonHandler={formik.handleSubmit}>
               {/* <TextField onChange={setPackHameHandler} id="standard-basic" label="Name Pack" variant="standard" value={namePack}/>
                <FormControlLabel control={<Checkbox defaultChecked/>} label="Private Pack"/>*/}
                <form onSubmit={formik.handleSubmit} className={s.form}>

                            <TextField variant="standard"
                                error={
                                    Boolean(formik.errors.packName && formik.touched.packName)
                                }
                                helperText={
                                    formik.errors.packName &&
                                    formik.touched.packName &&
                                    String(formik.errors.packName)
                                }
                                label="Pack Name"
                                type="text"
                                margin="normal"
                                {...formik.getFieldProps('packName')}
                                inputProps={{style: {fontFamily: font}}}
                                InputLabelProps={{style: {fontFamily: font}}}
                            />

                            <Box className={s.row}>
                                <FormControlLabel {...formik.getFieldProps('privatePack')} label={'Private Pack'}
                                                  control={<Checkbox/>}/>

                            </Box>
                            <Button className='button' type={'submit'} variant={'contained'} color={'primary'}>
                               Submit
                            </Button>

                </form>
               {/* <form className={s.form} onSubmit={formik.handleSubmit}>
                    <div className={s.inputForm}>
                        <TextField
                            placeholder={'Name pack'}
                            {...formik.getFieldProps('packName')}
                        />
                        <div className={s.error}>
                            {formik.touched.packName && formik.errors.packName && formik.errors.packName}
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <Button  onClick={()=>{}}
                                     type={'reset'}>Cancel</Button>
                        <Button  type={'submit'}>Save</Button>
                    </div>
                </form>*/}
                
            </ModalContainer>
        </div>
    );
};
