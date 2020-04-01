# Composable relations

## Motivation

By injecting composables to the others we can achieve an open to extensions dependency management.

## Case study

We have two composables:

- useUser
- useUserAddress

We use GraphQL CommerceTools and in this case editting user's addresses is through the user collection. This approach require update the user object after each modifications in their adresses. That means we need access to user entity through useUserAddress composable


### Current approach

In order to get access to the user through the useUserAddress we need to following changes (please treat this more as a pseudo code, rather than a strict one):

```TS
// useUser composable
export const user = ref(null);
```

```TS
// useUserAddress composable
import { user } from 'useUserComposable';

export const params = {
  addAddress: (address) => {
    const addresses = await addNewAddressGraphQL(address);

    user.value = { ...user.value, addresses };

    return addresses;
  }
};
```

As we see, this approach has some overcomplexity solutions:
- mutations in factories and composables as well
- the user object is now public and anyone can avoid the architecture principles
- too much logic in composables. The solution is not agnostic anymore

### Proposed approach

Instead of exporting the user object, we can inject an optional (or not) useUser composable through factory params. We can also define logic depending on is useUser provided or not.

Examples:

```TS
//  useUser composable

const user = ref(null); // user object is now a private property
```

```TS
// useUserAddressFactory

interface UseUserAddressFactoryParams {
  userComposable?: UseUser<USER, USER_UPDATE_PARAMS>;
  addAddress: { userUpdated: USER, addressesUpdated: ADDRESS[] }
}

export function useUserAddressFactory {
  return {
    userComposable: useUser(),
    addAddress: (address) => {
      const { userUpdated, adressessUpdated } = await factoryParams.addAddress(address);

      addresses.value = addresses;
      userComposable && userComposable.updateUser(userUpdated);
    }
  };
}
```

This approach fixes below problems:
- No mutations in composables
- No mixed or overcomplexity logic
- User object is now a private property
- injecting interfaces instead of implementations (dependency inversion)
- Fully agnostic
- Flexible relations (for example: you can easily use different authentication method for your useUser composable)
- Good foundations to create dependency injection container for composables 
