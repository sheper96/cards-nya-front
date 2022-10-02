import {SetCardDataTC, SetCardPackDataTC} from './cards-pack-reducer';
import s from './CardsPack.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks";
import {useEffect, useState} from 'react';
import {
    Button, ButtonGroup,
    Input, Pagination, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import {authAPI} from '../../app/api';
import {initializeAppTC} from '../../app/app-reducer';
import {NavLink} from 'react-router-dom';


export const CardsPack = () => {
    const dispatch = useAppDispatch()
    
    const packs = useAppSelector((state) => state.cards.cardPackData?.cardPacks)
    const totalCount = useAppSelector((state) => state.cards.cardPackData?.cardPacksTotalCount)
    const userId = useAppSelector((state) => state.auth.userInfo?._id)

    const [value, setValue] = useState<number[]>([1,9])
    const [page, setPage] = useState(1);
    const [myCards,setMyCards] = useState<boolean>(false)
    const count = Math.ceil(totalCount / 9)

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(SetCardPackDataTC(page,value[0],value[1]))
    };

    const updateRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    
    const updateRangePage = ()=>{
        if (myCards){
            dispatch(SetCardPackDataTC(1,value[0],value[1],userId))
        }
        else {
            dispatch(SetCardPackDataTC(1, value[0], value[1]))
        }
    }  
    const myPacks = ()=>{
        dispatch(SetCardPackDataTC(1,value[0],value[1],userId))
        setMyCards(true)
    }
    const allPacks = ()=>{
        dispatch(SetCardPackDataTC(1,value[0],value[1]))
        setMyCards(false)
    }
    
    useEffect(() => {
        console.log('pack ')
        dispatch(SetCardPackDataTC(1,value[0],value[1]))

    }, [])
    
    return (
        <div className={s.container}>
            <PackBoxContainer title={"Pack List"} buttonTitle={"Add New Pack"} buttonCallback={() => alert("hi")}>
                <div className={s.workingPanel}>
                    <div className={s.search}>
                        <h3>Search</h3>
                        <TextField autoFocus value={'search'} size={"small"} id="standard-basic" label="Search"
                                   variant="outlined"/>
                    </div>
                    <div>
                        <h3>Show packs cards</h3>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={myPacks}>My</Button>
                            <Button onClick={allPacks}>All</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <h2>Number of cards</h2>
                        <Slider value={value} step={1} getAriaLabel={() => 'Default'} max = {10} valueLabelDisplay="auto" onChange={updateRange}/>
                        <Button onClick={updateRangePage} variant="contained" size="medium" sx={{borderRadius: 7.5 ,mt: 4}}>set range</Button>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{height: 10}}>
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
                                    <TableCell component="th" scope="row"
                                               onClick={() => dispatch(SetCardDataTC(p._id))}>
                                        <NavLink to={`/card/${p._id}`}>{p.name}</NavLink>
                                    </TableCell>
                                    <TableCell align="right">{p.cardsCount}</TableCell>
                                    <TableCell align="right">{p.updated}</TableCell>
                                    <TableCell align="right">{p.user_name}</TableCell>
                                    <TableCell align="right">{userId === p.user_id ? <button>delete</button> : <h3>321</h3>}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={count} color="primary" onChange={handleChange}/>
            </PackBoxContainer>
        </div>
    );
};

