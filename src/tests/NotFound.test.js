import React from 'react';
import { NotFound } from '../components';
import RenderWithRouter from '../utils/RenderWithRouter';

describe('Teste o componente NotFound', () => {
  test('Teste se página contém um heading h2', () => {
    const { getByRole } = RenderWithRouter(<NotFound />);
    const notFoundText = getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { getByRole } = RenderWithRouter(<NotFound />);
    const imageNotFound = getByRole('img', { name: 'Pikachu crying because the '
    + 'page requested was not found' });
    const linkImgNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound).toHaveAttribute('src', linkImgNotFound);
  });
});
