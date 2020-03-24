import { apiClientFactory } from '../src';

describe('[CORE - factories] apiClientFactory', () => {
  it('Should return passed config with overrides property', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { getSettings } = apiClientFactory<any, any>(params);

    expect(getSettings()).toEqual({
      option: 'option',
      overrides: {}
    });
  });

  it('Should merge with default settings when setup is called', () => {
    const params = {
      onSetup: jest.fn(),
      defaultSettings: { option: 'option' }
    };

    const { setup, getSettings } = apiClientFactory<any, any>(params);

    setup({ newOption: 'newOption'});

    expect(getSettings()).toEqual({
      option: 'option',
      newOption: 'newOption',
      overrides: {}
    });
  });
});
