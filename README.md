# htty

stdio via http

## requirements

```bash
node -v  # works with Node.js
npm i --save
export PATH=$PWD/bin:$PATH
```

## usage

### Launch server

```bash
   htty --help
Usage: index.js [--port <port>] command...

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --port, -P                                            [number] [default: 8080]
```

#### Example: IPython (a python interpreter)

```bash
   htty ipython --colors=NoColor
Listen on 8080
Python 3.7.1 (default, Dec 14 2018, 13:28:58)
...

In [1]:
```

### Send buffer

#### by a script

```bash
   htty-send <<< '(1, 2, 3)'
Out[1]: (1, 2, 3)

In [2]:
```

#### by curl

The server listens `/` via POST.

```bash
   curl localhost:8080 -H 'Content-Type: application/octet-stream' --data 'import random; random.random()'
Out[2]: 0.5662312022239704

In [3]:
```

### Bonus stage: Vim

```vim
nnoremap X V:w !htty-send<cr>
vnoremap X :w !htty-send<cr>
```

Press `X`, then the cursor line code, or selected lines will be executed.
(NOTE to PATH.)
