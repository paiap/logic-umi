import { createContext, useContext } from 'react';

export const Context = createContext(null);
export function useRootExports() {
  return useContext(Context);
};