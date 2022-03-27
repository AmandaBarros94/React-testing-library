import React from 'react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../utils/RenderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails />', () => {
  const aboutText = 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.';

  test('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);

    const pokeDetails = getByRole('link', { name: /More details/i });

    userEvent.click(pokeDetails);

    const pikachu = getByText(/Pikachu Details/i);
    const heading = getByRole('heading', { name: /Summary/i });
    const about = getByText(aboutText);

    expect(pikachu.textContent).toEqual('Pikachu Details');
    expect(pokeDetails).not.toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(about.textContent).toEqual(aboutText);
  });

  test('Teste se existe na página mapas contendo as localizações do pokémon', () => {
    const { getByRole, getAllByRole, getByText } = RenderWithRouter(<App />);

    const pokeDetailsPikachu = getByRole('link', { name: /More details/i });

    userEvent.click(pokeDetailsPikachu);

    const heading = getByRole('heading', {
      name: /Game Locations of Pikachu/i });
    const position = getAllByRole('img', { name: /Pikachu location/i });
    const position1 = getByText(/Kanto Viridian Forest/i);
    const position2 = getByText(/Kanto Power Plant/i);

    expect(heading).toBeInTheDocument();
    expect(position.length).toEqual(2);
    expect(position1 && position2).toBeInTheDocument();
    expect(position[0].src).toEqual('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(position[1].src).toEqual('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(position[0] && position[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Teste se o usuário pode favoritar um pokémon', () => {
    const { getByRole } = RenderWithRouter(<App />);

    const pokeDetails = getByRole('link', { name: /More details/i });

    userEvent.click(pokeDetails);

    const pokeFavourite = getByRole('checkbox', { name: /pokémon favoritado*/i });

    expect(pokeFavourite).toBeInTheDocument();

    userEvent.click(pokeFavourite);

    expect(pokeFavourite).toBeChecked();
    expect(pokeFavourite).toBeInTheDocument();
  });
});
