---
title: Postgresql
---

```bash
sudo apt-get install postgresql postgresql-contrib
# It happened to me and it turned out that I removed erroneously the postgres user from "ssl-cert" group, set it back with
gpasswd -a postgres ssl-cert
# Fixed ownership and mode
sudo chown postgres:postgres  /etc/ssl/private/ssl-cert-snakeoil.key
sudo chmod 0600 /etc/ssl/private/ssl-cert-snakeoil.key
update-rc.d postgresql enable
sudo service postgresql start
tail -f /var/log/postgresql
# su - postgres
sudo -i -u postgres
psql
\q
createuser --interactive
sudo -u postgres createuser --interactive
sudo -u postgres createdb datalayer
psql -d datalayer
\conninfo
```

