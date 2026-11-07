#!/bin/sh
set -e

# ==============================================================================
# TypeKitTools.com - Automated PostgreSQL Backup Script
# ==============================================================================

BACKUP_DIR="${BACKUP_DIR:-/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILENAME="typekit_backup_${TIMESTAMP}.dump"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILENAME}"
CHECKSUM_PATH="${BACKUP_PATH}.sha256"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting automated database backup..."

# Ensure target directory exists
mkdir -p "${BACKUP_DIR}"

# 1. Execute compressed PostgreSQL custom format dump
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Executing pg_dump for database '${PGDATABASE:-typekit_db}'..."
PGPASSWORD="${PGPASSWORD}" pg_dump \
    -h "${PGHOST:-localhost}" \
    -p "${PGPORT:-5432}" \
    -U "${PGUSER:-typekit_admin}" \
    -d "${PGDATABASE:-typekit_db}" \
    -F c \
    -b \
    -v \
    -f "${BACKUP_PATH}"

# 2. Generate SHA-256 Checksum for Data Integrity Verification
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Generating SHA-256 verification checksum..."
sha256sum "${BACKUP_PATH}" | awk '{print $1}' > "${CHECKSUM_PATH}"

BACKUP_SIZE=$(du -h "${BACKUP_PATH}" | awk '{print $1}')
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup created successfully: ${BACKUP_FILENAME} (${BACKUP_SIZE})"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Checksum: $(cat "${CHECKSUM_PATH}")"

# 3. Clean up older backups exceeding retention policy
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Pruning backups older than ${KEEP_DAYS} days..."
find "${BACKUP_DIR}" -type f -name "typekit_backup_*.dump" -mtime +"${KEEP_DAYS}" -exec rm -f {} +
find "${BACKUP_DIR}" -type f -name "typekit_backup_*.sha256" -mtime +"${KEEP_DAYS}" -exec rm -f {} +

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup routine completed successfully."

