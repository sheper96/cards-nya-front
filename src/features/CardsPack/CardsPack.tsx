import {SetCardDataTC, SetCardPackDataTC} from './cards-pack-reducer';
import s from './CardsPack.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/react-redux-hooks";
import {useEffect, useState} from 'react';
import {
    Button, ButtonGroup,
    IconButton,
    Input, Pagination, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PackBoxContainer from '../../common/components/PackBoxContainer/PackBoxContainer';
import {authAPI} from '../../app/api';
import {initializeAppTC} from '../../app/app-reducer';
import {Navigate, NavLink} from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { ModalDeletePack } from '../ModalWidnows/PackModals/ModalDeletePack/ModalDeletePack';
import { ModalEditPack } from '../ModalWidnows/PackModals/ModalEditPack/ModalEditPack';
import { ModalAddNewPack } from '../ModalWidnows/PackModals/ModalAddNewPack/ModalAddNewPack';

export const CardsPack = () => {
    const dispatch = useAppDispatch()
    let isLoggedIn=useAppSelector(state=>state.auth.isLoggedIn)

    const packs = useAppSelector((state:any) => state.cards.cardPackData?.cardPacks)
    const totalCount = useAppSelector((state:any) => state.cards.cardPackData?.cardPacksTotalCount)
    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const [addNewPackActive, setNewPackActive] = useState(false)
    const [editPackActive, setEditPackActive] = useState(false)
    const [deletePackActive, setDeletePackActive] = useState(false)
    const [packId, setPackId] = useState('')

    const [value, setValue] = useState<number[]>([0, 100])
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [myCards, setMyCards] = useState<boolean>(false)
    const count = Math.ceil(totalCount / 5)

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(SetCardPackDataTC(page, value[0], value[1]))
    };

    const updateRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    
    const deleteModalPage = (id:string)=>{
        setPackId(id)
        setDeletePackActive(true)
    }
    
    const editModalPage = (id:string)=>{
        setPackId(id)
        setEditPackActive(true)
    }

    const updateRangePage = () => {
        if (myCards) {
            dispatch(SetCardPackDataTC(1, value[0], value[1], userId))
        } else {
            dispatch(SetCardPackDataTC(1, value[0], value[1]))
        }
    }
    const myPacks = () => {
        dispatch(SetCardPackDataTC(1, value[0], value[1], userId))
        setMyCards(true)
    }
    const allPacks = () => {
        dispatch(SetCardPackDataTC(1, value[0], value[1]))
        setMyCards(false)
    }

    const searchHandler = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.currentTarget.value)
        dispatch(SetCardPackDataTC(page, value[0], value[1],searchValue))
    }


    useEffect(() => {
        console.log('pack ')
        dispatch(SetCardPackDataTC(1, value[0], value[1]))

    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    
    return (
        <div className={s.container}>
            <PackBoxContainer title={"Pack List"} buttonTitle={"Add New Pack"} buttonCallback={()=>setNewPackActive(true)}>
                <div className={s.workingPanel}>
                    <div className={s.search}>
                        <h3>Search</h3>
                        <TextField autoFocus value={searchValue} size={"small"} id="standard-basic" label="Search" onChange={searchHandler}
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
                        <Slider value={value} step={1} 
                                getAriaLabel={() => 'Default'} 
                                max={100} 
                                valueLabelDisplay="auto"
                                onChange={updateRange}  
                                onChangeCommitted={updateRangePage}/>
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
                                   
                                >
                                    <TableCell component="th" scope="row">
                                        <NavLink to={`/cards/${p._id}`}

                                        >{p.name}</NavLink>
                                    </TableCell>
                                    <TableCell align="right">{p.cardsCount}</TableCell>
                                    <TableCell align="right">{p.updated}</TableCell>
                                    <TableCell align="right">{p.user_name}</TableCell>
                                    <TableCell align="right">{userId === p.user_id
                                        ? <div>
                                        <IconButton aria-label="delete" onClick={()=>deleteModalPage(p._id)}><DeleteIcon/></IconButton>
                                         <IconButton aria-label="delete" onClick={()=>editModalPage(p._id)}><Edit/></IconButton>
                                        </div>
                                        : <h3>321</h3>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={count} color="primary" onChange={handleChange}/>
            </PackBoxContainer>
            <ModalAddNewPack addNewPackActive={addNewPackActive} setNewPackActive={setNewPackActive} />
            {/*<ModalEditPack editPackActive={editPackActive} setEditPackActive={setEditPackActive} packId={packId}/>*/}
           {/* <ModalDeletePack deletePackActive={deletePackActive} setDeletePackActive={setDeletePackActive} packId={packId}/>*/}
        </div>
    );
};


