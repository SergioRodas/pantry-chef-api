export const API_URLS = {
  BASE_URL: process.env.MEALDB_BASE_URL,
  ENDPOINTS: {
    LIST_INGREDIENTS: '/list.php?i=list',
    FILTER_BY_INGREDIENT: '/filter.php?i=',
    MEAL_DETAIL: '/lookup.php?i=',
  },
} as const;
