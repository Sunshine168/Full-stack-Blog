// @flow

import type {ChildProcess} from 'child_process'

export function customize(
  kill: (child: ChildProcess, signal?: string) => void
): (child: ChildProcess, signal?: string) => Promise<void> {
  return (child, signal) => {
    return new Promise((_resolve: () => void, _reject: (error: Error) => void) => {
      function resolve() {
        child.removeAllListeners()
        _resolve()
      }
      function reject(error: Error) {
        child.removeAllListeners()
        _reject(error)
      }
      child.on('exit', resolve)
      child.on('error', reject)
      if (signal) kill(child, signal)
      else kill(child)
    })
  }
}

const kill = customize((child, signal) => {
  if (signal != null) child.kill(signal)
  else child.kill()
})

export default kill
