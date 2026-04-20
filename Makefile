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

ssh-api: ## SSH into the API container
	$(COMPOSE) exec backend sh

ssh-fe: ## SSH into the frontend container
	$(COMPOSE) exec frontend sh

ssh-db: ## SSH into the database container
	$(COMPOSE) exec postgres sh

lint: ## Run linters for both backend and frontend
	$(COMPOSE) exec backend npm run lint
	$(COMPOSE) exec frontend npm run lint

test: ## Run tests for both backend and frontend
	$(COMPOSE) exec backend npm run test
	$(COMPOSE) exec frontend npm run test

migrate: ## Run database migrations
	$(COMPOSE) exec backend npm run db:generate	
	$(COMPOSE) exec backend npm run db:migrate



