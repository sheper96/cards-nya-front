import {faArrowRightFromBracket, faPen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Button, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks"
import s from './Profile.module.css'
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import React from "react";
import {initializeAppTC} from "../../app/app-reducer";
import {logOutTC, updateUserInfoTC } from "../Login/auth-reducer"
import { authAPI } from "../../app/api"
import { SvgSelector } from "../../common/components/SvgSelector/svgSelector"
import { AppRootStateType } from "../../app/store"

const Profile = () => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    
    let nameAuth=useAppSelector(state=>state.auth.userInfo?.name)
    let email=useAppSelector(state=>state.auth.userInfo?.email)
    let isLoggedIn=useAppSelector(state=>state.auth.isLoggedIn)
    const page = useAppSelector((state) => state.packs.packData.page)

    const pageCount = useAppSelector((state) => state.packs.packData.pageCount)


    const [name, setName] = useState(nameAuth)
    const [editmode, setEditMode] = useState(false)

    const setNameHandler = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.currentTarget.value)
    }
    const updateStatusHandler = () => {
        setEditMode(false)
        dispatch(updateUserInfoTC({name: name, avatar: ''}))
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <div className={s.backToCardsBlock}>

            </div>
            <BoxContainer title={'Personal Information'}>
                <div className={s.profile}>
                    <div className={s.img}>
                        <img alt='image'
                            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                    </div>
                    <div onClick={() => setEditMode(true)}>
                        {!editmode && <span className={s.name}>
                       {nameAuth}  <SvgSelector svgName={"pencil"}/></span>}
                    </div>
                    <div onBlur={updateStatusHandler}>
                        {editmode &&
                            <TextField autoFocus value={name} onChange={setNameHandler} id="standard-basic" label="Name" variant="standard" />}
                    </div>
                    <span className={s.email}>{email}</span>
                    <NavLink to={`/packs1?page=${page}&pageCount=${pageCount}`} className={s.packList}>
                        Pack List
                    </NavLink>
                    <Button
                        onClick={() => dispatch(logOutTC())}
                        style={{
                            backgroundColor: "#ffffff",
                            color: '#000'
                        }} variant="contained" size="large" sx={{borderRadius: 7.5}}><SvgSelector svgName={"logOut"}/>
                        Log Out</Button>
                </div>
            </BoxContainer>
        </div>
    )
}


export default Profile;