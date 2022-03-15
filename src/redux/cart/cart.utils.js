let _ = require("underscore");

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToAdd.id &&
      _.isEqual(cartItem.chosenAttributes, cartItemToAdd.chosenAttributes)
  );

  let sameCartItemAttributes = false;

  if (existingCartItem?.hasOwnProperty("chosenAttributes")) {
    if (existingCartItem.chosenAttributes !== {}) {
      sameCartItemAttributes = _.isEqual(
        existingCartItem.chosenAttributes,
        cartItemToAdd.chosenAttributes
      );
    }
  }

  let existingEmptyCartItem = cartItems.find((cartItem) => {
    return (
      cartItem.id === cartItemToAdd.id &&
      _.isEqual(cartItem.chosenAttributes, {}) &&
      !cartItemToAdd.hasOwnProperty("chosenAttributes")
    );
  });

  if (existingCartItem && sameCartItemAttributes) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id &&
      _.isEqual(cartItem.chosenAttributes, cartItemToAdd.chosenAttributes)
        ? { ...cartItem, quantity: (cartItem.quantity += 1) }
        : cartItem
    );
  }

  if (existingEmptyCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id &&
      _.isEqual(cartItem.chosenAttributes, {})
        ? { ...cartItem, quantity: (cartItem.quantity += 1) }
        : cartItem
    );
  }

  if (!existingCartItem && !cartItemToAdd.hasOwnProperty("chosenAttributes")) {
    return [
      ...cartItems,
      { ...cartItemToAdd, quantity: 1, chosenAttributes: {} },
    ];
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToRemove.id &&
      cartItem.chosenAttributes === cartItemToRemove.chosenAttributes
  );

  const existingCartItemAttributes = existingCartItem?.attributes.find(
    (attr) =>
      existingCartItem.chosenAttributes[attr.name] ===
      cartItemToRemove.chosenAttributes[attr.name]
  );

  if (
    existingCartItem.quantity === 1 &&
    (existingCartItemAttributes || existingCartItem.attributes.length === 0)
  ) {
    return cartItems.filter(
      (cartItem) =>
        cartItem.chosenAttributes !== cartItemToRemove.chosenAttributes
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id &&
    cartItem.chosenAttributes === cartItemToRemove.chosenAttributes
      ? { ...cartItem, quantity: (cartItem.quantity -= 1) }
      : cartItem
  );
};

export const editItemOnCart = (cartItems, itemToChange) => {
  const updatedCartItems = cartItems.map((item) => {
    // if (
    //   _.isEqual(
    //     item.chosenAttributes,
    //     itemToChange.previousStateChosenAttributes
    //   )
    // ) {
    //   delete itemToChange.previousStateChosenAttributes;
    //   return itemToChange;
    // } else {
    //   return item;
    // }

    if (
      _.isEqual(
        item.chosenAttributes,
        itemToChange?.previousStateChosenAttributes
      )
    ) {
      let existingCartItemWithSameChosenAttributesAsItemToChange = _.find(
        cartItems,
        function (fItem) {
          return _.isEqual(
            fItem.chosenAttributes,
            itemToChange.chosenAttributes
          );
        }
      );

      if (existingCartItemWithSameChosenAttributesAsItemToChange) {
        alert("You already have an item with same attributes");
        return item;
      }
      return itemToChange;
    }
    return item;
  });

  return updatedCartItems;
};
