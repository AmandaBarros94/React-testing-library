import React from 'react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import RenderWithRouter from '../utils/RenderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibi a mensagem, caso não tenha Favoritos', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByRole, history } = RenderWithRouter(<App />);

    const details = getByRole('link', { name: (/More details/i) });
    userEvent.click(details);

    const checkbox = getByRole('checkbox', { name: (/Pokémon Favoritado*/i) });
    userEvent.click(checkbox);

    const favorites = getByRole('link', { name: (/Favorite Pokémons/i) });
    userEvent.click(favorites);

    history.push('/fovorites');

    const pokemons = getByRole('img', { name: (/Pikachu/i) });
    expect(pokemons).toBeInTheDocument();
  });
});
