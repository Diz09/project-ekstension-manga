#!/bin/bash

cd /var/www/html

echo "Menjalankan container Laravel..."

until [ -f artisan ]; do
    echo "Project belum siap..."
    sleep 1
done

echo "Menjalankan Apache..."

exec apache2-foreground