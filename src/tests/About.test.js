import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { About } from '../components';
import RenderWithRouter from '../utils/RenderWithRouter';

describe('Teste o componente About', () => {
  const text1 = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';

  const text2 = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = RenderWithRouter(<About />);
    const aboutText1 = getByText(text1);
    const aboutText2 = getByText(text2);
    expect(aboutText1).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const aboutHeading = getByRole('heading', { name: /About Pokédex/i });
    expect(aboutHeading).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = RenderWithRouter(<About />);
    const textAbout1 = getByText(text1);
    const textAbout2 = getByText(text2);
    expect(textAbout1).toBeInTheDocument();
    expect(textAbout2).toBeInTheDocument();
  });
  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const image = getByRole('img', { name: /pokédex/i });
    const linkImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', linkImg);
  });
});
