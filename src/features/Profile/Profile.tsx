import {connect, useSelector} from "react-redux"
import {useAppDispatch} from "../../common/hooks/react-redux-hooks";
import {AppRootStateType} from "../../app/store";
import {logOutTC} from "../Login/login-reducer";
import {Navigate} from "react-router-dom";
import React from "react";

const Profile=(props:any)=> {
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
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,

    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
      

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);