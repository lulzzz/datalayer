# Tripwire

Tripwire, an Intrusion Detection Tool

Tripwire is an open source security and data integrity tool used to monitor and alert  any changes in files and directories.
It monitors and detects the changes in files/directories, which file/directory is added, who changed them, what was changed and time of changed.
Once the changes are valid and reasonable, then you can accept the changes by updating the tripwire database.

Security is an incredibly complex problem when administering online servers.

While it is possible to configure firewalls, fail2ban policies, secure services, and lock down applications,
it is difficult to know for sure if you have effectively blocked every attack.

A host-based intrusion detection system (HIDS), works by collecting details about your computer's
filesystem and configuration. It then stores this information to reference and validate the current state of the system.
 If changes are found between the known-good state and the current state, it could be a sign that your security has been compromised.

A popular host-based intrusion detection system on Linux is Tripwire.
This software can keep track of many different filesystem data points in order to detect whether unauthorized changes have occurred.

Due to the nature of intrusion detection systems, it is best to run through this guide shortly after creating your server,
so that you can verify that the filesystem is clean.

## Install on CentOS 6.4

### Installing Tripwire

Install the Tripwire software from EPEL repository. To install EPEL repository, enter the following commands.

```
root@server ~]# wget http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
[root@server ~]# rpm -ivh epel-release-6-8.noarch.rpm
```

Now install Tripwire.

```
[root@server ~]# yum install tripwire -y
```

### Creating site and local keyfile pass-phrases

```
tripwire-setup-keyfiles

----------------------------------------------
The Tripwire site and local passphrases are used to sign a  variety  of
files, such as the configuration, policy, and database files.

Passphrases should be at least 8 characters in length and contain  both
letters and numbers.

See the Tripwire manual for more information.

----------------------------------------------
Creating key files...

(When selecting a passphrase, keep in mind that good passphrases typically
have upper and lower case letters, digits and punctuation marks, and are
at least 8 characters in length.)

Enter the site keyfile passphrase:     ## Enter site pass-phrase ##
Verify the site keyfile passphrase:     ## Re-enter pass-phrase ##
Generating key (this may take several minutes)...Key generation complete.

(When selecting a passphrase, keep in mind that good passphrases typically
have upper and lower case letters, digits and punctuation marks, and are
at least 8 characters in length.)

Enter the local keyfile passphrase:     ## Enter local pass-phrase ##
Verify the local keyfile passphrase:     ## Re-enter pass-phrase ##
Generating key (this may take several minutes)...Key generation complete.

----------------------------------------------
Signing configuration file...
Please enter your site passphrase:      ## Enter site pass-phrase ##
Wrote configuration file: /etc/tripwire/tw.cfg

A clear-text version of the Tripwire configuration file:
/etc/tripwire/twcfg.txt
has been preserved for your inspection.  It  is  recommended  that  you
move this file to a secure location and/or encrypt it in place (using a
tool such as GPG, for example) after you have examined it.

----------------------------------------------
Signing policy file...
Please enter your site passphrase:     ## Enter site pass-phrase ##
Wrote policy file: /etc/tripwire/tw.pol

A clear-text version of the Tripwire policy file:
/etc/tripwire/twpol.txt
has been preserved for  your  inspection.  This  implements  a  minimal
policy, intended only to test  essential  Tripwire  functionality.  You
should edit the policy file to  describe  your  system,  and  then  use
twadmin to generate a new signed copy of the Tripwire policy.

Once you have a satisfactory Tripwire policy file, you should move  the
clear-text version to a secure location  and/or  encrypt  it  in  place
(using a tool such as GPG, for example).

Now run "tripwire --init" to enter Database Initialization  Mode.  This
reads the policy file, generates a database based on its contents,  and
then cryptographically signs the resulting  database.  Options  can  be
entered on the command line to specify which policy, configuration, and
key files are used  to  create  the  database.  The  filename  for  the
database can be specified as well. If no  options  are  specified,  the
default values from the current configuration file are used.
```

### Initializing Tripwire Database

```
[root@server ~]# tripwire --init
Please enter your local passphrase:
Parsing policy file: /etc/tripwire/tw.pol
Generating the database...
*** Processing Unix File System ***
### Warning: File system error.
### Filename: /dev/kmem
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /proc/ksyms
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /proc/pci
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /usr/sbin/fixrmtab
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /usr/bin/vimtutor
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /usr/local/lib64
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /usr/lib64
### No such file or directory
### Warning: File system error.
### Filename: /sbin/fsck.reiserfs
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /bin/tcsh
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /root/.Xresources
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /root/.esd_auth
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /root/.gnome
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /root/.ICEauthority
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /root/.Xauthority
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /dev/cua0
### No such file or directory
### Continuing...
### Warning: File system error.
### Filename: /dev/initctl
### No such file or directory
### Continuing...
Wrote database file: /var/lib/tripwire/server.ostechnix.com.twd
The database was successfully generated.
```

### Modifying Tripwire policy file

As per the above result, you may get an error like No such file or directory or File system error.  This means that your tripwire scans every files which are mentioned in the tripwire config file. Comment out the files which are doesn’t exist in your system in the tripwire config file.

```
[root@server ~]# vi /etc/tripwire/twpol.txt
{
#     /dev/kmem                         -> $(Device) ;
     /dev/mem                          -> $(Device) ;
     /dev/null                         -> $(Device) ;
     /dev/zero                         -> $(Device) ;
     /proc/devices                     -> $(Device) ;
     /proc/net                         -> $(Device) ;
     /proc/sys                         -> $(Device) ;
     /proc/cpuinfo                     -> $(Device) ;
     /proc/modules                     -> $(Device) ;
     /proc/mounts                      -> $(Device) ;
     /proc/dma                         -> $(Device) ;
     /proc/filesystems                 -> $(Device) ;
#     /proc/pci                         -> $(Device) ;
     /proc/interrupts                  -> $(Device) ;
     /proc/driver/rtc                  -> $(Device) ;
     /proc/ioports                     -> $(Device) ;
     /proc/scsi                        -> $(Device) ;
     /proc/kcore                       -> $(Device) ;
     /proc/self                        -> $(Device) ;
     /proc/kmsg                        -> $(Device) ;
     /proc/stat                        -> $(Device) ;
```

Once modifying all the files, update the tripwire policy file.

```
[root@server ~]# tripwire --update-policy --secure-mode low /etc/tripwire/twpol.txt
Parsing policy file: /etc/tripwire/twpol.txt
Please enter your local passphrase:
Please enter your site passphrase:
======== Policy Update: Processing section Unix File System.
======== Step 1: Gathering information for the new policy.
### Continuing...
### Warning: Policy Update Added Object.
### An object has been added since the database was last updated.
### Object name: /var/lib/tripwire/server.ostechnix.com.twd
### Continuing...
### Warning: Policy Update Changed Object.
### An object has been changed since the database was last updated.
### Object name: Conflicting properties for object /root
### > Modify Time
### > Change Time
### Continuing...
======== Step 2: Updating the database with new objects.
======== Step 3: Pruning unneeded objects from the database.
Wrote policy file: /etc/tripwire/tw.pol
Wrote database file: /var/lib/tripwire/server.ostechnix.com.twd
```

### Checking for any changes in files/directories

[root@server ~]# tripwire --check --interactive

Once you entered this command tripwire will collect all the details and open the result automatically in your vi editor. The report might be too long. Scroll down to view any changes in files or folders. As per the below result the newly Added and Modified files will have check mark(The Added and Modified sections are highlighted in bold). Finally save and quit the report by typing :wq. The Added and Modified files will be automatically updated to Tripwire policy file.

```
Open Source Tripwire(R) 2.4.1 Integrity Check Report

Report generated by:          root
Report created on:            Fri 10 May 2013 12:26:58 PM IST
Database last updated on:     Fri 10 May 2013 12:23:43 PM IST

===============================================================================
Report Summary:
===============================================================================

Host name:                    server.ostechnix.com
Host IP address:              Unknown IP
Host ID:                      None
Policy file used:             /etc/tripwire/tw.pol
Configuration file used:      /etc/tripwire/tw.cfg
Database file used:           /var/lib/tripwire/server.ostechnix.com.twd
Command line used:            tripwire --check --interactive

===============================================================================
Rule Summary:
===============================================================================

-------------------------------------------------------------------------------
Section: Unix File System
-------------------------------------------------------------------------------

  Rule Name                       Severity Level    Added    Removed  Modified
  ---------                       --------------    -----    -------  --------
  Invariant Directories           66                0        0        0
  Temporary directories           33                0        0        0
* Tripwire Data Files             100               1        0        1
  Critical devices                100               0        0        0
  User binaries                   66                0        0        0
  Tripwire Binaries               100               0        0        0
  Critical configuration files    100               0        0        0
  Libraries                       66                0        0        0
  Operating System Utilities      100               0        0        0
  Critical system boot files      100               0        0        0
  File System and Disk Administraton Programs
                                  100               0        0        0
  Kernel Administration Programs  100               0        0        0
  Networking Programs             100               0        0        0
  System Administration Programs  100               0        0        0
  Hardware and Device Control Programs
                                  100               0        0        0
System Information Programs     100               0        0        0
  Application Information Programs
                                  100               0        0        0
  Shell Related Programs          100               0        0        0
  Critical Utility Sym-Links      100               0        0        0
  Shell Binaries                  100               0        0        0
  System boot changes             100               0        0        0
  OS executables and libraries    100               0        0        0
  Security Control                100               0        0        0
  Login Scripts                   100               0        0        0
* Root config files               100               0        0        1

Total objects scanned:  10071
Total violations found:  3
===============================================================================
Object Summary:
===============================================================================

-------------------------------------------------------------------------------
# Section: Unix File System
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
Rule Name: Tripwire Data Files (/var/lib/tripwire)
Severity Level: 100
-------------------------------------------------------------------------------

Remove the "x" from the adjacent box to prevent updating the database
with the new values for this object.

Added:
[x] "/var/lib/tripwire/server.ostechnix.com.twd.bak"

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
Rule Name: Tripwire Data Files (/etc/tripwire/tw.pol)
Severity Level: 100
-------------------------------------------------------------------------------

Remove the "x" from the adjacent box to prevent updating the database
with the new values for this object.

Modified:
[x] "/etc/tripwire/tw.pol"

-------------------------------------------------------------------------------
Rule Name: Root config files (/root)
Severity Level: 100
-------------------------------------------------------------------------------

Remove the "x" from the adjacent box to prevent updating the database
with the new values for this object.

Modified:
[x] "/root"

===============================================================================
. . .

Open Source Tripwire 2.4 Portions copyright 2000 Tripwire, Inc. Tripwire is a registered
trademark of Tripwire, Inc. This software comes with ABSOLUTELY NO WARRANTY;
for details use --version. This is free software which may be redistributed
or modified only under certain conditions; see COPYING for details.
All rights reserved.
Integrity check complete.
Please enter your local passphrase:
Wrote database file: /var/lib/tripwire/server.ostechnix.com.twd
```

Now let us add a new file called sk.

```
[root@server ~]# touch sk
```

Now check this file with tripwire –check –interactive command. You may find the file sk under the Added section in the result.

```
[root@server ~]# tripwire --check --interactive
. . .
-------------------------------------------------------------------------------
Rule Name: Root config files (/root)
Severity Level: 100
-------------------------------------------------------------------------------

Remove the "x" from the adjacent box to prevent updating the database
with the new values for this object.

Added:
[x] "/root/sk"
. . .
```

Now the new file sk is updated automatically in the tripwire policy file.

### Viewing the tripwire report file

All tripwire report files having extension .twr are stored in /var/lib/tripwire/report/ directory. These are not text files, so you can’t view them using any editor. First convert them using the following command to human readable format.

```
[root@server ~]# twprint --print-report --twrfile /var/lib/tripwire/report/server.ostechnix.com-20130510-124159.twr > /tmp/twrreport.txt
```

Now open the file using any editor.

```
[root@server ~]# vi /tmp/twrreport.txt
Note: Report is not encrypted.
Open Source Tripwire(R) 2.4.1 Integrity Check Report

Report generated by:          root
Report created on:            Fri 10 May 2013 12:41:59 PM IST
Database last updated on:     Fri 10 May 2013 12:37:53 PM IST

===============================================================================
Report Summary:
===============================================================================

Host name:                    server.ostechnix.com
Host IP address:              Unknown IP
Host ID:                      None
Policy file used:             /etc/tripwire/tw.pol
Configuration file used:      /etc/tripwire/tw.cfg
Database file used:           /var/lib/tripwire/server.ostechnix.com.twd
Command line used:            tripwire --check --interactive
. . .
```

### Viewing Tripwire configuration and policy file locations

To view the policy file locations enter the following command.

```
[root@server ~]# twadmin --print-polfile
# policy:

# Global Variable Definitions

@@section GLOBAL
TWROOT=/usr/sbin;
TWBIN=/usr/sbin;
TWPOL="/etc/tripwire";
TWDB="/var/lib/tripwire";
TWSKEY="/etc/tripwire";
TWLKEY="/etc/tripwire";
TWREPORT="/var/lib/tripwire/report";
HOSTNAME=server.ostechnix.com;
. . .

```

To view the configuration files enter the following command.

```
[root@server ~]# twadmin --print-cfgfile
ROOT                   =/usr/sbin
POLFILE                =/etc/tripwire/tw.pol
DBFILE                 =/var/lib/tripwire/$(HOSTNAME).twd
REPORTFILE             =/var/lib/tripwire/report/$(HOSTNAME)-$(DATE).twr
SITEKEYFILE            =/etc/tripwire/site.key
LOCALKEYFILE           =/etc/tripwire/$(HOSTNAME)-local.key
EDITOR                 =/bin/vi
LATEPROMPTING          =false
LOOSEDIRECTORYCHECKING =false
MAILNOVIOLATIONS       =true
EMAILREPORTLEVEL       =3
REPORTLEVEL            =3
MAILMETHOD             =SENDMAIL
SYSLOGREPORTING        =false
MAILPROGRAM            =/usr/sbin/sendmail -oi -t
```

### Scheduling Tripwire Check

You may find a cron file tripwire-check might be created automatically in the /etc/cron.daily/ directory.

If it isn’t created, open your crontab file and add lines as shown below.

The following example will execute the tripwire daily at 5 am.

```
[root@server ~]# vi /etc/crontab
# Tripwire Monitor process
00 5 * * * /usr/sbin/tripwire  --check
```

Thats it...

## Tripwire on Ubuntu

### Install

Fortunately, tripwire can be found in Ubuntu's default repositories. We can install it with apt-get by typing:

```
sudo apt-get update
sudo apt-get install tripwire
```

This installation will run through quite a bit of configuration of the packages that are required.

First, it will configure the mail application that is being pulled in as a dependency. If you want to configure email notifications, select "internet site".

It will ask you if you want to select passphrases during installation. Select "yes" to both of these prompts.
It will ask if it can rebuild the configuration file. Select "yes". It will ask a similar question about the policy file. Again, answer "yes".

Next, you will be asked to choose and confirm a site key passphrase. Tripwire uses two keys to secure its configuration files.

+ *site key*: This key is used to secure the configuration files. We need to ensure that the configuration files aren't modified, or else our entire detection system cannot be trusted.
  Since the same configuration files can be used for multiple servers, this key can be used across servers.
+ *local key*: This key is used on each machine to run the binaries. This is necessary to ensure that our binaries are not run without our consent.

You will first choose and confirm a passphrase for the site key, and then for the local key.

Make sure you choose strong passphrases.

### Initialize the Database

Following the installation, you must initialize and configure your installation. Like most security programs, tripwire is shipped with generic, but strict defaults that may need to be fine-tuned for your specific installation.

First, if you did not choose yes to create a policy file during installation, you can do so now by issuing the command:

```
sudo twadmin --create-polfile /etc/tripwire/twpol.txt
```

You will be prompted for the site passphrase you configured earlier.

This creates an encrypted policy file from the plain text one that we specified in the /etc/tripwire/ directory. This encrypted file is what tripwire actually reads when running its checks.

We can now initialize the database that tripwire will use to validate our system. This uses the policy file that we just initiated and checks the points that are specified within.

Because this file has not been tailored for our system yet, we will have a lot of warnings, false positives, and errors. We will use these as a reference to fine-tune our configuration file in a moment.

The basic way to initialize the database is by running:

```
sudo tripwire --init
```

This will create our database file and complain about the things that we must adjust in the configuration.

Because we want to save the results to inform our configuration decisions, we can grab any instance where it mentions a file, and put it in a file in the tripwire configuration directory. We can run the check and place the files listed into a file called test_results in our tripwire config directory:

sudo sh -c 'tripwire --check | grep Filename > test_results'

If we view this file, we should see entries that look like this:

```
less /etc/tripwire/test_results

Filename: /etc/rc.boot
Filename: /root/mail
Filename: /root/Mail
Filename: /root/.xsession-errors
. . .
```

### Configure the Policy File to Match Your System

Now that we have a list of files that are setting off tripwire, we can go through our policy file and edit it to get rid of these false positives.

Open the plain text policy in your editor with root privileges:

```
sudo nano /etc/tripwire/twpol.txt
```

Do a search for each of the files that were returned in the test_results file. Comment out all of the lines that you find that match.

In the "Boot Scripts" section, you should comment out the /etc/rc.boot line, since this isn't present in an Ubuntu system:

```
(
  rulename = "Boot Scripts",
  severity = $(SIG_HI)
)
{
        /etc/init.d             -> $(SEC_BIN) ;
        #/etc/rc.boot            -> $(SEC_BIN) ;
        /etc/rcS.d              -> $(SEC_BIN) ;
```

There were a lot of files in the /root home directory that needed to be commented out on my system. Anything that is not present on your system should be commented out:

```
(
  rulename = "Root config files",
  severity = 100
)
{
        /root                           -> $(SEC_CRIT) ; # Catch all additions to /root
        #/root/mail                     -> $(SEC_CONFIG) ;
        #/root/Mail                     -> $(SEC_CONFIG) ;
        #/root/.xsession-errors         -> $(SEC_CONFIG) ;
        #/root/.xauth                   -> $(SEC_CONFIG) ;
        #/root/.tcshrc                  -> $(SEC_CONFIG) ;
        #/root/.sawfish                 -> $(SEC_CONFIG) ;
        #/root/.pinerc                  -> $(SEC_CONFIG) ;
        #/root/.mc                      -> $(SEC_CONFIG) ;
        #/root/.gnome_private           -> $(SEC_CONFIG) ;
        #/root/.gnome-desktop           -> $(SEC_CONFIG) ;
        #/root/.gnome                   -> $(SEC_CONFIG) ;
        #/root/.esd_auth                        -> $(SEC_CONFIG) ;
        #/root/.elm                     -> $(SEC_CONFIG) ;
        #/root/.cshrc                   -> $(SEC_CONFIG) ;
        /root/.bashrc                   -> $(SEC_CONFIG) ;
        #/root/.bash_profile            -> $(SEC_CONFIG) ;
        #/root/.bash_logout             -> $(SEC_CONFIG) ;
        /root/.bash_history             -> $(SEC_CONFIG) ;
        #/root/.amandahosts             -> $(SEC_CONFIG) ;
        #/root/.addressbook.lu          -> $(SEC_CONFIG) ;
        #/root/.addressbook             -> $(SEC_CONFIG) ;
        #/root/.Xresources              -> $(SEC_CONFIG) ;
        #/root/.Xauthority              -> $(SEC_CONFIG) -i ; # Changes Inode number on login
        #/root/.ICEauthority                -> $(SEC_CONFIG) ;
}
```

The last part of my check was complaining about file descriptors in the /proc filesystem. These files change all of the time, so will trigger false positives regularly if we leave the configuration as is.

In the "Devices & Kernel information" section, you can see that the /proc filesystem is listed to be checked.

```
(
  rulename = "Devices & Kernel information",
  severity = $(SIG_HI),
)
{
        /dev            -> $(Device) ;
        /proc           -> $(Device) ;
}
```

However, this will check every file under it. We don't particularly want that. Instead, we will remove this specification, and add configuration options for all of the directories under /proc that we do want to check:

```
{
        /dev                    -> $(Device) ;
        #/proc                  -> $(Device) ;
        /proc/devices           -> $(Device) ;
        /proc/net               -> $(Device) ;
        /proc/tty               -> $(Device) ;
        /proc/sys               -> $(Device) ;
        /proc/cpuinfo           -> $(Device) ;
        /proc/modules           -> $(Device) ;
        /proc/mounts            -> $(Device) ;
        /proc/dma               -> $(Device) ;
        /proc/filesystems       -> $(Device) ;
        /proc/interrupts        -> $(Device) ;
        /proc/ioports           -> $(Device) ;
        /proc/scsi              -> $(Device) ;
        /proc/kcore             -> $(Device) ;
        /proc/self              -> $(Device) ;
        /proc/kmsg              -> $(Device) ;
        /proc/stat              -> $(Device) ;
        /proc/loadavg           -> $(Device) ;
        /proc/uptime            -> $(Device) ;
        /proc/locks             -> $(Device) ;
        /proc/meminfo           -> $(Device) ;
        /proc/misc              -> $(Device) ;
}
```

While we are in this portion of the file, we also want to do something with the /dev/pts filesystem. Tripwire will not check that location by default because it is told to check /dev, and /dev/pts is on a separate filesystem, which it will not enter unless specified. To get tripwire to check this as well, we can explicitly name it here:

```
{
        /dev                    -> $(Device) ;
        /dev/pts                -> $(Device) ;
        #/proc                  -> $(Device) ;
        /proc/devices           -> $(Device) ;
        /proc/net               -> $(Device) ;
        /proc/tty               -> $(Device) ;
        . . .

The last thing we will comment out are the /var/run and /var/lock lines so that our system does not flag normal filesystem changes by services:

(
  rulename = "System boot changes",
  severity = $(SIG_HI)
)
{
        #/var/lock              -> $(SEC_CONFIG) ;
        #/var/run               -> $(SEC_CONFIG) ; # daemon PIDs
        /var/log                -> $(SEC_CONFIG) ;
}
```

Save and close the file when you are finished editing.

Now that our file is configured, we need to implement it by recreating the encrypted policy file that tripwire actually reads:

```
sudo twadmin -m P /etc/tripwire/twpol.txt
```

After this is created, we must reinitialize the database to implement our policy:

```
sudo tripwire --init

Please enter your local passphrase:
Parsing policy file: /etc/tripwire/tw.pol
Generating the database...
*** Processing Unix File System ***
Wrote database file: /var/lib/tripwire/tripit.twd
The database was successfully generated.
```

All of the warnings that you received earlier should be gone now. If there are still warnings, you should continue editing your `/etc/tripwire/twpol.txt` file until they are gone.
Verify the Configuration

If your database initialization didn't complain about any files, then your configuration should match your system at this point. But we should run a check to see what the tripwire report looks like and if there are truly no warnings:

The basic syntax for a check is:

```
sudo tripwire --check
```

You should see a report output to your screen specifying that there were no errors or changes found on your system.

Once this is complete, you can be fairly confident that your configuration is correct. We should clean up our files a bit to remove sensitive information from our system.

We can delete the test_results file that we created:

```
sudo rm /etc/tripwire/test_results
```

Another thing that we can do is remove the actual plain text configuration files. We can do this safely because they can be generated at-will from the encrypted files with our password.

All we have to do to regenerate the plain text file is pass the encripted file to twadmin, in much the same way that we did to generate the encrypted version. We just pipe it into a plain text file again:

```
sudo sh -c 'twadmin --print-polfile > /etc/tripwire/twpol.txt'
```

Test this now by moving the text version to a backup location and then recreate it:

```
sudo mv /etc/tripwire/twpol.txt /etc/tripwire/twpol.txt.bak
sudo sh -c 'twadmin --print-polfile > /etc/tripwire/twpol.txt'
```

If it worked correctly, you can safely remove the plain text files now:

```
sudo rm /etc/tripwire/twpol.txt
sudo rm /etc/tripwire/twpol.txt.bak
```

### Set Up Email Notifications

We will configure tripwire to run every day and also implement automatic notifications. During the process, we can test how to update the database when we make changes to our system.

We will use the mail command to mail our notifications to our email address. This is not installed on our system currently, so we will have to download it from the repositories.

This gives us a great opportunity to see how tripwire reacts to changes in the system.

Install the files like this:

```
sudo apt-get install mailutils
```

Now that we have that command installed, let's do a test of our system's ability to mail out a tripwire report. This report will have warnings and changes too, since we just installed new software without telling tripwire:

```
sudo tripwire --check | mail -s "Tripwire report for `uname -n`" your_email@domain.com
```

You should receive a report shortly in your email with details about the new mail software you just installed to send the message! This is good. It means that tripwire is picking up changes in the filesystem and that our mail software is working as well.

We should now "okay" the software changes we made by doing an interactive check to update the database.

We can do this by typing:

```
sudo tripwire --check --interactive
```

This will run the same tests as normal, but at the end, instead of outputting the report to the screen, it is copied into a text file and opened with the default editor.

This report goes into quite a lot of detail about each file that changed. In fact, on my machine, the report generated was 2,275 lines long. This amount of information is extremely helpful in the event of a real security problem, but in our case, it's generally probably not too interesting for the most part.

The important part is near the top. After some introductory information, you should see some lines with check boxes for each of the added or modified files:

```
Rule Name: Other binaries (/usr/sbin)
Severity Level: 66
-------------------------------------------------------------------------------

Remove the "x" from the adjacent box to prevent updating the database
with the new values for this object.

Added:
[x] "/usr/sbin/maidag"

Modified:
[x] "/usr/sbin"
. . .
```

These check boxes indicate that you want to update the database to allow these changes. You should search for every box that has an "x" in it and verify that those are changes that you made or are okay with.

If you are not okay with a change, you can remove the "x" from the box and that file will not be updated in the database. This will cause this file to still flag tripwire on the next run.

After you have decided on which file changes are okay, you can save and close the file.

At this point, it will ask for your local passphrase so that tripwire can update its database files.

If we accepted all of the changes, if we re-run this command, the report should be much shorter now and list no changes.

### Automate Tripwire with Cron

Now that we have verified that all of this functionality works manually, we can set up a cron job to execute a tripwire check every morning.

We will be using root's crontab, because edits to the system cronjob can get wiped out with system updates.

Check to see if root already has a crontab by issuing this command:

```
sudo crontab -l
```

If a crontab is present, you should pipe it into a file to back it up:

```
sudo sh -c 'crontab -l > crontab.bad'
```

Afterwards, we can edit the crontab by typing:

```
sudo crontab -e
```

If this is your first time running crontab, it will ask you which editor you wish to use. If you don't have a preference for another editor, nano is typically a safe choice.

Afterwards, you will be taken to a file where we can automate tripwire. Since we will be running tripwire daily, we only need to decide what time we want it to run. Typically, services are run in non-peak times to not disrupt busy hours.

The format we need to use is min hour * * * command. The command that we want to use is the same one we used to mail our report before. We don't need to use sudo since this is going to be run as root.

To have tripwire run at 3:30am every day, we can place a line like this in our file:

```
30 3 * * * /usr/sbin/tripwire --check | mail -s "Tripwire report for `uname -n`" your_email@domain.com
```

You can adjust this to your preference.

### Conclusion

You should now have an automated intrusion detection system that sends you reports regarding changes on your filesystem. You should review the emailed reports regularly and take action where there are changes detected, either in updating the tripwire database to okay the changes, or investigating suspicious activity.

# On the users...

## Ports

Use ports:

+ 9898
+ 8080

## User

`tripwire` account: account LOCKED, password LOCKED, member of group `tripwire`.

## User Rights

sudo or boks profile with appropriate permissions:

```
sudo "Cmnd_Alias CMD_TRIPWIRE = service --status-all, \
   service * status, \
   /sbin/chkconfig --list, \
   /usr/bin/yum list installed, \
   /bin/netstat, \
   /bin/ls, \
   /bin/su - root -c umask, \
   /bin/su - -c set , \
   /usr/bin/passwd -S *, \
   /usr/bin/lsattr, \
   /usr/sbin/httpd -M, \
   /usr/bin/getfacl, \
   /bin/cat,     \
   /sbin/auditctl -l

Cmnd_Alias NO_CMD_TRIPWIRE = service * stop*, \
   service * start*, \
   service * re*, \
   service * force*, \
   service * try*
```

The sequence of commands is highly important, do not change.

```
tripwire ALL=(root) NOPASSWD: CMD_TRIPWIRE
tripwire ALL=(root) NOPASSWD: !NO_CMD_TRIPWIRE,!/bin/cat /etc/shadow
tripwire ALL=(root) NOPASSWD: NOEXEC: /usr/bin/find *"
               Defaults:tripwire       !requiretty
```

Tripwire agent installed and running on tripwire user with rights describe above.
