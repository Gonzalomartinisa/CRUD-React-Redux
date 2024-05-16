import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

const DEFAULT_STATE = [
  {
    id: "1",
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '99%',
  },
  {
    id: "2",
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
  },
  {
    id: "3",
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
  },
  {
    id: "4",
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'live',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60%',
  },
  {
    id: "5",
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'live',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75%',
  },
  {
    id: "6",
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40%',
  },
];

export interface User {
  Nombre: string;
  Apellido: string;
  Edad: string;
  Nacionalidad: string;
  Genero: string;
  Email: string;
}

export interface UserWithId extends User {
  id: string;
}

const initialState: UserWithId[] = (()=>{
  const persistedState = localStorage.getItem("redux_state");
  if(persistedState) return JSON.parse(persistedState).users;
  return DEFAULT_STATE;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      addNewUser: (state, action: PayloadAction<User>) => {
        const id = crypto.randomUUID();
        return [...state, {id, ...action.payload}];
      },
      deleteUserById: (state, action: PayloadAction<UserId>) =>{
        const id = action.payload;
        return state.filter((user) => user.id !== id);
      },
      rollbackUser: (state, action: PayloadAction<UserWithId>) => {
        const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
        if (!isUserAlreadyDefined) {
          state.push(action.payload)
        }
      }
    },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;