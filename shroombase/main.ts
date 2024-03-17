import * as fs from 'fs'
import * as yaml from 'js-yaml'

function loadYaml(path) {
    let filehandle = fs.readFileSync(path)
    return resolveYaml(yaml.load(filehandle))
}

function resolveYaml(tree) {
    for( let key in tree ) {
        let val = tree[key]
        if (val == null) tree[key] = key;
        else if(typeof val === 'object') resolveYaml(val);
        else if(typeof val == 'string') {
            if (val.startsWith("$=")) tree[key] = loadYaml(val.substring(2));
            else if (val.startsWith("$")) tree[key] = resolveAlias(val.substring(1));
        }
    }
    return tree
}

function resolveAlias(alias) {
    return `(should resolve ${alias})`
}

function deepLog(thing) { console.log(thing, false, null, true) }

let aliases = loadYaml('data/aliases.yaml')
console.log(aliases)

let parasol = loadYaml('specimens/parasol.yaml')
deepLog(parasol)
