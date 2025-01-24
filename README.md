
# LogTrek

LogTrek is a modular logging library for Node.js and TypeScript, boldly going where no logs have gone before. Designed for speed, flexibility, and futuristic elegance, LogTrek provides a robust logging solution with plugin-based extensibility and customizable log levels. Whether you're exploring new logging frontiers or managing critical system logs, LogTrek has you covered.

---

## Features

- **Modular Design**: Easily extend functionality by creating custom plugins.
- **Built-in Plugins**: Supports console and file-based logging out of the box.
- **Customizable Log Levels**: Fine-tune which logs are displayed or written.
- **TypeScript Support**: Strongly typed for a seamless developer experience.
- **Test-First Philosophy**: All features are required to have corresponding tests.

---

## Installation

Install LogTrek via npm:

```bash
npm install logtrek
```

---

## Usage

### Basic Example

```typescript
import { Logger } from 'logtrek';

const logger = new Logger('info', 'console');

logger.info('This is an informational message');
logger.warn('This is a warning');
logger.error('This is an error message');
```

### File-Based Logging

```typescript
const logger = new Logger('warn', 'file', { location: '/var/log/app.log' });

logger.warn('Warning: Disk space is low');
logger.error('Error: Disk write failed');
```

### Custom Log Levels

```typescript
const logger = new Logger('debug', 'console');

logger.debug('Debugging information');
logger.info('Operational message');
logger.error('Critical error occurred');
```

---

## Development

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/logtrek.git
   cd logtrek
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Run tests:

   ```bash
   npm test
   ```

### Project Structure

```plaintext
logtrek/
├── src/               # Source code
│   ├── logger.ts      # Core Logger implementation
│   ├── pluginLoader.ts # Plugin loader
│   ├── plugins/       # Built-in plugins (console, file)
├── tests/             # Test cases
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
├── dist/              # Compiled output
├── README.md          # Project documentation
├── package.json       # Project metadata
└── tsconfig.json      # TypeScript configuration
```

---

## Creating a New Plugin

Plugins allow you to extend LogTrek's functionality. Follow these steps to create a custom plugin:

### 1. Define Your Plugin

Create a new file in the `src/plugins/` directory:

```typescript
import { LoggerPlugin, LogLevel } from '../types';

const customPlugin: LoggerPlugin = {
    pluginType: 'custom',
    configure: (options: Record<string, any>) => {
        console.log('Custom plugin configured with options:', options);
    },
    write: (level: LogLevel, message: string, meta?: Record<string, any>) => {
        console.log(`[${level.toUpperCase()}]: ${message}`, meta);
    },
};

export default customPlugin;
```

### 2. Use the Plugin

```typescript
const logger = new Logger('info', 'custom');
logger.info('Using the custom plugin!');
```

---

## Writing Tests

All features must have corresponding tests. This is a core philosophy of LogTrek to ensure reliability and maintainability.

### Running Tests

```bash
npm test
```

### Writing Unit Tests

Place your unit tests in the `tests/unit/` directory. Example:

```typescript
import { Logger } from '../../src/logger';

describe('Logger', () => {
    it('should log messages at the correct level', () => {
        const logger = new Logger('info', 'console');
        logger.info('This is a test');
    });
});
```

### Writing Integration Tests

Place integration tests in the `tests/integration/` directory. Example:

```typescript
import { Logger } from '../../src/logger';

describe('Integration Test', () => {
    it('should log to the console and file', () => {
        const logger = new Logger('warn', 'file', { location: 'test.log' });
        logger.warn('Integration test message');
    });
});
```

---

## Contributing

### Guidelines

1. **Test Coverage:** Every new feature must have corresponding tests. No feature is complete without tests.
2. **Code Style:** Follow the existing code style and conventions.
3. **Pull Requests:** Include a description of your changes and why they are necessary.

### Development Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Make your changes and write tests.
3. Run tests to ensure everything works:
   ```bash
   npm test
   ```
4. Commit your changes:
   ```bash
   git commit -m "Add my new feature"
   ```
5. Push your branch:
   ```bash
   git push origin feature/my-new-feature
   ```
6. Open a pull request on GitHub.

---

## License

LogTrek is licensed under the [MIT License](LICENSE).