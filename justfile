# List available commands
default:
    @just --list

# Install dependencies
install:
    bun install

# Start development server
dev:
    bun dev

# Build for production
build:
    bun run build

# Start production server
start:
    bun start

# Run linter
lint:
    bun lint

# Format code
format:
    bun run format

# Clean build artifacts
clean:
    rm -rf .next node_modules
