#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# deploy-prod-latest.sh
# Pull latest changes, rebuild production containers, and seed the admin table.
# ---------------------------------------------------------------------------
set -euo pipefail

COMPOSE_FILE="docker-compose.prod.yml"
SEED_IMAGE="ateserol_seed_runner"
# Docker Compose creates a default network named <project-dir>_default.
# The project directory name must match what Compose resolves on this host.
COMPOSE_PROJECT="ateserol-website"
DOCKER_NETWORK="${COMPOSE_PROJECT}_default"

# Load .env so we can forward variables to the seed runner
if [[ -f .env ]]; then
  # Export only lines that are assignments (skip comments and blanks)
  set -a
  # shellcheck source=/dev/null
  source .env
  set +a
fi

POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-postgres}"
SESSION_SECRET="${SESSION_SECRET:-change-me-in-production}"
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://example.com}"
ADMIN_EMAIL="${ADMIN_EMAIL:-ateserol@vitriolacademy.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"

echo "=========================================="
echo "  PRODUCTION DEPLOYMENT — $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="

# ---------------------------------------------------------------------------
# 1. Pull latest code from GitHub
# ---------------------------------------------------------------------------
echo ""
echo "[1/4] Pulling latest changes from GitHub..."
git pull origin "$(git rev-parse --abbrev-ref HEAD)"

# ---------------------------------------------------------------------------
# 2. Build and (re)start production containers
# ---------------------------------------------------------------------------
echo ""
echo "[2/4] Building and starting production containers..."
docker compose -f "$COMPOSE_FILE" up --build -d

# ---------------------------------------------------------------------------
# 3. Wait until Postgres is accepting connections
# ---------------------------------------------------------------------------
echo ""
echo "[3/4] Waiting for the database to become healthy..."
RETRIES=30
until docker compose -f "$COMPOSE_FILE" exec -T db pg_isready -U postgres -q 2>/dev/null; do
  RETRIES=$((RETRIES - 1))
  if [[ $RETRIES -le 0 ]]; then
    echo "ERROR: Database did not become healthy in time." >&2
    exit 1
  fi
  echo "  ...still waiting ($RETRIES attempts left)"
  sleep 2
done
echo "  Database is ready."

# ---------------------------------------------------------------------------
# 3b. Fix uploads directory ownership (idempotent — safe on every deploy)
# ---------------------------------------------------------------------------
echo ""
echo "[3b] Ensuring /app/uploads is writable by the app user..."
docker compose -f "$COMPOSE_FILE" exec -T --user root app \
  sh -c "mkdir -p /app/uploads && chown -R 1001:1001 /app/uploads && chmod 755 /app/uploads"
echo "  Uploads directory is ready."

# ---------------------------------------------------------------------------
# 4. Run database seed using the builder image (has full node_modules + tsx)
# ---------------------------------------------------------------------------
echo ""
echo "[4/4] Running database seed (admin table)..."

# Build only the builder stage so we have tsx and all dependencies available.
docker build --target builder -t "$SEED_IMAGE" .

docker run --rm \
  --network "$DOCKER_NETWORK" \
  -e DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/ateserol_prod" \
  -e ADMIN_EMAIL="$ADMIN_EMAIL" \
  -e ADMIN_PASSWORD="$ADMIN_PASSWORD" \
  -e NODE_ENV=production \
  "$SEED_IMAGE" \
  npm run db:seed

# Clean up the temporary seed image to save disk space
docker rmi "$SEED_IMAGE" --force > /dev/null 2>&1 || true

echo ""
echo "=========================================="
echo "  Deployment complete!"
echo "  App is running at ${NEXT_PUBLIC_SITE_URL}"
echo "=========================================="
