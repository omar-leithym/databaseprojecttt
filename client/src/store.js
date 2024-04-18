<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
=======
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
>>>>>>> 4159db5cea0b45c1f0572a8a0ce6b8144b330c2e
})