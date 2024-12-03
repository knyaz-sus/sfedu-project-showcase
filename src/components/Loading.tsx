import { ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode;
  isLoading: boolean;
}

export function Loading({ children, isLoading }: LoadingProps) {
  return isLoading ? <div>Loading...</div> : children;
}

// import { ReactNode } from "react";

// // Тип данных, который ожидается
// interface LoadingProps {
//   children?: ReactNode;
//   isLoading: boolean;
//   data: any; // Уточните тип данных, которые вы ожидаете
// }

// // Функция-guard, которая проверяет, что данные не null и не undefined
// function isDefined<T>(value: T | undefined | null): value is T {
//   return value !== null && value !== undefined;
// }

// export function Loading({ children, isLoading, data }: LoadingProps) {
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Если data undefined или null, мы ничего не возвращаем или показываем что-то другое
//   if (!isDefined(data)) {
//     return null; // Или можно вернуть какое-то сообщение
//   }

//   return <>{children}</>;
// }
