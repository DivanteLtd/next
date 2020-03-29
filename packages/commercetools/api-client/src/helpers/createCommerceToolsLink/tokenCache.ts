import { Token } from './../../types/setup';
import { onTokenSave, onTokenRemove, onTokenRead } from './../../index';

const storeToken = (token: Token) => {
  onTokenSave(token);
};

const getToken = (): Token => {
  return onTokenRead();
};

const cleanToken = () => {
  onTokenRemove();
};

export { storeToken, getToken, cleanToken };
