// src/hooks/useAssetPath.js
export const useAssetPath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  
  const getPath = (path) => {
    // Убираем начальный слеш, если есть
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}${cleanPath}`;
  };
  
  return { getPath, baseUrl };
};