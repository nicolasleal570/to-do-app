export default function validateString(str: any, canUseSpaces = false) {
  if (!String(str)) {
    return false;
  }

  if (canUseSpaces) {
    const regexWithSpace = /^[a-zA-ZÀ-ú ]+$/;
    return regexWithSpace.test(str);
  }

  const regexWithoutSpace = /^[a-zA-ZÀ-ú]+$/;
  return regexWithoutSpace.test(str);
}
