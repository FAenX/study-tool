import { ptfs0u } from "../utils/variables";

const userAuth = () => {
  let token = localStorage.getItem(ptfs0u);
  console.log(token)
  if (!token) {
    return null;
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { userAuth };
