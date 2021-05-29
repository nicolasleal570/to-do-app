export default function validateString(str: any) {
  if (!String(str)) {
    return false;
  }

  const regex = /^[a-zA-ZÀ-ú]+$/;
  return regex.test(str);
}
