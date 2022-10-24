import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks';
import { SetCardDataTC } from '../CardsPack/cards-pack-reducer';
import s from './Card.module.css'

export const Card = () => {

    const cards = useAppSelector((state) => state.cards.cardsData?.cards);
    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const UserCardId = useAppSelector((state) => state.cards.cardsData?.packUserId);

    const isAuthor = userId === UserCardId

    const dispatch = useAppDispatch()

    type QuizParams = {
        packId: string;
    };

    const params = useParams();

    useEffect(() => {
        params.userId && dispatch(SetCardDataTC(params.userId))
    }, [params.userId])

    let buttonTitle
    let buttonHandler = ()=>{}
    
    isAuthor ? buttonTitle = "Add New Card" : buttonTitle = "Learn Card"
    isAuthor ? buttonHandler = ()=>{alert("Add New Card")} : buttonHandler = ()=>{alert("Learn Card")}

    return (
        <div className={s.container}>

            <PackBoxContainer title={"Pack List"}  buttonTitle = {buttonTitle} buttonCallback={buttonHandler}>
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
                                        {c.question}
                                    </TableCell>
                                    <TableCell align="right" >{c.answer}</TableCell>
                                    <TableCell align="right">{c.updated}</TableCell>
                                    <TableCell align="right">Grade
                                        {isAuthor && <div><button>edit</button> <button>delete</button></div> }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PackBoxContainer>
        </div>
    );
};

