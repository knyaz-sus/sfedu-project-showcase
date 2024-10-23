export function getPointsWord(num: number) {
  const num1 = Math.abs(num);

  const lastDigit = num1 % 10;
  const lastTwoDigits = num1 % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "баллов";
  } else if (lastDigit === 1) {
    return "балл";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return "балла";
  } else {
    return "баллов";
  }
}
