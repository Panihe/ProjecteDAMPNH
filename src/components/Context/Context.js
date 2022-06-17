import { createContext, useState } from "react";


const Context = createContext();

export const Provider = ({ children }) => {
  /*   const [user, setUser] = useState(3);
    const [coachCode, setCoachCode] = useState('');
    const [email, setEmail] = useState('');
   const [idUser, setIdUser] = useState(0);
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(0);
    const [studies, setStudies] = useState(''); */
    const [type, setType] = useState(0);

    const [clientes, setClientes] = useState([]);
    

    return (
        <Context.Provider value={{ clientes, setClientes, type, setType }}>
            {children}
        </Context.Provider>
    )
}

export default Context;