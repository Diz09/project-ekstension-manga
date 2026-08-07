#!/bin/bash

cd /var/www/html

echo "Menjalankan container Laravel..."

cd /var/www/html

echo "Menunggu project mount..."

# until [ -f artisan ]; do
#     echo "Project belum siap..."
#     sleep 1
# done

php artisan migrate --force || true

if [ ! -f .env ]; then
    echo ".env tidak ditemukan, membuat dari .env.example"
    cp .env.example .env
else
    echo ".env ditemukan"
fi

if [ ! -d vendor ]; then
    echo "Vendor tidak ditemukan, menjalankan composer install..."
    composer install
fi

if ! grep -q "^APP_KEY=base64:" .env; then
    echo "APP_KEY belum ada, generate key..."
    php artisan key:generate
fi

echo "Membersihkan cache Laravel..."

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "Menunggu database siap..."

until php artisan migrate --force; do
  echo "Database belum siap, tunggu 3 detik..."
  sleep 3
done

# echo "Mengatur permission..."

# chown -R www-data:www-data storage bootstrap/cache
# chmod -R 775 storage bootstrap/cache

echo "Mengatur permission..."

chmod -R 775 storage bootstrap/cache || true

echo "Menjalankan Apache..."

apache2-foreground