import { onTokenRemove } from './../../index';

const customerSignOut = async (): Promise<void> => {
  onTokenRemove();
};

export default customerSignOut;
