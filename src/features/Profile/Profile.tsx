import {faJs} from "@fortawesome/free-brands-svg-icons"
import {faArrowRightFromBracket, faHouseLaptop, faPen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Button, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import {connect, useSelector} from "react-redux"
import {authAPI} from "../../app/api"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import {useAppDispatch} from "../../common/hooks/react-redux-hooks"
import {authTC, logOutTC,  updateNameTC} from "./auth-reducer"
import s from './Profile.module.css'

import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import React from "react";

const Profile = (props: any) => {

    const dispatch = useAppDispatch()

    const nameAuth = useSelector((state: any) => state.auth.name)
    const email = useSelector((state: any) => state.auth.email)

    const [name, setName] = useState(props.nameAuth)
    const [editmode, setEditMode] = useState(false)

    const setNameHandler = (e: any) => {
        setName(e.currentTarget.value)
    }
    const updateStatusHandler = () => {
        setEditMode(false)
        dispatch(updateNameTC(name))

    }

    useEffect(() => {
        dispatch(authTC())
        setName(nameAuth)
    }, [])

    return (
        <div className={s.container}>
            <BoxContainer title={'Personal Information'}>
                <div className={s.profile}>
                    <div className={s.img}>
                        <img
                            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                    </div>
                    <div onDoubleClick={() => setEditMode(true)}>
                        {!editmode && <span className={s.name}>
                       {nameAuth} <FontAwesomeIcon icon={faPen}/></span>}
                    </div>
                    <div onBlur={updateStatusHandler}>
                        {editmode &&
                            <TextField autoFocus value={name} onChange={setNameHandler} id="standard-basic" label="Name" variant="standard" />}
                    </div>
                    <span className={s.email}>{email}</span>
                    <Button
                        onClick={() => dispatch(logOutTC())}
                        style={{
                            backgroundColor: "#ffffff",
                            color: '#000'
                        }} variant="contained" size="large" sx={{borderRadius: 7.5}}> <FontAwesomeIcon
                        icon={faArrowRightFromBracket}/>Log Out</Button>
                </div>
            </BoxContainer>
        </div>
    )
}
/*const Profile=(props:any)=> {
    const dispatch=useAppDispatch()
    const isLoggedIn=useSelector<AppRootStateType,boolean>(state=>state.app.isInitialized)
    if (isLoggedIn===false){
        return <Navigate to={'/login'}/>
    }
        return(
            <div>
                <p>{props.profile}</p>
                <button onClick={()=>dispatch(logOutTC())}> logout</button>
            </div>
        )
}*/

export default Profile;