import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function RenderWithRouter(component) {
  const modifiedHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ modifiedHistory }>{component}</Router>,
  );

  return {
    history: modifiedHistory,
    ...returnFromRender,
  };
}

export default RenderWithRouter;
