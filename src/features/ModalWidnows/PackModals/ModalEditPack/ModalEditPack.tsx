import {Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";
import {ChangeEvent, useEffect, useState} from "react";
import {font} from "../../../../app/App";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import {SvgSelector} from "../../../../common/components/SvgSelector/svgSelector";
import {useAppDispatch} from "../../../../common/hooks/react-redux-hooks";
import {editPackTC} from "../../../Packs/packs-reducer";
import s from './ModalEditPack.module.css'


type EditPackType = {
    editPackActive: boolean
    setEditPackActive: (arg: boolean) => void
    packId: string
    packName: string
    handleClose:()=>void
}

export const ModalEditPack = (props: EditPackType) => {

    const dispatch = useAppDispatch()


    const [namePack, setNamePack] = useState(props.packName)
    const [checked, setChecked] = useState(false)

    type FormikErrorType = {
        packName?: string
        privatePack?: string

    }

    const formik = useFormik({
        initialValues: {
            packName: props.packName,
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
            if (values.packName === props.packName) {
                errors.packName = 'your pack name is the same'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(editPackTC(props.packId, values.packName, values.privatePack))
            props.handleClose()
            formik.resetForm()

        }
    })


    return (
        <div>
            <Box className={s.row}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <TextField variant="standard" fullWidth
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
                    
                        <FormControlLabel {...formik.getFieldProps('privatePack')} label={'Private Pack'}
                                          control={<Checkbox/>}/>
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
            </Box>
        </div>
    );
};
