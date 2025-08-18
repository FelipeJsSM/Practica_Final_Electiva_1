BookApp – DevOps Pipeline (Node/Express + SQLite + Docker)

App web de gestión de libros (HBS + Express + Sequelize + Multer) con pipeline DevOps y monitoreo.

1) Qué incluye

Funcionalidad: CRUD de Libros, Autores, Categorías y Editoriales (con imagen).

Salud/Métricas: /health y /metrics (Prometheus).

Contenedores: App + Prometheus + Grafana (Docker Compose).

CI/CD: Lint + Tests + Build + Healthcheck + Push a Docker Hub (GitHub Actions).

Alertas: UptimeRobot vía túnel (ngrok/cloudflared).

Persistencia: ./database (SQLite) y ./public/images (uploads).

2) Arranque rápido

# Docker Compose
docker compose up -d
# App:      http://localhost:8200
# Prom:     http://localhost:9090
# Grafana:  http://localhost:3000

Variables (crear .env a partir de .env.example):

PORT=8200
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_app_password
NODE_ENV=development

Scripts:

npm run lint
npm test
npm start

3) Endpoints clave

GET /health → {"status":"ok"}

GET /metrics → métricas Prometheus

4) Web App (resumen funcional)

Crear Autor, Categoría, Editorial.

Crear Libro con imagen (Multer guarda en public/images).

Listar/editar/eliminar libros (se muestran relaciones e imagen).

5) Monitoreo

Prometheus (docker/prometheus/prometheus.yml):

scrape_configs:
  - job_name: bookapp
    static_configs: [{ targets: ['app:8200'] }]
    metrics_path: /metrics


Grafana: datasource Prometheus → http://prometheus:9090.
Paneles sugeridos: requests/s, p95 latency, error rate.

6) CI/CD (GitHub Actions → Docker Hub)

Secrets del repo:

DOCKERHUB_USERNAME

DOCKERHUB_TOKEN

Pipeline: checkout → npm ci → lint/tests → build → healthcheck → push (<usuario>/bookapp:latest).

7) Alertas rápidas (sin servidor)

ngrok: ngrok http 8200 → usar https://<subdominio>.ngrok-free.app/health en UptimeRobot.

o cloudflared: cloudflared tunnel --url http://localhost:8200.

8) Evidencias mínimas (para documento)

Actions en verde (lint, tests, build, push).

Docker Hub con latest.

docker compose ps (app/prom/grafana Up/healthy).

/health y /metrics OK.

Prometheus Targets UP y dashboard Grafana.

UptimeRobot: monitor UP y logs DOWN/UP (prueba de caída).

CRUD con imagen visible en listado.

9) Operación

docker compose logs -f app
docker compose restart app
# backups: ./database ; uploads: ./public/images
