import { tokenEvents } from './../../index';

const customerSignOut = async (): Promise<void> => {
  tokenEvents.onTokenRemove();
};

export default customerSignOut;
