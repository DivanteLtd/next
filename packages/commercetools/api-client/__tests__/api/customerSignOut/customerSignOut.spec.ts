import customerSignOut from './../../../src/api/customerSignOut';
import { tokenEvents } from './../../../src/index';

describe('[commercetools-api-client] customerSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears user session', async () => {
    await customerSignOut();

    expect(tokenEvents.onTokenRemove).toBeCalled();
  });
});
