import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        isAuthenticated: false,
        email: null,
        role: null
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            state.user.email = user.email;
            state.user.role = user.role;
            state.user.isAuthenticated = true;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;