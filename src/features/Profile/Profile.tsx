import { connect } from "react-redux"

const Profile=(props:any)=> {
        return(
            <div>
                <p>{props.profile}</p>
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