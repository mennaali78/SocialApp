import {  useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();

export default function UserContextProvider( props) {
    const [userLogin, setLogin] = useState(localStorage.getItem("token"));
//    useEffect(() => {
//       if (localStorage.getItem("token")) {
//         setLogin(localStorage.getItem("token"));
//       }
//    },[])

    return <>
    <UserContext.Provider value={{ userLogin, setLogin }}>
        {props.children}
    </UserContext.Provider>
    </>

}
