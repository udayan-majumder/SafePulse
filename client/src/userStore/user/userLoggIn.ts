import { create } from "zustand";

type UserType= {
    isLoggedIn:boolean;
    setLoggedIn:(data:boolean)=>void;
}


export const UserLogged = create<UserType>((set)=>({
    isLoggedIn:false,
    setLoggedIn:(data)=> {
        set(()=>({
            isLoggedIn:data
        }))
    }
}))