import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as traverse from './traverse.ts'


var ALL_ALIAS = null;


function loadYaml(path) {
    let filehandle = fs.readFileSync(path)
    return yaml.load(filehandle)
}

export function loadAliasYaml(path) {
    let data = loadYaml(path);
    resolveYamlAliases(data);
    return data;
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
    // FIXME - ALL_ALIAS still undefined here
    ALL_ALIAS = _resolveYamlAliases(data_tree);
}

function _resolveYamlAliases(data_tree) {
    for(let key in data_tree) {
        let value = data_tree[key];

        if (value == null) { data_tree[key] = key; }

        else if (istype(value, 'string') && value.startsWith("$=")) { loadAliasYaml(value.substring(2)); }

        else if (istype(value, 'object')) { _resolveYamlAliases(value); }
    }
}


function resolveYamlSpecimens(data_tree) {
    for(let key in data_tree) {
        let value = data_tree[key];

        if (value == null) { data_tree[key] = "(unspecified)"; }

        else if (istype(value, 'string') && value.startsWith("$"))
            data_tree[key] = resolveAlias(value.substring(1));

        else if (istype(value, 'object')) { resolveYamlSpecimens(value); }
    }
}


function resolveAlias(alias) {
    let tokens = alias.split("/");
    // FIXME - ALL_ALIAS still undefined here
    return traverse.descend(ALL_ALIAS, tokens)
}

