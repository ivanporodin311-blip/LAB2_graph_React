// src/utils/paths.js
export const getImagePath = (path) => {
  // Убираем ведущий слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};