export function cropString(str: string, n: number) {
  str = str ?? "";
  if (str.length > n) {
    return str.substring(0, n - 3) + "...";
  } else {
    return str;
  }
}
