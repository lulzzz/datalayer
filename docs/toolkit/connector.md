# Datalayer Connector

This module ensures the connection to external products and services, in respect of legal and technical constraints.

## Social Connectors

In most cases, there are REST API endpoints  being protected by OAuth authentication.

We are working on the following connectors:

+ Twitter
+ Facebook
+ Linkedin

The underlying technical library is hosted on the [Datalayer Platform Droids](https://github.com/datlayer/platform/) repository.

## Application Connectors

+ [SAP Hana](connector-hana.md)

## Open Data Connectors

xxx

# Datalayer SAP Hana Connector

## Prerequisite

Ensure you have a developer account and access to the following sites:

+ https://account.hanatrial.ondemand.com
+ https://account.hanatrial.ondemand.com/cockpit

Ensure you have installed the SAP Development Tools for Eclipse:

+ https://tools.hana.ondemand.com

For the record, you can also try the SAP visualization (Lumira) solution on:

+ https://cloud.saplumira.com

To run on the cloud, see 

+ http://scn.sap.com/docs/DOC-28294
+ https://cal.sap.com

## Configuration

In Eclipse (Window > Preferences > Server > SAP Hana Cloud Platform):

+ Landscape host=hanatrial.ondemand.com
+ SDK location: leave it blank (optional).
+ The Account Name (e.g. p19426734523trial - the account name is the one shown on the top-left side of your cockpit `https://account.hanatrial.ondemand.com/cockpit`)
+ The Username (e.g. P19426734523 - the username should have been assigned when you created an account on the SAP Developer Network).

In your $HOME/.config folder, create a file `io.datalayer.hana.properties` and write there:

+ The Account Name (e.g. p19426734523trial - the account name is the one shown on the top-left side of your cockpit `https://account.hanatrial.ondemand.com/cockpit`)
+ The Username (e.g. P19426734523 - the username should have been assigned when you created an account on the SAP Developer Network).
+ The Password

For example:

```
accountname=xxx
username=xxx
password=xxx
```

## Connection

In the `SAP HANA Admnistration Console` perspective, right-click in the `Systems` view and choose `Add Cloud System`

Insert your password and click on `Finish`.

## Simple SQL

In the `SAP HANA Development` perspective, click on the small SQL button.

![](images/SAP-HANA-Create-Table-1.jpg)

You will get a window to type in your SQL (to run the SQL, press on "F8").

Try the following:

```
create column table "TABLE_BANK"(
  "AGE" INTEGER null,
  "JOB" VARCHAR (20) null,
  "MARITAL" VARCHAR (20) null,
  "EDUCATION" VARCHAR (20) null);
```

Refresh the tables shown in the Catalog tree.

Right click on the table and click on “Open Definition” to see the table details (the schema could be a cryptic name like "DEV_7O8KR699Q91...".

Some other basic SQL statements you can try:

```
insert into "TABLE_BANK"  values (30,'unemployed','married','primary');
insert into "TABLE_BANK"  values (32,'services','married','secondary');
```

```
SELECT * FROM "TABLE_BANK" WHERE "AGE" > 30;
select count(*) from "TABLE_BANK" where "MARITAL" = 'married';
```

```
drop table TABLE_BANK
```
