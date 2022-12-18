import {IconButton, TableCell, TableRow } from "@mui/material";
import { PackType } from "../packs-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import {Edit} from '@mui/icons-material';
import { useAppSelector } from "../../../common/hooks/react-redux-hooks";
import {ModalEditPack } from "../../ModalWidnows/PackModals/ModalEditPack/ModalEditPack";
import { useState } from "react";
import { ModalDeletePack } from "../../ModalWidnows/PackModals/ModalDeletePack/ModalDeletePack";
import { SvgSelector } from "../../../common/components/SvgSelector/svgSelector";
import s from './Pack.module.css'
import {NavLink, useNavigate } from "react-router-dom";



type PackPropsType = {
    pack: PackType
}



export const Pack = ({pack}:PackPropsType) => {

    const navigate = useNavigate()
    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const [editPackActive, setEditPackActive] = useState(false)
    const [deletePackActive, setDeletePackActive] = useState(false)
    const pageCardNumber = useAppSelector((state) => state.cards.cardsData.page)
    const pageCardCount = useAppSelector((state) => state.cards.cardsData.pageCount)

    const deleteModalPage = () => {
        setDeletePackActive(true)
    }

    const editModalPage = () => {
        setEditPackActive(true)
    }

    const learnHandler = ()=>{
        navigate(`/learn/${pack._id}`)

    }

    const isAuthor = userId === pack.user_id
    
    return (
            <TableRow
                key={pack._id}
            >
                <TableCell component="th" scope="row">
                    <NavLink className={s.pack} to={`/cards?page=${pageCardNumber}&pageCount=${pageCardCount}&cardPack_id=${pack._id}`}
                    >{pack.name}</NavLink>
                </TableCell>
                <TableCell align="right">{pack.cardsCount}</TableCell>
                <TableCell align="right">{pack.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
                <TableCell align="right">{pack.user_name}</TableCell>
                <TableCell align="right">
                    <div className={s.icons}>
                    <div className={s.icon} onClick={learnHandler}> <SvgSelector svgName='cap'/></div>
                    {isAuthor &&
                        <div className={s.authtorButtons}>
                        <div className={s.icon} onClick={editModalPage}> <SvgSelector svgName='pencil'/></div>
                        <div className={s.icon} onClick={deleteModalPage}> <SvgSelector svgName='delete'/></div>
                        </div>
                       }
                    </div>
                </TableCell>
               
                <ModalEditPack editPackActive={editPackActive} setEditPackActive={setEditPackActive} packId={pack._id} packName={pack.name}/>
                <ModalDeletePack deletePackActive={deletePackActive} setDeletePackActive={setDeletePackActive}
                                 packId={pack._id} packName={pack.name}/>
            </TableRow>
        
    );
};


