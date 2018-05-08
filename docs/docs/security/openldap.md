---
title: OpenLDAP
---

## Install

```bash
sudo apt -y install slapd ldap-utils perl
sudo dpkg-reconfigure slapd
```

```bash
sudo yum -y install openldap openldap-servers openldap-clients perl
```

```bash
sudo service slapd start
sudo systemctl status slapd
sudo vi /etc/ldap/ldap.conf
BASE     dc=datalayer,dc=io
URI      ldap://localhost
```

```bash
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
service slapd start
chkconfig slapd on
```

Review the log file /var/log/slapd.conf to see if there are any errors. They usually refer to errors in the configuration files you just changed.

tail -f /var/log/slapd.conf

## Create Initial Directory Information Tree

```
cat <<EOF >/root/initial-dit.ldif
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
ldapadd -a -c -f /root/initial-dit.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -W
```

The ldapadd command will prompt you for your password - this is the same password you used in configuring the OpenLDAP server earlier.

If all goes well, you should see four lines indicating that the server added a new entry.

If this is not the case, something has gone wrong. Refer to the error messages and /var/log/slapd.log to retry the command.

If you are trying this command for a second time, it is possible that some of the entries succeeded the first time.

In this case, the error message will indicate that the entry could not be added because it already exists. You can safely ignore this error message.

## Test Entries

At this point, pause and test the OpenLDAP server in isolation.

You should receive two records from the following command - one for auto.master and one for auto.home:

```
ldapsearch -x -H ldap:/// -b dc=datalayer,dc=io "(objectclass=nisMap)"
```

Assuming all is ok (result should be 2), you can open up your server to the rest of your network.

```
iptables -A INPUT -m state --state new -m tcp -p tcp --dport 389 -j ACCEPT
```

## Configure Automount Base Maps

The final piece of base configuration is to introduce the necessary base maps for the automounter.

We will add individual maps for each user later on.

```
cat <<EOF >/root/initial-autofs.ldif
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
ldapadd -a -f /root/initial-autofs.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -W
```

As with the prior ldapadd, you will be prompted for the password and then the records will be added.

## Create User Records

In order to log in to a client system, you will need a user record. Here is an example for my user ID "eric":

```
cat <<EOF >/root/eric.ldif
dn: uid=eric, ou=Users, dc=datalayer,dc=io
uid: eric
displayName: Eric Charles
cn: Eric Charles
givenName: Eric
sn: Charles
initials: EC
mail: eric@datalayer.io
uidNumber: 500
gidNumber: 100
homeDirectory: /home/eric
loginShell: /bin/bash
gecos: Eric Charles,,,,
objectclass: inetOrgPerson
objectclass: posixAccount
objectclass: shadowAccount
EOF
echo "userPassword: $(slappasswd -s TOPSECRET_PASSWORD)" >> /root/eric.ldif
ldapadd -a -f /root/eric.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -W
```

Or if you use automaount, In order to log in to a client system, you will need a user record with an auto.home record. Here is an example for my user ID "ahall":

```
cat <<EOF >/root/ahall.ldif
dn: cn=ahall, nisMapName=auto.home, ou=Maps, dc=datalayer,dc=io
cn: ahall
objectclass: nisObject
nisMapName: auto.home
nisMapEntry: -fstype=nfs,rw,hard,intr files.datalayer.io:/export/home/ahall

dn: uid=ahall, ou=Users, dc=datalayer,dc=io
uid: ahall
displayName: Adrian Hall
cn: Adrian Hall
givenName: Adrian
sn: Hall
initials: AH
mail: ahall@datalayer.io
uidNumber: 500
gidNumber: 100
homeDirectory: /home/ahall
loginShell: /bin/bash
gecos: Adrian Hall,,,,
objectclass: inetOrgPerson
objectclass: posixAccount
objectclass: shadowAccount
EOF
echo "userPassword: $(slappasswd -s TOPSECRET)" >> /root/ahall.ldif
ldapadd -a -f /root/ahall.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -W
```

By now, you should be familiar with the usage of ldapadd.

We introduce two records - one for the user that contains all the information you would normally place in the password file, and another that you would normally place in /etc/auto.home file.

## Create Group Records

Groups can also be stored in LDAP. However, they cannot conflict with system groups already in /etc/groups.

If they do, the system groups will take precedence. Once again, we create an LDIF file and then add it using ldapadd.

```
cat <<EOF >/root/grp-sysusers.ldif
dn: cn=sysusers, ou=Groups, dc=datalayer,dc=io
cn: sysusers
gidNumber: 500
memberUid: root
memberUid: eric
description: Group can sudo without restriction
objectclass: posixGroup
EOF
ldapadd -a -f /root/grp-sysusers.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -W
```

Once the client is installed (which is the next step), you should be able to add the following line to theers file (using visudo):

```
%sysusers ALL=(ALL) ALL
%users ALL=(ALL) ALL
```

This will allow root and eric/ahall to use sudo if it is installed.

## Configure the Client

We have finally got a working OpenLDAP server. We now need to configure the client systems.

Bear in mind that the OpenLDAP authentication server can also be a client of itself. The first step is to install necessary packages:

```
yum -y install openldap openldap-clients nss-pam-ldapd pam_ldap nscd autofs rpcbind nfs-utils
```

```
cat <<EOF >/root/eric.ldif
dn: uid=eric, ou=Users, dc=datalayer,dc=io
uid: eric
displayName: Eric Charles
cn: Eric Charles
givenName: Eric
sn: Charles
initials: EC
mail: eric@datalayer.io
uidNumber: 500
gidNumber: 100
homeDirectory: /home/eric
loginShell: /bin/bash
gecos: Eric Charles,,,,
objectclass: inetOrgPerson
objectclass: posixAccount
objectclass: shadowAccount
EOF
echo "userPassword: $(slappasswd -s TOPSECRET)" >> /root/eric.ldif
ldapadd -a -f /root/eric.ldif -H ldap:/// -D "cn=Manager,dc=datalayer,dc=io" -W
```

The authentication portion uses authconfig:

```
authconfig --enableldap --enableldapauth --ldapserver=ldap://ldap.datalayer.io:389 \
  --ldapbasedn="dc=datalayer,dc=io" --enablecache --disablefingerprint --kickstart
```

The automount part is a little more involved:

```
perl -npe 's/^automount:.*/automount: ldap/' -i /etc/nsswitch.conf
cat <<EOF >>/etc/sysconfig/autofs
LDAP_URI="ldap://ldap.datalayer.io:389"
SEARCH_BASE="ou=Maps,dc=datalayer,dc=io"cn=sysusers, ou=Groups, dc=datalayer,dc=io
MAP_OBJECT_CLASS="nisMap"
ENTRY_OBJECT_CLASS="nisObject"
MAP_ATTRIBUTE="nisMapName"
ENTRY_ATTRIBUTE="cn"## Testing the Environment


EOF
service nscd restart
service autofs start
chkconfig autofs on
```

I have a final additional step just in case DNS goes down - add the authentication server and file server to /etc/hosts.

```
cat <<EOF >>/etc/hosts
192.168.1.4    ldap.datalayer.io ldap
192.168.1.5    files.datalayer.io files
EOF
```

Adjust for your IP Address allocation.

## Test Environment

You should be able to use the getent command at this point to obtain information about your user:

getent passwd eric
eric:*:500:100:Eric Charles,,,,:/home/eric:/bin/bash

getent shadow eric
eric:{SSHA}encrypted-stuff::::::::0

If this does not work, there is either a problem with your LDAP server or a problem with your authconfig. To determine which, do a ldapsearch for the user in question:

```
ldapsearch -x -H ldap://ldap.datalayer.io:389 -b dc=datalayer,dc=io "(uid=eric)"
```

If this command returns results, then your LDAP server is fine - it's your authconfig. If this command does not return results, then the problem is with your OpenLDAP server.

You should also be able to "cd /home/eric" and see the contents of the user directory. If this does not work, check the autofs debug messages in /var/log/messages.

You can also test group support in LDAP:

getent group sysusers
sysusers:*:500:root,eric

If you do not see results, then perform an ldap search to see the information, and refer back to either the OpenLDAP server configuration or authconfig.

## Create Home Directory

You will need to create the home directory yourself:

```
mkdir /home/eric
chown eric:sysusers /home/eric
chmod 0755 /home/eric
sudo -u eric ls -alp /home
su - eric
id
whoami
exit
```

Or if you use automount:

```
mount files:/export/home /mnt
cd /mnt
mkdir eric
cp /etc/skel/.[a-z]* eric
chown -R eric.users eric
chmod 0755 ahall
```

## Delete Entries

```
ldapdelete -D "cn=Manager,dc=datalayer,dc=io" -W -x -H ldap://ldap.datalayer.io:389 "uid=eric, ou=Users, dc=datalayer,dc=io"
ldapdelete -D "cn=Manager,dc=datalayer,dc=io" -W -x -H ldap://ldap.datalayer.io:389 "cn=sysusers, ou=Groups, dc=datalayer,dc=io"
```

# Add User to Group

```
cat <<EOF >/root/eric2.ldif
dn: uid=eric2, ou=Users, dc=datalayer,dc=io
uid: eric2
displayName: Eric2 Charles
cn: Eric2 Charles
givenName: Eric2
sn: Charles
initials: EC2
mail: eric2@datalayer.io
uidNumber: 501
gidNumber: 100
homeDirectory: /home/eric2
loginShell: /bin/bash
gecos: Eric2 Charles,,,,
objectclass: inetOrgPerson
objectclass: posixAccount
objectclass: shadowAccount
EOF
echo "userPassword: $(slappasswd -s TOPSECRET)" >> /root/eric2.ldif
ldapadd -a -f /root/eric2.ldif -D "cn=Manager,dc=datalayer,dc=io" -x -H ldap://ldap.datalayer.io:389 -W
```

```
cat <<EOF >/root/eric2-to-group.ldif
dn: cn=sysusers, ou=Groups,dc=datalayer,dc=io
changetype: modify
add: memberuid
memberuid: eric2
EOF
ldapmodify -a -f /root/eric2-to-group.ldif -D "cn=Manager,dc=datalayer,dc=io" -x -H ldap://ldap.datalayer.io:389 -W
```
