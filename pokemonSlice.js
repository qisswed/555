import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async (offset) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await res.json();
    return await Promise.all(data.results.map(async (p) => (await fetch(p.url)).json()));
});

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        caughtPokemons: [],
        status: "idle",
        offset: 0,
    },
    reducers: {
        catchPokemon: (state, action) => {
            const pokemon = state.pokemons.find((p) => p.id === action.payload);
            if (pokemon && !state.caughtPokemons.find((p) => p.id === pokemon.id)) {
                state.caughtPokemons.push(pokemon);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.fulfilled, (state, action) => {
            state.pokemons.push(...action.payload);
            state.offset += 20;
        });
    },
});

export const { catchPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;