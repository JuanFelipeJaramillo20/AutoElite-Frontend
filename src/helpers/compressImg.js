import Compressor from 'compressorjs';
export const compressImage = async (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
};
