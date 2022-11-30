import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/' ,
    /*baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',*/
    withCredentials: true,
})

const herokuInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    register(data: registerParamsType) {
        return instance.post('auth/register', data);
    },
    authMe() {
        return instance.post('auth/me');
    },
    updateName(data: UpdateUserNameType) {
        return instance.put('auth/me', data);
    },
    login(data: loginParamsType) {
        return instance.post('/auth/login', data);
    },
    logOut() {
        return instance.delete('auth/me');
    },
    forgotPassword(data: ForgotType) {
        return herokuInstance.post('auth/forgot', data);
    },
    setNewPassword(data: SetNewPasswordType) {
        return herokuInstance.post('auth/set-new-password', data);
    }
}

export const cardPacksAPI = {
    getCardPAcks(pageCount: number, pageNumber: number, min?: number, max?: number, userId?: string) {
        if (userId) {
            return instance.get(`cards/pack?pageCount=${pageCount}&page=${pageNumber}&min=${min}&max=${max}&user_id=${userId}`);
        } else return instance.get(`cards/pack?pageCount=${pageCount}&page=${pageNumber}&min=${min}&max=${max}`);
    },
    addCardPack(name: string, isPrivate: boolean) {
        return instance.post('cards/pack', {
            cardsPack: {
                name: name,
                private: isPrivate
            }
        });
    },
    updateCardPack(packId: string, name: string, isPrivate: boolean) {
        return instance.put('cards/pack', {
            cardsPack: {
                _id: packId,
                name: name,
                private: isPrivate
            }
        });
    },
    deleteCardPack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`);
    },
}
export const cardsAPI = {
    getCards(id?: string) {
        return instance.get(`cards/card?cardsPack_id=${id} `);
    },
    addNewCard(cardsPackId:string | undefined,question:string,answer:string) {
        return instance.post('cards/card' , {
            card: {
                cardsPack_id: cardsPackId,
                question: question,
                answer: answer,
                grade: 0, // 0..5, не обязателен
                shots: 0, // не обязателен
            }
        });
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`);
    },
    editCard(cardsId:string,question:string,answer:string) {
        return instance.put('cards/card' , {
            card: {
                _id: cardsId,
                question: question,
                answer: answer,

            }
        });
    },

}

export type ForgotType = {
    email: string
    from: string
    message: string
}

export type SetNewPasswordType = {
    password: string
    resetPasswordToken: string | undefined
}

export type UpdateUserNameType = {
    name: string | undefined
    avatar: string
}

export type registerParamsType = {
    email: string,
    password: string,
}
export type loginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

//card pack API type

export type AddCardPackType = {
    name: string
    deckCover?: string
    isPrivate?: boolean
}

export type UpdateCardPackType = {
    name: string
    _id: string
}

