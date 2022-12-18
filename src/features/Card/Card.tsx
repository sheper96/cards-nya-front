import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import {Navigate, NavLink, useParams, useSearchParams } from 'react-router-dom';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import { StarRating } from '../../common/components/StarRating/StarRating';
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks';
import { ModalAddNewCard } from '../ModalWidnows/CardsModals/ModalAddNewCard/ModalAddNewCard';
import { ModalDeleteCard } from '../ModalWidnows/CardsModals/ModalDeleteCard/ModalDeleteCard';
import { ModalEditCard } from '../ModalWidnows/CardsModals/ModalEditCard/ModalEditCard';
import s from './Card.module.css'
import { SetCardDataTC, setCardsUrlParamsAC } from './cards-reducer';

export const Card = () => {


    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const params = useAppSelector((state) => state.cards.params);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const UserCardId = useAppSelector((state) => state.cards.cardsData.packUserId);
    const isAuthor = userId === UserCardId
    const dispatch = useAppDispatch()

    const [addNewCardActive, setAddNewCardActive] = useState(false)
    const [deleteCardActive, setDeleteCardActive] = useState(false)
    const [editCardActive, setEditCardActive] = useState(false)
    const [cardId, setCardId] = useState('')
    const [question,setQuestion] = useState('')
    const [answer,setAnswer] = useState('')

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



    const editModal = (currentCardId:string,question:string, answer:string) =>{
        setEditCardActive(true)
        setCardId(currentCardId)
        setQuestion(question)
        setAnswer(answer)
    }
    const deleteModal = (currentCardId:string) =>{
        setDeleteCardActive(true)
        setCardId(currentCardId)
    }

    let buttonTitle
    let buttonHandler = ()=>{}

    /*const learnCards = () => {
        navigate(`/learn/${pack ? pack._id : cardsPack_idURL}`)
    }*/
    
    isAuthor ? buttonTitle = "Add New Card" : buttonTitle = "Learn Card"
    isAuthor ? buttonHandler = ()=>{setAddNewCardActive(true)} : buttonHandler = ()=>{alert("Learn Card")}

    return (
        <div>
            <PackBoxContainer title={"Pack List"}  buttonTitle = {buttonTitle} buttonCallback={buttonHandler}>
                <NavLink to={`/learn/${cardPackIdURL}`}
                > learn</NavLink>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="right">Answer</TableCell>
                                <TableCell align="right">Last Updated</TableCell>
                                <TableCell align="right">Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards && cards.map((c: any) => (
                                <TableRow
                                    key={c._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row" >
                                        <NavLink to={`/learn/${c._id}`}
                                        > {c.question}</NavLink>
                                    </TableCell>
                                    <TableCell align="right" >{c.answer}</TableCell>
                                    <TableCell align="right">{c.updated}</TableCell>
                                    <TableCell align="right"><StarRating ratingValue={c.grade} />
                                        {isAuthor && <div><button onClick={()=>editModal(c._id, c.question ,c.answer)}>edit</button> <button onClick={()=>deleteModal(c._id)}>delete</button></div> }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PackBoxContainer>
        <ModalAddNewCard addNewCardActive={addNewCardActive} setNewPackActive={setAddNewCardActive} packId={cardsUrlParams.cardPackId} />
        <ModalDeleteCard deleteCardActive={deleteCardActive} setDeleteCardActive={setDeleteCardActive} cardId ={cardId} />
        <ModalEditCard editCardActive={editCardActive} setEditCardActive={setEditCardActive} cardId ={cardId} question={question} answer={answer}/>
        </div>
    );
};

