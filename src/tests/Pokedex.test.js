import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../utils/RenderWithRouter';

describe('Teste o component <Pokedex /> ', () => {
  it('Teste se página contém um heading h2 com texto', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const pokeH2 = getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(pokeH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);
    const pokeNext = getByRole('button', { name: /Próximo pokémon/i });

    const pokePikachu = getByText(/Pikachu/i);
    expect(pokePikachu).toBeInTheDocument();

    userEvent.click(pokeNext);

    const pokeCharmander = getByText(/Charmander/i);
    expect(pokeCharmander).toBeInTheDocument();
  });

  test('Teste se primeiro Pokémon é mostrado ao clicar próximo no último Pokémon', () => {
    const { getByRole, getByTestId } = RenderWithRouter(<App />);
    const pokeNext = getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);
    userEvent.click(pokeNext);

    const pokeName = getByTestId('pokemon-name');

    expect(pokeName.textContent).toEqual('Pikachu');
    expect(pokeName.textContent).not.toEqual(!'Pikachu');
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByRole } = RenderWithRouter(<App />);
    const pokeCount = getAllByRole('link', { name: 'More details' });
    expect(pokeCount.length).toEqual(1);
    expect(pokeCount.length).not.toEqual(!1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const pokeButtonAll = getByRole('button', { name: /All/i });
    const pokeElectric = getByRole('button', { name: /Electric/i });
    const pokeFire = getByRole('button', { name: /Fire/i });
    const pokeBug = getByRole('button', { name: /Bug/i });
    const pokePoison = getByRole('button', { name: /Poison/i });
    const pokePsychic = getByRole('button', { name: /Psychic/i });
    const pokeNormal = getByRole('button', { name: /Normal/i });
    const pokeDragon = getByRole('button', { name: /Dragon/i });
    expect(
      pokeButtonAll
        && pokeElectric
        && pokeBug
        && pokeFire
        && pokePoison
        && pokePsychic
        && pokeNormal
        && pokeDragon,
    ).toBeInTheDocument();
  });

  test('Teste se ha botão de filtragem para cada tipo de Pokémon', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    const pokeAllButtons = getAllByTestId('pokemon-type-button');
    const pokeFilterLenght = 7;
    expect(pokeAllButtons.length).toEqual(pokeFilterLenght);
  });

  test('Teste se os Pokémons são exibidos sem filtragem ', () => {
    const { getByRole, getByTestId, getByText } = RenderWithRouter(<App />);
    const pokeAll = getByRole('button', { name: /All/i });
    const pokeNext = getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(pokeNext);
    const pokeName = getByText(/Charmander/i);
    expect(pokeName.textContent).toEqual('Charmander');

    userEvent.click(pokeAll);

    const pokeName2 = getByTestId('pokemon-name');
    expect(pokeName2.textContent).toEqual('Pikachu');
    expect(pokeName2.textContent).not.toEqual(!'Pikachu');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const pokeButton = getByRole('button', { name: /All/i });
    expect(pokeButton).toBeInTheDocument();
  });
});
