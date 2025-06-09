import { Card } from "./Card";
import "../../styles/global.css";
import { useEffect, useState } from "react";

type PokemonHandle = {
  name: string;
  url: string;
};

type PokemonResults = {
  count: number;
  next: string;
  previous: string | undefined;
  results: PokemonHandle[];
};

type PokemonSprites = {
  front_default: string;
};

type Pokemon = {
  id: number;
  name: string;
  sprites: PokemonSprites;
};

export function CardCointainer() {
  const shuffleArray = <T,>(array: Array<T>) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const [data, setData] = useState<Pokemon[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedOnIDS, setClickedOnIDS] = useState<number[]>([]);
  useEffect(() => {
    const fetchPokemans = async () => {
      const url = new URL("https://pokeapi.co/api/v2/pokemon/");
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Failed fetching: ${url.toString()}`);
      }
      const data = (await resp.json()) as PokemonResults;
      const pokemans = [];
      for (const poke of data.results.slice(0, 10)) {
        const resp = await fetch(poke.url);
        if (!resp.ok) {
          throw new Error(`Failed fetching: ${url.toString()}`);
        }
        const data = (await resp.json()) as Pokemon;
        pokemans.push(data);
      }
      setData(shuffleArray(pokemans));
      //   console.log(pokemans);
    };

    fetchPokemans();
  }, []);

  const handlePokemonClick = (id: number) => {
    const processClick = (id: number) => {
      if (!clickedOnIDS.includes(id)) {
        const nextScore = score + 1;
        setScore(nextScore);
        if (nextScore > highScore) {
          setHighScore((score) => score + 1);
        }

        setClickedOnIDS([...clickedOnIDS, id]);
      } else {
        setScore(0);
        setClickedOnIDS([]);
      }
    };

    processClick(id);
    setData(shuffleArray(data));
  };

  return (
    <div>
      <div className="mb-2">
        <p className="text-end">Score: {score}</p>
        <p className="text-end">High Score: {highScore}</p>
      </div>
      <ul className="grid grid-cols-5 gap-5">
        {data.map((poke) => (
          <Card
            onClick={() => handlePokemonClick(poke.id)}
            title=""
            content={<img src={poke.sprites.front_default}></img>}
            footer={poke.name[0]?.toUpperCase() + poke.name.slice(1)}
            key={poke.id}
          ></Card>
        ))}
      </ul>
    </div>
  );
}
