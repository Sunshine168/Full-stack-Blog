# async-child-process

[![Build Status](https://travis-ci.org/jedwards1211/async-child-process.svg?branch=master)](https://travis-ci.org/jedwards1211/async-child-process)
[![Coverage Status](https://coveralls.io/repos/github/jedwards1211/async-child-process/badge.svg?branch=master)](https://coveralls.io/github/jedwards1211/async-child-process?branch=master)

A simple `Promise`-based API for working with `ChildProcess`es.

## Usage

```sh
npm install --save async-child-process
```

### `join(child: ChildProcess): Promise<Result>`

Waits for `child` to exit.

Returns a `Promise` that:
- will resolve `{code: 0}` if `child` exits with code 0
- with reject with an error otherwise
  - `error.code` will be the exit code if the child exited normally
  - `error.signal` will be the signal the child was terminated with, if any
  - *Note:* if `child` emits an `error`, it may be the rejection reason and it may not have `code` or `signal`

Example:

```es6
import {exec} from 'child_process'
import {join} from 'async-child-process'

async function test() {
  await join(exec('echo hello world'))
}
```

### `kill(child: ChildProcess, signal?: string): Promise<void>`

Sends a signal to `child` and waits for it to exit.

Returns a `Promise` that:
- will resolve once `child` is killed
- will reject with an `error` if `child` emits one

Example:
```es6
import {exec} from 'child_process'
import {kill} from 'async-child-process'

async function test() {
  const child = exec(`node -e 'setTimeout(() => console.log("finally!"), 1e11)'`)
  await kill(child)
}
```

### `childPrinted(child: ChildProcess, predicate: (output: string) => boolean | RegExp, stream?: 'stdout' | 'stderr'): Promise<string>`

Waits for `child` to print something to its `stdout` and/or `stderr`.  Returns a promise that:
- will resolve with the message that matched `predicate` or
- will reject if `child` exited or errored before printing a message that matched `predicate`

Arguments:
- child: the `ChildProcess` to listen to
- predicate: `childPrinted` will wait until `child`'s stream(s) output a message matching the predicate
- stream: which of `child`'s streams to listen to, omit to listen to both `stdout` and `stderr`

Example:
```es6
import {exec} from 'child_process'
import {childPrinted} from 'async-child-process'

async function test() {
  const child = exec(`webpack --config webpack.config.dev.js`)
  await childPrinted(child, /webpack built in \d+ ms/)
}
```

### `execAsync(command: string, options?: Object): Promise<Result>`

Like `exec`, but returns a `Promise` that:
- will resolve with `{stdout: string, stderr: string}` from running `command` if it exited with code 0
- will reject with an error otherwise
  - `error.code` will be the exit code if the child exited normally
  - `error.signal` will be the signal the child was terminated with, if any
  - *Note:* if `child` emits an `error`, it may be the rejection reason and it may not have `code` or `signal`

Example:
```es6
import {execAsync} from 'async-child-process'

async function test() {
  const {stdout} = await execAsync('docker-compose port webapp 80')
  const testUrl = stdout.trim()
}
```

