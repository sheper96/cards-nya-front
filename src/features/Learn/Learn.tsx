import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoxContainer from "../../common/components/BoxContainer/BoxContainer";
import {useAppDispatch, useAppSelector } from "../../common/hooks/react-redux-hooks";
import { CardsType, SetCardDataTC } from "../CardsPack/cards-pack-reducer";
import s from './Learn.module.css'


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];


const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const Learn = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {packId} = useParams();
    const [first, setFirst] = useState<boolean>(true);
    const cards:CardsType[] = useAppSelector((state:any) => state.cards?.cardsData?.cards);

    console.log(cards)

    const [card, setCard] = useState<CardsType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        __v: 0,
        created: '',
        updated: '',
    } );

    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            console.log("use effect")
            dispatch(SetCardDataTC(packId));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [cards]);

    return (
        <div className={s.container}>
            {cards?.length > 0 ?
                <BoxContainer title={'Learn'}>
                    <div >
                        <div>
                            <h4>Question:</h4>
                        </div>
                        <div>
                            <h4>Answer:</h4>
                        </div>
                        <Button onClick={()=>alert('answer')} variant="contained" size="large" sx={{borderRadius: 7.5}}>Show answer</Button>
                    </div>
                </BoxContainer>
                :
                <div>
                    <span>There are no cards in this package.</span>
                </div>
            }
           
        </div>
    )
}


