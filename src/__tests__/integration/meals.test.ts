import { API_URLS } from '../../shared/constants/api.constants';
import { api } from './setup';
import nock from 'nock';

describe('Meals API Integration Tests', () => {
  describe('GET /api/ingredients', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a list of ingredients', async () => {
      const response = await api.get('/api/ingredients');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      // Validar estructura del ingrediente
      const ingredient = response.body[0];
      expect(ingredient).toHaveProperty('id');
      expect(ingredient).toHaveProperty('name');
      expect(ingredient).toHaveProperty('description');
      expect(ingredient).toHaveProperty('type');
    });

    it('should handle API errors gracefully', async () => {
      // Mockear la llamada a la API externa para forzar un error
      nock('https://www.themealdb.com')
        .get('/api/json/v1/1/list.php?i=list')
        .replyWithError('API is down');

      const response = await api.get('/api/ingredients');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Failed to fetch ingredients');
    });
  });

  describe('GET /api/meals/:ingredient', () => {
    it('should return meals for a valid ingredient', async () => {
      const response = await api.get('/api/meals/chicken');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      // Validar estructura de la comida
      const meal = response.body[0];
      expect(meal).toHaveProperty('id');
      expect(meal).toHaveProperty('name');
      expect(meal).toHaveProperty('thumbnail');
    });

    it('should return 400 for empty ingredient', async () => {
      // Probar solo con la ruta correcta
      const response = await api.get('/api/meals/%20');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Ingredient is required');
    });

    it('should return empty array for non-existent ingredient', async () => {
      const response = await api.get('/api/meals/nonexistentingredient123456');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /api/meals/detail/:id', () => {
    let validMealId: string;

    beforeAll(async () => {
      // Obtener un ID válido para usar en los tests
      const mealsResponse = await api.get('/api/meals/chicken');
      validMealId = mealsResponse.body[0].id;
    });

    it('should return meal details for valid ID', async () => {
      const response = await api.get(`/api/meals/detail/${validMealId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', validMealId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('category');
      expect(response.body).toHaveProperty('area');
      expect(response.body).toHaveProperty('instructions');
      expect(response.body).toHaveProperty('ingredients');
      expect(Array.isArray(response.body.ingredients)).toBe(true);

      // Validar estructura de los ingredientes
      const ingredient = response.body.ingredients[0];
      expect(ingredient).toHaveProperty('name');
      expect(ingredient).toHaveProperty('measure');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await api.get('/api/meals/detail/invalid-id');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 for non-existent meal', async () => {
      const response = await api.get('/api/meals/detail/99999999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /health', () => {
    it('should return 200 OK', async () => {
      const response = await api.get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });
  });
});
