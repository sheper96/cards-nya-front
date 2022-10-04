import React from 'react'
import {Box, Button} from "@mui/material"
import s from './ModalContainer.module.css'
export type BoxContainerPropsType = {
    children: React.ReactNode,
    title: string
    buttonName?: string
    active:boolean
    setActive:any
    buttonHandler?: () => void
    subLinkUrlText?: string
}
const BoxContainerStyle={
    py: '35px',
    px: '33px',
    bgcolor: '#fff',
    width: '413px',
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    display:"flex",
    flexDirection: 'column',
    '& .MuiTextField-root': {my: 1.5,font:'Montserrat'}
}

export const ModalContainer = (props: BoxContainerPropsType) => {
    console.log(props.active)
    return (
        <div className={props.active ? `${s.box} ${s.active}` :` ${s.box}`} onClick={()=>props.setActive(false)} >
        <Box sx={BoxContainerStyle} className={props.active ? `${s.content} ${s.active}` : `${s.content}` } onClick={(e) => e.stopPropagation()}>
            <h2 className={s.title}>{props.title}</h2>
            <div className={s.children}>
            {props.children}
            </div>
            <div className={s.buttonGroup}>
                <Button
                    onClick={()=>alert("cancel")}
                    style={{
                        backgroundColor: "#ffffff",
                        color: '#000'
                    }} variant="contained" size="large" sx={{borderRadius: 7.5}}>Cancel</Button>
                {props.buttonName === "Delete" ? <Button
                    onClick={props.buttonHandler}
                    style={{
                        backgroundColor: "#ff3636",
                        color: '#ffff'
                    }} variant="contained" size="large" sx={{borderRadius: 7.5}}>{props.buttonName}</Button> :
                    <Button onClick={props.buttonHandler} variant="contained" size="large" sx={{borderRadius: 7.5}}>{props.buttonName}</Button>
                }
               
            </div>
        </Box>
        </div>
    );
};

