FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y mysql-server
ENV MYSQL_DATABASE=blog_starwars
ENV MYSQL_USER=ppgm
ENV MYSQL_PASSWORD=hola
ENV MYSQL_ROOT_PASSWORD=' '

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]