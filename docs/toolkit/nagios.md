# Log Warn

# Nagios on Ubuntu

sudo apt-get install nagios3 nagios-nrpe-plugin

You will be asked to enter a password for the nagiosadmin user. The user's credentials are stored in /etc/nagios3/htpasswd.users. To change the nagiosadmin password, or add additional users to the Nagios CGI scripts, use the htpasswd that is part of the apache2-utils package.

For example, to change the password for the nagiosadmin user enter:
sudo htpasswd /etc/nagios3/htpasswd.users nagiosadmin

To add a user:
sudo htpasswd /etc/nagios3/htpasswd.users steve

Next, on server02 install the nagios-nrpe-server package. From a terminal on server02 enter:
sudo apt-get install nagios-nrpe-server

# Nagios on Centos

Don't forget to stop httpd on your machine `sudo /etc/init.d/apache2 stop`.

Connect to the Docker container with `datalayer-emulator-start secured centos centos6` and run:

```
htpasswd /etc/nagios/passwd nagiosadmin
service httpd start
service nagios start
```

Add services:

```
mkdir /etc/nagios/servers
vi /etc/nagios/servers/clients.cfg
```

and add the following:

```
define service {
        use                             generic-service
        host_name                       client
        service_description             SSH2
        check_command                   check_ssh
        notifications_enabled           0
        }
```

```
chown -R root:nagios /etc/nagios/servers
```

Restart nagios with `service nagios restart`.

# Rsyslog

## /etc/rsyslog.conf

```
$IncludeConfig /etc/rsyslog.d/*.conf
*.info;mail.none;authpriv.none;cron.none;local5.none;local4.none;local3.none    /var/log/messages
```

## /etc/rsyslog.d/arcsight-10-sys.conf

```
$SystemLogRateLimitBurst        0
$SystemLogRateLimitInterval     0                                                                     
syslog.info;auth.info;daemon.info;authpriv.info;cron.info;kern.info             @ServerSysIpAddress
local5.info                                                                     @ServerSysIpAddress
```

## /etc/rsyslog.d/arcsight-20-db.conf

```
local4.info                    @ServerDbIpAddress
```

## /etc/rsyslog.d/arcsight-30-ap.conf

```
local3.info                    @ServerAppIpAddress
```

## Start rsyslog

```
/etc/init.d/rsyslog restart
```

# Audit

## /etc/audisp/plugins.d/syslog.conf

```
active = yes
direction = out
path = builtin_syslog
type = builtin
args = LOG_INFO LOG_LOCAL5
format = string
```

## /etc/audit/auditd.conf

```
dispatcher = /sbin/audispd
```

## /etc/audisp/audispd.conf

```
q_depth = 120
```

## /etc/audit/audit.rules

```
-D
-b 15000
-a always, exit -F arch=b64 -S sethostname -S setdomainname -k HOSTNAME_CHANGED
-a always, exit -F arch=b64 -S kill -F a1=9 -k KILL9
```

# This file contains the auditctl rules that are loaded
# whenever the audit daemon is started via the initscripts.
# The rules are simply the parameters that would be passed
# to auditctl.
# First rule - delete all
-D

# Increase the buffers to survive stress events. 
# Make this bigger for busy systems 
-b 1024 -a always,exit -S adjtimex -S settimeofday -S stime -k time-change
-a always,exit -S clock_settime -k time-change 
-a always,exit -S sethostname -S setdomainname -k system-locale 

## Start auditd

```
/etc/init.d/auditd restart
```
