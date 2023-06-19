export const createImgBlob = (arrayBytes) => {
  if (arrayBytes !== null) {
    const byteNumbers = new Uint8Array(arrayBytes);
    const blob = new Blob([byteNumbers], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }
  return '';
};
