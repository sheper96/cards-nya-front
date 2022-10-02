import axios from 'axios'

export const instance = axios.create({
    /*baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/' ,*/
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
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
    getCardPAcks(pageCount: number, pageNumber: number, min?: number , max?: number , userId?: string ) {
        if (userId){
            return instance.get(`cards/pack?pageCount=${pageCount}&page=${pageNumber}&min=${min}&max=${max}&user_id=${userId}`);
        }
        else return instance.get(`cards/pack?pageCount=${pageCount}&page=${pageNumber}&min=${min}&max=${max}`);
    },
    addCardPack(data: AddCardPackType) {
        return instance.post('cards/pack', data);
    },
    updateCardPack(data: UpdateCardPackType) {
        return instance.put('cards/pack', data);
    },
    deleteCardPack() {
        return instance.delete('cards/pack?id=6334cd323f379e2a78a1d897');
    },
}
export const cardsAPI = {
    getCards(id: string) {
        return instance.get(`cards/card?cardsPack_id=${id} `);
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
    private?: boolean
}

export type UpdateCardPackType = {
    name: string
    _id: string
}

//968b9390-40a3-11ed-a346-336d45d0120e
//968c56e0-40a3-11ed-a346-336d45d0120e
