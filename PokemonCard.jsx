import React from "react";
import { Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { catchPokemon } from "../store/pokemonSlice";

const PokemonCard = ({ pokemon }) => {
    const dispatch = useDispatch();

    return (
        <Card
            title={pokemon.name}
            cover={<img src={pokemon.sprites.front_default} alt={pokemon.name} />}
            style={{ width: 200 }}
        >
            <p>⚔️ Атака: {pokemon.stats[1].base_stat}</p>
            <p>🛡️ Защита: {pokemon.stats[2].base_stat}</p>
            <p>⚡ Скорость: {pokemon.stats[5].base_stat}</p>
            <Button onClick={() => dispatch(catchPokemon(pokemon.id))}>Поймать</Button>
        </Card>
    );
};

export default PokemonCard;
