import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as aliaslib from './aliaslib.ts'


const ALIAS_PAT = new RegExp('\\$[a-zA-Z0-9_/-]+', 'g');


function loadYaml(path) {
    let filehandle = fs.readFileSync(path)
    return yaml.load(filehandle)
}

export function loadAliasYaml(path) {
    let data = loadYaml(path);
    resolveYamlAliases(data);
    aliaslib.registerAliases(data);
}

export function loadSpecimenYaml(path) {
    let data = loadYaml(path);
    resolveYamlSpecimens(data);
    // TODO - change this to return the data, along with a list of
    //   all aliases resolved in the file. Use those to build the alias lookup
    //   (also return non-resolved aliases for separate reporting)
    return data;
}


function istype(obj, typestr) {
    return typeof(obj) == typestr;
}


function resolveYamlAliases(data_tree) {
    for(let key in data_tree) {
        let value = data_tree[key];

        if (value == null) { data_tree[key] = key; }

        else if (istype(value, 'string') && value.startsWith("$=")) {
            data_tree[key] = loadYaml(value.substring(2))
            resolveYamlAliases(data_tree[key]);
        }

        else if (istype(value, 'object')) { resolveYamlAliases(value); }
    }
}


function resolveYamlSpecimens(data_tree) {
    for(let key in data_tree) {
        let value = data_tree[key];

        if (value == null) { data_tree[key] = "(unspecified)"; }

        else if (istype(value, 'string')) {
            let aliases = value.matchAll(ALIAS_PAT)

            for(const alias of aliases) {
                let alias_str = alias[0]
                let sub = aliaslib.resolveAlias(alias_str.substring(1))
                if (sub === undefined) sub = alias_str
                value = value.replace(alias_str, sub)
            }
            data_tree[key] = value
        }

        else if (istype(value, 'object')) { resolveYamlSpecimens(value); }
    }
}

