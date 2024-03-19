import * as traverse from './traverse.ts'

var ALL_ALIAS = null;

export function registerAliases(data) {
    ALL_ALIAS = data;
}


export function resolveAlias(alias) {
    let tokens = alias.split("/");
    return traverse.descend(ALL_ALIAS, tokens)
}

