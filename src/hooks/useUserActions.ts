import { useAppDispatch } from '../hooks/store';
import { addNewUser, deleteUserById, UserId } from '../store/users/slice';

export const useUserAction = () => {
    const dispatch = useAppDispatch();

    const removeUser = (id: UserId) =>{
      dispatch(deleteUserById(id));
    };

    const addUser = ({Nombre, Apellido, Edad, Genero, Nacionalidad, Email}) => {
      dispatch(addNewUser({Nombre, Apellido, Edad, Genero, Nacionalidad, Email}))
    };
    
    return { removeUser, addUser } 
};

