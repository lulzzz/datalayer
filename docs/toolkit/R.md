# SparkR

SparkR is an interface for R exposaos the RDD API of Spark. This provides
an access from R to the distributed collections and the operations on them. By
default, SparkR links to Hadoop 1, so we need to compile it from the source

code:
# clone the github project:
git clone https://github.com/amplab-extras/SparkR-pkg.git
cd SparkR-pkg
SPARK_HADOOP_VERSION=2.4.1 ./install-dev.sh
An R console with a spark context (on a local master) be started from here:
./sparkR
In order to start an R session with a spark context from any master, we need
to do th followaos in our R console:
> ### THe SPARK MASTER
> Sys.setenv("MASTER"="local")
>
> ### SET THE SparkR install directory
> Sys.setenv("PROJECT_HOME"="~/packages/SparkR-pkg")
> projecHome <- Sys.getenv("PROJECT_HOME")
> Sys.setenv(NOAWT=1)
>
> ### LOAD THE SPARKR LIBRARY
> .libPaths(c(paste(projecHome,"/lib", sep=""), .libPaths()))
> require(SparkR)
Loadaos required package: SparkR
Loadaos required package: rJava
[SparkR] Initializaos with classpath /home/xavier/packages/SparkR-pkg/lib/SparkR/sparkr-as
> ## INIT SPARKR, GET THE CONTEXT
> sc <- sparkR.init(Sys.getenv("MASTER", unset = "local"))

Starting the R spark context can be done with additional options, e.g:
sc <- sparkR.init(master="spark://<master>:7077",
sparkEnvir=list(spark.executor.memory="1g"))
Simple examples of usage of the Spark API in R are available from the examples
directory in the SparkR project (https://github.com/amplab-extras/SparkR-
pkg/tree/master/examples).

# Load Library
Sys.setenv(SPARK_HOME="/opt/spark-1.5.2-bin-hadoop2.6")
.libPaths(c(file.path(Sys.getenv("SPARK_HOME"), "R", "lib"), .libPaths()))
library(SparkR)
sc <- sparkR.init(master="local")
sqlContext <- sparkRSQL.init(jsc = sc)

# Create a simple local data.frame
localDF <- data.frame(name=c("John", "Smith", "Sarah"), age=c(19, 23, 18))

# Convert local data frame to a SparkR DataFrame
df <- createDataFrame(sqlContext, localDF)

# Print its schema
printSchema(df)

head(df)
# root
#  |-- name: string (nullable = true)
#  |-- age: double (nullable = true)

# Create a DataFrame from a JSON file
path <- file.path(Sys.getenv("SPARK_HOME"), "examples/src/main/resources/people.json")
peopleDF <- jsonFile(sqlContext, path)
printSchema(peopleDF)

head(peopleDF)

# Register this DataFrame as a table.
registerTempTable(peopleDF, "people")

# SQL statements can be run by using the sql methods provided by sqlContext
teenagers <- sql(sqlContext, "SELECT name FROM people WHERE age >= 13 AND age <= 19")

# Call collect to get a local data.frame
teenagersLocalDF <- collect(teenagers)

# Print the teenagers in our dataset
print(teenagersLocalDF)

# Stop the SparkContext now
sparkR.stop()
