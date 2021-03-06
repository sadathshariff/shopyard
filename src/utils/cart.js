export const addToCart = async (product, cartDispatch, postToCart) => {
  try {
    const newCart = await postToCart(product);
    if (newCart) {
      cartDispatch({ type: "ADD_TO_CART", payload: newCart });
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = async (id, cartDispatch, deleteFromCart) => {
  try {
    const deletedItem = await deleteFromCart(id);
    if (deletedItem) {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: deletedItem });
    }
  } catch (err) {
    console.log(err);
  }
};
export const updateProductQty = async (
  id,
  type,
  cartDispatch,
  updateCartQty
) => {
  try {
    const updatedCart = await updateCartQty(id, type);
    if (updatedCart) {
      cartDispatch({ type: "UPDATE_QTY", payload: updatedCart });
    }
  } catch (error) {
    console.error(error);
  }
};
