# Derby

+ jdbc:derby:[subprotocol:][databaseName][;attribute=value]*

### Embedded Directory (relative)

```
+ jdbc:derby:database-name;create=true
+ org.apache.derby.jdbc.EmbeddedDriver in derby.jar (org.apache.derby.derby)
+ org.apache.derby.jdbc.EmbeddedDriver in derby.jar (org.apache.derby.derby)
```

### Embedded Directory (fully qualified)

```
+ jdbc:derby:directory:/var/store/derby;create=true
+ org.apache.derby.jdbc.EmbeddedDriver in derby.jar (org.apache.derby.derby)
```

### Embedded Memory

```
+ jdbc:derby:memory:DbName;create=true
+ org.apache.derby.jdbc.EmbeddedDriver in derby.jar (org.apache.derby.derby)
```

### Network

```
+ jdbc:derby://localhost:1621/sample;user=judy;password=no12see
+ jdbc:derby://localhost:1621/Datalayer;create=true;upgrade=true;retrieveMessagesFromServerOnGetMessage=true;deferPrepares=true;
+ org.apache.derby.jdbc.ClientDriver in derbyclient.jar (org.apache.derby.derbyclient)
```

### Build

datalayer-jdk7
ant all
cp jars/sane jars/insane
cd maven2
mvn install -DskipTests

# Apache Derby

+ Unique constraints

```
select c.constraintname, c.constraintid from sys.systables t, sys.sysconstraints c where t.tablename = 'TABLE_NAME' and t.tableid = c.tableid and c.type = 'U';
```

# Apache HBase Phoenix

+ org.apache.phoenix.jdbc.PhoenixDriver
+ jdbc:phoenix:localhost:2181

# MySQL

```
[http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html]
```

com.mysql.jdbc.Driver

```
jdbc:mysql://[host][,failoverhost...][:port]/[database][?propertyName1][=propertyValue1][&propertyName2][=propertyValue2]...
jdbc:mysql://localhost:3306/dbname?profileSQL=true&username=...&password=....
```

```
mysql --help
mysql -h host -u user -p
```

in /etc/init/mysql.conf, add 

```
--skip-grant-tables
--skip-networking
```

Stop MySQL

Restart it manually with the skip-grant-tables option: mysqld_safe --skip-grant-tables

Now, open a new terminal window and run the MySQL client: mysql -u root
Reset the root password manually with this MySQL command: 
UPDATE mysql.user SET password=PASSWORD('password') WHERE user='root';
If you are using MySQL 5.7 (check using mysql --version in the Terminal) then the command is:
UPDATE mysql.user SET authentication_string=PASSWORD('password')  WHERE  User='root';
Flush the privileges with this MySQL command: 
FLUSH PRIVILEGES;

SELECT VERSION(), CURRENT_DATE;
SELECT SIN(PI()/4), (4+1)*5;
SELECT VERSION(); SELECT NOW();
SELECT USER();
QUIT;

default-port=3306

CREATE DATABASE Test;

```
mysqldump -u username -ppassword –databases db_name1 [db_name2 ...] > dump.sql
mysqldump -u username -ppassword –all-databases > dump.sql
mysqldump -u username -ppassword –all-databases –single-transaction > dump.sql
mysql -u username -ppassword database_name < dump.sql
```

# PostgreSQL

```
jdbc:postgresql://[::1]:5740/accounting
```

```
su - postgres
sudo -i -u postgres
sudo -u postgres psql -d omv -f ./script.sql 
```

```
dropdb dba
createdb dba
createdb events
```

```
psql
\q
psql -s omv
create user omv_app password 'Omv_uP';
create user omv_ro password 'Omv_uP';
create user omv_ddl password 'Omv_uP';
GRANT ALL PRIVILEGES ON DATABASE dba TO omv_app;
\q
psql -s events
createuser --interactive
createuser --pwprompt
create user e1 password 'e1'; 
GRANT ALL PRIVILEGES ON DATABASE events TO e1;
CREATE TABLE potluck (name VARCHAR(20),
food VARCHAR(30),
confirmed CHAR(1), 
signup_date DATE);
\dt
INSERT INTO potluck (name, food, confirmed, signup_date) VALUES('John', 'Casserole', 'Y', '2012-04-11'); 
INSERT INTO potluck (name, food, confirmed, signup_date) VALUES('Sandy', 'Key Lime Tarts', 'N', '2012-04-14');
INSERT INTO potluck (name, food, confirmed, signup_date)VALUES ('Tom', 'BBQ','Y', '2012-04-18');
INSERT INTO potluck (name, food, confirmed, signup_date) VALUES('Tina', 'Salad', 'Y','2012-04-18');
SELECT * FROM potluck;
DELETE FROM potluck WHERE name = 'John' ;
ALTER TABLE potluck ADD email VARCHAR(40);
ALTER TABLE potluck DROP email;
UPDATE potluck set confirmed = 'Y' WHERE name = 'Sandy';
psql databasename < data_base_dump
psql -U postgres
ALTER USER postgres with password 'password';
psql -U apertoire -d vaultee -f vaultee_drop.sql    
psql -U apertoire -d vaultee -f vaultee_create.sql  
psql -U apertoire -d vaultee -f vaultee_load.sql
```

default-port=5432

# H2

H2 In Memory
jdbc:h2:mem:test

H2 In Memory MySql compatible
jdbc:h2:mem:test;MODE=MySQL

# HSQLDB

hsqldb.jar

```
jdbc:hsqldb: followed by a protocol identifier (mem: file: res: hsql: http: hsqls: https:) 
```

then followed by host and port identifiers in the case of servers, then followed by database identifier. 

Additional property / value pairs can be appended to the end of the URL, separated with semicolons.

HSQLDB

```
+ org.hsqldb.jdbcDriver
+ jdbc:hsqldb:mem:testdb
```

HSQLDB JDBC Driver

```
+ org.hsqldb.jdbcDriver
+ jdbc:hsqldb:hsql://<host>:<port>/<database>
```

# Clients

+ squirrel
+ emma

# OpenJPA

If you change a JPA Entity class, your will need to run 'mvn package' or add the following option to the VM argument of your run configuration:

+ '-javaagent:/home/eric/.m2/repository/org/apache/openjpa/openjpa/2.0.1/openjpa-2.0.1.jar'
+ '-javaagent:/home/eric/.m2/repository/org/apache/openjpa/openjpa/2.1.1/openjpa-2.1.1.jar'

https://issues.apache.org/jira/browse/OPENJPA-2399
-XX:+AlwaysLockClassLoader
 
# DataNucleus

## DataNucleus Tutorial for JDO using Maven2

This relies on the DataNucleus Maven2 plugin.
You can download this plugin from the DataNucleus downloads area.

1. Set the database configuration in the "datanucleus.properties" file.
2. Make sure you have the JDBC driver jar specified in the "pom.xml" file
3. Run the command: "mvn clean compile" - This builds everything, and enhances the classes 
4. Run the command: "mvn datanucleus:schema-create" - This creates the schema for this sample.
5. Run the command: "mvn exec:java" - This runs the tutorial
6. Run the command: "mvn datanucleus:schema-delete" - This deletes the schema for this sample. See note for 4 also.

## DataNucleus Tutorial for JDO

This contains the DataNucleus Tutorial. The files are laid out as follows

+ org/datanucleus/samples/jdo/tutorial/package-hsql.orm This defines the ORM for how the Product and Book classes are persisted by JDO into HSQL datastores
+ org/datanucleus/samples/jdo/tutorial/Book.java Representation of a Book object
+ org/datanucleus/samples/jdo/tutorial/Product.java Representation of a Product object
+ org/datanucleus/samples/jdo/tutorial/Main.java Class controlling the persistence of objects.
+ pom.xml Files used by Maven2 for building and running the tutorial.
+ build.xml File used by Ant for building the tutorial.
+ datanucleus.properties This file contains the property settings for where you will be persisting your data. You will need to update this file to match your database location etc.
+ log4j.properties Log4J configuration file

Now please refer to the relevant README.* file for the environment in which to run the tutorial.

## Social

```
DROP TABLE USERS;
CREATE TABLE USERS(
  ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  PASSWORD VARCHAR(255),
  EMAIL VARCHAR(255),
  DISPLAY_NAME VARCHAR(255),
  FACEBOOK VARCHAR(255),
  GOOGLE VARCHAR(255),
  LINKEDIN VARCHAR(255),
  GITHUB VARCHAR(255),
  FOURSQUARE VARCHAR(255),
  TWITTER VARCHAR(255)
);
ALTER TABLE USERS ADD CONSTRAINT EMAIL_UNIQUE UNIQUE (
    EMAIL
);
```
