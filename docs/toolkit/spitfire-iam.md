# Upgrading Zeppelin with Multiuser

## Current Inplementation

### Modes

It is possible to execute many paragraphs in parallel. However, at the back-end side, we’re still using synchronous queries. Asynchronous execution is only possible when it is possible to return a Future value in the InterpreterResult. It may be an interesting proposal for the Zeppelin project.

Recently, Zeppelin allows you to choose the level of isolation for your interpreters (see Interpreter Binding Mode ).

Long story short, you have 3 available bindings:

shared : same JVM and same Interpreter instance for all notes
scoped : same JVM but different Interpreter instances, one for each note
isolated: different JVM running a single Interpreter instance, one JVM for each note
Using the shared binding, the same com.datastax.driver.core.Session object is used for all notes and paragraphs. Consequently, if you use the USE keyspace name; statement to log into a keyspace, it will change the keyspace for all current users of the Cassandra interpreter because we only create 1 com.datastax.driver.core.Session object per instance of Cassandra interpreter.

The same remark does apply to the prepared statement hash map, it is shared by all users using the same instance of Cassandra interpreter.

When using scoped binding, in the same JVM Zeppelin will create multiple instances of the Cassandra interpreter, thus multiple com.datastax.driver.core.Session objects. Beware of resource and memory usage using this binding !

The isolated mode is the most extreme and will create as many JVM/com.datastax.driver.core.Session object as there are distinct notes.

Each Interpreter Setting can choose one of 'shared', 'scoped', 'isolated' interpreter binding mode.
In 'shared' mode, every notebook bound to the Interpreter Setting will share the single Interpreter instance.
In 'scoped' mode, each notebook will create new Interpreter instance in the same interpreter process.
In 'isolated' mode, each notebook will create new Interpreter process.

|          | option().isPerNoteSession() |  option().isPerNoteProcess() |
| -------- | --------------------------- | ---------------------------- |
| shared   |                             |                              |
| scoped   |                             |                              |
| isolated |                             |                              |

InterpreterSetting.java

```
private String getInterpreterProcessKey(String noteId) {
  if (getOption().isExistingProcess) {
    return Constants.EXISTING_PROCESS;
  } else if (getOption().isPerNoteProcess()) {
    return noteId;
  } else {
    return SHARED_PROCESS;
  }
}
```

InterpreterFactory.java

```
private String getInterpreterInstanceKey(String noteId, InterpreterSetting setting) {
  if (setting.getOption().isExistingProcess()) {
    return Constants.EXISTING_PROCESS;
  } else if (setting.getOption().isPerNoteSession() || setting.getOption().isPerNoteProcess()) {
    return noteId;
  } else {
    return SHARED_SESSION;
  }
}
```
