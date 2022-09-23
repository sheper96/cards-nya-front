import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {registerAPI} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";

type registerParamsType = {
    email: string,
    password: string
}

type MyExpectedResponseType = {
    error: string;
};

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
    return axios.isAxiosError(error);
}

export const registerTC = (data: registerParamsType) => async (dispatch: Dispatch) => {
    //dispatch(setAppStatusAC('loading'))
    try {
        const res = await registerAPI.register(data)
        window.location.href = '/login'
    }catch (error: unknown) {
        if (isAxiosError<MyExpectedResponseType>(error)) {
            if (error.response?.data.error) {
                handleServerNetworkError(error.response?.data.error, dispatch)
            } else {
                handleServerNetworkError(error.message, dispatch)
            }
        }
    }

}


