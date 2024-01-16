import { Dispatch, SetStateAction, createContext } from "react";
import { UserInfo } from "../interface";

type ContextState = [UserInfo | undefined, Dispatch<SetStateAction<UserInfo | undefined>>];

export const ContextUser = createContext<ContextState>([undefined, ()=>{}]);