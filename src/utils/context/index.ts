import { createContext } from "react";
import { UserInfo } from "../interface";
import { KeyedMutator } from "swr";

type ContextState = {
    userInfo: UserInfo | undefined,
    isLoading: boolean,
    isError: any,
    mutate: KeyedMutator<UserInfo>,
};

const initialState: ContextState = {
    isError: undefined,
    isLoading: false,
    userInfo: undefined,
    mutate: (data=undefined, opts=false)=> {
        return new Promise(()=>{
            return undefined
        })
    }
}

export const ContextUser = createContext<ContextState>(initialState);