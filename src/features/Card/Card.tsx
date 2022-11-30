import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import {NavLink, useParams, useSearchParams } from 'react-router-dom';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks';
import { SetCardDataTC } from '../CardsPack/cards-pack-reducer';
import { ModalAddNewCard } from '../ModalWidnows/CardsModals/ModalAddNewCard/ModalAddNewCard';
import { ModalDeleteCard } from '../ModalWidnows/CardsModals/ModalDeleteCard/ModalDeleteCard';
import { ModalEditCard } from '../ModalWidnows/CardsModals/ModalEditCard/ModalEditCard';
import s from './Card.module.css'

export const Card = () => {

    const cards = useAppSelector((state:any) => state.cards.cardsData?.cards);
    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const UserCardId = useAppSelector((state:any) => state.cards.cardsData?.packUserId);


    const isAuthor = userId === UserCardId


    const dispatch = useAppDispatch()
    const params = useParams();

    useEffect(() => {
        params.packId && dispatch(SetCardDataTC(params.packId))
    }, [params.packId])


    const [addNewCardActive, setAddNewCardActive] = useState(false)
    const [deleteCardActive, setDeleteCardActive] = useState(false)
    const [editCardActive, setEditCardActive] = useState(false)
    const [cardId, setCardId] = useState('')


    const editModal = (currentCardId:string) =>{
        setEditCardActive(true)
        setCardId(currentCardId)
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
        <div className={s.container}>

            <PackBoxContainer title={"Pack List"}  buttonTitle = {buttonTitle} buttonCallback={buttonHandler}>
                <NavLink to={`/learn/${params.packId}`}
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
                                    <TableCell align="right">Grade
                                        {isAuthor && <div><button onClick={()=>editModal(c._id)}>edit</button> <button onClick={()=>deleteModal(c._id)}>delete</button></div> }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PackBoxContainer>
        <ModalAddNewCard addNewCardActive={addNewCardActive} setNewPackActive={setAddNewCardActive} packId={params.userId} />
        <ModalDeleteCard deleteCardActive={deleteCardActive} setDeleteCardActive={setDeleteCardActive} cardId ={cardId} />
        <ModalEditCard editCardActive={editCardActive} setEditCardActive={setEditCardActive} cardId ={cardId}/>
        </div>
    );
};

