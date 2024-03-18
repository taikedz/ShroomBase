import path from 'path';
import * as fs from 'fs';


function endsWith(extensions:string[], filename:string) {
    if (extensions.length == 0) return true

    for(const ex of extensions) {
        if (filename.endsWith(ex)) return true;
    }
    return false;
}


export function* walkdir(path:string, extensions:string[] = null):IterableIterator<string> {
    if (extensions === null) extensions = [];

    const entries:fs.Dirent[] = fs.readdirSync(path, {withFileTypes: true});

    for (const entry of entries) {
        const entryPath:string = `${path}/${entry.name}`;

        if (entry.isFile() && endsWith(extensions, entry.name)) {
            yield entryPath;
        }

        if (entry.isDirectory()) {
            yield* walkdir(entryPath, extensions);
        }
    }
}

function tryit() {
    for (const path of walkdir("./node_modules", [".md"])) console.log(path)
}
//tryit()
