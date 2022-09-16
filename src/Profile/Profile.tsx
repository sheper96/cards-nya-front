
const Profile=()=> {


        return(
            <div></div>
        )


    }




const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,
        statusValue: state.profilePage.statusValue,
        isAuth: state.auth.isAuth
    }
}
/*
let AuthRedirectComponent = WithAuthRedirect(ProfileAPIComponent)


compose(withRouter(AuthRedirectComponent),connect(mapStateToProps, {
    setUserProfile: setUserProfile,
    getUserProfile: getUserProfileThunkCreator
}))(WithURrlDataContainerComponent)

let WithURrlDataContainerComponent = withRouter(AuthRedirectComponent)*/

export default compose<React.ComponentType>(connect(mapStateToProps, {
    // setUserProfile: setUserProfile,
    getUserProfile: getUserProfileThunkCreator,
    getUserStatus : getUserStatusThunkCreator,
    updateStatus : updateStatusThunkCreator,
    setProfileStatus,
    addPostFormik:addPostFormikActionCreator
}),withRouter,WithAuthRedirect)(ProfileAPIComponent);