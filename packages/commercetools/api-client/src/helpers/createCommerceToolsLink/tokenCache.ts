import { Token } from './../../types/setup';
import { onTokenSave, onTokenRemove, onTokenRead } from './../../index';

const storeToken = (token: Token) => {
  onTokenSave(token);
};

const getToken = (): Token => {
  const token = onTokenRead();
  console.log('getToken', token);

  return token;
};

const cleanToken = () => {
  onTokenRemove();
};

export { storeToken, getToken, cleanToken };
