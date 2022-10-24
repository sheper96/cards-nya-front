import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";
import {ModalContainer} from "../../../../common/components/ModalContainer/ModalContainer";
import { useAppDispatch } from "../../../../common/hooks/react-redux-hooks";
import { createNewPackTC } from "../../../CardsPack/cards-pack-reducer";

type AddNewPactType = {
    addNewPackActive: boolean
    setNewPackActive: any
}

export const ModalAddNewCard = (props: AddNewPactType) => {

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

    return (
        <div>
            <ModalContainer title={'Add new Pack'} active={props.addNewPackActive} setActive={props.setNewPackActive}
                            buttonName={'Save'} buttonHandler={() =>saveButtonHandler() }>
                <TextField onChange={setPackHameHandler} id="standard-basic" label="Name Pack" variant="standard" value={namePack}/>
                <FormControlLabel control={<Checkbox defaultChecked/>} label="Private Pack"/>
            </ModalContainer>
        </div>
    );
};
