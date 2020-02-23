import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, AddressInput } from '../../types/GraphQL';
import { setShippingAddressAction } from '../../helpers/cart/actions';

const updateShippingDetails = async (cart: Cart, shippingDetails: AddressInput): Promise<CartResponse> => {
  const cartResponse = await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [setShippingAddressAction(shippingDetails)]
  });

  return cartResponse;
};

export default updateShippingDetails;
