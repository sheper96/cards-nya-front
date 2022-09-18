import React from 'react'
import {Box} from "@mui/material"
import s from './BoxContainer.module.css'
export type BoxContainerPropsType = {
    children: React.ReactNode,
    title: string
    subTextForm?: string
    subLinkUrl?: string
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

const BoxContainer = (props: BoxContainerPropsType) => {
    return (
        <Box sx={BoxContainerStyle}>
            <h2 className={s.title}>{props.title}</h2>
            {props.children}
            {props.subTextForm && (<span className={s.text}>{props.subTextForm}</span> )}
            {props.subLinkUrlText && props.subLinkUrl && (<a className={s.link} href={props.subLinkUrl}>{props.subLinkUrlText}</a> )}
        </Box>
    );
};

export default BoxContainer;