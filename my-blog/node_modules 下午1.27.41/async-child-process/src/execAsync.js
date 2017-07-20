// @flow

import {exec} from 'child_process'
import type {ChildProcess} from 'child_process'

export type Result = {stdout: string, stderr: string}

export function customize(exec: (command: string) => ChildProcess): (command: string, options?: Object) => Promise<Result> {
  return (command: string, options?: Object) => new Promise(
    (resolve: (result: Result) => void, reject: (error: Error) => void) => {
      exec(command, options, (error: ?Error, stdout: string | Buffer, stderr: string | Buffer) => {
        if (error) reject(error)
        else resolve({stdout: stdout.toString(), stderr: stderr.toString()})
      })
    }
  )
}

export default customize(exec)

