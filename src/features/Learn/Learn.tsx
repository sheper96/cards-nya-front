import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoxContainer from "../../common/components/BoxContainer/BoxContainer";
import {useAppDispatch, useAppSelector } from "../../common/hooks/react-redux-hooks";
import { SetCardLearnDataTC } from "../Card/cards-reducer";
import {addGradeTC, CardsType } from "../CardsPack/cards-pack-reducer";
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
    const [active, setActive] = useState<boolean>(false);
    const [valueRadio, setValueRadio] = useState<number>(1);
    const cards:CardsType[] = useAppSelector((state:any) => state.cards.cardsData.cards);

    const updateGrade = (grade:number,card_id:string)=>{
        setActive(false)
        dispatch(addGradeTC(grade,card_id))
        setCard(getCard(cards))
    }
    
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

    console.log(card)

    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            console.log("use effect")
            dispatch(SetCardLearnDataTC(packId));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [cards]);

    return (
        <div>
            {cards?.length > 0 ?
                <BoxContainer title={'Learn'}>
                    <div >
                        <div>
                            <h4>Question:{card.question}</h4>
                        </div>
                        {active && <div>
                            <h4>Answer:{card.answer}</h4>
                            <div className={s.rateBox}>
                                <p>Rate yourself:</p>
                                {grades.map((el, index) => {
                                    const onClickHandler = () => {
                                        setValueRadio(index + 1)
                                       
                                    }
                                    return (
                                        <div key={index}>
                                            <div
                                                className={s.inputRadio}
                                                onClick={onClickHandler}
                                            >
                                                <input
                                                    type={'radio'}
                                                    checked={valueRadio === index + 1}
                                                />
                                                <span>{el}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Button onClick={()=> updateGrade(valueRadio,card._id)} variant="contained" size="large" sx={{borderRadius: 7.5}}>Next</Button>
                        </div>}

                        {active ||<Button onClick={()=>setActive(true)} variant="contained" size="large" sx={{borderRadius: 7.5}}>Show answer</Button> }   
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


