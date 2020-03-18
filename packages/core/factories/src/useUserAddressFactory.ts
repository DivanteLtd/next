import { UseUserAddress } from '@vue-storefront/interfaces';
import { Ref, ref, computed } from '@vue/composition-api';

export type UseUserAddressFactoryParams<ADDRESS> = {
  addresses: ADDRESS[];
  searchAddresses: (params?: {
    [x: string]: any;
  }) => Promise<ADDRESS[]>;
  addAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  getBillingAddresses: () => ADDRESS[];
  getShippingAddresses: () => ADDRESS[];
}

export function useUserAddressFactory<ADDRESS> (factoryParams: UseUserAddressFactoryParams<ADDRESS>) {
  const loading: Ref<boolean> = ref(false);

  const searchAddresses = async (params) => {
    loading.value = true;
    await factoryParams.searchAddresses(params).then(addresses => {
      factoryParams.addresses.length = 0;
      addresses.forEach(address => factoryParams.addresses.push(address));
    });
    loading.value = false;
  };

  const getBillingAddresses = () => factoryParams.getBillingAddresses();

  const getShippingAddresses = () => factoryParams.getShippingAddresses();

  const addAddress = async () => console.log('useUserAddressFactory::addAddress');

  const deleteAddress = async () => console.log('useUserAddressFactory::deleteAddress');

  const updateAddress = async () => console.log('useUserAddressFactory::updateAddress');

  return function useUserAddress(): UseUserAddress<ADDRESS> {
    return {
      addresses: computed(() => factoryParams.addresses),
      searchAddresses,
      addAddress,
      updateAddress,
      deleteAddress,
      getBillingAddresses,
      getShippingAddresses,
      loading
    };
  };
}
