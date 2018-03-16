# Datalayer CLI with HDP 2.3

HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -put README.md /tmp
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /tmp

```
DATALAYER_HADOOP=yarn-client DATALAYER_HADOOP_STATUS=started HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-cli
```

```
val f = sc.textFile("/tmp/README.md")
val a = f.filter(line => line.contains("a")).count()
val b = f.filter(line => line.contains("b")).count()
println("Lines with a: %s, Lines with b: %s".format(a, b))
f.filter(line => line.contains("a")).saveAsTextFile("/tmp/a.md")
```

```
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /tmp/a.md
```
# Scala REPL

def showLocals = intp.definedTerms.foreach(x => println(s"$x ${intp.typeOfTerm(x.toString)}"))

# Datalayer REPL

The Datalayer REPL allows you to Read, Evaluate, Print, Loop via a simple shell in your favorite terminal.

It imports useful libraries that help your life.

# Build and install the REPL

```
mvn install -DskipTests
```

# Run Datalayer Scala REPL

Invoke `./bin/datalayer-scala` from the root folder (where the pom.xml resides).

# Run Datalayer Spark REPL

Invoke `./bin/datalayer-spark` from the root folder (where the pom.xml resides).

# Context

z.show(yourDataFrame)

# Dependencies

```
%dep

z.reset() // clean up previously added artifact and repository

// add maven repository
z.addRepo("RepoName").url("RepoURL")

// add maven snapshot repository
z.addRepo("RepoName").url("RepoURL").snapshot()

// add artifact from filesystem
z.load("/path/to.jar")

// add artifact from maven repository, with no dependency
z.load("groupId:artifactId:version").excludeAll()

// add artifact recursively
z.load("groupId:artifactId:version")

// add artifact recursively except comma separated GroupID:ArtifactId list
z.load("groupId:artifactId:version").exclude("groupId:artifactId,groupId:artifactId, ...")

// exclude with pattern
z.load("groupId:artifactId:version").exclude(*)
z.load("groupId:artifactId:version").exclude("groupId:artifactId:*")
z.load("groupId:artifactId:version").exclude("groupId:*")

// local() skips adding artifact to spark clusters (skipping sc.addJar())
z.load("groupId:artifactId:version").local()

a. Load elasticsearch-hadoop library and distribute to spark cluster (sc.addJar()) but exclude some transitive dependencies, like cascading-local, pig, etc.

  z.loadAndDist("org.elasticsearch:elasticsearch-hadoop:2.0.2", 
    Seq("cascading:cascading-local",
        "cascading:cascading-hadoop",
        "org.apache.pig:pig",
        "joda-time:joda-time",
        "org.apache.hive:hive-service"))

b. Add local .m2 repository and load library from it

  z.addMavenRepo("local", "file:///Users/moon/.m2/repository")
  z.load("org.apache.zeppelin:zeppelin-markdown:0.5.0-SNAPSHOT")

c. Add remote maven repository (snapshot, https protocol) and load a library from it

  z.addMavenRepo("snapshot", "https://oss.sonatype.org/content/repositories/snapshots/", true)
  z.load("org.apache.zeppelin:markdown:0.5.0-SNAPSHOT")
```

# Datalayer Pilot

## About

Datalayer Pilot is a command line interface to interact, interpret Apache Zeppelin notes.
 
It also allows you to import/export IPython Jupyter and convert to images and PDF.

[![Datalayer Pilot](http://datalayer.io/ext/screenshots/datalayer-pilot.png)](http://datalayer.io/pilot)

## Installation

Build and launch the executable jar:

```
mvn install
./target/datalayer-pilot-1.0.0-SNAPSHOT.jar
```

## Usage

The foundations and a few functionalities are available today:

Shell Functionalites

+ Interact
+ Interpret

Import from and Export To:

+ IPython Jupyter
+ Spark Notebook
+ Shiny

Export to:

+ Images
+ PDF

```
Welcome to Datalayer Pilot
             ___       __       __
   _______  / _ \___ _/ /____ _/ /__ ___ _____ ____
  _______  / // / _ `/ __/ _ `/ / _ `/ // / -_) __/
 _______  /____/\_,_/\__/\_,_/_/\_,_/\_, /\__/_/
                                    /___/

 -> Type `help` to get started.

 (c) 2016 Datalayer http://datalayer.io
 

pilot> help

Datalayer Pilot Help
--------------------

pilot> connect                      : Connect to the default localhost:8080 Apache Zeppelin Server
pilot> connect("localhost", 8080)   : Connect to Apache Zeppelin Server
pilot> close                        : Close the current connection
pilot> bye                          : Quit this REPL

pilot> notes                        : List the notes
pilot> note                         : Create a new note
pilot> note("id")                   : View a note by id

pilot> p("val i = 2")               : Run a code in a paragraph (use triple quote if needed)

(c) 2016 Datalayer http://datalayer.io

```

## Planned Features

Planned features (by alphabetic order):s

+ Code completion
+ Contribute to Datalayer to have a better response on note creation (get id of created note)
+ Export note to PDF
+ Guard against NPE if not connected
+ Have a more user friendly way to pilot with quotes
+ Import note from IPython
+ Process responses and display them in formatted way
+ Status command
+ Support both server and client mode for interperters
+ Support Chromium, Safari (now only Firefox)
