import {faJs} from "@fortawesome/free-brands-svg-icons"
import {faArrowRightFromBracket, faHouseLaptop, faPen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Button} from "@mui/material"
import {useState} from "react"
import {connect} from "react-redux"
import { authAPI } from "../../app/api"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import {useAppDispatch} from "../../common/hooks/react-redux-hooks"
import {authThunkCreator, registersssssTC, updateNameTC} from "./auth-reducer"
import s from './Profile.module.css'


const Profile = (props: any) => {

    const dispatch = useAppDispatch()

    const [name, setName] = useState("val")
    const [editmode, setEditMode] = useState(false)

    const setNameHandler = (e: any) => {
        setName(e.currentTarget.value)
    }
    const updateStatusHandler = ()=>{
        setEditMode(false)
        dispatch(updateNameTC(name))

    }

    return (
        <div className={s.container}>
            <BoxContainer title={'Personal Information'}>
                <div className={s.profile}>
                    <div className={s.img}>
                        <img
                            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                    </div>
                    <div onDoubleClick={()=>setEditMode(true)}>
                        {!editmode && <span className={s.login} >
                       {name} <FontAwesomeIcon icon={faPen}/></span>}
                    </div> 
                    <div onBlur={updateStatusHandler}>
                        {editmode &&  <input autoFocus type="text" value={name} onChange={setNameHandler} />}
                    </div>

                     
                        <span className={s.email}>1234@gmail.com</span>
                       
                    
                    
                    <Button style={{
                        backgroundColor: "#ffffff",
                        color: '#000'
                    }} variant="contained" size="large" sx={{borderRadius: 7.5}}> <FontAwesomeIcon
                        icon={faArrowRightFromBracket}/>Log Out</Button>

                    <Button onClick={() => dispatch(authThunkCreator())}>Test</Button>
                    <Button onClick={()=>{
                        authAPI.login()
                    }}>login</Button>
                </div>
            </BoxContainer>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,

    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);