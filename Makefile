SHELL := /bin/bash
.DEFAULT_GOAL := help

COMPOSE := docker compose

.PHONY: help up down restart build pull logs ps clean \
	backend-install backend-dev backend-build backend-test backend-generate backend-migrate \
	frontend-install frontend-dev frontend-build frontend-lint \
	backend-shell frontend-shell db-shell \
	install lint test build-all

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-22s %s\n", $$1, $$2}'

up: ## Start all services with Docker Compose
	$(COMPOSE) up --build

down: ## Stop all services
	$(COMPOSE) down

restart: ## Restart all services
	$(COMPOSE) down && $(COMPOSE) up --build

build: ## Build Docker images
	$(COMPOSE) build

pull: ## Pull Docker images
	$(COMPOSE) pull

logs: ## Tail Docker Compose logs
	$(COMPOSE) logs -f --tail=100

ps: ## List running services
	$(COMPOSE) ps

backend-shell: ## Open a shell in the backend container
	$(COMPOSE) exec backend /bin/sh

frontend-shell: ## Open a shell in the frontend container
	$(COMPOSE) exec frontend /bin/sh

db-shell: ## Open a shell in the Postgres container
	$(COMPOSE) exec postgres /bin/sh

clean: ## Stop services and remove volumes
	$(COMPOSE) down -v --remove-orphans

backend-install: ## Install backend dependencies
	cd backend && npm install

backend-dev: ## Run backend in dev mode
	cd backend && npm run dev

backend-build: ## Build backend
	cd backend && npm run build

backend-test: ## Run backend tests
	cd backend && npm run test

backend-generate: ## Generate database migrations
	cd backend && npm run db:generate

backend-migrate: ## Run database migrations
	cd backend && npm run db:migrate

frontend-install: ## Install frontend dependencies
	cd frontend && npm install

frontend-dev: ## Run frontend in dev mode
	cd frontend && npm run dev

frontend-build: ## Build frontend
	cd frontend && npm run build

frontend-lint: ## Lint frontend
	cd frontend && npm run lint

install: backend-install frontend-install ## Install all dependencies

lint: frontend-lint ## Run all linters

test: backend-test ## Run all tests

build-all: backend-build frontend-build ## Build all apps
