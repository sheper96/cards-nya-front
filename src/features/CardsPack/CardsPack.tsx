import {SetCardDataTC, SetCardPackDataTC} from './cards-pack-reducer';
import s from './CardsPack.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks";
import {useEffect, useState} from 'react';
import {Button, ButtonGroup,
    Input, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@mui/material';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import { authAPI } from '../../app/api';
import { initializeAppTC } from '../../app/app-reducer';


export const CardsPack = () => {

    const packs = useAppSelector((state) => state.cards.cardPackData)

    const [value, setValue] = useState()
    
    const handleCellClick=()=>{
        console.log("cell clicked")
    }

    useEffect(() => {
        console.log('pack ')
        dispatch(SetCardPackDataTC())

    }, [])

   
    
    const dispatch = useAppDispatch()
    return (
        <div className={s.container}>
            <button onClick={()=>dispatch(initializeAppTC())}>auth me </button>
            <PackBoxContainer title={"Pack List"} buttonTitle={"Add New Pack"} buttonCallback={() => alert("hi")}>
                <div className={s.workingPanel}>
                    <div className={s.search}>
                        <h3>Search</h3>
                        <TextField autoFocus value={value} size={"small"} id="standard-basic" label="Search" variant="outlined" />

                    </div>
                    <div>
                        <h3>Show packs cards</h3>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button>My</Button>
                            <Button>All</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <h2>Number of cards</h2>
                        <Slider defaultValue={value} aria-label="Default" valueLabelDisplay="auto" />
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                           
                            valueLabelDisplay="auto"
                           
                        />
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Cards</TableCell>
                                <TableCell align="right">Last Updated</TableCell>
                                <TableCell align="right">Created by</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packs && packs.map((p: any) => (
                                <TableRow
                                    key={p._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" onClick={()=>dispatch(SetCardDataTC(p._id))}>
                                        {p.name}
                                    </TableCell>
                                    <TableCell align="right" >{p.cardsCount}</TableCell>
                                    <TableCell align="right">{p.updated}</TableCell>
                                    <TableCell align="right">{p.user_name}</TableCell>
                                    <TableCell align="right"><h1>123</h1></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PackBoxContainer>
        </div>
    );
};

