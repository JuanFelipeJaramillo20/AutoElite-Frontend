export const guardarImagen = async (files) => {
  const urlImages = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fotoCarros');
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dxej0w19x/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    const result = await response.json();
    if (response.ok) {
      urlImages.push(result.secure_url);
    }
  }

  return urlImages;
};
