import {Button, TextField} from "@mui/material"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks"
import s from './Profile.module.css'
import {Navigate, NavLink} from "react-router-dom";
import React, {ChangeEvent, useRef, useState } from "react";
import {logOutTC, updateUserInfoAvatarTC, updateUserInfoTC } from "../Login/auth-reducer"
import { SvgSelector } from "../../common/components/SvgSelector/svgSelector"
import avatar from '../../assets/images/avatar.jpg'
import { convertFileToBase64 } from "../../common/utils/convertBase64";
import { errorHandlerUtil } from "../../common/utils/errors-utils";


const Profile = () => {
    
    const dispatch = useAppDispatch()
    
    let nameAuth=useAppSelector(state=>state.auth.userInfo?.name)
    let email=useAppSelector(state=>state.auth.userInfo?.email)
    let isLoggedIn=useAppSelector(state=>state.auth.isLoggedIn)
    const page = useAppSelector((state) => state.packs.packData.page)
    const profile = useAppSelector((state) => state.auth.userInfo)    
    const pageCount = useAppSelector((state) => state.packs.packData.pageCount)


    const [name, setName] = useState(nameAuth)
    const [editmode, setEditMode] = useState(false)

    const setNameHandler = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.currentTarget.value)
    }
    const updateStatusHandler = () => {
        setEditMode(false)
        dispatch(updateUserInfoAvatarTC({name: name}))
    }

    const inputRef = useRef<HTMLInputElement>(null)
    const minFileSize = 40000;
    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < minFileSize) {
                convertFileToBase64(file, (file64: string) => {
                    debugger
                    dispatch(updateUserInfoAvatarTC({avatar: file64}));
                });
            } else {
                return errorHandlerUtil(e, dispatch)
            }
        }
    }

    const finalUserAvatar = profile?.avatar ? profile.avatar : avatar

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <div className={s.backToCardsBlock}>
            </div>
            <BoxContainer title={'Personal Information'}>
                <div className={s.profile}>
                    <div className={s.avatarContainer}>
                        <img className={s.avatar}
                             src={finalUserAvatar}
                             alt={'user-avatar'}
                        />
                        <div
                            className={s.photoButton}
                            onClick={selectFileHandler}
                        >
                            <SvgSelector svgName={'photo'}/>
                        </div>
                        <input style={{display: 'none'}}
                               ref={inputRef}
                               type="file"
                               onChange={uploadHandler}
                        />
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

