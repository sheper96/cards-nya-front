import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useEffect, useState} from 'react';
import {Navigate, NavLink, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {ModalContainerTwo} from '../../common/components/ModalContainer/ModalContainerTwo';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import {StarRating} from '../../common/components/StarRating/StarRating';
import {useAppDispatch, useAppSelector} from '../../common/hooks/react-redux-hooks';
import {ModalAddNewCard} from '../ModalWidnows/CardsModals/ModalAddNewCard/ModalAddNewCard';
import {ModalDeleteCard} from '../ModalWidnows/CardsModals/ModalDeleteCard/ModalDeleteCard';
import {ModalEditCard} from '../ModalWidnows/CardsModals/ModalEditCard/ModalEditCard';
import s from './Card.module.css'
import {SetCardDataTC, setCardsUrlParamsAC} from './cards-reducer';
import {CardsTableRows} from './CardTabeRows/CardsTableRows';

export const Card = () => {


    const navigate = useNavigate()

    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const params = useAppSelector((state) => state.cards.params);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const UserCardId = useAppSelector((state) => state.cards.cardsData.packUserId);
    const isAuthor = userId === UserCardId
    const dispatch = useAppDispatch()

    const [addNewCardActive, setAddNewCardActive] = useState(false)

    const [cardId, setCardId] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const [searchParams, setSearchParams] = useSearchParams()

    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const cardPackIdURL = searchParams.get('cardPack_id') ? searchParams.get('cardPack_id') + '' : ''

    const cardsUrlParams = ({
        page: pageURL,
        pageCount: pageCountURL,
        cardPackId: cardPackIdURL,

    })


    useEffect(() => {
        dispatch(setCardsUrlParamsAC({...cardsUrlParams}))
        dispatch(SetCardDataTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    let buttonTitle
    let buttonHandler = () => {
    }


    const learnHandler = () => {
        navigate(`/learn/${cardPackIdURL}`)
    }

    isAuthor ? buttonTitle = "Add New Card" : buttonTitle = "Learn Card"
    isAuthor ? buttonHandler = () => {
        setOpen(true)
    } : buttonHandler = () => {
        alert("Learn Card")
    }

    return (
        <div>
            <PackBoxContainer title={"Pack List"} buttonTitle={buttonTitle} buttonCallback={buttonHandler}>
                <div className={s.learnButton}>
                    <Button
                        onClick={learnHandler}
                        variant="contained" size="large" sx={{borderRadius: 7.5, mt: 4}}>Learn</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="right">Answer</TableCell>
                                <TableCell align="right">Last Updated</TableCell>
                                <TableCell align="right">Grade</TableCell>
                                {isAuthor && <TableCell align="right">Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards && cards.map((c) => (
                                <CardsTableRows key={c._id} cards={c}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PackBoxContainer>

            <ModalContainerTwo open={open} handleClose={handleClose} title={'add new card'}>
                <ModalAddNewCard handleClose={handleClose} addNewCardActive={addNewCardActive}
                                 setNewPackActive={setAddNewCardActive} packId={cardsUrlParams.cardPackId}/>
            </ModalContainerTwo>
        </div>
    );
};

