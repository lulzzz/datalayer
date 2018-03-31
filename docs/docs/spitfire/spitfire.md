[![Datalayer](http://datalayer.io/enterprise/img/logo-datalayer-horizontal.png)](http://datalayer.io)

# Datalayer

Big Data distribution on Kubernetes

+ charts [hdfs ipfs hbase solr janusgraph spark zeppelin-interpreter spitfire]
+ settle
+ explorer
+ widget

```console
hello
```

Data Scientists :heart: Datalayer.

# Datalayer Notebook for Data Science

```
"@types/react-test-renderer": "15.5.0",
"@microsoft/load-themed-styles": "1.4.0",
```

## Menu

+ admin
+ auth
+ browser
+ collector
+ connections
+ dashboard
+ dataset
+ deployer
+ home
+ modeler
+ pipes
+ publisher
+ scheduler
+ search
+ viewer
+ widgets
+ wrangler

## Zeppelin Config

+ ZEPPELIN_PORT 8091
+ ZEPPELIN_NOTEBOOK_DIR /notebook/tmp
+ ZEPPELIN_WAR /src/zeppelin/zeppelin-web/dist
+ ZEPPELIN_CONF_DIR /notebooks/tmp/_lib

## API

z.runNote("2CJRSMQ7U")

```
curl -v --insecure --user rest:radsf2@! -d "{ term: 40, divisor: 2 }" -XPOST -H "Content-Type:application/json" https://datalayer01:8443/api/notebook/note/run/async/2CHYTA9MR | json

curl -v --insecure --user rest:radsf2@! -d "{ term: 40, divisor: 2 }" -XPOST -H "Content-Type:application/json" https://datalayer01:8443/api/notebook/note/run/sync/2CHYTA9MR | json

curl -v --insecure --user rest:radsf2@! -d "{ term: 40, divisor: 2 }"  -XPOST -H "Content-Type:application/json" https://datalayer01:8443/api/notebook/flow/run/sync/d3wpgm69u | json

curl --insecure --user rest:radsf2@! -v --negotiate -u : -b ~/cookiejar.txt -c ~/cookiejar.txt -d "{ term: 40, divisor: 2 }" -XPOST -H "Content-Type:application/json" https://datalayer01:8443/api/notebook/kerberos/flow/run/sync/d3wpgm69u | json



curl -v --insecure --user rest:radsf2@! -d @input1.json -XPOST -H "Content-Type:application/json" https://datalayer01:8443/api/notebook/note/run/sync/2CHYTA9MR | json
input1.json
{ term: 1 }

curl -v --insecure --user rest:radsf2@! -XGET https://datalayer01:8443/api/interpreter/setting | json
curl -v --insecure --user rest:radsf2@! -XGET https://datalayer01:8443/who | json

curl -v --insecure --compressed -H 'Cookie: JSESSIONID=2701b42e-95d3-4a3c-80fd-9d373ba06aa9' -XGET https://datalayer01:8443/api/interpreter/setting | json

kinit eric
klist
curl --negotiate -u : -b ~/cookiejar.txt -c ~/cookiejar.txt https://datalayer01:8443/api/notebook/kerberos/flow/run/sync/bff8dl2ug | json
# The --negotiate option enables SPNEGO in curl. The -u : option is required but the user name is ignored (the principal that has been specified for kinit is used). The -b and -c options are used to store and send HTTP cookies.

klist -k /etc/security/keytabs/spnego-localhost.keytab 
kinit -kt /etc/security/keytabs/spnego-localhost.keytab HTTP/localhost@DATALAYER.IO

kdestroy
```

## Azure Edge Node

+ sudo apt-get purge nginx nginx-common nginx-full
+ sudo apt-get install nginx

## Spark Interpreter Dependencies

```
org.apache.bahir:spark-streaming-twitter_2.11:2.1.0
edu.stanford.nlp:stanford-corenlp:3.6.0
/packages/models/stanford-corenlp-3.6.0-models.jar
/packages/models/gate-EN-twitter.model
org.apache.tika:tika-core:1.13
com.cloudera.sparkts:sparkts:0.4.1
io.datalayer:datalayer-droids:1.0.0-SNAPSHOT
com.kennycason:kumo:1.1
```

## Setup

```
yarn install --ignore-platform
yarn build
yarn start
```

## package.json

```
//    "@types/expect.js": "0.3.29",
//    "@types/jest": "19.2.2",
//    "jest": "^19.0.2",
//    "ts-jest": "^19.0.10",
//    "@types/expect.js": "0.3.29",
```

## tsconfig.json

```
//      "expect.js",
```
## React-Ace

[![npm version](https://badge.fury.io/js/react-ace.svg)](http://badge.fury.io/js/react-ace)
[![Build Status](https://travis-ci.org/securingsincity/react-ace.svg)](https://travis-ci.org/securingsincity/react-ace)
[![CDNJS](https://img.shields.io/cdnjs/v/react-ace.svg)](https://cdnjs.com/libraries/react-ace)

`npm install react-ace`

```javascript
import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

function onChange(newValue) {
  console.log('change',newValue);
}

// Render editor
render(
  <AceEditor
    mode="java"
    theme="github"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{$blockScrolling: true}}
  />,
  document.getElementById('example')
);
```

Looking for a way to set it up using webpack? Checkout `example` directory for a working example using webpack.

|Prop|Default|Description|
|-----|------|----------|
|name| 'brace-editor'| Unique Id to be used for the editor|
|mode| ''| Language for parsing and code highlighting|
|theme| ''| theme to use|
|height| '500px'| CSS value for height|
|width| '500px'| CSS value for width|
|className| | custom className|
|fontSize| 12| pixel value for font-size|
|showGutter| true| boolean|
|showPrintMargin| true| boolean|
|highlightActiveLine| true| boolean|
|focus| false| boolean|
|cursorStart| 1| number|
|wrapEnabled| false| Wrapping lines|
|readOnly| false| boolean|
|minLines| | Minimum number of lines to be displayed|
|maxLines| | Maximum number of lines to be displayed|
|enableBasicAutocompletion| false| Enable basic autocompletion|
|enableLiveAutocompletion| false| Enable live autocompletion|
|tabSize| 4| tabSize number|
|value | ''| String value you want to populate in the code highlighter|
|defaultValue | ''| Default value of the editor|
|onLoad| | Function onLoad|
|onBeforeLoad| | function that trigger before editor setup|
|onChange| | function that occurs on document change it has 1 argument value. see the example above|
|onCopy| | function that trigger by editor `copy` event, and pass text as argument|
|onPaste| | function that trigger by editor `paste` event, and pass text as argument|
|onFocus| | function that trigger by editor `focus` event|
|onBlur| | function that trigger by editor `blur` event|
|onScroll| | function that trigger by editor `scroll` event|
|editorProps| | Object of properties to apply directly to the Ace editor instance|
|setOptions| | Object of [options](https://github.com/ajaxorg/ace/wiki/Configuring-Ace) to apply directly to the Ace editor instance|
|keyboardHandler| | String corresponding to the keybinding mode to set (such as vim)|
|commands| | Array of new commands to add to the editor
|annotations| | Array of annotations to show in the editor i.e. `[{ row: 0, column: 2, type: 'error', text: 'Some error.'}]`, displayed in the gutter|
|markers| | Array of [markers](https://ace.c9.io/api/edit_session.html#EditSession.addMarker) to show in the editor, i.e. `[{ startRow: 0, startCol: 2, endRow: 1, endCol: 20, className: 'error-marker', type: 'background' }]`|
|style| | Object with camelCased properties |

All modes, themes, and keyboard handlers should be required through ```brace``` directly.  Browserify will grab these modes / themes / keyboard handlers through ```brace``` and will be available at run time.  See the example above.  This prevents bloating the compiled javascript with extra modes and themes for your application.

Example Modes

* javascript
* java
* python
* xml
* ruby
* sass
* markdown
* mysql
* json
* html
* handlebars
* golang
* csharp
* coffee
* css

Example Themes

* monokai
* github
* tomorrow
* kuroir
* twilight
* xcode
* textmate
* solarized dark
* solarized light
* terminal

Example Keyboard Handlers

* vim
* emacs

# Datalayer Spitfire

`Datalayer Spitfire` is the professional distribution of Apache Zeppelin.

**Setup** - This is how you will setup Spitfire.

+ [Install](./install.html)

+ [Configure](./configuration.html)

+ [Security](./security.html)

+ [Operation](./operation.html)

**Interpreter** - Sptifire is configured to support the following default interpreters.

+ [Spark](./spark.html)

+ [R](./R.html)

**Integration** - Spitfire integrates with the following external applications.

+ [Twitter](./twitter.html)

+ [Microsoft OneNote](./microsoft-onenote.html)

[![Datalayer Spitfire](http://datalayer.io/img/msc/logo-datalayer-spitfire.png)](http://datalayer.io/spitfire)

# Datalayer Notebook

A WEB Notebook to interact and visualize your Big Data.

The Datalayer Notebook behaves as a container where you can deploy and activate any existing Datalayer components.

Notable features are multi-syntax support, live-sharing and widget (dashboards).

## Examples

### Home Page

This is the welcome page.

<img src="http://datalayer.io/notebook/screenshot/notebook-homepage.png"/>

### A Simple Notebook

This is an example of a simple notebook.

<img src="http://datalayer.io/notebook/screenshot/notebook-sample.png"/>

## Syntax

### Default Scala/Spark Syntax

```
println("hello datalayer")

println("%html <span class='fa fa-bars'>" + "<font color='green'> Datalayer</font></span>")

println("%table name\tsize\n" + "sun\t100\n" + "moon\t10\n")

println("%table name\tsize\n" + "%html <img src='http://www.iconsdb.com/icons/preview/orange/sun-3-s.png'/> sun\t100\n" + "%html <img src='http://png-5.findicons.com/files/icons/1050/pidgin_old_tango_smilies/24/moon.png'/>moon\t10\n")

println("Hello " + z.input("name"))

println("Hello " + z.input("sun"))

println("Hello " + z.select("day", Seq(("1", "mon")
  ("2", "tue")
  ("3", "wed")
  ("4", "tue")
  ("5", "fri")
  ("6", "sat")
  ("7", "sun")))

val a="Hello Datalayer"

case class Person(name: String, age: Int)

val people = sc.parrallelize(Seq(Person("moon", 33), Person("jobs", 51)))

people.registerAsTable("people")
```

### SQL (SQL for Business) Syntax (%sqlb)

```
%sqlb select * from sparkRDD

%sqlb select age, age+3, age+7, age+${add=82} from people
```

### Markdown Syntax (%md)

```
%md # Hello Markdown

%md Hello ${name=sun}

%md This is ${day=mon,1(mon)|2(tue)|3(wed)|4(thu)|5(fri)|6(sat)|7(sun)}

%md ![](http://datalayer.io/img/msc/png)
```

Form creation

```
z.input("formName")

z.input("formName", "defaultValue")

z.select("formName", Seq(("option1", "option1DisplayName"),
                         ("option2", "option2DisplayName")))

z.select("formName", "option1", Seq(("option1", "option1DisplayName"),
                                    ("option2", "option2DisplayName")))
```

### Shell Syntax (%sh)

```
%sh echo "datalayer"

%sh ls -alp
```

### Hadoop Distributed File System Syntax (%dfs)

```
%dfs ls /

%dfs mkdir /test
```

### SVG Scalable Vector Graphics Syntax (%svg)

```
%svg

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="480" height="543.03003" viewBox="0 0 257.002 297.5" xml:space="preserve">
  <g transform="matrix(0.8526811,0,0,0.8526811,18.930632,21.913299)">
    <polygon points="8.003,218.496 0,222.998 0,74.497 8.003,78.999 8.003,218.496 "/>
    <polygon points="128.501,287.998 128.501,297.5 0,222.998 8.003,218.496 128.501,287.998 "/>
    <polygon points="249.004,218.496 257.002,222.998 128.501,297.5 128.501,287.998 249.004,218.496 "/>
    <polygon points="249.004,78.999 257.002,74.497 257.002,222.998 249.004,218.496 249.004,78.999 "/>
    <polygon points="128.501,9.497 128.501,0 257.002,74.497 249.004,78.999 128.501,9.497 "/>
    <polygon points="8.003,78.999 0,74.497 128.501,0 128.501,9.497 8.003,78.999 "/>
  </g>
</svg>
```

## Others

### SparkContext, SQLContext
```
/* reference to SparkContext */
z.sc
/* reference to SQLContext */
z.sqlContext
/* Shortcut to z.sqlContext.sql() */
z.sql("select * from ...")
```

### Dependency loader (don't use it for now...)

```
/* Load a library from local FS */
z.load("/path/to/your.jar")
/* Load a library from Maven repository */
z.load("groupId:artifactId:version")
/* Load library from Maven repository with dependencies */
z.load("groupId:artifactId:version", true)
/* Load a library from Local FS and add it into SparkContext */
z.loadAndDist("/path/to/your.jar")
/* Load a library with dependencies from Maven repository and add it into SparkContext*/
z.loadAndDist("groupId:artifactId:version")
/* Load library with dependencies from maven repository and add it into SparkContext*/
z.loadAndDist("groupId:artifactId:version", true)
```

Example

```
z.loadAndDist("org.scalanlp:breeze_2.10:0.10", true)
import breeze.linalg._
val x = DenseVector.zeros[Double](5)
```

# Datalayer Notebook with HDP 2.3

DATALAYER_HADOOP=yarn-client DATALAYER_HADOOP_STATUS=started HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-notebook-start -f

## Read-only ACE Editor

Configure ACE Editor

In `zeppelin-web/app/scripts/controllers/paragraph.js` add the following in the `$scope.aceChanged` function definition (line 423):
```
$scope.editor.setReadOnly(true);
```
Configure CSS to hide controls:

In `zeppelin-web/app/styles/notebook.css` add a property for `.control` class at line 109:
```
visibility: hidden;
```
Configure HTML to hide themes options and notebook run:

In `zeppelin-web/app/views/notebook.html` set styles for:

At line 21 and 53
```
<span class="labelBtn btn-group" style="visibility:hidden;">
```

And at line 90 set
```
style="margin-top:15px; margin-right:15px; font-size:15px;visibility:hidden;">
```

# Datalayer Emulator

This folder contains the Docker definitions to run the Datalayer SDK on 
with multiple nodes on a single machine.

You can emulate a real distributed behavior, with inter nodes communications on 
you development or user environment (single machine).

Of course, don't expect the performance nor power of a real multinode cluster.

The Emulator supports the following components:

+ Hadoop
+ Spark
+ H2O

The Emulator support the following docker images:

+ Ubuntu Precise
+ Ubuntu Trusty
+ Centos 6
+ Centos 7

For now, to use it, you will have to build the images.

## Complete Stack Build

```
build-emulator
```

## Complete Stack Start

Start a 2 slaves node cluster with

```
start-emulator.sh ubuntu trusty 2
```

The useful UI will be launched (ensure you have xdg-open installed).

If the pages doesn't show, give time to the servers to start (maybe more than
1 minute).

## Complete Stack Stop

Stop the 2 slaves node cluster with

```
stop-emulator.sh 2
```

## Hadoop Only Emulator

```
cd src/main/docker/hadoop
```

### Start Hadoop

```
start-master.sh
start-slaves.sh 1 3
```

This will start a 3 nodes cluster.

### List the Nodes

```
docker ps
```

### Browse the Hadoop Namenode

Look for the port being forwarding ->50070 on the master with `docker ps`
8a2bdb7ab7bc        datalayer/hadoop-namenode:latest   "/bin/bash /usr/loca  
 44 seconds ago      Up 38 seconds      
... 0.0.0.0:49311->9000/tcp, *0.0.0.0:49312*->50070/tcp, 
0.0.0.0:49313->8040/tcp, 0.0.0.0:49314->8060/tcp, .

Type [http://0.0.0.0:49312](http://0.0.0.0:49312) in your favorite browser.

### Start more Hadoop Datanodes

Launch more slaves:
`start-slaves.sh 4 7`

### Stop Hadoop

```
cd src/main/docker/hadoop
stop-master.sh
stop-slaves.sh 1 7
```

# Docker

docker [OPTIONS] COMMAND [arg...]
 -H=[unix:///var/run/docker.sock]: tcp://host:port to bind/connect to or unix://path/to/socket to use
A self-sufficient runtime for linux containers.
Commands:
    attach    Attach to a running container
    build     Build an image from a Dockerfile
    commit    Create a new image from a container's changes
    cp        Copy files/folders from the containers filesystem to the host path
    diff      Inspect changes on a container's filesystem
    events    Get real time events from the server
    export    Stream the contents of a container as a tar archive
    history   Show the history of an image
    images    List images
    import    Create a new filesystem image from the contents of a tarball
    info      Display system-wide information
    inspect   Return low-level information on a container
    kill      Kill a running container
    load      Load an image from a tar archive
    login     Register or Login to the docker registry server
    logs      Fetch the logs of a container
    port      Lookup the public-facing port which is NAT-ed to PRIVATE_PORT
    pause     Pause all processes within a container
    ps        List containers
    pull      Pull an image or a repository from the docker registry server
    push      Push an image or a repository to the docker registry server
    restart   Restart a running container
    rm        Remove one or more containers
    rmi       Remove one or more images
    run       Run a command in a new container
    save      Save an image to a tar archive
    search    Search for an image in the docker index
    start     Start a stopped container
    stop      Stop a running container
    tag       Tag an image into a repository
    top       Lookup the running processes of a container
    unpause   Unpause a paused container
    version   Show the docker version information
    wait      Block until a container stops, then print its exit code

## Install

apt-get install docker.io
docker -d &

## Usage

docker info
docker version
docker images
docker search ubuntu

docker pull ubuntu
docker pull ubuntu:utopic
docker pull sequenceiq/hadoop-docker
docker pull sequenceiq/spark

docker ps
docker logs <container-id>

docker run <image-name>
docker run -d <image-name> 
docker run <image-name> <command-to-run>
docker run -it datalayer/ubuntu:utopic /bin/bash
docker run -it datalayer/sinatra /bin/bash
docker run -p 50070:50070 -i -t sequenceiq/hadoop-docker /etc/bootstrap.sh -bash
docker run -it -h sandbox sequenceiq/spark /etc/bootstrap.sh -bash
docker inspect <container-id>

docker build -t aosio/memcached .

To detach the tty without exiting the shell, use the escape sequence CTRL+p+q.

docker run -ti ubuntu:14.04 /bin/bash -c 'ls'
docker run -ti ubuntu:14.04 /bin/bash -c 'useradd -u 12345 -s /bin/bash eric; su - eric'
---
docker build -t aosio/ssh:utopic .
docker run  -p 222:22 -i -t aosio/ssh:utopic /bin/bash
ssh root@localhost -p 222
docker run -d -P --name ssh aosio/ssh:utopic
docker port ssh 22
ssh root@localhost -p <port>
docker stop ssh
docker rm ssh
---
docker build -t sequenceiq/hadoop-docker:2.5.0 .
docker commit 8dbd9e392a96 my_img
docker tag 5db5f8471261 sinatra
docker inspect --format="{{.NetworkSettings.IPAddress}}" 934df0238dd3
docker login

| IMAGES                                                                      |

ubuntu-image
+ https://github.com/tianon/docker-brew-ubuntu-core.git

hadoop-image
docker run -d -P --name="Hadoop" -h "hadoop" ruo91/hadoop:2.4.1
ssh `docker inspect -f '{{ .NetworkSettings.IPAddress }}' Hadoop`
start-all.sh
jps
for((i=0; i<10; i++)) do echo ${i}; done > test.log
hdfs dfs -copyFromLocal test.log /
hdfs dfs -ls /
exit
docker port Hadoop 50070

# Export / Import Image

Find the ID of the container that you would like to move.

$ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
f4b0d7285fec        ubuntu:14.04        /bin/bash           38 minutes ago      Exit 0                                  hungry_thompson
8ae64c0faa34        ubuntu:14.04        /bin/bash           41 minutes ago      Exit 0                                  jovial_hawking
3a09b2588478        ubuntu:14.04        /bin/bash           45 minutes ago      Exit 0                                  kickass_lovelace

I’m going to use the above 3a09b2588478 ID for this example.

Commit your changes and save the container to an image called mynewimage.
    
$ docker commit 3a09b2588478 mynewimage
4d2eab1c0b9a13c83abd72b38e5d4b4315de3c9967165f78a7b817ca99bf191e

Save the mynewimage image to a tar file. I will use the /tmp/ directory to save the image but you could easily use a NFS share to make it easier to move the completed tar file.
    
$ docker save mynewimage > /tmp/mynewimage.tar

Copy the mynewimage.tar file to your new Docker instance using whatever method works in your environment, for example FTP, SCP, etc.

Run the docker load command on your new Docker instance and specify the location of the image tar file.
    
$ docker load < /tmp/mynewimage.tar



# API

+ https://github.com/jboss-fuse/fuse-docker
[![Datalayer](http://datalayer.io/img/msc/logo_horizontal_072ppi.png)](http://datalayer.io)

The Datalayer SDK allows you to use `Big Data Science` from your laptop.

We address **Business**, **Mathematicians** and **Software Developers** needs with various interfaces (*Shell*, *WEB* or *Studio*) to model big data on Spark/Hadoop.

This SDK ships pre-configured machine learning **models** and **lessons** to get you up-to-speed to generate **business results**.

Ensure you have at least Java Development Kit (version 7) (type `java -version`) and that the JAVA_HOME environment points to that JDK.

Try it with [docker](https://www.docker.com/).

`docker` and `curl` need to be installed and ensure you have the required privilege (`sudo` might be needed):

```
curl https://raw.githubusercontent.com/datalayer/sdk/master/bin/datalayer-emulator | bash
```

Install it on your machine (java and curl are requirements) with:

```
curl https://raw.githubusercontent.com/datalayer/sdk/master/bin/datalayer-install | bash
```

Read more on [on this page](http://datalayer.io/doc/platform/sdk) while it is downloading 
the artifacts (can take 20 minutes depending on your network connection speed).

[![Datalayer Desktop](http://datalayer.io/ext/screenshots/notebook.png)](http://datalayer.io/platform)

# Develop with the SDK

You are expected to run on a unix like flavored  For now we only test on Ubuntu, so any
Fedora or Mac OS X systems may give surprises.

Please report any issue and question to [@datalayerio](https://twitter.com/datalayerio) or by email to info@datalayer.io.

The following is needed to start you up:

+ A modern Java Virtual Machine (minimum JDK7, we recommend JDK8 from [OpenJDK](https://jdk8.java.net/download.html)
  or [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)).
+ [Scala 2.11.2](http://www.scala-lang.org/download/2.11.2.html) (anything else than 2.11.* version will fail).
+ [Apache Maven](http://maven.apache.org/download.cgi) with minimal version 3.2.1.

You can install these tools from your favorite distribution system (yum, apt-get, brew) or just
like we usually do at Datalayer, download the tar, untar it in /opt and define the following
environment variables (in .bashrc or .bash_profile depending on your operating system):

```
$ export JAVA_HOME=/opt/jdk1.7.0 # or whatever version number you have...
$ export PATH=$JAVA_HOME/bin:$PATH
$ export SCALA_HOME=/opt/scala-2.10.4 # or whatever name version number you have...
$ export PATH=$SCALA_HOME/bin:$PATH
$ export MAVEN_HOME=/opt/apache-maven-3.2.1 # or whatever version number you have...
$ export PATH=$MAVEN_HOME/bin:$PATH
```

```
git clone --depth 1 https://github.com/datalayer/sdk # (*)
export DATALAYER_HOME=$PWD/sdk
export PATH=$DATALAYER_HOME/bin:$PATH
export DATALAYER_REPOSITORY=$HOME/.m2/repository # (**)
datalayer-notebook
```

`(*)` If you don't have git, just download and unzip [the archive](https://github.com/datalayer/sdk/archive/master.zip).

`(**)` If you want to reuse your existing Maven repository, set the DATALAYER_REPOSITORY environment variable to 
`~/.m2/repository` which is the default location used by Maven. If not set `$DATALAYER_HOME/mvn/repository` 
will be used to store the downloaded artifacts from the Internet.

To ensure you have after easy access to the Datalayer SDK afterwards, define the DATALAYER_HOME 
environment variables (add this in your `~/.bashrc`, `~/.bash_profile` or `~/.profile` depending on your operating system).

Importantly, you will have to define the following additional environment variables and source the
Datalayer environment (once again in .bashrc or .bash_profile depending on your operating system):

```
$ export DATALAYER_HOME= the path to this repository clone.
$ export MAVEN_OPTS="-Xmx4g -Xms1g -XX:ReservedCodeCacheSize=1g"
```

Double check your environment from your shell with:

```
$ datalayer -v # or simply datalayer -v

Datalayer version 1.0.0-SNAPSHOT
Datalayer home: /datalayer/sdk
Apache Maven 3.2.3 (33f8c3e1027c3ddde99d3cdebad2656a31e8fdf4; 2014-08-11T22:58:10+02:00)
Maven home: /datalayer/sdk/ext/apache-maven-3.2.3
Java version: 1.8.0_20-ea, vendor: Oracle Corporation
Java home: /home/eric/wrk/opt/jdk1.8.0_20/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.16.0-5-generic", arch: "amd64", family: "unix"
Scala code runner version 2.11.2 -- Copyright 2002-2013, LAMP/EPFL
```

## Working without or with Hadoop

This is achieved by the DATALAYER_HADOOP environment variable: 

+ By default, no Hadoop is used `DATALAYER_HADOOP=none`
+ If you want to run with an existing Hadoop, we support the yarn-client mode `DATALAYER_HADOOP=yarn-client`. We ship Hadoop (in `$DATALAYER_HOME/ext` and related configuration in `$DATALAYER_HOME/conf`.

So to run with hadoop:

```
export DATALAYER_HADOOP=yarn-client
datalayer-hadoop-init
datalayer-hadoop-start
datalayer-notebook
```

## Tuning for more memory

Because we want to analyse large dataset, we ensure that even on your local laptop single node, you have enough memory to available to load the data.

This is why the Datalayer SDK is configured to give 1GB memory available to the server, but also to the (Spark) workers.

Would you want receive a `OutOfMemoryException`, augment the worker available memory by ajusting SPARK_DAEMON_MEMORY.

For example, if you want to give 3BG memory to the workers, launch the notebook with:

```
SPARK_DAEMON_MEMORY=3g datalayer-notebook
```

## Updating to latest SNAPSHOT

Give `-U` parameter to any command, e.g. `datalayer -U`.

## External Components

### Install

You are now ready to install desired software (servers, store or build tools) you want to work on.

The Datalayer SDK provides a simple way to do that.

To install elasticsearch, just run:

`$ datalayer-sdk-install-ext --component elasticsearch`

### Run

If you want to start a component like elasticsearch, just run :

`$ datalayer-elasticsearch-start`

And open your favorite Web browser to the given url.

## IDE

### Prerequisites

We use JAVA, Scala and Shell to develop, based on Maven projects.

You can download [Eclipse Scala IDE](http://scala-ide.org/download/sdk.html) (based on eclipse).
Do not forget to give Eclipse more memory to by adding in $ECLIPSE_HOME/eclipse.ini the following lines

```
 -Xms1g
 -Xmx4g
```

You can also start from a fresh [Eclipse IDE Luna](https://www.eclipse.org/downloads/index-developer.php).

Here is the non exhaustive list of Eclipse Plugin you can add to Eclipse Luna 
(go via the menu "Help > Install New Software, and add there the update site):

+ [m2e-extras latest milestone update site](https://repository.sonatype.org/content/repositories/forge-sites/m2e-extras/0.15.0/N/0.15.0.201206251206) - 
  Can also be useful to add this to the Eclipse Scala IDE.
+ [scala-ide for eclipse luna](http://scala-ide.org/download/milestone.html). Choose the update site for scala 2.11 and eclipse luna.
  When importing a scala project via maven, do not forget to configure it with Add Scala Nature (right-click on the project and choose Configure)
  and also to remove the added Scala 2.11 libraries (we run on 2.10).

+ e4
+ swtbot

For some project, we use [lombok](http://projectlombok.org/): download the [lombok.jar](http://projectlombok.org/downloads/lombok.jar)
and add in ECLIPSE_HOME/eclipse.ini.

```
-javaagent:/opt/eclipse/lombok.jar # replace /opt/eclipse with the path to your lombok.jar
```

Also quite importantly:

+ Always use the Import Maven Eclipse feature to import the Datalayer repositories. They
  all contain a pom.xml.
+ Put the Scala Library before the Maven Dependencies in the build path (go to project properties > Java Build Path > Order and Export).
  This will ensure you do not have strange behavior while eclipse is building or running tests.

Any other IDEs or tool supporting Maven should also work.

## Modules

The SDK depends on a bunch of modules, each having a very specific goal.

Each Datalayer module ships with its documentation. Start on http://datalayer.io/doc/platform/.

You can read on each module individually on http://datalayer.io/doc/platform/_module_name_ `bus(+) math(+++) ict(+++)` (e.g. http://datalayer.io/doc/platform/algorithm)

You can view the dependency tree with `datalayer-sdk-deps-tree`.

# Test with Maven

```
# Run all java+scala tests
mvn test

# Runs specific java test classes
mvn test -Dtest=JavaTest1,JavaTest2

# Runs all scala tests (not the java ones)
mvn scalatest:test

# Runs specific scala suites (wildcards supported)
mvn scalatest:test -Dsuites=io.datalayer.MySuite1,io.datalayer.MySuite2

# Continuously build
mvn scala:cc

# Continuously build running all scala suites
mvn scala:cctest

# Continuously buld running specif scala suites (wildcards supported)
mvn scala:cctest -Dsuites=io.datalayer.MySuite1,io.datalayer.MySuite2
```

# Dev with SBT

First you will need to assemble your project. It will take some time, so have a nice cup of coffee, while you run the following command from your Spark folder (a recent clone from the official repository):

```
sbt/sbt -Pyarn -Phadoop-2.3 assembly
```

Next you **should** be able to run the following command:

```
sbt/sbt ~compile
```
it will initiate set and run a continuous compilation, the end of the process will display something similar to this: 

```
[success] Total time: 1 s, completed Nov 27, 2014 3:14:03 PM
Waiting for source changes... (press enter to interrupt)
```

From now on, you will be able to edit (with the editor of your choice… of course) a file from your favorite Spark module(s). `sbt` will compile only changes as soon as you edit and save a file.

To see how your changes affect the final build, you will have to export the following variable, and then you will be able to run a Spark shell:

```
export SPARK_PREPEND_CLASSES=true
./bin/spark-shell
```
Will display a message to warn you:

```
NOTE: SPARK_PREPEND_CLASSES is set, placing locally compiled Spark classes ahead of assembly.
```

Note that **each time** you make a change you will have to exit the spark-shell and re-run it so it take your changes into account. To go back to normal:

```
unset SPARK_PREPEND_CLASSES
```
Note also that you will be able to run all these commands from the IntelliJ terminal panels. And voilà! Ready to code and start patching like a pro…  

# Bower dependencies

Can be useful to build the Zeppelin from locations with limited access (strick firewall constraints)

(See http://stackoverflow.com/questions/15669091/bower-install-using-only-https)

You just need to change the git config:

```
git config --global url."https://".insteadOf git://
```

## FAQ

### Scala REPL

Useful hints:

+ If you want change the maximum output size of the REPL you can use the following commands in the REPL

```
:power
vals.isettings.maxPrintString = 10000
```

### Debugging in Eclipse towards an Hadoop cluster

Set the following environement variables:

```
MASTER=yarn-client
SPARK_JAR=$DATALAYER_HOME/ext/lib/spark-assembly-1.2.1-hadoop2.6.0_2.11.jar
HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop
```

Optionaly, you can also set:

```
SPARK_YARN_MODE=true
```

# Examples

Here are a few examples that are shipped with the Datalayer SDK. You will find them in the `examples` directory ([here](https://github.com/datalayer/sdk/tree/master/examples). 

## Getting started

From the sdk directory, you just have to run the following command:

```
./bin/datalayer-notebook
```

and that's it. 

You'll find more details about:

+ the Datalayer SDK [here](http://datalayer.io/sdk/) ([source](https://github.com/datalayer/sdk)) 
+ the Datalayer notebook [here](http://datalayer.io/notebook/) ([source](https://github.com/datalayer/notebook)).

## For beginners 

### Hello World 

A preview of all the things you can do in a Notebook. The different boxes are called paragraphes. They are small containers, they can execute pieces of code. Notice the use of magic commands like `%sqlb` or `%md` at the beginning, they are used to specify the language you are about to use in your paragraphes. The magic `%spark` is activated by default for you in each paragraph, no need to repeat it.

Here is a list of all the main magic you can do:

- `%spark`: activated by **default**. With this one, your notebook will understand Scala and guess what? It also embeds a Spark Context.
- `%md`: use this if you want to write a beautiful data story, it's called markdown and it's easy to use and allow you to easily format text. Notice you can add images and that HTML is supported.
- `%sqlb`: this is getting serious, hold tight because it will blow your mind! SQLB extends Spark SQL and add some powerful feature, we will get back to that later.
- `%sh`: let you talk to your terminal without leaving your notebook
- `%dfs`: let you talk to your Hadoop File System.
- ... and you'll find more details about the datalayer notebook [here](https://github.com/datalayer/notebook/blob/master/src/site/markdown/index.md).

### Markdown

If you don't know what Markdown is we recommend you to read [this](http://daringfireball.net/projects/markdown/syntax). This notebook shows what you can do. All the basics from the original markdown syntax are available as well as many other features such as the magic forms you can embbed into your markdown code. For instance, try this:

```
%md Hello, my name is ${name=Datalayer}
```

### Shell

Doing all the things you need without leaving your notebooks? easy-peasy-lemon-squeezy!

```
%sh pwd # will print the current directory
```
We are sure you got where this is going? Not yet? Try this than:

```
%sh ls 
```
Okay, now you got it! It's just like a shell, but without an actual (ugly green text on black) shell.


## Advanced tutorials

### DFS

Yes, we are talking about **big data** here at Datalayer. So, what would be a notebook without a way to interact seamlessly with your favorite Hadoop File System? That is what the magic `%dfs` is made for. It allows you to move files, copy them from local and all the things you are used to do with your favorite distributed file system directly inside a notebook. Isn't that handy? We crafted it, just for you.

### SVG

Eric made this to show how to write your own interpreter. So there is this new magic `%svg`. It allows to draw tigers inside a notebook. How cool is that? **Amazingly cool**! 

### SQLB

## Text mining tutorial

### Text

Inpsired from [this](http://spark.apache.org/docs/latest/mllib-feature-extraction.html#normalizer).

You will need to download [this](http://mattmahoney.net/dc/text8.zip). It's a small text file containing a lots of words.

+ Build a model based on text
+ Listen to social networks
+ Get relevant posts and users

### Sentiment

## Machine learning tutorials (Spark/MLLib)

In our tutorials, we will see how to use the current [MLLib](https://spark.apache.org/mllib/) packages and its beautifully crafted data science tools. Most of the following tutorials are basic explorations of the currently implemented methods found in MLLib, we simply applied them on the [wine dataset](https://archive.ics.uci.edu/ml/datasets/Wine). You will find more information on the datasets shipped with the sdk [here](datasets).

The following methods are currently "available" in MLLib. However, note that some of them are still in their experimental stages:

+ **Classification**: `LogisticRegression`, `NaiveBayes` and `SVM` usages and examples can found in the *mllib-classification* notebook.
+ **Clustering**: a short `KMeans` example is implemented in the *mllib-clustering* notebook.
+ **Evaluation**: `AreaUnderCurve`, `BinaryClassificationMetrics`, `MulticlassMetrics` are used in all the supervised examples provided here. But `RankingMetrics` is not covered by the current tutorials.
+ **Feature**: `HashingTF`, `IDF` and `Word2Vec` are being used in the *text* notebook. `StandardScaler` is used in some of the *mllib-xxx* notebooks while the `Normalizer` is not covered.
+ **Linalg**: we tried `PCA` and `SVD` in the *mllib-linalg* notebook.
+ **Recommendation**: `ALS` and `MatrixFactorization` are not covered by the current tutorials.
+ **Regression**: `Lasso`, `LinearRegression` and `RidgeRegression` samples can be found in the *mllib-regression* notebook
+ **Tree**: we tried the `DecisionTree` in the *mllib-tree* notebook. But did not tried (yet) the current implementation of the `RandomForest`.

### Loading your data

With MLLib there are mainly two types of data: `Vectors` and `LabeledPoint`. You will have to choose between the two based on what you are doing: unsupervised or supervised machine learning.
Note that internally, for many methods, MLLib uses [Breeze](https://github.com/scalanlp/breeze).

Let's get back to our wine dataset file where columns are separated by a `,`, and the first column corresponds to our target variable (there are 3 different classes), the one we would like to predict based upon all the other variables.  it looks like this:

```
1,14.23,1.71,2.43,15.6,127,2.8,3.06,.28,2.29,5.64,1.04,3.92,1065
1,13.2,1.78,2.14,11.2,100,2.65,2.76,.26,1.28,4.38,1.05,3.4,1050
1,13.16,2.36,2.67,18.6,101,2.8,3.24,.3,2.81,5.68,1.03,3.17,1185
1,14.37,1.95,2.5,16.8,113,3.85,3.49,.24,2.18,7.8,.86,3.45,1480
1,13.24,2.59,2.87,21,118,2.8,2.69,.39,1.82,4.32,1.04,2.93,735
1,14.2,1.76,2.45,15.2,112,3.27,3.39,.34,1.97,6.75,1.05,2.85,1450
1,14.39,1.87,2.45,14.6,96,2.5,2.52,.3,1.98,5.25,1.02,3.58,1290
1,14.06,2.15,2.61,17.6,121,2.6,2.51,.31,1.25,5.05,1.06,3.58,1295
1,14.83,1.64,2.17,14,97,2.8,2.98,.29,1.98,5.2,1.08,2.85,1045
1,13.86,1.35,2.27,16,98,2.98,3.15,.22,1.85,7.22,1.01,3.55,1045
```

For unsupervised approaches (such as KMeans or PCA), you can load the wine dataset with the following code:

```
import org.apache.spark.mllib.linalg.Vectors

// Loading the wine dataset (and ignoring the target column)
val filename = "/dataset/wine/wine.data"
val data_unlabeled = sc.textFile(filename).map { 
    line => val fields = line.split(",")
    Vectors.dense( { fields.drop(1).map(_.toDouble) } )
}
```
On the other hand, for supervised approaches, we will use the `LabelledPoint` which simply allows to add a label on each row of your data:

```
import org.apache.spark.mllib.linalg.Vectors
import org.apache.spark.mllib.regression.LabeledPoint

val filename = "/dataset/wine/wine.data"
val data_labeled = sc.textFile(filename).map { 
    line => val fields = line.split(",")
        LabeledPoint(            
            fields(0).toDouble - 1, // comment about the - 1 ?
            Vectors.dense( { fields.drop(1).map(_.toDouble) } )
            )
}
``` 

If you need to filter your dataset, for instance to keep only two labels, you can do this:

```
val data_binary = data_labeled.filter(x => x.label < 2)
```

and if you need a subsample of your data or to split your data into subsets, you can do the following:

```
// take a random subsample
val subset = data.sample(false,0.5)

// split your data into 2 random subsets: train and test
val Array(train, test) = data.randomSplit(Array(0.5,0.5))

```

You should end up with a [Resilient Distributed Dataset](http://www.cs.berkeley.edu/~pwendell/strataconf/api/core/spark/RDD.html) (RDD) which can be fed to the different machine learning methods found in MLLib.

# License

Copyright 2016 Datalayer (http://datalayer.io)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

# Get it Easy!

For end users, we provide docker image ensuring an easy start with Datalayer:

```
curl https://raw.githubusercontent.com/datalayer/sdk/master/bin/datalayer-emulator
```

For software developers, a [SDK](http://datalayer.io/doc/platform/sdk) is also available. The SDK ships with tutorials and data sets to play with.

For devops, [a Manager](http://datalayer.io/doc/platform/manager) ensures the deployment, configuration and monitoring of the components in a production environment.

The Datalayer platform is massively organized in components, allowing any third party to pick and integrate parts of them.

# Data DNA

We state that all data source (internal or external) should be stored in an immutable way, but also
be deeply cleaned and analyzed to retrieve the `core features` of these sources.

Here, at Datalayer, We call those `core features` the [Data DNA](http://datalayer.io/doc/platform/dna).

The `Data DNA` is persisted in big data [stores](http://datalayer.io/doc/platform/store) and can be efficiently searched and visualized.

A [Business Router](http://datalayer.io/doc/platform/router) allows to build a dynamic pipeline of data processing based on the Business Routing Protocol (BRP).

Our components are strongly integrated with the data sources (e.g. twitter, database) via [connectors](http://datalayer.io/doc/platform/connector).

The combination of those components are sketched here after:

```
internal and |


 external    |  --- connector --- router
 sources     |                      |
                                  store
                                    |
                                   dna
```

# SQLB

We deliver for you high-level solution to address horizontal needs.

* A first one is targeted to [marketers](http://datalayer.io/doc/platform/marketer).
* A second one is targeted to [recruiters](http://datalayer.io/doc/platform/recruiter).

Both those solution rely on [SQLB](http://datalayer.io/doc/platform/sqlb) (SQL for Business) and benefit 
from common libraries to interact on the [social networks](http://datalayer.io/doc/platform/social) and 
manage [campaigns](http://datalayer.io/doc/platform/campaign). 

Our components can interact via different [channels](http://datalayer.io/doc/platform/channel) (web, mobile).

You can also develop own business language with SQLB DSL (Domain Specific Language).

```
marketer recruiter
       \ /
        |         /---social---\
       sqlb ---  --- campaign---- ---  channels
        |
      store
        |
       dna
```

# Data Science

We rely on core Big Data Science components providing commonly used algorithms and utilities to train and build [models](http://datalayer.io/doc/platform/algorithm).

We support the following implementations:

+ Graph: Component to build and analyse graph models, including Shortest Path, Rank, Reach.
+ Categorisation: Component to build regression, random forest models.
+ Predictions: Component to build control charts models.
+ Text: Component to build text oriented models.

The models process the Data DNA accessible via the [store](http://datalayer.io/doc/platform/store) components.

The distribution of the processing is ensured by the [scalex](http://datalayer.io/doc/platform/scalex) component where we 
support your preferred technical language (Scala, Java, R, Python...) for the algorithms.

```
    model
      |
    scalex
      |
    store
      |
     dna
```

# Packaged Tools

We provide packaged tools targeted to end-users:

* [Notebook](http://datalayer.io/doc/platform/notebook): A WEB notebook to interact and visualize Big Data.
* [REPL](http://datalayer.io/doc/platform/repl): A Read-Evaluate-Print-Loop in a shell to interact and visualize.

# Libraries

We also ship utilities libraries targeted to developers:

* [Lambda](http://datalayer.io/doc/platform/lambda): A library with basic functions for the "Lambda Architecture".

# The Datalayer SDK

The Datalayer SDK contains all you need to build and run the Datalayer applications.

It gives you nice and easy high level interfaces to command the Datalayer stack, with tutorials and datasets to play with.

## Run with Docker

For the impatients, we have a docker image.

Just copy/paste the following line in your terminal:

```
curl https://raw.githubusercontent.com/datalayer/sdk/master/bin/datalayer-docker | bash
```

## Requirements

Ensure you have Java (with minimum version 7, version 8 is better) on your machine (type `java -version`).

Don't forget to have JAVA_HOME environment variable set in you system. Note that if you get the following error: `java.lang.OutOfMemoryError: PermGen space` when running with jdk1.7 you might need to add the following directive `-XX:MaxPermSize=256M` running the notebook.

## Install the SDK

Just copy/paste in a shell (you know, a terminal, the stuff with a black background):

```
curl https://raw.githubusercontent.com/datalayer/sdk/master/bin/datalayer-install | bash
```

It may take 20 minutes (depending on your internet connection speed) to download the artifacts, including Hadoop, Spark...
from the Internet the first time you launch).

# SDK from the command Line

Launch `./datalayer-sdk/bin/datalayer`, you will get a shell to learn and analyse data.

```
eric@eric:~$ ./datalayer-sdk/bin/datalayer
             ___       __       __                 
   _______  / _ \___ _/ /____ _/ /__ ___ _____ ____
  _______  / // / _ `/ __/ _ `/ / _ `/ // / -_) __/
 _______  /____/\_,_/\__/\_,_/_/\_,_/\_, /\__/_/   
                                    /___/          

 Big Data => Business Value [http://datalayer.io]
 Type `help` to get started.

datalayer> help
res0: datalayer.help.type = 

    Keep calm and carry on, we are here to help!
    --------------------------------------------

    Type one of the following:
    
    - datalayer     : General information on Datalayer functionalities.
    - school  : Follow lessons to learn Datalayer functionalities.
    - ...
    
datalayer> 

```

# SDK from the Browser

Launch `datalayer-notebook`, you will get a WEB interface to learn and analyse data.

A WEB browser will be start automatically to the correct page. You should see a page such as:

[![Datalayer Desktop](http://datalayer.io/doc/platform/sdk/images/screenshot/notebook-home.png)](http://datalayer.io/platform)

Ensure the Notebook is connected (red light on the right-top corner) and choose an example to play with.

The Datalayer Notebook (WEB user interface) is a nice way to access the SDK.
You can read more on the Notebook features and usage on <a href="http://datalayer.io/notebook">the Datalayer Notebook web site</a>.

Type "CTRL-C" in your shell to stop the Datalayer Notebook.

## SDK from the IDE

We support Eclipse as favorite Integrated Development Environment.

# Learn Big Data Science (WIP)

Don't expect fully operation solution, this is still a work in progress (WIP).

We address Business (bus), Mathematicians (math) and Software Developers (ict) needs.

To help you get through, pick one of the following mean (we indicate the relevance depending on your profile):

## Books

Read the Datalayer books to get a sense of the functionalities we provide:

+ Cases Book (https://github.com/datalayer/book-cases) `bus(++++) math(++) ict(+)`
+ Models Book (https://github.com/datalayer/book-models) `bus(+++) math(+++) ict(+++)`
+ Platform Book (https://github.com/datalayer/book-platform) `bus(+) math(++) ict(++++)`

## Lessons

The SDK embeds lessons to learn different methods. Type `school` in the SDK. `bus(+) math(+++) ict(+++)`

## Examples

Launch `datalayer-notebook` and learn by testing the examples [examples](http://datalayer.io/doc/platform/sdk/examples) `bus(+) math(+++) ict(+++)`.

[![Datalayer Desktop](http://datalayer.io/doc/platform/sdk/images/screenshot/notebook-example-1.png)](http://datalayer.io/platform)

You can also have a REPL typing `datalayer`. Just like the notebook, the REPL ships with the Datalayer models... You can try a very simple control chart with the following snippet:

```
val testArray = Array[Float](5, 5, 5, 5, 5, 5, 5, 5, 9)
val cc = new ControlChart(testArray)
cc.summary()
```

# Phase 1 - Collect Data

+ Collect from Web and Social
+ Push them in a Bus (Kafka)
+ Read them from the Bus and persist in a KeyValue (HBase) and Index (Solr)

# Setup

## Local Servers

You will need a few servers to run. Prepare them with:

```
+ mkdir /w/dat
+ datalayer-hadoop-init (optional)
+ datalayer-zookeeper-init
```

Launch them with:

```
+ datalayer-hadoop-start (optional)
+ datalayer-zookeeper-start
+ datalayer-kafka-start
+ datalayer-hbase-start (optional)
+ datalayer-solr-start (optional)
+ datalayer-xvfb-start
```

## Notebook

The notes will be persisted in this repository under ./src/main/notebook/worskspace folder.

Start the servers you need (zookeeper, hadoop, hbase, kafka, xvfb...) and invoke` ./bin/abi-notebook-start`

Create your account and link it to the boostrap account, code your awesomeness and push the note.json files.

