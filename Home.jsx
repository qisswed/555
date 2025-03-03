import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../features/pokemonSlice";
import PokemonCard from "../components/PokemonCard";
import { Button, Spin } from "antd";

const Home = () => {
    const dispatch = useDispatch();
    const { pokemons, status, offset } = useSelector((state) => state.pokemon);

    useEffect(() => {
        if (pokemons.length === 0) {
            dispatch(fetchPokemons(0));
        }
    }, [dispatch, pokemons]);

    return (
        <div>
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
            {status === "loading" && <Spin />}
            <Button onClick={() => dispatch(fetchPokemons(offset))} style={{ marginTop: "20px" }}>
                Загрузить ещё
            </Button>
        </div>
    );
};

export default Home;