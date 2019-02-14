const argv = require('yargs')
  .usage('Usage: htty [--port <port>] command...')
  .option('port', {
      alias: 'P',
      type: 'number',
      default: 8080
  })
  .argv;

if (argv._.length == 0) {
  console.warn('No command specified');
  process.exit(1);
}

// child process
const { spawn } = require('child_process');
const child = spawn(argv._[0], argv._.slice(1));
child.stdin.setEncoding('utf-8');

var last_out = '';

child.stdout.on('data', (data) => {
  data = data.toString();
  console.log(data);
  last_out += data;
});

child.stderr.on('data', (data) => {
  data = data.toString();
  console.log(data);
  last_out += data;
});

var child_close = (code) => {
  console.log(`Child process finished with ${code}`);
  process.exit(code);
};

child.on('error', (err) => {console.warn(err)})
child.on('close', child_close);
child.on('exit', child_close);

function input(buf) {
  last_out = '';
  buf = buf.toString();
  child.stdin.write(buf);
  if (buf[buf.length - 1] !== '\n') child.stdin.write('\n');
}

// readline
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  child.stdin.write(input);
  child.stdin.write('\n');
});

// server
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.raw());

app.post('/', (req, res) => {
  var data = req.body;
  input(data);
  setTimeout(() => {
    res.send(last_out);
  }, 100);
});

app.listen(argv.port, () => {
  console.log(`Listen on ${argv.port}`);
});
