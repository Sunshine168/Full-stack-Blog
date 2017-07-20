// @flow

import type {ChildProcess} from 'child_process'

export type Result = {code: ?number, signal: ?string}

function join(child: ChildProcess): Promise<Result> {
  return new Promise((_resolve: (result: Result) => void, _reject: (error: Error) => void) => {
    function resolve(result: Result) {
      child.removeAllListeners()
      _resolve(result)
    }
    function reject(error: Error) {
      child.removeAllListeners()
      _reject(error)
    }
    child.on('exit', (code: ?number, signal: ?string): any => {
      if (code != null && code !== 0) {
        const error = new Error(`process exited with code ${code}`)
        const flowWorkaround: Object = error
        flowWorkaround.code = code
        flowWorkaround.signal = null
        reject(error)
      }
      else if (signal) {
        const error = new Error(`process exited with signal ${signal}`)
        const flowWorkaround: Object = error
        flowWorkaround.code = null
        flowWorkaround.signal = signal
        reject(error)
      }
      else resolve({code, signal})
    })
    child.on('error', reject)
  })
}

export default join
