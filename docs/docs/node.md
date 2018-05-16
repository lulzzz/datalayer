# Minimum SDK

```
rm -fr /d/sdk /d/sdk.zip
mkdir /d/sdk
cp -r $DATALAYER_HOME/bin $DATALAYER_HOME/ext $DATALAYER_HOME/docker/ /d/sdk
cd /d
rm -fr sdk/docker/centos/7 sdk/docker/ubuntu sdk/docker/centos/6/spitfire
zip -r sdk.zip sdk
```

```
scp sdk.zip 13.92.89.74:~
scp sdk.zip 13.82.223.51:~
ssh 13.92.89.74
datalayer-docker-master-restart hadoop centos 6
ssh 13.82.223.51
datalayer-docker-slave-restart hadoop centos 6
```

# Virtual Machine

## Ubuntu 16.04

```
sudo su
cd
apt-get update
apt-get install -y unzip docker.io default-jdk
ln -s /usr/lib/jvm/default-java /opt/jdk
cp /home/datalayer/sdk.zip .
unzip sdk.zip
export DATALAYER_HOME=/root/sdk
export PATH=$DATALAYER_HOME/bin:$PATH
datalayer-docker-build base centos 6
datalayer-docker-build serfdom centos 6
datalayer-docker-build hadoop centos 6
```

## Centos 6.8

```
sudo su
yum install -y docker java-1.8.0-openjdk-devel
```

# Manager Nodes

## Master Node

## Size

```
+ D4 8 cores 28GB 400GB-SSD
+ A4 8 cores 14GB ???
```

## Network

Master ports.

```
+ 22
+ 80
+ 88
+ 389
+ 749 (no, keberos admin)
+ 8080
+ 8088
+ 50070
```

### CentOS

Choose the CentOS 6.5 (distributed by OpenLogic) images from the Azure Marketplace.

Become root.

```
sudo su
```

Install the basics.

```
rpm -ivh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
```

```
yum install -y git htop java-1.8.0-openjdk-devel.x86_64 firefox xorg-x11-server-Xvfb openssl-devel telnet curl tar autoconf automake screen
yum groupinstall "Development Tools"
```

```
ln -s /usr/lib/jvm/java-1.8.0 /opt/jdk-1.8.0
```

Install NTP.

```
yum install -y ntp
chkconfig ntpd on
service ntpd start
```

Disable iptables

```
service iptables stop
chkconfig iptables off
```

Install Maven.

```
cd /opt
curl http://apache.belnet.be/maven/maven-3/3.3.3/binaries/apache-maven-3.3.3-bin.tar.gz -o apache-maven-3.3.3-bin.tar.gz
tar xvfz apache-maven-3.3.3-bin.tar.gz
rm apache-maven-3.3.3-bin.tar.gz
```

Configure the environment variables `vi ~/.bashrc`.

```
export DATALAYER_HOME=/sdk
export PATH=$DATALAYER_HOME/bin:$PATH
export JAVA_HOME=/opt/jdk-1.8.
export PATH=$JAVA_HOME/bin:$PATH
export MAVEN_HOME=/sdk/ext/apache-maven-3.3.3
export PATH=$MAVEN_HOME/bin:$PATH
export MAVEN_OPTS="-Xmx4g -Xms1g -XX:ReservedCodeCacheSize=1g"
export HADOOP_HOME=$DATALAYER_HOME/ext/hadoop-2.7.1
export PATH=$HADOOP_HOME/bin:$PATH
export HADOOP_CONF_DIR=/etc/hadoop/conf
export ZEPPELIN_PORT=80
export DATALAYER_PORT=80
export DATALAYER_REPOSITORY=~/.m2/repository
export DATALAYER_HADOOP=yarn-client
export DATALAYER_HADOOP_STATUS=started
export PATH=/usr/local/bin:$PATH
```

```
source ~/.bashrc
```

Configure git.

```
git config --global url."https://".insteadOf git://
```

Create the dot folder.

```
mkdir ~/.config
mkdir ~/.datalayer
```

Clone and install the needed repositories.

```
sudo su
mkdir --parents /opt/datalayer
cd /
ln -s /opt/datalayer /dla
```

Install protobuf.

```
datalayer-protoc-2-5-0
```

```
cd /dla
git clone https://bitbucket.org/datalayer/datalayer-git datalayer
datalayer-build
```

```
cd /dla
git clone https://bitbucket.org/datalayer/phoenix-datalayer.git phoenix-datalayer
datalayer-phoenix-build
```

```
cd /dla
git clone https://bitbucket.org/datalayer/datalayer-spitfire datalayer-spitfire
datalayer-spitfire-build
```

```
cd /dla
git clone https://bitbucket.org/datalayer/datalayer-web datalayer-web
datalayer-web-build
```

```
datalayer-build
```

Install Kerberos.

```
yum install -y krb5-server krb5-libs krb5-auth-dialog krb5-workstation
```

Configure the Kerberos files.

```
cp $DATALAYER_HOME/ansible/resources/krb5.conf /etc/krb5.conf
cp $DATALAYER_HOME/ansible/resources/kdc.conf /var/kerberos/krb5kdc/kdc.conf
cp $DATALAYER_HOME/ansible/resources/kadm5.acl /var/kerberos/krb5kdc/kadm5.acl
mkdir /var/log/kerberos
mkdir /var/lib/krb5kdc
mkdir /var/log/kerberos/{krb5kdc,kadmin,krb5lib}.log
mkdir /etc/krb5kdc
chmod -R 750  /var/log/kerberos
```

```
kdb5_util create -r DATALAYER.IO -P root -s
```

Start Kerberos.

```
service krb5kdc restart
chkconfig krb5kdc on
service kadmin restart
chkconfig kadmin on
```

Create Keberos admin user.

```
kadmin.local -q "addprinc admin/admin"
```

Add Kerberos users.

```
cat <<EOF >/tmp/k
xxx
addprinc root
xxx
xxx
q
EOF
kadmin.local -p admin/admin < /tmp/k
```

Disable SELinux and PackageKit and check the umask Value. You must disable SELinux for the Ambari setup to function. On each host in your cluster,

```
setenforce 0
```

To permanently disable SELinux set SELINUX=disabled in `/etc/selinux/config`. This ensures that SELinux does not turn itself on after you reboot the machine . 
    
Install Ambari.

```
wget -nv http://public-repo-1.hortonworks.com/ambari/centos6/2.x/updates/2.1.1/ambari.repo -O /etc/yum.repos.d/ambari.repo
yum install -y ambari-server ambari-agent ambari-log4j
```

Create the ssh key.

```
ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Enable the restricted ports to be used by non-root users.

```
setcap cap_net_bind_service+ep $JAVA_HOME/bin/java
echo "$JAVA_HOME/lib/amd64/jli" > /etc/ld.so.conf.d/java-libjli.conf
ldconfig -v
```

Install R.

```
yum install R R-devel 
```

```
R
install.packages("knitr", repos = "http://cran.us.r-project.org")
install.packages("glmnet", repos = "http://cran.us.r-project.org")
install.packages("pROC", repos = "http://cran.us.r-project.org")
install.packages("wordcloud", repos = "http://cran.us.r-project.org")
install.packages("data.table", repos = "http://cran.us.r-project.org")
install.packages("caret", repos = "http://cran.us.r-project.org")
install.packages("sqldf", repos = "http://cran.us.r-project.org")
install.packages("ggplot2", repos = "http://cran.us.r-project.org")
install.packages("devtools", repos = "http://cran.us.r-project.org")
library(devtools)
install_github("amplab-extras/SparkR-pkg", subdir="pkg")
```

Install Python packages.

```
yum install -y python-pip scipy python-matplotlib ipython sympy python-nose
pip install py4j numpy pandas pattern
pip install pygtk
pip install scikit-learn
```

Add sprindale.repo in /etc/yum.repos.d

```
[PUIAS_6_core_Base]
name=PUIAS core Base $releasever - $basearch
mirrorlist=http://puias.math.ias.edu/data/puias/$releasever/$basearch/os/mirrorlist
#baseurl=http://puias.math.ias.edu/data/puias/$releasever/$basearch/os
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-puias
[PUIAS_6_core_Updates]
name=PUIAS core Updates $releasever - $basearch
mirrorlist=http://puias.math.ias.edu/data/puias/updates/$releasever/en/os/$basearch/mirrorlist
#baseurl=http://puias.math.ias.edu/data/puias/updates/$releasever/en/os/$basearch
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-puias
```

```
yum install -y --nogpg pygtk2
```

Configure the matplolib backend `vi /etc/matplotlibrc`

```
backend      : Agg
```

LDAP servers

```
yum -y install openldap openldap-servers openldap-clients perl
cd /etc/openldap/slapd.d/cn\=config
for i in olcDatabase*; do
    perl -npe 's/dc=my-domain,dc=com/dc=datalayer,dc=io/' -i $i
done
for i in olcDatabase*bdb.ldif; do
    echo "olcRootPW: $(slappasswd -s secret)" >> $i
done
cd /etc/sysconfig
perl -npe 's/#SLAPD_/SLAPD_/' -i ldap
echo "local4.* /var/log/slapd.log" >> /etc/rsyslog.conf
service rsyslog restart
service slapd restart
chkconfig slapd on
```

```
cat <<EOF >~/initial-dit.ldif
dn: dc=datalayer,dc=io
dc: datalayer
o: datalayer
objectclass: dcObject
objectclass: organization
objectclass: top

dn: ou=Users, dc=datalayer,dc=io
ou: Users
objectclass: organizationalUnit

dn: ou=Groups, dc=datalayer,dc=io
ou: Groupsinit.
objectclass: organizationalUnit

dn: ou=Maps, dc=datalayer,dc=io
ou: Maps
objectclass: organizationalUnit
EOF
ldapadd -a -c -f ~/initial-dit.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -w secret
```

```
cat <<EOF >~/initial-autofs.ldif
dn: nisMapName=auto.master,ou=Maps,dc=datalayer,dc=io
nisMapName: auto.master
objectclass: nisMap

dn: cn=/home,nisMapName=auto.master,ou=Maps,dc=datalayer,dc=io
cn: /home
objectClass: nisObject
nisMapName: auto.master
nisMapEntry: auto.home

dn: nisMapName=auto.home,ou=Maps,dc=datalayer,dc=io
nisMapName: auto.home
objectClass: nisMap

dn: cn=/,nisMapName=auto.home,ou=Maps,dc=datalayer,dc=io
cn: /
objectClass: nisObject
nisMapName: auto.home
nisMapEntry: -fstype=nfs,rw,hard,intr files.datalayer.io:/export/home/&
EOF
ldapadd -a -f ~/initial-autofs.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -w secret
```

Create a group and a user

```
datalayer-usergroup-create datalayer 500 ldap.datalayer.io 389
datalayer-user-create datalayer 200 500 ldap.datalayer.io 389
```

Create database

```
CALL SYSCS_UTIL.SYSCS_EXPORT_TABLE(NULL, 'USERS', '/tmp/USERS.CSV', ',', NULL, 'UTF-8');
CREATE TABLE USERS(
  ID BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH XXX, INCREMENT BY 1) NOT NULL,
  DISPLAY_NAME VARCHAR(255) NOT NULL,
  EMAIL VARCHAR(255) NOT NULL,
  FACEBOOK VARCHAR(255),
  FOURSQUARE VARCHAR(255),
  GITHUB VARCHAR(255),
  GOOGLE VARCHAR(255),
  LINKEDIN VARCHAR(255),
  LIVE VARCHAR(255),
  qslkZ4EDdfj VARCHAR(255) NOT NULL,
  TWITTER VARCHAR(255),
  USER_NAME VARCHAR(255) NOT NULL
);
ALTER TABLE USERS ADD CONSTRAINT EMAIL_UNIQUE UNIQUE (
    EMAIL
);
CREATE UNIQUE INDEX DATALAYER_USER_NAME_UNIQUE_INDEX ON "DATALAYER"."USERS"(USER_NAME);
CREATE UNIQUE INDEX DATALAYER_ID_UNIQUE_INDEX ON "DATALAYER"."USERS"(ID);
ALTER TABLE USERS ADD SYS_ID BIGINT NOT NULL DEFAULT -1;
ALTER TABLE USERS ADD CONSTRAINT SYS_ID_UNIQUE UNIQUE (
    SYS_ID
);
CALL SYSCS_UTIL.SYSCS_IMPORT_TABLE(NULL, 'USERS', '/tmp/USERS.CSV', ',', NULL, 'UTF-8', 1);
```

Upgrade your JCE for Kerberos.
   
```
cp $DATALAYER_HOME/docker/centos/6/ambari/jce/README.txt jce/README.txt $JAVA_HOME/jre/lib/security/README.txt
cp $DATALAYER_HOME/docker/centos/6/ambari/jce/local_policy.jar $JAVA_HOME/jre/lib/security/local_policy.jar
cp $DATALAYER_HOME/docker/centos/6/ambari/jce/US_export_policy.jar $JAVA_HOME/jre/lib/security/US_export_policy.jar
```

Now time to setup your Hadoop Cluster with Ambari via the WEB user interface.

```
ambari-agent start
ambari-server setup -s -j $JAVA_HOME
ambari-server start
```

Navigate to `http://master.datalayer.io:8080`, submit the Ambari credentials, and follow the wizard to deploy your Hadoop/HBase cluster.

Define the Proxy User in core-site.xml.

```
<property>
  <name>hadoop.proxyuser.datalayer.hosts</name>
  <value>*</value>
</property>
<property>
  <name>hadoop.proxyuser.datalayer.groups</name>
  <value>*</value>
</property>
```

```
dfs mkdir /user
dfs chmod 700 /user
```

When this is done, add the Spark assembly jar to HDFS.

```
sudo -u hdfs hdfs dfs -mkdir /apps
sudo -u hdfs hdfs dfs -mkdir /apps/datalayer
sudo -u hdfs hdfs dfs -put $DATALAYER_HOME/ext/lib/spark-1.6.1-bin-scala-2.11_hadoop-2.7.2.jar /apps/datalayer
```

Put dataset into Hadoop.

```
sudo -u hdfs hdfs dfs -put /dataset /
sudo -u hdfs hdfs dfs -ls /dataset
```

```
datalayer-sql-start
datalayer-hadoop-init
datalayer-hadoop-start
datalayer-zookeeper-start
datalayer-hbase-start
datalayer-solr-start
datalayer-R-start
datalayer-notebook-start -f
```

I've successfully run Zeppelin with Spark on YARN. I'm using Ambari and PivotalHD30. PHD30 is ODP compliant so you should be able to repeat the configuration for HDP (e.g. hortonworks).

```
1. Before you start with Zeppelin, make sure that your Spark/YARN env. works from the command line (e.g run Pi test). If it doesn't work make sure that the hdp.version is set correctly or you can hardcode the stack.name and stack.version properties as Ambari Custom yarn-site properties (that is what i did).
2. Your Zeppelin should be build with proper Spark and Hadoop versions and YARN support enabled. In my case used this build command: mvn clean package -Pspark-1.4 -Dspark.version=1.4.1 -Dhadoop.version=2.6.0 -Phadoop-2.6 -Pyarn -DskipTests -Pbuild-distr
3. Open the Spark interpreter configuration and set 'master' property to 'yarn-client' ( e.g. master=yarn-client). then press Save.
4. In (conf/zeppelin-env.sh) set HADOOP_CONF_DIR for PHD and HDP it will look like this: export HADOOP_CONF_DIR=/etc/hadoop/conf
5. (optional) i've restarted the zeppelin daemon but i don't think this is required.
6. Make sure that HDFS has /user/zeppelin user  folder exists and has HDFS write permissions. Otherwise you can create it like this:
sudo -u hdfs hdfs dfs -mkdir /user/<zeppelin user>
sudo -u hdfs hdfs dfs -chown -R <zeppelin user>t:hdfs /user/<zeppelin user>
```

Startup scripts

```
service --status-all
service datalayer-web start
```

# Slave Nodes

## Characteristics

Size.

```
+ D3 4 cores 14GB 200GB-SSD
+ A3 4 cores 7GB ???
```

## Networks

Open ports.

```
+ 22
+ 8042
```

## Storage

Next you need to find the device identifier for the data disk to initialize. There are two ways to do that:

a) In the SSH window, type the following command, and then enter the password for the account that you created to manage the virtual machine:

    $sudo grep SCSI /var/log/messages

For recent Ubuntu distributions, you may need to use sudo grep SCSI /var/log/syslog because logging to /var/log/messages might be disabled by default.

You can find the identifier of the last data disk that was added in the messages that are displayed.

Get the disk messages

OR

b) Use the lsscsi command to find out the device id. lsscsi can be installed by either yum install lsscsi (on Red Hat based distributions) or apt-get install lsscsi (on Debian based distributions). You can find the disk you are looking for by its lun or logical unit number. For example, the lun for the disks you attached can be easily seen from azure vm disk list `virtual-machine` as:

    ~$ azure vm disk list ubuntuVMasm
    info:    Executing command vm disk list
    + Fetching disk images
    + Getting virtual machines
    + Getting VM disks
    data:    Lun  Size(GB)  Blob-Name                         OS
    data:    ---  --------  --------------------------------  -----
    data:         30        ubuntuVMasm-2645b8030676c8f8.vhd  Linux
    data:    1    10        test.VHD
    data:    2    30        ubuntuVMasm-76f7ee1ef0f6dddc.vhd
    info:    vm disk list command OK

Compare this with the output of lsscsi for the same sample virtual machine:

    adminuser@ubuntuVMasm:~$ lsscsi
    [1:0:0:0]    cd/dvd  Msft     Virtual CD/ROM   1.0   /dev/sr0
    [2:0:0:0]    disk    Msft     Virtual Disk     1.0   /dev/sda
    [3:0:1:0]    disk    Msft     Virtual Disk     1.0   /dev/sdb
    [5:0:0:0]    disk    Msft     Virtual Disk     1.0   /dev/sdc
    [5:0:0:1]    disk    Msft     Virtual Disk     1.0   /dev/sdd
    [5:0:0:2]    disk    Msft     Virtual Disk     1.0   /dev/sde

The last number in the tuple in each row is the lun. See man lsscsi for more information.

In the SSH window, type the following command to create a new device, and then enter the account password:

$sudo fdisk /dev/sdc

    [AZURE.NOTE] In this example you may need to use sudo -i on some distributions if /sbin or /usr/sbin are not in your $PATH.

When prompted, type n to create a new partition.

Create new device

When prompted, type p to make the partition the primary partition, type 1 to make it the first partition, and then type enter to accept the default value for the cylinder.

Create partition

Type p to see the details about the disk that is being partitioned.

List disk information

Type w to write the settings for the disk.

Write the disk changes

Make the file system on the new partition. As an example, type the following command and then enter the account password:

$ sudo mkfs -t ext4 /dev/sdc1

Create file system

    [AZURE.NOTE] Note that SUSE Linux Enterprise 11 systems only support read-only access for ext4 file systems. For these systems it is recommended to format the new file system as ext3 rather than ext4.

Make a directory to mount the new file system. As an example, type the following command and then enter the account password:

$ sudo mkdir /datadrive

Type the following command to mount the drive:

$ sudo mount /dev/sdc1 /datadrive

The data disk is now ready to use as /datadrive.

Add the new drive to /etc/fstab:

To ensure the drive is re-mounted automatically after a reboot it must be added to the /etc/fstab file. In addition, it is highly recommended that the UUID (Universally Unique IDentifier) is used in /etc/fstab to refer to the drive rather than just the device name (i.e. /dev/sdc1). To find the UUID of the new drive you can use the blkid utility:

$ sudo -i blkid

The output will look similar to the following:

/dev/sda1: UUID="11111111-1b1b-1c1c-1d1d-1e1e1e1e1e1e" TYPE="ext4"
/dev/sdb1: UUID="22222222-2b2b-2c2c-2d2d-2e2e2e2e2e2e" TYPE="ext4"
/dev/sdc1: UUID="33333333-3b3b-3c3c-3d3d-3e3e3e3e3e3e" TYPE="ext4"

[AZURE.NOTE] Improperly editing the /etc/fstab file could result in an unbootable system. If unsure, please refer to the distribution's documentation for information on how to properly edit this file. It is also recommended that a backup of the /etc/fstab file is created before editing.

Next, open the /etc/fstab file in a text editor. Note that /etc/fstab is a system file, so you will need to use sudo to edit this file, for example:

$ sudo vi /etc/fstab

In this example we will use the UUID value for the new /dev/sdc1 device that was created in the previous steps, and the mountpoint /datadrive. Add the following line to the end of the /etc/fstab file:

UUID=33333333-3b3b-3c3c-3d3d-3e3e3e3e3e3e   /datadrive   ext4   defaults   1   2

Or, on systems based on SUSE Linux you may need to use a slightly different format:

/dev/disk/by-uuid/33333333-3b3b-3c3c-3d3d-3e3e3e3e3e3e   /   ext3   defaults   1   2

You can now test that the file system is mounted properly by simply unmounting and then re-mounting the file system, i.e. using the example mount point /datadrive created in the earlier steps:

sudo umount /datadrive
sudo mount /datadrive

If the mount command produces an error, check the /etc/fstab file for correct syntax. If additional data drives or partitions are created you will need to enter them into /etc/fstab separately as well.

Subsequently removing a data disk without editing fstab could cause the VM to fail to boot. If this is a common occurrence, most distributions provide either the nofail and/or nobootwait fstab options that will allow a system to boot even if the disk fails to mount at boot time. Please consult your distribution's documentation for more information on these parameters.

## Centos6

Disable iptables

```
service iptables stop
chkconfig iptables off
```

Configure SSH

+ From the master, `sudpa`
+ On the slave1, `sudo su` and `passwd` to set the root password.
+ From the root master `ssh-copy-id -i ~/.ssh/id_rsa.pub root@slave1.datalayer.io`
+ Check with `ssh slave1.datalayer.io`

On master `yum install ansible` and configure the `/etc/host/ansible` file.

```
[masters]
master.datalayer.io
[slaves]
slave[1:9].datalayer.io
```

Test the connection to the slaves.

```
ansible all -m ping
ansible all -a "/bin/echo hello"
```

Install Java and upgrade the cryptography.

```
ansible slaves -m yum -a "name=java-1.8.0-openjdk-devel.x86_64 state=latest"
ansible all -a "java -version"
```

Install NTP.

```
yum install -y ntp
chkconfig ntpd on
service ntpd start
```

Disable iptables

```
service iptables stop
chkconfig iptables off
```

Disable SELinux and PackageKit and check the umask Value. You must disable SELinux for the Ambari setup to function. On each host in your cluster,

```
setenforce 0
```

To permanently disable SELinux set SELINUX=disabled in `vi `. This ensures that SELinux does not turn itself on after you reboot the machine . 

Configure /etc/hosts.

```
cat <<EOF >>/etc/hosts
a.b.c.d    ldap.datalayer.io ldap
EOF
```

LDAP Client

```
yum -y install openldap openldap-clients nss-pam-ldapd pam_ldap nscd autofs rpcbind nfs-utils
```

The authentication portion uses authconfig:

```
authconfig --enableldap  \
           --enableldapauth  \
           --ldapserver=ldap://ldap.datalayer.io:389/ \
           --ldapbasedn="dc=datalayer,dc=io"  \
           --enablecache  \
           --disablefingerprint  \
           --kickstart
```

With `visudo`

```
%datalayer ALL=(ALL) ALL
```

Test the LDAP Client

```
getent passwd eric
eric:*:600:200:Eric Charles,,,,:/home/eric:/bin/bash
```

```
getent shadow eric
eric:{SSHA}encrypted-stuff::::::::0
```

```
getent group sysusers
sysusers:*:200:root,eric
```

```
datalayer-user-search eric ldap.datalayer.io 389
```

scp /etc/matplotlibrc slave*:/etc

scp -r /opt/datalayer/sdk/ext/spark-1.6.0-bin-scala-2.11_hadoop-2.7.1/python/* slave*:/opt/datalayer/sdk/ext/spark-1.6.0-bin-scala-2.11_hadoop-2.7.1/python/


## HTTPD

```
sudo yum install httpd
```

```
vi /etc/httpd/conf/httpd.conf
```

```
<VirtualHost *:80>
ServerName play.datalayer.io
Redirect / https://play.datalayer.io
</VirtualHost>
```

```
vi /etc/httpd/conf.d/ssl.conf
```

```
#LogLevel debug
ProxyRequests off
#ProxyPass "/ws2/"  "ws://echo.websocket.org/"
#ProxyPass "/wss2/" "wss://echo.websocket.org/"
ProxyPass /ws ws://0.0.0.0:8187/ws
ProxyPassReverse /ws ws://0.0.0.0:8187/ws
ProxyPass / http://0.0.0.0:8187/
ProxyPassReverse / http://0.0.0.0:8187/
```


```
SSLCertificateFile /server.cer
SSLCertificateKeyFile /key.pem
SSLCertificateChainFile /intermediate.cer
SSLCACertificateFile /etc/pki/tls/certs/ca-bundle.crt
ProxyPass / http://0.0.0.0:8187/
ProxyPassReverse / http://0.0.0.0:8187/
```

```
/etc/init.d/httpd restart
```
  
# Ubuntu

```
apt-get install git htop openjdk-8-jdk build-essential dh-autoreconf r-base r-cran-rserve firefox xvfb telnet python-pip python-dev python-setuptools python-numpy python-scipy libatlas-dev libatlas3gf-base python-pandas
ln -s /usr/lib/jvm/java-8-openjdk-amd64 /opt/jdk1.8.0
```

apt-cache search xxx
--reinstall

# Startup

+ update-rc.d apache2 disable
+ update-rc.d -f apache2 remove

+ apt-get install upstart
+ initctl list

# Dev setup

+ sudo install bcmwl-kernel-source
+ sudo usermod -aG docker datalayer
+ sudo apt-get install htop git docker.io openjdk-8-jdk build-essential dh-autoreconf cairo-dock krb5-kdc krb5-admin-server krb5-kdc-ldap ldap-utils screen sysstat
+ displays.scale(1.25)
+ setting-apperance-behavior-autohide-launcher
+ cario-dock(configuration-apperance-3dplane+reserve-space-for-dock+on-startup)
+ /etc/fstab errors=remount-ro,noatime,discard
+ ln -s /opt/jdk-1.8 /usr/lib/jvm/java-8-openjdk-amd64
+ intellij+plugins(scala,markdown,shell)
+ firefox(home-page=about:blank+save-files-on-desktop+default-zoom-level-plugin-130+download-youtube-plugin)
+ gedit(disable-bu-file)

~/.bash_profile

export JAVA_HOME=/opt/jdk-1.8
export PATH=$JAVA_HOME/bin:$PATH
export MAVEN_HOME=/dla/sdk/ext/apache-maven-3.2.3
export PATH=$MAVEN_HOME/bin:$PATH
export MAVEN_OPTS="-Xmx4g -Xms1g -XX:ReservedCodeCacheSize=1g"
export HADOOP_CONF_DIR=/etc/hadoop/conf
export DATALAYER_PORT=80
export DATALAYER_HOME=/dla/sdk
export PATH=$DATALAYER_HOME/bin:$PATH
export PATH=$DATALAYER_HOME/../sdk-private/bin:$PATH
export DATALAYER_REPOSITORY=~/.m2/repository
export DATALAYER_HADOOP=yarn-client
export DATALAYER_HADOOP_STATUS=started
export PATH=/usr/local/bin:$PATH

R
install.packages("dendextend", dependencies=TRUE)
install.packages("circlize", dependencies=TRUE)
install.packages("gplots", dependencies=TRUE)
install.packages("d3heatmap", dependencies=TRUE)
install.packages("corrplot", dependencies=TRUE)

mount: encfs ~/.encrypted ~/.visible
unmount: fusermount -u ~/.visible

Disable ipv6, you have to open /etc/sysctl.conf using any text editor and insert the following lines at the end:

net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1

If ipv6 is still not disabled, then the problem is that sysctl.conf is still not activated.

To solve this, open a terminal(Ctrl+Alt+T) and type the command,

sudo sysctl -p

You will see this in the terminal:

net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1

After that, if you run: $ cat /proc/sys/net/ipv6/conf/all/disable_ipv6

It will report:
1

If you see 1, ipv6 has been successfully disabled.

# Office Setup

sudo add-apt-repository ppa:user/ppa-name

enable all sources in settings
sudo add-apt-repository ppa:inkscape.dev/trunk
sudo apt-get update
apt-get update

```
# Package Setup

```
sudo apt-get install ubuntu-restricted-extras
sudo apt-get install \
vim tree \
build-essential \
nodejs npm \
zip unzip rar p7zip-full mercurial g++ make autoconf2.13 yasm libgtk2.0-dev \
libglib2.0-dev libdbus-1-dev libdbus-glib-1-dev libasound2-dev \
libcurl4-openssl-dev libiw-dev libxt-dev mesa-common-dev \
libgstreamer0.10-dev libgstreamer-plugins-base0.10-dev libpulse-dev libtool \
libgfortran3 lib32stdc++6 lib32z1 libsctp1 libsasl2-dev libssl-dev libexpat1-dev libncurses5-dev libreadline6-dev \
libdbd-mysql libmysqlclient-dev \
gconf2 libgconf2-dev libgnomeui-dev libglade2-dev libnotify-dev \
r-base r-base-dev r-cran-boot r-cran-class r-cran-cluster r-cran-codetools r-cran-foreign r-cran-kernsmooth r-cran-rserve \
r-cran-lattice r-cran-mass r-cran-matrix r-cran-mgcv r-cran-nlme r-cran-nnet r-cran-rpart r-cran-spatial r-cran-survival \
gsl-bin libgsl0-dev libav-tools gnome-commander \
mysql-server emma \
indicator-multiload \
expect \
slapd \
postgresql postgresql-contrib postgresql-client \
zlibc zlib1g-dev ssh openssl curl htop apt-file rpm \
git gitk subversion bzr \
libnss-ldap ldap-utils \
chromium-browser texlive-full texlive-latex-recommended texlive-xetex gksu \
qtcreator recode \
virtualbox virtualbox-guest-additions-iso \
xvfb x11-xkb-utils \
msttcorefonts xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic xserver-xorg-core \
imagemagick \
gimp gimp-gmic gimp-help-en \
cmake \
inkscape \
wireshark \
pstoedit pdf2svg python-lxml pdftk \
libpam-dev \
vagrant \
gnome-color-chooser \
xscreensaver xscreensaver-data-extra xscreensaver-gl-extra \
davfs2 \
dia fbreader \
octave \
libsvn-java \
banshee vlc \
xsltproc \
gstreamer1.0-plugins-ugly \
account-plugin-irc nautilus-dropbox pidgin \
rsync pcscd \
gparted gpart \
kdenlive \
calibre \
dosbox devscripts \
gnome-bluetooth gnome-screensaver \
terminator \
kino x11-utils \
kazam \
ntfs-3g ntfs-config \
ntpdate \
flashplugin-installer \
indicator-multiload \
audacity recordmydesktop \
ubuntu-restricted-extras \
ruby ruby-dev python-setuptools python-pip python-pandas python-sklearn fabric \
ipython-notebook python-numpy python-matplotlib \
libboost-dev libboost-test-dev libboost-program-options-dev libevent-dev automake libtool flex bison pkg-config g++ libssl-dev \
spamassassin \
vagrant \
execstack \
rake jekyll sshfs \
libzmq-dev \
libpcsclite-dev \
cmake valac libgtk-3-dev librest-dev libjson-glib-dev libnotify-dev libcanberra-dev libx11-dev libwebkitgtk-3.0-dev libsqlite3-dev libxtst-dev libpurple-dev libdbusmenu-gtk-dev  \
libunity-dev libmessaging-menu-dev libgirepository1.0-dev libindicate-dev \
gtksourceview-3.0 \
uuid-dev \
skype \
ansible sysstat \
cairo-dock \
krb5-kdc krb5-admin-server krb5-kdc-ldap \
pandoc screen \
python-dev python-boto libsasl2-dev libapr1-dev libsvn-dev \
```

???
libcurl4-nss-dev 
openldap 
gnome-session-fallback \
libgee-dev
freemind \
lateXila \
recordmydesktop \

sudo npm install azure

+ baobab

sudo npm install azure

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9
Add the Docker repository to your apt sources list, update and install the lxc-docker package.
You may receive a warning that the package isn't trusted. Answer yes to continue installation.
$ sudo sh -c "echo deb https://get.docker.io/ubuntu docker main\
> /etc/apt/sources.list.d/docker.list"
$ sudo apt-get update
$ sudo apt-get install lxc-docker
-------------------------------------------------------------------------------
sudo add-apt-repository ppa:ubuntu-sdk-team/ppa
sudo apt-get update && sudo apt-get install ubuntu-sdk
sudo apt-get update && sudo apt-get dist-upgrade
-------------------------------------------------------------------------------
sudo apt-get install wireshark
sudo dpkg-reconfigure wireshark-common
sudo usermod -a -G wireshark $USER
sudo reboot
-------------------------------------------------------------------------------
sudo apt-get install libgnome-keyring-dev
cd /usr/share/doc/git/contrib/credential/gnome-keyring
sudo make
git config --global user.name "Eric Charles"
git config --global user.email eric@datalayer.io
git config --global credential.helper /usr/share/doc/git/contrib/credential/gnome-keyring/git-credential-gnome-keyring
-------------------------------------------------------------------------------
sudo vi /usr/share/lightdm/lightdm.conf.d/50-ubuntu.conf
add a line: 
allow-guest=false
-------------------------------------------------------------------------------
sudo adduser eric vboxusers
-------------------------------------------------------------------------------
configure
+ gedit for "no backup files"
+ terminal for initial size and unlimitted cache
+ nautilus for "single click"
-------------------------------------------------------------------------------
aos-deploy-palettes /p/aos-sdk-private.git/palette
aos-install-fonts /b/io.datalayer/corporate-template.git/font/ttf
-------------------------------------------------------------------------------
by-hand
+ dpkg -i ubuntu-tweak
+ dpkg -i rstudio
+ dpkg -i ganttproject
+ dpkg -i timekpr_0.3.3~ppa1~14.04~ubuntu2_amd64.deb
-------------------------------------------------------------------------------
+ inkscape texttext-extension inkscape-pages
foo$ tar -xvf inkscape-pages-0.1.tar.gz
foo$ cd inkscape-pages-0.1
foo$ sudo ./install [es|ro|en]
-------------------------------------------------------------------------------
by-hand (via compilation)
+ protoc-2.5.0
+ thrift
+ birdie
-------------------------------------------------------------------------------
by-hand
+ Oracle_VM_VirtualBox_Extension_Pack-4.3.14-95030
-------------------------------------------------------------------------------
by-hand
sudo groupadd docker
sudo gpasswd -a ${USER} docker
sudo service docker restart
-------------------------------------------------------------------------------
sudo apt-get install gdebi-core
sudo apt-get install libapparmor1
wget http://download2.rstudio.org/rstudio-server-0.98.501-amd64.deb
sudo gdebi rstudio-server-0.98.501-amd64.deb
-------------------------------------------------------------------------------
sudo pip install pandas
-------------------------------------------------------------------------------
sudo apt-get install \
ffmpeg \
libavcodec-extra-53 \
vlc-plugins-pulse \
xwininfo \
xvidcap \
gsambad \
nvidia-313 \
indicator-sysmonitor indicator-sensors \
istambul \
jitsi \
pitivi \
calibre \
-------------------------------------------------------------------------------
drwxr-xr-x  27 root root     4096 Jul  7 21:07 ./
drwxr-xr-x  27 root root     4096 Jul  7 21:07 ../
drwxr-xr-x   2 root root     4096 Mai 22 15:56 bin/
drwxr-xr-x   4 root root     4096 Mai 22 15:58 boot/
drwxr-xr-x   2 root root     4096 Feb 12 23:44 cdrom/
lrwxrwxrwx   1 root root       23 Mai 21 19:26 d -> /home/datalayer/Desktop
drwxr-xr-x  17 root root     4180 Jul 12 10:02 dev/
lrwxrwxrwx   1 root root       23 Mai 21 19:25 dla -> /home/datalayer/Desktop
drwxr-xr-x 172 root root    12288 Jul 12 10:02 etc/
drwxr-xr-x  10 root hadoop   4096 Jul  7 21:07 hadoop-2.6.0-secure/
drwxr-xr-x   3 root root     4096 Jul  7 21:07 hadoop-data/
drwxr-xr-x   6 root root     4096 Jul  7 15:37 home/
lrwxrwxrwx   1 root root       33 Feb 12 23:45 initrd.img -> boot/initrd.img-3.18.0-13-generic
drwxr-xr-x  26 root root     4096 Mai 22 15:52 lib/
drwxr-xr-x   2 root root     4096 Mai 22 15:52 lib32/
drwxr-xr-x   2 root root     4096 Mai 22 15:52 lib64/
drwx------   2 root root    16384 Feb 12 23:44 lost+found/
drwxr-xr-x   4 root root     4096 Mär 22 19:11 media/
drwxr-xr-x   2 root root     4096 Okt 23  2014 mnt/
lrwxrwxrwx   1 root root        8 Jun 19 06:14 now -> /dla/now
lrwxrwxrwx   1 root root       27 Mai 21 19:02 opt -> /home/datalayer/Desktop/opt
dr-xr-xr-x 279 root root        0 Jul 11 18:22 proc/
drwx------  15 root root     4096 Jul  7 21:19 root/
drwxr-xr-x  29 root root     1040 Jul 12 07:59 run/
lrwxrwxrwx   1 root root       24 Jun  1 14:22 s -> /home/datalayer/Desktop/
drwxr-xr-x   2 root root    12288 Mai 22 15:56 sbin/
drwxr-xr-x   2 root root     4096 Feb 10 08:33 srv/
dr-xr-xr-x  13 root root        0 Jul 11 18:22 sys/
drwxrwxrwt   6 root root   458752 Jul 12 10:02 tmp/
drwxr-xr-x  11 root root     4096 Feb 13 00:06 usr/
drwxr-xr-x  13 root root     4096 Feb 10 08:42 var/
drwxrwxrwx   2 root root     4096 Mai 29 13:59 Videos/
lrwxrwxrwx   1 root root       30 Feb 12 23:45 vmlinuz -> boot/vmlinuz-3.18.0-13-generic
drwxr-xr-x   3 root root     4096 Mai 22 12:52 w/
-------------------------------------------------------------------------------
pango-compat [https://github.com/bratsche/pango]
-------------------------------------------------------------------------------
sudo add-apt-repository ppa:conscioususer/polly-daily
sudo apt-get update
sudo sudo apt-get install polly
# sudo add-apt-repository --remove ppa:conscioususer/polly-daily
# sudo add-apt-repository ppa:conscioususer/polly-unstable
# sudo ppa-purge ppa:conscioususer/polly-daily
-------------------------------------------------------------------------------
| XXX                                                                         |
-------------------------------------------------------------------------------
Instructions (How to install the conversion utility and convert recordings)
1. On Linux, download and save the "nbr2mp4.tar" file to your home (~) directory
2. Open a terminal and navigate to your home directory:
cd ~
3. Extract the nbr2mp4 file to current directory:
tar -xvf nbr2mp4.tar ./
4. Make the file executable:
chmod +x ./nbr2mp4.sh
5. Install the nbr2mp4 utility in the default (home) directory:
./nbr2mp4.sh
6. Navigate to the newly created nbr2_mp4 utility directory:
cd nbr2_mp4
7. Save your network-based recording file or ARF file to the nbr2_mp4 directory
8. To begin conversion, switch back to a terminal and run the following command from your nbr2_mp4 directory:
./nbr2mp4 SOURCE [MP4_VERZEICHNIS] [FPS] 
-------------------------------------------------------------------------------
sudo apt-get remove --purge libreoffice* libexttextcat-data* && sudo apt-get autoremove
wget http://sourceforge.net/projects/openofficeorg.mirror/files/4.0.0/binaries/en-US/Apache_OpenOffice_4.0.0_Linux_x86_install-deb_en-US.tar.gz
tar -xvf Apache_OpenOffice*.tar.gz
sudo dpkg -i en-US/DEBS/*.deb
sudo dpkg -i en-US/DEBS/desktop-integration/*.deb
---
sudo apt-get purge openoffice*.* && sudo apt-get autoremove
sudo apt-get install libreoffice libreoffice-gnome
-------------------------------------------------------------------------------
sudo apt-get remove --purge \
libreoffice* libexttextcat-data* \
sudo apt-get autoremove
-------------------------------------------------------------------------------
apt-file update
apt-file list xxx
-------------------------------------------------------------------------------
npm install -g brunch
---
sudo apt-get install libgnome-keyring-dev
cd /usr/share/doc/git/contrib/credential/gnome-keyring
sudo make
git config --global credential.helper /usr/share/doc/git/contrib/credential/gnome-keyring/git-credential-gnome-keyring
---
Storing Passwords
Git can store your password in a secure way using a git-credential-helper. As of git 1.8 these are
    cache
    gnome-keyring
    osxkeychain
    wincred
    netrc (not secure, password in cleartext)
To get the gnome helper (on most current Linux distros) you will need to get git and build the helper yourself:
git clone https://github.com/git/git.git
cd git/contrib/credential/gnome-keyring
make
sudo cp git-credential-gnome-keyring /usr/local/bin
git config --global credential.helper /usr/local/bin/git-credential-gnome-keyring
On OSX machines, the osxkeychain helper is by default installed, to use it do:
git config --global credential.helper osxkeychain
In a terminal environment on Linux you can use the 'cache' authentication helper that is bundled with git 1.7.9 and higher:
git config --global credential.helper 'cache --timeout 3600'
After enabling credential caching any time you enter your password it will be cached for 1 hour (3600 seconds). 
-------------------------------------------------------------------------------
!!! DO NOT DO THIS OR X11 WILL NOT START !!!
# sudo sh -c 'echo "[SeatDefaults]" >> /etc/lightdm/lightdm.conf'
# sudo sh -c 'echo "greeter-session=ubuntu" >> /etc/lightdm/lightdm.conf'
# sudo sh -c 'echo "allow-guest=false" >> /etc/lightdm/lightdm.conf'
# sudo sh -c 'echo "" >> /etc/lightdm/lightdm.conf'
-------------------------------------------------------------------------------
Download flvtool2-1.0.6.tgz from http://rubyforge.org/projects/flvtool2/
wget http://rubyforge.org/frs/download.php/17497/flvtool2-1.0.6.tgz
Untar it and execute the following commands inside the untared directory:
ruby setup.rb config
ruby setup.rb setup
ruby setup.rb install
cp /opt/gate-5.0 (or install from jar)
cd /etc/init.d
scp /etc/init.d/aos-application-server-launcher root@172.16.1.206:/etc/init.d/
ln -s /opt/apache-tomcat-6.0.13/bin/catalina.sh
update-rc.d aos-application-server-launcher defaults
-------------------------------------------------------------------------------
Disable ipv6 @see http://www.g-loaded.eu/2008/05/12/how-to-disable-ipv6-in-fedora-and-centos/
-------------------------------------------------------------------------------
sudo apt-get install --no-install-recommends gnome-panel
gnome-desktop-item-edit ~/Desktop/ --create-new
-------------------------------------------------------------------------------
jad -s java -r -o -d javafolder_path classfile_path
-------------------------------------------------------------------------------
BASH
-------------------------------------------------------------------------------
powerline-shell.py
-------------------------------------------------------------------------------
ubuntu record video
+ kazam
+ recordmydesktop
-------------------------------------------------------------------------------
Iptables entries to allow traffic forward between the wireless and ethernet interfaces:
iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
iptables -A FORWARD -i wlan0 -o eth0 -m state \
         --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth0 -o wlan0 -j ACCEPT
The rules are then saved in the \emph{/etc/iptables.rules} file:
iptables-save >/etc/iptables.rules
In order to have these rules activated on boot, the \emph{/etc/network/if-pre-up.d/iptablesload} file is created:
#!/bin/sh
iptables-restore < /etc/iptables.rules
exit 0
And made executable:
chmod +x /etc/iptables.rules
-------------------------------------------------------------------------------
noip
#! /bin/sh
# . /etc/rc.d/init.d/functions  # uncomment/modify for your killproc
case "$1" in
    start)
    echo "Starting noip2."
    /usr/local/bin/noip2
    ;;
    stop)
    echo -n "Shutting down noip2."
    killall -TERM /usr/local/bin/noip2
    ;;
    *)
    echo "Usage: $0 {start|stop}"
    exit 1
esac
exit 0
---
sudo update-rc.d noip2 defaults
sudo /etc/init.d/noip2 start

-------------------------------------------------------------------------------
| QUESTIONS                                                                   |
-------------------------------------------------------------------------------
msc
+ The number of lilies in a pond double every day. So, on the first day of the month there is one lily. 
+ On the second day, two lilies, the next day four lilies, then eight, six- teen, thirty two, etc. 
+ If the pond is full on the 30th day of the month, what day is it half full?
-------------------------------------------------------------------------------
qubit
+ angle between 2 clock arrows (in function of h and m)
+ robot
+ from multiple fragmented files with student_id+student_name and files with student_id+student_address, generate a list of studend_id+student_name+student_address
-------------------------------------------------------------------------------
causata
+ difference between hashmap and treemap
+ hashmap working
+ arraylist vs linkedlist performance (get, insert)
+ btree on hfile?
+ 2 files intersection (sort, build index, split)
+ sort large file
+ maze test: find the path between 2 points in a maze
-----------------------------------------------------------------------------
ngmoco :)
+ find largest common sequence in numerous files (max 10GB on disk, and with 10GB in memory)
++ process them 2 by 2 with one reducer
++ ! there is still a hack to take into account after (I don’t remember...): it seems an additional condition must be applied to avoid bad result...)
+ hbase map reduce
+ avro
+ logistic regression usage for game behaviour
------------------------------------------------------------------------
stumbleupon
+ find common elements in a binary search tree (local / distributed)
+ singleton (synchronized - enum)
+ how to implement jni
+ nio in general
+ garbage collection types
+ cas (compare and swap)
+ “final” keyword usage
+ james data model
+ netty read/write ahead for headers (badly terminated with cr/lf?) ?
+ mysql log reading
------------------------------------------------------------------------
decarta
+ geohash (or similar with quarters)
+ probabilty for rayon to cross
+ execute once a method in a multithreaded env (synchronized - CountDownLatch)
+ Find word parts in a file based on a dictionary
+ synchronization techniques in general
+ hbase holes - how to repair?
------------------------------------------------------------------------
groupon
+ sort words by frequency (java - linux : wc / unique - hadoop)
------------------------------------------------------------------------
cloudera
+ implement “rm -fr” (recursive / iterative)
+ hashmap in java
+ advantage of binary vs char rpc
------------------------------------------------------------------------
quova
+ how to get one file as result of reducers (-getmerge)
+ loop like a snake
+ difference between mutex and lock
+ semaphore vs Mutex (how to do one with the other)
+ lru with hashMap and linkedlist
------------------------------------------------------------------------
atlassian
+ java Collections review
+ difference between hashmap and treemap: keySet is sorted
+ how to serialize and not serialize: volatile keyword
+ synchronization techniques in general + lock on a class
------------------------------------------------------------------------
salesforce
+ hashtable: implement + why
+ distributed calculation of median: http://www.quora.com/Distributed-Algorithms/What-is-the-distributed-algorithm-to-find-out-median-of-the-array-of-integers-located-in-different-computers
+ sql outer join + count() + group by
+ define optimistic lock
+ hbase schema at james
+ communication between a atm and bank - communication break, what about transaction - use 2 phase commit
+ reverse words (java - java with file split - hadoop with custom input/outputformat + do split align to blocks?)
+ file intersection (java - hadoop)
+ how many mappers and reducers for file intersection in case of 20 servers
+ what is a semaphore?
+ difference between tomcat/server IO and NIO?
+ denial Of Service Web filter
+ tune tomcat to support x clients                                   
-------------------------------------------------------------------------------
WINDOWS
-------------------------------------------------------------------------------
Windows 8.1 Enterprise (x64) - DVD (English)
Windows 8.1 Enterprise, Enterprise N, Pro VL, and Pro N VL
Multiple Activation
You have claimed 1 of 1 keys
3P44H-XNT93-QH6HM-TJYKD-FM33Q
-------------------------------------------------------------------------------
| ENVIRONMENT                                                                 |
-------------------------------------------------------------------------------
/etc/environment
sudo passwd
-------------------------------------------------------------------------------
| SMTP OUT                                                                    |
-------------------------------------------------------------------------------
make sure
+ your IP reverse host is correctly configured in the DNS.
+ to configure "hello name" in JAMES remote delivery to match that hostname
+ you have an SPF record published for your IP

keep in mind that a "new IP" (an IP never used to send email) is bad for deliverability. 
You will have to "warmup" it: it means you will have to send some email and providers 
will put them in spam until some user will take care to bring them out of spam, 
so they will start building a reputation for you/your IP and accept your mail more happily.
---
I am working on an email portion to a cloud based service with multi-tenancy interaction. 
Currently we are using the domain high5work.com which resolves to 173.10.69.157 Our plan is 
to give each subscriber of our system a subdomain. eg. somecompany.high5work.com
 I've setup an MX record so that *.high5work.com resolves to the above IP for SMTP

Here is your problem: 
# host -a 173.10.69.157 ;; ANSWER SECTION: 157.69.10.173.in-addr.arpa. 3600 IN PTR 173-10-69-157-BusName-Washington.hfc.comcastbusiness.net.

Find out how to change this PTR to somecompany.high5work.com or high5work.com or 
anything that doesn't sound like a dynamic ip or "impersonal ip" and then use that name in the helloname 
configuration (don't remember the right configuration name in James 3 right now). 
---
54.225.215.33 is listed on our Dynamic User List (DUL) because
Amazon has told us that this is not a static IP address.
 
We work very close with Amazon and receive regular updates from them. 
In Amazon's updates, all Amazon EC2 IP addresses
are by default dynamic and included in the DUL, unless specified by them that
it is static. 
So, if you are running a mail server on this IP address, please contact Amazon
and have them:
 
1) properly setup an rDNS for this IP to reference static
2) update us with the latest list
 
We will update the list accordingly.
 
If you have further questions, please contact Amazon directly.
 
Or please go to this link to file a request to Amazon.
https://aws-portal.amazon.com/gp/aws/html-forms-controller/contactus/ec2-email-limit-rdns-request

Kind regards,
Spam Investigation Team
Trend Micro, Inc.
---
https://portal.aws.amazon.com/gp/aws/html-forms-controller/contactus/ec2-email-limit-rdns-request
-------------------------------------------------------------------------------
| INSTALL                                                                     |
-------------------------------------------------------------------------------
+ curl https://codeload.github.com/datalayer/sdk/zip/master
+ curl https://raw.githubusercontent.com/datalayer/sdk/master/run.sh | bash -s dev

https://raw.githubusercontent.com/datalayer/sdk/master/run.sh :

#!/bin/bash

echo "Cloning spark-notebook"
if [ ! -d "spark-notebook" ]; then
  git clone https://github.com/datalayer/sdk.git
fi
cd spark-notebook

SBT_DIR="sbt"
if [ ! -d "$SBT_DIR" ]; then
  echo "Download sbt locally"
  wget https://dl.bintray.com/sbt/native-packages/sbt/0.13.6/sbt-0.13.6.tgz
  tar xvzf sbt*tgz
fi

echo "Launching Notebook"
echo "... it can take minutes. Your browser should open it if you didn't pass the '--no_browser' argument"
PARAM="server/run $@"
if [ "$1" == "dev" ]
then
  sbt/bin/sbt 'server/run --disable_security --no_browser' 2>&1 &
elif [ "$1" == "devb" ]
then
  sbt/bin/sbt 'server/run --disable_security' 2>&1 &
else 
  sbt/bin/sbt 'server/run' 2>&1 &
fi
-------------------------------------------------------------------------------
| NETWORK                                                                     |
-------------------------------------------------------------------------------
/etc/init.d/networking restart
-------------------------------------------------------------------------------
vi /etc/network/interfaces
auto lo
 iface lo inet loopback
auto eth0
iface wlan0 inet dhcp
iface eth0 inet static
 address 172.16.1.133
 netmask 255.255.255.0
 gateway 172.16.1.254
 dns-nameservers 172.16.1.131 195.238.2.21  195.238.2.22
-------------------------------------------------------------------------------
vi /etc/dhcp/dhclient.conf and comment everything
The suggested prepend domain-name-servers bit is to be set in /etc/dhcp/dhclient.conf, not /etc/dhcp3/dhclient.conf. 
domain-name-servers nameserver 172.16.1.131, 195.238.2.21, 195.238.2.22;
stop resolvconf
vi /etc/resolv.conf
nameserver 195.238.2.21
nameserver 195.238.2.22
vi /etc/resolvconf/resolv.conf.d/head 
In that file, after the header, put in your info like you would in resolv.conf
nameserver 172.16.1.131
nameserver 195.238.2.21
nameserver 195.238.2.22
Then restart resolvconf
service resolvconf restart
-------------------------------------------------------------------------------
/etc/hosts
127.0.0.1 localhost.net
set the hostname to the ip address
remove 127.0.1.1
-------------------------------------------------------------------------------
dig @172.16.1.131 apache.org MX
dig -x 91.183.38.48
nslookup 91.183.38.48
host 91.183.38.48
-------------------------------------------------------------------------------
sort | uniq
awk '!_[$0]++'

find . | xargs grep whatever
find . -name 'pom.xml' -execdir translate {} pom.atom \;

rm -i `find data/ -name "*.lck"`

find / -name foo.bar -print
find /tmp -name core -type f -print0 | xargs -0 /bin/rm -f
find . -name '.svn' -type d -print0 | xargs -0 /bin/rm -fr

tail -f
tail -n5000

tc (traffic control)
screen /dev/ttyS0 9600

cat /proc/meminfo
tar jxvf .tar.bz2

# HOSTS

/etc/hosts
hostname eric
domainname datalayer.io/
127.0.0.1 eric localhost.net
127.0.0.1 echarles.net blog.echarles.net edmond.echarles.net eleonore.echarles.net blog.ibayart.com echarles.github.io
127.0.0.1 u-mangate.com blog.u-mangate.com datalayer.io blog.datalayer.io datalayer.io blog.datalayer.io dataleaner.io blog.dataleaner.io
127.0.0.1 place.io blog.place.io tipi.io blog.tipi.io socialitude.com blog.socialitude.com
198.x.x.x git.datalayer.io
-------------------------------------------------------------------------------
| FILES                                                                       |
-------------------------------------------------------------------------------
it's common to give files a permission of 644, and directories a 755 permission,
sudo find . -type f -print0 | xargs -0 sudo chmod 644
sudo find . -type d -print0 | xargs -0 sudo chmod 755
chmod -R 751 /home/eric
-------------------------------------------------------------------------------
| LINKS                                                                       |
-------------------------------------------------------------------------------
drwxr-xr-x  24 root root  4096 Jan  7 08:25 ./
drwxr-xr-x  24 root root  4096 Jan  7 08:25 ../
lrwxrwxrwx   1 root root     4 Jan  7 08:14 aos -> /dla/
lrwxrwxrwx   1 root root    18 Jul 26 18:07 d -> /home/eric/Desktop/
lrwxrwxrwx   1 root root     7 Dec 22 07:57 data -> /s/data/
lrwxrwxrwx   1 root root     6 Jan  2 14:05 dla -> /s/dla/
lrwxrwxrwx   1 root root     6 Jan  7 08:25 doc -> /s/doc/
lrwxrwxrwx   1 root root    10 Jul 26 18:07 h -> /home/eric/
lrwxrwxrwx   1 root root    25 Jan  5 10:58 ing -> /s/io.datalayer/sales/ing/
lrwxrwxrwx   1 root root    32 Jul 26 08:45 initrd.img -> boot/initrd.img-3.16.0-5-generic
lrwxrwxrwx   1 root root     6 Jul 26 18:07 opt -> /w/opt/
lrwxrwxrwx   1 root root     6 Aug 23 14:43 s -> /w/src/
lrwxrwxrwx   1 root root    14 Jul 26 18:07 w -> /home/eric/wrk/
lrwxrwxrwx   1 root root    41 Aug  2 11:20 XENON2 -> /home/eric/wrk/lib/software/xenon2/xenon2/
-------------------------------------------------------------------------------
cd /
sudo ln -s ~ /h
sudo ln -s ~/wrk /w
sudo ln -s /w/src sr-
sudo ln -s ~/Desktop d
sudo rm -fr opt
sudo ln -s /w/opt opt
sudo ln -s /s/t4f-dataset.git/src/main/resources dataset
sudo ln -s /s/aos aos
sudo ln -s /s/cas cas
sudo ln -s /s/dla dla
sudo ln -s /s/t4f t4f
cd /var; sudo ln -s /w/dat/ data; sudo chown eric:eric data
## sudo ln -s /b/src s
ln -s /home/eric/wrk/lib/software/xenon2/xenon2 XENON2
---
cd /usr/lib/firefox-addons/plugins
sudo ln -s /opt/jdk1.8.0-b117/jre/lib/amd64/libnpjp2.so
---
ll /
total 104
drwxr-xr-x  23 root root  4096 Nov 26 15:11 ./
drwxr-xr-x  23 root root  4096 Nov 26 15:11 ../
lrwxrwxrwx   1 eric eric     6 Nov 26 09:51 a -> /w/aos/
lrwxrwxrwx   1 eric eric     6 Nov 26 09:51 b -> /w/bus/
drwxr-xr-x   2 root root  4096 Nov 26 05:34 bin/
drwxr-xr-x   3 root root  4096 Nov 26 05:52 boot/
lrwxrwxrwx   1 eric eric     6 Nov 26 09:51 c -> /w/com/
drwxrwxr-x   2 root root  4096 Nov 26 05:33 cdrom/
lrwxrwxrwx   1 eric eric    19 Nov 26 14:59 d -> /home/eric/Desktop/
drwxr-xr-x  16 root root  4080 Nov 27 07:57 dev/
drwxr-xr-x 143 root root 12288 Nov 27 07:57 etc/
drwxr-xr-x   3 root root  4096 Nov 26 05:33 home/
lrwxrwxrwx   1 root root    32 Nov 26 05:33 initrd.img -> boot/initrd.img-3.12.0-4-generic
drwxr-xr-x  25 root root  4096 Nov 26 05:51 lib/
drwxr-xr-x   2 root root  4096 Nov 26 05:51 lib32/
drwxr-xr-x   2 root root  4096 Nov 25 08:31 lib64/
drwx------   2 root root 16384 Nov 26 05:32 lost+found/
drwxr-xr-x   3 root root  4096 Nov 26 05:37 media/
drwxr-xr-x   2 root root  4096 Oct 18 16:07 mnt/
lrwxrwxrwx   1 eric eric     6 Nov 26 09:52 o -> /w/osa/
lrwxrwxrwx   1 eric eric     6 Nov 26 15:10 opt -> /w/opt/
lrwxrwxrwx   1 eric eric     6 Nov 26 09:51 p -> /w/prs/
dr-xr-xr-x 260 root root     0 Nov 27 07:57 proc/
drwx------   3 root root  4096 Nov 26 09:50 root/
drwxr-xr-x  23 root root   760 Nov 27 08:04 run/
lrwxrwxrwx   1 eric eric     6 Nov 26 15:11 s -> /w/spc/
drwxr-xr-x   2 root root 12288 Nov 26 05:34 sbin/
drwxr-xr-x   2 root root  4096 Nov 25 08:31 srv/
dr-xr-xr-x  13 root root     0 Nov 27 07:57 sys/
lrwxrwxrwx   1 eric eric     6 Nov 26 09:51 t -> /w/t4f/
drwxrwxrwt  16 root root  4096 Nov 27 08:07 tmp/
drwxr-xr-x  12 root root  4096 Nov 26 14:58 usr/
drwxr-xr-x  13 root root  4096 Nov 26 18:05 var/
lrwxrwxrwx   1 root root    29 Nov 26 05:33 vmlinuz -> boot/vmlinuz-3.12.0-4-generic
lrwxrwxrwx   1 eric eric    14 Nov 26 09:50 w -> /home/eric/wrk/
---
ll /var
total 52
drwxr-xr-x 13 root root     4096 Nov 29 08:32 ./
drwxr-xr-x 23 root root     4096 Nov 27 08:12 ../
drwxr-xr-x  2 root root     4096 Nov 28 06:39 backups/
drwxr-xr-x 17 root root     4096 Nov 25 08:38 cache/
drwxrwsrwt  2 root whoopsie 4096 Nov 29 06:28 crash/
lrwxrwxrwx  1 eric eric       18 Nov 29 08:32 data -> /w/dat/
drwxr-xr-x 68 root root     4096 Nov 26 15:44 lib/
drwxrwsr-x  2 root staff    4096 Oct 18 16:07 local/
lrwxrwxrwx  1 root root        9 Nov 26 05:33 lock -> /run/lock/
drwxr-xr-x 14 root root     4096 Nov 29 06:29 log/
drwxrwsr-x  2 root mail     4096 Nov 25 08:31 mail/
drwxrwsrwt  2 root whoopsie 4096 Nov 25 08:35 metrics/
drwxr-xr-x  2 root root     4096 Nov 25 08:31 opt/
lrwxrwxrwx  1 root root        4 Nov 26 05:33 run -> /run/
drwxr-xr-x  9 root root     4096 Nov 25 08:34 spool/
drwxrwxrwt  2 root root     4096 Nov 29 08:12 tmp/

-------------------------------------------------------------------------------

export QUILT_PATCHES=debian/patches
dpkg-buildpackage -us -uc
mach build

-------------------------------------------------------------------------------

UBUNTU PACKAGES FOR R

R packages for Ubuntu on i386 and amd64 are available for all stable
Desktop releases of Ubuntu until their official end of life date.
However, only the latest Long Term Support (LTS) release is fully
supported.  As of October 17, 2013, the supported releases are Trusty
Tahr (14.04) Saucy Salamander (13.10), Quantal Quetzal (12.10), 
Precise Pangolin (12.04; LTS), and Lucid Lynx (10.04; LTS).

See https://wiki.ubuntu.com/Releases for details.

INSTALLATION

To obtain the latest R packages, add an entry like

   deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu trusty/
   
or

   deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu saucy/

or

   deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu quantal/
   
or

   deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu precise/
   
or

   deb http://<my.favorite.cran.mirror>/bin/linux/ubuntu lucid/

in your /etc/apt/sources.list file, replacing
<my.favorite.cran.mirror> by the actual URL of your favorite CRAN
mirror. See http://cran.r-project.org/mirrors.html for the list of
CRAN mirrors. To install the complete R system, use

   sudo apt-get update
   sudo apt-get install r-base

Users who need to compile R packages from source [e.g. package
maintainers, or anyone installing packages with install.packages()]
should also install the r-base-dev package:

   sudo apt-get install r-base-dev

The R packages for Ubuntu otherwise behave like the Debian ones. One
may find additional information in the Debian README file located at
http://cran.R-project.org/bin/linux/debian/.

Installation and compilation of R or some of its packages may require
Ubuntu packages from the "backports" repositories. In particular, this
is the case for Tcl/Tk 8.5 on Hardy. Therefore, it is suggested to
activate the backports repositories with an entry like

   deb http://<my.favorite.ubuntu.mirror>/ raring-backports main restricted universe

in your /etc/apt/sources.list file. See https://launchpad.net/ubuntu/+archivemirrors
for the list of Ubuntu mirrors.


SUPPORTED PACKAGES

A number of R packages are available from the Ubuntu repositories with
names starting with r-cran-. The following ones are kept up-to-date on
CRAN: all packages part of the r-recommended bundle, namely

   r-cran-boot
   r-cran-class
   r-cran-cluster
   r-cran-codetools
   r-cran-foreign
   r-cran-kernsmooth
   r-cran-lattice
   r-cran-mass
   r-cran-matrix
   r-cran-mgcv
   r-cran-nlme
   r-cran-nnet
   r-cran-rpart
   r-cran-spatial
   r-cran-survival

as well as

   r-cran-rodbc

The other r-cran-* packages are updated with Ubuntu releases
only. Users who need to update one of these R packages (say
r-cran-foo) should first make sure to obtain all the required build
dependencies with

   sudo apt-get build-dep r-cran-foo

Because they rely on the installed version of R, we also provide, on
an experimental basis, versions of the following packages as
up-to-date as the Ubuntu release allows:

   littler
   python-rpy
   python-rpy-doc

Please notice that the maintainers are not necessarily themselves
users of these packages, so positive or negative feedback through the
usual channels (see below) would be appreciated.

Finally, as an added convenience to Ubuntu users who interact with R
through Emacs, we also provide an up-to-date version of the package

   ess


SECURE APT

The Ubuntu archives on CRAN are signed with the key of "Michael Rutter
<marutter@gmail.com>" with key ID E084DAB9.  To add the key to your
system with one command use (thanks to Brett Presnell for the tip):

   sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9

An alternate method can be used by retriving the key with

   gpg --keyserver keyserver.ubuntu.com --recv-key E084DAB9

and then feed it to apt-key with

   gpg -a --export E084DAB9 | sudo apt-key add -

Some people have reported difficulties using this approach. The issue
is usually related to a firewall blocking port 11371. If the first gpg 
command fails, you may want to try (thanks to Mischan Toosarani for 
the tip):

	gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E084DAB9

and then feed it to apt-key with

	gpg -a --export E084DAB9 | sudo apt-key add -

Another alternative approach is to search for the key at 
http://keyserver.ubuntu.com:11371/ and copy the key to a plain text
file, say key.txt. Then, feed the key to apt-key with

   sudo apt-key add key.txt

ADMINISTRATION AND MAINTENANCE OF R PACKAGES

The R packages part of the Ubuntu r-base and r-recommended packages
are installed into the directory /usr/lib/R/library. These can be
updated using apt-get with

   sudo apt-get update
   sudo apt-get upgrade

The other r-cran-* packages shipped with Ubuntu are installed into the
directory /usr/lib/R/site-library.

Installing R packages not provided with Ubuntu first requires tools to
compile the packages from source. These tools are installed via the R
development package with

   sudo apt-get install r-base-dev

Then a site administrator can install R packages into the directory
/usr/local/lib/R/site-library by running R as root and using the

   > install.packages()

function. A routine update can then be undertaken from R using

   > update.packages(lib.loc = "/usr/local/lib/R/site-library")

The paths above are stored in the R_LIBS_SITE environment variable
defined in the /etc/R/Renviron file.

Individual users can install R packages into their home directory. The
simplest procedure is to create a file ~/.Renviron containing, e.g.,

   R_LIBS_USER="~/lib/R/library"

The install.packages() and update.packages() functions will then work
in directory ~/lib/R/library. It is also possible to automatically
create version-specific library trees; see ?.libPaths in R for more
information.
-------------------------------------------------------------------------------
MAVEN
-------------------------------------------------------------------------------
mvn release -Darguments="-DskipTests"
mvn deploy -DskipTests -DaltDeploymentRepository=sonatype-nexus-snapshots::default::https://oss.sonatype.org/content/repositories/snapshots
mvn -Dskip.plugins=org.apache.maven.plugins:maven-surefire-plugin,org.apache.maven.plugins:maven-jar-plugin install
-------------------------------------------------------------------------------
| XXX                                                                         |
-------------------------------------------------------------------------------
+ synclient FingerLow=1 && synclient FingerHigh=10
-------------------------------------------------------------------------------
X11
-------------------------------------------------------------------------------
sudo apt-get update
sudo apt-get install icewm
sudo apt-get install xserver-xfree86
sudo apt-get install x-window-system-core
sudo apt-get install xdm
sudo apt-get install numlockx
sudo apt-get install xterm
sudo apt-get install gnome-terminal
---
The result is a system with X and iceWM as windowmanager. You log in as user and on the prompt:
startx
gdm
xdm
kdm
-------------------------------------------------------------------------------
GNOME
-------------------------------------------------------------------------------
gnome-desktop-item-edit --create-new ~/Desktop
-------------------------------------------------------------------------------
GTK
-------------------------------------------------------------------------------
$ more .gtkrc-2.0
binding "gtk-binding-tree-view" {
    bind "j"        { "move-cursor" (display-lines, 1) }
    bind "k"        { "move-cursor" (display-lines, -1) }
    bind "h"        { "expand-collapse-cursor-row" (1,0,0) }
    bind "l"        { "expand-collapse-cursor-row" (1,1,0) }
    bind "o"        { "move-cursor" (pages, 1) }
    bind "u"        { "move-cursor" (pages, -1) }
    bind "g"    PSEpse in C:\\eclipse and run "C:\\eclipse\eclipse.exe".
+ Integrate OOo plugin...
+ Change your workspace to "C:\\DEV" for example.
+ Set the eclipse preferences:
++ Define a JDK to C:\\jdk1.6.0 with name="JDK1.6"
++ Set the compiler compliance level to 6.0
++ Disable all validations
+ Unset "Build Automatically".
+ Define a Server "Apache Tomcat 5.5" and set the port to 80.
+ If you want to run Tomcat in standalone (outside Eclipse), you have to deploy the webapp and define in /conf/context.xml <Context docBase="C://DEV/..."> (+ server port 80 in server.xml).
+ Set listings param to false for the org.apache.catalina.servlets.DefaultServlet default servelt in /conf/web.xml.
+ Define a CVS server : cvs.umg.be - /extend/opt/servers/cvs (don't put a slash at the end or you will be sorry).
+ Open and close numerous times all projects to correctly retrieve the web libs and the sources.
+ Choose and customize your AOS perspective (show problems on selected resources only,...)
+ Just Pray :)
+ Run AOSDBServerLauncher (via Eclipse or via .bat).
+ Run AOSMailServerLauncher (via Eclipse or via .bat).
+ Run Tomcat (via Eclipse or via .bat with export CATALINA_OPTS=${CATALINA_OPTS}" -server -Xmx512m -Xss64k").
+ Point your browser to http://localhost/ and use AOS Community.
-------------------------------------------------------------------------------
PALETTE
-------------------------------------------------------------------------------
sudo cp flatUIColors.gpl /usr/share/inkscape/palettes
sudo cp flatUIColors.gpl /usr/share/gimp/palettes/

# LAUNCHERS

set /etc/environment with PATH and JAVA_HOME
copy aos.dist/* project to /AOS/aos.dist/*
cd bin
chmod +x AOS*
cd /etc/init.d

## Add

AOSDatabaseServerLauncher
ln -s /AOS/aos.dist/bin/AOSDatabaseServerLauncher.sh AOSDatabaseServerLauncher.sh
update-rc.d AOSDatabaseServerLauncher.sh defaults

AOSMailServerLauncher
ln -s /AOS/aos.dist/bin/AOSMailServerLauncher.sh AOSMailServerLauncher.sh
update-rc.d AOSMailServerLauncher.sh defaults

Tomcat option 1
ln -s /AOS/aos.dist/jakarta-tomcat-5.5.7/bin/tomcat.sh tomcat.sh
update-rc.d tomcat.sh defaults

Tomcat option 2
add to/etc/X11/gdm/Init/Default /AOS/aos.dist/bin/AOSApplicationServerLauncher.sh

## Remove

update-rc.d (-f) tomcat.sh remove

# JVM

apt-get install sun-java6-jdk
/usr/lib/jvm/java-6-sun
-----
DEBUG
-----
java -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=y
Target VM acts as a debug server: -Xdebug -Xrunjdwp:transport=dt_socket,server=y,address=8765
Target VM acts as a debug client: -Xdebug -Xrunjdwp:transport=dt_socket,address=127.0.0.1:8000
---------
PROFILING
---------
http://java.sun.com/developer/technicalArticles/Programming/HPROF.html
java -agentlib:hprof=heap=sites,file=hadoop.hprof
jmap -dump:format=b,file=dump.hprof <pid>
---
OOM
---
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/dumps.
--
G1
--
-Xms1g -Xmx6g -Djava.awt.headless=true -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintHeapAtGC -verbose:gc -Xloggc:jvmGC.log
---
JMX
---
-Djava.ext.dirs=$JVM_EXT_DIRS -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=10201
----------
STACKTRACE
----------
kill -3 pid
-------------------------------------------------------------------------------
INTELLIJ
-------------------------------------------------------------------------------
+ CTRL+SHIFT+Q: Show scala implicit methods
-------------------------------------------------------------------------------
ECLIPSE
-------------------------------------------------------------------------------
+ eclipse jee
+ m2eclipse
++ [http://eclipse.org/m2e]
++ [http://nexus.tesla.io:8081/nexus/content/sites/m2e.extras/m2e/1.5.0/N/LATEST]
++ [http://nexus.tesla.io:8081/nexus/content/sites/m2e.extras/m2e/1.4.0/N/LATEST]
++ [https://repository.sonatype.org/content/repositories/forge-sites/m2e-extras/0.15.0/N/0.15.0.201206251206]
+ e4 [http://www.eclipse.org/e4]
+ windows-builder [http://www.eclipse.org/windowbuilder/download.php]
+ nodeclipse [http://www.nodeclipse.org]
+ texlipse [http://texlipse.sourceforge.net]
+ subclipse [http://subclipse.tigris.org] [http://subclipse.tigris.org/update_1.10.x]
+ testng [http://testng.org/doc/eclipse.html] [http://beust.com/eclipse]
+ papyrus [http://download.eclipse.org/modeling/mdt/papyrus/updates/releases-kepler]
+ R [http://www.walware.de/goto/statet]
+ ivy [http://ant.apache.org/ivy/ivyde] [http://www.apache.org/dist/ant/ivyde/updatesite]
+ clojure counterclockwise [http://dev.clojure.org/display/doc/Getting+Started+with+Eclipse+and+Counterclockwise] [http://updatesite.ccw-ide.org/stable] [http://ccw.cgrand.net/updatesite]
+ scala [http://scala-ide.org] [http://download.scala-ide.org/nightly-scala-ide-4.0.x-210x] [http://scala-ide.org/download/nightly.html]
+ scala-worksheet [https://github.com/scala-ide/scala-worksheet]
+ android [http://developer.android.com/tools/sdk/eclipse-adt.html] [https://dl-ssl.google.com/android/eclipse]
+ gwt [https://developers.google.com/eclipse]
+ vjet [http://www.eclipse.org/vjet]
+ groovy [http://groovy.codehaus.org/Eclipse+Plugin] [http://dist.springsource.org/release/GRECLIPSE/e4.3]
+ gradle [http://static.springsource.org/sts/docs/latest/reference/html/gradle/installation.html] [http://dist.springsource.com/milestone/TOOLS/gradle] [http://dist.springsource.com/snapshot/TOOLS/gradle/nightly]
+ json [http://sourceforge.net/projects/eclipsejsonedit]
+ yaml [http://code.google.com/p/yedit] update-site:[http://dadacoalition.org/yedit] (or [http://code.google.com/p/yamleditor])
+ visual-vm-launcher [http://visualvm.java.net/eclipse-launcher.html]
+ markdown [http://www.winterwell.com/software/markdown-editor.php] [http://winterstein.me.uk/projects/tt-update-site]
+ xml-beans [http://www.grian.ltd.uk/eclipse/xmlbeans/update]
+ jadclipse [http://sourceforge.net/projects/jadclipse]
+ java decompiler [http://jd.benow.ca] https://github.com/fesh0r/fernflower
+ java-spider
+ jdeclipse
---
+ spekt-ide [http://www.spket.com/update]
+ aptana
+ oxygenxml
---
eclipse.ini
-showsplash
org.eclipse.platform
-framework
plugins/org.eclipse.osgi_3.4.0.v20080605-1900.jar
-vmargs
-Dosgi.requiredJavaVersion=1.6
-Dorg.eclipse.swt.browser.DefaultType=mozilla
-Xms1g
-Xmx4g
-XX:MaxPermSize=1g
-javaagent:/opt/eclipse/lombok.jar
-Xbootclasspath/a:/opt/eclipse/lombok.jar
---
-Djava.library.path=/usr/lib/x86_64-linux-gnu/jni
---
Bug 410739 – eclipse crashes when it tries to open browser for javadoc.html
21 down vote accepted
CTRL-O list methods
For the Java editor it's as Brian mentions:
Window->Preferences->Java->Code Style->Formatter->Edit->Indentation = "Spaces Only"
However, for the default text editor:
Window->Preferences->Editors->Text Editors->Insert spaces for tabs
Note that the default text editor is used as the basis for many non-Java editors in Eclipse. It's astonishing that this setting wasn't available until 3.3.
-------------------------------------------------------------------------------
ABOUT ECLIPSE - INSTALLATION DETAILS
-------------------------------------------------------------------------------
  Android DDMS  22.2.1.v201309180102-833290 com.android.ide.eclipse.ddms.feature.group  The Android Open Source Project
  Android Development Tools 22.2.1.v201309180102-833290 com.android.ide.eclipse.adt.feature.group   The Android Open Source Project
  Android Hierarchy Viewer  22.2.1.v201309180102-833290 com.android.ide.eclipse.hierarchyviewer.feature.group   The Android Open Source Project
  Android Native Development Tools  22.2.1.v201309180102-833290 com.android.ide.eclipse.ndk.feature.group   The Android Open Source Project
  Android Traceview 22.2.1.v201309180102-833290 com.android.ide.eclipse.traceview.feature.group The Android Open Source Project
  Autotools support for CDT 3.2.0.201306112328  org.eclipse.cdt.autotools.feature.group Eclipse CDT
  Autotools support for CDT Source  3.2.0.201306112328  org.eclipse.cdt.autotools.source.feature.group  Eclipse CDT
  C/C++ Debugger Services Framework (DSF) Examples  2.2.0.201306112328  org.eclipse.cdt.examples.dsf.feature.group  Eclipse CDT
  C/C++ Development Tools   8.2.0.201306112328  org.eclipse.cdt.feature.group   Eclipse CDT
  C/C++ Development Tools SDK   8.2.0.201306112328  org.eclipse.cdt.sdk.feature.group   Eclipse CDT
  C/C++ GCC Cross Compiler Support  1.2.0.201306112328  org.eclipse.cdt.build.crossgcc.feature.group    Eclipse CDT
  C/C++ GDB Hardware Debugging  7.2.0.201306112328  org.eclipse.cdt.debug.gdbjtag.feature.group Eclipse CDT
  C/C++ Memory View Enhancements    2.2.0.201306112328  org.eclipse.cdt.debug.ui.memory.feature.group   Eclipse CDT
  C/C++ Memory View Enhancements Source 2.2.0.201306112328  org.eclipse.cdt.debug.ui.memory.source.feature.group    Eclipse CDT
  C/C++ Multicore Visualizer    1.2.0.201306112328  org.eclipse.cdt.gnu.multicorevisualizer.feature.group   Eclipse CDT
  C/C++ Qt Support  1.0.0.201306112328  org.eclipse.cdt.qt.feature.group    Eclipse CDT
  C/C++ Remote Launch   6.2.0.201306112328  org.eclipse.cdt.launch.remote.feature.group Eclipse CDT
  C/C++ Unit Testing Support    7.2.0.201306112328  org.eclipse.cdt.testsrunner.feature.feature.group   Eclipse CDT
  C/C++ Unit Testing Support Source 7.2.0.201306112328  org.eclipse.cdt.testsrunner.source.feature.feature.group    Eclipse CDT
  C99 LR Parser 5.2.0.201306112328  org.eclipse.cdt.core.lrparser.feature.feature.group Eclipse CDT
  C99 LR Parser SDK 5.2.0.201306112328  org.eclipse.cdt.core.lrparser.sdk.feature.group Eclipse CDT
  CDT Visualizer Framework  1.2.0.201306112328  org.eclipse.cdt.visualizer.feature.group    Eclipse CDT
  CollabNet Merge Client    2.2.4   com.collabnet.subversion.merge.feature.feature.group    CollabNet
  Counterclockwise (Clojure plugin for Eclipse) 0.12.3.STABLE001    ccw.feature.feature.group   Counterclockwise team
  Eclipse IDE for Java EE Developers    2.0.0.20130613-0530 epp.package.jee null
  Gradle IDE    3.3.0.201307040643-RELEASE  org.springsource.ide.eclipse.gradle.feature.feature.group   GoPivotal, Inc.
  InSynth Feature   1.0.0.v-2_10-201307152112-729eab6   ch.epfl.insynth.feature.feature.group   scala-ide.org
  InSynth Source Feature    1.0.0.v-2_10-201307152112-729eab6   ch.epfl.insynth.source.feature.feature.group    scala-ide.org
  JD-Eclipse Plug-in    0.1.4   jd.ide.eclipse.feature.feature.group    Java Decompiler
  JNA Library   3.2.7   com.sun.jna.feature.group   null
  LLVM-Family C/C++ Compiler Build Support  1.0.0.201306112328  org.eclipse.cdt.managedbuilder.llvm.feature.group   Eclipse CDT
  m2e - Maven Integration for Eclipse   1.5.0.20130626-0313 org.eclipse.m2e.feature.feature.group   Eclipse.org - m2e
  m2e - slf4j over logback logging (Optional)   1.5.0.20130626-0313 org.eclipse.m2e.logback.feature.feature.group   Eclipse.org - m2e
  m2e connector for antlr   0.15.0.201206251206 org.sonatype.m2e.antlr.feature.feature.group    Sonatype, Inc.
  m2e connector for build-helper-maven-plugin   0.15.0.201206251206 org.sonatype.m2e.buildhelper.feature.feature.group  Sonatype, Inc.
  m2e connector for modello 0.15.0.201206251206 org.sonatype.m2e.modello.feature.feature.group  Sonatype, Inc.
  m2e connector for sisuindex   0.15.0.201206251206 org.sonatype.m2e.sisuindex.feature.feature.group    Sonatype, Inc.
  Miscellaneous C/C++ Utilities 5.2.0.201306112328  org.eclipse.cdt.util.feature.group  Eclipse CDT
  Native JavaHL 1.7 Implementation (Optional)   3.0.1.I20130301-1700    org.polarion.eclipse.team.svn.connector.javahl17.feature.group  Polarion Software
  Papyrus CDO Integration (Incubation)  0.10.0.v201306261119    org.eclipse.papyrus.extra.cdo.feature.feature.group Eclipse Modeling Project
  Papyrus CSS Feature (Incubation)  0.10.0.v201306261119    org.eclipse.papyrus.extra.infra.gmfdiag.css.feature.feature.group   Eclipse Modeling Project
  Papyrus Diagram Template (Incubation) 0.10.0.v201306261119    org.eclipse.papyrus.extra.diagramtemplate.feature.feature.group Eclipse Modeling Project
  Papyrus East-ADL (Incubation) 0.10.0.v201306261119    org.eclipse.papyrus.extra.eastadl.feature.feature.group Eclipse Modeling Project
  Papyrus Marte (Incubation)    0.10.0.v201306261119    org.eclipse.papyrus.extra.marte.feature.feature.group   Eclipse Modeling Project
  Papyrus Marte properties (Incubation) 0.10.0.v201306261119    org.eclipse.papyrus.extra.marte.properties.feature.feature.group    Eclipse Modeling Project
  Papyrus Marte Textedit (Incubation)   0.10.0.v201306261119    org.eclipse.papyrus.extra.marte.textedit.feature.feature.group  Eclipse Modeling Project
  Papyrus RobotML Modeling Tools (Incubation)   0.10.0.v201306261119    org.eclipse.papyrus.extra.robotml.feature.feature.group Eclipse Modeling Project
  Papyrus SysML Table - New Version (Incubation)    0.10.0.v201306261119    org.eclipse.papyrus.sysml.nattable.feature.feature.group    Eclipse Modeling Project
  Papyrus Table - New Version (Incubation)  0.10.0.v201306261119    org.eclipse.papyrus.infra.nattable.feature.feature.group    Eclipse Modeling Project
  Papyrus UML (Incubation)  0.10.0.v201306121352    org.eclipse.papyrus.sdk.feature.feature.group   Eclipse Modeling Project
  Papyrus UML Compare Feature (Incubation)  0.10.0.v201306261119    org.eclipse.papyrus.extra.uml.compare.feature.feature.group Eclipse Modeling Project
  Papyrus UML RealTime profile (Incubation) 0.10.0.v201306261119    org.eclipse.papyrus.extra.umlrt.feature.feature.group   Eclipse Modeling Project
  Papyrus UML Table - New Version (Incubation)  0.10.0.v201306261119    org.eclipse.papyrus.uml.nattable.feature.feature.group  Eclipse Modeling Project
  Play2 support in Scala IDE    0.3.0.v-2_10-201307101649-e442f75   org.scala-ide.play2.feature.feature.group   Scala IDE
  Play2 support in Scala IDE sources    0.3.0.v-2_10-201307101649-e442f75   org.scala-ide.play2.source.feature.feature.group    Scala IDE
  Plexus Metadata Generation    0.15.0.201206251206 org.sonatype.m2e.plexus.annotations.feature.feature.group   Sonatype, Inc.
  Scala IDE for Eclipse 3.0.1.v-2_10-201307101641-eff8147   org.scala-ide.sdt.feature.feature.group scala-ide.org
  Scala IDE for Eclipse dev support 3.0.1.v-2_10-201307101641-eff8147   org.scala-ide.sdt.dev.feature.feature.group scala-ide.org
  Scala IDE for Eclipse Source  3.0.1.v-2_10-201307101641-eff8147   org.scala-ide.sdt.source.feature.feature.group  scala-ide.org
  Scala Search  0.1.0.v-2_10-201307101650-0121a0e   org.scala.tools.eclipse.search.feature.feature.group    org.scala.tools.eclipse
  Scala Search sources  0.1.0.v-2_10-201307101650-0121a0e   org.scala.tools.eclipse.search.source.feature.feature.group example.org
  Scala Worksheet   0.2.0.v-2_10-201307101648-9ffc07d   org.scalaide.worksheet.feature.feature.group    Scala IDE
  Scala Worksheet sources   0.2.0.v-2_10-201307101648-9ffc07d   org.scalaide.worksheet.source.feature.feature.group Scala IDE
  ScalaTest for Scala IDE   2.9.3.v-3-2_10-201307130941-55f5c32 org.scala-ide.sdt.scalatest.feature.feature.group   scala-ide.org
  ScalaTest Scala IDE Source    2.9.3.v-3-2_10-201307130941-55f5c32 org.scala-ide.sdt.scalatest.source.feature.feature.group    scala-ide.org
  Subversive Revision Graph (Optional)  1.1.0.I20130527-1700    org.eclipse.team.svn.revision.graph.feature.group   Eclipse.org
  Subversive SVN Connectors 3.0.1.I20130507-1700    org.polarion.eclipse.team.svn.connector.feature.group   Polarion Software
  Subversive SVN Integration for the Mylyn Project (Optional)   1.1.0.I20130527-1700    org.eclipse.team.svn.mylyn.feature.group    Eclipse.org
  Subversive SVN JDT Ignore Extensions (Optional)   1.1.0.I20130527-1700    org.eclipse.team.svn.resource.ignore.rules.jdt.feature.group    Eclipse.org
  Subversive SVN Team Provider  1.1.0.I20130527-1700    org.eclipse.team.svn.feature.group  Eclipse.org
  Subversive SVN Team Provider Localization (Optional)  1.1.0.I20130527-1700    org.eclipse.team.svn.nl1.feature.group  Eclipse.org
  Subversive SVN Team Provider Sources  1.1.0.I20130527-1700    org.eclipse.team.svn.source.feature.group   Eclipse.org
  SVNKit 1.7.9 Implementation (Optional)    3.0.1.I20130507-1700    org.polarion.eclipse.team.svn.connector.svnkit17.feature.group  Polarion Software
  TestNG    6.8.6.20130607_0745 org.testng.eclipse.feature.group    Cedric Beust
  Tracer for OpenGL ES  22.2.1.v201309180102-833290 com.android.ide.eclipse.gldebugger.feature.group    The Android Open Source Project
  Unified Parallel C (UPC) Support  5.2.0.201306112328  org.eclipse.cdt.core.parser.upc.feature.feature.group   Eclipse CDT
  Unified Parallel C (UPC) Support SDK  5.2.0.201306112328  org.eclipse.cdt.core.parser.upc.sdk.feature.group   Eclipse CDT
  Unified Parallel C Berkeley UPC Toolchain Support 1.2.0.201306112328  org.eclipse.cdt.bupc.feature.group  Eclipse CDT
  Visual C++ Support    1.2.0.201306112328  org.eclipse.cdt.msw.feature.group   Eclipse CDT
  XL C/C++ Compiler Support 6.4.0.201306112328  org.eclipse.cdt.xlc.feature.feature.group   Eclipse CDT
  XL C/C++ Compiler Support SDK 6.2.0.201306112328  org.eclipse.cdt.xlc.sdk.feature.group   Eclipse CDT
-------------------------------------------------------------------------------
ECLIPSE P2 UPDATE SITES
-------------------------------------------------------------------------------
http://wiki.eclipse.org/Eclipse_Project_Update_Sites
-------------------------------------------------------------------------------
FIREFOX ADDONS
-------------------------------------------------------------------------------
+ download helper
+ https://addons.mozilla.org/en-US/firefox/addon/download-youtube/
+ delicious-bookmark
+ firebug
++ firecookie
++ firepath
+ rest-client
+ json-view
+ gwt
+ mozilla archive format (https://addons.mozilla.org/addon/mozilla-archive-format)
+ web developer
+ Live HTTP Header
+ Save Complete
+ YSlow
+ Google Gears
+ Tab Catalog
+ XPCOMViewer
+ Firefly
+ View Dependencies
+ Twitterfox
---
java
+ /usr/lib/firefox-addons/plugins$ sudo ln -s /opt/jdk1.7.0/jre/lib/amd64/libnpjp2.so
-------------------------------------------------------------------------------
THUNDERBIRD ADDONS
-------------------------------------------------------------------------------
+ Conversations
+ LookOut
+ Lightning
+ Enigmail
+ Google Contacts
+ Latex It!
+ Markdown Here
+ Mathbird
+ vcs [https://addons.mozilla.org/fr/thunderbird/addon/vcs-support]
-------------------------------------------------------------------------------
| XULRUNNER                                                                   |
-------------------------------------------------------------------------------
xulrunner --register-global
set in pref("toolkit.networkmanager.disable", true); /opt/xulrunner-sdk/bin/greprefs/all.js to true
-------------------------------------------------------------------------------
APACHE2 HTTP
-------------------------------------------------------------------------------
/etc/apache2/apache2.conf
IncludeOptional sites-enabled/*
---
sudo a2enmod proxy
sudo a2enmod proxy_html
sudo a2enmod rewrite
---
sudo apt-get install libapache2-mod-php5
---
LoadModule proxy_module /usr/lib/apache2/modules/mod_proxy.so
LoadModule proxy_http_module /usr/lib/apache2/modules/mod_proxy_http.so 
---
/etc/apache2/sites-available/default
ProxyRequests Off
<Proxy *>
       Order allow,deny
       Allow from all
</Proxy>
NameVirtualHost pme-consult.be
<VirtualHost pme-consult.be>
   ServerName pme-consult.be
   ProxyPass / http://172.16.1.202/
   ProxyPassReverse / http://172.16.1.202/
   ProxyPreserveHost On
</VirtualHost>
---
/etc/apache2/apache2.conf
ProxyRequests Off
<Proxy *>
  Order allow,deny
  Allow from all
</Proxy>
NameVirtualHost 172.16.1.201
<VirtualHost 172.16.1.201>
  ServerName 172.16.1.201
  ProxyPass / http://172.16.1.60/
  ProxyPassReverse / http://172.16.1.60/
  ProxyPreserveHost On
</VirtualHost>
NameVirtualHost alpha.u-mangate.com
<VirtualHost alpha.u-mangate.com>
  ServerName alpha.u-mangate.com
  ProxyPass / http://172.16.1.206/
  ProxyPassReverse / http://172.16.1.206/
  ProxyPreserveHost On
</VirtualHost>
NameVirtualHost zit.u-mangate.com
<VirtualHost zit.u-mangate.com>
  ServerName zit.u-mangate.com
  ProxyPass / http://pdg.homelinux.org:8070/
  ProxyPassReverse / http://pdg.homelinux.org:8070/
  ProxyPreserveHost On
</VirtualHost>
++ Adapt host file : Set xxx with Ethernet IP Address!!
---
+ htpasswd -c /etc/htpasswd/.htpasswd datalayer
<Directory /var/www/>
  Options Indexes FollowSymLinks
#   AllowOverride None
#   Require all granted
  AllowOverride AuthConfig
  Order allow,deny
  Allow from all
  AuthType Basic
  AuthName "Authentication Required"
  Require valid-user
  AuthUserFile "/etc/htpasswd/.htpasswd"
</Directory>
-------------------------------------------------------------------------------
```
