# Pantry Chef API 🍳

REST API for searching recipes by ingredients using TheMealDB API. This service helps users find recipes based on ingredients they have in their pantry.

## 🚀 Features

- Search recipes by ingredient
- Get detailed recipe information
- List all available ingredients
- Swagger documentation
- Error handling
- Integration tests

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express
- Jest for testing
- Swagger for API documentation
- Biome for linting and formatting
- Axios for HTTP requests

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/SergioRodas/pantry-chef-api.git
cd pantry-chef-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

## 🚀 Running the Application

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm run build
npm start
```

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests in watch mode
```bash
npm run test:watch
```

## 💅 Code Quality

### Format code
```bash
npm run format
```

### Lint code
```bash
npm run lint
```

### Fix linting issues
```bash
npm run lint:fix
```

### Fix all formatting and linting issues
```bash
npm run fix
```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

### Available Endpoints

- `GET /health` - Health check endpoint
- `GET /api/ingredients` - Get list of all ingredients
- `GET /api/meals/:ingredient` - Get meals by ingredient
- `GET /api/meals/detail/:id` - Get detailed information about a specific meal

## 🏗️ Project Structure

```
src/
├── application/         # Application business logic
│   ├── dtos/           # Data Transfer Objects
│   ├── ports/          # Ports for hexagonal architecture
│   └── services/       # Application services
├── domain/             # Domain entities and business rules
│   ├── entities/       # Domain entities
│   └── exceptions/     # Domain exceptions
├── infrastructure/     # External interfaces and adapters
│   ├── adapters/       # External service adapters
│   ├── config/         # Configuration files
│   ├── controllers/    # API controllers
│   └── middlewares/    # Express middlewares
└── shared/             # Shared resources
    ├── constants/      # Shared constants
    └── exceptions/     # Shared exceptions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/) specification:
   - `feat: Add some feature`
   - `fix: Resolve some bug`
   - `docs: Update documentation`
   - `test: Add tests`
   - `chore: Update dependencies`
   - `refactor: Improve code structure`
   - `style: Format code`
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

- **Sergio Rodas** - [GitHub Profile](https://github.com/SergioRodas)

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the recipe API
