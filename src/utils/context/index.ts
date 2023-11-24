import { Dispatch, SetStateAction, createContext } from "react";

type ContextState = [boolean, Dispatch<SetStateAction<boolean>>]

export const ContextModal = createContext<ContextState>([false, ()=>{}]);