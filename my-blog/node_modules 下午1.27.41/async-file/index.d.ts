import * as fs from 'fs';
export { createReadStream, createWriteStream, watch, watchFile, unwatchFile, Stats, FSWatcher, ReadStream, WriteStream, constants } from 'fs';
export declare function access(path: string, mode?: number | string): Promise<void>;
export declare function appendFile(file: string | number, data: any, options?: {
    encoding?: 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8';
    mode?: number | string;
    flag?: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+';
}): Promise<void>;
export declare function chmod(path: string, mode: number | string): Promise<void>;
export declare function chown(path: string, uid: number, gid: number): Promise<void>;
export declare function close(fd: number): Promise<void>;
export declare function fchmod(fd: number, mode: number | string): Promise<void>;
export declare function fchown(fd: number, uid: number, gid: number): Promise<void>;
export declare function fstat(fd: number): Promise<fs.Stats>;
export declare function ftruncate(fd: number, len?: number): Promise<void>;
export declare function futimes(fd: number, atime: Date | number, mtime: Date | number): Promise<void>;
export declare function fsync(fd: number): Promise<void>;
export declare function lchmod(path: string, mode: number | string): Promise<void>;
export declare function lchown(path: string, uid: number, gid: number): Promise<void>;
export declare function link(srcpath: string, dstpath: string): Promise<void>;
export declare function lstat(path: string): Promise<fs.Stats>;
export declare function mkdir(path: string, mode?: number | string): Promise<void>;
export declare function mkdtemp(path: string): Promise<string>;
export declare function open(path: string, flags: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+', mode?: number | string): Promise<number>;
export declare function read(fd: number, buffer: Buffer, offset: number, length: number, position: number): Promise<{
    bytesRead: number;
    buffer: Buffer;
}>;
export declare function readdir(path: string): Promise<string[]>;
export declare function readFile(file: string | number, options?: {
    encoding?: 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8';
    flag?: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+';
} | 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8' | 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+'): Promise<any>;
export declare function readlink(path: string): Promise<string>;
export declare function realpath(path: string, cache?: {
    [path: string]: string;
}): Promise<string>;
export declare function rename(oldPath: string, newPath: string): Promise<void>;
export declare function rmdir(path: string): Promise<void>;
export declare function stat(path: string): Promise<fs.Stats>;
export declare function symlink(srcpath: string, dstpath: string, type?: string): Promise<void>;
export declare function truncate(path: string, len?: number): Promise<void>;
export declare function unlink(path: string): Promise<void>;
export declare function utimes(path: string, atime: Date | number, mtime: Date | number): Promise<void>;
export declare function write(fd: number, buffer: Buffer, offset: number, length: number, position?: number): Promise<{
    written: number;
    buffer: Buffer;
}>;
export declare function write(fd: number, data: any, offset?: number, encoding?: 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8'): Promise<{
    written: number;
    buffer: Buffer;
}>;
export declare function writeFile(file: string | number, data: string | any, options?: {
    encoding?: 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8';
    flag?: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+';
    mode?: number | string;
} | 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8' | 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+'): Promise<void>;
export declare function readTextFile(file: string | number, encoding?: 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8', flags?: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+'): Promise<string>;
export declare function writeTextFile(file: string | number, data: string, encoding?: 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf16le' | 'utf8', flags?: 'r' | 'r+' | 'rs' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+', mode?: number | string): Promise<void>;
export declare function createDirectory(path: string, mode?: number | string): Promise<void>;
export { createDirectory as mkdirp };
declare function del(path: string): Promise<void>;
export { del as delete };
export { del as rimraf };
export declare function exists(path: string): Promise<boolean>;
