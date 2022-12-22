import {Box, Button, Fade, Modal } from "@mui/material";
import { ReactNode } from "react";
import s from './ModalContainer.module.css'


const BoxContainerStyle={
   /* py: '35px',
    px: '33px',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fff',
    width: '413px',
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    display:"flex",
    flexDirection: 'column',
    '& .MuiTextField-root': {my: 1.5,font:'Montserrat'}*/
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 413,
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    bgcolor: 'background.paper',
    border: 'cancel',
    borderRadius: '2px',
    py: '35px',
    px: '33px',
}

type BasicModalType = {
    children: ReactNode
    open: boolean
    handleClose: () => void
    title:string
}

export const ModalContainerTwo = (props: BasicModalType) => {
    return (
        <Modal open={props.open}
               onClose={props.handleClose}>
            <Fade in={props.open}>
                <Box sx={BoxContainerStyle} >
                    <h2 className={s.title}>{props.title}</h2>
                    <div >
                        {props.children}
                    </div>
                </Box>
                </Fade>
        </Modal>
    );
};

