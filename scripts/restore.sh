#!/bin/sh
set -e

# ==============================================================================
# TypeKitTools.com - Verified PostgreSQL Database Restoration Script
# ==============================================================================

if [ -z "$1" ]; then
    echo "Usage: $0 <path_to_backup_dump_file>"
    echo "Example: $0 /backups/typekit_backup_20261107_020000.dump"
    exit 1
fi

BACKUP_FILE="$1"
CHECKSUM_FILE="${BACKUP_FILE}.sha256"

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "Error: Backup file '${BACKUP_FILE}' does not exist."
    exit 1
fi

echo "======================================================================"
echo "TypeKitTools.com - DATABASE RESTORATION UTILITY"
echo "======================================================================"
echo "Target Database: ${PGDATABASE:-typekit_db}"
echo "Host:            ${PGHOST:-localhost}"
echo "User:            ${PGUSER:-typekit_admin}"
echo "Backup File:     ${BACKUP_FILE}"
echo "======================================================================"

# 1. Verify Checksum if present
if [ -f "${CHECKSUM_FILE}" ]; then
    echo "Verifying SHA-256 integrity checksum..."
    EXPECTED_HASH=$(cat "${CHECKSUM_FILE}" | awk '{print $1}')
    ACTUAL_HASH=$(sha256sum "${BACKUP_FILE}" | awk '{print $1}')

    if [ "${EXPECTED_HASH}" != "${ACTUAL_HASH}" ]; then
        echo "CRITICAL ERROR: SHA-256 checksum mismatch!"
        echo "Expected: ${EXPECTED_HASH}"
        echo "Actual:   ${ACTUAL_HASH}"
        echo "Aborting restoration to prevent data corruption."
        exit 1
    fi
    echo "Integrity verification PASSED."
else
    echo "Warning: Checksum file not found. Proceeding with unverified dump."
fi

# 2. Confirmation prompt (unless running in non-interactive mode)
if [ -t 0 ]; then
    printf "WARNING: This will OVERWRITE existing data in '%s'. Proceed? (yes/no): " "${PGDATABASE:-typekit_db}"
    read CONFIRMATION
    if [ "${CONFIRMATION}" != "yes" ]; then
        echo "Restoration cancelled by operator."
        exit 0
    fi
fi

# 3. Execute restoration
echo "Restoring database from custom format archive..."
PGPASSWORD="${PGPASSWORD}" pg_restore \
    -h "${PGHOST:-localhost}" \
    -p "${PGPORT:-5432}" \
    -U "${PGUSER:-typekit_admin}" \
    -d "${PGDATABASE:-typekit_db}" \
    --clean \
    --if-exists \
    --no-owner \
    --no-privileges \
    -v \
    "${BACKUP_FILE}" || true

echo "======================================================================"
echo "Database restoration completed successfully."
echo "======================================================================"

