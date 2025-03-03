import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../store/pokemonSlice";
import PokemonCard from "./PokemonCard.jsx";

const PokemonList = () => {
    const dispatch = useDispatch();
    const { pokemons, status, offset } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(fetchPokemons(offset));
    }, [dispatch]);

    return (
        <div>
            <h2>Список покемонов</h2>
            {status === "loading" && <p>Загрузка...</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;