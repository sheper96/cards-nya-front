import s from './Pack.module.css'
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
import {Navigate, NavLink, useSearchParams} from 'react-router-dom';
import {Edit} from '@mui/icons-material';
import {ModalDeletePack} from '../ModalWidnows/PackModals/ModalDeletePack/ModalDeletePack';
import {ModalEditPack} from '../ModalWidnows/PackModals/ModalEditPack/ModalEditPack';
import {ModalAddNewPack} from '../ModalWidnows/PackModals/ModalAddNewPack/ModalAddNewPack';
import {SetPackDataTC} from './pack-reducer';
import {setPacksTC, setUrlParamsAC, UrlParamsType} from './packs2-reducer';
import {filterQueryParams} from '../../common/utils/query-params';
import {useDebounce} from '../../common/utils/useDebounce';

export const Pack = () => {
    const dispatch = useAppDispatch()
    let isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packs = useAppSelector((state: any) => state.cards.cardPackData?.cardPacks)
    const totalCount = useAppSelector((state: any) => state.cards.cardPackData?.cardPacksTotalCount)
    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const [addNewPackActive, setNewPackActive] = useState(false)
    const [editPackActive, setEditPackActive] = useState(false)
    const [deletePackActive, setDeletePackActive] = useState(false)
    const [packId, setPackId] = useState('')
    const [packName, setPackName] = useState('')

    const [value, setValue] = useState<number[]>([0, 100])
    const [page, setPage] = useState(1);
    const [myCards, setMyCards] = useState<boolean>(false)
    const count = Math.ceil(totalCount / 5)

    const [searchParams, setSearchParams] = useSearchParams()

    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
    const userIDURL = searchParams.get('userID') ? searchParams.get('userID') + '' : ''
    const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
    const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''


    const [searchValue, setSearchValue] = useState<string>(packNameURL ? packNameURL : '')

    const debouncedValue = useDebounce<string>(searchValue, 500)


    const [paramsSearchState, setParamsSearchState] = useState<UrlParamsType>({
        page: '1',
        pageCount: '5',
        userID: '',
        min: '',
        max: ''


    })

    const urlParams = ({
        page: pageURL,
        pageCount: pageCountURL,
        packName: packNameURL,
        userID: userIDURL,
        min: minRangeURL,
        max: maxRangeURL
    })

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setParamsSearchState({
            ...paramsSearchState,
            userID: userIDURL,
            page: page.toString(),
            pageCount: '5',
            min: minRangeURL,
            max: maxRangeURL
        })
        setSearchParams({
            ...filterQueryParams(
                {
                    ...paramsSearchState,
                    userID: userIDURL,
                    page: page.toString(),
                    pageCount: '5',
                    min: minRangeURL,
                    max: maxRangeURL,
                })
        })

    };

    const updateRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const deleteModalPage = (id: string,packName:string) => {
        setPackId(id)
        setPackName(packName)
        setDeletePackActive(true)
    }

    const editModalPage = (id: string,packName:string) => {
        setPackId(id)
        setPackName(packName)
        setEditPackActive(true)
        console.log(editPackActive)
    }

    const searchValueTextHandler = (valueSearch: string) => {
        setPackName(valueSearch)
        setSearchParams({...filterQueryParams({...paramsSearchState, packName: valueSearch, userID: userIDURL})})
    }

    const myPacksHandler = () => {
        userId && setParamsSearchState({
            ...paramsSearchState,
            userID: userId,
            page: '1',
            pageCount: '5',
            min: minRangeURL,
            max: maxRangeURL
        })

        userId && setSearchParams({
            ...filterQueryParams(
                {
                    ...paramsSearchState,
                    userID: userId,
                    page: '1',
                    pageCount: '5',
                    min: minRangeURL,
                    max: maxRangeURL,
                    packName
                })
        })
    }

    const allPacksHandler = () => {
        setParamsSearchState({
            ...paramsSearchState,
            userID: '',
            page: '1',
            pageCount: '5',
            min: minRangeURL,
            max: maxRangeURL
        })
        setSearchParams({
            ...filterQueryParams(
                {
                    ...paramsSearchState,
                    userID: '',
                    page: '1',
                    pageCount: '5',
                    min: minRangeURL,
                    max: maxRangeURL,
                })
        })
    }

    const minMaxValueHandler = () => {
        setParamsSearchState({
            ...paramsSearchState,
            userID: userIDURL,
            page: '1',
            pageCount: '5',
            min: value[0].toString(),
            max: value[1].toString()
        })
        setSearchParams({
            ...filterQueryParams(
                {
                    ...paramsSearchState,
                    userID: userIDURL,
                    page: '1',
                    pageCount: '5',
                    min: value[0].toString(),
                    max: value[1].toString(),
                    packName
                })
        })
    }

    const searchHandler = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setSearchValue(value)
        setSearchParams(
            {
                ...filterQueryParams(
                    {
                        ...paramsSearchState,
                        userID: userIDURL,
                        packName: value
                    })
            }
        )
    }

    useEffect(() => {
        dispatch(setUrlParamsAC({...urlParams}))
        dispatch(setPacksTC())
    }, [paramsSearchState, debouncedValue])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <PackBoxContainer title={"Pack List"} buttonTitle={"Add New Pack"}
                              buttonCallback={() => setNewPackActive(true)}>
                <div className={s.workingPanel}>
                    <div className={s.search}>
                        <h3>Search</h3>
                        <TextField autoFocus value={searchValue} size={"small"} id="standard-basic" label="Search"
                                   onChange={searchHandler}
                                   variant="outlined"/>
                    </div>
                    <div>
                        <h3>Show packs cards</h3>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={myPacksHandler}>My</Button>
                            <Button onClick={allPacksHandler}>All</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <h2>Number of cards</h2>
                        <Slider value={value} step={1}
                                getAriaLabel={() => 'Default'}
                                max={100}
                                valueLabelDisplay="auto"
                                onChange={updateRange}
                                onChangeCommitted={minMaxValueHandler}
                        />
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
                                            <IconButton aria-label="delete"
                                                        onClick={() => deleteModalPage(p._id,p.name)}><DeleteIcon/></IconButton>
                                            <IconButton aria-label="delete" onClick={() => editModalPage(p._id,p.name)}><Edit/></IconButton>
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
            <ModalAddNewPack addNewPackActive={addNewPackActive} setNewPackActive={setNewPackActive}/>
            <ModalEditPack editPackActive={editPackActive} setEditPackActive={setEditPackActive} packId={packId} packName={packName}/>
            <ModalDeletePack deletePackActive={deletePackActive} setDeletePackActive={setDeletePackActive}
                             packId={packId} packName={packName}/>
        </div>
    );
};


