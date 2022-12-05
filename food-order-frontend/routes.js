export const routes = {
  BASE_URL: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/api`,
  FOODS: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/foods`,
  ADD_FOOD: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/foods/create`,
  UPDATE_FOOD: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/foods/update`,
  SHOW_FOOD: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/foods/`,
  DELETE_FOOD: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/foods/delete`,
  LOGIN: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/login`,
  LOGOUT: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/logout`,
  CHECKOUT: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/register`,
  IMAGE: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/foods/image`,
  ORDER: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/order`,
  NEXT_ORDER_STATUS: `${process.env.NEXT_PUBLIC_API_ENVPOINT}/order/update-status`,
};
