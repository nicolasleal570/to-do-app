/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import UserContextProvider from '../context/UserContext';

const Providers = ({ children }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
