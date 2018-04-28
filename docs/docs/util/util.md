# Util

Using Scala REPL

It is basically command line interactive shell called as REPL short for Read-Eval-Print-Loop.
To start Scala REPL, open command prompt and simply type Scala.  After that, you will see new Scala prompt waiting for your input as shown below
Now, you can type of any Scala expressions or code in prompt and hit enter and you will get the output immediately as shown below.

Using Scala interpreter to run scala script

You can save your Scala code in the file with .scala extension  (basically with any file extension but prefered .scala extension) and to run, provide file name with extension as parameter to Scala interpreter
Create the file HelloScala.scala with following code
val str = "Hello "+ "Scala "
println("'str' contents : "+str)
Now, we can run this file using command shown as follows
$> scala HelloScala.scala
'str' contents : Hello Scala
As you can observe we do not require the any class definition declaration or so. We can put the code inside the file and we are ready to run it.

Using Scala interpreter

Usual Scala program contains lot code chunks spread of across lot of files, for running these programs we need to go through two stages, compile the Scala source code using Scala compiler and run the compiled bytecode using Scala interpreter.
Lets create file named Hello.scala with following code
object Hello {
     def main(args:Array[String]):Unit = {
       println("Hello, Scala !! ")
}
}
Little explanation about above program, we created object Hello, Object is way scala represent the static members and inside it we have main method taking param as array of strings and returning Unit which is same as void in Java. This main method more like one in java but Scala version of it.
compile file using Scala compiler scalac, as shown below,
$> scalac Hello.scala
It will create the couple of class files in current directory. To run this, we use Scala interpreter (or java interpreter, a little later on this ) by passing the class name (not with .scala or .class extension). In our case, we do following
$> scala Hello
Hello, Scala !!

Using Java interpreter

As compiled Scala code is bytecode that we can run with Java interpreter which is java.exe or java.sh shipped with standard Java JRE distribution. But for this we need to put additional library in classpath.
We just need to add the scala-library.jar which located under $SCALA_HOME/lib
To run using java interpreter, we use following command
$> java -cp $SCALA_HOME/lib/scala-library.jar;. Hello

Using Scala worksheet

This Scala worksheet is part of Scala IDE for eclipse. It is like the REPL but much more convenient and powerful than REPL.
Following is excerpt from official Github repo wiki about the Scala worksheet
    A worksheet is a Scala file that is evaluated on save, and the result of each expression is shown in a column to the right of your program. Worksheets are like a REPL session on steroids, and enjoy 1st class editor support: completion, hyperlinking, interactive errors-as-you-type, auto-format, etc.
For creating new Scala worksheet in Scala IDE, first create Scala project then right click on Scala project and go to following New > Scala WorkSheet
It will prompt for name for worksheet and folder to which worksheet to be created. Give any name, accept default folder and then hit enter
After that you will get the worksheet  as shown as follows. it gives output at right of your code (one marked in red) as shown following figure
You can write any code inside object body and hit the save button and you have the output at right of your code


# Howto

+ Get Used DNS Server (Ubuntu >= 15): `nmcli device show <interfacename> | grep IP4.DNS`

# Bash

+ http://tldp.org
+ http://www.tldp.org/guides.html
+ http://www.tldp.org/LDP/abs/html/index.html
+ http://www.tldp.org/LDP/Bash-Beginners-Guide/html/index.html

+ useradd user1
+ passwd user1

+ rename 's/ACDC/AC-DC/' *.xxx

# Spam Assassin

apache-james roy.james@xemaps.com

http://wiki.apache.org/spamassassin/Rules/SL_HELO_NON_FQDN_1
http://wiki.apache.org/spamassassin/Rules/HELO_LOCALHOST
http://wiki.apache.org/spamassassin/Rules/RCVD_NUMERIC_HELO
http://wiki.apache.org/spamassassin/Rules/SPF_NEUTRAL

apt-get install spamassassin
spamassassin -D < nospam-corporate-umg-1.txt 2> out
vi /etc/spamassassin/local.cf

# Set the threshold at which a message is considered spam (default: 5.0)

required_score 11.0
score RCVD_IN_XBL 0 0 0 0
vi /etc/default/spamassassin
# Change to one to enable spamd
ENABLED=1
tail -f /var/log/syslog
create /nonexisting/.spamassassin ???
/etc/init.d/spamassassin start

# Benchmark

ab -c 10 -n 100000 http://localhost:8080/app/

# Monitoring

nmon

# GPG 

http://www.apache.org/dist/james/server/james-binary-2.3.2.tar.gz
http://www.apache.org/dist/james/server/james-binary-2.3.2.tar.gz.asc
http://www.apache.org/dist/james/KEYS
And tried verifying the signature for the download using:
gpg --import KEYS
gpg --verify apache-james-2.3.2.tar.gz.asc
gpg: Signature made Tue 11 Aug 2009 08:35:01 NZST using RSA key ID A6EE6908
gpg: Can't check signature: public key not found
This doesn't look good!
Looking through the KEYS file there doesn't appear to be a key for A6EE6908
Fetching the key from pgpkeys.mit.edu produces the following:
gpg --keyserver pgpkeys.mit.edu --recv-key A6EE6908
gpg: requesting key A6EE6908 from hkp server pgpkeys.mit.edu
gpg: key A6EE6908: public key "Robert Burrell Donkin (CODE SIGNING KEY) <rdonkin@apache.org>" imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)

And the fingerprint looks like this:
gpg --fingerprint A6EE6908
pub   8192R/A6EE6908 2009-08-07
    Key fingerprint = 597C 729B 0237 1932 E77C  B9D5 EDB8 C082 A6EE 6908
uid                  Robert Burrell Donkin (CODE SIGNING KEY) <rdonkin@apache.org>
sub   8192R/B800EFC1 2009-08-07
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann% gpg --import < KEYS
gpg: key 3592721E: "Henry Saputra (CODE SIGNING KEY) <hsaputra@apache.org>" not changed
gpg: key B876884A: "Chris Mattmann (CODE SIGNING KEY) <mattmann@apache.org>" not changed
gpg: key C601BCA7: public key "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>" imported
gpg: Total number processed: 3
gpg:               imported: 1  (RSA: 1)
gpg:              unchanged: 2
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann% $HOME/bin/verify_gpg_sigs
Verifying Signature for file gora-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:04:21 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:04:21 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-accumulo-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:39:30 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-accumulo-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:39:30 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-cassandra-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:40:05 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-cassandra-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:40:05 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-core-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:05:59 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-core-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:05:59 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-hbase-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:38:51 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-hbase-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:38:51 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-sql-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:40:41 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-sql-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:40:41 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-tutorial-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:41:16 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-tutorial-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:41:16 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Checksums look good:
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann% $HOME/bin/verify_md5_checksums
md5sum: stat '*.bz2': No such file or directory
gora-0.2-src.tar.gz: OK
gora-accumulo-0.2-src.tar.gz: OK
gora-cassandra-0.2-src.tar.gz: OK
gora-core-0.2-src.tar.gz: OK
gora-hbase-0.2-src.tar.gz: OK
gora-sql-0.2-src.tar.gz: OK
gora-tutorial-0.2-src.tar.gz: OK
gora-0.2-src.zip: OK
gora-accumulo-0.2-src.zip: OK
gora-cassandra-0.2-src.zip: OK
gora-core-0.2-src.zip: OK
gora-hbase-0.2-src.zip: OK
gora-sql-0.2-src.zip: OK
gora-tutorial-0.2-src.zip: OK
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann%
curl -O http://people.apache.org/~jghoman/giraph-0.1.0-incubating-rc0/giraph-0.1.0-incubating-src.tar.gz
curl -O http://people.apache.org/~jghoman/giraph-0.1.0-incubating-rc0/giraph-0.1.0-incubating-src.tar.gz.asc
curl -O http://people.apache.org/~jghoman/giraph-0.1.0-incubating-rc0/giraph-0.1.0-incubating-src.tar.gz.md5
curl -O http://www.apache.org/dist/incubator/giraph/KEYS
gpg --import KEYS
gpg: key 3D0C92B9: public key "Owen O'Malley (Code signing) <omalley@apache.org>" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   2  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 2u
$HOME/bin/verify_gpg_sigs
Verifying Signature for file giraph-0.1.0-incubating-src.tar.gz.asc
gpg: Signature made Tue Jan 31 14:50:26 2012 PST using RSA key ID FCA366B7
gpg: Can't check signature: No public key
gpg --verify giraph-0.1.0-incubating-src.tar.gz.asc giraph-0.1.0-incubating-src.tar.gz
$HOME/bin/verify_md5_checksums
md5sum: stat '*.bz2': No such file or directory
md5sum: stat '*.zip': No such file or directory
giraph-0.1.0-incubating-src.tar.gz: OK

MD5

http://raamdev.com/2008/howto-install-md5sum-sha1sum-on-mac-os-x/

BITTORRENT                                                                 |

ctorrent -s 1 -e 12 -C 32 -p 400 -u http://www.sumotracker.org/announce file.torrent
ctorrent  -d -s out-folder -e 12 -C 32 -i 173.12.23.23 -p 6881 file.torrent
I needed a command line BitTorrent client for my Fedora Core 6, and started to look for some options, I found ctorrent, which I could see has the options I may need, and as it is written in C should be fast, I know there is another one written in python also.
Let's see how to install and use this one. (ctorrent)
First we need to install it.
yum install ctorrent
(you will need extras repository for this)
If you run
ctorrent
with no arguments this is what you get.
CTorrent dnh2 Original code Copyright: YuHong(992126018601033)
WARNING: THERE IS NO WARRANTY FOR CTorrent. USE AT YOUR OWN RISK!!!
Generic Options:
-h/-H Show this message.
-x Decode metainfo(torrent) file only, don't download.
-c Check exist only. don't download.
-v Verbose output (for debugging).
Download Options:
-e int Exit while seed hours later. (default 72 hours)
-E num Exit after seeding to ratio (UL:DL).
-i ip Listen for connection on ip. (default all ip's)
-p port Listen port. (default 2706 -> 2106)
-s save_as Save file/directory/metainfo as...
-C cache_size Cache size,unit MB. (default 16MB)
-f Force seed mode. skip hash check at startup.
-b bf_filename Bit field filename. (use it carefully)
-M max_peers Max peers count.
-m min_peers Min peers count.
-z slice_size Download slice/block size, unit KB. (default 16, max 128).
-n file_number Which file download.
-D rate Max bandwidth down (unit KB/s)
-U rate Max bandwidth up (unit KB/s)
-P peer_id Set Peer ID [-CD0201-]
-S host:port Use CTCS server
Make metainfo(torrent) file Options:
-t With make torrent. must specify this option.
-u url Tracker's url.
-l piece_len Piece length.(default 262144)
eg.
hong> ctorrent -s new_filename -e 12 -C 32 -p 6881 eg.torrent
home page: http://ctorrent.sourceforge.net/
see also: http://www.rahul.net/dholmes/ctorrent/
bug report: dholmes@ct.boxmail.com
original author: bsdi@sina.com

ALT^arrow_left ALT^arrow_right: go to the beginning or the end of the line
source file.properties
#/!bin/bash
username=...
mysql -u $username
CTRL^R: go back in history
CTRL^...: go forward in history

```bash
screen -ls   # list all the screens
screen -S aq # Create a new screen
screen -r aq # Join an existing screen
screen -D -r '1234.somescreensession'
```

dmesg

1. Download Ubuntu Desktop
2. Open the Terminal (in /Applications/Utilities/ or query Terminal in Spotlight).
3. Convert the .iso file to .img using the convert option of hdiutil (e.g.,hdiutil convert -format UDRW -o ~/path/to/target.img ~/path/to/ubuntu.iso)
Note: OS X tends to put the .dmg ending on the output file automatically.
4. Run diskutil list to get the current list of devices.
5. Insert your flash media.
6. Run diskutil list again and determine the device node assigned to your flash media (e.g. /dev/disk2).
7. Run diskutil unmountDisk /dev/diskN (replace N with the disk number from the last command; in the previous example, N would be 2).
8. Execute sudo dd if=/path/to/downloaded.img of=/dev/rdiskN bs=1m (replace /path/to/downloaded.img with the path where the image file is located; for example, ./ubuntu.imgor ./ubuntu.dmg).
    Using /dev/rdisk instead of /dev/disk may be faster
    If you see the error dd: Invalid number '1m', you are using GNU dd. Use the same command but replace bs=1m with bs=1M
    If you see the error dd: /dev/diskN: Resource busy, make sure the disk is not in use. Start the 'Disk Utility.app' and unmount (don't eject) the drive
9. Run diskutil eject /dev/diskN and remove your flash media when the command completes.
10. Restart your Mac and press alt/option key while the Mac is restarting to choose the USB stick.

sort
uniq
wc
wc -l
ls -lh
list=`*.csv`
for file in $list
do
cat $file >> new_file.csv
cat -vet
done
$table=yourtable
hive -e "load data local inpath '$file' into table $table"
cat *.csv > output.csv
netstat -npl
netstat -nr
netstat -a -t --numeric-ports -p
sockstat -l | grep sshd
jflex flex lex
chmod -R 755 . # default permission
tty
script -a /dev/pts/1
xmllint

$ cat /proc/meminfo
$ less /proc/meminfo
$ more /proc/meminfo
$ egrep --color 'Mem|Cache|Swap' /proc/meminfo
Sample outputs:
MemTotal:        8120568 kB
MemFree:         2298932 kB
Cached:          1907240 kB
SwapCached:            0 kB
SwapTotal:      15859708 kB
SwapFree:       15859708 kB
$ free -m

command | tee file

w3m

lspci
lsusb
dmesg |grep eth0

more /etc/fstab
fdisk -l
du -hs /path/to/directory | sort
df -h
Usually I will put -h to make it size human readable.
Another good tools to check the disk space for directories, we use du. You may realized that when you type ls -l, the size of every directories have the same size 4096, it is because directories is actually a file. But for us, we want to know how large the load it store instead the directory file itself.
To show all directories size including sub directories, type
du -h
To calculate the current directory size you are in (-s stand for summary)
du -sh
To show all the 1 level sub directories size (which you are not interested at sub sub directories.)
du -sh *
To show the size of specific directory
du -sh /home
To show the size of all sub directories of a specific directory
du -sh /home/*

# Kernel

+ process
ls /proc/<pid>/...
netstat -lnap
mount
pidof ...
top -p pid
htop ... F5
pidstat -d -p ALL 5 10
ps -auxww
ps -axfus
strace
ltrace
renice
top

mtr
dig +trace hostname
traceroute

file descriptor output types (stdout1 2 and stderr3)
strace echo "1"
> /dev/null 1>&2

+ file
stat <file>
time ls -R / > /dev/null
(do it twice)

+ io
iostat
iostat -x 1
vmstat 1
netstat -l -p
sockstat -4 -l | grep :80 | awk '{print $3}' | head -1

time smtp-source -A -C1500 -l 100 -m 100000 -s 500 -d -c -f nm@test.de -t te 213.157.22.218:25
time smtp-source -L -s 40 -m 100 -l 4096 -d -c -f me@elasticinbox.com -t test@elasticinbox.com ElasticInbox-LB-1070648408.eu-west-1.elb.amazonaws.com:2400
for i in `seq -w 1 1000`; do lsof -a -u dweiss -c java > snap.$i; sleep 5; done
find queue-jms/src/test/ -name *.java  -print | xargs sed -i 's/\t/        /g'
find /tmp/ -name 'aos-bu-*' -print0 | xargs -0 rm -fr
tr 'A-Z' 'a-z' < subtitles_124.txt | tr -sc 'A-Za-z' '\n' | sort | less | uniq -c | sort -n -r | less
tr ";" "," < in.csv | tr "\"" "" > out.csv
echo $?
tar xvfj *.bz2
tar xvfz .tar.gz

locate file

bzcat stackoverflow.com-Posts.7z | hdfs dfs -put - /user/srowen/Posts.xml

patch -p0 --dry-run < file.patch

ubuntu startup scripts
vi /etc/init.d <script>
update-rc.d <script> defaults
update-rc.d <script> remove

fedora startup scripts
have a fedora core box which needs to run different scripts on startup to connect to other boxes on the network.
After a bit of fiddling around, I found what appears to be the best solution for me, using ntsysv and init.d. Here's how it's done;
+ make a new file in the /etc/init.d/ directory
+ add your script to this file with the following lines at the top;
#!/bin/bash
# chkconfig: 345 85 15
# description: of your file
+ enter this in the shell;
chkconfig --add startup_filename
+ type ntsysv - your startup script should now be in the list, checked and ready for action!

Simple Commands Complex Commands The For Structure Example For Syntax The While Structure Example While Syntax The If Structure Example Simple If Syntax Example Complex If Syntax The Case Structure Example Case Syntax The Parent & Sub-Shell Structure The Function Structure Example Function Syntax Special Commands Comment Structure
Built-In Commands
(Simple, Complex & Special Commands)
Back in the man pages the next section is called USAGE and goes on to talk about pipelines and lists. Most of what it says here can be understood by any UNIX user so I will skip this for now but there will be some examples later showing various implementations of these definitions. The issue I want to deal with next is the simple, complex and special commands. This is nowhere near as bad as it sounds.
Simple Commands
Simple commands are just straight UNIX commands that exist regardless of the surrounding shell environment. Like our old favourites ls -l or df -al or lpr -Pprinter filename. There are large numbers of commands that fall into this category but the following list is a selection of the more useful when scripting.
    sort Sorts lines in ascending, descending and unique order
    grep Searches for regular expressions in strings or files
    basename Strips the path from a path string to leave just the filename
    dirname Removes the file from a path string to leave just the pathname
    cut Chops up a text string by characters or fields
    wc Count the characters, words, or lines
    [ (test) ] Predicate or conditional processor
    tr 'a' 'b' Transform characters
    expr Simple arithmetic processor
    bc Basic Calculator
    eval Evaluate variables
    echo Output strings
    date Create date strings
    nawk Manipulate text strings
    head | tail Access lines in files
Some of the above commands can be very complex indeed, especially when assembled into pipelines and lists. However, these are still referred to as simple commands - presumably because they stand alone. Take a close look at the man pages for all of the above commands, you will find them invaluable during your scripting sojourn.
Complex Commands
Complex commands are just the shells internal commands which are used to group simple commands into controlled sets based on your requirements. These include the loop constructs and conditional test structures. These cannot stand alone. An if requires a then and a fi at the very least. Lets take a look at the man pages again at this point.
The for structure:
It says on my systems man page for name [ in word ... ] do list done as a syntax description of the for command construct. Well, it is correct but does not really show the layout of the command at all. Look at the example below and you can see straight away what is supposed to happen.
Example for syntax
alphabet="a b c d e"            # Initialise a string
count=0                    # Initialise a counter
for letter in $alphabet            # Set up a loop control
do                    # Begin the loop
    count=`expr $count + 1`        # Increment the counter
    echo "Letter $count is [$letter]"    # Display the result
done                    # End of loop
So in plain English, for each letter found in alphabet loop between do and done and process the list of commands found. Lets take this one line at a time from the top. This is the way the sh likes to have its variables set. There is no leading word as in the csh (set) just start with the variable name. There are also no blanks either side of the equal sign. Indeed, if you put a blank in, the shell will give you an error message for your trouble. This also gives rise to the difference between the top two lines in this example. Because I want to include spaces in my string for alphabet, I must enclose the whole string in double quotes. On the next line this is not required as there are no embedded blanks in the value of count. When setting variables, no blanks are allowed. Everywhere else, sh loves blanks.
In line 3 the for statement creates a loop construct by selecting the next letter from alphabet each time through the loop and executing the list found between the do and the done for each letter. This process also strips away any blanks (before and after) each letter found in alphabet . The do and done statements are not executed as such, they simply mark the beginning and end of the loop list. They are however a matched pair, leave one out and the shell will complain.
Inside the loop are two simple commands (apparently!). The first one just increments the loop counter by adding one to its current value. Note the use of the back-quote here to force the execution of the expr command before setting the new value of count. There will be more about this later.
The next line is something we have seen before, just a display command showing the values of the variables. Note the use of the $ symbol to request the value of the variables.
The while structure:
There is another similarly structured command in the sh called while. Its syntax structure is listed as while list do list done which you should now be able to translate yourself into something that looks like the example below.
Example while syntax
alphabet="a b c d e"                        # Initialise a string
count=0                                # Initialise a counter
while [ $count -lt 5 ]                        # Set up a loop control
do                                # Begin the loop
    count=`expr $count + 1`                    # Increment the counter
    position=`bc $count + $count - 1`               # Position of next letter
    letter=`echo "$alphabet" | cut -c$position-$position`    # Get next letter
    echo "Letter $count is [$letter]"                # Display the result
done                                # End of loop
Most of this is the same construct, I have just replaced the for loop set-up with its equivalent while syntax. Instead of stepping through the letters in alphabet, the loop control now monitors the size of the count with [ $count -lt 5]. The -lt flag here represents less-than and is part of the UNIX test command, which is implied by the square brackets. Any other command, list or variable could be put here as long as its substituted value equates to an integer. A zero value will exit the loop, anything else and the loop will continue to process. From the above you can work out that test returns 1 for true and 0 for false. Have a look at the man pages for test at this point, you will find it a very useful command with great flexibility.
The if structure:
Next in complexity is if list then list [ elif list then list ] ... [ else list ] fi, or the if construct. What does that lot mean? Well usually if statements in any language are associated with predication and so as you would expect there is some more implied use of the UNIX test command. Lets generate an example to see the structure in a more usual form. The square brackets in the echo statement have no relevance other than to clarify the output when executed (See - Debugging). However, the square brackets in the if and elif lines are mandatory to the structure.
Example simple if syntax
if [ -f $dirname/$filename ]
then
    echo "This filename [$filename] exists"
elif [ -d $dirname ]
then
    echo "This dirname [$dirname] exists"
else
    echo "Neither [$dirname] or [$filename] exist"
fi
You can see here more examples of what test can do. The -f flag tests for existence of a plain file, while -d tests for existence of a directory. There is no limit (that I can discover) to the number of elif's you can use in one if statement. You can also stack up the tests into a list using a double pipe or double ampersand as in Example complex if syntax below. Here the use of the double pipe (||) is the syntax for a logical or whereas the double ampersand (&&) is the logical and.
Example complex if syntax
if [ -f $dir/$file ] || [ -f $dir/$newfile ]
then
    echo "Either this filename [$file] exists"
    echo "Or this filename [$newfile] exists"
elif [ -d $dir ]
then
    echo "This dirname [$dir] exists"
else
    echo "Neither [$dir] or [$file or $newfile] exist"
fi
In the sh if construct it is important to put the then word on its own line or sh will complain about an invalid test. Also important is the blank inside each end of the test. Without this the test will generate a syntax error - usually "test expected!" which is a bit meaningless.
case structure:
Next is the case word in [ pattern [ pattern ] ... ) list ;; ] esac which is probably the most complicated construct to decode from the simple syntax listed above. It is a bit like a multi-line if statement linked with logical or symbols (||). It is commonly used to process a list of parameters passed into a script as arguments when the actual parameters could be in any order or of any value. The layout is shown in 8.2.4.1 below, which is a section from a print script.
Example case syntax
size=0                    # Default Char Point Size (!)
page=660                # Default Page Point Size
while [ "$1" != "" ]            # When there are arguments...
do                    # Process the next one
case $1                # Look at $1
in
    -l)    lines=47;            # If it's a "-l", set lines
  page=470;            # Set the Landscape Page Point
  options="$options -L -l";    # Set the Landscape Options
  shift;;                # Shift one argument along
    -p)    lines=66;            # If it's a "-p", set lines
  options="$options -l";        # Set the Portrait Options
  shift;;                # Shift one argument along
    -s)    size=$2;            # If it's a "-s", set size
  shift 2;;            # Shift two arguments along
    *)    echo "Option [$1] not one of  [p, l, s]";    # Error (!)
  exit;;                # Abort Script Now
esac
if [ $size = 0 ]            # If size still un-set...
then
    size=`echo "$page / $lines" | bc`    # Set from pages over lines
else                    # or
    lines=`echo "$page / $size" | bc`    # Set lines
fi
done
options="$options$lines -s$size"    # Build complete option list
lp -P$PRINTER $options $filename    # Output print file to printer
Here we see a while loop, exiting when no more parameters are found on input line, enclosing a case statement. The case statement repeatedly tests $1 against a list of possible matches indicated by the right parentheses. The star (*) at the end is the default case and will match anything left over. When a match is found, the list of commands following the right parentheses are executed up to the double semi-colon. In each of these lists, there is a shift statement which shifts the input parameters one place left (so $2 becomes $1 etc.), allowing the next parameter to be tested on the next pass through the loop. In the case of the "-s" parameter, an extra following argument is expected, the size value, which is why the shift instruction contains the additional argument 2 (shifting the parameters 2 spaces left). This effectively allows the processing of all the passed arguments in any order and includes an exit for an invalid parameter condition via the star match. The if statement at the end checks if the size parameter has been set then uses the bc command to set either size or lines accordingly. When complete, the final options are created and passed to the lp command to print the file.
The parent and sub-shell structure:
Then there are two easy ones the ( list ) and { list; } constructs which simply execute the whole list of commands in a separate sub-shell ( ) or in the parent shell { } with a note that the blanks between the { } are mandatory.
The function structure:
Lastly in the complex command section we come to what is probably the most underused but most useful construct for serious scripters. The function definition. The syntax is deceptively simple which I guess is what leads most users to assume it's not worth learning about. How wrong they are. Just take a look at the example below to see what I mean.
Example function syntax
i_upper_case()
{
    echo $1 | tr 'abcdefghijklmnopqrstuvwxyz' \
       'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}
This is a very simple function called i_upper_case , you can probably guess what it does. The backslash at the end of the echo line is a UNIX feature that allows a command line to be continued on the next line. It tells the system to ignor the next character - in this case the newline. Note that it gets its input argument from a passed parameter ($1). So to make use of this function within a script you simply need to call it with an argument as follows:
i_upper_case "fred"
or
name="fred"
i_upper_case $name
And you will get back FRED in either case. A more appropriate usage would be something like:
small_name="$input_argument"
large_name=`i_upper_case "$small_name"`
echo "Large Name = [$large_name]"
Which allows the case to be changed and put into a new variable. The advantage of doing this at all is that you don't have to re-code the same thing over again when you want to use the feature several times within the script. Note the use here of the double quotes around the variables to the right of the equal signs - this is to preserve any blanks within the strings which would otherwise be treated as argument separators and hence the function would only process the first argument in the list. What this means is:
small_name="fred smith"
large_name=`i_upper_case "$small_name"`    # Quoted parameter
echo "Large Name = [$large_name]"
Will display FRED SMITH, whereas:
small_name="fred smith"
large_name=`i_upper_case $small_name`    # Unquoted parameter
echo "Large Name = [$large_name]"
Will display FRED only. This bug can be traced back to the function definition which only reads in the $1 parameter. Changing this to read the $@ parameter would correct the bug for this function. But beware, this type of fix would not be appropriate in all situations. Try and think generically when creating functions and make them as useful as possible in all scenarios.
There are two very basic rules to remember when dealing with functions:
   You cannot use a function until it is defined. Thus all function definitions should appear either at the top of the script or in a start-up file such as ~/.profile.
    Functions can be nested to any depth, as long as the first rule is not violated.
At the end of the complex command section there is a reminder message that all of the keywords used in these complex commands are reserved words and not therefore available as variable names. This means that you can screw up any UNIX command by using it as a variable but you cannot screw up a complex shell reserved word.
echo()
{
    /usr/bin/user/my_echo "$@"
}
Is perfectly okay as a function definition and the sh will happily use your echo function whenever an echo command is required within the script body.
while()
{
    /usr/bin/user/my_while "$@"
}
Is not okay and the function definition will fail at runtime.
Special Commands:
The following are a set of special commands which the shell provides as stand alone statements. Input and output redirection is permitted for all these commands unlike the complex commands. You cannot redirect the output from a while loop construct, only the simple or special commands used within the loop list.
   The colon ( : ) does nothing! A zero exit code is returned. Can be used to stand in for a command but I must admit not to finding a real use for this command.
   The dot ( .   filename) reads in commands from another file (See Startup Files & Environment for details). If the filename following the dot is not in the current working directory, then the shell searches along the PATH variable looking for a match. The first match that is found is the file that is used. The file is read into the shell and the commands found are executed within the current environment.
   The break ( break [ n ] ) command causes an exit from inside a for or while loop. The optional n indicates the number of levels to break out from - the default is one level. Although not stated in the syntax rules, I have used this statement in an if then else fi construct to good effect in Simple Utility Functions where it causes an exit from the function but does not cause an exit from the calling script.
   The continue ( continue [ n ] ) command resumes the next iteration of the enclosing for or while loop at the [ optional nth ] enclosing loop. Can't say I've used this one either.
   The cd ( cd [ argument ] ) command is the the change directory command for the shell. The directory is specified with argument which defaults to HOME. The environment variable CDPATH is used as a search path for directories specified by argument.
    The echo ( echo [ argument ] ) command is the shell output statement. See the man pages for echo(1) for full details.
   The eval ( eval [ argument ] ) command reads the arguments into the shell and then attempts to execute the resulting command. This allows pre-emptive parameter substitution of hidden parameters or commands.
   The exec ( exec [ argument ] ) command reads in the command specified by arguments and executes them in place of this shell without creating a new process. Input an output arguments may appear and, if no others are given, will cause the shell input and or output to be modified.
   The exit ( exit [ n ] ) command causes a shell to exit with the exit status specified by the n parameter. If the n parameter is omitted, the exit status is that of the last executed command within the shell.
   The export ( export [ variable ] ) command we have already met and is the command which makes shell variables global in scope. Without a variable, export will list currently exported variables.
    The getopts command is provided to support command syntax standards - see getopts(1) and intro(1) man pages for details.
   The hash ( hash [ -r ] [ name ] ) command remembers the location in the search path (PATH variable) of the command name. The option -r causes the shell to forget the location of name. With no options the command will list out details about current remembered commands. This has the effect of speeding up access to some commands.
   The newgrp ( newgrp [ argument ] ) command is equivalent to exec newgrp argument. See newgrp(1M) for usage and description. The newgrp command logs a user into a new group by changing a user's real and effective group ID. The user remains logged in and the current directory is unchanged. The execution of newgrp always replaces the current shell with a new shell, even if the command terminates with an error (unknown group).
    The pwd ( pwd ) command literally prints the current working directory. Usually used to set the CWD variable internally.
   The read ( read name ) command will be seen in several examples. It allows the shell to pause and request user input for the variable name, which is then accepted as the variables value.
   The readonly ( readonly [ name ] ) command sets a variable as imutable. Once named in this command they cannot be reassigned new values.
   The return ( return [ n ] ) command causes a function to exit with the return value n. If the n is omitted, the return value is the exit status of the last command executed within the function. Unlike exit this does not result in termination of the calling script.
   The shift ( shift [ n ] ) command causes the positional parameters to be moved to the left ($2 becomes $1, etc.) by the value of n, which defaults to one.
    The test command is used to evaluate conditional expressions. See the man pages for test(1) for full details and usages.
    The times command prints the accumulated user and system times for processes run from the shell.
   The trap ( trap [ argument ] [ n ] ) command allows conditional execution of the commands contained within argument dependant on the shell receiving numeric or symbolic signal(s) n.
    The type ( type [ name ] ) command indicates how name would be interpreted if used as a command name.
    The ulimit and umask commands exist in their own right as UNIX commands. See man pages.
   The unset ( unset [ name ] ) command allows names to be unset. This removes the values from the variable or function. The names PATH, PS1, PS2, MAILCHECK, and IFS cannot be unset.
   The wait ( wait [ n ] ) command waits for the background process n to terminate and report its termination status; where n is the process id. With no arguments, all current background processes are waited for.
Most of these special commands get used somewhere in this book and more detailed explanations will follow at that time.
Comment structure:
The next thing on my systems man page is a reference to the hash (#) comment character. It states that any word beginning with # causes that word and all the following characters up to a newline to be ignored. There are no notes about the first line exceptions that I gave in The Basic Shells when we were dealing with shell indicators (The #! sequence)
Home Next Preface Introduction Basic Shells Shell Syntax Built-In Commands Command Substitution Startup & Environment Pipes, Lists & Redirection Input & Output Using Files Design Considerations Functions Debugging Putting It All Together Appendix Code Examples Page 205 This page was brought to you by rhreepe@injunea.demon.co.uk

GUAVA                                                                      |

+ splitters and joiners (that work right)
final static Splitter onWhiteSpace = Splitter.on(CharMatcher.WHITESPACE);
+ type inferencing factory methods
Map<String, String> dictionary = Maps.newHashMap();
Map<String, Integer> table = ImmutableMap.of("abc", 1, "def", 2);
+ orderings that make sense and do cool things
Ordering.natural().immutableSortedCopy(iterable)
+ reading a resource all in a gulp (note the predefined charset that never requires a throw):
Resources.readLines(Resources.getResource("foo.csv"), Charsets.UTF-8)

MYSQL

/etc/init/mysql.conf: exec /usr/sbin/mysqld --skip-grant-tables
Access denied for user ‘root’@'localhost’ (using password: NO)
Who is fault? No matter. Probably, because of my root user doesn’t have password.
What to do? Finally i did next:
1. Stopped mysql server: i simply found mysqld process in windows task manager and stopped it.
2. Created init.txt file with next content:
UPDATE mysql.user SET Password=PASSWORD(’mypassword’) WHERE User=’root’;
FLUSH PRIVILEGES;
grant all privileges on *.* to root@localhost identified by ‘mypassword’ with grant option;
grant all privileges on mydatabase.* to root@localhost identified by ‘mypassword’ with grant option;
3. Run mysql server from command line as:
mysqld –init-file=F:\mysql\bin\init.txt
show processlist

IRC 

http://webchat.freenode.net/

(/connect freenode)
/server irc.freenode.net
/join #james

IRC Information.....

IRC Class - Basic IRC Commands

    IRC - Internet Relay Chat
    Helpful Tips
    Basic IRC Commands 

    

    mIRC Setup Tutorial
    PIRCH Setup Tutorial 

Just as you are able to surf the net with a few tricks to help make things easier, IRC is very similar. Below you will find some of the more common IRC commands that we use often. For a far more complete list, please visit our mIRC Commands page.

/join
    Type /join #channelname -- to join a channel of your choice 
    Example: /join #bossmom 
    What it looks like: 
      
    [18:44] *** Now talking in #beginner 
    --Op-- bossmom has joined the channel 
    [18:44] *** Topic is 'Beginner's Help/Chat Channel....All Are Welcome Here!! ®© [ENGLISH]' 
    [18:44] *** Set by X on Sun Jul 23 16:10:34

/me
    The /me is an action message. 
    Type /me 'does anything' 
    Example: /me waves hello 
    What it looks like: 
    * bossmom waves hello

/msg
    Type /msg nickname (message) to start a private chat. 
    Example: /msg puddytat Hey tat, how are you? 
    What it looks like: 
    -> *puddytat* Hey tat, how are you?

/nick
    /nick changes your nickname 
    Example: type /nick newnickname (limit 9 characters) 
    What it looks like: I typed /nick luv2quilt 
    *** bossmom is now known as luv2quilt

/notice
    A notice is used to send a short message to another person without opening up a private window. 
    Type /notice nickname (message) 
    Example: /notice badnick Please change your nickname for this family channel. 
    What it looks like: 
    -> -badnick- Please change your nickname for this family channel. 
/part
    Type /part -- to leave one channel 
    Type /partall -- to leave all the channels you are in

/ping
    Type /ping nickname. What this command does is give you the ping time, or lag time, between you and the person you pinged. Lag can be explained as the amount of time it takes for you to type your message and for others to read your messages. Unfortunately, lag is always a part of IRC, although most times it's not a problem, just a nuisance. 
    Example: /ping luv2quilt 
    What it looks like: 
    [19:04] -> [luv2quilt] PING 
    [19:04] [luv2quilt PING reply]: 0secs

/query
    Similar to the /msg, except it forces a window to pop open. 
    Type /query nickname (message) 
    Example: /query Sofaspud^ Sooo....what's new? 
    What it looks like: 
    <luv2quilt> soooo....what's new?

/quit
    Type /quit to leave IRC altogether. This disconnects mirc from the server. 
    Example: /quit Going out for dinner...nite all 
    What it looks like: 
    *** Quits: saca (Leaving)

/ignore
    Unfortunately, there will be times when you don't want to talk to someone, or else someone may be harassing you. 
    By typing /ignore nickname 3, you will not receive anymore messages from that person. 
    Example: /ignore luv2quilt 3 
    To Unignore them, type /ignore -r luv2quilt 3 
    What it looks like: 
    *** Added *!*bossmom@*.dialup.netins.net to ignore list 
    *** Removed *!*bossmom@*.dialup.netins.net from ignore list

/whois
    Type /whois nickname to see a bit more information about another user. You'll see what server another person is using, or what their ISP is. Pretty helpful when you don't recognize a nickname that wants to chat. You may recognize the IP, (Internet Protocol) and then feel more comfortable carrying on a conversation. You'll also be able to see what other channels a person is in, which might be a good indicator if you really want to talk with them or not. 
    Example: /whois bossmom 
    What it looks like: 
    luv2quilt is bossmom@elwo-01-094.dialup.netins.net * Enjoy the Journey........ 
    luv2quilt on @#bossmom 
    luv2quilt using Seattle.WA.US.Undernet.org the time for school is during a recession. 
    luv2quilt has been idle 18secs, signed on Sun Jul 23 18:47:26 
    luv2quilt End of /WHOIS list.

/chat
    This opens up a DCC/CHAT window to another user. What's nice about these is that you can continue to chat even if you get disconnected from your server. 
    Word of Caution: Do NOT accept dcc/chats nor dcc/gets from anyone that you don't know. 
    Type /chat nickname. 
    Example: /chat oddjob^ 
    What it looks like: 
    Chat with oddjob^ 
    Waiting for acknowledgement...

/help
    There's one more very helpful command, and probably the one you'll use a lot when first starting out. In fact, I still use it quite a lot, and that's the built-in help menu of mIRC. 
    Type /help, you'll see the the mIRC Help Menu open up. You can do a search from there, or you can type /help topic. Either way, a TON of information at your fingertips. 
    Example: /help Basic IRC Commands 

You are doing great so far. If you haven't yet read some Basic IRC Tips, I'd encourage you to take a peek, otherwise we are ready to setup your IRC client. Please choose one of the following clients you would like to learn:

    mIRC Setup Tutorial
    PIRCH Setup Tutorial 

Let's move on with the next step -- getting online with IRC :) 

MAC OSX                                                                     |

+ iTerm2
---
For Internet Recovery mode on boot by pressing CMD+OPTION(ALT)+R. you need to press before hearing the booting sound.
---
MAC-BE-KEYBOARD on UBUNTU
---
{ = ALT + (
[ = SHIFT + ALT + (
= SHIFT + ALT + L
~ = (FN +) ALT + N(-N)
\ = ALT + SFT + /
DELETE = FN BACKSPACE
ALT TAB Swich between applications
ALT @ Switch between windows

# Network

sudo scutil --set HostName eric

# Spotlight

sudo mdutil -a -i off
sudo su
chmod 0000 /Library/Spotlight
chmod 0000 /System/Library/Spotlight
chmod 0000 /System/Library/CoreServices/Search.bundle
chmod 0000 /System/Library/PreferencePanes/Spotlight.prefPane
chmod 0000 /System/Library/Services/Spotlight.service
chmod 0000 /System/Library/Contextual Menu Items/SpotlightCM.plugin
chmod 0000 /System/Library/StartupItems/Metadata
chmod 0000 /usr/bin/mdimport
chmod 0000 /usr/bin/mdcheckschema
chmod 0000 /usr/bin/mdfind
chmod 0000 /usr/bin/mdls
chmod 0000 /usr/bin/mdutil
chmod 0000 /usr/bin/md
After a reboot, open a new Terminal and do sudo su to make a root shell, then:
rm -r /.Spotlight-V100
rm -r /private/var/tmp/mds
exit
sudo mdutil -E /
--------------
/System/Library/Frameworks/ScreenSaver.framework/Versions/A/Resources/ScreenSaverEngine.app
--------------
SCREEN RECORD
--------------
...
-----------------
Screen Capture #screenshot #printscreen
-----------------
Switch to the screen that you wan to to do screen capture
Hold down Apple key ⌘ + Shift + 3 and release all
then use your mouse to click on the screen
Done. You will see a picture file in at your desktop. That’s the screen capture picture.
You can also do a screen capture for a portion of your screen.
Switch to the screen that you wan to to do screen capture
Hold down Apple key ⌘ + Shift + 4 and release all key

ANDROID                                                                     |

mkdir android ; cd android ; repo init -u git://android.git.kernel.org/platform/manifest.git ; repo sync ; make"

CHROMIUM                                                                    |

javascript:(function(){ window.location.href='url1'; window.open('url2');})();

GRAPHITE                                                                    |

echo "gaugor:333|g" | nc -u graphite.qutics.com 8125
https://github.com/etsy/statsd

sudo apt-get install apache2

sudo mkdir /vol
sudo mount /dev/xvdf /vol
sudo cp /vol/000-default /etc/apache2/sites-enabled/
cat /vol/hosts
sudo vi /etc/hosts
---
10.47.144.106 echarles.net www.echarles.net blog.echarles.net edmond.echarles.net eleonore.echarles.net
10.47.144.106 ibayart.com www.ibayart.com blog.ibayart.com
10.47.144.106 u-mangate.com www.u-mangate.com blog.u-mangate.com
10.47.144.106 datalayer.io www.datalayer.io blog.datalayer.io
10.47.144.106 datashield.io www.datashield.io blog.datashield.io
10.47.144.106 datalayer.io www.datalayer.io blog.datalayer.io
10.47.144.106 datalayer.be www.datalayer.be blog.datalayer.be
10.47.144.106 place.io www.place.io blog.place.io
10.47.144.106 tipi.io www.tipi.io blog.tipi.io
10.47.144.106 placestory.com www.placestory.com blog.placestory.com
10.47.144.106 socialitude.com www.socialitude.com blog.socialitude.com

10.47.144.106 www.cib-bic.be www.cib-sa.be
10.47.144.106 www.credit-regional-wallon.be
---
vi /root/.bashrc
source /vol/.bash_profile
---
cd /vol
ls
lost+found
df
Filesystem           1K-blocks      Used Available Use% Mounted on
/dev/xvda1             8256952   1298868   6874200  16% /
tmpfs                  3826296         0   3826296   0% /dev/shm
/dev/xvdf             25803068    176196  24316152   1% /vol

If you wish this device to mount automatically when you reboot the server make sure you add this to your /etc/fstab file.
/dev/xvdf  /vol/    ext3    noatime,nodiratime        0   0

# more /etc/fstab
LABEL=cloudimg-rootfs   /    ext4   defaults    0 0
/dev/xvdf /vol auto noatime 0 0

cd /
rm -fr /opt # if needed...
sudo ln -s /vol opt
sudo ln -s /opt/env a
cd /var
sudo ln -s /opt/var-data data
cd 
ln -s /opt/env/dot-aos .aos
ln -s /opt/env/bash_profile .bash_profile
placestory-store-reset-restart.sh
jps

ssh-keygen -t rsa -P ""
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
ssh localhost

S3   

http://www.slideshare.net/echarles/savedfiles?s_title=storm-distributed-and-faulttolerant-realtime-computation&user_login=nathanmarz
http://s3.amazonaws.com/ppt-download/storm-strange-loop-110920101342-phpapp01.pdf?response-content-disposition=attachment&Signature=1jx8dEs5XsAUwVzFuxAbcR8Uqq8%3D&Expires=1354693255&AWSAccessKeyId=AKIAIW74DRRRQSO4NIKA
                                                    
 _____         _ _ 
 _  |___ ___|_|_|
    |_ -|  _| | |
|__|__|___|___|_|_|
                   
 #ascii                   
                                                    
Character   Hex Value   Decimal Value   Symbol
NewLine     -   -   <NL>
WhiteSPace  -   -   <WSP>
KanjiSPace (WideSpace)  -   -   <KSP>
NULL    00  0   <NULL>
StartOfHeading  01  1   <SOH>
StartofTeXt     02  2   <STX>
EndofTeXt   03  3   <ETX>
EndOfTrans.     04  4   <EOT>
ENQuiry     05  5   <ENQ>
ACKnowlege  06  6   <ACK>
BELL    07  7   <BELL>
BackSpace   08  8   <BS>
HorizTab    09  9   <HT>
LineFeed    0A  10  <LF>
VerticalTab     0B  11  <VT>
FormFeed    0C  12  <FF>
CarriageReturn  0D  13  <CR>
ShiftOut    0E  14  <SO>
ShiftIn     0F  15  <SI>
DataLinkEscape  10  16  <DLE>
DeviceControl1  11  17  <DC1>
DeviceControl2  12  18  <DC2>
DeviceControl3  13  19  <DC3>
DeviceControl4  14  20  <DC4>
NegativeAcK     15  21  <NAK>
SYNchron.Idle   16  22  <SYNI>
EndTransBlock   17  23  <ETB>
CANcel  18  24  <CAN>
EndofMedium     19  25  <EM>
SUBstitute  1A  26  <SUB>
ESCape  1B  27  <ESC>
FileSeparator   1C  28  <FS>
GroupSeparator  1D  29  <GS>
RecordSep.  1E  30  <RS>
UnitSeparator   1F  31  <US>
SPace   20  32  <SP>
!   21  33  -
"   22  34  -
#   23  35  -
$   24  36  -
%   25  37  -
&   26  38  -
'   27  39  -
(   28  40  -
)   29  41  -
*   2A  42  -
+   2B  43  -
,   2C  44  -
-   2D  45  -
.   2E  46  -
/   2F  47  -
0   30  48  -
1   31  49  -
2   32  50  -
3   33  51  -
4   34  52  -
5   35  53  -
6   36  54  -
7   37  55  -
8   38  56  -
9   39  57  -
:   3A  58  -
;   3B  59  -
<   3C  60  -
=   3D  61  -
>   3E  62  -
?   3F  63  -
@   40  64  -
A   41  65  -
B   42  66  -
C   43  67  -
D   44  68  -
E   45  69  -
F   46  70  -
G   47  71  -
H   48  72  -
I   49  73  -
J   4A  74  -
K   4B  75  -
L   4C  76  -
M   4D  77  -
N   4E  78  -
O   4F  79  -
P   50  80  -
Q   51  81  -
R   52  82  -
S   53  83  -
T   54  84  -
U   55  85  -
V   56  86  -
W   57  87  -
X   58  88  -
Y   59  89  -
Z   5A  90  -
[   5B  91  -
\   5C  92  -
]   5D  93  -
^   5E  94  -
_   5F  95  -
`   60  96  -
a   61  97  -
b   62  98  -
c   63  99  -
d   64  100     -
e   65  101     -
f   66  102     -
g   67  103     -
h   68  104     -
i   69  105     -
J   6A  106     -
k   6B  107     -
l   6C  108     -
m   6D  109     -
n   6E  110     -
o   6F  111     -
p   70  112     -
q   71  113     -
r   72  114     -
s   73  115     -
t   74  116     -
u   75  117     -
v   76  118     -
w   77  119     -
x   78  120     -
y   79  121     -
z   7A  122     -
{   7B  123     -
  7C  124     -
}   7D  125     -
~   7E  126     -
DELete  7F  127     -



container
+ aries
+ peaberry
+ pax
+ felix
+ tomcat
+ jetty
+ openejb
+ glassfish
+ geronimo
+ karaf

+ jmeter
++ [https://github.com/wg/wrk]
++ [https://github.com/excilys/gatling http://docs.locust.io/en/latest]

brick
+ apache-streams
+ apache-abdera
+ apache-directory
+ apache-james
+ apache-activemq
+ apache-kafka
+ apache-hedwig
+ apache-shinding
+ apache-wookie
+ apache-rave
+ apache-wave
+ apache-camel
+ apache-droids [github-java-api]
+ tape
+ xmpp
+ pubsubhubbub
+ xulrunner
+ crowbar
+ nutch

inject
+ google-guice
+ square-dagger
+ apache-onami

ui
+ eclipse-e4
+ eclipse-pde
+ eclipse-jface
+ eclipse-swt
+ swing

web
+ web3-semantic
+ web2-social
+ web1-site
+ entreprise2
++ cms
++ erp
++ crm
++ snm
++ dwh
+ underscore.js
+ mustache.js
+ backbone.js
+ jquery
+ bootstrap
+ gin
+ gquery
+ gwt
+ cxf
+ play
+ springmvc
+ sitebricks

bridge
+ xpcom
+ xul
+ dcom
+ uno
+ ffmpeg

remote
+ javaspaces
+ apache-river [jini]
+ newton
+ cajo
+ rmi

io
+ stack
++ java-io
++ java-nio
++ nio2
++ xnio
++ netty3
++ netty
++ mina
++ finagle
++ vertx
++ akka
+++ spray
+ server-http
++ littleproxy
++ webbit
++ undertown
++ xitrum
++ socko
+ mail
++ niosmtp
+ xmpp
++ netty-xmpp
++ vysper
+ ssh
++ sshd

mme
+ jmagick
+ ffpmepg/avconvert

parser a.k.a ast
+ mvel
+ jcc
+ antlr
+ mime4j

coordination
+ zookeeper

processing
+ mapreduce
+ storm
+ spark
+ samza
+ sqoop
+ cascading
++ scalding
++ cascalog
++ lingual
+ oozie
+ crunch
+ plume
+ kite-sdk [https://github.com/kite-sdk]
+ ambrose

metadata
+ hcatalog

data
+ hdfs
+ hadoop-yarn
+ hadoop-mapreduce
+ tez
+ hbase
+ cassandra
+ mesos
+ senseidb
+ solrcloud
+ elasticsearch
+ twill
++ [http://wiki.apache.org/incubator/TwillProposal]
++ [http://www.continuuity.com]
++ [https://github.com/continuuity/weave]
+ hbase-phoenix
+ jdbm
+ jdbm3
+ templeton
+ orm
+ datanucleus
+ jdo
+ hbql
+ pig
+ hive
+ blurr
+ drill
+ lingual
+ infinispan
+ blueprints
+ titan
+ giraph
+ druid
+ impala
+ hazelcast
+ jpa
+ mysql
+ avro
+ jackson
+ lucene
+ h2
+ adbcj
+ derby

security
+ apache-oltu
+ apache-syncope
+ apache-shiro
+ a-directory
+ ldap
+ kerberos
+ o-xauth
+ openid

mgt
+ ambari
+ servo
+ hyperic
+ metrics
+ jmx

msc
+ bval
+ lombok
+ netflix [http://netflix.github.com]
+ 99soft [http://www.99soft.org]

client-desktop
+ browser (firefox-ie-safari-opera)
+ mail (thunderbird-outlook)
+ addressbook (thunderbird-outlook)
+ calendar (lightning-outlook)
+ chat - windows-share - webdav

client-mobile
+ browser
+ mail
+ addressbook
+ calendar
+ chat
+ share-windows

lng
+ java(me/se/ee)-rhino
+ scala
+ clojure
+ ajax(js/css)
+ c/c++/obj-c

os
+ android
+ ios
+ blackberry
+ macos
+ linux
+ windows

devops [sp]
+ airbnb-cronos
+ apache-helix
+ apache-ace
+ puppet
+ apache-whirr
+ pallet
+ chef
+ cfengine3
+ ansibleworks
+ dell-crowbar
+ stack-iq

devops-software-management
+ git
++ gitblit
++ gitlab
++ allura

devops-software-repository
+ archiva

devops-software-integration [ci]
+ jenkins

devops-software-monitoring [sm]
+ graphite [statsd]
+ nagios
+ twitter-ostrich
+ ganglia
+ netflix-hystrix [turbine]

devops-software-supervision
+ init.d
+ daemontools
+ runit

devops-virtual-cloud
+ amazon
+ google-cloud

devops-virtual-cloud-private
+ cloudstack
+ openstack
+ jclouds


curl -XGET 'http://localhost:9200/aos-microfacet-post/_mapping?pretty'
-
+ blogs fix launcher
+ pages fix launcher
+ blogs via rss
+ tags pages
-
curl -XGET 'http://localhost:9200/aos-microfacet-profile/_mapping?pretty'
curl -XGET 'http://localhost:9200/aos-microfacet-location/_mapping?pretty'

# Android

emulator -avd aos
adb logcat
build-deploy.sh

ANDROID SDK                                                                 |

android

android avd

emulator -avd aos
adb logcat
adb -s emulator-5554 logcat
adb -s 47901edd098330f4 logcat

android list targets
id: 25 or "android-18"
    Name: Android 4.3
    Type: Platform
    API level: 18
    Revision: 1
    Skins: WQVGA400, WQVGA432, WVGA800 (default), WXGA800-7in, WXGA800, HVGA, WVGA854, WSVGA, WXGA720, QVGA
    ABIs : armeabi-v7a

android create avd -n <name> -t <targetID> [-<option> <value>] ...
android create avd -n aos -t 25 --abi armeabi-v7a
    Android 4.3 is a basic Android 
    Do you wish to create a custom hardware profile [no]
    Created AVD 'aos2' based on Android 4.3, ARM (armeabi-v7a) processor,
    with the following hardware config:
    hw.lcd.density=240
    vm.heapSize=48
    hw.ramSize=512
android delete avd -n aos

launch 'android avd', select and edit the 'aos' virtual device, and add the hardware properties
+ Set "Configure Camera facing front": "webcam0" (hw.camera.front=webcam0)
+ Set "Configure Camera facing back": "webcam0" (hw.camera.back=webcam0)
+ Set "Keyboard Support": "yes"
+ Set "SD Card Size": "64"

android list avd
    Name: aos
    Path: /home/eric/.android/avd/aos.avd
    Target: Android 4.3 (API level 18)
    ABI: armeabi-v7a
    Skin: WVGA800
    Sdcard: 64M

emulator -avd aos

adb logcat

screen capture
+ ddms

adb devices -l
---
List of devices attached 
47901edd098330f4       device usb:3-2
emulator-5554          device product:sdk model:sdk device:generic

adb [-d|-e|-s <serialNumber>] <command>

#ant debug

adb uninstall [-k] aos.mobile...
('-k' means keep the data and cache directories)
adb uninstall aos.mobile...
adb install target/aos-...-0.0.1-SNAPSHOT.apk
adb install -r target/aos-...-0.0.1-SNAPSHOT.apk
adb shell am start -n aos..../.MyActivity

running a maven from eclipse, setup java build path
---
1.
- set the 'output folder' to its default (remove defined folder) (1st tab) 
  OR 
- allow output folders for source folders
---
2.
'Auto share git projects' has encountered a problem Unable to ignore resources Attempted to beginRule: F/automation-utils/modile1, does not match outer scope rule: MultiRule[P/module1]
Disable
- Window > Preference > Team > Git > Projects > Auto share projects located in a git repository
    AND
- Window > Preferences > Team > Git > Projects > Automatically ignore derived resources by adding them to .gitignore
---
3.
- Export 'maven dependencies' (last tab)

change screen orientation (portrait<->landscape)
+ CTRL+FN+11
+ CTRL+FN+12

adb shell setprop debug.checkjni 1

Installation error: INSTALL_FAILED_VERSION_DOWNGRADE
Can't install update of com.example.android.apis update version 0 is older than installed version 18
+ It means you're trying to install an app with the same package name as an app that's already installed on the emulator,
+ but the one you're trying to install has a lower version code (integer value for your version number).
+ adb uninstall com.example.android.apis

Network Address    Description
10.0.2.1           Router/gateway address
10.0.2.2           Special alias to your host loopback interface (i.e., 127.0.0.1 on your development machine)
10.0.2.3           First DNS server
10.0.2.4 
/ 10.0.2.5 
/ 10.0.2.6         Optional second, third and fourth DNS server (if any)
10.0.2.15          The emulated device's own network/ethernet interface
127.0.0.1          The emulated device's own loopback interface 

sign in release mode
$ keytool -genkey -v -keystore app.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app.apk alias_name
$ jarsigner -verify app.apk
$ jarsigner -verify -verbose -certs app.apk
$ zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk

# Cordova

cordova create hello com.example.hello HelloWorld

cd hello
cordova platform add ios
cordova platform add android
cordova platform add blackberry10
cordova platforms ls
cordova platform rm blackberry10
cordova platform rm android

cordova build

cordova prepare ios
cordova compile ios

cordova emulate android

cordova run android

Apache Cordova Hello World Application
+ Simple Hello World application and test suite.

Run Application
+ /www/index.html

Run Tests
+ /www/spec.html



The Java files in this directory are compiled into the JAR file

    java-firefox-extension/tools/firefoxClassLoader.jar

If you need to modify them, you can simply recompile and repackage. (If you are
using Eclipse, simply add java-firefox-extension/tools/class-loader as a source 
folder in


T4F Essentials JS NodeJs
========================

NodeJs usage examples.

T4F CLOJURE                                                                 |

If not done by m2eclipse, add natures and buildcommands to eclipse .project file
<natures>
 <nature>ccw.leiningen.nature</nature>
 <nature>ccw.nature</nature>
</natures>
<buildSpec>
  <buildCommand>
    <name>ccw.builder</name>
    <arguments>
    </arguments>
  </buildCommand>
  <buildCommand>
    <name>ccw.leiningen.builder</name>
    <arguments>
    </arguments>
  </buildCommand>
<buildSpec>

clj

lein clean
lein compile
lein install # !!! can override pom.xml, so rewrite with pom.xml_bu
lein run

(load "io.datalayer/clj/hello")
(ns io.datalayer.clj.hello)
(hello "Clojure")

Create and run a simple Clojure project ("Hello Betty")
Open the Java perspective
  Window > Open Perspective > Java (a perspective is a predefined layout of views, suitable for a particular type of development)
Create a Clojure project
  With Leiningen Project Wizard: File > New > Leiningen Project, name it myproject
  The project is created using the "default" Leiningen Template, which creates a Clojure project with a predefined "myproject.core" namespace in src/myproject/core.clj
Add a function definition to myproject.core:
  Open src/main/clojure/t4fclojure.clj, add the following at the end: (defn hello [who] (str "Hello " who " !")), save the file
Run the project:
  With file src/main/clojure/t4fclojure.clj open, Hit Ctrl+Alt+S (Cmd+Alt+S on MacOS). 
  This sends the whole file's code to the REPL (and also takes care of starting a REPL for the project if none is currently started)
Switch to the REPL in the namespace of your file:
  Hit Ctrl+Alt+N (Cmd+Alt+N on MacOS). Alternatively, just click on the bottom of the REPL inside the "text input area"
Call your function (Hit Enter to send the expression if the cursor is at the end, or hit Ctrl+Enter / Cmd+Enter if the cursor is not at the end of the text):
> (hello "Clojure") [Ctrl+Enter]
> "Hello Clojure !"


 ____          _             _     
   \ ___ ___| |_ ___ ___  |_|___ 
 |  | . |  _| '_| -_|  _|_| | . |
|____/|___|___|_,_|___|_| |_|_|___|
                                   
 #docker.io

COMMANDS                                                                    |

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

INSTALL                                                                     |

apt-get install docker.io
docker -d &

USAGE

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
docker run -it aosio/ubuntu:utopic /bin/bash
docker run -it aosio/sinatra /bin/bash
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

IMAGES                                                                      |

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
------------
ambari-image
+ docker run -d -p 8080 -h amb0.mycorp.kom --name ambari-singlenode sequenceiq/ambari --tag ambari-server=true

API  

java-api
+ https://github.com/jboss-fuse/fuse-docker

ORCHESTRATION                                                               |

+ flynn https://flynn.io
+ deis http://deis.io
+ coreos http://coreos.com
+ Mesos http://mesosphere.io/2013/09/26/docker-on-mesos
+ maestro https://github.com/toscanini/maestro
+ Docker Openstack https://wiki.openstack.org/wiki/Docker
+ Paas zone within OpenStack http://www.sebastien-han.fr/blog/2013/10/31/build-a-paas-zone-within-your-openstack-cloud
+ shipyard http://shipyard-project.com
+ http://www.infoq.com/news/2013/12/futureops
+ http://www.slideshare.net/profyclub_ru/8-mitchell-hashimoto-hashicorp
+ Decentralizing Docker: How to use serf with Docker http://blog.ctl-c.io/?p=43
+ http://mesosphere.io/learn/run-docker-on-mesosphere
+ https://github.com/mesosphere/deimos
+ https://github.com/mesosphere/marathon
+ http://www.tsuru.io
+ https://github.com/tsuru/docker-cluster
+ http://docs.tsuru.io/en/latest/provisioners/docker/schedulers.html
+ http://blog.tsuru.io/2014/04/04/running-tsuru-in-production-scaling-and-segregating-docker-containers
+ maestro-ng https://github.com/signalfuse/maestro-ng
+ decking http://decking.io
+ kubernetes https://github.com/GoogleCloudPlatform/kubernetes
+ projectatomic http://www.projectatomic.io
+ geard http://openshift.github.io/geard


# Serf on Docker
This is a [docker](docker.io) image and a couple of helper bash function, to work
with [serf](serfdom.io).

This document describe the process:
- create the docker image
- start a cluster of connected serf agent running in docker containers
- stop/start nodes to check how membership gossip works

## Create the image
```
git clone git@github.com:sequenceiq/docker-serf.git
cd docker-serf
git checkout serf-only
docker build -t sequenceiq/serf .
```

## start a demo cluster

run 3 docker container from the image you just built.
all of them is running in the background (-d docker parameter)

- **serf0** the first one doesn't joins to a cluster as he is the first
- **serf<1..n>** nodes connecting to the cluster

serf-start-cluster function defaults to starting 3 nodes. if you want more
just add a parameter `serf-start-cluster 5`

```
# load helper bash functions serf-xxx
. serf-functions

# start a cluster with 3 nodes
serf-start-cluster

# check the running nodes
docker ps
```

## start a test node and attach

it starts a new container name **serf99**, but not in the brackound, like the previous ones.
you will be attached to the container, which:

- joins the cluster
- starts a **/bin/bash** ready to use

```
serf-test-instance

# once attached to the test instance prompt changes to [bash-4.1#]
serf members
```
you will see now all memebers including the test instance itself **serf99**
```
serf99.mycorp.kom  172.17.0.5:7946  alive  
serf1.mycorp.kom   172.17.0.3:7946  alive  
serf0.mycorp.kom   172.17.0.2:7946  alive  
serf2.mycorp.kom   172.17.0.4:7946  alive
```

## Start/stop a node

Stop one of the nodes:
```
docker stop -t 0 serf1
```

now if you run again the `serf members` in **serf99** you will notice serf1 node marked as **failed**.
note: it might take a couple of seconds, until the cluster gossips around the failure of node99.

```
serf99.mycorp.kom  172.17.0.5:7946  alive
serf1.mycorp.kom   172.17.0.3:7946  failed  
serf0.mycorp.kom   172.17.0.2:7946  alive
serf2.mycorp.kom   172.17.0.4:7946  alive
```

if you resart the node **serf1**:
```
docker start serf1
```

It will apear again as **live**. Check it on **serf99**:
```
serf members

serf99.mycorp.kom  172.17.0.5:7946  alive  
serf1.mycorp.kom   172.17.0.3:7946  alive  
serf0.mycorp.kom   172.17.0.2:7946  alive  
serf2.mycorp.kom   172.17.0.4:7946  alive
```
docker build -t aosio/h2o .
docker run -d -p 54321:54321 aosio/h2o 

puppet
chef
ansible


  _______    ____      _       _                 
 _______    |    \ ___| |_ ___| |___ _ _ ___ ___ 
  ________  |  |  | .'|  _| .'| | .'| | | -_|  _|
 ________   |____/|__,|_| |__,|_|__,|_  |___|_|  
                                    |___|        

 #datalayer

BASH DOCUMENTATION                                                          |

+ http://tldp.org/
+ http://www.tldp.org/guides.html
+ http://www.tldp.org/LDP/abs/html/index.html
+ http://www.tldp.org/LDP/Bash-Beginners-Guide/html/index.html

useradd user1
passwd user1

ALT^arrow_left ALT^arrow_right: go to the beginning or the end of the line
source file.properties
#/!bin/bash
username=...
mysql -u $username
CTRL^R: go back in history
CTRL^...: go forward in history

screen -list // list all the screens
screen -S aq // Create a new screen
screen -r aq // Join an existing screen
screen -D -r '1234.somescreensession'

dmesg

1. Download Ubuntu Desktop
2. Open the Terminal (in /Applications/Utilities/ or query Terminal in Spotlight).
3. Convert the .iso file to .img using the convert option of hdiutil (e.g.,hdiutil convert -format UDRW -o ~/path/to/target.img ~/path/to/ubuntu.iso)
Note: OS X tends to put the .dmg ending on the output file automatically.
4. Run diskutil list to get the current list of devices.
5. Insert your flash media.
6. Run diskutil list again and determine the device node assigned to your flash media (e.g. /dev/disk2).
7. Run diskutil unmountDisk /dev/diskN (replace N with the disk number from the last command; in the previous example, N would be 2).
8. Execute sudo dd if=/path/to/downloaded.img of=/dev/rdiskN bs=1m (replace /path/to/downloaded.img with the path where the image file is located; for example, ./ubuntu.imgor ./ubuntu.dmg).
    Using /dev/rdisk instead of /dev/disk may be faster
    If you see the error dd: Invalid number '1m', you are using GNU dd. Use the same command but replace bs=1m with bs=1M
    If you see the error dd: /dev/diskN: Resource busy, make sure the disk is not in use. Start the 'Disk Utility.app' and unmount (don't eject) the drive
9. Run diskutil eject /dev/diskN and remove your flash media when the command completes.
10. Restart your Mac and press alt/option key while the Mac is restarting to choose the USB stick.

SHELL

rename 's/ACDC/AC-DC/' *.xxx

SSH  

Host *
  ServerAliveInterval 120

GIT  

git config --global user.name "Eric Charles"
git config --global user.email eric@datalayer.io
---
mkdir openaos
cd openaos
git init
touch README
git add README
git commit -m 'first commit'
git remote add origin git@github.com:echarles/openaos.git
git push origin master
---
Careful: git reset --hard WILL DELETE YOUR WORKING DIRECTORY CHANGES
Assuming you are sitting on that commit, then this command will wack it...
git reset --hard HEAD~1
The HEAD~1 means the commit before head.
Or, you could look at the output of git log, find the commit id of the commit you want to back up to, and then do this:
git reset --hard <sha1-commit-id>
---
git clone git://...
git clone --depth 1 git://...
---
git fetch remote branch: You need to create a local branch that tracks a remote branch.
The following command will create a local branch named daves_branch, tracking the remote branch origin/daves_branch. When you push your changes the remote branch will be updated.
git checkout --track origin/daves_branch
OR us fetch followed by checkout ...
git fetch <remote> <rbranch>:<lbranch> 
git checkout <lbranch>
... where <rbranch> is the remote branch or source ref and <lbranch> is the as yet non-existent local branch or destination ref you want to track and which you probably want to name the same as the remote branch or source ref. This is explained under options in the explanation of <refspec>.
---
Fetching a remote
When working with other people's repositories, there are four basic Git commands you will need:
  git clone
  git fetch
  git merge
  git pull
These commands all act on a repository's remote URL.
Clone
To grab a complete copy of another user's repository, you will use git clone, like this:
git clone https://github.com/user/repo.git
# Clones a repository to your computer
When you run git clone, the following actions occur:
  A new folder called repo is made
  It is initialized as a Git repository
  All of the repository's files are downloaded there
  git clone checks out the default branch (usually called master)
  git clone creates a remote named origin, pointing to the URL you cloned from
You can choose from several different URLs when cloning a repository. While logged in to GitHub, these URLs are available in the sidebar:
Remote url list
Fetch
Fetching from a repository grabs all the new branches and tags without copying those changes into your repository. You'd use git fetch to look for updates made by other people.
If you already have a local repository with a remote URL set up for the desired project, you can grab all the new information by using git fetch <em>remotename</em> in the terminal:
git fetch remotename
# Fetches updates made to an online repository
Otherwise, you can always add a new remote.
Merge
Merging combines your local changes with changes made by others.
Typically, you'd merge a branch on your online repository with your local branch:
git merge remotename/branchname
# Merges updates made online with your local work
Pull
git pull is a convenient shortcut for completing both git fetch and git mergein the same command:
git pull remotename/branchname
# Grabs online updates and merges them with your local work
Because pull performs a merge on the retrieved changes, you should ensure that your local work is committed before running the pull command. If you run into a merge conflict you cannot resolve, or if you decide to quit the merge, you can use git merge --abort to take the branch back to where it was in before you pulled.
---
git pull upstream <branch>
---
git checkout -b <branch-name>
git checkout <branch-name> = git branch <branch-name>; git checkout <branch-name>; git pull origin <branch-name>
git checkout -b <branch-name> origin/<branch-name>
git checkout master
git merge <branch-name>
git branch -a
git branch -m old_branch new_branch
git branch -D <branch-name>
git push origin :branch #delete remote branch in origin
git push origin --delete <branch-name>
---
git log -- [filename]
gitk [filename]
---
git fetch --tag
git log -p filename
git checkout -b tag_name tag_name
---
Before you can start working locally on a remote branch, you need to fetch it as called out in answers below.
To fetch a branch, you simply need to:
git fetch origin
This will fetch all of the remote branches for you. You can see the branches available for checkout with:
git branch -v -a
With the remote branches in hand, you now need to check out the branch you are interested in, giving you a local working copy:
git checkout -b test origin/test
EDIT - The answer below actually improves on this. On Git>=1.6.6 you can just do:
git fetch
git checkout test
---
git fetch upstream
git checkout master
git reset --hard upstream/master  
git push origin master --force
---f
git fetch
git checkout -b branch_name branch_name
git branch --set-upstream-to=upstream/branch_name branch_name
Given a branch foo and a remote upstream:
As of Git 1.8.0:
git branch -u upstream/foo
Or, if local branch foo is not the current branch:
git branch -u upstream/foo foo
Or, if you like to type longer commands, these are equivalent to the above two:
git branch --set-upstream-to=upstream/foo
git branch --set-upstream-to=upstream/foo foo
As of Git 1.7.0:
git branch --set-upstream foo upstream/foo
Notes:All of the above commands will cause local branch foo to track remote branch foo from remote upstream. The old (1.7.x) syntax is deprecated in favor of the new (1.8+) syntax. The new syntax is intended to be more intuitive and easier to remember.
---
git show af60e1012d9d3f41bef1db62aff3ab49c040e2fb
---
git checkout <sha>
git checkout <sha> file/to/restore
git checkout <sha>~1 file/to/restore
---
git remote add origin git@github.com:echarles/openaos.git
git push origin master
---
git remote add upstream git://...
git fetch upstream
git merge upstream master
# if fatal: 'upstream' does not point to a commit > git pull upstream master
git push origin master
---
git merge upstream/master ?
---
git lfs install
git lfs track "*.pdf"
---
mkdir test
git init --bare
git remote rm origin
git remote add origin git@aos.be:test
git push origin master
git remote show origin
git diff --no-prefix --staged
---
git diff master..branch
---
git squash
git cherry-pick
---
git whatchanged
git log --name-status
git log --name-only
git log --stat
---
git show <sha>
git diff <sha>^ <sha>
---
git reset HEAD .
git reset HEAD^ .
---
If you want to retrieve a file in your history and if you know the path the file was at, you can do this:
git log -- /path/to/file
This should show a list of commits which touched that file. Then, you can find the version of the file you want, and display it with...
git show <SHA> -- /path/to/file
(or restore it into your working copy with git checkout <SHA> -- /path/to/file)
--------------
GIT COMPLETION
--------------
https://github.com/git/git/tree/master/contrib/completion
---
Git Auto Completion: Execute the following in your terminal:
cd ~
curl https://github.com/git/git/raw/master/contrib/completion/git-completion.bash -OL
vim .bash_profile
# add the following line:
source ~/git-completion.bash
# go back to terminal and execute:
source .bash_profile
Now, hitting tab will autocomplete your git commands, including branch names, e.g.:
git checkout <TAB>
shows you the available branches and tags
git checkout fix-2<TAB>
completes it to
git checkout fix-29237810012
----------
GIT CLIENT
----------
git on linux
+ gitg
+ giggle
+ gitk
+ git-cola
svn co https://svn.github.com/echarles/openaos.git openaos
----------
GIT SERVER
----------
http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux
How to set up your own private Git server on Linux
Update 2: as pointed out by Tim Huegdon, several comments on a Hacker News thread pointing here, and the excellent Pro Git book, Gitolite seems to be a better solution for multi-user hosted Git than Gitosis. I particularly like the branch–level permissions aspect, and what that means for business teams. I’ve left the original article intact.
Update: the ever–vigilant Mike West has pointed out that my instructions for permissions and git checkout were slightly askew. These errors have been rectified.
One of the things I’m attempting to achieve this year is simplifying my life somewhat. Given how much of my life revolves around technology, a large part of this will be consolidating the various services I consume (and often pay for). The mention of payment is important, as up until now I’ve been paying the awesome GitHub for their basic plan.
I don’t have many private repositories with them, and all of them are strictly private code (this blog; Amanda’s blog templates and styles; and some other bits) which don’t require collaborators. For this reason, paying money to GitHub (awesome though they may be) seemed wasteful.
So I decided to move all my private repositories to my own server. This is how I did it.
Set up the server
These instructions were performed on a Debian 5 “Lenny” box, so assume them to be the same on Ubuntu. Substitute the package installation commands as required if you’re on an alternative distribution.
First, if you haven’t done so already, add your public key to the server:
ssh myuser@server.com mkdir .ssh
scp ~/.ssh/id_rsa.pub myuser@server.com:.ssh/authorized_keys
Now we can SSH into our server and install Git:
ssh myserver.com
sudo apt-get update
sudo apt-get install git-core
…and that’s it.
Adding a user
If you intend to share these repositories with any collaborators, at this point you’ll either:
    Want to install something like Gitosis (outside the scope of this article, but this is a good, if old, tutorial); or
    Add a “shared” Git user.
We’ll be following the latter option. So, add a Git user:
sudo adduser git
Now you’ll need to add your public key to the Git user’s authorized_keys:
sudo mkdir /home/git/.ssh
sudo cp ~/.ssh/authorized_keys /home/git/.ssh/
sudo chown -R git:git /home/git/.ssh
sudo chmod 700 !$
sudo chmod 600 /home/git/.ssh/*
Now you’ll be able to authenticate as the Git user via SSH. Test it out:
ssh git@myserver.com
Add your repositories
If you were to not share the repositories, and just wanted to access them for yourself (like I did, since I have no collaborators), you’d do the following as yourself. Otherwise, do it as the Git user we added above.
If using the Git user, log in as them:
login git
Now we can create our repositories:
mkdir myrepo.git
cd !$
git --bare init
The last steps creates an empty repository. We’re assuming you already have a local repository that you just want to push to a remote server.
Repeat that last step for each remote Git repository you want.
Log out of the server as the remaining operations will be completed on your local machine.
Configure your development machine
First, we add the remotes to your local machine. If you’ve already defined a remote named origin (for example, if you followed GitHub’s instructions), you’ll want to delete the remote first:
git remote rm origin
Now we can add our new remote:
git remote add origin git@server.com:myrepo.git
git push origin master
And that’s it. You’ll probably also want to make sure you add a default merge and remote:
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
And that’s all. Now you can push/pull from origin as much as you like, and it’ll be stored remotely on your own myserver.com remote repository.
Bonus points: Make SSH more secure
This has been extensively covered by the excellent Slicehost tutorial, but just to recap:
Edit the SSH config:
sudo vi /etc/ssh/sshd_config
And change the following values:
Port 2207
...
PermitRootLogin no
...
AllowUsers myuser git
...
PasswordAuthentication no
Where 2207 is a port of your choosing. Make sure to add this so your Git remote:
git remote add origin ssh://git@myserver.com:2207/~/myrepo.git

SVN  

svn help
usage: svn <subcommand> [options] [args]
Subversion command-line client, version 1.6.15.
Type 'svn help <subcommand>' for help on a specific subcommand.
Type 'svn --version' to see the program version and RA modules
or 'svn --version --quiet' to see just the version number.
Most subcommands take file and/or directory arguments, recursing
on the directories.  If no arguments are supplied to such a
command, it recurses on the current directory (inclusive) by default.

Available subcommands:
 add
 blame (praise, annotate, ann)
 cat
 changelist (cl)
 checkout (co)
 cleanup
 commit (ci)
 copy (cp)
 delete (del, remove, rm)
 diff (di)
 export
 help (?, h)
 import
 info
 list (ls)
 lock
 log
 merge
 mergeinfo
 mkdir
 move (mv, rename, ren)
 propdel (pdel, pd)
 propedit (pedit, pe)
 propget (pget, pg)
 proplist (plist, pl)
 propset (pset, ps)
 resolve
 resolved
 revert
 status (stat, st)
 switch (sw)
 unlock
 update (up)

Changesets
Before we proceed further, we should warn you that there's going to be a lot of discussion of “changes” in the pages ahead. A lot of people experienced with version control systems use the terms “change” and “changeset” interchangeably, and we should clarify what Subversion understands as a changeset.
Everyone seems to have a slightly different definition of changeset, or at least a different expectation of what it means for a version control system to have one. For our purposes, let's say that a changeset is just a collection of changes with a unique name. The changes might include textual edits to file contents, modifications to tree structure, or tweaks to metadata. In more common speak, a changeset is just a patch with a name you can refer to.

In Subversion, a global revision number N names a tree in the repository: it's the way the repository looked after the Nth commit. It's also the name of an implicit changeset: if you compare tree N with tree N−1, you can derive the exact patch that was committed. For this reason, it's easy to think of revision N as not just a tree, but a changeset as well. If you use an issue tracker to manage bugs, you can use the revision numbers to refer to particular patches that fix bugs—for example, “this issue was fixed by r9238.” Somebody can then run svn log -r 9238 to read about the exact changeset that fixed the bug, and run svn diff -c 9238 to see the patch itself. And (as you'll see shortly) Subversion's svn merge command is able to use revision numbers. You can merge specific changesets from one branch to another by naming them in the merge arguments: passing -c 9238 to svn merge would merge changeset r9238 into your working copy.
svn propset svn:externals "eggtoolpalette -r853 http://svn.gnome.org/svn/libegg/trunk/libegg/toolpalette/" .

svn commit -m "Added eggtoolpalette"

svn log | more

svn up
svn up -rXXXX

svn diff -r 63:64 .

MANAGEMENT                                                                  |

+ 

BASH 

sort
uniq
wc
wc -l
ls -lh
list=`*.csv`
for file in $list
do
cat $file >> new_file.csv
cat -vet
done
$table=yourtable
hive -e "load data local inpath '$file' into table $table"
cat *.csv > output.csv
netstat -npl
netstat -nr
netstat -a -t --numeric-ports -p
sockstat -l | grep sshd
jflex flex lex
chmod -R 755 . # default permission
tty
script -a /dev/pts/1
xmllint

$ cat /proc/meminfo
$ less /proc/meminfo
$ more /proc/meminfo
$ egrep --color 'Mem|Cache|Swap' /proc/meminfo
Sample outputs:
MemTotal:        8120568 kB
MemFree:         2298932 kB
Cached:          1907240 kB
SwapCached:            0 kB
SwapTotal:      15859708 kB
SwapFree:       15859708 kB
$ free -m

command | tee file

w3m

lspci
lsusb
dmesg |grep eth0

more /etc/fstab
fdisk -l
du -hs /path/to/directory | sort
df -h
Usually I will put -h to make it size human readable.
Another good tools to check the disk space for directories, we use du. You may realized that when you type ls -l, the size of every directories have the same size 4096, it is because directories is actually a file. But for us, we want to know how large the load it store instead the directory file itself.
To show all directories size including sub directories, type
du -h
To calculate the current directory size you are in (-s stand for summary)
du -sh
To show all the 1 level sub directories size (which you are not interested at sub sub directories.)
du -sh *
To show the size of specific directory
du -sh /home
To show the size of all sub directories of a specific directory
du -sh /home/*

KERNEL                                                                      |

+ process
ls /proc/<pid>/...
netstat -lnap
mount
pidof ...
top -p pid
htop ... F5
pidstat -d -p ALL 5 10
ps -auxww
ps -axfus
strace
ltrace
renice
top

mtr
dig +trace hostname
traceroute

file descriptor output types (stdout1 2 and stderr3)
strace echo "1"
> /dev/null 1>&2

+ file
stat <file>
time ls -R / > /dev/null
(do it twice)

+ io
iostat
iostat -x 1
vmstat 1
netstat -l -p
sockstat -4 -l | grep :80 | awk '{print $3}' | head -1

time smtp-source -A -C1500 -l 100 -m 100000 -s 500 -d -c -f nm@test.de -t te 213.157.22.218:25
time smtp-source -L -s 40 -m 100 -l 4096 -d -c -f me@elasticinbox.com -t test@elasticinbox.com ElasticInbox-LB-1070648408.eu-west-1.elb.amazonaws.com:2400
for i in `seq -w 1 1000`; do lsof -a -u dweiss -c java > snap.$i; sleep 5; done
find queue-jms/src/test/ -name *.java  -print | xargs sed -i 's/\t/        /g'
find /tmp/ -name 'aos-bu-*' -print0 | xargs -0 rm -fr
tr 'A-Z' 'a-z' < subtitles_124.txt | tr -sc 'A-Za-z' '\n' | sort | less | uniq -c | sort -n -r | less
tr ";" "," < in.csv | tr "\"" "" > out.csv
echo $?
tar xvfj *.bz2
tar xvfz .tar.gz

locate file

bzcat stackoverflow.com-Posts.7z | hdfs dfs -put - /user/srowen/Posts.xml

patch -p0 --dry-run < file.patch

ubuntu startup scripts
vi /etc/init.d <script>
update-rc.d <script> defaults
update-rc.d <script> remove

fedora startup scripts
have a fedora core box which needs to run different scripts on startup to connect to other boxes on the network.
After a bit of fiddling around, I found what appears to be the best solution for me, using ntsysv and init.d. Here's how it's done;
+ make a new file in the /etc/init.d/ directory
+ add your script to this file with the following lines at the top;
#!/bin/bash
# chkconfig: 345 85 15
# description: of your file
+ enter this in the shell;
chkconfig --add startup_filename
+ type ntsysv - your startup script should now be in the list, checked and ready for action!

Simple Commands Complex Commands The For Structure Example For Syntax The While Structure Example While Syntax The If Structure Example Simple If Syntax Example Complex If Syntax The Case Structure Example Case Syntax The Parent & Sub-Shell Structure The Function Structure Example Function Syntax Special Commands Comment Structure
Built-In Commands
(Simple, Complex & Special Commands)
Back in the man pages the next section is called USAGE and goes on to talk about pipelines and lists. Most of what it says here can be understood by any UNIX user so I will skip this for now but there will be some examples later showing various implementations of these definitions. The issue I want to deal with next is the simple, complex and special commands. This is nowhere near as bad as it sounds.
Simple Commands
Simple commands are just straight UNIX commands that exist regardless of the surrounding shell environment. Like our old favourites ls -l or df -al or lpr -Pprinter filename. There are large numbers of commands that fall into this category but the following list is a selection of the more useful when scripting.
    sort Sorts lines in ascending, descending and unique order
    grep Searches for regular expressions in strings or files
    basename Strips the path from a path string to leave just the filename
    dirname Removes the file from a path string to leave just the pathname
    cut Chops up a text string by characters or fields
    wc Count the characters, words, or lines
    [ (test) ] Predicate or conditional processor
    tr 'a' 'b' Transform characters
    expr Simple arithmetic processor
    bc Basic Calculator
    eval Evaluate variables
    echo Output strings
    date Create date strings
    nawk Manipulate text strings
    head | tail Access lines in files
Some of the above commands can be very complex indeed, especially when assembled into pipelines and lists. However, these are still referred to as simple commands - presumably because they stand alone. Take a close look at the man pages for all of the above commands, you will find them invaluable during your scripting sojourn.
Complex Commands
Complex commands are just the shells internal commands which are used to group simple commands into controlled sets based on your requirements. These include the loop constructs and conditional test structures. These cannot stand alone. An if requires a then and a fi at the very least. Lets take a look at the man pages again at this point.
The for structure:
It says on my systems man page for name [ in word ... ] do list done as a syntax description of the for command construct. Well, it is correct but does not really show the layout of the command at all. Look at the example below and you can see straight away what is supposed to happen.
Example for syntax
alphabet="a b c d e"            # Initialise a string
count=0                    # Initialise a counter
for letter in $alphabet            # Set up a loop control
do                    # Begin the loop
    count=`expr $count + 1`        # Increment the counter
    echo "Letter $count is [$letter]"    # Display the result
done                    # End of loop
So in plain English, for each letter found in alphabet loop between do and done and process the list of commands found. Lets take this one line at a time from the top. This is the way the sh likes to have its variables set. There is no leading word as in the csh (set) just start with the variable name. There are also no blanks either side of the equal sign. Indeed, if you put a blank in, the shell will give you an error message for your trouble. This also gives rise to the difference between the top two lines in this example. Because I want to include spaces in my string for alphabet, I must enclose the whole string in double quotes. On the next line this is not required as there are no embedded blanks in the value of count. When setting variables, no blanks are allowed. Everywhere else, sh loves blanks.
In line 3 the for statement creates a loop construct by selecting the next letter from alphabet each time through the loop and executing the list found between the do and the done for each letter. This process also strips away any blanks (before and after) each letter found in alphabet . The do and done statements are not executed as such, they simply mark the beginning and end of the loop list. They are however a matched pair, leave one out and the shell will complain.
Inside the loop are two simple commands (apparently!). The first one just increments the loop counter by adding one to its current value. Note the use of the back-quote here to force the execution of the expr command before setting the new value of count. There will be more about this later.
The next line is something we have seen before, just a display command showing the values of the variables. Note the use of the $ symbol to request the value of the variables.
The while structure:
There is another similarly structured command in the sh called while. Its syntax structure is listed as while list do list done which you should now be able to translate yourself into something that looks like the example below.
Example while syntax
alphabet="a b c d e"                        # Initialise a string
count=0                                # Initialise a counter
while [ $count -lt 5 ]                        # Set up a loop control
do                                # Begin the loop
    count=`expr $count + 1`                    # Increment the counter
    position=`bc $count + $count - 1`               # Position of next letter
    letter=`echo "$alphabet" | cut -c$position-$position`    # Get next letter
    echo "Letter $count is [$letter]"                # Display the result
done                                # End of loop
Most of this is the same construct, I have just replaced the for loop set-up with its equivalent while syntax. Instead of stepping through the letters in alphabet, the loop control now monitors the size of the count with [ $count -lt 5]. The -lt flag here represents less-than and is part of the UNIX test command, which is implied by the square brackets. Any other command, list or variable could be put here as long as its substituted value equates to an integer. A zero value will exit the loop, anything else and the loop will continue to process. From the above you can work out that test returns 1 for true and 0 for false. Have a look at the man pages for test at this point, you will find it a very useful command with great flexibility.
The if structure:
Next in complexity is if list then list [ elif list then list ] ... [ else list ] fi, or the if construct. What does that lot mean? Well usually if statements in any language are associated with predication and so as you would expect there is some more implied use of the UNIX test command. Lets generate an example to see the structure in a more usual form. The square brackets in the echo statement have no relevance other than to clarify the output when executed (See - Debugging). However, the square brackets in the if and elif lines are mandatory to the structure.
Example simple if syntax
if [ -f $dirname/$filename ]
then
    echo "This filename [$filename] exists"
elif [ -d $dirname ]
then
    echo "This dirname [$dirname] exists"
else
    echo "Neither [$dirname] or [$filename] exist"
fi
You can see here more examples of what test can do. The -f flag tests for existence of a plain file, while -d tests for existence of a directory. There is no limit (that I can discover) to the number of elif's you can use in one if statement. You can also stack up the tests into a list using a double pipe or double ampersand as in Example complex if syntax below. Here the use of the double pipe (||) is the syntax for a logical or whereas the double ampersand (&&) is the logical and.
Example complex if syntax
if [ -f $dir/$file ] || [ -f $dir/$newfile ]
then
    echo "Either this filename [$file] exists"
    echo "Or this filename [$newfile] exists"
elif [ -d $dir ]
then
    echo "This dirname [$dir] exists"
else
    echo "Neither [$dir] or [$file or $newfile] exist"
fi
In the sh if construct it is important to put the then word on its own line or sh will complain about an invalid test. Also important is the blank inside each end of the test. Without this the test will generate a syntax error - usually "test expected!" which is a bit meaningless.
case structure:
Next is the case word in [ pattern [ pattern ] ... ) list ;; ] esac which is probably the most complicated construct to decode from the simple syntax listed above. It is a bit like a multi-line if statement linked with logical or symbols (||). It is commonly used to process a list of parameters passed into a script as arguments when the actual parameters could be in any order or of any value. The layout is shown in 8.2.4.1 below, which is a section from a print script.
Example case syntax
size=0                    # Default Char Point Size (!)
page=660                # Default Page Point Size
while [ "$1" != "" ]            # When there are arguments...
do                    # Process the next one
case $1                # Look at $1
in
    -l)    lines=47;            # If it's a "-l", set lines
  page=470;            # Set the Landscape Page Point
  options="$options -L -l";    # Set the Landscape Options
  shift;;                # Shift one argument along
    -p)    lines=66;            # If it's a "-p", set lines
  options="$options -l";        # Set the Portrait Options
  shift;;                # Shift one argument along
    -s)    size=$2;            # If it's a "-s", set size
  shift 2;;            # Shift two arguments along
    *)    echo "Option [$1] not one of  [p, l, s]";    # Error (!)
  exit;;                # Abort Script Now
esac
if [ $size = 0 ]            # If size still un-set...
then
    size=`echo "$page / $lines" | bc`    # Set from pages over lines
else                    # or
    lines=`echo "$page / $size" | bc`    # Set lines
fi
done
options="$options$lines -s$size"    # Build complete option list
lp -P$PRINTER $options $filename    # Output print file to printer
Here we see a while loop, exiting when no more parameters are found on input line, enclosing a case statement. The case statement repeatedly tests $1 against a list of possible matches indicated by the right parentheses. The star (*) at the end is the default case and will match anything left over. When a match is found, the list of commands following the right parentheses are executed up to the double semi-colon. In each of these lists, there is a shift statement which shifts the input parameters one place left (so $2 becomes $1 etc.), allowing the next parameter to be tested on the next pass through the loop. In the case of the "-s" parameter, an extra following argument is expected, the size value, which is why the shift instruction contains the additional argument 2 (shifting the parameters 2 spaces left). This effectively allows the processing of all the passed arguments in any order and includes an exit for an invalid parameter condition via the star match. The if statement at the end checks if the size parameter has been set then uses the bc command to set either size or lines accordingly. When complete, the final options are created and passed to the lp command to print the file.
The parent and sub-shell structure:
Then there are two easy ones the ( list ) and { list; } constructs which simply execute the whole list of commands in a separate sub-shell ( ) or in the parent shell { } with a note that the blanks between the { } are mandatory.
The function structure:
Lastly in the complex command section we come to what is probably the most underused but most useful construct for serious scripters. The function definition. The syntax is deceptively simple which I guess is what leads most users to assume it's not worth learning about. How wrong they are. Just take a look at the example below to see what I mean.
Example function syntax
i_upper_case()
{
    echo $1 | tr 'abcdefghijklmnopqrstuvwxyz' \
       'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}
This is a very simple function called i_upper_case , you can probably guess what it does. The backslash at the end of the echo line is a UNIX feature that allows a command line to be continued on the next line. It tells the system to ignor the next character - in this case the newline. Note that it gets its input argument from a passed parameter ($1). So to make use of this function within a script you simply need to call it with an argument as follows:
i_upper_case "fred"
or
name="fred"
i_upper_case $name
And you will get back FRED in either case. A more appropriate usage would be something like:
small_name="$input_argument"
large_name=`i_upper_case "$small_name"`
echo "Large Name = [$large_name]"
Which allows the case to be changed and put into a new variable. The advantage of doing this at all is that you don't have to re-code the same thing over again when you want to use the feature several times within the script. Note the use here of the double quotes around the variables to the right of the equal signs - this is to preserve any blanks within the strings which would otherwise be treated as argument separators and hence the function would only process the first argument in the list. What this means is:
small_name="fred smith"
large_name=`i_upper_case "$small_name"`    # Quoted parameter
echo "Large Name = [$large_name]"
Will display FRED SMITH, whereas:
small_name="fred smith"
large_name=`i_upper_case $small_name`    # Unquoted parameter
echo "Large Name = [$large_name]"
Will display FRED only. This bug can be traced back to the function definition which only reads in the $1 parameter. Changing this to read the $@ parameter would correct the bug for this function. But beware, this type of fix would not be appropriate in all situations. Try and think generically when creating functions and make them as useful as possible in all scenarios.
There are two very basic rules to remember when dealing with functions:
   You cannot use a function until it is defined. Thus all function definitions should appear either at the top of the script or in a start-up file such as ~/.profile.
    Functions can be nested to any depth, as long as the first rule is not violated.
At the end of the complex command section there is a reminder message that all of the keywords used in these complex commands are reserved words and not therefore available as variable names. This means that you can screw up any UNIX command by using it as a variable but you cannot screw up a complex shell reserved word.
echo()
{
    /usr/bin/user/my_echo "$@"
}
Is perfectly okay as a function definition and the sh will happily use your echo function whenever an echo command is required within the script body.
while()
{
    /usr/bin/user/my_while "$@"
}
Is not okay and the function definition will fail at runtime.
Special Commands:
The following are a set of special commands which the shell provides as stand alone statements. Input and output redirection is permitted for all these commands unlike the complex commands. You cannot redirect the output from a while loop construct, only the simple or special commands used within the loop list.
   The colon ( : ) does nothing! A zero exit code is returned. Can be used to stand in for a command but I must admit not to finding a real use for this command.
   The dot ( .   filename) reads in commands from another file (See Startup Files & Environment for details). If the filename following the dot is not in the current working directory, then the shell searches along the PATH variable looking for a match. The first match that is found is the file that is used. The file is read into the shell and the commands found are executed within the current environment.
   The break ( break [ n ] ) command causes an exit from inside a for or while loop. The optional n indicates the number of levels to break out from - the default is one level. Although not stated in the syntax rules, I have used this statement in an if then else fi construct to good effect in Simple Utility Functions where it causes an exit from the function but does not cause an exit from the calling script.
   The continue ( continue [ n ] ) command resumes the next iteration of the enclosing for or while loop at the [ optional nth ] enclosing loop. Can't say I've used this one either.
   The cd ( cd [ argument ] ) command is the the change directory command for the shell. The directory is specified with argument which defaults to HOME. The environment variable CDPATH is used as a search path for directories specified by argument.
    The echo ( echo [ argument ] ) command is the shell output statement. See the man pages for echo(1) for full details.
   The eval ( eval [ argument ] ) command reads the arguments into the shell and then attempts to execute the resulting command. This allows pre-emptive parameter substitution of hidden parameters or commands.
   The exec ( exec [ argument ] ) command reads in the command specified by arguments and executes them in place of this shell without creating a new process. Input an output arguments may appear and, if no others are given, will cause the shell input and or output to be modified.
   The exit ( exit [ n ] ) command causes a shell to exit with the exit status specified by the n parameter. If the n parameter is omitted, the exit status is that of the last executed command within the shell.
   The export ( export [ variable ] ) command we have already met and is the command which makes shell variables global in scope. Without a variable, export will list currently exported variables.
    The getopts command is provided to support command syntax standards - see getopts(1) and intro(1) man pages for details.
   The hash ( hash [ -r ] [ name ] ) command remembers the location in the search path (PATH variable) of the command name. The option -r causes the shell to forget the location of name. With no options the command will list out details about current remembered commands. This has the effect of speeding up access to some commands.
   The newgrp ( newgrp [ argument ] ) command is equivalent to exec newgrp argument. See newgrp(1M) for usage and description. The newgrp command logs a user into a new group by changing a user's real and effective group ID. The user remains logged in and the current directory is unchanged. The execution of newgrp always replaces the current shell with a new shell, even if the command terminates with an error (unknown group).
    The pwd ( pwd ) command literally prints the current working directory. Usually used to set the CWD variable internally.
   The read ( read name ) command will be seen in several examples. It allows the shell to pause and request user input for the variable name, which is then accepted as the variables value.
   The readonly ( readonly [ name ] ) command sets a variable as imutable. Once named in this command they cannot be reassigned new values.
   The return ( return [ n ] ) command causes a function to exit with the return value n. If the n is omitted, the return value is the exit status of the last command executed within the function. Unlike exit this does not result in termination of the calling script.
   The shift ( shift [ n ] ) command causes the positional parameters to be moved to the left ($2 becomes $1, etc.) by the value of n, which defaults to one.
    The test command is used to evaluate conditional expressions. See the man pages for test(1) for full details and usages.
    The times command prints the accumulated user and system times for processes run from the shell.
   The trap ( trap [ argument ] [ n ] ) command allows conditional execution of the commands contained within argument dependant on the shell receiving numeric or symbolic signal(s) n.
    The type ( type [ name ] ) command indicates how name would be interpreted if used as a command name.
    The ulimit and umask commands exist in their own right as UNIX commands. See man pages.
   The unset ( unset [ name ] ) command allows names to be unset. This removes the values from the variable or function. The names PATH, PS1, PS2, MAILCHECK, and IFS cannot be unset.
   The wait ( wait [ n ] ) command waits for the background process n to terminate and report its termination status; where n is the process id. With no arguments, all current background processes are waited for.
Most of these special commands get used somewhere in this book and more detailed explanations will follow at that time.
Comment structure:
The next thing on my systems man page is a reference to the hash (#) comment character. It states that any word beginning with # causes that word and all the following characters up to a newline to be ignored. There are no notes about the first line exceptions that I gave in The Basic Shells when we were dealing with shell indicators (The #! sequence)
Home Next Preface Introduction Basic Shells Shell Syntax Built-In Commands Command Substitution Startup & Environment Pipes, Lists & Redirection Input & Output Using Files Design Considerations Functions Debugging Putting It All Together Appendix Code Examples Page 205 This page was brought to you by rhreepe@injunea.demon.co.uk

TOMCAT

setenv.sh
JAVA_HOME="/usr/lib/jvm/java-gcj"
JAVA_HOME="/usr/lib/jvm/java-6-sun"
JAVA_OPTS="-Xms128m -Xmx1024m -XX:MaxPermSize=512m -Djava.ext.dirs=$JVM_EXT_DIRS -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=10201"
OPENOFFICE_HOME="/usr/lib/openoffice"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/agenda.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/aprtisdoc.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/agenda.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/aportisdoc.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/bsh.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/classes.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/commonwizards.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/fax.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/form.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/hsqldb.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/java_uno.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/java_uno_accessbridge:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/js.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/juh.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/jurt.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/jut.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/letter.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/officebean.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/pexcel.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/pocketword.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/query.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/report.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/ridl.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/sandbox.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/ScriptFramework.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/ScriptProviderForBeanShell:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/ScriptProviderForJava.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/ScriptProviderForJava.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/sdbc_hsqldb.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/table.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/unoil.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/unoloader.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/web.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/xalan.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/xercesImpl.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/xmerge.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/XMergeBridge.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/xml-apis.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/XSLTFilter.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/XSLTValidate.jar:"$CLASSPATH"
CLASSPATH="$OPENOFFICE_HOME"/program/classes/xt.jar:"$CLASSPATH"
echo $CLASSPATH
----------
SERVER.XML
----------
URIEncoding="UTF-8"
<Connector connectionTimeout="20000" port="80" URIEncoding="UTF-8" protocol="HTTP/1.1" redirectPort="8443"/>

GUAVA                                                                      |

+ splitters and joiners (that work right)
final static Splitter onWhiteSpace = Splitter.on(CharMatcher.WHITESPACE);
+ type inferencing factory methods
Map<String, String> dictionary = Maps.newHashMap();
Map<String, Integer> table = ImmutableMap.of("abc", 1, "def", 2);
+ orderings that make sense and do cool things
Ordering.natural().immutableSortedCopy(iterable)
+ reading a resource all in a gulp (note the predefined charset that never requires a throw):
Resources.readLines(Resources.getResource("foo.csv"), Charsets.UTF-8)

MAVEN

mvn release:prepare -Darguments="-DskipTests"
mvn install -Dmaven.findbugs.enable
mvn dependency:unpack-dependencies build-helper:attach-test-classes (Running tests from a maven test-jar)
mvn dependency:sources
mvn dependency:resolve -Dclassifier=javadoc
-DdownloadSources=true -DdownloadJavadocs=true

SPAMASSASSIN                                                                |

apt-get install spamassassin
spamassassin -D < nospam-corporate-umg-1.txt 2> out
vi /etc/spamassassin/local.cf
#   Set the threshold at which a message is considered spam (default: 5.0)
#
required_score 11.0
score RCVD_IN_XBL 0 0 0 0
vi /etc/default/spamassassin
# Change to one to enable spamd
ENABLED=1
tail -f /var/log/syslog
create /nonexisting/.spamassassin ???
/etc/init.d/spamassassin start

OPENOFFICE                                                                 |

apt-get build-dep openoffice.org
apt-get install x-window-system-core
apt-get install gnome-desktop-environment
apt-get install gdm
apt-cache search openoffice*
apt-get remove openoffice*
sudo apt-get remove --purge openoffice.org-base
sudo apt-get remove --purge openoffice.org-calc
sudo apt-get remove --purge openoffice.org-draw
sudo apt-get remove --purge openoffice.org-impress
sudo apt-get remove --purge openoffice.org-math
sudo apt-get remove --purge openoffice.org-writer
sudo apt-get remove --purge openoffice.org-l10n-*
sudo apt-get remove --purge openoffice.org-core
sudo apt-get remove --purge openoffice.org-common
sudo apt-get install fakeroot alien
tar zxvf OOo_2.0.0_LinuxIntel_install.tar.gz
cd OOO680_m3_native_packed-2_en-US.8968/RPMS/
fakeroot alien -d *.rpm
dpkg -i *.deb
cd desktop-integration/
sudo dpkg -i openoffice.org-debian-menus_2.0.0-3_all.deb
apt-get source openoffice.org
apt-get build-dep openoffice.org (to install build dependencies)
   [ somehow broken yet probably because of the various |'s ]
cd <source directory>
debuild
dpkg-deb  -c openoffice.org-core_2.2.0-1ubuntu3_i386.deb
dpkg -i *.deb

IMAGEMAGICK                                                                |

--------------------
A.1. GET IF FROM APT
--------------------
apt-get install imagemagick
------
A.2. OR BUILD IT FROM SOURCE
------
apt-get update
apt-get install build-essential
apt-get build-dep imagemagick
./configure
but you might need some special parameters (check the installation docs for details on all the configurations available parameters) for ex.:
./configure --with-perl=no --with-magick-plus-plus=no --enable-shared --with-gs-font-dir=/usr/share/fonts/type1/gsfonts --x-includes=/usr/include/X11 --x-libraries=/usr/lib/X11
Now we can proceed with the actual compilation:
make
and if there are no errors with the installation:
make install
(this will install the files under /usr/local, since we have not overwritten the default prefix).
As a reminder that older software might not compile on newer and modern OSs (compilers, libraries, etc) the compilation fails on recent Debian Etch versions with:
png.c: In function 'WriteOneJNGImage':
png.c:7639: warning: dereferencing type-punned pointer will break strict-aliasing rules
png.c:7705: warning: dereferencing type-punned pointer will break strict-aliasing rules
make[1]: *** [png.lo] Error 1
make[1]: Leaving directory `/usr/local/src/ImageMagick-5.5.7/coders'
make: *** [all-recursive] Error 1
This is caused by newer versions of libpng12, and in order to compile imagemagick successfully I had to install version 1.2.8rel-7
(opposed to the latest version that is currently installed on etch 1.2.13-4)
----------
B. TEST IT
----------
Once the installation is completed we can verify the version we installed is working fine with:
/usr/local/bin/identify -version
Version: ImageMagick 5.5.7 12/21/06 Q16 http://www.imagemagick.org
Copyright: Copyright (C) 2003 ImageMagick Studio LLC
or
/usr/local/bin/convert -version
Version: ImageMagick 5.5.7 12/21/06 Q16 http://www.imagemagick.org
Copyright: Copyright (C) 2003 ImageMagick Studio LLC
and to get the listing of which image formats are supported on our system:
identify -list format
Format  Mode  Description
8BIM*  rw-  Photoshop resource format
8BIMTEXT*  rw-  Photoshop resource text format
8BIMWTEXT*  rw-  Photoshop resource wide text format
APP1*  rw-  Raw application information
APP1JPEG*  rw-  Raw JPEG binary data
-------
convert picture.png picture.jpg 
-------
JMagick
-------
apt-get install jmagick
Download source from :
+ http://www.yeo.id.au/jmagick/
+ http://www.jmagick.org/download.html
jMagick 6.2.4-1 for ImageMagick 6.2.4, 6.2.5
apt-get install libmagick++9-dev
./configure
./make
-------
cp libJMagick.so /usr/lib
scp /usr/lib/libJMagick.so root@172.16.1.206:/usr/lib/
OR apt-get install jmagick ??? => UselibJMagick.so from apt !?!
cp /usr/lib/jni/libJMajick.so /usr/lib

EC2  

ec2metadata

MME  

http://www.flashinsider.com/2006/07/26/how-to-create-your-own-youtube-site/
http://blog.go4teams.com/?p=56

FFMPEG                                                                      |

+ MPG>MP3: ffmpeg -i video.flv -acodec copy audio.mp3
+ MPG>OGG: ffmpeg -i 1.mp4 -acodec libvorbis -vcodec libtheora -f ogg output.ogg
+ MPG>FLV; ffmpeg -i video.mpg -ar 22050 -ab 32 -f flv -s 320x240 -aspect 4:3 -y video.flv
+ AVI>FLV: ffmpeg -i video.avi -acodec mp3 -ar 22050 -ab 32 -f flv -s 320x240 video.flv
+ FLV Metadata: flvtool2 -U video.flv
+ Thumbnail: ffmpeg -y -i video.mpg -vframes 1 -ss 00:00:02 -an -vcodec png -f rawvideo -s 320x240 video.jpg
+ Play: ffplay video.flv
screenrecorder: ffmpeg -y -f alsa -ac 2 -i pulse -f x11grab -r 25 -s 1920x1080 -i :0.0 -vcodec libx264 -vpre lossless_ultrafast -crf 22 -acodec libmp3lame -ar 44100 -ab 126k -threads 3 ~/Desktop/screencast.mkv
Add in /etc/apt/sources.list
## Medibuntu - Ubuntu 7.04 "feisty fawn"
## Please report any bug on https://bugs.launchpad.net/medibuntu/
deb http://packages.medibuntu.org/ feisty free non-free
#deb-src http://packages.medibuntu.org/ feisty free non-free
apt-get update
apt-get install ffmpeg
apt-get install libavcodec0d ?
apt-get install w32codecs ?
apt-get install libavformat0d ?
apt-get install libpostproc0d ?
apt-get install mpg123 ?
apt-get install avifile-mjpeg-plugin ?
apt-get install libavifile-0.7c2 ?
apt-get install libswfdec0.3 ?
19 ffmpeg commands for all needs
Published on September 22nd, 2008 by Jean-Baptiste Jung. 137 Comments -
ffmpeg is a multiplatform, open-source library for video and audio files. I have compiled 19 useful and amazing commands covering almost all needs: video conversion, sound extraction, encoding file for iPod or PSP, and more.
Getting infos from a video file
ffmpeg -i video.avi
Turn X images to a video sequence
ffmpeg -f image2 -i image%d.jpg video.mpg
This command will transform all the images from the current directory (named image1.jpg, image2.jpg, etc…) to a video file named video.mpg.
Turn a video to X images
ffmpeg -i video.mpg image%d.jpg
This command will generate the files named image1.jpg, image2.jpg, …
The following image formats are also availables : PGM, PPM, PAM, PGMYUV, JPEG, GIF, PNG, TIFF, SGI.
Encode a video sequence for the iPpod/iPhone
ffmpeg -i source_video.avi input -acodec aac -ab 128kb -vcodec mpeg4 -b 1200kb -mbd 2 -flags +4mv+trell -aic 2 -cmp 2 -subcmp 2 -s 320x180 -title X final_video.mp4
Explanations :
    Source : source_video.avi
    Audio codec : aac
    Audio bitrate : 128kb/s
    Video codec : mpeg4
    Video bitrate : 1200kb/s
    Video size : 320px par 180px
    Generated video : final_video.mp4
Encode video for the PSP
ffmpeg -i source_video.avi -b 300 -s 320x240 -vcodec xvid -ab 32 -ar 24000 -acodec aac final_video.mp4
Explanations :
    Source : source_video.avi
    Audio codec : aac
    Audio bitrate : 32kb/s
    Video codec : xvid
    Video bitrate : 1200kb/s
    Video size : 320px par 180px
    Generated video : final_video.mp4
Extracting sound from a video, and save it as Mp3
ffmpeg -i source_video.avi -vn -ar 44100 -ac 2 -ab 192 -f mp3 sound.mp3
Explanations :
    Source video : source_video.avi
    Audio bitrate : 192kb/s
    output format : mp3
    Generated sound : sound.mp3
Convert a wav file to Mp3
ffmpeg -i son_origine.avi -vn -ar 44100 -ac 2 -ab 192 -f mp3 son_final.mp3
Convert .avi video to .mpg
ffmpeg -i video_origine.avi video_finale.mpg
Convert .mpg to .avi
ffmpeg -i video_origine.mpg video_finale.avi
Convert .avi to animated gif(uncompressed)
ffmpeg -i video_origine.avi gif_anime.gif
Mix a video with a sound file
ffmpeg -i son.wav -i video_origine.avi video_finale.mpg
Convert .avi to .flv
ffmpeg -i video_origine.avi -ab 56 -ar 44100 -b 200 -r 15 -s 320x240 -f flv video_finale.flv
Convert .avi to dv
ffmpeg -i video_origine.avi -s pal -r pal -aspect 4:3 -ar 48000 -ac 2 video_finale.dv
Or:
ffmpeg -i video_origine.avi -target pal-dv video_finale.dv
Convert .avi to mpeg for dvd players
ffmpeg -i source_video.avi -target pal-dvd -ps 2000000000 -aspect 16:9 finale_video.mpeg
Explanations :
    target pal-dvd : Output format
    ps 2000000000 maximum size for the output file, in bits (here, 2 Gb)
    aspect 16:9 : Widescreen
Compress .avi to divx
ffmpeg -i video_origine.avi -s 320x240 -vcodec msmpeg4v2 video_finale.avi
Compress Ogg Theora to Mpeg dvd
ffmpeg -i film_sortie_cinelerra.ogm -s 720x576 -vcodec mpeg2video -acodec mp3 film_terminÃ©e.mpg
Compress .avi to SVCD mpeg2
NTSC format:
ffmpeg -i video_origine.avi -target ntsc-svcd video_finale.mpg
PAL format:
ffmpeg -i video_origine.avi -target pal-svcd video_finale.mpg
Compress .avi to VCD mpeg2
NTSC format:
ffmpeg -i video_origine.avi -target ntsc-vcd video_finale.mpg
PAL format:
ffmpeg -i video_origine.avi -target pal-vcd video_finale.mpg
Multi-pass encoding with ffmpeg
ffmpeg -i fichierentree -pass 2 -passlogfile ffmpeg2pass fichiersortie-2
#!/bin/sh
# name of this script: m4a2mp3.sh
# m4a to mp3
for i in *.m4a; do
faad "$i"
x=`echo "$i" | sed -e 's/.m4a/.wav/'`
y=`echo "$i" | sed -e 's/.m4a/.mp3/'`
lame -h -b 192 "$x" "$y"
rm "$x"
done
#!/bin/sh
for i in *.mp4; do
ffmpeg -i "$i" -f mp3 -ab 192000 -vn "$i".mp3
done
ffmpeg -i 1.mp4  -f mp3 -ab 192000 -vn 1.mp3

FLVTOOL2                                                                    |

apt-get install ruby
download from http://rubyforge.org/projects/flvtool2/
Untar it and execute the following commands inside the untared directory:
ruby setup.rb config
ruby setup.rb setup
sudo ruby setup.rb install
You can then use flvtool2 as a shell command.

MYSQL

/etc/init/mysql.conf: exec /usr/sbin/mysqld --skip-grant-tables
Access denied for user ‘root’@'localhost’ (using password: NO)
Who is fault? No matter. Probably, because of my root user doesn’t have password.
What to do? Finally i did next:
1. Stopped mysql server: i simply found mysqld process in windows task manager and stopped it.
2. Created init.txt file with next content:
UPDATE mysql.user SET Password=PASSWORD(’mypassword’) WHERE User=’root’;
FLUSH PRIVILEGES;
grant all privileges on *.* to root@localhost identified by ‘mypassword’ with grant option;
grant all privileges on mydatabase.* to root@localhost identified by ‘mypassword’ with grant option;
3. Run mysql server from command line as:
mysqld –init-file=F:\mysql\bin\init.txt
show processlist

SSH MULTIPLE KEYS                                                           |

In quite a few situations its preferred to have ssh keys dedicated for a service or a specific role. Eg. a key to use for home / fun stuff and another one to use for Work things, and another one for Version Control access etc. Creating the keys is simple, just use
ssh-keygen -t rsa -f ~/.ssh/id_rsa.work -C "Key for Word stuff"
Use different file names for each key. Lets assume that there are 2 keys, ~/.ssh/id_rsa.work and ~/.ssh/id_rsa.misc . The simple way of making sure each of the keys works all the time is to now create config file for ssh:
touch ~/.ssh/config
chmod 600 ~/.ssh/config
echo "IdentityFile ~/.ssh/id_rsa.work" >> ~/.ssh/config
echo "IdentityFile ~/.ssh/id_rsa.misc" >> ~/.ssh/config
This would make sure that both the keys are always used whenever ssh makes a connection. However, ssh config lets you get down to a much finer level of control on keys and other per-connection setups. And I recommend, if you are able to, to use a key selection based on the Hostname. My ~/.ssh/config looks like this :
Host *.home.lan
 IdentityFile ~/.ssh/id_dsa.home
 User kbsingh
Host *.vpn
 IdentityFile ~/.ssh/id_rsa.work
 User karanbir
 Port 44787
Host *.d0.karan.org
 IdentityFile ~/.ssh/id_rsa.d0
 User admin
 Port 21871
Of course, if I am connecting to a remote host that does not match any of these selections, ssh will default back to checking for and using the 'usual' key, ~/.ssh/id_dsa or ~/.ssh/id_rsa
Host myshortname realname.example.com
Hostname realname.example.com
IdentityFile ~/.ssh/realname_rsa # private key for realname
Host myother realname2.example.org
Hostname realname2.example.org
IdentityFile ~/.ssh/realname2_rsa
...almost helped me all the way. I have a different username on the server, so I had to add the User keyword to my file:
Host           friendly-name
HostName       long.and.cumbersome.server.name
IdentityFile   ~/.ssh/private_ssh_file
User           username-on-remote-machine
Now you can connect using the friendly-name:
ssh friendly-name

SSH PORT FORWARDING                                                         |

ssh -oForwardAgent=yes -L60030:jobtracker.hadoop.staging.qutics.com:50030 ubuntu@jobtracker.hadoop.staging.qutics.com
---
ssh -i ~/.ssh/Hadoop_main.pem -L60030:jobtracker.hadoop.staging.qutics.com:50030 ubuntu@jobtracker.hadoop.staging.qutics.com
browse localhost:60030
ssh -N -f -L 22343:localhost:22343 user01@web01
ssh -N -f -L 443:webgate.ec.europa.eu:443
ssh -N -f -L 11002:provide.castiron.com:443 user01@web01
ssh -N -f -L 443:webgate.ec.europa.eu:443
ssh -N -f -L 11002:provide.castiron.com:443 user01@web01
The main issue we had with those ssh is that we must configure a keep alive for ssh session.
You need to add in the /etc/ssh/sshd_config conf file of the tunnel source server:
TCPKeepAlive yes
KeepAlive yes
ClientAliveInterval 60
and restart sshd.

SSH REMOTE SSH WITH X11

ssh -Y -l echarles hostname

SSH MULTIPLE PORTS

$ more sshd_config
# Package generated configuration file
# See the sshd_config(5) manpage for details
# What ports, IPs and protocols we listen for
Port 22
Port 443
# Use these options to restrict which interfaces/protocols sshd will bind to
#ListenAddress ::
#ListenAddress 0.0.0.0
Protocol 2
# HostKeys for protocol version 2
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_dsa_key
#Privilege Separation is turned on for security
UsePrivilegeSeparation yes
# Lifetime and size of ephemeral version 1 server key
KeyRegenerationInterval 3600
ServerKeyBits 768
# Logging
SyslogFacility AUTH
LogLevel INFO
# Authentication:
LoginGraceTime 120
PermitRootLogin yes
StrictModes yes
RSAAuthentication yes
PubkeyAuthentication yes
#AuthorizedKeysFile    %h/.ssh/authorized_keys
# Don't read the user's ~/.rhosts and ~/.shosts files
IgnoreRhosts yes
# For this to work you will also need host keys in /etc/ssh_known_hosts
RhostsRSAAuthentication no
# similar for protocol version 2
HostbasedAuthentication no
# Uncomment if you don't trust ~/.ssh/known_hosts for RhostsRSAAuthentication
#IgnoreUserKnownHosts yes
# To enable empty passwords, change to yes (NOT RECOMMENDED)
PermitEmptyPasswords no
# Change to yes to enable challenge-response passwords (beware issues with
# some PAM modules and threads)
ChallengeResponseAuthentication no
# Change to no to disable tunnelled clear text passwords
#PasswordAuthentication yes
# Kerberos options
#KerberosAuthentication no
#KerberosGetAFSToken no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes
# GSSAPI options
#GSSAPIAuthentication no
#GSSAPICleanupCredentials yes
X11Forwarding yes
X11DisplayOffset 10
PrintMotd no
PrintLastLog yes
TCPKeepAlive yes
#UseLogin no
#MaxStartups 10:30:60
#Banner /etc/issue.net
# Allow client to pass locale environment variables
AcceptEnv LANG LC_*
Subsystem sftp /usr/lib/openssh/sftp-server
# Set this to 'yes' to enable PAM authentication, account processing,
# and session processing. If this is enabled, PAM authentication will
# be allowed through the ChallengeResponseAuthentication and
# PasswordAuthentication.  Depending on your PAM configuration,
# PAM authentication via ChallengeResponseAuthentication may bypass
# the setting of "PermitRootLogin without-password".
# If you just want the PAM account and session checks to run without
# PAM authentication, then enable this but set PasswordAuthentication
# and ChallengeResponseAuthentication to 'no'.
UsePAM yes

PASSWORDLESS SSH                                                            |

ssh-keygen -t rsa -C "<youremail>" -P ""
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
ssh localhost
cat ~/.ssh/id_rsa.pub | ssh git@172.16.1.156 'cat >> ~/.ssh/authorized_keys'
cat ~/.ssh/id_rsa.pub | ssh git@localhost 'cat >> ~/.ssh/authorized_keys'

First log in on A as user a and generate a pair of authentication keys. Do not enter a passphrase:
a@A:~> ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/a/.ssh/id_rsa):
Created directory '/home/a/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/a/.ssh/id_rsa.
Your public key has been saved in /home/a/.ssh/id_rsa.pub.
The key fingerprint is:
3e:4f:05:79:3a:9f:96:7c:3b:ad:e9:58:37:bc:37:e4 a@A
Now use ssh to create a directory ~/.ssh as user b on B. (The directory may already exist, which is fine):
a@A:~> ssh b@localhost mkdir -p .ssh
b@localhost's password:
Finally append a's new public key to b@B:.ssh/authorized_keys and enter b's password one last time:
a@A:~> cat .ssh/id_rsa.pub | ssh b@B 'cat >> .ssh/authorized_keys'
b@B's password:
From now on you can log into B as b from A as a without password:
a@A:~> ssh b@B hostname
B
change the rights of EVERY file in my homefolder, this is done with the -R flag. It might be nicer if you dont use it at all and type (chmod 755 /Users/USERNAME/)
chmod -R 755 /home/eric/
change the permissions of the .ssh folder
chmod 700 ~/.ssh
change the permissions of the .ssh folders content
chmod 600 ~/.ssh/*
Typically you want the .ssh directory permissions to be 700 (drwx------) 
and the public key (.pub file) to be 644 (-rw-r--r--). 
Your private key (id_rsa) should be 600 (-rw-------).
FEDORA 10: But the problem was SElinux. I disabled it and everything went smoothly.
1.Temporary (If you cannot reboot)
echo 0 > /selinux/enforce
2.Permanent (If you can reboot)
vim /etc/selinux/config
and make SELINUX=disabled.

Home ~ Personal ~ Resume ~ Code and Classes and Research ~ Favorite Links ~ Comics Pit
There are a few cases where having passwordless access to a machine is convenient or necessary. I'm always looking up a series of commands that I can just copy and paste to do it right quick. Here they are.
   Generate your key pair - One of the login modes of ssh is to use a SSH key pair. A key pair is made up of both a private and a public key. The private key is kept on your local machine while your public key is what you distribute to all the machines you want to log in to. There are a few flavors of keys you can generate, rsa1 (for SSH1), dsa (SSH2), or rsa (SSH2). According to my IT guy he likes DSA. You can (and should) associate a password with your key pair, so that only you can use it even if someone else manages to gain access to your account. If you have more than one key pair, using the same password for all key pairs will make them all active at the same time. You can also vary the number of bits used for the key. The more bits you use the harder it will be to crack, but I believe at a nominal performance drop. I was recommended to use 2048 bits. Very well, 2048 bit DSA key it is.
   ssh-keygen -t dsa -b 2048
   # Type in strong password
   If for some reason you need an rsa key, you can just replace the type with the appropiate argument, -t rsa or -t rsa1.
   NOTE: You need to make sure the permissions of the files in this directory are set to allow read/write for the user only (-rw-----++ or chmod 600 *). The most important files to do this for are the authorized_keys and private keys files. Sometimes logging in will silently fail if you don't have the permissions set correctly.
   Copy public key to remote machine - Once you made your key pair, you should copy your public key to the remote machine preferably using an encrypted method such as scp and add it to your .ssh/authorized_keys file. You can do this with a single command.
   cat ~/.ssh/id_dsa.pub | ssh user@remote.machine.com 'cat >> .ssh/authorized_keys'
   # If you need to make a .ssh directory on the remote machine
   cat ~/.ssh/id_dsa.pub | ssh user@remote.machine.com 'mkdir .ssh; cat >> .ssh/authorized_keys'
   SSH Agent - Now that you have a pair, you can try logging into the remote machine as you normally would. You will be prompted for your key pair password. If you left it blank when you created your keys you may simply press enter (and SHAME on you). If you press enter at this point and you had a password you will then be prompted for your remote account password. You can avoid having to do this by using ssh-agent. This will allow you to type in your password for the key pair once on a given machine and reuse it over and over again. ssh-agent stores information about your keys in the memory of that system, so if you move to another system or the machine is rebooted you will have to run ssh-agent again. ssh-agent also will output some environment variables that you can use to gain access to the keys in memory. I have a couple of aliases that help me out with this. One thing to consider is adding a time limit to how long your keys will be active in memory. If you want them to last for only a day you can add -t 86400 (those are seconds) to your ssh-agent command.
   # For tcsh
   # Activates the key pairs and stores some helper files.  Run this once per
   # machine you want to log from.
   alias agent 'rm -f "$HOME"/.ssh/`hostname`.agent ; ssh-agent -t 86400 | grep -v echo > "$HOME"/.ssh/`hostname`.agent ; source "$HOME"/.ssh/`hostname`.agent ; ssh-add'
   # Run this in any shell after 'agent' to "activate" the keys.
   alias sshagent 'if (-e "$HOME"/.ssh/`hostname`.agent) source "$HOME"/.ssh/`hostname`.agent ; endif'
   # For bash
   alias agent='rm -f "$HOME"/.ssh/`hostname`.agent ; ssh-agent -t 86400 | grep -v echo > "$HOME"/.ssh/`hostname`.agent ; source "$HOME"/.ssh/`hostname`.agent ; ssh-add'
   alias sshagent='if [ -e "$HOME"/.ssh/`hostname`.agent ]; then source "$HOME"/.ssh/`hostname`.agent ; fi'
Now you should simply be able to run agent once on the machine, and then sshagent once per shell. You can then log into the remote machine without having to type in a password. If your ssh agent expires (you'll know, because you'll be propted for your password), then run agent again.
   Root access - You can also give users the ability to log into the machine as root without having to give the root password out. Just add the users public key to list of root's authorized_keys, and then the user can log into the machine using root as the user name.
   # Admin does
   cat ~user/.ssh/id_dsa.pub | ssh root@remote.machine.com 'cat >> .ssh/authorized_keys'
   # User does
   agent
   sshagent; ssh root@remote.machine.com
   # Or by typing the key pair's password
   ssh root@remote.machine.com
   It is recommended that once you have the ability to log in remotely as root with keys, you should disable password-based logins via ssh by making sure the following line is in /etc/ssh/sshd_config:
   PermitRootLogin   without-password

jclouds-virtualbox uses the current user.name and private key  for sending commands to localhost over ssh.
The current user (user.name) should have passwordless ssh. On a *nix system, you can enable this feature using `ssh-keygen` and `ssh-copy-id`.
- ssh-keygen \- creates the public and private keys (by default in `${user.home}/.ssh/id_rsa.pub` and `${user.home}/.ssh/id_rsa`)
$ ssh-keygen
- ssh-copy-id \- copies the user’s public key to a specified host’s `authorized_keys` file. 
ssh-copy-id also assigns proper permission to the remote-host’s home, ~/.ssh, and ~/.ssh/authorized_keys
In this case:
$ ssh-copy-id -i ~/.ssh/id_rsa your-user@localhost
If your system does not have an `ssh-copy-id` command, use something like this:
 $ cat ~/.ssh/id_rsa.pub | ssh your-user@localhost "cat -> ~/.ssh/authorized_keys"

PASSWORDLESS SUDO                                                           |

You need to have passwordless sudo rights on localhost. This is done by editing the sudoers file (/etc/sudoers). Use caution when editing this file, as introducing errors will lock you out of the system. Therefore, it is recommended to edit this file through the visudo command.
The sudoers file should have a line like this (replace your-user):
> your-user    ALL=(ALL)   NOPASSWD: ALL

CRON 

+ https://help.ubuntu.com/community/CronHowto

AUTOMATIC BACKUP                                                            |

The loss of critical data can prove devastating. Still, millions of professionals ignore backing up their data. While individual reasons vary, one of the most common explanations is that performing routine backups can be a real chore. Because machines excel at mundane and repetitive tasks, the key to reducing the inherent drudgery and the natural human tendency for procrastination, is to automate the backup process.
More dW content related to: how to automate scp
If you use Linux, you already have access to extrƒemely powerful tools for creating custom backup solutions. The solutions in this article can help you perform simple to more advanced and secure network backups using open source tools that are part of nearly every Linux distribution.
Simple backups
This article follows a step-by-step approach that is quite straightforward once you follow the basic steps.
Let's begin with a simple, yet powerful archive mechanism on our way to a more advanced distributed backup solution. Let's examine a handy script called arc, which will allow us to create backup snapshots from a Linux shell prompt.
Listing 1. The arc shell script
  #!/bin/sh
  tar czvf $1.$(date +%Y%m%d%-%H%M%S).tgz $1
  exit $?
The arc script accepts a single file or directory name as a parameter and creates a compressed archive file with the current date embedded into the resulting archive file's name. For example, if you have a directory called beoserver, you can invoke the arc script, passing it the beoserver directory name to create a compressed archive such as: beoserver.20040321-014844.tgz
The use of the date command to embed a date and timestamp helps to organize your archived files. The date format is Year, Month, Day, Hour, Minutes, and Seconds ++ although the use of the seconds field is perhaps a bit much. View the man page for the date command (man date) to learn about other options. Also, in Listing 1, we pass the -v (verbose) option to tar. This causes tar to display all of the files it's archiving. Remove the -v option if you'd like the backup to proceed silently.
Listing 2. Archiving the beoserver directory
  $ ls
  arc  beoserver
  $ ./arc beoserver
  beoserver/
  beoserver/bookl.dat
  beoserver/beoserver_ab_off
  beoserver/beoserver_ab_on
  $ ls
  arc  beoserver  beoserver.20040321-014844.tgz
Advanced backups
This simple backup example is useful; however, it still includes a manual backup process. The industry's best practices recommend backing up often, onto multiple media, and to separate geographic locations. The central idea is to avoid relying entirely on any single storage media or single location.
We'll tackle this challenge in our next example, where we'll examine a fictitious distributed network, illustrated in Figure 1, which shows a system administrator with access to two remote servers and an offsite data storage server.
Figure 1. Distributed network
The backup files on Server #1 and #2 will be securely transmitted to the offsite storage server, and the entire distributed backup process will occur on a regular basis without human intervention. We'll use a set of standard tools that are part of the Open Secure Shell tool suite (OpenSSH), as well as the tape archiver (tar), and the cron task scheduling service. Our overall plan will be to use cron for scheduling, shell programming and the tar application during the backup process, OpenSSH secure shell (ssh) encryption for remote access, and authentication, and secure shell copy (scp) to automate file transfers. Be sure to review each tool's man page for additional information.
Secure remote access using public/private keys
In the context of digital security, a key is a piece of data which is used to encrypt or decrypt other pieces of data. The public and private key scheme is interesting because data encrypted with a public key can only be decrypted with the associated private key. You may freely distribute a public key so that others can encrypt the messages they send you. One of the reasons that public/private key schemes have revolutionized digital security is because the sender and receiver don't have to share a common password. Among other things, public/private key cryptography has made e-commerce and other secure transactions possible. In this article, we'll create and use public and private keys to create a highly secure distributed backup solution.
Each machine involved in the backup process must be running the OpenSSH secure shell service (sshd) with port 22 accessible through any intermediate firewall. If you access remote servers, then there is a good chance you're already using secure shell.
Our goal will be to provide machines with secure access without requiring the need to manually provide passwords. Some people think that the easiest way to do this is to set up password-less access: do not do this. It is not secure. Instead, the approach we'll use in this article will take perhaps an hour of your time, set up a system which gives all the convenience of "passphraseless" accounts ++ but is recognized as being highly secure.
Let's begin by ensuring that OpenSSH is installed and proceed to check its version number. At the time this article was written, the latest OpenSSH release was version 3.8, released on February 24, 2004. You should consider using a recent and stable release, and at the very least use a release which is newer than version 2.x. Visit the OpenSSH Security page for details regarding older version-specific vulnerabilities (see the link in Resources later in this article). At this point in time, OpenSSH is quite stable and has proven to be immune to many of the vulnerabilities which have been reported for other SSH tools.
At a shell prompt, type ssh with the capital V option to check the version number:
$ ssh -V
OpenSSH_3.5p1, SSH protocols 1.5/2.0, OpenSSL 0x0090701f
If ssh returns a version number greater than 2.x, the machine is in relatively good shape. However, it is recommended that you use the latest stable releases of all software, and this is especially important for security-related software.
Our first step is to log in to the offsite storage server machine using the account, which will have the privilege of being able to access servers 1 and 2 (see Figure 1).
$ ssh accountname@somedomain.com
Once logged on to the offsite storage machine, use the ssh-keygen program to create
a public/private key pair using the -t dsa option. The -t option is required, and is used
to specify the type of encryption key we're interested in generating. We'll use the Digital
Signature Algorithm (DSA), which will enable us to use the newer SSH2 protocol.
See the ssh-keygen man page for more details.
During the execution of ssh-keygen, you'll be prompted for the location where the ssh
keys will be stored before you're asked for a passphrase. Simply press enter when asked
where to save the key and the ssh-keygen program will create a hidden directory called .ssh
(if one doesn't already exist) along with two files, a public and private key file.
An interesting feature of ssh-keygen is that it will allow you to simply press enter
when prompted for a passphrase. If you don't supply a passphrase, then ssh-keygen will
generate keys which are not encrypted! As you can imagine, this isn't a good idea.
When asked for a passphrase, make sure to enter a reasonably long string message which
contains alphanumeric characters rather than a simple password string.
Listing 3. Always choose a good passphrase
  [offsite]:$ ssh-keygen -t dsa
  Generating public/private dsa key pair.
  Enter file in which to save the key (/home/accountname/.ssh/id_dsa):
  Enter passphrase (empty for no passphrase): (enter passphrase)
  Enter same passphrase again: (enter passphrase)
  Your identification has been saved in /home/accountname/.ssh/id_dsa.
  Your public key has been saved in /home/accountname/.ssh/id_dsa.pub.
  The key fingerprint is:
  7e:5e:b2:f2:d4:54:58:6a:fa:6b:52:9c:da:a8:53:1b accountname@offsite
Because the .ssh directory which ssh-keygen creates is a hidden "dot" directory,
pass the -a option to the ls command to view the newly created directory:
[offsite]$ ls -a
. .. .bash_logout .bash_profile .bashrc .emacs .gtkrc .ssh
Enter the hidden .ssh directory and list the contents:
[offsite]$ cd .ssh
[offsite]$ ls -lrt
id_dsa id_dsa.pub
We now have a private key (id_dsa) and a public key (id_dsa.pub) in the hidden .ssh directory.
You can examine the contents of each key file using a text editor such as vi or emacs,
or simply by using the less or cat commands. You'll notice that the contents consist of
alphanumeric characters encoded in base64.
Next, we need to copy and install the public key on servers 1 and 2.
Do not use ftp. Rather, use the secure copy program to transmit the public keys
onto each of the remote machines:
Listing 4. Installing the public keys on the remote servers
  [offsite]$ scp .ssh/id_dsa.pub accountname@server1.com:offsite.pub
  accountname@server1.com's password: (enter password, not new
  passphrase!)
  id_dsa.pub 100% |*****************************| 614 00:00
  [offsite]$ scp .ssh/id_dsa.pub accountname@server2.com:offsite.pub
  accountname@server2.com's password: (enter password, not new
  passphrase!)
  id_dsa.pub 100% |*****************************| 614 00:00
After we install the new public keys, we'll be able to sign on to each machine
using the passphrase we specified when creating the private and public keys.
For now, log in to each machine and append the contents of the offsite.pub
file to a file called authorized_keys, which is stored in each remote machine's .ssh directory.
We can use a text editor or simply use the cat command to append the offsite.pub
file's contents onto the authorized_keys file:
Listing 5. Add offsite.pub to your list of authorized keys
  [offsite]$ ssh accountname@server1.com
  accountname@server1.com's password: (enter password, not new
  passphrase!)
  [server1]$ cat offsite.pub >> ./ssh/authorized_keys
The next step involves employing a bit of extra security. First, we change the access rights for the .ssh directory so that only the owner has read, write, and execute privileges. Next, we'll make sure that the authorized_keys file can only be accessed by the owner. And finally, we'll remove the previously uploaded offsite.pub key file, since it's no longer required. It's important to ensure that access permissions are properly set because the OpenSSH server may refuse to use keys which have non-secure access rights.
Listing 6. Changing permissions with chmod
  [server1]$ chmod 700 .ssh
  [server1]$ chmod 600 ./ssh/authorized_keys
  [server1]$ rm offsite.pub
  [server1]$ exit
After completing the same process on server2, we are ready to return to the offsite storage machine to test the new passphrase type access. >From the offsite server you could type the following:
[offsite]$ ssh -v accountname@server1.com
Use the -v, or verbose flag option, to display debugging information while verifying that your account is now able to access the remote server using the new passphrase rather than the original password. The debug output displays important information which you might not otherwise see, in addition to offering a high level view of how the authentication process works. You won't need to specify the -v flag on subsequent connections; but it is quite useful to do so while testing a connection.
Automating machine access using ssh-agent
The ssh-agent program acts like a gatekeeper, securely providing access to security keys as needed. Once ssh-agent is started, it sits in the background and makes itself available to other OpenSSH applications such as ssh and scp programs. This allows the ssh program to request an already decrypted key, rather than asking you for the private key's secret passphrase each time it's required.
Let's take a closer look at ssh-agent. When ssh-agent runs it outputs shell commands:
Listing 7. ssh-agent in action
  [offsite]$ ssh-agent
  SSH_AUTH_SOCK=/tmp/ssh-XX1O24LS/agent.14179; export SSH_AUTH_SOCK;
  SSH_AGENT_PID=14180; export SSH_AGENT_PID;
  echo Agent pid 14180;
We can instruct the shell to execute the output commands which ssh-agent displays using the shell's eval command:
[offsite]$ eval `ssh-agent`
Agent pid 14198
The eval command tells the shell to evaluate (execute) the commands generated by the ssh-agent program. Make sure that you specify the back-quote character (`) and not a single quote! Once executed, the eval `ssh-agent` statement will return the agent's process identifier. Behind the scenes, the SSH_AUTH_SOCK and SSH_AGENT_PID shell variables have been exported and are now available. You can view their values by displaying them to the shell console:
[offsite]$ echo $SSH_AUTH_SOCK
/tmp/ssh-XX7bhIwq/agent.14197
The $SSH_AUTH_SOCK (short for SSH Authentication Socket) is the location of a local socket which applications can use to speak to ssh-agent. To ensure that the SSH_AUTH_SOCK and SSH_AGENT_PID variables are always registered, enter the eval `ssh-agent` statement into your ~/.bash_profile.
ssh-agent has now become a background process which is visible using the top and ps commands.
Now we're ready to share our passphrase with ssh-agent. To do so, we must use a program called ssh-add, which adds (sends) our passphrase to the running ssh-agent program.

Listing 8. ssh-add for hassle-free login
  [offsite]$ ssh-add
  Enter passphrase for /home/accountname/.ssh/id_dsa: (enter passphrase)
  Identity added: /home/accountname/.ssh/id_dsa
  (/home/accountname/.ssh/id_dsa)

Now when we access server1, we're not prompted for a passphrase:
[offsite]$ ssh accountname@server1.com
[server1]$ exit
If you're not convinced, try removing (kill -9) the ssh-agent process and reconnecting to server1. This time, you'll notice that server1 will request the passphrase for the private key stored in the id_dsa file in the .ssh directory:
[offsite]$ kill -9 $SSH_AGENT_PID
[offsite]$ ssh accountname@server1.com
Enter passphrase for key '/home/accountname/.ssh/id_dsa':
Simplifying key access using keychain
So far, we've learned about several OpenSSH programs (ssh, scp, ssh-agent and ssh-add), and we've created and installed private and public keys to enable a secure and automated login process. You may have realized that most of our setup work only has to be done once. For example, the process of creating the keys, installing them, and getting ssh-agent to execute via a .bash_profile only has to be done once per machine. That's the really good news.
The less than ideal news is that ssh-add must be invoked each time we sign on to the offsite machine and ssh-agent isn't immediately compatible with the cron scheduling process which we'll need to automate our backups. The reason that cron processes can't communicate with ssh-agent is that cron jobs are executed as child processes by cron and thus do not inherit the $SSH_AUTH_SOCK shell variable.
Fortunately, there is a solution which not only eliminates limitations associated with ssh-agent and ssh-add, but also allows us to use cron to automate all sorts of processes requiring secure passwordless access to other machines. In his 2001 three-part developerWorks series, OpenSSH key management (see Resources for a link), Daniel Robbins presented a shell script called keychain, which is a front-end to ssh-add and ssh-agent and which simplifies the entire passwordless process. Over time, the keychain script has undergone a number of improvements and is now maintained by Aron Griffis, with a recent 2.3.2-1 release posted on June 17, 2004.
The keychain shell script is a bit too large to list in this article because the well-written script includes lots of error checking, ample documentation, and a generous serving of cross-platform code. However, keychain can be quickly downloaded from the project's Web site (see Resources for a link).
Once you download and install keychain, using it is remarkably easy. Simply log in to each machine and add the following two lines to each .bash_profile:
keychain id_dsa
. ~/.keychain/$HOSTNAME-sh
The first time you log back in to each machine, keychain will prompt you for the passphrase. However, keychain won't ask you to reenter the passphrase on subsequent login attempts unless the machine has been restarted. Best of all, cron tasks are now able to use OpenSSH commands to securely access remote machines without requiring the interactive use of passphrases. Now we have the best of both worlds, added security and ease of use.

Listing 9. Initializing keychain on each machine
  KeyChain 2.3.2; http://www.gentoo.org/projects/keychain
  Copyright 2002-2004 Gentoo Technologies, Inc.; Distributed under the
  GPL
  * Initializing /home/accountname/.keychain/localhost.localdomain-sh
  file...
  * Initializing /home/accountname/.keychain/localhost.localdomain-csh
  file...
  * Starting ssh-agent
  * Adding 1 key(s)...
  Enter passphrase for /home/accountname/.ssh/id_dsa: (enter passphrase)

Scripting a backup process
Our next task is to create the shell scripts, which will perform the necessary backup operations. The goal is to perform a complete database backup of servers 1 and 2. In our example, each server is running the MySQL database server and we'll use the mysqldump command-line utility to export a few database tables to an SQL import file.
Listing 10. The dbbackup.sh shell script for server 1
  #!/bin/sh
  # change into the backup_agent directory where data files are stored.
  cd /home/backup_agent
  # use mysqldump utility to export the sites database tables
  mysqldump -u sitedb -pG0oDP@sswrd --add-drop-table sitedb --tables
  tbl_ccode tbl_machine tbl_session tbl_stats > userdb.sql
  # compress and archive
  tar czf userdb.tgz userdb.sql
On server 2, we'll place a similar script which backs up the unique tables present in the site's database. Each script is flagged as executable using:
[server1]:$ chmod +x dbbackup.sh
With a dbbackup.sh file on servers 1 and 2, we return to the offsite data server, where we'll create a shell script to invoke each remote dbbackup.sh script prior to initiating a transfer of the compressed (.tgz) data files.
Listing 11. backup_remote_servers.sh shell script for use on the offsite data server
  #!/bin/sh
  # use ssh to remotely execute the dbbackup.sh script on server 1
  /usr/bin/ssh backup_agent@server1.com "/home/backup_agent/dbbackup.sh"
  # use scp to securely copy the newly archived userdb.tgz file
  # from server 1.  Note the use of the date command to timestamp
  # the file on the offsite data server.
  /usr/bin/scp backup_agent@server1.com:/home/backup_agent/userdb.tgz
  /home/backups/userdb-$(date +%Y%m%d-%H%M%S).tgz
  # execute dbbackup.sh on server 2
  /usr/bin/ssh backup_agent@server2.com "/home/backup_agent/dbbackup.sh"
  # use scp to transfer transdb.tgz to offsite server.
  /usr/bin/scp backup_agent@server2.com:/home/backup_agent/transdb.tgz
  /home/backups/transdb-$(date +%Y%m%d-%H%M%S).tgz
The backup_remote_servers.sh shell script uses the ssh command to execute a script on the remote servers. Because we've set up passwordless access, the ssh command is able to execute commands on servers 1 and 2 remotely from the offsite server. The entire authentication process is now handled automatically, thanks to keychain.
Scheduling
Our next and final task involves scheduling the execution of the backup_remote_servers.sh shell script on the offsite data storage server. We'll add two entries to the cron scheduling server to request execution of the backup script twice per day, at 3:34 am and again at 8:34 pm. On the offsite server invoke the crontab program with the edit (-e) option.
[offsite]:$ crontab -e
The crontab invokes the default editor, as specified using the VISUAL or EDITOR shell environment variables. Next, type two entries and save and close the file.

Listing 12. Crontab entries on the offsite server
  34 3 * * * /home/backups/remote_db_backup.sh
  34 20 * * * /home/backups/remote_db_backup.sh
A crontab line contains two main sections, a time schedule section followed by a command section. The time schedule is divided into fields for specifying when a command should be executed:
Listing 13. Crontab format
         +---- minute
         | +----- hour
         | | +------ day of the month
         | | | +------ month
         | | | | +---- day of the week
         | | | | | +- command to execute
         | | | | | |
        34 3 * * * /home/backups/remote_db_backup.sh

Verifying your backups
You should routinely check your backups to ensure that the process is working correctly. Automating processes can remove unnecessary drudgery, but should never be a way of escaping due diligence. If your data is worth backing up, then it's also worth spot checking from time to time.
Consider adding a cron job to remind yourself to check your backups at least once per month. In addition, it's a good idea to change security keys every once in a while, and you can schedule a cron job to remind you of that as well.
Additional security precautions
For added security, consider installing and configuring an Intrusion Detection System (IDS), such as Snort, on each machine. Presumably, an IDS will notify you when an intrusion is underway or has recently occurred. With an IDS in place, you'll be able to add other levels of security such as digitally signing and encrypting your backups.
Popular open source tools such as GNU Privacy Guard (GnuPG), OpenSSL and ncrypt enable securing archive files via shell scripts, but doing so without the extra level of shielding that an IDS provides isn't recommended (see Resources for more information on Snort).
Conclusion
This article has shown you how to allow your scripts to execute on remote servers and how to perform secure and automated file transfers. I hope you'll feel inspired to start thinking about protecting your own valuable data and building new solutions using open source tools like OpenSSH and Snort.
About the author
 Carlos Justiniano is a software architect with Ecuity, Inc. His interests include communications and distributed computing. Carlos has written for a number of technical journals. He is also the founder and architect for the Linux-based ChessBrain project, which has been awarded a 2005 Guinness World Record involving distributed computation. You can reach him at carlos.justiniano@ecuityinc.com.
UPDATE AOS.LIB
+ All
UPDATE AOS.DIST
+ aos.dist/aos.community.server.war
+ aos.dist/aos.db.jar
+ aos.dist/aos.util.jar
DEPLOY WEBAPP
+ Backup C:\aos.community.server
+ C:\jakarta-tomcat-5.5.7\bin\shutdown.bat
+ Delete C:\aos.community.server
+ Copy aos.dist/aos.community.server.war to C:\
+ Change log4j
+ Dezip
+ Place Context.xml in C:\jakarta-tomcat-5.5.7\conf\
+ Configure conf\web.xml and set <servlet>
       <servlet-name>default</servlet-name>
       <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
       <init-param>
           <param-name>debug</param-name>
           <param-value>0</param-value>
       </init-param>
       <init-param>
           <param-name>listings</param-name>
           <param-value>false</param-value>
       </init-param>
       <load-on-startup>1</load-on-startup>
   </servlet>
+ Configure server.xml and set in the <Connector/> tag the URIEncoding="UTF-8" attribute
+ C:\jakarta-tomcat-5.5.7\bin\startup.bat
CREATE DB
+ !!! Migrate DB
+ Export DB-AOS
+ Backup aos.dist/DB-AOS directory
+ Delete aos.dist/DB-AOS directory
+ Launch AOSDBServerLauncher.bat
+ Launch AOSDBCreatorLauncher.bat
INSTALL OOo
+ Install Open Office 2.0
+ Set OFFICE_HOME=C:\Program Files\OpenOffice.org 2.0\
+ Set PATH=%OFFICE_HOME%\program\;%PATH%
+ Set CLASSPATH=%OFFICE_HOME%\program\classes\juh.jar

BENCHMARK                                                                   |

ab -c 10 -n 100000 http://localhost:8080/app/

GPG 

http://www.apache.org/dist/james/server/james-binary-2.3.2.tar.gz
http://www.apache.org/dist/james/server/james-binary-2.3.2.tar.gz.asc
http://www.apache.org/dist/james/KEYS
And tried verifying the signature for the download using:
gpg --import KEYS
gpg --verify apache-james-2.3.2.tar.gz.asc
gpg: Signature made Tue 11 Aug 2009 08:35:01 NZST using RSA key ID A6EE6908
gpg: Can't check signature: public key not found
This doesn't look good!
Looking through the KEYS file there doesn't appear to be a key for A6EE6908
Fetching the key from pgpkeys.mit.edu produces the following:
gpg --keyserver pgpkeys.mit.edu --recv-key A6EE6908
gpg: requesting key A6EE6908 from hkp server pgpkeys.mit.edu
gpg: key A6EE6908: public key "Robert Burrell Donkin (CODE SIGNING KEY) <rdonkin@apache.org>" imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)

And the fingerprint looks like this:
gpg --fingerprint A6EE6908
pub   8192R/A6EE6908 2009-08-07
    Key fingerprint = 597C 729B 0237 1932 E77C  B9D5 EDB8 C082 A6EE 6908
uid                  Robert Burrell Donkin (CODE SIGNING KEY) <rdonkin@apache.org>
sub   8192R/B800EFC1 2009-08-07
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann% gpg --import < KEYS
gpg: key 3592721E: "Henry Saputra (CODE SIGNING KEY) <hsaputra@apache.org>" not changed
gpg: key B876884A: "Chris Mattmann (CODE SIGNING KEY) <mattmann@apache.org>" not changed
gpg: key C601BCA7: public key "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>" imported
gpg: Total number processed: 3
gpg:               imported: 1  (RSA: 1)
gpg:              unchanged: 2
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann% $HOME/bin/verify_gpg_sigs
Verifying Signature for file gora-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:04:21 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:04:21 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-accumulo-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:39:30 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-accumulo-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:39:30 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-cassandra-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:40:05 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-cassandra-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:40:05 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-core-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:05:59 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-core-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:05:59 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-hbase-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:38:51 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-hbase-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:38:51 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-sql-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:40:41 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-sql-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:40:41 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-tutorial-0.2-src.tar.gz.asc
gpg: Signature made Thu Apr 19 09:41:16 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Verifying Signature for file gora-tutorial-0.2-src.zip.asc
gpg: Signature made Thu Apr 19 09:41:16 2012 PDT using RSA key ID C601BCA7
gpg: Good signature from "Lewis John McGibbney (CODE SIGNING KEY) <lewismc@apache.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 2A23 D53F 8D27 5CB6 91E1  89C1 F45E 7970 C601 BCA7
Checksums look good:
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann% $HOME/bin/verify_md5_checksums
md5sum: stat '*.bz2': No such file or directory
gora-0.2-src.tar.gz: OK
gora-accumulo-0.2-src.tar.gz: OK
gora-cassandra-0.2-src.tar.gz: OK
gora-core-0.2-src.tar.gz: OK
gora-hbase-0.2-src.tar.gz: OK
gora-sql-0.2-src.tar.gz: OK
gora-tutorial-0.2-src.tar.gz: OK
gora-0.2-src.zip: OK
gora-accumulo-0.2-src.zip: OK
gora-cassandra-0.2-src.zip: OK
gora-core-0.2-src.zip: OK
gora-hbase-0.2-src.zip: OK
gora-sql-0.2-src.zip: OK
gora-tutorial-0.2-src.zip: OK
[dhcp-78-195-249:~/tmp/gora-0.2] mattmann%
curl -O http://people.apache.org/~jghoman/giraph-0.1.0-incubating-rc0/giraph-0.1.0-incubating-src.tar.gz
curl -O http://people.apache.org/~jghoman/giraph-0.1.0-incubating-rc0/giraph-0.1.0-incubating-src.tar.gz.asc
curl -O http://people.apache.org/~jghoman/giraph-0.1.0-incubating-rc0/giraph-0.1.0-incubating-src.tar.gz.md5
curl -O http://www.apache.org/dist/incubator/giraph/KEYS
gpg --import KEYS
gpg: key 3D0C92B9: public key "Owen O'Malley (Code signing) <omalley@apache.org>" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   2  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 2u
$HOME/bin/verify_gpg_sigs
Verifying Signature for file giraph-0.1.0-incubating-src.tar.gz.asc
gpg: Signature made Tue Jan 31 14:50:26 2012 PST using RSA key ID FCA366B7
gpg: Can't check signature: No public key
gpg --verify giraph-0.1.0-incubating-src.tar.gz.asc giraph-0.1.0-incubating-src.tar.gz
$HOME/bin/verify_md5_checksums
md5sum: stat '*.bz2': No such file or directory
md5sum: stat '*.zip': No such file or directory
giraph-0.1.0-incubating-src.tar.gz: OK
MD5
---
http://raamdev.com/2008/howto-install-md5sum-sha1sum-on-mac-os-x/

BITTORRENT                                                                 |

ctorrent -s 1 -e 12 -C 32 -p 400 -u http://www.sumotracker.org/announce file.torrent
ctorrent  -d -s out-folder -e 12 -C 32 -i 173.12.23.23 -p 6881 file.torrent
I needed a command line BitTorrent client for my Fedora Core 6, and started to look for some options, I found ctorrent, which I could see has the options I may need, and as it is written in C should be fast, I know there is another one written in python also.
Let's see how to install and use this one. (ctorrent)
First we need to install it.
yum install ctorrent
(you will need extras repository for this)
If you run
ctorrent
with no arguments this is what you get.
CTorrent dnh2 Original code Copyright: YuHong(992126018601033)
WARNING: THERE IS NO WARRANTY FOR CTorrent. USE AT YOUR OWN RISK!!!
Generic Options:
-h/-H Show this message.
-x Decode metainfo(torrent) file only, don't download.
-c Check exist only. don't download.
-v Verbose output (for debugging).
Download Options:
-e int Exit while seed hours later. (default 72 hours)
-E num Exit after seeding to ratio (UL:DL).
-i ip Listen for connection on ip. (default all ip's)
-p port Listen port. (default 2706 -> 2106)
-s save_as Save file/directory/metainfo as...
-C cache_size Cache size,unit MB. (default 16MB)
-f Force seed mode. skip hash check at startup.
-b bf_filename Bit field filename. (use it carefully)
-M max_peers Max peers count.
-m min_peers Min peers count.
-z slice_size Download slice/block size, unit KB. (default 16, max 128).
-n file_number Which file download.
-D rate Max bandwidth down (unit KB/s)
-U rate Max bandwidth up (unit KB/s)
-P peer_id Set Peer ID [-CD0201-]
-S host:port Use CTCS server
Make metainfo(torrent) file Options:
-t With make torrent. must specify this option.
-u url Tracker's url.
-l piece_len Piece length.(default 262144)
eg.
hong> ctorrent -s new_filename -e 12 -C 32 -p 6881 eg.torrent
home page: http://ctorrent.sourceforge.net/
see also: http://www.rahul.net/dholmes/ctorrent/
bug report: dholmes@ct.boxmail.com
original author: bsdi@sina.com

IRC 

http://webchat.freenode.net/

(/connect freenode)
/server irc.freenode.net
/join #james

IRC Information.....

IRC Class - Basic IRC Commands

    IRC - Internet Relay Chat
    Helpful Tips
    Basic IRC Commands 

    

    mIRC Setup Tutorial
    PIRCH Setup Tutorial 

Just as you are able to surf the net with a few tricks to help make things easier, IRC is very similar. Below you will find some of the more common IRC commands that we use often. For a far more complete list, please visit our mIRC Commands page.

/join
    Type /join #channelname -- to join a channel of your choice 
    Example: /join #bossmom 
    What it looks like: 
      
    [18:44] *** Now talking in #beginner 
    --Op-- bossmom has joined the channel 
    [18:44] *** Topic is 'Beginner's Help/Chat Channel....All Are Welcome Here!! ®© [ENGLISH]' 
    [18:44] *** Set by X on Sun Jul 23 16:10:34

/me
    The /me is an action message. 
    Type /me 'does anything' 
    Example: /me waves hello 
    What it looks like: 
    * bossmom waves hello

/msg
    Type /msg nickname (message) to start a private chat. 
    Example: /msg puddytat Hey tat, how are you? 
    What it looks like: 
    -> *puddytat* Hey tat, how are you?

/nick
    /nick changes your nickname 
    Example: type /nick newnickname (limit 9 characters) 
    What it looks like: I typed /nick luv2quilt 
    *** bossmom is now known as luv2quilt

/notice
    A notice is used to send a short message to another person without opening up a private window. 
    Type /notice nickname (message) 
    Example: /notice badnick Please change your nickname for this family channel. 
    What it looks like: 
    -> -badnick- Please change your nickname for this family channel. 
/part
    Type /part -- to leave one channel 
    Type /partall -- to leave all the channels you are in

/ping
    Type /ping nickname. What this command does is give you the ping time, or lag time, between you and the person you pinged. Lag can be explained as the amount of time it takes for you to type your message and for others to read your messages. Unfortunately, lag is always a part of IRC, although most times it's not a problem, just a nuisance. 
    Example: /ping luv2quilt 
    What it looks like: 
    [19:04] -> [luv2quilt] PING 
    [19:04] [luv2quilt PING reply]: 0secs

/query
    Similar to the /msg, except it forces a window to pop open. 
    Type /query nickname (message) 
    Example: /query Sofaspud^ Sooo....what's new? 
    What it looks like: 
    <luv2quilt> soooo....what's new?

/quit
    Type /quit to leave IRC altogether. This disconnects mirc from the server. 
    Example: /quit Going out for dinner...nite all 
    What it looks like: 
    *** Quits: saca (Leaving)

/ignore
    Unfortunately, there will be times when you don't want to talk to someone, or else someone may be harassing you. 
    By typing /ignore nickname 3, you will not receive anymore messages from that person. 
    Example: /ignore luv2quilt 3 
    To Unignore them, type /ignore -r luv2quilt 3 
    What it looks like: 
    *** Added *!*bossmom@*.dialup.netins.net to ignore list 
    *** Removed *!*bossmom@*.dialup.netins.net from ignore list

/whois
    Type /whois nickname to see a bit more information about another user. You'll see what server another person is using, or what their ISP is. Pretty helpful when you don't recognize a nickname that wants to chat. You may recognize the IP, (Internet Protocol) and then feel more comfortable carrying on a conversation. You'll also be able to see what other channels a person is in, which might be a good indicator if you really want to talk with them or not. 
    Example: /whois bossmom 
    What it looks like: 
    luv2quilt is bossmom@elwo-01-094.dialup.netins.net * Enjoy the Journey........ 
    luv2quilt on @#bossmom 
    luv2quilt using Seattle.WA.US.Undernet.org the time for school is during a recession. 
    luv2quilt has been idle 18secs, signed on Sun Jul 23 18:47:26 
    luv2quilt End of /WHOIS list.

/chat
    This opens up a DCC/CHAT window to another user. What's nice about these is that you can continue to chat even if you get disconnected from your server. 
    Word of Caution: Do NOT accept dcc/chats nor dcc/gets from anyone that you don't know. 
    Type /chat nickname. 
    Example: /chat oddjob^ 
    What it looks like: 
    Chat with oddjob^ 
    Waiting for acknowledgement...

/help
    There's one more very helpful command, and probably the one you'll use a lot when first starting out. In fact, I still use it quite a lot, and that's the built-in help menu of mIRC. 
    Type /help, you'll see the the mIRC Help Menu open up. You can do a search from there, or you can type /help topic. Either way, a TON of information at your fingertips. 
    Example: /help Basic IRC Commands 

You are doing great so far. If you haven't yet read some Basic IRC Tips, I'd encourage you to take a peek, otherwise we are ready to setup your IRC client. Please choose one of the following clients you would like to learn:

    mIRC Setup Tutorial
    PIRCH Setup Tutorial 

Let's move on with the next step -- getting online with IRC :) 

MAC OSX                                                                     |

+ iTerm2
---
For Internet Recovery mode on boot by pressing CMD+OPTION(ALT)+R. you need to press before hearing the booting sound.
---
MAC-BE-KEYBOARD on UBUNTU
---
{ = ALT + (
[ = SHIFT + ALT + (
= SHIFT + ALT + L
~ = (FN +) ALT + N(-N)
\ = ALT + SFT + /
DELETE = FN BACKSPACE
ALT TAB Swich between applications
ALT @ Switch between windows
--- 
-------
NETWORK
-------
sudo scutil --set HostName eric
----------
SPOTLIGHT
---------
sudo mdutil -a -i off
sudo su
chmod 0000 /Library/Spotlight
chmod 0000 /System/Library/Spotlight
chmod 0000 /System/Library/CoreServices/Search.bundle
chmod 0000 /System/Library/PreferencePanes/Spotlight.prefPane
chmod 0000 /System/Library/Services/Spotlight.service
chmod 0000 /System/Library/Contextual Menu Items/SpotlightCM.plugin
chmod 0000 /System/Library/StartupItems/Metadata
chmod 0000 /usr/bin/mdimport
chmod 0000 /usr/bin/mdcheckschema
chmod 0000 /usr/bin/mdfind
chmod 0000 /usr/bin/mdls
chmod 0000 /usr/bin/mdutil
chmod 0000 /usr/bin/md
After a reboot, open a new Terminal and do sudo su to make a root shell, then:
rm -r /.Spotlight-V100
rm -r /private/var/tmp/mds
exit
sudo mdutil -E /
--------------
/System/Library/Frameworks/ScreenSaver.framework/Versions/A/Resources/ScreenSaverEngine.app
--------------
SCREEN RECORD
--------------
...
-----------------
Screen Capture #screenshot #printscreen
-----------------
Switch to the screen that you wan to to do screen capture
Hold down Apple key ⌘ + Shift + 3 and release all
then use your mouse to click on the screen
Done. You will see a picture file in at your desktop. That’s the screen capture picture.
You can also do a screen capture for a portion of your screen.
Switch to the screen that you wan to to do screen capture
Hold down Apple key ⌘ + Shift + 4 and release all key

ANDROID                                                                     |

mkdir android ; cd android ; repo init -u git://android.git.kernel.org/platform/manifest.git ; repo sync ; make"

CHROMIUM                                                                    |

javascript:(function(){ window.location.href='url1'; window.open('url2');})();

SPAM ASSASSIN                                                               |

apache-james roy.james@xemaps.com
http://wiki.apache.org/spamassassin/Rules/SL_HELO_NON_FQDN_1
http://wiki.apache.org/spamassassin/Rules/HELO_LOCALHOST
http://wiki.apache.org/spamassassin/Rules/RCVD_NUMERIC_HELO
http://wiki.apache.org/spamassassin/Rules/SPF_NEUTRAL

GRAPHITE                                                                    |

echo "gaugor:333|g" | nc -u graphite.qutics.com 8125
https://github.com/etsy/statsd

sudo apt-get install apache2

sudo mkdir /vol
sudo mount /dev/xvdf /vol
sudo cp /vol/000-default /etc/apache2/sites-enabled/
cat /vol/hosts
sudo vi /etc/hosts
---
10.47.144.106 echarles.net www.echarles.net blog.echarles.net edmond.echarles.net eleonore.echarles.net
10.47.144.106 ibayart.com www.ibayart.com blog.ibayart.com
10.47.144.106 u-mangate.com www.u-mangate.com blog.u-mangate.com
10.47.144.106 datalayer.io www.datalayer.io blog.datalayer.io
10.47.144.106 datashield.io www.datashield.io blog.datashield.io
10.47.144.106 datalayer.io www.datalayer.io blog.datalayer.io
10.47.144.106 datalayer.be www.datalayer.be blog.datalayer.be
10.47.144.106 place.io www.place.io blog.place.io
10.47.144.106 tipi.io www.tipi.io blog.tipi.io
10.47.144.106 placestory.com www.placestory.com blog.placestory.com
10.47.144.106 socialitude.com www.socialitude.com blog.socialitude.com

10.47.144.106 www.cib-bic.be www.cib-sa.be
10.47.144.106 www.credit-regional-wallon.be
---
vi /root/.bashrc
source /vol/.bash_profile
---
cd /vol
ls
lost+found
df
Filesystem           1K-blocks      Used Available Use% Mounted on
/dev/xvda1             8256952   1298868   6874200  16% /
tmpfs                  3826296         0   3826296   0% /dev/shm
/dev/xvdf             25803068    176196  24316152   1% /vol

If you wish this device to mount automatically when you reboot the server make sure you add this to your /etc/fstab file.
/dev/xvdf  /vol/    ext3    noatime,nodiratime        0   0

# more /etc/fstab
LABEL=cloudimg-rootfs   /    ext4   defaults    0 0
/dev/xvdf /vol auto noatime 0 0

cd /
rm -fr /opt # if needed...
sudo ln -s /vol opt
sudo ln -s /opt/env a
cd /var
sudo ln -s /opt/var-data data
cd 
ln -s /opt/env/dot-aos .aos
ln -s /opt/env/bash_profile .bash_profile
placestory-store-reset-restart.sh
jps

ssh-keygen -t rsa -P ""
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
ssh localhost

S3   

http://www.slideshare.net/echarles/savedfiles?s_title=storm-distributed-and-faulttolerant-realtime-computation&user_login=nathanmarz
http://s3.amazonaws.com/ppt-download/storm-strange-loop-110920101342-phpapp01.pdf?response-content-disposition=attachment&Signature=1jx8dEs5XsAUwVzFuxAbcR8Uqq8%3D&Expires=1354693255&AWSAccessKeyId=AKIAIW74DRRRQSO4NIKA
                                                    
 _____         _ _ 
 _  |___ ___|_|_|
    |_ -|  _| | |
|__|__|___|___|_|_|
                   
 #ascii                   
                                                    
Character   Hex Value   Decimal Value   Symbol
NewLine     -   -   <NL>
WhiteSPace  -   -   <WSP>
KanjiSPace (WideSpace)  -   -   <KSP>
NULL    00  0   <NULL>
StartOfHeading  01  1   <SOH>
StartofTeXt     02  2   <STX>
EndofTeXt   03  3   <ETX>
EndOfTrans.     04  4   <EOT>
ENQuiry     05  5   <ENQ>
ACKnowlege  06  6   <ACK>
BELL    07  7   <BELL>
BackSpace   08  8   <BS>
HorizTab    09  9   <HT>
LineFeed    0A  10  <LF>
VerticalTab     0B  11  <VT>
FormFeed    0C  12  <FF>
CarriageReturn  0D  13  <CR>
ShiftOut    0E  14  <SO>
ShiftIn     0F  15  <SI>
DataLinkEscape  10  16  <DLE>
DeviceControl1  11  17  <DC1>
DeviceControl2  12  18  <DC2>
DeviceControl3  13  19  <DC3>
DeviceControl4  14  20  <DC4>
NegativeAcK     15  21  <NAK>
SYNchron.Idle   16  22  <SYNI>
EndTransBlock   17  23  <ETB>
CANcel  18  24  <CAN>
EndofMedium     19  25  <EM>
SUBstitute  1A  26  <SUB>
ESCape  1B  27  <ESC>
FileSeparator   1C  28  <FS>
GroupSeparator  1D  29  <GS>
RecordSep.  1E  30  <RS>
UnitSeparator   1F  31  <US>
SPace   20  32  <SP>
!   21  33  -
"   22  34  -
#   23  35  -
$   24  36  -
%   25  37  -
&   26  38  -
'   27  39  -
(   28  40  -
)   29  41  -
*   2A  42  -
+   2B  43  -
,   2C  44  -
-   2D  45  -
.   2E  46  -
/   2F  47  -
0   30  48  -
1   31  49  -
2   32  50  -
3   33  51  -
4   34  52  -
5   35  53  -
6   36  54  -
7   37  55  -
8   38  56  -
9   39  57  -
:   3A  58  -
;   3B  59  -
<   3C  60  -
=   3D  61  -
>   3E  62  -
?   3F  63  -
@   40  64  -
A   41  65  -
B   42  66  -
C   43  67  -
D   44  68  -
E   45  69  -
F   46  70  -
G   47  71  -
H   48  72  -
I   49  73  -
J   4A  74  -
K   4B  75  -
L   4C  76  -
M   4D  77  -
N   4E  78  -
O   4F  79  -
P   50  80  -
Q   51  81  -
R   52  82  -
S   53  83  -
T   54  84  -
U   55  85  -
V   56  86  -
W   57  87  -
X   58  88  -
Y   59  89  -
Z   5A  90  -
[   5B  91  -
\   5C  92  -
]   5D  93  -
^   5E  94  -
_   5F  95  -
`   60  96  -
a   61  97  -
b   62  98  -
c   63  99  -
d   64  100     -
e   65  101     -
f   66  102     -
g   67  103     -
h   68  104     -
i   69  105     -
J   6A  106     -
k   6B  107     -
l   6C  108     -
m   6D  109     -
n   6E  110     -
o   6F  111     -
p   70  112     -
q   71  113     -
r   72  114     -
s   73  115     -
t   74  116     -
u   75  117     -
v   76  118     -
w   77  119     -
x   78  120     -
y   79  121     -
z   7A  122     -
{   7B  123     -
  7C  124     -
}   7D  125     -
~   7E  126     -
DELete  7F  127     -


Determine and change file character encoding
Determine what character encoding is used by a file

file -bi [filename]

Example output:

steph@localhost ~ $ file -bi test.txt
text/plain; charset=us-ascii

Use vim to change a file's encoding

If you use the vim text editor, you can configure it to save files as utf-8. Place the following in your /etc/vim/vimrc or ~/.vimrc file:

set encoding=utf-8
set fileencoding=utf-8

You will only notice a difference in the encoding if you edit the file and add unicode (utf-8) characters (most character keys on the keyboard will create a unicode equivalent if you hold down the alt key). Start vim, edit the file and add some unicode characters. If you create a test file containing the following...

steph@localhost ~ $ cat utf8test.txt
abcdefghijklmnopqrstuvwxyz
á ãä  ç éêëìíîïðñò  õö øùú

...then the file command should tell you the file is utf-8:

steph@localhost ~ $ file -bi utf8test.txt
text/plain; charset=utf-8

If you then remove the UTF-8 characters and save the file, it will be us-ascii again.
Change a file's encoding from the command line

To convert the file contents to from ASCII to UTF-8:

iconv -f ascii -t utf8 [filename] > [newfilename]

Or

recode UTF-8 [filename]

To convert the file contents from UTF-8 to ASCII:

iconv -f utf8 -t ascii [filename]

Because UTF-8 can contain characters that can't be encoded with ASCII, this command will generate an error unless you tell it to strip non-ASCII characters using the -c flags:

steph@localhost ~ $ iconv -f utf-8 -t ascii utf8test.txt
abcdefghijklmnopqrstuvwxyz
iconv: illegal input sequence at position 27
steph@localhost ~ $ iconv -c -f utf-8 -t ascii utf8test.txt
abcdefghijklmnopqrstuvwxyz
       

A similar thing can be achieved using the -f flag with the recode command.

steph@localhost ~ $ recode ascii utf8test.txt
recode: utf8test.txt failed: Invalid input in step `ANSI_X3.4-1968..CHAR'
steph@localhost ~ $ recode -f ascii utf8test.txt
steph@localhost ~ $ cat utf8test.txt
abcdefghijklmnopqrstuvwxyz
       

Warning: If you use the iconv -c flag or the recode -f flag, you could loose characters.
Change the filename encoding

To convert the filename from ascii to UTF-8:

Warning: Run this without the --notest option first, to make sure there will be no problems.

convmv -f ascii -t utf8 --notest [filename] > [newfilename]


LESS 

less +G file1

G end of file
g begin of file
b, or Page Up   move backward one page
y, k, or Up     move backward one line
f, Space, or Page Down  move forward one page
e, j, Down, or Enter     move forward one line
/characters     search forward in the file for lines containing the specified characters
?characters     search backward in the file ...
n     repeat the previous search
:e file_name     examine a new file
:n     examine the next file
:p     examine the previous file
h, or ?     display help
q     quit
/string    Search forward for string
?string    Search back for string
n    Search for next instance of string
N    Search for previous instance of string

less file1 file2 file3
When viewing several files at the same time, you can use :n for examining the next file and :p for the previous file.


VI   

vi +36 foo.c
:36
SHIFT+g     Goto line number
---
/string     Search forward for occurrence of string in text
?string     Search backward for occurrence of string in text
n           Search for next instance of string
N           Search for previous instance of string
CTRL+b      Page up
CTRL+f      Page down
G           End of file
g           Begin of file
:set        Nu(mber) show line numbers
:.=         Returns line number of current line at bottom of screen
:=          Returns the total number of lines at bottom of screen
^g          Provides the current line number, along with the total number of lines, in the file at the bottom of the screen

see escape characters
:set list
:set nolist

The UNIX vi editor is a full screen editor and has two modes of operation:
       Command mode commands which cause action to be taken on the file, and
       Insert mode in which entered text is inserted into the file.
   In the command mode, every character typed is a command that does something to the text file being edited; a character typed in the command mode may even cause the vi editor to enter the insert mode. In the insert mode, every character typed is added to the text in the file; pressing the <Esc> (Escape) key turns off the Insert mode.
   While there are a number of vi commands, just a handful of these is usually sufficient for beginning vi users. To assist such users, this Web page contains a sampling of basic vi commands. The most basic and useful commands are marked with an asterisk (* or star) in the tables below. With practice, these commands should become automatic.
   NOTE: Both UNIX and vi are case-sensitive. Be sure not to use a capital letter in place of a lowercase letter; the results will not be what you expect.
   To use vi on a file, type in vi filename. If the file named filename exists, then the first page (or screen) of the file will be displayed; if the file does not exist, then an empty file and screen are created into which you may enter text.
*     vi filename     edit filename starting at line 1
     vi -r filename     recover filename that was being edited when system crashed
To Exit vi
   Usually the new or modified file is saved when you leave vi. However, it is also possible to quit vi without saving the file.
   Note: The cursor moves to bottom of screen whenever a colon (:) is typed. This type of command is completed by hitting the <Return> (or <Enter>) key.
*     :x<Return>     quit vi, writing out modified file to file named in original invocation
     :wq<Return>     quit vi, writing out modified file to file named in original invocation
     :q<Return>     quit (or exit) vi
*     :q!<Return>     quit vi even though latest changes have not been saved for this vi call
Moving the Cursor
   Unlike many of the PC and MacIntosh editors, the mouse does not move the cursor within the vi editor screen (or window). You must use the the key commands listed below. On some UNIX platforms, the arrow keys may be used as well; however, since vi was designed with the Qwerty keyboard (containing no arrow keys) in mind, the arrow keys sometimes produce strange effects in vi and should be avoided.
*    
   If you go back and forth between a PC environment and a UNIX environment, you may find that this dissimilarity in methods for cursor movement is the most frustrating difference between the two.
   In the table below, the symbol ^ before a letter means that the <Ctrl> key should be held down while the letter key is pressed.
*     j or <Return>
 [or down-arrow]     move cursor down one line
*     k [or up-arrow]     move cursor up one line
*     h or <Backspace>
 [or left-arrow]     move cursor left one character
*     l or <Space>
 [or right-arrow]     move cursor right one character
*     0 (zero)     move cursor to start of current line (the one with the cursor)
*     $     move cursor to end of current line
     w     move cursor to beginning of next word
     b     move cursor back to beginning of preceding word
     :0<Return> or 1G     move cursor to first line in file
     :n<Return> or nG     move cursor to line n
     :$<Return> or G     move cursor to last line in file
Screen Manipulation The following commands allow the vi editor screen (or window) to move up or down several lines and to be refreshed.
    ^f     move forward one screen
     ^b     move backward one screen
     ^d     move down (forward) one half screen
     ^u     move up (back) one half screen
     ^l     redraws the screen
     ^r     redraws the screen, removing deleted lines
Adding, Changing, and Deleting Text: Unlike PC editors, you cannot replace or delete text by highlighting it with the mouse. Instead use the commands in the following tables.
Perhaps the most important command is the one that allows you to back up and undo your last action. Unfortunately, this command acts like a toggle, undoing and redoing your most recent action. You cannot go back more than one step.
*     u     UNDO WHATEVER YOU JUST DID; a simple toggle
   The main purpose of an editor is to create, add, or modify text for a file.
Inserting or Adding Text
   The following commands allow you to insert and add text. Each of these commands puts the vi editor into insert mode; thus, the <Esc> key must be pressed to terminate the entry of text and to put the vi editor back into command mode.
*     i     insert text before cursor, until <Esc> hit
     I     insert text at beginning of current line, until <Esc> hit
*     a     append text after cursor, until <Esc> hit
     A     append text to end of current line, until <Esc> hit
*     o     open and put text in a new line below current line, until <Esc> hit
*     O     open and put text in a new line above current line, until <Esc> hit
Changing Text
   The following commands allow you to modify text.
*     r     replace single character under cursor (no <Esc> needed)
     R     replace characters, starting with current cursor position, until <Esc> hit
     cw     change the current word with new text,
starting with the character under cursor, until <Esc> hit
     cNw     change N words beginning with character under cursor, until <Esc> hit;
 e.g., c5w changes 5 words
     C     change (replace) the characters in the current line, until <Esc> hit
     cc     change (replace) the entire current line, stopping when <Esc> is hit
     Ncc or cNc     change (replace) the next N lines, starting with the current line,
stopping when <Esc> is hit
Deleting Text
   The following commands allow you to delete text.
*     x     delete single character under cursor
     Nx     delete N characters, starting with character under cursor
     dw     delete the single word beginning with character under cursor
     dNw     delete N words beginning with character under cursor;
 e.g., d5w deletes 5 words
     D     delete the remainder of the line, starting with current cursor position
*     dd     delete entire current line
     Ndd or dNd     delete N lines, beginning with the current line;
 e.g., 5dd deletes 5 lines
Cutting and Pasting Text
   The following commands allow you to copy and paste text.
     yy     copy (yank, cut) the current line into the buffer
     Nyy or yNy     copy (yank, cut) the next N lines, including the current line, into the buffer
     p     put (paste) the line(s) in the buffer into the text after the current line
Determining Line Numbers
   Being able to determine the line number of the current line or the total number of lines in the file being edited is sometimes useful.
     :.=     returns line number of current line at bottom of screen
     :=     returns the total number of lines at bottom of screen
     ^g     provides the current line number, along with the total number of lines,
in the file at the bottom of the screen
Saving and Reading Files
These commands permit you to input and output files other than the named file with which you are currently working.
     :r filename<Return>     read file named filename and insert after current line
(the line with cursor)
     :w<Return>     write current contents to file named in original vi call
     :w newfile<Return>     write current contents to a new file named newfile
     :12,35w smallfile<Return>     write the contents of the lines numbered 12 through 35 to a new file named smallfile
     :w! prevfile<Return>     write current contents over a pre-existing file named prevfile

Basic movement
h l k j  : : : character left, right; line up, down
b w  : : : : word/token left, right
ge e   : : : end of word/token left, right
{ }  : : : : beginning of previous, next paragraph
( )  :beginning of previous, next sentence
0 ^ $ : : :beginning, rst, last character of line
nG ngg   : line n, default the last, rst
n% : : :percentage n of the le (n must be provided)
nj  : : : column n of current line
%match of next brace, bracket, comment, #define
nH nL  : : : line n from start, bottom of window
M   : middle line of window

Insertion & replace ! insert mode
i a  insert before, after cursor
I A   : : insert at beginning, end of line
gI  : insert text in rst column
o O :open a new line below, above the current line
rc   : replace character under cursor with c
grc   : : like r, but without acting layout
R  : : : : replace characters starting at the cursor
gR   : : : like R, but without acting layout
cm : : : : change text of movement command m
cc or S  : : : : change current line
C  : : : change to the end of line
s   : : : change one character and insert
~   : : : : switch case and advance cursor
g~m  : : : switch case of movement command m
gum gUm: : : lowercase, uppercase text of movement m
<m >m  : shift left, right text of movement m
n<< n>>   shift n lines left, right

Deletion
x X   delete character under, before cursor
dm  delete text of movement command m
dd D  : : : : delete current line, to the end of line
J gJ  : : : join current line with next, without space
:rd -  : : : : delete range r lines
:rdx -  : : : : delete range r lines into register x
Insert mode
^Vc ^Vn  insert char c literally, decimal value n
^A   : : : : insert previously inserted text
^@ : :same as ^A and stop insert ! command mode
^Rx ^R^Rx  insert content of register x, literally
^N ^P  text completion before, after cursor
^W  : : delete word before cursor
^U  : delete all inserted character in current line
^D ^T  : shift left, right one shift width
^Kc1c2 or c1 c2   enter digraph fc1; c2g
^Oc  : : : execute c in temporary command mode
^X^E ^X^Y  : : : : scroll up, down
hesci or ^[  abandon edition ! command mode

Copying
"x  : : : use register x for next delete, yank, put
:reg -   : show the content of all registers
:reg x -   show the content of registers x
ym  : : yank the text of movement command m
yy or Y  :yank current line into register
p P  : : put register after, before cursor position
]p [p   : like p, P with indent adjusted
gp gP  : : like p, P leaving cursor after new text

Advanced insertion
g?m : perform rot13 encoding on movement m
n^A n^X   +n, n to number under cursor
gqm  : : format lines of movement m to xed width
:rce w -  : : center lines in range r to width w
:rle i -  : : left align lines in range r with indent i
:rri w -  : right align lines in range r to width w
!mc - : lter lines of movement m through command c
n!!c -   lter n lines through command c
:r!c -  lter range r lines through command c
Visual mode
v V ^V : : start/stop highlighting characters, lines, block
o : : : exchange cursor position with start of highlighting
gv  : : start highlighting on previous visual area
aw as ap  : : select a word, a sentence, a paragraph
ab aB   : select a block ( ), a block { }
Undoing, repeating & registers
u U  : undo last command, restore last changed line
. ^R  : :repeat last changes, redo last undo
n.  : repeat last changes with count replaced by n
qc qC: : : :record, append typed characters in register c
q   stop recording
@c   : : execute the content of register c
@@    : repeat previous @ command
:@c -  : : execute register c as an Ex command
:rg/p/c -  :execute Ex command c on range r
b where pattern p matches

Complex movement
+ +  line up, down on rst non-blank character
B W   : space-separated word left, right
gE E  : : end of space-separated word left, right
n  : : : down n  1 line on rst non-blank character
g0 gm  : : :beginning, middle of screen line
g^ g$  : : rst, last character of screen line
gk gj  : : : screen line up, down
fc Fc  : next, previous occurence of character c
tc Tc  : : : : before next, previous occurence of c
; ,  : : : : repeat last fFtT, in opposite direction
[[ ]]   start of section backward, forward
[] ][   : end of section backward, forward
[( ])   : : : unclosed (, ) backward, forward
[{ ]}   : : unclosed {, } backward, forward
[m ]m  : : : start of backward, forward Java method
[# ]#:unclosed #if, #else, #endif backward, forward
[* ]*  : start, end of /* */ backward, forward

Search & substitution
/s - ?s -  : : : : search forward, backward for s
/s/o - ?s?o -  search fwd, bwd for s with o
set o
n or / -   : : : repeat forward last search
N or ? -   : repeat backward last search
# * : : : search backward, forward for word under cursor
g# g*  : : : : same, but also nd partial matches
gd gD : : : local, global denition of symbol under cursor
:rs/f/t/x -   substitute f by t in range r
b x : g|all occurrences, c|conrm changes
:rs x -  : : repeat substitution with new r & x
This will display line numbers along the left side of a window:
:set number
You can also define a mapping to toggle the option, for example:
:nmap <C-N><C-N> :set invnumber<CR>
By pressing Ctrl-N twice in normal mode, Vim toggles between showing and hiding line numbers.
If you have Vim version 7 or greater, you can change the width of the "gutter" column used for numbering:
:set numberwidth=3
You can use the number column for the text of wrapped lines:
:set cpoptions+=n
Finally, you can change the color used for the line numbers. For example:
:highlight LineNr term=bold cterm=NONE ctermfg=DarkGrey ctermbg=NONE gui=NONE guifg=DarkGrey guibg=NONE


 ____          _____         
   \ ___ _ _|     |___ ___ 
 |  | -_| | |  |  | . |_ -|
|____/|___|\_/|_____|  _|___|
                    |_|      


+ 


```
 _____ ___ _____ 
|_   _| | |   __|
  | | |_  |   __|
  |_|   |_|__|   
                                                           
 #t4f-core
```


Tutorial on core languages used in the AOS libraries.


communities
+ apache
+ cran
+ eclipse
+ jboss
+ linux
+ mozilla
+ spring
+ ubuntu

technologies
+ ansible
+ c
+ docker.io
+ groovy
+ java
+ latex
+ maven
+ mozilla-apt
+ mozilla-javaxpcom
+ mustache.js
+ openoffice
+ palletops
+ qt
+ r
+ scala
+ svg
+ vert.x


GIT  

git checkout <branch-name> = git branch <branch-name>; git checkout <branch-name>; git pull origin <branch-name>
git checkout -b <branch-name> origin/<branch-name>
git branch -a
git branch -D <branch-name>
git push origin --delete <branch-name>
git remote add upstream git://github.com/octocat/Spoon-Knife.git
git fetch upstream
git push origin master
git fetch upstream
git merge upstream master
--------------
GIT COMPLETION
--------------
https://github.com/git/git/tree/master/contrib/completion
----------
GIT CLIENT
----------
git on linux
+ gitg
+ giggle
+ gitk
+ git-cola
svn co https://svn.github.com/echarles/openaos.git openaos
Global setup:
Download and install Git
 git config --global user.name "Eric Charles"
 git config --global user.email eric.charles@u-mangate.com
Next steps:
 mkdir openaos
 cd openaos
 git init
 touch README
 git add README
 git commit -m 'first commit'
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Existing Git Repo?
 cd existing_git_repo
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Importing a Subversion Repo?
 Click here
When you're done:
 Continue
mkdir test
git init --bare
git remote rm origin
git remote add origin git@aos.be:test
git push origin master
git remote show origin
git diff --no-prefix --staged
----------
----------
GIT SERVER
----------
http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux
How to set up your own private Git server on Linux
Update 2: as pointed out by Tim Huegdon, several comments on a Hacker News thread pointing here, and the excellent Pro Git book, Gitolite seems to be a better solution for multi-user hosted Git than Gitosis. I particularly like the branch–level permissions aspect, and what that means for business teams. I’ve left the original article intact.
Update: the ever–vigilant Mike West has pointed out that my instructions for permissions and git checkout were slightly askew. These errors have been rectified.
One of the things I’m attempting to achieve this year is simplifying my life somewhat. Given how much of my life revolves around technology, a large part of this will be consolidating the various services I consume (and often pay for). The mention of payment is important, as up until now I’ve been paying the awesome GitHub for their basic plan.
I don’t have many private repositories with them, and all of them are strictly private code (this blog; Amanda’s blog templates and styles; and some other bits) which don’t require collaborators. For this reason, paying money to GitHub (awesome though they may be) seemed wasteful.
So I decided to move all my private repositories to my own server. This is how I did it.
Set up the server
These instructions were performed on a Debian 5 “Lenny” box, so assume them to be the same on Ubuntu. Substitute the package installation commands as required if you’re on an alternative distribution.
First, if you haven’t done so already, add your public key to the server:
ssh myuser@server.com mkdir .ssh
scp ~/.ssh/id_rsa.pub myuser@server.com:.ssh/authorized_keys
Now we can SSH into our server and install Git:
ssh myserver.com
sudo apt-get update
sudo apt-get install git-core
…and that’s it.
Adding a user
If you intend to share these repositories with any collaborators, at this point you’ll either:
    Want to install something like Gitosis (outside the scope of this article, but this is a good, if old, tutorial); or
    Add a “shared” Git user.
We’ll be following the latter option. So, add a Git user:
sudo adduser git
Now you’ll need to add your public key to the Git user’s authorized_keys:
sudo mkdir /home/git/.ssh
sudo cp ~/.ssh/authorized_keys /home/git/.ssh/
sudo chown -R git:git /home/git/.ssh
sudo chmod 700 !$
sudo chmod 600 /home/git/.ssh/*
Now you’ll be able to authenticate as the Git user via SSH. Test it out:
ssh git@myserver.com
Add your repositories
If you were to not share the repositories, and just wanted to access them for yourself (like I did, since I have no collaborators), you’d do the following as yourself. Otherwise, do it as the Git user we added above.
If using the Git user, log in as them:
login git
Now we can create our repositories:
mkdir myrepo.git
cd !$
git --bare init
The last steps creates an empty repository. We’re assuming you already have a local repository that you just want to push to a remote server.
Repeat that last step for each remote Git repository you want.
Log out of the server as the remaining operations will be completed on your local machine.
Configure your development machine
First, we add the remotes to your local machine. If you’ve already defined a remote named origin (for example, if you followed GitHub’s instructions), you’ll want to delete the remote first:
git remote rm origin
Now we can add our new remote:
git remote add origin git@server.com:myrepo.git
git push origin master
And that’s it. You’ll probably also want to make sure you add a default merge and remote:
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
And that’s all. Now you can push/pull from origin as much as you like, and it’ll be stored remotely on your own myserver.com remote repository.
Bonus points: Make SSH more secure
This has been extensively covered by the excellent Slicehost tutorial, but just to recap:
Edit the SSH config:
sudo vi /etc/ssh/sshd_config
And change the following values:
Port 2207
...
PermitRootLogin no
...
AllowUsers myuser git
...
PasswordAuthentication no
Where 2207 is a port of your choosing. Make sure to add this so your Git remote:
git remote add origin ssh://git@myserver.com:2207/~/myrepo.git

SVN  

svn help
usage: svn <subcommand> [options] [args]
Subversion command-line client, version 1.6.15.
Type 'svn help <subcommand>' for help on a specific subcommand.
Type 'svn --version' to see the program version and RA modules
or 'svn --version --quiet' to see just the version number.
Most subcommands take file and/or directory arguments, recursing
on the directories.  If no arguments are supplied to such a
command, it recurses on the current directory (inclusive) by default.
Available subcommands:
 add
 blame (praise, annotate, ann)
 cat
 changelist (cl)
 checkout (co)
 cleanup
 commit (ci)
 copy (cp)
 delete (del, remove, rm)
 diff (di)
 export
 help (?, h)
 import
 info
 list (ls)
 lock
 log
 merge
 mergeinfo
 mkdir
 move (mv, rename, ren)
 propdel (pdel, pd)
 propedit (pedit, pe)
 propget (pget, pg)
 proplist (plist, pl)
 propset (pset, ps)
 resolve
 resolved
 revert
 status (stat, st)
 switch (sw)
 unlock
 update (up)
Changesets
Before we proceed further, we should warn you that there's going to be a lot of discussion of “changes” in the pages ahead. A lot of people experienced with version control systems use the terms “change” and “changeset” interchangeably, and we should clarify what Subversion understands as a changeset.
Everyone seems to have a slightly different definition of changeset, or at least a different expectation of what it means for a version control system to have one. For our purposes, let's say that a changeset is just a collection of changes with a unique name. The changes might include textual edits to file contents, modifications to tree structure, or tweaks to metadata. In more common speak, a changeset is just a patch with a name you can refer to.
In Subversion, a global revision number N names a tree in the repository: it's the way the repository looked after the Nth commit. It's also the name of an implicit changeset: if you compare tree N with tree N−1, you can derive the exact patch that was committed. For this reason, it's easy to think of revision N as not just a tree, but a changeset as well. If you use an issue tracker to manage bugs, you can use the revision numbers to refer to particular patches that fix bugs—for example, “this issue was fixed by r9238.” Somebody can then run svn log -r 9238 to read about the exact changeset that fixed the bug, and run svn diff -c 9238 to see the patch itself. And (as you'll see shortly) Subversion's svn merge command is able to use revision numbers. You can merge specific changesets from one branch to another by naming them in the merge arguments: passing -c 9238 to svn merge would merge changeset r9238 into your working copy.
svn propset svn:externals "eggtoolpalette -r853 http://svn.gnome.org/svn/libegg/trunk/libegg/toolpalette/" .
svn commit -m "Added eggtoolpalette"
svn update

MANAGEMENT                                                                  |



mvn aos.t4f:t4f-mvn-plugin-spl-1:sayhi
mvn aos.t4f:t4f-mvn-plugin-report-spl-1:my-report

INSTALL LOCAL JARS                                                          |

$ mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> -DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging>
$ mvn install:install-file -Dfile=<path-to-file> -DpomFile=<path-to-pomfile>
$ mvn install:install-file -Dfile=<path-to-file>

mvn install:install-file -Dfile=/d/org.eclipse.swt.gtk.linux.x86_64_3.102.1.v20130827-2048.jar -DgroupId=org.eclipse.swt -DartifactId=org.eclipse.swt.gtk.linux.x86_64 -Dversion=3 -Dpackaging=jar
http://maven.apache.org/skins/
http://maven.apache.org/skins/maven-fluido-skin/
http://andriusvelykis.github.io/reflow-maven-skin/

Read also
http://maven.apache.org/guides/mini/guide-site.html
http://maven.apache.org/skins/
http://maven.apache.org/skins/maven-fluido-skin/
http://andriusvelykis.github.io/reflow-maven-skin/

Read also
http://maven.apache.org/guides/mini/guide-site.html

GIT  

git checkout <branch-name> = git branch <branch-name>; git checkout <branch-name>; git pull origin <branch-name>
git checkout -b <branch-name> origin/<branch-name>
git branch -a
git branch -D <branch-name>
git push origin --delete <branch-name>
git remote add upstream git://github.com/octocat/Spoon-Knife.git
git fetch upstream
git push origin master
git fetch upstream
git merge upstream master
--------------
GIT COMPLETION
--------------
https://github.com/git/git/tree/master/contrib/completion
----------
GIT CLIENT
----------
git on linux
+ gitg
+ giggle
+ gitk
+ git-cola
svn co https://svn.github.com/echarles/openaos.git openaos
Global setup:
Download and install Git
 git config --global user.name "Eric Charles"
 git config --global user.email eric.charles@u-mangate.com
Next steps:
 mkdir openaos
 cd openaos
 git init
 touch README
 git add README
 git commit -m 'first commit'
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Existing Git Repo?
 cd existing_git_repo
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Importing a Subversion Repo?
 Click here
When you're done:
 Continue
mkdir test
git init --bare
git remote rm origin
git remote add origin git@aos.be:test
git push origin master
git remote show origin
git diff --no-prefix --staged
----------
----------
GIT SERVER
----------
http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux
How to set up your own private Git server on Linux
Update 2: as pointed out by Tim Huegdon, several comments on a Hacker News thread pointing here, and the excellent Pro Git book, Gitolite seems to be a better solution for multi-user hosted Git than Gitosis. I particularly like the branch–level permissions aspect, and what that means for business teams. I’ve left the original article intact.
Update: the ever–vigilant Mike West has pointed out that my instructions for permissions and git checkout were slightly askew. These errors have been rectified.
One of the things I’m attempting to achieve this year is simplifying my life somewhat. Given how much of my life revolves around technology, a large part of this will be consolidating the various services I consume (and often pay for). The mention of payment is important, as up until now I’ve been paying the awesome GitHub for their basic plan.
I don’t have many private repositories with them, and all of them are strictly private code (this blog; Amanda’s blog templates and styles; and some other bits) which don’t require collaborators. For this reason, paying money to GitHub (awesome though they may be) seemed wasteful.
So I decided to move all my private repositories to my own server. This is how I did it.
Set up the server
These instructions were performed on a Debian 5 “Lenny” box, so assume them to be the same on Ubuntu. Substitute the package installation commands as required if you’re on an alternative distribution.
First, if you haven’t done so already, add your public key to the server:
ssh myuser@server.com mkdir .ssh
scp ~/.ssh/id_rsa.pub myuser@server.com:.ssh/authorized_keys
Now we can SSH into our server and install Git:
ssh myserver.com
sudo apt-get update
sudo apt-get install git-core
…and that’s it.
Adding a user
If you intend to share these repositories with any collaborators, at this point you’ll either:
    Want to install something like Gitosis (outside the scope of this article, but this is a good, if old, tutorial); or
    Add a “shared” Git user.
We’ll be following the latter option. So, add a Git user:
sudo adduser git
Now you’ll need to add your public key to the Git user’s authorized_keys:
sudo mkdir /home/git/.ssh
sudo cp ~/.ssh/authorized_keys /home/git/.ssh/
sudo chown -R git:git /home/git/.ssh
sudo chmod 700 !$
sudo chmod 600 /home/git/.ssh/*
Now you’ll be able to authenticate as the Git user via SSH. Test it out:
ssh git@myserver.com
Add your repositories
If you were to not share the repositories, and just wanted to access them for yourself (like I did, since I have no collaborators), you’d do the following as yourself. Otherwise, do it as the Git user we added above.
If using the Git user, log in as them:
login git
Now we can create our repositories:
mkdir myrepo.git
cd !$
git --bare init
The last steps creates an empty repository. We’re assuming you already have a local repository that you just want to push to a remote server.
Repeat that last step for each remote Git repository you want.
Log out of the server as the remaining operations will be completed on your local machine.
Configure your development machine
First, we add the remotes to your local machine. If you’ve already defined a remote named origin (for example, if you followed GitHub’s instructions), you’ll want to delete the remote first:
git remote rm origin
Now we can add our new remote:
git remote add origin git@server.com:myrepo.git
git push origin master
And that’s it. You’ll probably also want to make sure you add a default merge and remote:
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
And that’s all. Now you can push/pull from origin as much as you like, and it’ll be stored remotely on your own myserver.com remote repository.
Bonus points: Make SSH more secure
This has been extensively covered by the excellent Slicehost tutorial, but just to recap:
Edit the SSH config:
sudo vi /etc/ssh/sshd_config
And change the following values:
Port 2207
...
PermitRootLogin no
...
AllowUsers myuser git
...
PasswordAuthentication no
Where 2207 is a port of your choosing. Make sure to add this so your Git remote:
git remote add origin ssh://git@myserver.com:2207/~/myrepo.git

SVN  

svn help
usage: svn <subcommand> [options] [args]
Subversion command-line client, version 1.6.15.
Type 'svn help <subcommand>' for help on a specific subcommand.
Type 'svn --version' to see the program version and RA modules
or 'svn --version --quiet' to see just the version number.
Most subcommands take file and/or directory arguments, recursing
on the directories.  If no arguments are supplied to such a
command, it recurses on the current directory (inclusive) by default.
Available subcommands:
 add
 blame (praise, annotate, ann)
 cat
 changelist (cl)
 checkout (co)
 cleanup
 commit (ci)
 copy (cp)
 delete (del, remove, rm)
 diff (di)
 export
 help (?, h)
 import
 info
 list (ls)
 lock
 log
 merge
 mergeinfo
 mkdir
 move (mv, rename, ren)
 propdel (pdel, pd)
 propedit (pedit, pe)
 propget (pget, pg)
 proplist (plist, pl)
 propset (pset, ps)
 resolve
 resolved
 revert
 status (stat, st)
 switch (sw)
 unlock
 update (up)
Changesets
Before we proceed further, we should warn you that there's going to be a lot of discussion of “changes” in the pages ahead. A lot of people experienced with version control systems use the terms “change” and “changeset” interchangeably, and we should clarify what Subversion understands as a changeset.
Everyone seems to have a slightly different definition of changeset, or at least a different expectation of what it means for a version control system to have one. For our purposes, let's say that a changeset is just a collection of changes with a unique name. The changes might include textual edits to file contents, modifications to tree structure, or tweaks to metadata. In more common speak, a changeset is just a patch with a name you can refer to.
In Subversion, a global revision number N names a tree in the repository: it's the way the repository looked after the Nth commit. It's also the name of an implicit changeset: if you compare tree N with tree N−1, you can derive the exact patch that was committed. For this reason, it's easy to think of revision N as not just a tree, but a changeset as well. If you use an issue tracker to manage bugs, you can use the revision numbers to refer to particular patches that fix bugs—for example, “this issue was fixed by r9238.” Somebody can then run svn log -r 9238 to read about the exact changeset that fixed the bug, and run svn diff -c 9238 to see the patch itself. And (as you'll see shortly) Subversion's svn merge command is able to use revision numbers. You can merge specific changesets from one branch to another by naming them in the merge arguments: passing -c 9238 to svn merge would merge changeset r9238 into your working copy.
svn propset svn:externals "eggtoolpalette -r853 http://svn.gnome.org/svn/libegg/trunk/libegg/toolpalette/" .
svn commit -m "Added eggtoolpalette"
svn update

MANAGEMENT                                                                  |




GIT  

git checkout <branch-name> = git branch <branch-name>; git checkout <branch-name>; git pull origin <branch-name>
git checkout -b <branch-name> origin/<branch-name>
git branch -a
git branch -D <branch-name>
git push origin --delete <branch-name>
git remote add upstream git://github.com/octocat/Spoon-Knife.git
git fetch upstream
git push origin master
git fetch upstream
git merge upstream master
--------------
GIT COMPLETION
--------------
https://github.com/git/git/tree/master/contrib/completion
----------
GIT CLIENT
----------
git on linux
+ gitg
+ giggle
+ gitk
+ git-cola
svn co https://svn.github.com/echarles/openaos.git openaos
Global setup:
Download and install Git
 git config --global user.name "Eric Charles"
 git config --global user.email eric.charles@u-mangate.com
Next steps:
 mkdir openaos
 cd openaos
 git init
 touch README
 git add README
 git commit -m 'first commit'
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Existing Git Repo?
 cd existing_git_repo
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Importing a Subversion Repo?
 Click here
When you're done:
 Continue
mkdir test
git init --bare
git remote rm origin
git remote add origin git@aos.be:test
git push origin master
git remote show origin
git diff --no-prefix --staged
----------
----------
GIT SERVER
----------
http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux
How to set up your own private Git server on Linux
Update 2: as pointed out by Tim Huegdon, several comments on a Hacker News thread pointing here, and the excellent Pro Git book, Gitolite seems to be a better solution for multi-user hosted Git than Gitosis. I particularly like the branch–level permissions aspect, and what that means for business teams. I’ve left the original article intact.
Update: the ever–vigilant Mike West has pointed out that my instructions for permissions and git checkout were slightly askew. These errors have been rectified.
One of the things I’m attempting to achieve this year is simplifying my life somewhat. Given how much of my life revolves around technology, a large part of this will be consolidating the various services I consume (and often pay for). The mention of payment is important, as up until now I’ve been paying the awesome GitHub for their basic plan.
I don’t have many private repositories with them, and all of them are strictly private code (this blog; Amanda’s blog templates and styles; and some other bits) which don’t require collaborators. For this reason, paying money to GitHub (awesome though they may be) seemed wasteful.
So I decided to move all my private repositories to my own server. This is how I did it.
Set up the server
These instructions were performed on a Debian 5 “Lenny” box, so assume them to be the same on Ubuntu. Substitute the package installation commands as required if you’re on an alternative distribution.
First, if you haven’t done so already, add your public key to the server:
ssh myuser@server.com mkdir .ssh
scp ~/.ssh/id_rsa.pub myuser@server.com:.ssh/authorized_keys
Now we can SSH into our server and install Git:
ssh myserver.com
sudo apt-get update
sudo apt-get install git-core
…and that’s it.
Adding a user
If you intend to share these repositories with any collaborators, at this point you’ll either:
    Want to install something like Gitosis (outside the scope of this article, but this is a good, if old, tutorial); or
    Add a “shared” Git user.
We’ll be following the latter option. So, add a Git user:
sudo adduser git
Now you’ll need to add your public key to the Git user’s authorized_keys:
sudo mkdir /home/git/.ssh
sudo cp ~/.ssh/authorized_keys /home/git/.ssh/
sudo chown -R git:git /home/git/.ssh
sudo chmod 700 !$
sudo chmod 600 /home/git/.ssh/*
Now you’ll be able to authenticate as the Git user via SSH. Test it out:
ssh git@myserver.com
Add your repositories
If you were to not share the repositories, and just wanted to access them for yourself (like I did, since I have no collaborators), you’d do the following as yourself. Otherwise, do it as the Git user we added above.
If using the Git user, log in as them:
login git
Now we can create our repositories:
mkdir myrepo.git
cd !$
git --bare init
The last steps creates an empty repository. We’re assuming you already have a local repository that you just want to push to a remote server.
Repeat that last step for each remote Git repository you want.
Log out of the server as the remaining operations will be completed on your local machine.
Configure your development machine
First, we add the remotes to your local machine. If you’ve already defined a remote named origin (for example, if you followed GitHub’s instructions), you’ll want to delete the remote first:
git remote rm origin
Now we can add our new remote:
git remote add origin git@server.com:myrepo.git
git push origin master
And that’s it. You’ll probably also want to make sure you add a default merge and remote:
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
And that’s all. Now you can push/pull from origin as much as you like, and it’ll be stored remotely on your own myserver.com remote repository.
Bonus points: Make SSH more secure
This has been extensively covered by the excellent Slicehost tutorial, but just to recap:
Edit the SSH config:
sudo vi /etc/ssh/sshd_config
And change the following values:
Port 2207
...
PermitRootLogin no
...
AllowUsers myuser git
...
PasswordAuthentication no
Where 2207 is a port of your choosing. Make sure to add this so your Git remote:
git remote add origin ssh://git@myserver.com:2207/~/myrepo.git

SVN  

svn help
usage: svn <subcommand> [options] [args]
Subversion command-line client, version 1.6.15.
Type 'svn help <subcommand>' for help on a specific subcommand.
Type 'svn --version' to see the program version and RA modules
or 'svn --version --quiet' to see just the version number.
Most subcommands take file and/or directory arguments, recursing
on the directories.  If no arguments are supplied to such a
command, it recurses on the current directory (inclusive) by default.
Available subcommands:
 add
 blame (praise, annotate, ann)
 cat
 changelist (cl)
 checkout (co)
 cleanup
 commit (ci)
 copy (cp)
 delete (del, remove, rm)
 diff (di)
 export
 help (?, h)
 import
 info
 list (ls)
 lock
 log
 merge
 mergeinfo
 mkdir
 move (mv, rename, ren)
 propdel (pdel, pd)
 propedit (pedit, pe)
 propget (pget, pg)
 proplist (plist, pl)
 propset (pset, ps)
 resolve
 resolved
 revert
 status (stat, st)
 switch (sw)
 unlock
 update (up)
Changesets
Before we proceed further, we should warn you that there's going to be a lot of discussion of “changes” in the pages ahead. A lot of people experienced with version control systems use the terms “change” and “changeset” interchangeably, and we should clarify what Subversion understands as a changeset.
Everyone seems to have a slightly different definition of changeset, or at least a different expectation of what it means for a version control system to have one. For our purposes, let's say that a changeset is just a collection of changes with a unique name. The changes might include textual edits to file contents, modifications to tree structure, or tweaks to metadata. In more common speak, a changeset is just a patch with a name you can refer to.
In Subversion, a global revision number N names a tree in the repository: it's the way the repository looked after the Nth commit. It's also the name of an implicit changeset: if you compare tree N with tree N−1, you can derive the exact patch that was committed. For this reason, it's easy to think of revision N as not just a tree, but a changeset as well. If you use an issue tracker to manage bugs, you can use the revision numbers to refer to particular patches that fix bugs—for example, “this issue was fixed by r9238.” Somebody can then run svn log -r 9238 to read about the exact changeset that fixed the bug, and run svn diff -c 9238 to see the patch itself. And (as you'll see shortly) Subversion's svn merge command is able to use revision numbers. You can merge specific changesets from one branch to another by naming them in the merge arguments: passing -c 9238 to svn merge would merge changeset r9238 into your working copy.
svn propset svn:externals "eggtoolpalette -r853 http://svn.gnome.org/svn/libegg/trunk/libegg/toolpalette/" .
svn commit -m "Added eggtoolpalette"
svn update

MANAGEMENT                                                                  |



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EclipseCon 2014 Tycho Tutorial - Exercise 5</title>
</head>
<body>
    <p align="center">
        <a href="../../Exercise_04_Add_P2_Repository/tychodemo.parent/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        <!-- | <a href="../../Exercise_06_Use_Target_File/tychodemo.parent/README.html">Next Exercise&gt;</a> -->
    </p>

    <h2>Exercise 5: Build a product distribution</h2>

    In this exercise, we'll build an installation of our RCP application and pack it into a ready-to-use ZIP archive.
    <br />Offering an archive for download is a common way to distribute RCP applications.

    <h3>Recovery option</h3>

    This section is optional and only needed if you want to recover from a problem in exercise 4.
    <ul>
        <li>Select <tt>File > Switch Workspace > Other...</tt> and choose the folder <a href="../">Exercise_05_Add_Product</a></li>
        <li>Import all five projects from this folder into the workspace using <tt>File > Import > Existing Maven Projects</tt></li>
        <li>Trigger a build on the parent POM: <ul>
            <li>Right-click on <tt>tychodemo.parent > Run As > Maven build</tt></li>
            <li>If a launch configuration dialog appears, enter the goals <tt>clean install</tt> and hit <tt>Run</tt></li>
        </ul></li>
        <li>The build should succeed and build five modules <pre>
   tychodemo.parent 
   tychodemo.bundle 
   tychodemo.bundle.tests
   tychodemo.feature
   tychodemo.repository</pre>
        </li>
    </ul>

    <h3>Building a product distribution</h3>

    <ol>
        <li>Move the existing <tt>tychodemo.bundle.product</tt> file from the project <tt>tychodemo.bundle</tt> to the project <tt>tychodemo.repository</tt>
            <br /><img src="../resources/product_move.png" />
        </li>

        <li>Configure the start levels and auto-start settings of the product: <ul>
            <li>Open the <tt>tychodemo.bundle.product</tt> product definition</li>
            <li>Switch to the <tt>Configuration</tt> tab</li>
            <li>In the <tt>Start Levels</tt> section, click on <tt>Add...</tt>
                <br /><img src="../resources/start_levels_add.png" />
            </li>
            <li>Select the bundles <tt>org.eclipse.equinox.common</tt> and <tt>org.eclipse.equinox.ds</tt> and hit <tt>OK</tt>
                <br /><img src="../resources/start_levels_add_equinox.png" />
            </li>
            <li>For both bundles, set the start level to <tt>2</tt> and auto-start to <tt>true</tt></li>
            <li>Click <tt>Add...</tt> again and add the bundle <tt>org.eclipse.core.runtime</tt></li>
            <li>For <tt>org.eclipse.core.runtime</tt> only set auto-start to <tt>true</tt>
                <br /><img src="../resources/start_levels.png" />
            </li>
        </ul></li>

        <li>On the <tt>Overview</tt> tab, enter the ID <tt>tychodemo.product</tt></li>

        <li>Change the product definition to be based on features:
            <br />(Background: Feature-based products are easier to manage, especially if the product is built for multiple platforms.)
            <ul>
                <li>Select "The product configuration is based on <tt>features</tt>"
                    <br /><img src="../resources/feature_based.png" />
                </li>
                <li>On the <tt>Dependencies</tt> tab, click on <tt>Add...</tt> and select the <tt>tychodemo.feature</tt>, and hit <tt>OK</tt></li> 
                <li>In the same way, add the feature <tt>org.eclipse.rcp</tt>
                    <br /><img src="../resources/feature_add_rcp.png" />
                </li>
                <li>
                    Click on <tt>Add Required</tt>; this also adds two EMF features and an e4 feature
                    <br /><img src="../resources/feature_add_required.png" />
                </li>
                <li>Save the file</li>
                <li>Now the product configuration can be launched: On the <tt>Overview</tt> tab, click on <tt>Launch an Eclipse application</tt> in the section <tt>Testing</tt>.</li>
            </ul>
        </li>

        <li>Run the build of <tt>tychodemo.parent</tt>, e.g. by right-clicking on <tt>tychodemo.parent > Run As > Maven build</tt>
            <br />Expected results: <ul>
                <li><tt>BUILD SUCCESS</tt></li>
                <li>The p2 repository in <tt>tychodemo.repository/target/repository</tt> now contains the product metadata and the content of the product:
                    <br /><img src="../resources/product_published.png" />
                </li>
            </ul>
        </li>

        <li>Configure the build to create a product installation and archive <ul>
            <li>Open the file <tt>tychodemo.repository/pom.xml</tt></li>
            <li>Switch to the <tt>pom.xml</tt> tab and add the following snippet: <pre>
  &lt;build&gt;
    &lt;plugins&gt;
      &lt;plugin&gt;
        &lt;groupId&gt;org.eclipse.tycho&lt;/groupId&gt;
        &lt;artifactId&gt;tycho-p2-director-plugin&lt;/artifactId&gt;
        &lt;version&gt;${tycho-version}&lt;/version&gt;
        &lt;executions&gt;
          &lt;execution&gt;
            &lt;id&gt;build-distributions&lt;/id&gt;
            &lt;goals&gt;
              &lt;!-- install the product using the p2 director --&gt;
              &lt;goal&gt;materialize-products&lt;/goal&gt;
              &lt;!-- create zip file with the installed product --&gt;
              &lt;goal&gt;archive-products&lt;/goal&gt;
            &lt;/goals&gt;
          &lt;/execution&gt;
        &lt;/executions&gt;
      &lt;/plugin&gt;
    &lt;/plugins&gt;
  &lt;/build&gt;
 </pre>
            </li>
        </ul></li>

        <li>Run the build of <tt>tychodemo.parent</tt> again, e.g. by selecting <tt>tychodemo.parent</tt> from the run history
            <br />Expected results: <ul>
                <li><tt>BUILD SUCCESS</tt></li>
                <li>There is now an installed product under <tt>tychodemo.repository/target/products/tychodemo.product/&lt;os&gt;/&lt;ws&gt;/&lt;arch&gt;/</tt>
                    <br /> <img src="../resources/product_materialized.png" />
                </li>
            </ul>
        </li>

        <li>Run the product executable
            <br />Expected result: The <tt>tychodemo.bundle</tt> RCP is started:
            <br /><img src="../resources/rcp.png" />
        </li>
    </ol>
    <br />

    <hr/>
    <p><strong>Congratulations</strong>: You have now completed the Tycho tutorial. You now may want to
    <ul>
        <li>Read more about <a href="http://www.eclipse.org/tycho/">Tycho</a> in the <a href="http://wiki.eclipse.org/Category:Tycho">Tycho documentation</a></li>
    </ul>
    </p>

    <p align="center">
        <a href="../../Exercise_04_Add_P2_Repository/tychodemo.parent/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        <!-- | <a href="../../Exercise_06_Use_Target_File/tychodemo.parent/README.html">Next Exercise&gt;</a> -->
    </p>

</body>
</html>
Exercise 5: Build a product distribution
========================================

This folder contains the solution of exercise 5.
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EclipseCon 2014 Tycho Tutorial - Exercise 2</title>
</head>
<body>
    <p align="center">
        <a href="../../Exercise_01_Create_RCP_Bundle/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        | <a href="../../Exercise_03_Add_Feature/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

    <h2>Exercise 2: Add a test fragment with a simple JUnit test</h2>

    In this exercise, we'll add a simple JUnit test in a test fragment for the bundle.
    <br />We'll run the test from within Eclipse and then execute the same test as part of the Tycho build.

    <h3>Importing the refactored project</h3>

    As a starting point for this exercise, we use a refactored version of the results of the first exercise:
    <br />In order to share configuration between the projects, the common configuration has been extracted to a new project <a href="pom.xml"><tt>tychodemo.parent</tt></a>.
     All projects will configure the <tt>tychodemo.parent</tt> as parent, and hence inherit the common configuration.

    <ol>
        <li>Select <tt>File > Switch Workspace > Other...</tt> and choose the folder <a href="../">Exercise_02_Add_Test_Fragment</a>.</li>
        <li>Import the two projects from this folder into the workspace using <tt>File > Import > Maven > Existing Maven Projects</tt>
            <br /><img src="../resources/import.png" />
            <br /><img src="../resources/import_2.png" />
        </li>
        <li>Right-click on <tt>tychodemo.parent > Run As > Maven build</tt>, enter the goals <tt>clean install</tt>.
            <br />The build should succeed and build two modules:
            <br /><img src="../resources/build_success.png" />
        </li>
    </ol>

    <h3>Adding a JUnit test</h3>

    <ol start="4">
        <li>Create a new fragment project <tt>tychodemo.bundle.tests</tt> with fragment host <tt>tychodemo.bundle</tt>:
            <ul>
                <li><tt>File > New > Project > Plug-in Development > Fragment Project</tt>
                    <br /><img src="../resources/new_fragment.png" />
                </li>
                <li>Enter the project name <tt>tychodemo.bundle.tests</tt>
                    <br /><img src="../resources/new_fragment_0.png" />
                </li>
                <li>Enter the host plug-in ID <tt>tychodemo.bundle</tt>
                    <br /><img src="../resources/fragment_host.png" />
                </li>
            </ul>
            Note: As opposed to a normal Maven project, tests are in a separate project in Tycho
            because otherwise we would pollute productive bundle with test-scoped dependencies in MANIFEST.
            <br />With a test fragment, the tests have still full access to the code under test:
            <ul>
                <li>They can test packages which are not exported in the productive bundle</li>
                <li>They can even test package-private members when the test is in a package with the same name</li>
            </ul>
        </li>
        <li>Refactor our code so that we can test it: <ul>
            <li>Open <tt>AboutHandler.java</tt>, select the about text string, right-click <tt>Refactor > Extract Method</tt>
                <br /><img src="../resources/extract_method.png" />
            </li>
            <li>Enter the method name <tt>getGreeting</tt> and select the <tt>default</tt> access modifier
                <br /><img src="../resources/extract_method_2.png" />
            </li>
        </ul></li>
        <li>Create a new JUnit test case <tt>tychodemo.bundle.handlers.AboutHandlerTest</tt> in the fragment project<ul>
            <li>Make sure that the <tt>AboutHandler.java</tt> file is selected in the package explorer (to have the wizard fill in good defaults)</li>
            <li><tt>File > New > Other > JUnit Test Case</tt></li>
            <li>Change the source folder to <tt>tychodemo.bundle.tests/src</tt>; the other fields should already be pre-filled correctly.
                <br /><img src="../resources/new_junit_testcase_1.png" />
            </li>
            <li>Press <tt>Next &gt;</tt> and choose <tt>getGreeting()</tt> to generate a test stub for it
                <br /><img src="../resources/new_junit_testcase_2.png" />
            </li>
            <li>Confirm the prompt which proposes to "Add org.junit to required bundles"
                <br /><img src="../resources/new_junit_testcase_3.png" />
            </li></ul>
        </li>
        <li>Run the test: <ul>
            <li>Right-click, <tt>Run As > JUnit Plugin Test</tt>
                <br /> <img src="../resources/run_junit.png" />
            </li>
            <li>Expected result: The test fails with <tt>java.lang.AssertionError: Not yet implemented</tt>
                <br /><img src="../resources/failed_test.png" />
            </li>
        </ul></li>
    </ol>

    <h3>Running the JUnit test in the build</h3>

    Tycho automatically executes JUnit tests in projects with packaging type <tt>eclipse-test-plugin</tt>.
    So we only need to add the test project to the build.

    <ol start="8">
        <li>Convert the test project to a Maven project: <ul>
            <li>Right-click <tt>tychodemo.bundle.tests > Configure > Convert to Maven Project</tt></li>
            <li>Enter the groupId <tt>tychodemo</tt>, the version <tt>1.0.0-SNAPSHOT</tt> and the packaging <tt>eclipse-test-plugin</tt>
                <br /><img src="../resources/create_pom.png" />
                <br />Again, we get the error <tt>Unknown packaging: eclipse-test-plugin</tt> because Tycho is not yet known to the new project.
            </li></ul>
        </li>

        <li><a name="add_module" />Add the test project as a module to the reactor, and configure the test project's parent POM
            <ul>
                <li>Open the <tt>pom.xml</tt> of <tt>tychodemo.parent</tt> and click on <tt>Add...</tt> in the <tt>Modules</tt> section
                    <br /><img src="../resources/add_module_1.png" />
                </li>
                <li>Select <tt>tychodemo.bundle.tests</tt> and <tt>Update POM parent section in selected projects</tt>
                    <br /><img src="../resources/add_module_2.png" />
                </li>
            </ul>
            Expected results: <ul>
                <li>You may get an error "Project configuration is not up to date".
                    If this is the case, right-click on <tt>tychodemo.bundle.tests > Maven > Update Project...</tt>, select the project and click <tt>OK</tt>
                </li>
                <li>The <tt>tychodemo.bundle.tests</tt> project is now listed as module in the parent POM.
                    (This means that it will be included in the build reactor when triggering a build on the parent POM.)
                    <br /><img src="../resources/add_module_3.png" />
                </li>
                <li>The <tt>tychodemo.bundle.tests</tt> project has the <tt>tychodemo.parent</tt> configured as parent.
                    In this way, it inherits the Tycho configuration from the parent POM and the error <tt>Unknown packaging: eclipse-test-plugin</tt> is gone.
                    <br /><img src="../resources/add_module_4.png" />
                </li>
            </ul>
        </li>
        <li>Trigger a build on the parent POM, e.g. by right-clicking on <tt>tychodemo.parent > Run As > Maven build</tt>
            <br />Expected result: The build fails because the JUnit test test failed
            <br /><img src="../resources/failed_test_maven.png" />
        </li>

        <li>Implement the test and run it again: <ul>
            <li>Assert that <tt>getGreeting()</tt> contains <tt>"Tycho Demo"</tt>
                <br /><img src="../resources/test_impl.png" />
                <br />(<a href="../../Exercise_03_Add_Feature/tychodemo.bundle.tests/src/tychodemo/bundle/handlers/AboutHandlerTest.java">Possible solution</a>)
            </li>
            <li>Execute the test in Eclipse, e.g. by selecting the <tt>AboutHandlerTest</tt> launch configuration from the launch history
                <br /><img src="../resources/launch_history.png" />
                <br />The test should now pass
                <br /><img src="../resources/test_success_eclipse.png" />
            </li>
            <li>Run the build again, e.g. by selecting the <tt>tychodemo.parent</tt> launch configuration from the launch history. The build should now succeed.
                <br /><img src="../resources/test_success_maven.png" />
            </li>
        </ul></li>
    </ol>

    <p align="center">
        <a href="../../Exercise_01_Create_RCP_Bundle/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        | <a href="../../Exercise_03_Add_Feature/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EclipseCon 2014 Tycho Tutorial - Exercise 3</title>
</head>
<body>
    <p align="center">
        <a href="../../Exercise_02_Add_Test_Fragment/tychodemo.parent/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        | <a href="../../Exercise_04_Add_P2_Repository/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

    <h2>Exercise 3: Add a feature</h2>

    In this exercise, we'll create a feature which groups the plugin(s) we build to units which should be installed together.
    <br />

    <h3>Recovery option</h3>

    This section is optional and only needed if you want to recover from a problem in exercise 2.
    <ul>
        <li>Select <tt>File > Switch Workspace > Other...</tt> and choose the folder <a href="../">Exercise_03_Add_Feature</a></li>
        <li>Import all three projects from this folder into the workspace using <tt>File > Import > Existing Maven Projects</tt></li>
        <li>Trigger a build on the parent POM: <ul>
            <li>Right-click on <tt>tychodemo.parent > Run As > Maven build</tt></li>
            <li>If a launch configuration dialog appears, enter the goals <tt>clean install</tt> and hit <tt>Run</tt></li>
        </ul></li>
        <li>The build should succeed and build three modules <pre>
   tychodemo.parent
   tychodemo.bundle
   tychodemo.bundle.tests</pre>
        </li>
    </ul>

    <h3>Adding a feature</h3>

    <ol>
        <li>Create a new feature project <tt>tychodemo.feature</tt> which includes the <tt>tychodemo.bundle</tt> plugin: <ul>
            <li><tt>File > New > Other > Plug-in Development > Feature Project</tt>
                <br /><img src="../resources/new_feature.png" />
            </li>
            <li>Enter the project name <tt>tychodemo.feature</tt> and the feature name <tt>Tycho Demo Feature</tt>
                <br /><img src="../resources/feature_name.png" />
            </li>
            <li>Press <tt>Next &gt;</tt> and select the <tt>tychodemo.bundle</tt>
                <br /><img src="../resources/feature_include_bundle.png" />
                <br />Note: A feature only logically includes plugins; the feature artifact won't actually contain the JARs of its "included" plugins.
            </li>
        </ul></li>
        <li>Convert the feature project to a Maven project: <ul>
            <li>Right-click <tt>tychodemo.feature > Configure > Convert to Maven Project</tt></li>
            <li>Enter the groupId <tt>tychodemo</tt>, the version <tt>1.0.0-SNAPSHOT</tt> and the packaging <tt>eclipse-feature</tt>
                <br /><img src="../resources/convert_to_maven.png" />
                <br />Note: Tycho requires that the <tt>artifactId</tt> in the POM is the same as the feature ID, and that the versions match (with <tt>.qualifier</tt> replaced by <tt>-SNAPSHOT</tt>)
            </li>
        </ul></li>
        <li>Add the feature project as a module to the reactor, and configure the feature project's parent POM: <ul>
            <li>Open the <tt>pom.xml</tt> of <tt>tychodemo.parent</tt> and click on <tt>Add...</tt> in the <tt>Modules</tt> section
                <br /><img src="../resources/add_module_1.png" />
            </li>
            <li>Select <tt>tychodemo.feature</tt> and <tt>Update POM parent section in selected projects</tt>
                <br /><img src="../resources/add_module_2.png" />
            </li>
        </ul></li>
        <li>In case you get the error "Project configuration is not up to date",
            right-click on <tt>tychodemo.feature > Maven > Update Project...</tt>, select the project and click <tt>OK</tt>
        </li>
        <li>Trigger a build on the parent POM, e.g. by right-clicking on <tt>tychodemo.parent > Run As > Maven build</tt>
            <br />Expected result: <ul>
                <li>BUILD SUCCESS</li>
                <li>The reactor builds four modules, including the <tt>tychodemo.feature</tt> project
                    <br /><img src="../resources/build_success.png" />
                </li>
            </ul>
        </li>
    </ol>

    <p align="center">
        <a href="../../Exercise_02_Add_Test_Fragment/tychodemo.parent/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        | <a href="../../Exercise_04_Add_P2_Repository/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EclipseCon 2014 Tycho Tutorial - Exercise 4</title>
</head>
<body>
    <p align="center">
        <a href="../../Exercise_03_Add_Feature/tychodemo.parent/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        | <a href="../../Exercise_05_Add_Product/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

    <h2>Exercise 4: Add a p2 repository</h2>

    In this exercise, we'll assemble the feature and bundle we built in the previous exercises into a p2 repository.
    <br />A p2 repository is the format through which we can deliver new features to existing applications, or deliver updates of our RCP application.

    <h3>Recovery option</h3>

    This section is optional and only needed if you want to recover from a problem in exercise 3.
    <ul>
        <li>Select <tt>File > Switch Workspace > Other...</tt> and choose the folder <a href="../">Exercise_04_Add_P2_Repository</a></li>
        <li>Import all four projects from this folder into the workspace using <tt>File > Import > Existing Maven Projects</tt></li>
        <li>Trigger a build on the parent POM: <ul>
            <li>Right-click on <tt>tychodemo.parent > Run As > Maven build</tt></li>
            <li>If a launch configuration dialog appears, enter the goals <tt>clean install</tt> and hit <tt>Run</tt></li>
        </ul></li>
        <li>The build should succeed and build four modules <pre>
   tychodemo.parent 
   tychodemo.bundle 
   tychodemo.bundle.tests
   tychodemo.feature</pre>
        </li>
    </ul>

    <h3>Creating a p2 repository</h3>

    <ol>
        <li>Create a new update site project <tt>tychodemo.repository</tt>
            <br /><tt>File > New > Other > Plug-in Development > Update Site Project</tt>
            <!-- <br />Note: Make sure the new project root folder is located next to the existing module folders (Uncheck "Use default location" in the project creation wizard and enter location if necessary) -->
            <br /><img src="../resources/new_updatesite.png" />
            <br /><img src="../resources/new_updatesite_2.png" />
        </li>
        <li>Rename the <tt>site.xml</tt> to <tt>category.xml</tt> using right-click <tt>Refactor > Rename...</tt>
            <br /><img src="../resources/category_xml_rename.png" />
        </li>
        <li>Open the <tt>category.xml</tt>. If the editor shows the error "Unable to open editor..." (<a href="https://bugs.eclipse.org/bugs/show_bug.cgi?id=404118">bug 404118</a>), explicitly select the right editor: Right-click on the <tt>category.xml > Open With > Category Manifest Editor</tt>
            <br /><img src="../resources/category_xml_open.png" />
        </li>
        <li>In the <tt>category.xml</tt> editor, create a new category <tt>tychodemo.category</tt> and add the feature <tt>tychodemo.feature</tt> to it:<br /> <img src="../resources/new_category.png" /><br /> <img
            src="../resources/add_feature.png" /><br />
        </li>
        <li>Add the the new project to the build with <tt>eclipse-repository</tt> packaging type: <ul>
            <li>Right-click on <tt>tychodemo.repository > Configure > Convert to Maven Project</tt></li>
            <li>Enter the groupId <tt>tychodemo</tt>, version <tt>1.0.0-SNAPSHOT</tt> and packaging <tt>eclipse-repository</tt>. Background info: the packaging type <tt>eclipse-repository</tt> tells Tycho to build a p2 repository.
                <br /><img src="../resources/add_pom.png" />
            </li>
            <li>Open the <tt>pom.xml</tt> of <tt>tychodemo.parent</tt> and click on <tt>Add...</tt> in the <tt>Modules</tt> section
                <br /><img src="../resources/add_to_parent.png" />
            </li>
            <li>Select the <tt>tychodemo.repository</tt> module, select <tt>Update POM parent section in selected projects</tt>, and hit <tt>OK</tt>
                <br /><img src="../resources/add_to_parent_2.png" />
            </li>
            <li>
                If the problems view shows an error "Project configuration is not up-to-date with pom.xml", simply apply the quick fix for it.
            </li>
        </ul></li>
        <li>Run the build of <tt>tychodemo.parent</tt>, e.g. by selecting <tt>tychodemo.parent</tt> from the run history
            <br /> Expected results:
            <ul>
                <li><tt>SUCCESSFUL</tt> build including <tt>tychodemo.repository</tt> module,
                    <br /><img src="../resources/build_success.png" />
                </li>
                <li>A p2 repository in <tt>tychodemo.repository/target/repository/</tt>, and</li>
                <li>The zipped p2 repository in <tt>tychodemo.repository/target/tychodemo.repository-1.0.0-SNAPSHOT.zip</tt></li>
            </ul>
        </li>
        <li>Test the p2 repository just created:<ul>
            <li>Refresh the <tt>tychodemo.repository</tt> project in the package explorer</li>
            <li>Right-click on <tt>tychodemo.repository/target/repository</tt> and select <tt>Properties</tt>
                <br /><img src="../resources/p2_repo_properties.png" />
            </li>
            <li>Copy the file system location of the folder; close the dialog
                <br /><img src="../resources/p2_repo_path.png" />
            </li>
            <li><tt>Help > Install New Software...</tt></li>
            <li>In the <tt>Work with</tt> field, type <tt>file:</tt> and paste the path from the clipboard; press ENTER to load the repository
                <br />The demo category and feature created in the previous step should be shown.
                <br /><img src="../resources/p2_repo_loaded.png" />
            </li>
            <li>Press <tt>Cancel</tt> as we don't want install our example feature into our running Eclipse IDE.</li>
        </ul></li>
    </ol>

    <p align="center">
        <a href="../../Exercise_03_Add_Feature/tychodemo.parent/README.html">&lt;Previous Exercise</a>
        | <a href="../../../README.html">TOC</a>
        | <a href="../../Exercise_05_Add_Product/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EclipseCon 2014 Tycho Tutorial - Exercise 1</title>
</head>
<body>
    <p align="center">
        <a href="../../README.html">TOC</a>
        | <a href="../Exercise_02_Add_Test_Fragment/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

    <h2>Exercise 1: Create and build a plugin with an Eclipse 4 sample application</h2>

    In this exercise, we'll create a plugin with a simple Eclipse 4 Rich Client Platform application.
    (Actually, the Eclipse 4 Tools will generate most the content for us.)
    <br />Then, we'll set up a Tycho build for the plugin.

    <h3>Generating an Eclipse 4 sample application</h3>

    <ol>
        <li>Create a new Eclipse 4 sample application in a plug-in called <tt>tychodemo.bundle</tt> <ul>
            <li><tt>File > New > Project > Eclipse 4 > Eclipse 4 Application Project</tt>
                <br /><img src="resources/new_e4_app.png" />
            </li>
            <li>Enter <tt>tychodemo.bundle</tt> as project name
                <br /><img src="resources/new_e4_app_1.png" />
            </li>
            <li>On the <tt>Content</tt> page, enter the name <tt>Tycho Demo Bundle</tt>. Click <tt>Next &gt;</tt>
                <br /><img src="resources/new_e4_app_2.png" />
            </li>
            <li>On the <tt>Eclipse 4 Application</tt> page, select <tt>Create sample content</tt> and press <tt>Finish</tt>
                <br /><img src="resources/new_e4_app_3.png" />
            </li>
        </ul></li>
        <li>Run the generated application to see what it does: <ul>
            <li>Open the product definition file <tt>tychodemo.bundle.product</tt></li>
            <li>On the <tt>Overview</tt> tab, click on <tt>Launch an Eclipse application</tt>
                <br /><img src="resources/product_1.png" />
            </li>
            <li>You should see an RCP application window with title <tt>tychodemo.bundle</tt>
                <br /><img src="resources/screenshot_1.png" />
            </li>
            <li>Open the <tt>Help > About</tt> menu. A dialog box with the text <tt>Eclipse 4 Application example</tt> is shown:
                <br /><img src="resources/about_1.png" />
            </li>
        </ul></li>
        <li>Change the text of the about dialog: <ul>
            <li>Open <tt>tychodemo.bundle.handlers.AboutHandler</tt> and change the about text from <tt>"Eclipse 4 Application example."</tt> to <tt>"Tycho Demo RCP"</tt>
                <br /><img src="resources/about_2.png" /></li>
            <li>Open <tt>tychodemo.bundle.product</tt> and launch the Eclipse application again. Open the <tt>Help > About</tt> dialog. You should see your message now:
                <br /><img src="resources/about_3.png" />
            </li>
        </ul></li>
    </ol>

    <h3>Setting up the Tycho build</h3>

    <ol start="4">
        <li>Pre-fill your local Maven repository (to be independent of network access to <a href="http://repo1.maven.apache.org/maven2/">Maven central</a>):
            <br />Copy the <a href="../../.m2"><tt>.m2</tt> folder from the USB stick</a> to your user home directory <tt>~</tt> (Linux/Mac) or <tt>%USERPROFILE%</tt> (Windows).
            <br />Note: If you have already used Maven before, you may want to save a backup of your <tt>~/.m2/settings.xml</tt> file.
        </li>

        <li><a name="convert_to_maven" />Right-click on the <tt>tychodemo.bundle</tt> project and select <tt>Configure > Convert to Maven Project</tt>
            <br /><img src="resources/convert_to_maven_1.png" />
        </li>
        <li>Enter the groupId <tt>tychodemo</tt>, the version <tt>1.0.0-SNAPSHOT</tt>, and the packaging <tt>eclipse-plugin</tt>
            <br /><img src="resources/convert_to_maven_2.png" />
            <br />Note: Tycho requires that the <tt>artifactId</tt> in the POM is the same as the <tt>Bundle-SymbolicName</tt> in the OSGi manifest, and that the versions match (with <tt>.qualifier</tt> replaced by <tt>-SNAPSHOT</tt>)
        </li>
        <li>You will get a build error on the newly created <tt>pom.xml</tt> file: <tt>"Project build error: Unknown packaging: eclipse-plugin"</tt>.
            <br />This is expected, because the Tycho build extension is not yet configured (see next steps).
            <br /><img src="resources/build_error.png" />
        </li>

        <li>Open the <tt>pom.xml</tt> and switch to the tab <tt>pom.xml</tt></li>
        <li>Define a property with the Tycho version by adding this snippet to the <tt>&lt;project&gt;</tt> : <pre>
  &lt;properties&gt;
    &lt;tycho-version&gt;0.20.0&lt;/tycho-version&gt;
  &lt;/properties&gt;</pre>
        </li>
        <li>To enable Tycho, add this snippet to the <tt>&lt;project&gt;</tt> : <pre>
  &lt;build&gt;
    &lt;plugins&gt;
      &lt;plugin&gt;
        &lt;!-- enable the Tycho build extension --&gt;
        &lt;groupId&gt;org.eclipse.tycho&lt;/groupId&gt;
        &lt;artifactId&gt;tycho-maven-plugin&lt;/artifactId&gt;
        &lt;version&gt;${tycho-version}&lt;/version&gt;
        &lt;extensions&gt;true&lt;/extensions&gt;
      &lt;/plugin&gt;
    &lt;/plugins&gt;
  &lt;/build&gt;</pre>
        </li>

        <li>In case you now get the error "Project configuration is not up to date",
            right-click on <tt>tychodemo.bundle > Maven > Update Project...</tt>, select the project and click <tt>OK</tt>
        </li>

        <li>Right-click on the <tt>tychodemo.bundle</tt> project and select <tt>Run As > Maven build</tt>
            <br /><img src="resources/run_maven_1.png" />
        </li>
        <li>Enter the goals <tt>clean install</tt>
            <br /><img src="resources/run_maven_2.png" />
        </li>

        <li>Expected result: the build fails with a "Cannot resolve project dependencies" error
            <br /> <img src="resources/build_error_p2.png" />

        </li>
        <li>Add a p2 repository to the target platform in the Tycho build, so that the dependencies can be resolved: <ul>
            <li>Add this snippet in <tt>&lt;project&gt;</tt> <pre>
  &lt;repositories&gt;
    &lt;!-- configure p2 repository to resolve against --&gt;
    &lt;repository&gt;
      &lt;id&gt;eclipse-project-luna&lt;/id&gt;
      &lt;layout&gt;p2&lt;/layout&gt;
      &lt;url&gt;http://download.eclipse.org/eclipse/updates/4.4milestones&lt;/url&gt;
    &lt;/repository&gt;
  &lt;/repositories&gt;</pre>
            </li>
            <li>In order to be independent of network access to eclipse.org:<ul>
                <li>Open <tt>~/.m2/settings.xml</tt> (Linux/Mac) or <tt>%USERPROFILE%/.m2/settings.xml</tt> (Windows)</li>
                <li>Replace the mirror URL <tt>file:/TODO/path/to/tutorial/p2_repository</tt> with a real <tt>file:</tt> URL pointing to your
                    <a href="../../p2_repository">local copy of the p2 repository from the USB stick</a>
                </li></ul>
                <br />This p2 repository contains a subset of the Eclipse Project Luna M6 repository.
            </li></ul>
        </li>

        <li>Run the build of <tt>tychodemo.parent</tt> again, e.g. by right-clicking on <tt>tychodemo.parent > Run As > Maven build</tt>
            <br />Expected results:<ul>
                <li><tt>BUILD SUCCESS</tt></li>
                <li>The bundle jar <tt>tychodemo.bundle-1.0.0-SNAPSHOT.jar</tt> in the <tt>target/</tt> folder of the project. (Refresh the project if the content is not shown.)
                    <br /><img src="resources/build_success.png" />
                </li>
            </ul>
        </li>
    </ol>

    <p align="center">
        <a href="../../README.html">TOC</a>
        | <a href="../Exercise_02_Add_Test_Fragment/tychodemo.parent/README.html">Next Exercise&gt;</a>
    </p>

</body>
</html>

     peaberry - dynamic service extension for Google-Guice


  What is it?
  -----------

  The peaberry project is an extension library for Google-Guice
  that supports dependency injection of dynamic services.

  It provides OSGi integration out of the box, and has plug-in
  support for other registry-based service frameworks. It ships
  as an OSGi bundle that can be dropped into any R4 framework,
  such as Apache Felix or Eclipse/Equinox.


  Using peaberry
  --------------

  To use peaberry in an OSGi application, install the following
  bundles from the distribution onto your chosen OSGi framework:

    aopalliance-1.0.jar
    guice-snapshot-20090116.jar
    peaberry-1.0.jar

  To use peaberry in a non-OSGi application, add the above group
  of bundles to your application classpath (in the order shown).

  The peaberry distribution contains the AOP Alliance API classes
  repackaged as an OSGi bundle and a snapshot of the latest Guice
  codebase.

  These bundles can be replaced with alternative compatible jars.


  The Latest Version
  ------------------

  The latest version can be found at <http://code.google.com/p/peaberry/>


  Documentation
  -------------

  API documentation is available in the javadoc jar.

  Quick summary:

    "org.ops4j.peaberry.Peaberry" builds the service providers.

    "org.ops4j.peaberry.util" contains optional helper classes.

  Injecting a dynamic service from OSGi:

    @Inject
    LogService logService;
    ...
    bind(LogService.class).to(service(LogService.class).single());

  Exporting an implementation as an OSGi service:

    @Inject
    Export<LogService> exportedLogService;
    ...
    bind(export(LogService.class)).to(registration(logImplKey).export());

  More examples can be found in the javadoc for the Peaberry class.


  Licensing
  ---------

  This software is licensed under the terms you may find in the
  file named "LICENSE" in this directory. The distribution also
  contains binary classes from the ASM project, licensed under
  terms found in the file named "LICENSE.asm".


  Thank you for using peaberry.


GIT  

git checkout <branch-name> = git branch <branch-name>; git checkout <branch-name>; git pull origin <branch-name>
git checkout -b <branch-name> origin/<branch-name>
git branch -a
git branch -D <branch-name>
git push origin --delete <branch-name>
git remote add upstream git://github.com/octocat/Spoon-Knife.git
git fetch upstream
git push origin master
git fetch upstream
git merge upstream master
--------------
GIT COMPLETION
--------------
https://github.com/git/git/tree/master/contrib/completion
----------
GIT CLIENT
----------
git on linux
+ gitg
+ giggle
+ gitk
+ git-cola
svn co https://svn.github.com/echarles/openaos.git openaos
Global setup:
Download and install Git
 git config --global user.name "Eric Charles"
 git config --global user.email eric.charles@u-mangate.com
Next steps:
 mkdir openaos
 cd openaos
 git init
 touch README
 git add README
 git commit -m 'first commit'
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Existing Git Repo?
 cd existing_git_repo
 git remote add origin git@github.com:echarles/openaos.git
 git push origin master
Importing a Subversion Repo?
 Click here
When you're done:
 Continue
mkdir test
git init --bare
git remote rm origin
git remote add origin git@aos.be:test
git push origin master
git remote show origin
git diff --no-prefix --staged
----------
----------
GIT SERVER
----------
http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux
How to set up your own private Git server on Linux
Update 2: as pointed out by Tim Huegdon, several comments on a Hacker News thread pointing here, and the excellent Pro Git book, Gitolite seems to be a better solution for multi-user hosted Git than Gitosis. I particularly like the branch–level permissions aspect, and what that means for business teams. I’ve left the original article intact.
Update: the ever–vigilant Mike West has pointed out that my instructions for permissions and git checkout were slightly askew. These errors have been rectified.
One of the things I’m attempting to achieve this year is simplifying my life somewhat. Given how much of my life revolves around technology, a large part of this will be consolidating the various services I consume (and often pay for). The mention of payment is important, as up until now I’ve been paying the awesome GitHub for their basic plan.
I don’t have many private repositories with them, and all of them are strictly private code (this blog; Amanda’s blog templates and styles; and some other bits) which don’t require collaborators. For this reason, paying money to GitHub (awesome though they may be) seemed wasteful.
So I decided to move all my private repositories to my own server. This is how I did it.
Set up the server
These instructions were performed on a Debian 5 “Lenny” box, so assume them to be the same on Ubuntu. Substitute the package installation commands as required if you’re on an alternative distribution.
First, if you haven’t done so already, add your public key to the server:
ssh myuser@server.com mkdir .ssh
scp ~/.ssh/id_rsa.pub myuser@server.com:.ssh/authorized_keys
Now we can SSH into our server and install Git:
ssh myserver.com
sudo apt-get update
sudo apt-get install git-core
…and that’s it.
Adding a user
If you intend to share these repositories with any collaborators, at this point you’ll either:
    Want to install something like Gitosis (outside the scope of this article, but this is a good, if old, tutorial); or
    Add a “shared” Git user.
We’ll be following the latter option. So, add a Git user:
sudo adduser git
Now you’ll need to add your public key to the Git user’s authorized_keys:
sudo mkdir /home/git/.ssh
sudo cp ~/.ssh/authorized_keys /home/git/.ssh/
sudo chown -R git:git /home/git/.ssh
sudo chmod 700 !$
sudo chmod 600 /home/git/.ssh/*
Now you’ll be able to authenticate as the Git user via SSH. Test it out:
ssh git@myserver.com
Add your repositories
If you were to not share the repositories, and just wanted to access them for yourself (like I did, since I have no collaborators), you’d do the following as yourself. Otherwise, do it as the Git user we added above.
If using the Git user, log in as them:
login git
Now we can create our repositories:
mkdir myrepo.git
cd !$
git --bare init
The last steps creates an empty repository. We’re assuming you already have a local repository that you just want to push to a remote server.
Repeat that last step for each remote Git repository you want.
Log out of the server as the remaining operations will be completed on your local machine.
Configure your development machine
First, we add the remotes to your local machine. If you’ve already defined a remote named origin (for example, if you followed GitHub’s instructions), you’ll want to delete the remote first:
git remote rm origin
Now we can add our new remote:
git remote add origin git@server.com:myrepo.git
git push origin master
And that’s it. You’ll probably also want to make sure you add a default merge and remote:
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
And that’s all. Now you can push/pull from origin as much as you like, and it’ll be stored remotely on your own myserver.com remote repository.
Bonus points: Make SSH more secure
This has been extensively covered by the excellent Slicehost tutorial, but just to recap:
Edit the SSH config:
sudo vi /etc/ssh/sshd_config
And change the following values:
Port 2207
...
PermitRootLogin no
...
AllowUsers myuser git
...
PasswordAuthentication no
Where 2207 is a port of your choosing. Make sure to add this so your Git remote:
git remote add origin ssh://git@myserver.com:2207/~/myrepo.git

SVN  

svn help
usage: svn <subcommand> [options] [args]
Subversion command-line client, version 1.6.15.
Type 'svn help <subcommand>' for help on a specific subcommand.
Type 'svn --version' to see the program version and RA modules
or 'svn --version --quiet' to see just the version number.
Most subcommands take file and/or directory arguments, recursing
on the directories.  If no arguments are supplied to such a
command, it recurses on the current directory (inclusive) by default.
Available subcommands:
 add
 blame (praise, annotate, ann)
 cat
 changelist (cl)
 checkout (co)
 cleanup
 commit (ci)
 copy (cp)
 delete (del, remove, rm)
 diff (di)
 export
 help (?, h)
 import
 info
 list (ls)
 lock
 log
 merge
 mergeinfo
 mkdir
 move (mv, rename, ren)
 propdel (pdel, pd)
 propedit (pedit, pe)
 propget (pget, pg)
 proplist (plist, pl)
 propset (pset, ps)
 resolve
 resolved
 revert
 status (stat, st)
 switch (sw)
 unlock
 update (up)
Changesets
Before we proceed further, we should warn you that there's going to be a lot of discussion of “changes” in the pages ahead. A lot of people experienced with version control systems use the terms “change” and “changeset” interchangeably, and we should clarify what Subversion understands as a changeset.
Everyone seems to have a slightly different definition of changeset, or at least a different expectation of what it means for a version control system to have one. For our purposes, let's say that a changeset is just a collection of changes with a unique name. The changes might include textual edits to file contents, modifications to tree structure, or tweaks to metadata. In more common speak, a changeset is just a patch with a name you can refer to.
In Subversion, a global revision number N names a tree in the repository: it's the way the repository looked after the Nth commit. It's also the name of an implicit changeset: if you compare tree N with tree N−1, you can derive the exact patch that was committed. For this reason, it's easy to think of revision N as not just a tree, but a changeset as well. If you use an issue tracker to manage bugs, you can use the revision numbers to refer to particular patches that fix bugs—for example, “this issue was fixed by r9238.” Somebody can then run svn log -r 9238 to read about the exact changeset that fixed the bug, and run svn diff -c 9238 to see the patch itself. And (as you'll see shortly) Subversion's svn merge command is able to use revision numbers. You can merge specific changesets from one branch to another by naming them in the merge arguments: passing -c 9238 to svn merge would merge changeset r9238 into your working copy.
svn propset svn:externals "eggtoolpalette -r853 http://svn.gnome.org/svn/libegg/trunk/libegg/toolpalette/" .
svn commit -m "Added eggtoolpalette"
svn update

MANAGEMENT                                                                  |




 _____ ___ _____ 
|_   _| | |   __|
  | | |_  |   __|
  |_|   |_|__|   
                                                           
 #t4f-core-plugin

java
+ gate
+ jin
+ jpf
+ jspf
+ service-loader 
+ sezpoz

js
+ jquery

msc
+ elasticsearch
+ maven
+ mozilla

osgi
+ eclipse http://www.eclipse.org/pde/
+ osgi
+ pf4j
+ felix
+ karaf
+ service-mix

server
+ vert.x
+ wildfly

web
+ ambari
+ atlassian
+ hawt.io
+ hudson
+ geronimo
+ scala-notebook https://github.com/Bridgewater/scala-notebook.git
+ zeppelin https://github.com/NFLabs/zeppelin.git

+ maven
+ maven-bundle
+ tycho
+ sigil
+ felix
+ obr
+ p2

+ http://moonshine.atteo.org/
+ jin
+ jpf
+ jspf
+ mvn
+ sezpoz
+ osgi

Maven plugin Aether
+ http://git.eclipse.org/gitroot/aether/aether-core.git
+ http://maven.apache.org/guides/plugin/guide-java-plugin-development.html

Java Plug-in Framework (JPF) Project
+ http://jpf.sourceforge.net/

JSPF Java Simple Plugin Framework
+ http://code.google.com/p/jspf/


```
 _____ ___ _____    _____         _     
|_   _| | |   __|  |   __|___ ___| |___ 
  | | |_  |   __|  |__   |  _| .'| | .'|
  |_|   |_|__|     |_____|___|__,|_|__,|
                                        
 #t4f-scala
```


# Run Scala from Shell

```
$ scala -version
Scala code runner version 2.10.4 -- Copyright 2002-2013, LAMP/EPFL

$ scala
Welcome to Scala version 2.10.4 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_20-ea).
Type in expressions to have them evaluated.
Type :help for more information.

scala> :help
All commands can be abbreviated, e.g. :he instead of :help.
Those marked with a * have more detailed help, e.g. :help imports.

:cp <path>                 add a jar or directory to the classpath
:help [command]            print this summary or command-specific help
:history [num]             show the history (optional num is commands to show)
:h? <string>               search the history
:imports [name name ...]   show import history, identifying sources of names
:implicits [-v]            show the implicits in scope
:javap <path|class>        disassemble a file or class name
:load <path>               load and interpret a Scala file
:paste                     enter paste mode: all input up to ctrl-D compiled together
:power                     enable power user mode
:quit                      exit the interpreter
:replay                    reset execution and replay all previous commands
:reset                     reset the repl to its initial state, forgetting all session entries
:sh <command line>         run a shell command (result is implicitly => List[String])
:silent                    disable/enable automatic printing of results
:type [-v] <expr>          display the type of an expression without evaluating it
:warnings                  show the suppressed warnings from the most recent line which had any

scala> println("Scala is installed!")
Scala is installed!

scala> for( a <- 1 to 3) {
     |    println( "Value of a: " + a );
     | }
Value of a: 1
Value of a: 2
Value of a: 3

scala> exit

$

```

# Run Scala from a file

$ vi HelloWorld.scala

```
object HelloWorld {
  def main(args: Array[String]) {
    println("Hello, world!")
  }
}
```

```
$ scala HelloWorld.scala
```

or

```
$ scalac HelloWorld.scala
$ scala -cp . HelloWorld
```

# Run Scala from Java

```
export BOOT_CLASSPATH="-Xbootclasspath/a:$SCALA_HOME/lib/akka-actors.jar:$SCALA_HOME/lib/jline.jar:$SCALA_HOME/lib/scala-actors.jar:$SCALA_HOME/lib/scala-actors-migration.jar:$SCALA_HOME/lib/scala-compiler.jar:$SCALA_HOME/lib/scala-library.jar:$SCALA_HOME/lib/scalap.jar:$SCALA_HOME/lib/scala-reflect.jar:$SCALA_HOME/lib/scala-swing.jar:$SCALA_HOME/lib/typesafe-config.jar"
java $BOOT_CLASSPATH -Dscala.usejavacp=true -Dscala.home="$SCALA_HOME" scala.tools.nsc.MainGenericRunner HelloWorld.scala
```

# Run Scala from Eclipse

* Run as Application (Right-click and select Run As > Scala Application) - You need a main method (or your class should extends App)
* Open the Scala Interpreter window (via menu Window, Show View), select code in Eclipse editor and type CTRL+SHIFT+X (see e.g. sandbox.scala)
* Create a Scala Worksheet (read more https://github.com/scala-ide/scala-worksheet/wiki/Getting-Started - You must install the plugin separately)
* Run io.datalayer.scala.repl.AosRepl



# Basics

A for loop is a repetition control structure that allows you to efficiently write a loop that needs to execute a specific number of times. 

There are various forms of for loop in Scala which are described below: 

The for Loop with Ranges

The simplest syntax of a for loop in Scala is:

for( var x <- Range ){
   statement(s);
}

Here, the Range could be a range of numbers and that is represented as i to j or sometime like i until j. The left-arrow <- operator is called a generator, so named because it's generating individual values from a range.
Example:

Following is the example of for loop with range using i to j syntax:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      // for loop execution with a range
      for( a <- 1 to 10) {
         println( "Value of a: " + a );
      }
   }
}

object Test {
   def t() {
      var a = 0;
      // for loop execution with a range
      for( a <- 1 to 10){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 3
value of a: 4
value of a: 5
value of a: 6
value of a: 7
value of a: 8
value of a: 9
value of a: 10

$

Following is the example of for loop with range using i until j syntax:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      // for loop execution with a range
      for( a <- 1 until 10){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 3
value of a: 4
value of a: 5
value of a: 6
value of a: 7
value of a: 8
value of a: 9

$

You can use multiple ranges separated by semicolon (;) within a for loop and in that case loop will iterate through all the possible computations of the given ranges. Following is an example of using just two ranges, you can use more than two ranges as well.

object Test {
   def main(args: Array[String]) {
      var a = 0;
      var b = 0;
      // for loop execution with a range
      for( a <- 1 to 3; b <- 1 to 3){
         println( "Value of a: " + a );
         println( "Value of b: " + b );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
Value of a: 1
Value of b: 1
Value of a: 1
Value of b: 2
Value of a: 1
Value of b: 3
Value of a: 2
Value of b: 1
Value of a: 2
Value of b: 2
Value of a: 2
Value of b: 3
Value of a: 3
Value of b: 1
Value of a: 3
Value of b: 2
Value of a: 3
Value of b: 3

$

The for Loop with Collections

The syntax of a for loop with collection is as follows:

for( var x <- List ){
   statement(s);
}

Here, the List variable is a collection type having a list of elements and for loop iterate through all the elements returning one element in x variable at a time.
Example:

Following is the example of for loop with a collection of numbers. Here we created this collection using List(). We will study collections in a separate chapter.

object Test {
   def main(args: Array[String]) {
      var a = 0;
      val numList = List(1,2,3,4,5,6);

      // for loop execution with a collection
      for( a <- numList ){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 3
value of a: 4
value of a: 5
value of a: 6

$

The for Loop with Filters

Scala's for loop allows to filter out some elements using one or more if statement(s). Following is the syntax of for loop along with filters.

for( var x <- List
      if condition1; if condition2...
   ){
   statement(s);
}

To add more than one filter to a for expression, separate the filters with semicolons(;).
Example:

Following is the example of for loop along with filters:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      val numList = List(1,2,3,4,5,6,7,8,9,10);
      // for loop execution with multiple filters
      for( a <- numList
           if a != 3; if a < 8 ){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 4
value of a: 5
value of a: 6
value of a: 7

$

The for Loop with yield:

You can store return values from a for loop in a variable or can return through a function. To do so, you prefix the body of the for expression by the keyword yield as follows:

var retVal = for{ var x <- List
     if condition1; if condition2...
}yield x

Note the curly braces have been used to keep the variables and conditions and retVal is a variable where all the values of x will be stored in the form of collection.
Example:

Following is the example to show the usage of for loop along with yield:

object Test {
   def main(args: Array[String]) {
      var a = 0;
      val numList = List(1,2,3,4,5,6,7,8,9,10);
      // for loop execution with a yield
      var retVal = for{ a <- numList 
                        if a != 3; if a < 8
                      }yield a
      // Now print returned values using another loop.
      for( a <- retVal){
         println( "Value of a: " + a );
      }
   }
}

When the above code is compiled and executed, it produces the following result:

$ scalac Test.scala
$ scala Test
value of a: 1
value of a: 2
value of a: 4
value of a: 5
value of a: 6
value of a: 7

$ scala
scala> val a = 1
a: Int = 1
scala> var b = 2
b: Int = 2
scala> b = b + a
b: Int = 3
scala> a = 2
<console>6: error: reassignment to val
       a = 2
         ^
scala> def square(x: Int) = x*x
square: (x: Int)Int
scala> square(3)
res0: Int = 9
scala> square(res0)
res1: Int = 81

scala> class Dog( name: String ) {
     |   def bark() = println(name + " barked")
     | }
defined class Dog
scala> val stubby = new Dog("Stubby")
stubby: Dog = Dog@1dd5a3d
scala> stubby.bark
Stubby barked
scala>

In [1]: 1
Out[1]: 1

In [2]: 1 + 2 + 3
Out[2]: 6

In [3]: (1 to 5).foreach { i => println(i); Thread.sleep(1000) }
1
2
3
4
5

In [4]: val x = 1
Out[4]: 1

In [5]: x
Out[5]: 1

In [6]: 100*x + 17
Out[6]: 117

In [7]: x.<TAB>
x.%             x.-             x.>>            x.isInstanceOf  x.toFloat       x.toString      x.|
x.&             x./             x.>>>           x.toByte        x.toInt         x.unary_+
x.*             x.>             x.^             x.toChar        x.toLong        x.unary_-
x.+             x.>=            x.asInstanceOf  x.toDouble      x.toShort       x.unary_~

In [7]: x.to<TAB>
x.toByte    x.toChar    x.toDouble  x.toFloat   x.toInt     x.toLong    x.toShort   x.toString

In [7]: x.toS<TAB>
x.toShort   x.toString

In [7]: 1/0
java.lang.ArithmeticException: / by zero

In [8]: java.util.UUID.fromString("abc")
java.lang.IllegalArgumentException: Invalid UUID string: abc
    java.util.UUID.fromString(UUID.java:226)

In [9]: class Foo(a: Int) { def bar(b: String) = b*a }

In [10]: new Foo(5)
Out[10]: Foo@70f4d063

In [11]: _10.bar("xyz")
Out[11]: xyzxyzxyzxyzxyz

In [12]: import scala.language.experimental.macros

In [13]: import scala.reflect.macros.Context

In [14]: object Macros {
    ...:     def membersImpl[A: c.WeakTypeTag](c: Context): c.Expr[List[String]] = {
    ...:         import c.universe._
    ...:         val tpe = weakTypeOf[A]
    ...:         val members = tpe.declarations.map(_.name.decoded).toList.distinct
    ...:         val literals = members.map(member => Literal(Constant(member)))
    ...:         c.Expr[List[String]](Apply(reify(List).tree, literals))
    ...:     }
    ...:
    ...:     def members[A] = macro membersImpl[A]
    ...: }
    ...:

In [15]: Macros.members[Int]
Out[15]: List(<init>, toByte, toShort, toChar, toInt, toLong, toFloat, toDouble, unary_~,
unary_+, unary_-, +, <<, >>>, >>, ==, !=, <, <=, >, >=, |, &, ^, -, *, /, %, getClass)



 _____  ____  ____  _  _    __    _____  ___ 
(  _  )(  _ \( ___)( \( )  /__\  (  _  )/ __)
 )(_)(  )___/ )__)  )  (  /(__)\  )(_)( \__ \
(_____)(__)  (____)(_)\_)(__)(__)(_____)(___/

OpenAOS - Open Application Operating System

This is an Asteroids Game from http://www.brainjar.com

To play Asteroids:

Asteroids Applet
Instructions
Wait for the applet and sounds to load, then click on the applet area and press the 'S' key to start.

Shoot the asteroids while avoiding collisions with them. Occasionally a flying saucer will appear and attempt to shoot you down with guided missles. Destroy it or the missles for more points.

You begin with three ships, a bonus ship is awarded for every 5000 points scored.
Keyboard Controls

Key     Description             Key     Description

S   Start Game                  P   Pause Game
Cursor Left     Rotate Left     Cursor Right    Rotate Right
Cursor Up   Fire Thrusters      Cursor Down     Fire Retro Thrusters
Spacebar    Fire Cannon         H   Hyperspace
M   Toggle Sound                D   Toggle Graphics Detail

Scoring
Object  Points
Large Asteroid  25
Small Asteroid  50
UFO     250
Missle  500

Option 1
--------
mvn package
java -jar target/openaos-game-asteroids

Option 2
--------
mvn exec:java

Enjoy!
javac aos/jni/JavaJNI.java
javah -jni aos.jni.JavaJNI
mv aos_jni_JavaJNI.h ../c

nm ../../../Debug/libt4f-essentials-c-jni.so | grep zero
sudo cp ../../../Debug/libt4f-essentials-c-jni.so /usr/lib
sudo ldconfig

gcc -I/opt/jdk1.8.0/include/ -I/opt/jdk1.8.0/include/linux -c -fpic ../c/JavaJNI.cpp
gcc -shared -o JavaJNI.so JavaJNI.o
mv JavaJNI.so libt4f-essentials-c-jni.so
nm libt4f-essentials-c-jni.so | grep zero
sudo cp libt4f-essentials-c-jni.so /usr/lib
sudo ldconfig

java JavaJNI
java -Djava.library.path=../../../Debug/src/main/c JavaJNI

```
 _____ ___ _____ 
|_   _| | |   __|
  | | |_  |   __|
  |_|   |_|__|
                                                           
 #t4f-core-python
```


# Install some Tools
```
$ sudo apt-get install python-setuptools python-pip python-pandas python-pandas python-sklearn fabric ipython-notebook python-numpy python-matplotlib
$ sudo pip install -U numpy
$ sudo pip install -U nltk
```
# Start a shell
```
python
>>> help()
...
>>> exit()
```
# Run a script
```
python script.py
```

T4F Essentials JAVA AOP
=======================

You have to mvn install before running the unit tests in you IDE, otherwise you will get such exceptions...

Caused by: java.lang.NoSuchMethodException: aos.aop.aspectj.auth.aspect.ProfileVerificationAspect.aspectOf()
1. Generate the server certificate
$JAVA_HOME/bin/keytool -genkey --keysize 1024 -alias server-alias -keyalg RSA -keypass changeit -storepass changeit -keystore keystore.jks

2. Export the generated server certificate in keystore.jks into the file server.cer
$JAVA_HOME/bin/keytool -export -alias server-alias -storepass changeit -file server.cer -keystore keystore.jks

T4F ESSENTIALS JAVA IO                                                      |

This module covers essential JAVA classes related to Input/Output operations (a.k.a IO).

NETTY

+ mvn install -Dcheckstyle.skip

BYTE STREAMS

abstract class InputStream
+ public abstract int read()
+ public int read(byte[])
+ public int read(byte[], int, int)
+ public long skip(long)
+ public int available()
+ public void close()
+ public void synchronized mark(int)
+ public void synchronized reset()
+ public boolean markSupported()
---
abstract class OutputStream
+ void write(int)
+ void write(byte[])
+ void write(byte[], int, int)
+ void flush()
+ void close()

FILE STREAMS

public class FileInputStream extends InputStream
---
public class FileOutputStream extends InputStream

NETWORK STREAMS

URL
URLConnection
ServerSocket/Socket (JDK1)
+ Synchronous
+ Blocking
---
ServerSocketChannel/SocketChannel (JDK4)
+ Synchronous
+ NonBlocking (*)
+ Reactor Pattern
+ Notification
---
AsynchronousServerSocketChannel/AsynchronousSocketChannel (JDK7)
+ Asynchronous (*)
+ NonBlocking (*)
+ Proactor Pattern

FILTER STREAMS

public FilterInputStream(InputStream in) { this.in = in; }
---
public FilterOutputStream(OutputStream out) { this.out = out; }

PRINT STREAMS

public PrintStream(OutputStream out) { this(out, false); }
public PrintStream(OutputStream out, boolean autoFlush) { this(autoFlush, requireNonNull(out, "Null output stream")); }
public PrintStream(OutputStream out, boolean autoFlush, String encoding) throws UnsupportedEncodingException { this(autoFlush, requireNonNull(out, "Null output stream"), toCharset(encoding)); }
public PrintStream(String fileName) throws FileNotFoundException { this(false, new FileOutputStream(fileName)); }
public PrintStream(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException { this(false, toCharset(csn), new FileOutputStream(fileName)); }
public PrintStream(File file) throws FileNotFoundException { this(false, new FileOutputStream(file)); }
public PrintStream(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException { ... }

DATA STREAMS

DataInputStream
+ DataInputStream(InputStream)
+ read(byte[])
+ read(byte[], int, int)
+ readFully(byte[])
+ readFully(byte[], int, int)
+ skipBytes(int)
+ readBoolean()
+ readByte()
+ readUnsignedByte()
+ readShort()
+ readUnsignedShort()
+ readChar()
+ readInt()
+ readLong()
+ readFloat()
+ readDouble()
+ lineBuffer : char[]
+ deprecated readLine
+ readUTF()
+ readUTF(DataInput)
---
DataOutputStream
DataOutputStream(OutputStream)
+ incCount(int)
+ write(int)
+ write(byte[], int, int)
+ flush()
+ writeBoolean(boolean)
+ writeByte(int)
+ writeShort(int)
+ writeChar(int)
+ writeInt(int)
+ writeLong(long)
+ writeFloat(float)
+ writeDouble(double)
+ writeBytes(String)
+ writeChars(String)
+ writeUTF(String)
+ writeUTF(String, DataOutput)
+ size()

MEMORY STREAMS

+ 

COMPRESSING STREAMS

+ 

JAR ARCHIVES

+ 

CRYPTHOGRAPHIC STREAMS

+ 

OBJECT SERIALIZATION

+ 

CHARACTER READERS AND WRITERS

Reader
+ read(CharBuffer)
+ read()
+ read(char[])
+ read(char[], int, int)
+ maxSkipBufferSize : int
+ skipBuffer : char[]
+ skip(long)
+ ready()
+ markSupported()
+ mark(int)
+ reset()
+ close()
---
Writer
+ write(int)
+ write(char[])
+ write(char[], int, int)
+ write(String)
+ write(String, int, int)
+ append(CharSequence)
+ append(CharSequence, int, int)
+ append(char)
+ flush()
+ close()
---
Character Array Readers and Writers
---
String Readers and Writers
---
Reading and Writing Files
---
Buffered Readers and Writers
---
Print Writers
---
Piped Readers and Writers
---
Filtered Readers and Writers

NIO BUFFERS

+ 

NIO CHANNELS

JDK1              >>> JDK4                >>> JDK7
---                   ----                    ----
FileIOutputStream >>> FileChannel         >>> AsynchronousFileChannel
IOutputStream     >>> SocketChannel       >>> AsynchronousSocketChannel
IOutputStream     >>> ServerSocketChannel >>> AsynchronousServerSocketChannel

NIO SELECTORS

+ 

NIO PIPE CHANNELS

+ 

NIO FILES

+ 

FILE SYSTEM

+ 

FILE DIALOGS

+ 

CHARSETS AND UNICODE

+ 

FORMATTED IO WITH java.text

+ 

JAVA COMMUNICATIONS API

+ 

USB

+ 

J2ME GENERIC CONNECTION FRAMEWORK

+ 

BLUETOOTH

+ 


SMTP 

Simple Mail Transfer [Protocol http://www.ietf.org/rfc/rfc2821.txt]

telnet localhost 2525
EHLO test
MAIL FROM: <eric@localhost.net>
RCPT TO: <eric@localhost.net>
DATA
From: Eric Charles <eric@localhost.net>
To: Eric Charles <eric@localhost.net>
Subject: test message

This is a test message.
.
QUIT
---

SMTP Service Extension for Authentication [http://www.ietf.org/rfc/rfc2554.txt]

    S: 220 smtp.example.com ESMTP server ready
    C: EHLO jgm.example.com
    S: 250-smtp.example.com
    S: 250 AUTH CRAM-MD5 DIGEST-MD5
    C: AUTH FOOBAR
    S: 504 Unrecognized authentication type.
    C: AUTH CRAM-MD5
    S: 334
    PENCeUxFREJoU0NnbmhNWitOMjNGNndAZWx3b29kLmlubm9zb2Z0LmNvbT4=
    C: ZnJlZCA5ZTk1YWVlMDljNDBhZjJiODRhMGMyYjNiYmFlNzg2ZQ==
    S: 235 Authentication successful.

Here, RFC 2554 uses multiple values for the keyword AUTH as ESMTP command, which is permitted by RFC 1869, however broke the parsing of several ESMTP client implementations. One work around is, to add artificially a "=" (equal sign) between the AUTH keyword and the value, eg. AUTH=LOGIN.

---

AUTH mechanisms
There are three authentication mechanisms widely used for SMTP Authentication. 
In the documentation coming with the qmail-smtp-auth-patch by Krzysztof Dabrowski, an overview of MUAs and their AUTH mechanisms is provided (which I updated):

---

AUTH LOGIN

The most common 'AUTH LOGIN' mechanism looks like this

    S: 220 esmtp.example.com ESMTP
    C: ehlo client.example.com
    S: 250-esmtp.example.com
    S: 250-PIPELINING
    S: 250-8BITMIME
    S: 250-SIZE 255555555
    S: 250 AUTH LOGIN PLAIN CRAM-MD5
    C: auth login
    S: 334 VXNlcm5hbWU6
    C: avlsdkfj
    S: 334 UGFzc3dvcmQ6
    C: lkajsdfvlj
    S: 535 authentication failed (#5.7.1)

From all the ESMTP Authentication mechanisms the offered, the client selects 'auth login'.
The ESMTP server issues then a '334 VXNlcm5hbWU6' where 'VXNlcm5hbWU6' is a BASE64 encoded string 'Username:'.
The client provides the BASE64 encoded user name and the sever responses with the request for the 'Password:' ('334 UGFzc3dvcmQ6').
In the sample above, random input is given and the server finally rejects the authentication request.

However, there exists a different, RFC compliant version of this behavior, where the client initially sends the userid already with the AUTH LOGIN method:

    C: AUTH LOGIN ZHVtbXk=
    S: 334 UGFzc3dvcmQ6
    C: Z2VoZWlt

---

AUTH PLAIN

According to IANA's documentation, the PLAIN Authentication is defined in RFC 2245 "Anonymous SASL Mechanism". However, a more useful explanation of the PLAIN Authentication can be found in RFC 2595 "Using TLS with IMAP, POP3 and ACAP" (chapter 6):

    "The mechanism consists of a single message from the client to the server. The client sends the authorization identity (identity to login as), followed by a US-ASCII NULL character, followed by the authentication identity (identity whose password will be used), followed by a US-ASCII NULL character, followed by the clear-text password. The client may leave the authorization identity empty to indicate that it is the same as the authentication identity."

In other words, the correct form of the AUTH PLAIN value is 'authorization-id\0authentication-id\0passwd' where '\0' is the null byte.

Some ESMTP AUTH PLAIN implementations don't follow that procedure completely. We see that in the trace using Netscape's 4.8 MUA connecting to a modified Qmail 1.03 to do PLAIN authentication:

    C: ehlo client.example.com
    S: 220-esmtp.example.com
    C: AUTH PLAIN dGVzdAB0ZXN0AHRlc3RwYXNz
    S: 235 ok, go ahead (#2.0.0)
    C: RCPT TO:<....>

In this sample, the user name was 'test' and the password 'testpass'. Here, the Netscape client immediately blasts the authentication information to the server (including the artificial authorization identity 'test') without waiting for the server to announce his SMTP Auth capabilites.

A further procedure is possible for clients submitting the authentication string after the AUTH PLAIN:

    C: AUTH PLAIN
    S: 334
    C: dGVzdAB0ZXN0AHRlc3RwYXNz

Authorization-ID versus Authentication-ID

In the samples above, we have used the terms userid and usermame as a synonym (and neglegting it's encoding entirely).

However, within AUTH PLAIN the identification of the client is subdivided into a authoriziation-id and an authentication-id typically the userid followed the password. There is no strict rule about the usage for the authorization-id. In particular, simply setting authorization-id=authentiation-id is certainly valid, but at best includes some redundancy.

For SMTP Authentication purpose, it is not clear what is the purpose of the authorization-id and which policy for the SMTP server to use in spite of the provided (or potential missing) value here. Regarding the SMTP client, it might be useful to set authorization-id = <return-path>. However, some SMTP server use erroneously the authorization-id for authentication purpose and don't evaluate the authentication-id. Thus, for compatibility reasons and the lack of standardization, it seems advisible to use both values filled with the identical content of the userid.
AUTH CRAM-MD5

While for AUTH PLAIN and LOGIN clear user names and password are transmitted, things go significantly more secure with the CRAM-MD5 authentication mechanism. As already mentioned in it's name, CRAM-MD5 combines a Challenge/Response mechanism to exchange information and a (cryptographic) Message Digest 5 algorithm to hash important information.

I use an example based on a posting of Markus Stumpf to the Qmail mailing list. A typical ESMTP AUTH CRAM-MD5 dialog starts like this:

    S: 220 popmail.space.net ESMTP
    C: ehlo client.example.com
    S: 250-popmail.space.net
    S: 250-PIPELINING
    S: 250-8BITMIME
    S: 250-SIZE 0
    S: 250 AUTH CRAM-MD5
    C: auth cram-md5
    S: 334 PDI0NjA5LjEwNDc5MTQwNDZAcG9wbWFpbC5TcGFjZS5OZXQ+
    C: dGltIGI5MTNhNjAyYzdlZGE3YTQ5NWI0ZTZlNzMzNGQzODkw

Unlike AUTH LOGIN, the server's response is now a one-time BASE64 encoded 'challenge'. The challenge 'PDI0NjA5LjEwNDc5MTQwNDZAcG9wbWFpbC5TcGFjZS5OZXQ+' translates to '<24609.1047914046@popmail.Space.Net>'. The leading and trailing brackets ('<', '>') are mandatory, as well the portion of the challenge which provides the hostname after the '@'. '24609.1047914046' is a random string, typically build from the 'pid' and the current time stamp to make that challenge unique.

The client's reponse includes both the username and the digest. While the user name is transmitted in clear text (but of course BASE64 encoded), the server's challenge is used by the client to generate a 'digest' from the challenge and the password (which is commonly called 'secret' or 'shared secret' in this context) and reads as:

    tim b913a602c7eda7a495b4e6e7334d3890 

The 'shared secret' following the username with an additional space is computed employing the following MD5 hashing algorithm:

    digest = MD5(('secret' XOR opad), MD5(('secret' XOR ipad), challenge))

If both the ESMTP server and the client 'share' the same challenge and secret, the user may now be authenticated successfully by means of the transmitted and BASE 64 encoded 'user name' and 'digest'.

The transmission of the password (the secret) is now replaced by the digest. Though the digest is calculated by means of the challenge and the secret, which by itself is send in cleartext, it is (by our current understanding) practically impossible to reconstructed the secret; except for dictionary attacks:

    The secret is very effectively scrambled by the challenge and
    we use the avalanche effect of the hash function.

AUTH parameter as part of the 'MAIL FROM:' command

According to RFC 2554, authentication information can optionally provided as ESMTP AUTH parameter with a single value in the 'MAIL FROM:' command. The ESMTP AUTH parameter has to be used in the following way:

    C: MAIL FROM:<e=mc2@example.com> AUTH=e+3Dmc2@example.com
    S: 250 OK

Here, the AUTH value has to be encoded inside an "xtext" as described in RFC 1891 "SMTP Service Extension for Delivery Status Notifications". RFC 2554 discusses the use of the optional AUTH parameter to the 'MAIL FROM:' command in the context of a "trusted environment to communicate the authentication of individual messages". It actually requires the proliferation of the AUTH information to another MTA (Mail Transfer Agent; eg. email gateway) as AUTH parameter when relaying the message to any server which supports the AUTH extension. In case the authentication is to weak, the Server should set 'AUTH=<>' as parameter to the 'MAIL FROM:' command.

I am not aware, that any MUA implementation using the latter scheme however, some MTA (eg. Postfix) support it.

Qmail 1.03, and in particular qmail-smtpd has no understanding of any parameters in the 'MAIL FROM:' command; it lacks a qualified ESMTP support in that respect. This holds in addition for the ESMTP 'SIZE' announcement (RFC1870), which was partially recovered by Chris Harris' SIZE extension.
My current SMTP-Authentication patch for qmail-smtpd introduces a complete and extensible 'MAIL FROM:' parameter parser and treats the provided AUTH parameter as $TCPREMOTEINFO.
Authentication State

As outlined, RFC 2554 allows two distinct usages of the ESMTP AUTH extension:

    AUTH parameter exchange as part of the SMTP dialog (as shown above).
    AUTH as ESMTP parameter in the 'MAIL FROM:' command.

Clearly, this has a significant impact on the authentication state itself. The first approach is actually equivalent with an authenticated SMTP session, while the second is effectively the authentication of the provided 'MAIL FROM:' sender and serves as 'informational' data. Unfortunately, RFC 2554 does not give any hints what an "authenticated" state really means. There is a common sense, that an authenticated user is allowed for unrestricted relaying.

In case the authentication information is transmitted as extension to the 'MAIL FROM:' command, one may treat that equivalently with having an additional 'tcpremoteinfo' - usually provided by means of the 'ident' protocol.
Authentication Aborts

The Client may cancel the authentication request, sending simply a '*' to the server. The server must reject the AUTH procedure and replying the SMTP protocol error '501'. However, the server has to cache the authentication method in order to preserve the state.
Authentication Return Codes

The server may accept or reject the AUTH request by the client with one of the following response codes according mostly to RFC 4954:

SMTP Authentication Reply-Codes and their implementation in my qmail-authentication Code    Meaning     Issued by
qmail-smtpd     Honored by
qmail-remote
235     Authentication Succeeded    yes     yes
334     Text part containing the [BASE64] encoded string    yes     yes
432     A password transition is needed     no  >= 0.75
454     Temporary authentication failure    yes     n/a
500     Authentication Exchange line is too long    no  n/a
501     Malformed auth input/Syntax error   yes     n/a
503     AUTH command is not permitted during a mail transaction     yes     n/a
504     Unrecognized authentication type    yes     n/a
530     Authentication required     Submission mode     n/a
534     Authentication mechanism is to weak     no  no
535     Authentication credentials invalid  yes     yes
538     Encryption required for requested authentication mechanism  no  no

After a failed ESMTP request (starting with an 5x code), the server has to reset it's state tables and the client may either provide the correct information, or may chose a different authentication mechanism, or may go on in un-authenticated state.
Multiple Authentication announcements

The EMSTP server may offer several Auth types to the client:

    S: 250 AUTH EXTERNAL GSSAPI DIGEST-MD5 PLAIN

How should the ESMTP server deploy and the client depend on this information?

    The ESMTP server may issue an ordered list of Auth types to the client.
    Consider the situation you are a market tender: You offer to your clients apples, bananas and peaches. Can you command the customer what to chose ? Clearly: No.
    It is solely the responsibility of the customer, the ESMTP client respectively, to select the Auth type he can digest and does prefer.
    By the very same token, it makes no sense to announce a particular Auth mechanism (as ESMTP server) and then tell the client: 'Oh no, this method is to weak!'

In short: The ESMTP client picks up the Auth mechanism suited for him -- matching the server's announcements. It is the ESMTP server's obligation to support the announced Auth method and to have the respective authentication data in stock.
Authentication proliferation

In general, SMTP Authentication allows a one-hop User-to-MTA authentication. An interesting case is to discuss Authentication proliferation. Let's first define what we are talking about:

    Typically, a User receives emails by means of the protocols POP3 or IMAP4. For sending, a useful approach would be, that the User - the email originator - sets up an email client (ie. Outlook) for SMTP Authentication and first connects to the Principal-MTA. Here, the user-id and password is stored; which is typically the same as the one used for the POP3/IMAP4 account. In this case, the Principal-MTA acts as SMTP-Relay. Now, we have User-to-MTA Authentication. 

It may be necessary to obey SMTP Authentication to the recipient's MTA or a further internal SMTP-Gateway, which connects to the Internet. Thus, we are talking about User-to-Principal-MTA-to-MTA SMTP traffic with the requirement of an authenticated communication chain.

What shall this be good for? We have seen, that SMTP Authentication serves mainly to allow unrestricted relaying. With an End-to-End authentication, two additional aims could be achieved:

    The authenticity of the message itself (the content of the email) can be guaranteed,
    The uniqueness and authenticity of the email's originator (the provided Mail From: <Return-Path>) can be ensured.

The latter is a requirement for the first, since it enables to reject emails with forged/spoofed "Return-Path" addresses.

In order to maintain an authentication chain for the User's MUA, not only the user-id and password has to be proliferated, but rather in addition the "Return-Path" address. In this respect, the Mail From: <Return-Path> acts as authorization information.
Ironically, this concept was already introduced for the AUTH PLAIN authentication scheme (as discussed above) and later dropped. Unfortunately, with today's SMTP Authentication, an Authentication proliferation is not possible without changing the standard.
Today, we see a huge activity to demand authentication in email traffic, in order to reduce the spam load. As outlined, ensuring authentication for emails is to weak to reduce spam; additionally, qualified authorization information has to be included.
Authentication information in the email "Received:" header [RFC 3848]

One - actually inadequate - attempt in this direction is to add authentication information into the email header, which is required by RFC 3848. The standard SMTP Authentication patches for qmail-smtpd incude the authenticated user equivalent to the tcpremoteinfo in the Received header:

    Received: from xdsl-81-173-228-159.netcologne.de (HELO mail.fehnet.net) (erwin@fehcom.net@81.173.228.159)
    by hamburg134 with SMTP; 23 Jan 2005 11:53:28 -0000

Though the information erwin@fehcom.net@81.173.228.159 is rather precise, it lacks the knowledge, how it is derived. RFC 3848 requires a different notation, which is incorporated in my most recent SMTP authentication patches for qmail:

    Received: from xdsl-81-173-228-159.netcologne.de (HELO mail.fehnet.net) (erwin@fehcom.net@81.173.228.159)
    by hamburg134 with ESMTPA; 23 Jan 2005 13:32:13 -0000

The keyword ESMTPA denotes "ESMTP Authentication" and thus the information presented can be clearly interpreted. However, the quality of this information can not be trusted, if it does not originate from the last receiving host.
Some Anti-Spam programs, like SpamAssassin begin to use this information including it in the spam-weight calculation of the message. As pointed out by Dary C.W. O'Shea (Committer of the Apache SpamAssassin) the "trust boundary extension", which deals with the interpretation of the email header, works in a top-down approach, in order to verify the integrity of the presented information.
Since any email header can be forged easily, additional checks for each SMTP connection have to be facilitated, in order to minimize any potential forgery. Thus, the basic problem remains to derive trust-worth information from a per-se un-trusty environment.


POP3 

telnet localhost 1100
USER eric@localhost.net
PASS eric
STAT
RETR 1
QUIT

IMAP4

telnet localhost 1433
a1 LOGIN eric@localhost.net eric
a2 SELECT INBOX
a3 FETCH 1 rfc822
a4 LOGOUT

a1 LOGIN eric@localhost.net eric
a1 OK Logged in.
a2 LIST "" "*"
* LIST (\HasNoChildren) "." "INBOX"
a2 OK List completed.
a3 EXAMINE INBOX
* FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
* OK [PERMANENTFLAGS ()] Read-only mailbox.
* 1 EXISTS
* 1 RECENT
* OK [UNSEEN 1] First unseen.
* OK [UIDVALIDITY 1257842737] UIDs valid
* OK [UIDNEXT 2] Predicted next UID
a3 OK [READ-ONLY] Select completed.
a4 FETCH 1 BODY[]
* 1 FETCH (BODY[] {405}
Return-Path: sender@example.com
Received: from client.example.com ([192.0.2.1])
server:         by mx1.example.com with ESMTP
server:         id <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server:         for <recipient@example.com>; Tue, 20 Jan 2004 22:34:24 +0200
server: From: sender@example.com
server: Subject: Test message
server: To: recipient@example.com
server: Message-Id: <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server:
server: This is a test message.
server: )
a4 OK Fetch completed.
a5 LOGOUT
* BYE Logging out
a5 OK Logout completed.



telnet: > telnet imap.example.com imap
telnet: Trying 192.0.2.2...
telnet: Connected to imap.example.com.
telnet: Escape character is '^]'.
server: * OK Dovecot ready.
client: a1 LOGIN MyUsername MyPassword
server: a1 OK Logged in.
client: a2 LIST "" "*"
server: * LIST (\HasNoChildren) "." "INBOX"
server: a2 OK List completed.
client: a3 EXAMINE INBOX
server: * FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
server: * OK [PERMANENTFLAGS ()] Read-only mailbox.
server: * 1 EXISTS
server: * 1 RECENT
server: * OK [UNSEEN 1] First unseen.
server: * OK [UIDVALIDITY 1257842737] UIDs valid
server: * OK [UIDNEXT 2] Predicted next UID
server: a3 OK [READ-ONLY] Select completed.
client: a4 FETCH 1 BODY[]
server: * 1 FETCH (BODY[] {405}
server: Return-Path: sender@example.com
server: Received: from client.example.com ([192.0.2.1])
server:         by mx1.example.com with ESMTP
server:         id <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server:         for <recipient@example.com>; Tue, 20 Jan 2004 22:34:24 +0200
server: From: sender@example.com
server: Subject: Test message
server: To: recipient@example.com
server: Message-Id: <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server: 
server: This is a test message.
server: )
server: a4 OK Fetch completed.
client: a5 LOGOUT
server: * BYE Logging out
server: a5 OK Logout completed.

Testing
Testing mail delivery

Right, now we're ready to test things out! First, let's look at mailbox delivery. In fact we have to deliver at least one mail into each mailbox to create its directory structure, before we can access it using pop3 or imap.

Here's one way to do it: we can invoke Exim, Linnet's mail transport agent, directly from the command line to test whether an address is valid and to perform a delivery to a mailbox. In the latter case you have to type the message directly in, line by line, ending with ctrl-D or a dot on a line of its own.

# linnet exim -bt fred@example.com
Maildir directory: /var/linnet/mail/6/25/fred%40example.com/Maildir
fred@example.com
  router = maildir, transport = maildir_delivery
# linnet exim -v -odf fred@example.com
Subject: test

this is a test
.
LOG: MAIN
  <= root@billdog.local.linnet.org U=root P=local S=381
delivering 1DBBO8-0000wC-El
Maildir directory: /var/linnet/mail/6/25/fred%40example.com/Maildir
LOG: MAIN
  => fred@example.com F=<root@billdog.local.linnet.org> P=<root@billdog.local.li
nnet.org> R=maildir T=maildir_delivery S=503 QT=4s DT=0s
LOG: MAIN
  Completed

Another way to do it is by connecting to the SMTP daemon on port 25 and submitting a mail over TCP/IP, in the same way that incoming messages are received over the Internet. After the 'data' command, the message is terminated by a single dot on a line of its own.

# telnet 127.0.0.1 25
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
220 billdog.local.linnet.org (localhost [127.0.0.1]:25) ESMTP Exim 4.50+Linnet+0
.4.0 Tue, 15 Mar 2005 12:47:16 +0000
ehlo test
250-billdog.local.linnet.org Hello localhost [127.0.0.1]
250-SIZE 52428800
250-PIPELINING
250 HELP
mail from:<>
250 OK
rcpt to:<wilma@example.com>
250 Accepted
data
354 Enter message, ending with "." on a line by itself
subject: test

this is a test
.
250 OK id=1DBBSK-0000wa-Ek
quit
221 billdog.local.linnet.org closing connection
Connection closed by foreign host.

In this case you don't actually see the delivery taking place, but you can find it in Exim's log files:

# tail /var/linnet/exim/log/mainlog
...
2005-03-15 12:47:35 +0000 1DBBSK-0000wa-Ek <= <> H=localhost (test) [127.0.0.1]:
51793 I=[127.0.0.1]:25 P=esmtp S=258 for wilma@example.com
2005-03-15 12:47:35 +0000 1DBBSK-0000wa-Ek => wilma@example.com F=<> P=<> R=mail
dir T=maildir_delivery S=352 QT=7s DT=0s
2005-03-15 12:47:35 +0000 1DBBSK-0000wa-Ek Completed
&prompt;

If example.com were a real domain, and you set up the domain name system with an MX record pointing at your Linnet box, people on the Internet could now send mail to <fred@example.com> and <wilma@example.com>, and it would arrive in their mailboxes.
Testing POP3 and IMAP

You can of course test POP3 and IMAP access by pointing a mail client at your new mailserver, but it's a much better test to connect to it directly on port 110 (POP3) or port 143 (IMAP) and login directly. This eliminates any uncertainty that there may be an issue with your client program, and in any case gives more useful debugging information if there is a problem.

# telnet localhost 110
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
+OK Hello there.
user fred@example.com
+OK Password required.
pass wibble
-ERR Temporary problem, please try again later

Oops, what happened there? Well, you can check the logs. The POP3 and IMAP daemons use 'syslog' to record their data. Depending on how your system is set up, mail logs probably go to /var/log/maillog.

# tail /var/log/maillog
...
Mar 15 12:55:58 billdog pop3d: authdaemon: s_connect() failed: Connection refused
Mar 15 12:55:58 billdog pop3d: [Hint: perhaps authdaemond is not running?]
Mar 15 12:55:58 billdog pop3d: LOGIN FAILED, user=fred@example.com, ip=[127.0.0.1]
Mar 15 12:55:58 billdog pop3d: authentication error: Connection refused

Aha, now we see the problem: the courier-imap packages have a separate authentication daemon whose job it is to validate passwords, and it's not running. So we simply have to start it and try again:

# linnet start authdaemon
authdaemon: running (pid 3666)
# telnet localhost 110
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
+OK Hello there.
user fred@example.com
+OK Password required.
pass wibble
+OK logged in.
stat
+OK 1 515
retr 1
+OK 515 octets follow.
Return-path: <root@billdog.local.linnet.org>
Envelope-to: fred@example.com
Delivery-date: Tue, 15 Mar 2005 12:43:12 +0000
Received: from root by billdog.local.linnet.org (localhost)
        with local id 1DBBO8-0000wC-El (Exim 4.50) for fred@example.com
        (return-path <root@billdog.local.linnet.org>); Tue, 15 Mar 2005
12:43:12 +0000
Subject: test
Message-Id: <E1DBBO8-0000wC-El@billdog.local.linnet.org>
From: Charlie Root <root@billdog.local.linnet.org>
Date: Tue, 15 Mar 2005 12:43:10 +0000

this is a test
.
quit
+OK Bye-bye.
Connection closed by foreign host.
&prompt;

That's good. IMAP commands are different, but can still be given using telnet. Note that every command must be prefixed with a "tag", which is an arbitrary sequence of characters, and a space. In this example I have used "a" as the tag.

# telnet localhost 143
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
* OK [CAPABILITY IMAP4rev1 UIDPLUS CHILDREN NAMESPACE THREAD=ORDEREDSUBJECT THRE
AD=REFERENCES SORT QUOTA IDLE ACL ACL2=UNION STARTTLS] Courier-IMAP ready. Copyr
ight 1998-2005 Double Precision, Inc.  See COPYING for distribution information.
a login wilma@example.com boing
a OK LOGIN Ok.
a select inbox
* FLAGS (\Draft \Answered \Flagged \Deleted \Seen \Recent)
* OK [PERMANENTFLAGS (\* \Draft \Answered \Flagged \Deleted \Seen)] Limited
* 1 EXISTS
* 1 RECENT
* OK [UIDVALIDITY 1110891662] Ok
* OK [MYRIGHTS "cdilrsw"] ACL
a OK [READ-WRITE] Ok
a fetch 1 rfc822
* 1 FETCH (RFC822 {362}
Return-path: <>
Envelope-to: wilma@example.com
Delivery-date: Tue, 15 Mar 2005 12:47:35 +0000
Received: from localhost ([127.0.0.1]:51793 helo=test)
        by billdog.local.linnet.org (localhost [127.0.0.1]:25)
        with esmtp id 1DBBSK-0000wa-Ek (Exim 4.50) for wilma@example.com
        (return-path <>); Tue, 15 Mar 2005 12:47:35 +0000
subject: test

this is a test
)
a OK FETCH completed.
a logout
* BYE Courier-IMAP server shutting down
a OK LOGOUT completed
Connection closed by foreign host.


DNS  

client: > dig example.com mx
client: > nslookup -query=mx example.com
dig @172.16.1.131 apache.org MX
dig -x 91.183.38.48
nslookup 91.183.38.48
host 91.183.38.48

MONITORING                                                                  |

tcpdump
tcpdump -i eth0 -v -X -s 1514


TSHARK                                                                      |

tshark


WIRESHARK                                                                   |

$ sudo apt-get install wireshark
$ sudo dpkg-reconfigure wireshark-common
$ sudo usermod -a -G wireshark $USER
$ sudo reboot
Apparently, the libfreetype you're using is incompatible with Wireshark. Others have had similar problems (here and here), and it seems to be related to a foul DYLD_LIBRARY_PATH. The second link (referring to gnuplot but same problem here) provides a temporary(?) workaround:
    Open the folder /Applications in the finder
    Right-click on Wireshark.app and select "Show package contents"
    Navigate to /Applications/Wireshark.app/Contents/Resources/bin
    Right-click on the file "wireshark" and select "Open with -> Other ... -> TextEdit.app"
    Change the line:
from: DYLD_LIBRARY_PATH="${ROOT}/lib:${DYLD_LIBRARY_PATH}"
to: DYLD_LIBRARY_PATH="${ROOT}/lib"
and
from: DYLD_FRAMEWORK_PATH
to: DYLD_FRAMEWORK_PATH="${ROOT}/lib"
EDIT: If the workaround above doesn't work for you, try re-installing freetype [from MacPorts].
The Wireshark Wiki
Login
CaptureFilters
    FrontPage
    RecentChanges
    FindPage
    HelpContents
    CaptureFilters
    Immutable Page
    Info
    Attachments
CaptureFilters
An overview of the capture filter syntax can be found in the User's Guide. A complete reference can be found in the expression section of the tcpdump manual page.
Wireshark uses the same syntax for capture filters as tcpdump, WinDump, Analyzer, and any other program that uses the libpcap/WinPcap library.
If you need a capture filter for a specific protocol, have a look for it at the ProtocolReference.
Contents
    CaptureFilters
      Examples
      Useful Filters
      Default Capture Filters
      Further Information
      See Also
      Discussion
Examples
Capture only traffic to or from IP address 172.18.5.4:
    host 172.18.5.4
Capture traffic to or from a range of IP addresses:
    net 192.168.0.0/24
or
    net 192.168.0.0 mask 255.255.255.0
Capture traffic from a range of IP addresses:
    src net 192.168.0.0/24
or
    src net 192.168.0.0 mask 255.255.255.0
Capture traffic to a range of IP addresses:
    dst net 192.168.0.0/24
or
    dst net 192.168.0.0 mask 255.255.255.0
Capture only DNS (port 53) traffic:
    port 53
Capture non-HTTP and non-SMTP traffic on your server (both are equivalent):
    host www.example.com and not (port 80 or port 25)
    host www.example.com and not port 80 and not port 25
Capture except all ARP and DNS traffic:
    port not 53 and not arp
Capture traffic within a range of ports
    (tcp[0:2] > 1500 and tcp[0:2] < 1550) or (tcp[2:2] > 1500 and tcp[2:2] < 1550)
or, with newer versions of libpcap (0.9.1 and later):
    tcp portrange 1501-1549
Capture only Ethernet type EAPOL:
    ether proto 0x888e
Reject ethernet frames towards the Link Layer Discovery Protocol Multicast group:
    not ether dst 01:80:c2:00:00:0e
Capture only IP traffic - the shortest filter, but sometimes very useful to get rid of lower layer protocols like ARP and STP:
    ip
Capture only unicast traffic - useful to get rid of noise on the network if you only want to see traffic to and from your machine, not, for example, broadcast and multicast announcements:
    not broadcast and not multicast
Capture IPv6 "all nodes" (router and neighbor advertisement) traffic. Can be used to find rogue RAs:
    dst host ff02::1
Capture HTTP GET requests. This looks for the bytes 'G', 'E', 'T', and ' ' (hex values 47, 45, 54, and 20) just after the TCP header. "tcp[12:1] & 0xf0) >> 2" figures out the TCP header length. From Jefferson Ogata via the tcpdump-workers mailing list.
    port 80 and tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x47455420
Useful Filters
Blaster and Welchia are RPC worms. (Does anyone have better links, i.e. ones that describe or show the actual payload?)
Blaster worm:
    dst port 135 and tcp port 135 and ip[2:2]==48
Welchia worm:
    icmp[icmptype]==icmp-echo and ip[2:2]==92 and icmp[8:4]==0xAAAAAAAA
   The filter looks for an icmp echo request that is 92 bytes long and has an icmp payload that begins with 4 bytes of A's (hex). It is the signature of the welchia worm just before it tries to compromise a system.
Many worms try to spread by contacting other hosts on ports 135, 445, or 1433. This filter is independent of the specific worm instead it looks for SYN packets originating from a local network on those specific ports. Please change the network filter to reflect your own network.
dst port 135 or dst port 445 or dst port 1433  and tcp[tcpflags] & (tcp-syn) != 0 and tcp[tcpflags] & (tcp-ack) = 0 and src net 192.168.0.0/24
Default Capture Filters
Wireshark tries to determine if it's running remotely (e.g. via SSH or Remote Desktop), and if so sets a default capture filter that should block out the remote session traffic. It does this by checking environment variables in the following order:
Environment Variable
Resultant Filter
SSH_CONNECTION
not (tcp port srcport and addr_family host srchost and tcp port dstport and addr_family host dsthost)
SSH_CLIENT
not (tcp port srcport and addr_family host srchost and tcp port dstport)
REMOTEHOST
not addr_family host host
DISPLAY
not addr_family host host
CLIENTNAME
not tcp port 3389
(addr_family will either be "ip" or "ip6")
Further Information
    Filtering while capturing from the Wireshark User's Guide
    The tcpdump man page includes a comprehensive capture filter reference
    The Mike Horn Tutorial gives a good introduction to capture filters
    Capture and display filter Cheat sheets
    packetlevel.ch Filter examples
See Also
DisplayFilters: more info on filters while displaying, not while capturing
The String-Matching Capture Filter Generator
Discussion
BTW, the Symantec page says that Blaster probes 135/tcp, 4444/tcp, and 69/udp. Would
    (tcp dst port 135 or tcp dst port 4444 or udp dst port 69) and ip[2:2]==48
    be a better filter? - Gerald Combs
Q: What is a good filter for just capturing SIP and RTP packets?
A: On most systems, for SIP traffic to the standard SIP port 5060,
    tcp port sip
should capture TCP traffic to and from that port,
    udp port sip
should capture UDP traffic to and from that port, and
    port sip
should capture both TCP and UDP traffic to and from that port (if one of those filters gets "parse error", try using 5060 instead of sip). For SIP traffic to and from other ports, use that port number rather than sip.
In most cases RTP port numbers are dynamically assigned. You can use something like the following which limits the capture to UDP, even source and destination ports, a valid RTP version, and small packets. It will capture any non-RTP traffic that happens to match the filter (such as DNS) but it will capture all RTP packets in many environments.
    udp[1] & 1 != 1 && udp[3] & 1 != 1 && udp[8] & 0x80 == 0x80 && length < 250
Capture WLAN traffic without Beacons:
    link[0] != 0x80
Capture all traffic originating (source) in the IP range 192.168.XXX.XXX:
    src net 192.168
Capture PPPoE traffic:
    pppoes
    pppoes and (host 192.168.0.0 and port 80)
Capture VLAN traffic:
    vlan
    vlan and (host 192.168.0.0 and port 80)
    CategoryHowTo
CaptureFilters (last edited 2011-10-05 18:15:45 by GeraldCombs)
    Immutable Page
    Info
    Attachments
Original content on this site is available under the GNU General Public License.
See the License page for details.     Powered by MoinMoin and Python.
Please don't pee in the pool.

IRC  

IRC Important Tips for Connecting to IRCnet servers
    It’s very important to use other ports than the default 6667 whenever possible, since that port tends to be very busy. Try something else in the 6660-6669 range instead.
    Many IRCnet servers allow none or few connections from users outside their domain, so try a server in your own country or at least close to you.
    Even after you connect, the traditional /links command to get a server list will only show about 1/3 of the servers, since many servers are “masked” and not shown. So for example, although there are about 16 servers in Finland (.fi), unless you’re already on a .fi server, /links or /links *.fi will show only the first one. You would need to do something like /links *.fi *.fi to see them all. 
See also this troubleshooting guide for connecting to IRCnet (external link).
IRCnet Server Lists
The following are all external links and will take you away from our site. We keep these lists because IRCnet lacks an official web site, so these sites have different degrees of stability and accuracy. (EFnet and IRCnet are the oldest networks. They actually predate notions of network founders and ownership, and are by necessity an ad hoc collection of servers with minimal central administration, so phrases like “official” can often be more about vanity than reality.)
IRCnet Server List: Semi-official
    This site is pretty new and is part of the self-acclaimed “IRCnet website”, whether it stands the test of time remains to be seen. As with most server lists, you would need to add the servers manually to your client - in mIRC you may do so in the connection setup dialog window. Alternatively, just issue commands like /server irc.whatever.com:6666 which connects you to irc.whatever.com on port 6666.
IRCnet Server List: another semi-official site
    This list is run by the admins of an IRCnet server, and is automatically refreshed by a computer script several times a day. It is thus guaranteed to be as complete as possible. It’s sorted by domain, which is the same as the country except for a few exceptions such as the US servers. Read through the “description” column and avoid those marked as “routing servers” which won’t allow you to connect. Like with the previous list, you would need to add the servers manually to your client.
IRCnet Server Map
    This unofficial site provides a map showing how the IRCnet servers are linked together, either in an ASCII format (less sexy but more readable) or the GraphViz image (more sexy but less readable). The maps are automatically updated every few hours using an open source script available at that site.

/server chat.freenode.net:6667
    IRC - Internet Relay Chat
    Helpful Tips
    Basic IRC Commands 
    mIRC Setup Tutorial
    PIRCH Setup Tutorial 
Just as you are able to surf the net with a few tricks to help make things easier, IRC is very similar. Below you will find some of the more common IRC commands that we use often. For a far more complete list, please visit our mIRC Commands page.
/join
    Type /join #channelname -- to join a channel of your choice 
    Example: /join #bossmom 
    What it looks like: 
    [18:44] *** Now talking in #beginner 
    --Op-- bossmom has joined the channel 
    [18:44] *** Topic is 'Beginner's Help/Chat Channel....All Are Welcome Here!! ®© [ENGLISH]' 
    [18:44] *** Set by X on Sun Jul 23 16:10:34
/me
    The /me is an action message. 
    Type /me 'does anything' 
    Example: /me waves hello 
    What it looks like: 
    * bossmom waves hello
/msg
    Type /msg nickname (message) to start a private chat. 
    Example: /msg puddytat Hey tat, how are you? 
    What it looks like: 
    -> *puddytat* Hey tat, how are you?
/nick
    /nick changes your nickname 
    Example: type /nick newnickname (limit 9 characters) 
    What it looks like: I typed /nick luv2quilt 
    *** bossmom is now known as luv2quilt
/notice
    A notice is used to send a short message to another person without opening up a private window. 
    Type /notice nickname (message) 
    Example: /notice badnick Please change your nickname for this family channel. 
    What it looks like: 
    -> -badnick- Please change your nickname for this family channel. 
/part
    Type /part -- to leave one channel 
    Type /partall -- to leave all the channels you are in
/ping
    Type /ping nickname. What this command does is give you the ping time, or lag time, between you and the person you pinged. Lag can be explained as the amount of time it takes for you to type your message and for others to read your messages. Unfortunately, lag is always a part of IRC, although most times it's not a problem, just a nuisance. 
    Example: /ping luv2quilt 
    What it looks like: 
    [19:04] -> [luv2quilt] PING 
    [19:04] [luv2quilt PING reply]: 0secs
/query
    Similar to the /msg, except it forces a window to pop open. 
    Type /query nickname (message) 
    Example: /query Sofaspud^ Sooo....what's new? 
    What it looks like: 
    <luv2quilt> soooo....what's new?
/quit
    Type /quit to leave IRC altogether. This disconnects mirc from the server. 
    Example: /quit Going out for dinner...nite all 
    What it looks like: 
    *** Quits: saca (Leaving)
/ignore
    Unfortunately, there will be times when you don't want to talk to someone, or else someone may be harassing you. 
    By typing /ignore nickname 3, you will not receive anymore messages from that person. 
    Example: /ignore luv2quilt 3 
    To Unignore them, type /ignore -r luv2quilt 3 
    What it looks like: 
    *** Added *!*bossmom@*.dialup.netins.net to ignore list 
    *** Removed *!*bossmom@*.dialup.netins.net from ignore list
/whois
    Type /whois nickname to see a bit more information about another user. You'll see what server another person is using, or what their ISP is. Pretty helpful when you don't recognize a nickname that wants to chat. You may recognize the IP, (Internet Protocol) and then feel more comfortable carrying on a conversation. You'll also be able to see what other channels a person is in, which might be a good indicator if you really want to talk with them or not. 
    Example: /whois bossmom 
    What it looks like: 
    luv2quilt is bossmom@elwo-01-094.dialup.netins.net * Enjoy the Journey........ 
    luv2quilt on @#bossmom 
    luv2quilt using Seattle.WA.US.Undernet.org the time for school is during a recession. 
    luv2quilt has been idle 18secs, signed on Sun Jul 23 18:47:26 
    luv2quilt End of /WHOIS list.
/chat
    This opens up a DCC/CHAT window to another user. What's nice about these is that you can continue to chat even if you get disconnected from your server. 
    Word of Caution: Do NOT accept dcc/chats nor dcc/gets from anyone that you don't know. 
    Type /chat nickname. 
    Example: /chat oddjob^ 
    What it looks like: 
    Chat with oddjob^ 
    Waiting for acknowledgement...
/help
    There's one more very helpful command, and probably the one you'll use a lot when first starting out. In fact, I still use it quite a lot, and that's the built-in help menu of mIRC. 
    Type /help, you'll see the the mIRC Help Menu open up. You can do a search from there, or you can type /help topic. Either way, a TON of information at your fingertips. 
    Example: /help Basic IRC Commands 
You are doing great so far. If you haven't yet read some Basic IRC Tips, I'd encourage you to take a peek, otherwise we are ready to setup your IRC client. Please choose one of the following clients you would like to learn:
    mIRC Setup Tutorial
    PIRCH Setup Tutorial 
```


# Thrift

+ http://thrift.apache.org/docs/install
+ http://thrift.apache.org/docs/install/ubuntu

The following command install all the required tools and libraries to build and install 
the Apache Thrift compiler on a Debian/Ubuntu Linux based system.
sudo apt-get install libboost-dev libboost-test-dev libboost-program-options-dev libevent-dev automake libtool flex bison pkg-config g++ libssl-dev 

```
git clone http://git-wip-us.apache.org/repos/asf/thrift.git thrift.git
cd thrift.git
./bootstrap.sh
./configure
# cd compiler/cpp/
make
sudo make install
```

How are the file transmitted (CIRI files seems to allow only payments from one account on one date)
How to distinguish Warnings and (fatals and non-fatals) errors
How to get a the mono-field validation classes for CIRI and DOM ?
How to get the cross-field validation classes for CIRI and DOM ?
How to get a splitconfig.xml to split the file ?
How to use a character conversion ?

@see http://www.smooks.org

# ANTLR

## Simple Test
```
curl -O http://www.antlr.org/download/antlr-4.4-complete.jar
export CLASSPATH=".:$PWD/*:$CLASSPATH"
alias antlr4='java -jar $PWD/antlr-4.4-complete.jar'
alias grun='java org.antlr.v4.runtime.misc.TestRig'
```
vi Expr.g4
```
grammar Expr;       
prog:   (expr NEWLINE)* ;
expr:   expr ('*'|'/') expr
    |   expr ('+'|'-') expr
    |   INT
    |   '(' expr ')'
    ;
NEWLINE : [\r\n]+ ;
INT     : [0-9]+ ;
```
antlr4 Expr.g4
javac Expr*.java
grun Expr prog -gui
or
grun Expr prog -tree
```
Type after the following (^D is CTRL-D - That ^D means EOF on unix; it's ^Z in Windows.)
```
100+2*34
^D
```
You should see as output the following:
```
(prog (expr (expr 100) + (expr (expr 2) * (expr 34))) \n)
```

data-parser


@see commons-configuration
@see cassandra
@see lucene2


data-parser-ebnf


To generate synatax and diagram from EBNF, you can use:

+ Railroad Diagram Generator http://bottlecaps.de/rr/ui

If you want to generate EBNF from Scala, you can use:

+ https://github.com/bwmcadams/SyntaxDiagramGenerator.git


After that you have standalone executable jar `./target/sdg-1.0-jar-with-dependencies.jar`

You can use it: `java -jar ./target/sdg-1.0-jar-with-dependencies.jar src/main/scala/ebnf/EBNFParser.scala`

Or exec `mvn scala:run -DaddArgs=<PARSER_SOURCE_FILE>`

For example: `mvn scala:run -DaddArgs=src/main/scala/ebnf/EBNFParser.scala`

I have had issues to get it to run manually via SBT but on CLI can do it with setting CLASSPATH to:

project/boot/scala-2.8.0/lib/scala-library.jar:project/boot/scala-2.8.0/lib/scala-compiler.jar:lib/batik-anim.jar:lib/batik-awt-util.jar:lib/batik-bridge.jar:lib/batik-codec.jar:lib/batik-css.jar:lib/batik-dom.jar:lib/batik-ext.jar:lib/batik-extension.jar:lib/batik-gui-util.jar:lib/batik-gvt.jar:lib/batik-parser.jar:lib/batik-script.jar:lib/batik-svg-dom.jar:lib/batik-svggen.jar:lib/batik-swing.jar:lib/batik-transcoder.jar:lib/batik-util.jar:lib/batik-xml.jar:lib/js.jar:lib/pdf-transcoder.jar:lib/xalan-2.6.0.jar:lib/xerces_2_5_0.jar:lib/xml-apis-ext.jar:lib/xml-apis.jar:target/scala_2.8.0/syntaxdiagramgenerator_2.8.0-1.0.jar

and running:

java -Djava.awt.headless=true net.t32leaves.syntaxDiagramGenerator.Main <INPUT_PARSER_COMBINATOR>

You can test it on the sample included via:

java -Djava.awt.headless=true net.t32leaves.syntaxDiagramGenerator.Main src/main/scala/ebnf/EBNFParser.scala

Creates a whole bunch of files.  Have fun!

+ spark-sql (org.apache.spark.sql.catalyst)
+ scala-mahout-binding
+ https://github.com/stephentu/scala-sql-parser.git
+ https://github.com/mpollmeier/gremlin-scala
+ https://github.com/squeryl/squeryl
+ https://github.com/json4s/json4s.git
+ https://github.com/djspiewak/gll-combinators.git

data-parser-mime4j

These test messages are part of the MIME-tools Perl library:
http://search.cpan.org/~dskoll/MIME-tools-5.502/

datalayer-model-text


This Datalayer Text library implements useful distributed text mining algorithms.

See also (data/text)(https://github.com/aos-t4f/data/tree/master/text) 
for a list of interesting tools.

data-algorithm
+ fibonnaci suite
+ prime numbers
+ sorting
+ recursive list/delete
+ depth first search

# Java Language

This module covers essential basic JAVA classes and usage.

TODO
----

reference
+ weak
+ soft

public static <T> void sort(List<T> list, Comparator<? super T> c) {
    Object[] a = list.toArray();
    Arrays.sort(a, (Comparator)c);
    ListIterator i = list.listIterator();
    for (int j=0; j<a.length; j++) {
        i.next();
        i.set(a[j]);
    }
}

Listing 2 shows an example of how to launch a VM in debug mode and listen for a socket connection at port 8765.
Listing 2. Target VM acts as a debug server

-Xdebug -Xrunjdwp:transport=dt_socket,server=y,address=8765

Listing 3 shows how to attach to a running debugger application using a socket on host 127.0.0.1 at port 8000.
Listing 3. Target VM acts as a debug client

-Xdebug -Xrunjdwp:transport=dt_socket,address=127.0.0.1:8000

# Clojure

If not done by m2eclipse, add natures and buildcommands to eclipse .project file
<natures>
 <nature>ccw.leiningen.nature</nature>
 <nature>ccw.nature</nature>
</natures>
<buildSpec>
  <buildCommand>
    <name>ccw.builder</name>
    <arguments>
    </arguments>
  </buildCommand>
  <buildCommand>
    <name>ccw.leiningen.builder</name>
    <arguments>
    </arguments>
  </buildCommand>
<buildSpec>

clj
lein clean
lein compile
lein install # !!! can override pom.xml, so rewrite with pom.xml_bu
lein run

(load "io/aos/clj/hello")
(ns io.aos.clj.hello)
(hello "Clojure")

Create and run a simple Clojure project ("Hello Betty")
Open the Java perspective
  Window > Open Perspective > Java (a perspective is a predefined layout of views, suitable for a particular type of development)
Create a Clojure project
  With Leiningen Project Wizard: File > New > Leiningen Project, name it myproject
  The project is created using the "default" Leiningen Template, which creates a Clojure project with a predefined "myproject.core" namespace in src/myproject/core.clj
Add a function definition to myproject.core:
  Open src/main/clojure/t4fclojure.clj, add the following at the end: (defn hello [who] (str "Hello " who " !")), save the file
Run the project:
  With file src/main/clojure/t4fclojure.clj open, Hit Ctrl+Alt+S (Cmd+Alt+S on MacOS). 
  This sends the whole file's code to the REPL (and also takes care of starting a REPL for the project if none is currently started)
Switch to the REPL in the namespace of your file:
  Hit Ctrl+Alt+N (Cmd+Alt+N on MacOS). Alternatively, just click on the bottom of the REPL inside the "text input area"
Call your function (Hit Enter to send the expression if the cursor is at the end, or hit Ctrl+Enter / Cmd+Enter if the cursor is not at the end of the text):
> (hello "Clojure") [Ctrl+Enter]
> "Hello Clojure !"

| T4F ESSENTIALS JAVA IO                                                      |

This module covers essential JAVA classes related to Input/Output operations (a.k.a IO).

NETTY

+ mvn install -Dcheckstyle.skip

BYTE STREAMS

abstract class InputStream
+ public abstract int read()
+ public int read(byte[])
+ public int read(byte[], int, int)
+ public long skip(long)
+ public int available()
+ public void close()
+ public void synchronized mark(int)
+ public void synchronized reset()
+ public boolean markSupported()
---
abstract class OutputStream
+ void write(int)
+ void write(byte[])
+ void write(byte[], int, int)
+ void flush()
+ void close()

FILE STREAMS

public class FileInputStream extends InputStream
---
public class FileOutputStream extends InputStream

NETWORK STREAMS

URL
URLConnection
ServerSocket/Socket (JDK1)
+ Synchronous
+ Blocking
---
ServerSocketChannel/SocketChannel (JDK4)
+ Synchronous
+ NonBlocking (*)
+ Reactor Pattern
+ Notification
---
AsynchronousServerSocketChannel/AsynchronousSocketChannel (JDK7)
+ Asynchronous (*)
+ NonBlocking (*)
+ Proactor Pattern

FILTER STREAMS

public FilterInputStream(InputStream in) { this.in = in; }
---
public FilterOutputStream(OutputStream out) { this.out = out; }

PRINT STREAMS

public PrintStream(OutputStream out) { this(out, false); }
public PrintStream(OutputStream out, boolean autoFlush) { this(autoFlush, requireNonNull(out, "Null output stream")); }
public PrintStream(OutputStream out, boolean autoFlush, String encoding) throws UnsupportedEncodingException { this(autoFlush, requireNonNull(out, "Null output stream"), toCharset(encoding)); }
public PrintStream(String fileName) throws FileNotFoundException { this(false, new FileOutputStream(fileName)); }
public PrintStream(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException { this(false, toCharset(csn), new FileOutputStream(fileName)); }
public PrintStream(File file) throws FileNotFoundException { this(false, new FileOutputStream(file)); }
public PrintStream(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException { ... }

DATA STREAMS

DataInputStream
+ DataInputStream(InputStream)
+ read(byte[])
+ read(byte[], int, int)
+ readFully(byte[])
+ readFully(byte[], int, int)
+ skipBytes(int)
+ readBoolean()
+ readByte()
+ readUnsignedByte()
+ readShort()
+ readUnsignedShort()
+ readChar()
+ readInt()
+ readLong()
+ readFloat()
+ readDouble()
+ lineBuffer : char[]
+ deprecated readLine
+ readUTF()
+ readUTF(DataInput)
---
DataOutputStream
DataOutputStream(OutputStream)
+ incCount(int)
+ write(int)
+ write(byte[], int, int)
+ flush()
+ writeBoolean(boolean)
+ writeByte(int)
+ writeShort(int)
+ writeChar(int)
+ writeInt(int)
+ writeLong(long)
+ writeFloat(float)
+ writeDouble(double)
+ writeBytes(String)
+ writeChars(String)
+ writeUTF(String)
+ writeUTF(String, DataOutput)
+ size()

MEMORY STREAMS

+ 

COMPRESSING STREAMS

+ 

JAR ARCHIVES

+ 

CRYPTHOGRAPHIC STREAMS

+ 

OBJECT SERIALIZATION

+ 

CHARACTER READERS AND WRITERS

Reader
+ read(CharBuffer)
+ read()
+ read(char[])
+ read(char[], int, int)
+ maxSkipBufferSize : int
+ skipBuffer : char[]
+ skip(long)
+ ready()
+ markSupported()
+ mark(int)
+ reset()
+ close()
---
Writer
+ write(int)
+ write(char[])
+ write(char[], int, int)
+ write(String)
+ write(String, int, int)
+ append(CharSequence)
+ append(CharSequence, int, int)
+ append(char)
+ flush()
+ close()
---
Character Array Readers and Writers
---
String Readers and Writers
---
Reading and Writing Files
---
Buffered Readers and Writers
---
Print Writers
---
Piped Readers and Writers
---
Filtered Readers and Writers

NIO BUFFERS

+ 

NIO CHANNELS

JDK1              >>> JDK4                >>> JDK7
---                   ----                    ----
FileIOutputStream >>> FileChannel         >>> AsynchronousFileChannel
IOutputStream     >>> SocketChannel       >>> AsynchronousSocketChannel
IOutputStream     >>> ServerSocketChannel >>> AsynchronousServerSocketChannel

NIO SELECTORS

+ 

NIO PIPE CHANNELS

+ 

NIO FILES

+ 

FILE SYSTEM

+ 

FILE DIALOGS

+ 

CHARSETS AND UNICODE

+ 

FORMATTED IO WITH java.text

+ 

JAVA COMMUNICATIONS API

+ 

USB

+ 

J2ME GENERIC CONNECTION FRAMEWORK

+ 

BLUETOOTH

+ 


| SMTP                                                                        |

Simple Mail Transfer [Protocol http://www.ietf.org/rfc/rfc2821.txt]

telnet localhost 2525
EHLO test
MAIL FROM: <eric@localhost.net>
RCPT TO: <eric@localhost.net>
DATA
From: Eric Charles <eric@localhost.net>
To: Eric Charles <eric@localhost.net>
Subject: test message

This is a test message.
.
QUIT
---

SMTP Service Extension for Authentication [http://www.ietf.org/rfc/rfc2554.txt]

    S: 220 smtp.example.com ESMTP server ready
    C: EHLO jgm.example.com
    S: 250-smtp.example.com
    S: 250 AUTH CRAM-MD5 DIGEST-MD5
    C: AUTH FOOBAR
    S: 504 Unrecognized authentication type.
    C: AUTH CRAM-MD5
    S: 334
    PENCeUxFREJoU0NnbmhNWitOMjNGNndAZWx3b29kLmlubm9zb2Z0LmNvbT4=
    C: ZnJlZCA5ZTk1YWVlMDljNDBhZjJiODRhMGMyYjNiYmFlNzg2ZQ==
    S: 235 Authentication successful.

Here, RFC 2554 uses multiple values for the keyword AUTH as ESMTP command, which is permitted by RFC 1869, however broke the parsing of several ESMTP client implementations. One work around is, to add artificially a "=" (equal sign) between the AUTH keyword and the value, eg. AUTH=LOGIN.

---

AUTH mechanisms
There are three authentication mechanisms widely used for SMTP Authentication. 
In the documentation coming with the qmail-smtp-auth-patch by Krzysztof Dabrowski, an overview of MUAs and their AUTH mechanisms is provided (which I updated):

---

AUTH LOGIN

The most common 'AUTH LOGIN' mechanism looks like this

    S: 220 esmtp.example.com ESMTP
    C: ehlo client.example.com
    S: 250-esmtp.example.com
    S: 250-PIPELINING
    S: 250-8BITMIME
    S: 250-SIZE 255555555
    S: 250 AUTH LOGIN PLAIN CRAM-MD5
    C: auth login
    S: 334 VXNlcm5hbWU6
    C: avlsdkfj
    S: 334 UGFzc3dvcmQ6
    C: lkajsdfvlj
    S: 535 authentication failed (#5.7.1)

From all the ESMTP Authentication mechanisms the offered, the client selects 'auth login'.
The ESMTP server issues then a '334 VXNlcm5hbWU6' where 'VXNlcm5hbWU6' is a BASE64 encoded string 'Username:'.
The client provides the BASE64 encoded user name and the sever responses with the request for the 'Password:' ('334 UGFzc3dvcmQ6').
In the sample above, random input is given and the server finally rejects the authentication request.

However, there exists a different, RFC compliant version of this behavior, where the client initially sends the userid already with the AUTH LOGIN method:

    C: AUTH LOGIN ZHVtbXk=
    S: 334 UGFzc3dvcmQ6
    C: Z2VoZWlt

---

AUTH PLAIN

According to IANA's documentation, the PLAIN Authentication is defined in RFC 2245 "Anonymous SASL Mechanism". However, a more useful explanation of the PLAIN Authentication can be found in RFC 2595 "Using TLS with IMAP, POP3 and ACAP" (chapter 6):

    "The mechanism consists of a single message from the client to the server. The client sends the authorization identity (identity to login as), followed by a US-ASCII NULL character, followed by the authentication identity (identity whose password will be used), followed by a US-ASCII NULL character, followed by the clear-text password. The client may leave the authorization identity empty to indicate that it is the same as the authentication identity."

In other words, the correct form of the AUTH PLAIN value is 'authorization-id\0authentication-id\0passwd' where '\0' is the null byte.

Some ESMTP AUTH PLAIN implementations don't follow that procedure completely. We see that in the trace using Netscape's 4.8 MUA connecting to a modified Qmail 1.03 to do PLAIN authentication:

    C: ehlo client.example.com
    S: 220-esmtp.example.com
    C: AUTH PLAIN dGVzdAB0ZXN0AHRlc3RwYXNz
    S: 235 ok, go ahead (#2.0.0)
    C: RCPT TO:<....>

In this sample, the user name was 'test' and the password 'testpass'. Here, the Netscape client immediately blasts the authentication information to the server (including the artificial authorization identity 'test') without waiting for the server to announce his SMTP Auth capabilites.

A further procedure is possible for clients submitting the authentication string after the AUTH PLAIN:

    C: AUTH PLAIN
    S: 334
    C: dGVzdAB0ZXN0AHRlc3RwYXNz

Authorization-ID versus Authentication-ID

In the samples above, we have used the terms userid and usermame as a synonym (and neglegting it's encoding entirely).

However, within AUTH PLAIN the identification of the client is subdivided into a authoriziation-id and an authentication-id typically the userid followed the password. There is no strict rule about the usage for the authorization-id. In particular, simply setting authorization-id=authentiation-id is certainly valid, but at best includes some redundancy.

For SMTP Authentication purpose, it is not clear what is the purpose of the authorization-id and which policy for the SMTP server to use in spite of the provided (or potential missing) value here. Regarding the SMTP client, it might be useful to set authorization-id = <return-path>. However, some SMTP server use erroneously the authorization-id for authentication purpose and don't evaluate the authentication-id. Thus, for compatibility reasons and the lack of standardization, it seems advisible to use both values filled with the identical content of the userid.
AUTH CRAM-MD5

While for AUTH PLAIN and LOGIN clear user names and password are transmitted, things go significantly more secure with the CRAM-MD5 authentication mechanism. As already mentioned in it's name, CRAM-MD5 combines a Challenge/Response mechanism to exchange information and a (cryptographic) Message Digest 5 algorithm to hash important information.

I use an example based on a posting of Markus Stumpf to the Qmail mailing list. A typical ESMTP AUTH CRAM-MD5 dialog starts like this:

    S: 220 popmail.space.net ESMTP
    C: ehlo client.example.com
    S: 250-popmail.space.net
    S: 250-PIPELINING
    S: 250-8BITMIME
    S: 250-SIZE 0
    S: 250 AUTH CRAM-MD5
    C: auth cram-md5
    S: 334 PDI0NjA5LjEwNDc5MTQwNDZAcG9wbWFpbC5TcGFjZS5OZXQ+
    C: dGltIGI5MTNhNjAyYzdlZGE3YTQ5NWI0ZTZlNzMzNGQzODkw

Unlike AUTH LOGIN, the server's response is now a one-time BASE64 encoded 'challenge'. The challenge 'PDI0NjA5LjEwNDc5MTQwNDZAcG9wbWFpbC5TcGFjZS5OZXQ+' translates to '<24609.1047914046@popmail.Space.Net>'. The leading and trailing brackets ('<', '>') are mandatory, as well the portion of the challenge which provides the hostname after the '@'. '24609.1047914046' is a random string, typically build from the 'pid' and the current time stamp to make that challenge unique.

The client's reponse includes both the username and the digest. While the user name is transmitted in clear text (but of course BASE64 encoded), the server's challenge is used by the client to generate a 'digest' from the challenge and the password (which is commonly called 'secret' or 'shared secret' in this context) and reads as:

    tim b913a602c7eda7a495b4e6e7334d3890 

The 'shared secret' following the username with an additional space is computed employing the following MD5 hashing algorithm:

    digest = MD5(('secret' XOR opad), MD5(('secret' XOR ipad), challenge))

If both the ESMTP server and the client 'share' the same challenge and secret, the user may now be authenticated successfully by means of the transmitted and BASE 64 encoded 'user name' and 'digest'.

The transmission of the password (the secret) is now replaced by the digest. Though the digest is calculated by means of the challenge and the secret, which by itself is send in cleartext, it is (by our current understanding) practically impossible to reconstructed the secret; except for dictionary attacks:

    The secret is very effectively scrambled by the challenge and
    we use the avalanche effect of the hash function.

AUTH parameter as part of the 'MAIL FROM:' command

According to RFC 2554, authentication information can optionally provided as ESMTP AUTH parameter with a single value in the 'MAIL FROM:' command. The ESMTP AUTH parameter has to be used in the following way:

    C: MAIL FROM:<e=mc2@example.com> AUTH=e+3Dmc2@example.com
    S: 250 OK

Here, the AUTH value has to be encoded inside an "xtext" as described in RFC 1891 "SMTP Service Extension for Delivery Status Notifications". RFC 2554 discusses the use of the optional AUTH parameter to the 'MAIL FROM:' command in the context of a "trusted environment to communicate the authentication of individual messages". It actually requires the proliferation of the AUTH information to another MTA (Mail Transfer Agent; eg. email gateway) as AUTH parameter when relaying the message to any server which supports the AUTH extension. In case the authentication is to weak, the Server should set 'AUTH=<>' as parameter to the 'MAIL FROM:' command.

I am not aware, that any MUA implementation using the latter scheme however, some MTA (eg. Postfix) support it.

Qmail 1.03, and in particular qmail-smtpd has no understanding of any parameters in the 'MAIL FROM:' command; it lacks a qualified ESMTP support in that respect. This holds in addition for the ESMTP 'SIZE' announcement (RFC1870), which was partially recovered by Chris Harris' SIZE extension.
My current SMTP-Authentication patch for qmail-smtpd introduces a complete and extensible 'MAIL FROM:' parameter parser and treats the provided AUTH parameter as $TCPREMOTEINFO.
Authentication State

As outlined, RFC 2554 allows two distinct usages of the ESMTP AUTH extension:

    AUTH parameter exchange as part of the SMTP dialog (as shown above).
    AUTH as ESMTP parameter in the 'MAIL FROM:' command.

Clearly, this has a significant impact on the authentication state itself. The first approach is actually equivalent with an authenticated SMTP session, while the second is effectively the authentication of the provided 'MAIL FROM:' sender and serves as 'informational' data. Unfortunately, RFC 2554 does not give any hints what an "authenticated" state really means. There is a common sense, that an authenticated user is allowed for unrestricted relaying.

In case the authentication information is transmitted as extension to the 'MAIL FROM:' command, one may treat that equivalently with having an additional 'tcpremoteinfo' - usually provided by means of the 'ident' protocol.
Authentication Aborts

The Client may cancel the authentication request, sending simply a '*' to the server. The server must reject the AUTH procedure and replying the SMTP protocol error '501'. However, the server has to cache the authentication method in order to preserve the state.
Authentication Return Codes

The server may accept or reject the AUTH request by the client with one of the following response codes according mostly to RFC 4954:

SMTP Authentication Reply-Codes and their implementation in my qmail-authentication Code    Meaning     Issued by
qmail-smtpd     Honored by
qmail-remote
235     Authentication Succeeded    yes     yes
334     Text part containing the [BASE64] encoded string    yes     yes
432     A password transition is needed     no  >= 0.75
454     Temporary authentication failure    yes     n/a
500     Authentication Exchange line is too long    no  n/a
501     Malformed auth input/Syntax error   yes     n/a
503     AUTH command is not permitted during a mail transaction     yes     n/a
504     Unrecognized authentication type    yes     n/a
530     Authentication required     Submission mode     n/a
534     Authentication mechanism is to weak     no  no
535     Authentication credentials invalid  yes     yes
538     Encryption required for requested authentication mechanism  no  no

After a failed ESMTP request (starting with an 5x code), the server has to reset it's state tables and the client may either provide the correct information, or may chose a different authentication mechanism, or may go on in un-authenticated state.
Multiple Authentication announcements

The EMSTP server may offer several Auth types to the client:

    S: 250 AUTH EXTERNAL GSSAPI DIGEST-MD5 PLAIN

How should the ESMTP server deploy and the client depend on this information?

    The ESMTP server may issue an ordered list of Auth types to the client.
    Consider the situation you are a market tender: You offer to your clients apples, bananas and peaches. Can you command the customer what to chose ? Clearly: No.
    It is solely the responsibility of the customer, the ESMTP client respectively, to select the Auth type he can digest and does prefer.
    By the very same token, it makes no sense to announce a particular Auth mechanism (as ESMTP server) and then tell the client: 'Oh no, this method is to weak!'

In short: The ESMTP client picks up the Auth mechanism suited for him -- matching the server's announcements. It is the ESMTP server's obligation to support the announced Auth method and to have the respective authentication data in stock.
Authentication proliferation

In general, SMTP Authentication allows a one-hop User-to-MTA authentication. An interesting case is to discuss Authentication proliferation. Let's first define what we are talking about:

    Typically, a User receives emails by means of the protocols POP3 or IMAP4. For sending, a useful approach would be, that the User - the email originator - sets up an email client (ie. Outlook) for SMTP Authentication and first connects to the Principal-MTA. Here, the user-id and password is stored; which is typically the same as the one used for the POP3/IMAP4 account. In this case, the Principal-MTA acts as SMTP-Relay. Now, we have User-to-MTA Authentication. 

It may be necessary to obey SMTP Authentication to the recipient's MTA or a further internal SMTP-Gateway, which connects to the Internet. Thus, we are talking about User-to-Principal-MTA-to-MTA SMTP traffic with the requirement of an authenticated communication chain.

What shall this be good for? We have seen, that SMTP Authentication serves mainly to allow unrestricted relaying. With an End-to-End authentication, two additional aims could be achieved:

    The authenticity of the message itself (the content of the email) can be guaranteed,
    The uniqueness and authenticity of the email's originator (the provided Mail From: <Return-Path>) can be ensured.

The latter is a requirement for the first, since it enables to reject emails with forged/spoofed "Return-Path" addresses.

In order to maintain an authentication chain for the User's MUA, not only the user-id and password has to be proliferated, but rather in addition the "Return-Path" address. In this respect, the Mail From: <Return-Path> acts as authorization information.
Ironically, this concept was already introduced for the AUTH PLAIN authentication scheme (as discussed above) and later dropped. Unfortunately, with today's SMTP Authentication, an Authentication proliferation is not possible without changing the standard.
Today, we see a huge activity to demand authentication in email traffic, in order to reduce the spam load. As outlined, ensuring authentication for emails is to weak to reduce spam; additionally, qualified authorization information has to be included.
Authentication information in the email "Received:" header [RFC 3848]

One - actually inadequate - attempt in this direction is to add authentication information into the email header, which is required by RFC 3848. The standard SMTP Authentication patches for qmail-smtpd incude the authenticated user equivalent to the tcpremoteinfo in the Received header:

    Received: from xdsl-81-173-228-159.netcologne.de (HELO mail.fehnet.net) (erwin@fehcom.net@81.173.228.159)
    by hamburg134 with SMTP; 23 Jan 2005 11:53:28 -0000

Though the information erwin@fehcom.net@81.173.228.159 is rather precise, it lacks the knowledge, how it is derived. RFC 3848 requires a different notation, which is incorporated in my most recent SMTP authentication patches for qmail:

    Received: from xdsl-81-173-228-159.netcologne.de (HELO mail.fehnet.net) (erwin@fehcom.net@81.173.228.159)
    by hamburg134 with ESMTPA; 23 Jan 2005 13:32:13 -0000

The keyword ESMTPA denotes "ESMTP Authentication" and thus the information presented can be clearly interpreted. However, the quality of this information can not be trusted, if it does not originate from the last receiving host.
Some Anti-Spam programs, like SpamAssassin begin to use this information including it in the spam-weight calculation of the message. As pointed out by Dary C.W. O'Shea (Committer of the Apache SpamAssassin) the "trust boundary extension", which deals with the interpretation of the email header, works in a top-down approach, in order to verify the integrity of the presented information.
Since any email header can be forged easily, additional checks for each SMTP connection have to be facilitated, in order to minimize any potential forgery. Thus, the basic problem remains to derive trust-worth information from a per-se un-trusty environment.


| POP3                                                                        |

telnet localhost 1100
USER eric@localhost.net
PASS eric
STAT
RETR 1
QUIT

| IMAP4                                                                       |

telnet localhost 1433
a1 LOGIN eric@localhost.net eric
a2 SELECT INBOX
a3 FETCH 1 rfc822
a4 LOGOUT

a1 LOGIN eric@localhost.net eric
a1 OK Logged in.
a2 LIST "" "*"
* LIST (\HasNoChildren) "." "INBOX"
a2 OK List completed.
a3 EXAMINE INBOX
* FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
* OK [PERMANENTFLAGS ()] Read-only mailbox.
* 1 EXISTS
* 1 RECENT
* OK [UNSEEN 1] First unseen.
* OK [UIDVALIDITY 1257842737] UIDs valid
* OK [UIDNEXT 2] Predicted next UID
a3 OK [READ-ONLY] Select completed.
a4 FETCH 1 BODY[]
* 1 FETCH (BODY[] {405}
Return-Path: sender@example.com
Received: from client.example.com ([192.0.2.1])
server:         by mx1.example.com with ESMTP
server:         id <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server:         for <recipient@example.com>; Tue, 20 Jan 2004 22:34:24 +0200
server: From: sender@example.com
server: Subject: Test message
server: To: recipient@example.com
server: Message-Id: <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server:
server: This is a test message.
server: )
a4 OK Fetch completed.
a5 LOGOUT
* BYE Logging out
a5 OK Logout completed.



telnet: > telnet imap.example.com imap
telnet: Trying 192.0.2.2...
telnet: Connected to imap.example.com.
telnet: Escape character is '^]'.
server: * OK Dovecot ready.
client: a1 LOGIN MyUsername MyPassword
server: a1 OK Logged in.
client: a2 LIST "" "*"
server: * LIST (\HasNoChildren) "." "INBOX"
server: a2 OK List completed.
client: a3 EXAMINE INBOX
server: * FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
server: * OK [PERMANENTFLAGS ()] Read-only mailbox.
server: * 1 EXISTS
server: * 1 RECENT
server: * OK [UNSEEN 1] First unseen.
server: * OK [UIDVALIDITY 1257842737] UIDs valid
server: * OK [UIDNEXT 2] Predicted next UID
server: a3 OK [READ-ONLY] Select completed.
client: a4 FETCH 1 BODY[]
server: * 1 FETCH (BODY[] {405}
server: Return-Path: sender@example.com
server: Received: from client.example.com ([192.0.2.1])
server:         by mx1.example.com with ESMTP
server:         id <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server:         for <recipient@example.com>; Tue, 20 Jan 2004 22:34:24 +0200
server: From: sender@example.com
server: Subject: Test message
server: To: recipient@example.com
server: Message-Id: <20040120203404.CCCC18555.mx1.example.com@client.example.com>
server: 
server: This is a test message.
server: )
server: a4 OK Fetch completed.
client: a5 LOGOUT
server: * BYE Logging out
server: a5 OK Logout completed.

Testing
Testing mail delivery

Right, now we're ready to test things out! First, let's look at mailbox delivery. In fact we have to deliver at least one mail into each mailbox to create its directory structure, before we can access it using pop3 or imap.

Here's one way to do it: we can invoke Exim, Linnet's mail transport agent, directly from the command line to test whether an address is valid and to perform a delivery to a mailbox. In the latter case you have to type the message directly in, line by line, ending with ctrl-D or a dot on a line of its own.

# linnet exim -bt fred@example.com
Maildir directory: /var/linnet/mail/6/25/fred%40example.com/Maildir
fred@example.com
  router = maildir, transport = maildir_delivery
# linnet exim -v -odf fred@example.com
Subject: test

this is a test
.
LOG: MAIN
  <= root@billdog.local.linnet.org U=root P=local S=381
delivering 1DBBO8-0000wC-El
Maildir directory: /var/linnet/mail/6/25/fred%40example.com/Maildir
LOG: MAIN
  => fred@example.com F=<root@billdog.local.linnet.org> P=<root@billdog.local.li
nnet.org> R=maildir T=maildir_delivery S=503 QT=4s DT=0s
LOG: MAIN
  Completed

Another way to do it is by connecting to the SMTP daemon on port 25 and submitting a mail over TCP/IP, in the same way that incoming messages are received over the Internet. After the 'data' command, the message is terminated by a single dot on a line of its own.

# telnet 127.0.0.1 25
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
220 billdog.local.linnet.org (localhost [127.0.0.1]:25) ESMTP Exim 4.50+Linnet+0
.4.0 Tue, 15 Mar 2005 12:47:16 +0000
ehlo test
250-billdog.local.linnet.org Hello localhost [127.0.0.1]
250-SIZE 52428800
250-PIPELINING
250 HELP
mail from:<>
250 OK
rcpt to:<wilma@example.com>
250 Accepted
data
354 Enter message, ending with "." on a line by itself
subject: test

this is a test
.
250 OK id=1DBBSK-0000wa-Ek
quit
221 billdog.local.linnet.org closing connection
Connection closed by foreign host.

In this case you don't actually see the delivery taking place, but you can find it in Exim's log files:

# tail /var/linnet/exim/log/mainlog
...
2005-03-15 12:47:35 +0000 1DBBSK-0000wa-Ek <= <> H=localhost (test) [127.0.0.1]:
51793 I=[127.0.0.1]:25 P=esmtp S=258 for wilma@example.com
2005-03-15 12:47:35 +0000 1DBBSK-0000wa-Ek => wilma@example.com F=<> P=<> R=mail
dir T=maildir_delivery S=352 QT=7s DT=0s
2005-03-15 12:47:35 +0000 1DBBSK-0000wa-Ek Completed
&prompt;

If example.com were a real domain, and you set up the domain name system with an MX record pointing at your Linnet box, people on the Internet could now send mail to <fred@example.com> and <wilma@example.com>, and it would arrive in their mailboxes.
Testing POP3 and IMAP

You can of course test POP3 and IMAP access by pointing a mail client at your new mailserver, but it's a much better test to connect to it directly on port 110 (POP3) or port 143 (IMAP) and login directly. This eliminates any uncertainty that there may be an issue with your client program, and in any case gives more useful debugging information if there is a problem.

# telnet localhost 110
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
+OK Hello there.
user fred@example.com
+OK Password required.
pass wibble
-ERR Temporary problem, please try again later

Oops, what happened there? Well, you can check the logs. The POP3 and IMAP daemons use 'syslog' to record their data. Depending on how your system is set up, mail logs probably go to /var/log/maillog.

# tail /var/log/maillog
...
Mar 15 12:55:58 billdog pop3d: authdaemon: s_connect() failed: Connection refused
Mar 15 12:55:58 billdog pop3d: [Hint: perhaps authdaemond is not running?]
Mar 15 12:55:58 billdog pop3d: LOGIN FAILED, user=fred@example.com, ip=[127.0.0.1]
Mar 15 12:55:58 billdog pop3d: authentication error: Connection refused

Aha, now we see the problem: the courier-imap packages have a separate authentication daemon whose job it is to validate passwords, and it's not running. So we simply have to start it and try again:

# linnet start authdaemon
authdaemon: running (pid 3666)
# telnet localhost 110
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
+OK Hello there.
user fred@example.com
+OK Password required.
pass wibble
+OK logged in.
stat
+OK 1 515
retr 1
+OK 515 octets follow.
Return-path: <root@billdog.local.linnet.org>
Envelope-to: fred@example.com
Delivery-date: Tue, 15 Mar 2005 12:43:12 +0000
Received: from root by billdog.local.linnet.org (localhost)
        with local id 1DBBO8-0000wC-El (Exim 4.50) for fred@example.com
        (return-path <root@billdog.local.linnet.org>); Tue, 15 Mar 2005
12:43:12 +0000
Subject: test
Message-Id: <E1DBBO8-0000wC-El@billdog.local.linnet.org>
From: Charlie Root <root@billdog.local.linnet.org>
Date: Tue, 15 Mar 2005 12:43:10 +0000

this is a test
.
quit
+OK Bye-bye.
Connection closed by foreign host.
&prompt;

That's good. IMAP commands are different, but can still be given using telnet. Note that every command must be prefixed with a "tag", which is an arbitrary sequence of characters, and a space. In this example I have used "a" as the tag.

# telnet localhost 143
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
* OK [CAPABILITY IMAP4rev1 UIDPLUS CHILDREN NAMESPACE THREAD=ORDEREDSUBJECT THRE
AD=REFERENCES SORT QUOTA IDLE ACL ACL2=UNION STARTTLS] Courier-IMAP ready. Copyr
ight 1998-2005 Double Precision, Inc.  See COPYING for distribution information.
a login wilma@example.com boing
a OK LOGIN Ok.
a select inbox
* FLAGS (\Draft \Answered \Flagged \Deleted \Seen \Recent)
* OK [PERMANENTFLAGS (\* \Draft \Answered \Flagged \Deleted \Seen)] Limited
* 1 EXISTS
* 1 RECENT
* OK [UIDVALIDITY 1110891662] Ok
* OK [MYRIGHTS "cdilrsw"] ACL
a OK [READ-WRITE] Ok
a fetch 1 rfc822
* 1 FETCH (RFC822 {362}
Return-path: <>
Envelope-to: wilma@example.com
Delivery-date: Tue, 15 Mar 2005 12:47:35 +0000
Received: from localhost ([127.0.0.1]:51793 helo=test)
        by billdog.local.linnet.org (localhost [127.0.0.1]:25)
        with esmtp id 1DBBSK-0000wa-Ek (Exim 4.50) for wilma@example.com
        (return-path <>); Tue, 15 Mar 2005 12:47:35 +0000
subject: test

this is a test
)
a OK FETCH completed.
a logout
* BYE Courier-IMAP server shutting down
a OK LOGOUT completed
Connection closed by foreign host.


| DNS                                                                         |

client: > dig example.com mx
client: > nslookup -query=mx example.com
dig @172.16.1.131 apache.org MX
dig -x 91.183.38.48
nslookup 91.183.38.48
host 91.183.38.48

| MONITORING                                                                  |

tcpdump
tcpdump -i eth0 -v -X -s 1514


| TSHARK                                                                      |

tshark


| WIRESHARK                                                                   |

$ sudo apt-get install wireshark
$ sudo dpkg-reconfigure wireshark-common
$ sudo usermod -a -G wireshark $USER
$ sudo reboot
Apparently, the libfreetype you're using is incompatible with Wireshark. Others have had similar problems (here and here), and it seems to be related to a foul DYLD_LIBRARY_PATH. The second link (referring to gnuplot but same problem here) provides a temporary(?) workaround:
    Open the folder /Applications in the finder
    Right-click on Wireshark.app and select "Show package contents"
    Navigate to /Applications/Wireshark.app/Contents/Resources/bin
    Right-click on the file "wireshark" and select "Open with -> Other ... -> TextEdit.app"
    Change the line:
from: DYLD_LIBRARY_PATH="${ROOT}/lib:${DYLD_LIBRARY_PATH}"
to: DYLD_LIBRARY_PATH="${ROOT}/lib"
and
from: DYLD_FRAMEWORK_PATH
to: DYLD_FRAMEWORK_PATH="${ROOT}/lib"
EDIT: If the workaround above doesn't work for you, try re-installing freetype [from MacPorts].
The Wireshark Wiki
Login
CaptureFilters
    FrontPage
    RecentChanges
    FindPage
    HelpContents
    CaptureFilters
    Immutable Page
    Info
    Attachments
CaptureFilters
An overview of the capture filter syntax can be found in the User's Guide. A complete reference can be found in the expression section of the tcpdump manual page.
Wireshark uses the same syntax for capture filters as tcpdump, WinDump, Analyzer, and any other program that uses the libpcap/WinPcap library.
If you need a capture filter for a specific protocol, have a look for it at the ProtocolReference.
Contents
    CaptureFilters
      Examples
      Useful Filters
      Default Capture Filters
      Further Information
      See Also
      Discussion
Examples
Capture only traffic to or from IP address 172.18.5.4:
    host 172.18.5.4
Capture traffic to or from a range of IP addresses:
    net 192.168.0.0/24
or
    net 192.168.0.0 mask 255.255.255.0
Capture traffic from a range of IP addresses:
    src net 192.168.0.0/24
or
    src net 192.168.0.0 mask 255.255.255.0
Capture traffic to a range of IP addresses:
    dst net 192.168.0.0/24
or
    dst net 192.168.0.0 mask 255.255.255.0
Capture only DNS (port 53) traffic:
    port 53
Capture non-HTTP and non-SMTP traffic on your server (both are equivalent):
    host www.example.com and not (port 80 or port 25)
    host www.example.com and not port 80 and not port 25
Capture except all ARP and DNS traffic:
    port not 53 and not arp
Capture traffic within a range of ports
    (tcp[0:2] > 1500 and tcp[0:2] < 1550) or (tcp[2:2] > 1500 and tcp[2:2] < 1550)
or, with newer versions of libpcap (0.9.1 and later):
    tcp portrange 1501-1549
Capture only Ethernet type EAPOL:
    ether proto 0x888e
Reject ethernet frames towards the Link Layer Discovery Protocol Multicast group:
    not ether dst 01:80:c2:00:00:0e
Capture only IP traffic - the shortest filter, but sometimes very useful to get rid of lower layer protocols like ARP and STP:
    ip
Capture only unicast traffic - useful to get rid of noise on the network if you only want to see traffic to and from your machine, not, for example, broadcast and multicast announcements:
    not broadcast and not multicast
Capture IPv6 "all nodes" (router and neighbor advertisement) traffic. Can be used to find rogue RAs:
    dst host ff02::1
Capture HTTP GET requests. This looks for the bytes 'G', 'E', 'T', and ' ' (hex values 47, 45, 54, and 20) just after the TCP header. "tcp[12:1] & 0xf0) >> 2" figures out the TCP header length. From Jefferson Ogata via the tcpdump-workers mailing list.
    port 80 and tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x47455420
Useful Filters
Blaster and Welchia are RPC worms. (Does anyone have better links, i.e. ones that describe or show the actual payload?)
Blaster worm:
    dst port 135 and tcp port 135 and ip[2:2]==48
Welchia worm:
    icmp[icmptype]==icmp-echo and ip[2:2]==92 and icmp[8:4]==0xAAAAAAAA
   The filter looks for an icmp echo request that is 92 bytes long and has an icmp payload that begins with 4 bytes of A's (hex). It is the signature of the welchia worm just before it tries to compromise a system.
Many worms try to spread by contacting other hosts on ports 135, 445, or 1433. This filter is independent of the specific worm instead it looks for SYN packets originating from a local network on those specific ports. Please change the network filter to reflect your own network.
dst port 135 or dst port 445 or dst port 1433  and tcp[tcpflags] & (tcp-syn) != 0 and tcp[tcpflags] & (tcp-ack) = 0 and src net 192.168.0.0/24
Default Capture Filters
Wireshark tries to determine if it's running remotely (e.g. via SSH or Remote Desktop), and if so sets a default capture filter that should block out the remote session traffic. It does this by checking environment variables in the following order:
Environment Variable
Resultant Filter
SSH_CONNECTION
not (tcp port srcport and addr_family host srchost and tcp port dstport and addr_family host dsthost)
SSH_CLIENT
not (tcp port srcport and addr_family host srchost and tcp port dstport)
REMOTEHOST
not addr_family host host
DISPLAY
not addr_family host host
CLIENTNAME
not tcp port 3389
(addr_family will either be "ip" or "ip6")
Further Information
    Filtering while capturing from the Wireshark User's Guide
    The tcpdump man page includes a comprehensive capture filter reference
    The Mike Horn Tutorial gives a good introduction to capture filters
    Capture and display filter Cheat sheets
    packetlevel.ch Filter examples
See Also
DisplayFilters: more info on filters while displaying, not while capturing
The String-Matching Capture Filter Generator
Discussion
BTW, the Symantec page says that Blaster probes 135/tcp, 4444/tcp, and 69/udp. Would
    (tcp dst port 135 or tcp dst port 4444 or udp dst port 69) and ip[2:2]==48
    be a better filter? - Gerald Combs
Q: What is a good filter for just capturing SIP and RTP packets?
A: On most systems, for SIP traffic to the standard SIP port 5060,
    tcp port sip
should capture TCP traffic to and from that port,
    udp port sip
should capture UDP traffic to and from that port, and
    port sip
should capture both TCP and UDP traffic to and from that port (if one of those filters gets "parse error", try using 5060 instead of sip). For SIP traffic to and from other ports, use that port number rather than sip.
In most cases RTP port numbers are dynamically assigned. You can use something like the following which limits the capture to UDP, even source and destination ports, a valid RTP version, and small packets. It will capture any non-RTP traffic that happens to match the filter (such as DNS) but it will capture all RTP packets in many environments.
    udp[1] & 1 != 1 && udp[3] & 1 != 1 && udp[8] & 0x80 == 0x80 && length < 250
Capture WLAN traffic without Beacons:
    link[0] != 0x80
Capture all traffic originating (source) in the IP range 192.168.XXX.XXX:
    src net 192.168
Capture PPPoE traffic:
    pppoes
    pppoes and (host 192.168.0.0 and port 80)
Capture VLAN traffic:
    vlan
    vlan and (host 192.168.0.0 and port 80)
    CategoryHowTo
CaptureFilters (last edited 2011-10-05 18:15:45 by GeraldCombs)
    Immutable Page
    Info
    Attachments
Original content on this site is available under the GNU General Public License.
See the License page for details.     Powered by MoinMoin and Python.
Please don't pee in the pool.

| IRC                                                                         |

IRC Important Tips for Connecting to IRCnet servers
    It’s very important to use other ports than the default 6667 whenever possible, since that port tends to be very busy. Try something else in the 6660-6669 range instead.
    Many IRCnet servers allow none or few connections from users outside their domain, so try a server in your own country or at least close to you.
    Even after you connect, the traditional /links command to get a server list will only show about 1/3 of the servers, since many servers are “masked” and not shown. So for example, although there are about 16 servers in Finland (.fi), unless you’re already on a .fi server, /links or /links *.fi will show only the first one. You would need to do something like /links *.fi *.fi to see them all. 
See also this troubleshooting guide for connecting to IRCnet (external link).
IRCnet Server Lists
The following are all external links and will take you away from our site. We keep these lists because IRCnet lacks an official web site, so these sites have different degrees of stability and accuracy. (EFnet and IRCnet are the oldest networks. They actually predate notions of network founders and ownership, and are by necessity an ad hoc collection of servers with minimal central administration, so phrases like “official” can often be more about vanity than reality.)
IRCnet Server List: Semi-official
    This site is pretty new and is part of the self-acclaimed “IRCnet website”, whether it stands the test of time remains to be seen. As with most server lists, you would need to add the servers manually to your client - in mIRC you may do so in the connection setup dialog window. Alternatively, just issue commands like /server irc.whatever.com:6666 which connects you to irc.whatever.com on port 6666.
IRCnet Server List: another semi-official site
    This list is run by the admins of an IRCnet server, and is automatically refreshed by a computer script several times a day. It is thus guaranteed to be as complete as possible. It’s sorted by domain, which is the same as the country except for a few exceptions such as the US servers. Read through the “description” column and avoid those marked as “routing servers” which won’t allow you to connect. Like with the previous list, you would need to add the servers manually to your client.
IRCnet Server Map
    This unofficial site provides a map showing how the IRCnet servers are linked together, either in an ASCII format (less sexy but more readable) or the GraphViz image (more sexy but less readable). The maps are automatically updated every few hours using an open source script available at that site.

/server chat.freenode.net:6667
    IRC - Internet Relay Chat
    Helpful Tips
    Basic IRC Commands 
    mIRC Setup Tutorial
    PIRCH Setup Tutorial 
Just as you are able to surf the net with a few tricks to help make things easier, IRC is very similar. Below you will find some of the more common IRC commands that we use often. For a far more complete list, please visit our mIRC Commands page.
/join
    Type /join #channelname -- to join a channel of your choice 
    Example: /join #bossmom 
    What it looks like: 
    [18:44] *** Now talking in #beginner 
    --Op-- bossmom has joined the channel 
    [18:44] *** Topic is 'Beginner's Help/Chat Channel....All Are Welcome Here!! ®© [ENGLISH]' 
    [18:44] *** Set by X on Sun Jul 23 16:10:34
/me
    The /me is an action message. 
    Type /me 'does anything' 
    Example: /me waves hello 
    What it looks like: 
    * bossmom waves hello
/msg
    Type /msg nickname (message) to start a private chat. 
    Example: /msg puddytat Hey tat, how are you? 
    What it looks like: 
    -> *puddytat* Hey tat, how are you?
/nick
    /nick changes your nickname 
    Example: type /nick newnickname (limit 9 characters) 
    What it looks like: I typed /nick luv2quilt 
    *** bossmom is now known as luv2quilt
/notice
    A notice is used to send a short message to another person without opening up a private window. 
    Type /notice nickname (message) 
    Example: /notice badnick Please change your nickname for this family channel. 
    What it looks like: 
    -> -badnick- Please change your nickname for this family channel. 
/part
    Type /part -- to leave one channel 
    Type /partall -- to leave all the channels you are in
/ping
    Type /ping nickname. What this command does is give you the ping time, or lag time, between you and the person you pinged. Lag can be explained as the amount of time it takes for you to type your message and for others to read your messages. Unfortunately, lag is always a part of IRC, although most times it's not a problem, just a nuisance. 
    Example: /ping luv2quilt 
    What it looks like: 
    [19:04] -> [luv2quilt] PING 
    [19:04] [luv2quilt PING reply]: 0secs
/query
    Similar to the /msg, except it forces a window to pop open. 
    Type /query nickname (message) 
    Example: /query Sofaspud^ Sooo....what's new? 
    What it looks like: 
    <luv2quilt> soooo....what's new?
/quit
    Type /quit to leave IRC altogether. This disconnects mirc from the server. 
    Example: /quit Going out for dinner...nite all 
    What it looks like: 
    *** Quits: saca (Leaving)
/ignore
    Unfortunately, there will be times when you don't want to talk to someone, or else someone may be harassing you. 
    By typing /ignore nickname 3, you will not receive anymore messages from that person. 
    Example: /ignore luv2quilt 3 
    To Unignore them, type /ignore -r luv2quilt 3 
    What it looks like: 
    *** Added *!*bossmom@*.dialup.netins.net to ignore list 
    *** Removed *!*bossmom@*.dialup.netins.net from ignore list
/whois
    Type /whois nickname to see a bit more information about another user. You'll see what server another person is using, or what their ISP is. Pretty helpful when you don't recognize a nickname that wants to chat. You may recognize the IP, (Internet Protocol) and then feel more comfortable carrying on a conversation. You'll also be able to see what other channels a person is in, which might be a good indicator if you really want to talk with them or not. 
    Example: /whois bossmom 
    What it looks like: 
    luv2quilt is bossmom@elwo-01-094.dialup.netins.net * Enjoy the Journey........ 
    luv2quilt on @#bossmom 
    luv2quilt using Seattle.WA.US.Undernet.org the time for school is during a recession. 
    luv2quilt has been idle 18secs, signed on Sun Jul 23 18:47:26 
    luv2quilt End of /WHOIS list.
/chat
    This opens up a DCC/CHAT window to another user. What's nice about these is that you can continue to chat even if you get disconnected from your server. 
    Word of Caution: Do NOT accept dcc/chats nor dcc/gets from anyone that you don't know. 
    Type /chat nickname. 
    Example: /chat oddjob^ 
    What it looks like: 
    Chat with oddjob^ 
    Waiting for acknowledgement...
/help
    There's one more very helpful command, and probably the one you'll use a lot when first starting out. In fact, I still use it quite a lot, and that's the built-in help menu of mIRC. 
    Type /help, you'll see the the mIRC Help Menu open up. You can do a search from there, or you can type /help topic. Either way, a TON of information at your fingertips. 
    Example: /help Basic IRC Commands 
You are doing great so far. If you haven't yet read some Basic IRC Tips, I'd encourage you to take a peek, otherwise we are ready to setup your IRC client. Please choose one of the following clients you would like to learn:
    mIRC Setup Tutorial
    PIRCH Setup Tutorial 


# Guice

These samples cover essential JAVA classes related to Guice dependency injector and its extensions.

The sample program is based on the GWT-Guice Official Documentation.
Sample Program (All the programs are using Guice 3.0, Constructor binding is supported from this version)
Guice allows us to instantiate the object for the interface based on the binding mentioned.

+ First Step
++ Just mention the binding in AbstractModule's Implementation class (in sample program its BillingModule.java).
+ Linked Binding
++ Linking the binded implementation/abstract class to another class.
+ Binding Annotations
++ If you have multiple implementation for same interface, you can bind it by defining a annotation and the rules in overridden configure method of Module's Implementation class.
++ @Named is built-in annotation and you need to define named to it, in the configure method.
+ Instance Binding
++ This is to bind the instance directly to the interface in the Module class.
+ @Provides Method
++ Allows us to set properties to while the Object is getting created. This can be used with Annotations also.
+ Provider Bindings
++ If the Object creation get complicated, we can move it to a separate class instead of using @Provides Method. (Copy paste from Guice page).
+ Untargetted Bindings
++ Directly binding the concrete class, Usually used to mention Singleton. Annotation can be used with this as well.
+ Constructor Bindings
++ Assume, you have more than one constructor in class and you need to instantiate using a particular constructor. Then, use this method.
+ Just-in-time Binding
++ Binding will be decided based on the annotation provided in the interface, in other words, there is not explicit bindings mentioned in the module class (If binding and annotation is provided then binding will override annotation).

Bindings
+ Linked Bindings
+ Binding Annotations
+ Instance Bindings
+ @Provides Methods
+ Provider Bindings
+ Untargetted Bindings
+ Constructor Bindings
+ Built-in Bindings
+ Just-In-Time Bindings 
+ Scopes
+ Injections
++ Injecting Providers 
+ AOP 
Best Practices
+ Minimize mutability
+ Inject only direct dependencies
+ Avoid static state
+ Use @Nullable
+ Modules should be fast and side-effect free
+ Be careful about I/O in Providers
+ Avoid conditional logic in modules
+ Keep constructors as hidden as possible 
Web and Servlets
+ Getting Started
+ Configuring Guice Servlet
+ Advanced Topics
+ Inspecting Servlet Bindings 
Persistence
+ Getting Started
+ Using JPA
+ Transactions and Units of Work
+ Multiple persistence modules 
JSR-330
OSGi
Custom Injections
Third Party Modules 
Extensions
+ Extending Guice
+ Elements SPI
+ Extensions SPI
+ AssistedInject
+ Multibindings
+ Custom Scopes
+ Throwing Providers
+ Graphing Guice Applications 
Internals
+ Bootstrap
+ Binding Resolution
+ Injection Points
+ Class Loading
+ Optional AOP

# Onami

See http://99soft.github.com/guice.html
See http://wiki.apache.org/incubator/OnamiProposal
+ G-Guava   Google Guice integration modules for Google Guava
+ Guartz    Quartz integration, originally developed by Nino Martinez Wael
+ GSPI  a Java5 compatible small collection of reusable tools for Google Guice to make easier the integration with the Service Provider Interface pattern.
+ JUnice    Simple library to inject a Junit4 test classes via Google-Guice.
+ Lifegycle @AfterInjection and @Dispose Guice annotations handlers
+ Rocoto    Expanded properties for Google Guice
+ sli4j Simple Logging Injector for Java
+ Gache
+ Autobind
