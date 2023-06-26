export const guardarMensaje = async (mensaje) => {
  const contactoMensaje = {
    nombre: mensaje.nombre,
    email: mensaje['email-contacto'],
    asuntoEmail: mensaje.asunto,
    mensaje: mensaje.mensaje,
  };
  try {
    const response = await fetch('http://localhost:8080/api/v1/contacto', {
      method: 'POST',
      body: JSON.stringify(contactoMensaje),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('Se guardó correctamente el mensaje en BD');
    } else {
      console.log('No se guardó correctamente el mensaje en BD');
    }
  } catch (error) {
    console.log(error);
  }
};
