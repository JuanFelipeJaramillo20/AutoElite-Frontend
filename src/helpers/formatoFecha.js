export const formatearFecha = (fecha) => {
  const formatoFecha = new Date(fecha);
  const año = formatoFecha.getFullYear();
  const mes = formatoFecha.getMonth() + 1;
  const dia = formatoFecha.getDate();
  const horas = formatoFecha.getHours();
  const minutos = formatoFecha.getMinutes();
  const segundos = formatoFecha.getSeconds();
  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
};
