export const isIdIncluded = (favorites, idPub) => {
  return favorites.some((pub) => pub.id === idPub);
};
