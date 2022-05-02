# Text Collector

Text Collector is a fun application used to save some useful text and link for later use

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Springboot](https://spring.io/projects/spring-boot)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)

## Setup and Installation

Clone the Repo.

```bash
git clone https://github.com/kumudgupta76/text-collector.git


Docker commands for keep-noted

check logs for container with name
docker container logs mysqldb

Run container mysql with pord forwarding volume mapping env using in detached mode
docker run -d -p 3306:3306 --name mysqldb --env-file .env -v "/home/guptaku/mysql":/var/lib/mysql-files mysql

updated one -> docker run -d -p 3306:3306 --name mysqldb --env-file sites/text-collector/.env -v "/home/guptaku/mysql":/var/lib/mysql mysql

--env details
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=keep_noted
MYSQL_USER=keep_noted
MYSQL_PASSWORD=keep



Connet to mysql inside docker
docker exec -it mysqldb mysql -uroot -p


create database keep_noted; -- Creates the new database
create user 'keep_noted'@'%' identified by 'keep'; -- Creates the user
grant all on keep_noted.* to 'keep_noted'@'%'; -- Gives all privileges to the new user on the newly created database


cd text-collector

./gradlew bootRun

# or
./gradlew build
java -jar build/libs/text-collector-0.0.1-SNAPSHOT.jar 

```

You can see results on [this](http://localhost:8080/home)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Kumud Gupta](mailto:kumudgupta76@gmail.com)
