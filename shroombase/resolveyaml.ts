import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as traverse from './traverse.ts'


var ALL_ALIAS = null;
const ALIAS_PAT = new RegExp('\\$[a-zA-Z0-9_/-]+', 'g');


function loadYaml(path) {
    let filehandle = fs.readFileSync(path)
    return yaml.load(filehandle)
}

export function loadAliasYaml(path) {
    ALL_ALIAS = loadYaml(path);
    resolveYamlAliases(ALL_ALIAS);
}

export function loadSpecimenYaml(path) {
    let data = loadYaml(path);
    resolveYamlSpecimens(data);
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
                let sub = resolveAlias(alias_str.substring(1))
                if (sub === undefined) sub = alias_str
                value = value.replace(alias_str, sub)
            }
            data_tree[key] = value
        }

        else if (istype(value, 'object')) { resolveYamlSpecimens(value); }
    }
}


function resolveAlias(alias) {
    let tokens = alias.split("/");
    return traverse.descend(ALL_ALIAS, tokens)
}

