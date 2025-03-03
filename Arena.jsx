import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Select, Card } from "antd";

const { Option } = Select;

const Arena = () => {
    const caughtPokemons = useSelector((state) => state.pokemon.caughtPokemons);
    const [firstPokemon, setFirstPokemon] = useState(null);
    const [secondPokemon, setSecondPokemon] = useState(null);

    const determineWinner = () => {
        if (!firstPokemon || !secondPokemon) return null;
        const firstScore = firstPokemon.stats[1].base_stat + firstPokemon.stats[2].base_stat + firstPokemon.stats[5].base_stat;
        const secondScore = secondPokemon.stats[1].base_stat + secondPokemon.stats[2].base_stat + secondPokemon.stats[5].base_stat;

        return firstScore > secondScore ? firstPokemon : secondScore > firstScore ? secondPokemon : "Ничья!";
    };

    return (
        <div>
            <h2>Боевая арена</h2>
            <Select onChange={(id) => setFirstPokemon(caughtPokemons.find((p) => p.id === id))}>
                {caughtPokemons.map((p) => <Option key={p.id} value={p.id}>{p.name}</Option>)}
            </Select>
            <Select onChange={(id) => setSecondPokemon(caughtPokemons.find((p) => p.id === id))}>
                {caughtPokemons.map((p) => <Option key={p.id} value={p.id}>{p.name}</Option>)}
            </Select>
            {determineWinner() && <Card title="Победитель">{typeof determineWinner() === "string" ? "Ничья!" : determineWinner().name}</Card>}
        </div>
    );
};

export default Arena;