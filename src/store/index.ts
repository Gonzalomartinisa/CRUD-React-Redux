import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const perLocalMiddleware: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem("redux_state", JSON.stringify(store.getState()));
};

const syncWithDatabase: Middleware = store => next => action => {
    const { type, payload} = action;
    const previousState = store.getState() as RootState;
    next(action);

    if(type === 'users/deleteUserById'){
		const userIdToRemove = payload
		const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

        fetch(`https://jsonplaceholder.typicode.com/users/${userToRemove}`, {
			method: 'DELETE'
		})
        .then(res =>{
            throw new Error('Error al eliminar el usuario');
        })
        .catch(err => {
            toast.error(`Error deleting user ${userIdToRemove}`)
				if (userToRemove) store.dispatch(rollbackUser(userToRemove))
				console.log(err)
            console.log(err)
        })
    }
};

export const store = configureStore({
    reducer: {
       users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => {

        return getDefaultMiddleware().concat(perLocalMiddleware, syncWithDatabase)
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

