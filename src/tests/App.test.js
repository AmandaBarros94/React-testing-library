import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../utils/RenderWithRouter';

describe('Testando o componente App', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    RenderWithRouter(<App />);
    const link = screen.getByText(/Home/i);
    expect(link).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    RenderWithRouter(<App />);
    const link = screen.getByText(/About/i);
    expect(link).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    RenderWithRouter(<App />);
    const link = screen.getByText(/Favorite Pokémons/i);
    expect(link).toBeInTheDocument();
  });
  test('testa se a aplicação é redirecionada para /', () => {
    const { history, getByRole } = RenderWithRouter(<App />);
    const homeButton = getByRole('link', { name: /Home/i });
    userEvent.click(homeButton);
    expect(history.location.pathname).toEqual('/');
  });
  test('testa se a aplicação é redirecionada para /About', () => {
    const { history, getByRole } = RenderWithRouter(<App />);
    const aboutButton = getByRole('link', { name: /About/i });
    userEvent.click(aboutButton);
    expect(history.location.pathname).toEqual('/about');
  });
  test('testa se é redirecionada para /favorites', () => {
    const { history, getByRole } = RenderWithRouter(<App />);
    const favoritesButton = getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritesButton);
    expect(history.location.pathname).toEqual('/favorites');
  });
  test('este se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/notfound');
    expect(history.location.pathname).toEqual('/notfound');
  });
});
