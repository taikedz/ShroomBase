import * as resolveyaml from './resolveyaml.ts';

var ALL_ALIAS = null;

function deepLog(thing) { console.log(thing, false, null, true) }

resolveyaml.loadAliasYaml('data/aliases.yaml')

let parasol = resolveyaml.loadSpecimenYaml('specimens/parasol.yaml')
deepLog(parasol)

