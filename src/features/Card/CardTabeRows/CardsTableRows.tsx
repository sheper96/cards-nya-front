import {TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import { ModalContainerTwo } from "../../../common/components/ModalContainer/ModalContainerTwo";
import {StarRating} from "../../../common/components/StarRating/StarRating";
import {SvgSelector} from "../../../common/components/SvgSelector/svgSelector";
import {useAppSelector} from "../../../common/hooks/react-redux-hooks";
import {ModalDeleteCard} from "../../ModalWidnows/CardsModals/ModalDeleteCard/ModalDeleteCard";
import {ModalEditCard} from "../../ModalWidnows/CardsModals/ModalEditCard/ModalEditCard";
import {CardsType} from "../cards-reducer";
import s from './CardTableRows.module.css'


type CardsTableRowsType = {
    cards: CardsType
}

export const CardsTableRows = ({cards}: CardsTableRowsType) => {

    const userId = useAppSelector((state) => state.auth.userInfo?._id)
    const UserCardId = useAppSelector((state) => state.cards.cardsData.packUserId);
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpendEdit] = useState(false)
    const isAuthor = userId === UserCardId

    const handleEditClose = () => {
        setOpendEdit(false)
    }
    const handleEditOpen = () => {
        setOpendEdit(true)
    }
    const handleDeleteClose = () => {
        setOpenDelete(false)
    } 
    const handleDeleteOpen = () => {
        setOpenDelete(true)
    }

    return (<TableRow
            key={cards._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">{cards.question}</TableCell>
            <TableCell align="right">{cards.answer}</TableCell>
            <TableCell align="right">{cards.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell align="right">
                <div className={s.rating}><StarRating ratingValue={cards.grade}/></div>
            </TableCell>
            {isAuthor &&
                <TableCell align="right">
                    <div className={s.icons}>
                        <div className={s.icon} onClick={handleEditOpen}><SvgSelector svgName='pencil'/></div>
                        <div className={s.icon} onClick={handleDeleteOpen}><SvgSelector svgName='delete'/></div>
                    </div>

                </TableCell>}
           
            
            <ModalContainerTwo open={openDelete} handleClose={handleDeleteClose} title={'Delet Card'}>
                <ModalDeleteCard handleClose={handleDeleteClose}
                                 cardId={cards._id} question={cards.question}/>
            </ModalContainerTwo>
            <ModalContainerTwo open={openEdit} handleClose={handleEditClose} title={'Edit Card'}>
                <ModalEditCard handleClose={handleEditClose} cardId={cards._id}
                               question={cards.question} answer={cards.answer}/>
            </ModalContainerTwo>
        </TableRow>
    );
};

