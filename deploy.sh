cd /var/www/real-time-messaging-api
pm2 stop www
git fetch origin master
git reset --hard origin/master
npm install --only=production
pm2 start www
