import useSWR from "swr"

import { ENDPOINTS, ENDPOINTS_URL} from "../config"

export const useGETUser = () => {

    const { data, error, isLoading, mutate } = useSWR(ENDPOINTS_URL.USERS, ENDPOINTS.USERS.GET_iNFO)
   
    return {
        userInfo: data,
        isLoading,
        isError: error,
        mutate
    }
}

export const useGETWorks = () => {

    const { data, error, isLoading, mutate } = useSWR(ENDPOINTS_URL.WORK, ENDPOINTS.WORK.GET_WORKS)
   
    return {
        data: data,
        isLoading,
        isError: error,
        mutate
    }
}

export const useGETStatistic = ({startDate, endDate}:{startDate?: Date, endDate?: Date}) => {

    const { data, error, isLoading, mutate } = useSWR({url: ENDPOINTS_URL.STATISTIC, startDate: startDate, endDate: endDate}, ENDPOINTS.STATISTIC.GET_STATISTIC)
   
    return {
        data: data,
        isLoading,
        isError: error,
        mutate
    }
}

export const useGETHistory = ({startDate, endDate}:{startDate?: Date, endDate?: Date}) => {

    const { data, error, isLoading, mutate } = useSWR({url: ENDPOINTS_URL.PAYMENT, startDate: startDate, endDate: endDate}, ENDPOINTS.PAYMENT.GET_HISTORY)
   
    return {
        data: data,
        isLoading,
        isError: error,
        mutate
    }
}