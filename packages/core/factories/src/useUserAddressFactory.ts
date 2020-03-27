import { UseUserAddress, UserAddressType } from '@vue-storefront/interfaces';
import { useUser } from '@vue-storefront/commercetools-composables';
import { Ref, ref, computed } from '@vue/composition-api';
import { Customer } from 'commercetools/api-client/lib/src/types/GraphQL';

export interface UpdatedUserAddresses<USER, ADDRESS> {
  addresses: ADDRESS[];
  user?: USER;
}

export type UseUserAddressFactoryParams<
  USER,
  ADDRESS,
  ADDRESS_TYPE = UserAddressType,
  SEARCH_PARAMS = { [x: string]: any }
> = {
  addresses: ADDRESS[];
  loading: Ref<boolean>;
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<ADDRESS[]>;
  addAddress: (address: ADDRESS, type: ADDRESS_TYPE) => Promise<UpdatedUserAddresses<USER, ADDRESS>>;
  deleteAddress: (address: ADDRESS) => Promise<UpdatedUserAddresses<USER, ADDRESS>>;
  updateAddress: (address: ADDRESS) => Promise<UpdatedUserAddresses<USER, ADDRESS>>;
  getBillingAddresses: () => ADDRESS[];
  getShippingAddresses: () => ADDRESS[];
}

export function useUserAddressFactory<USER, ADDRESS, ADDRESS_TYPE = UserAddressType, SEARCH_PARAMS = { [x: string]: any }> (factoryParams: UseUserAddressFactoryParams<USER, ADDRESS, ADDRESS_TYPE, SEARCH_PARAMS>) {
  const loading: Ref<boolean> = ref(false);

  const { updateUser } = useUser();

  const updateData = (data: UpdatedUserAddresses<USER, ADDRESS>) => {
    factoryParams.addresses.length = 0;
    data.addresses.forEach(address => factoryParams.addresses.push(address));
    // TODO: waiting for user factory
    data.user && updateUser(data.user as any as Customer);

    loading.value = false;
  };

  const logError = (error: any) => {
    console.log(error);
    loading.value = false;

    throw error;
  };

  const searchAddresses = async (params) => {
    loading.value = true;

    const addresses = await factoryParams.searchAddresses(params);

    updateData({ addresses });

    loading.value = false;
  };

  const getBillingAddresses = () => factoryParams.getBillingAddresses();

  const getShippingAddresses = () => factoryParams.getShippingAddresses();

  const addAddress = async (address: ADDRESS, type: ADDRESS_TYPE) => {
    loading.value = true;

    await factoryParams.addAddress(address, type)
      .then(updateData)
      .catch(logError);
  };

  const deleteAddress = async (address) => {
    loading.value = true;

    await factoryParams.deleteAddress(address)
      .then(updateData)
      .catch(logError);
  };

  const updateAddress = async (address) => {
    loading.value = true;
    await factoryParams.updateAddress(address)
      .then(updateData)
      .catch(logError);
  };

  return function useUserAddress(): UseUserAddress<ADDRESS, ADDRESS_TYPE> {
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
