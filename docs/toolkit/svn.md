# SVN

```
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
```

## Changesets

Before we proceed further, we should warn you that there's going to be a lot of discussion of “changes” in the pages ahead. A lot of people experienced with version control systems use the terms “change” and “changeset” interchangeably, and we should clarify what Subversion understands as a changeset.

Everyone seems to have a slightly different definition of changeset, or at least a different expectation of what it means for a version control system to have one. For our purposes, let's say that a changeset is just a collection of changes with a unique name. The changes might include textual edits to file contents, modifications to tree structure, or tweaks to metadata. In more common speak, a changeset is just a patch with a name you can refer to.

In Subversion, a global revision number N names a tree in the repository: it's the way the repository looked after the Nth commit. It's also the name of an implicit changeset: if you compare tree N with tree N−1, you can derive the exact patch that was committed. For this reason, it's easy to think of revision N as not just a tree, but a changeset as well. If you use an issue tracker to manage bugs, you can use the revision numbers to refer to particular patches that fix bugs—for example, “this issue was fixed by r9238.” Somebody can then run svn log -r 9238 to read about the exact changeset that fixed the bug, and run svn diff -c 9238 to see the patch itself. And (as you'll see shortly) Subversion's svn merge command is able to use revision numbers. You can merge specific changesets from one branch to another by naming them in the merge arguments: passing -c 9238 to svn merge would merge changeset r9238 into your working copy.
svn propset svn:externals "eggtoolpalette -r853 http://svn.gnome.org/svn/libegg/trunk/libegg/toolpalette/" .

svn commit -m "Added eggtoolpalette"

svn log | more

svn up
svn up -rXXXX

svn diff -r 63:64 .
