import { apiClientFactory } from '../src';

describe('[CORE - factories] apiClientFactory', () => {
  it('Should return passed config with overrides property', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { settings } = apiClientFactory<any, any>(params);

    expect(settings).toEqual({
      option: 'option',
      overrides: {}
    });
  });

  it('Should merge with default settings when setup is called', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { setup, settings } = apiClientFactory<any, any>(params);

    setup({ newOption: 'newOption '});

    expect(settings).toEqual({
      option: 'option',
      newOption: 'newOption',
      overrides: {}
    });
  });
});
