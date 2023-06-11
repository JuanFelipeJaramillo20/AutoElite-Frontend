export const logIn = async (userData) => {
  const response = await fetch('http://localhost:8080/api/v1/userlogin', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!result.successful) {
    return 'Hubo un error';
  }

  return result;
};
