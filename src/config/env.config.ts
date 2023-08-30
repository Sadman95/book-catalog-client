export const envConfig = {
  apiUrl:
    import.meta.env.NODE_ENV !== 'development'
      ? import.meta.env.VITE_APP_LIVE_URL
      : import.meta.env.VITE_APP_LOCAL_URL,
};
