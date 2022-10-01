import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks';
import s from './Card.module.css'



export const Card = () => {

    const cards = useAppSelector((state) => state.cards.cardsData?.cards)


    const handleCellClick=()=>{
        console.log("cell clicked")
    }

    useEffect(() => {
    }, [])

   
    
    const dispatch = useAppDispatch()
    return (
        <div className={s.container}>
            <PackBoxContainer title={"Pack List"} buttonTitle={"Add New Pack"} buttonCallback={() => alert("hi")}>
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
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" >
                                        {c.question}
                                    </TableCell>
                                    <TableCell align="right" >{c.answer}</TableCell>
                                    <TableCell align="right">{c.updated}</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                </TableRow>
                            ))}
                                {/*<TableRow
                                    
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" >
                                        Question
                                    </TableCell>
                                    <TableCell align="right" >Answer</TableCell>
                                    <TableCell align="right">Last Updated</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                </TableRow>
                            */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PackBoxContainer>
        </div>
    );
};

