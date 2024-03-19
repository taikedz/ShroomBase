import * as traverse from './traverse.ts'

var ALL_ALIAS = null;
var ALIAS_PATHS = {};

export function registerAliases(data) {
    ALL_ALIAS = data;
}


export function resolveAlias(alias) {

    let value = ALIAS_PATHS[alias];
    if (!( value === undefined)) { return value; }

    let tokens = alias.split("/");
    value = traverse.descend(ALL_ALIAS, tokens)

    if (!(value === null || value === undefined)) {
        ALIAS_PATHS[alias] = value;
    }

    return value;
}

