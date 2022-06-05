import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/RenderWithRouter';
import App from '../App';

test('', () => {});

describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toEqual('Pikachu');
    expect(pokemonName.textContent).not.toEqual('Charmander');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokemonName = getByTestId('pokemon-type');
    expect(pokemonName.textContent).toEqual('Electric');
    expect(pokemonName.textContent).not.toEqual('Fire');
  });

  it(' peso médio do pokémon formato Average weight: <value> <measurementUnit>', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toEqual('Average weight: 6.0 kg');
    expect(pokemonWeight.textContent).not.toEqual('Average weight: 6.5 kg');

    userEvent.click(nextPokemon);

    const pokemonWeight2 = getByTestId('pokemon-weight');
    expect(pokemonWeight2.textContent).toEqual('Average weight: 8.5 kg');
    expect(pokemonWeight2.textContent).not.toEqual('Average weight: 8.0 kg');
  });

  it('A imagem deve conter um atributo src com a URL da imagem e um', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokemonImagePikachu = getByRole('img', { name: /Pikachu/i });
    expect(pokemonImagePikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImagePikachu).toHaveAttribute('alt', 'Pikachu sprite');

    const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemon);

    const pokemonImageCharmander = getByRole('img', { name: /Charmander/i });
    expect(pokemonImageCharmander).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(pokemonImageCharmander).toHaveAttribute('alt', 'Charmander sprite');
  });

  it('O link deve possuir a URL /pokemons/<id>, <id> é o id do Pokémon exibido', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByRole('link', { name: /More details/i });
    expect(pokemonDetailsLink).toHaveAttribute('href', '/pokemons/25');
    expect(pokemonDetailsLink).not.toHaveAttribute('href', '/pokemons/4');
  });

  it('Ao clicar no link é feito o redirecionamento para a página de detalhes', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByRole('link', { name: /More details/i });
    userEvent.click(pokemonDetailsLink);
    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('A URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByRole('link', { name: /More details/i });
    userEvent.click(pokemonDetailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    // adiciona Pikachu aos favoritos
    const moreDetailsPikachu = getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsPikachu);
    const favoritePikachu = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoritePikachu);

    history.push('/');

    const getImgStar = getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(getImgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(getImgStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
