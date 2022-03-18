export default function time() {
  const date = new Date();
  const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
  const month = date.getMonth() > 8 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const year = `${date.getFullYear()}`;
  const hour = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
  const min = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const fullDate = `${day}.${month}.${year}  ${hour}:${min}`;
  return fullDate;
}
