export const API_URLS = {
  BASE_URL: process.env.MEALDB_BASE_URL,
  ENDPOINTS: {
    LIST_INGREDIENTS: '/list.php?i=list',
  },
} as const;
