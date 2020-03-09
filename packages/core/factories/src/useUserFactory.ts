import { ref, Ref, watch, computed } from '@vue/composition-api';
import { UseUser } from '@vue-storefront/interfaces';

export type UseUserFactoryParams<USER, CART, UPDATE_USER_PARAMS> = {
  user: Ref<USER>;
  cart: Ref<CART>;
  getUser: () => Promise<USER>;
  updateUser: (currentUser: USER, params: UPDATE_USER_PARAMS) => Promise<USER>;
  register: (user: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<USER>;
  login: (user: { username: string; password: string }) => Promise<USER>;
  logout: () => Promise<void>;
};

export function useUserFactory<USER, CART, UPDATE_USER_PARAMS>(
  factoryParams: UseUserFactoryParams<USER, CART, UPDATE_USER_PARAMS>
) {
  const user: Ref<USER> = ref({});
  const cart: Ref<CART> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const isAuthenticated = computed(
    () => user.value && Object.keys(user.value).length > 0
  );

  return function useUser(): UseUser<USER, UPDATE_USER_PARAMS> {
    watch(user, async () => {
      if (isAuthenticated.value) {
        return;
      }
      loading.value = true;
      const profile: USER = await factoryParams.getUser();
      user.value = profile.data.me.customer;
      loading.value = false;
    });

    const updateUser = async (params: UPDATE_USER_PARAMS) => {
      loading.value = true;
      const updatedUser = await factoryParams.updateUser(user.value, params);
      user.value = updatedUser;
      loading.value = false;
    };

    const register = async (registerUserData: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }) => {
      loading.value = true;
      const registeredUser = await factoryParams.register(registerUserData);
      user.value = registeredUser;
      loading.value = false;
    };

    const login = async (loginUserData: {
      username: string;
      password: string;
    }) => {
      loading.value = true;
      const loggedUser = await factoryParams.login(loginUserData);
      user.value = loggedUser.user;
      cart.value = loggedUser.cart;
      loading.value = false;
    };

    const logout = async () => {
      user.value = {} as USER;
      cart.value = null;
    };

    return {
      user: computed(() => user.value),
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      loading: computed(() => loading.value)
    };
  };
}
