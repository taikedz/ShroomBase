import * as resolveyaml from './resolveyaml.ts';
import * as fsutil from './fsutil.ts';

function deepLog(thing) { console.dir(thing, {depth:null}) }

resolveyaml.loadAliasYaml('data/aliases.yaml')

for ( const path of fsutil.walkdir('/hostdata/specimens', [".yaml"]) ) {
    console.log(`====== ${path} =====`)
    deepLog( resolveyaml.loadSpecimenYaml(path) )
}

