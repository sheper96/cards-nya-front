import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BoxContainer from '../../common/components/BoxContainer/BoxContainer'
import { useAppSelector } from '../../common/hooks/react-redux-hooks'
import s from './CheckEmail.module.css'



export const CheckEmail = () => {

    const navigate = useNavigate();
    
    const forgottenEmail = useAppSelector(state=> state.auth.forgottenEmail)
    
    const backToLogin=()=>{
        navigate('/login')
    }

    return (
        <div className={s.container}>
            <BoxContainer
                title={'Check Email'} subTextForm={`We’ve sent an Email with instructions to ${forgottenEmail}`}>
                <div className={s.content}>
                <FontAwesomeIcon icon={faEnvelope} className={s.envelope}/>
                </div>
                <Button sx={{borderRadius: 7.5, mt: 3}} type={'submit'} variant={'contained'} color={'primary'} onClick={backToLogin}>
                   Back to login
                </Button>
                </BoxContainer>
    </div>
)
}


