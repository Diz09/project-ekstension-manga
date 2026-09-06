#!/bin/bash

cd /var/www/html

# Menjalankan container Laravel...
until [ -f artisan ]; do
    echo "Project belum siap..."
    sleep 1
done

# Menjalankan Apache...
exec apache2-foreground