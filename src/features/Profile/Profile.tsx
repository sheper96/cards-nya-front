import { faJs } from "@fortawesome/free-brands-svg-icons"
import {faArrowRightFromBracket, faHouseLaptop, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"
import {connect} from "react-redux"
import BoxContainer from "../../common/components/BoxContainer/BoxContainer"
import s from './Profile.module.css'


const Profile = (props: any) => {
    debugger
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className={s.container}>
            <BoxContainer title={'Personal Information'}>
                <div className={s.profile}>
                    <div className={s.img}>
                        <img src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"/>
                    </div>
                    <span className={s.login}>
                        Ivan  <FontAwesomeIcon icon={faPen} /></span>
                    <span className={s.email}>1234@gmail.com</span>
                   {/* <button className={s.logOut}>log out</button>*/}
                    <Button    style={{
                        backgroundColor: "#ffffff",
                        color: '#000'
                    }} variant="contained" size="large"  sx={{ borderRadius: 7.5 }}> <FontAwesomeIcon icon={faArrowRightFromBracket} />Log Out</Button>

                  
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