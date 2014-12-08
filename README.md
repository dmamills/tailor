# tailor

`tail -f` in the browser using nodejs + socket.io

### setup

```
npm install
node index.js /path/to/some/log/file
```

### usage

The server setups a http server on port 8000. When a socket connection is made it emits a `init` event that sends the first 20 lines of the file. When the a lines are appended it emits a `message` event with the new lines.

The client should bind to the `init` event using `socket#once` and `message` using `socket#on`

