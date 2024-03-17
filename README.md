# ShroomBase

Easily track data about fungi, and build a searchable static site from the data.

* built site is static and hostable on free-tier site hosting
* no database engines required
* data maintained in structured readable YAML
* beacuse it is static, built site is accessible offline

## Contributing

Please feel free to contribute to the code, however because identification can be quite personal, I will not be taking contributions to the specimen section.

Please ensure you run the pre-commit scripts for verifying site-build code.

## Developer's notes

The key goal here is to document what I am learning about mushrooms, and breaking down the information structurally so that it can be searched. The example data that I collect will no doubt be for UK mushrooms specifically, as that is my interest.

However, the site-build engine itself will remain data-agnostic: the format will intend to be well-defined, whereas the specific information on each specimen/species remains distinct.

This may form a useful base for building your own notes on mushrooms, fruits, and plants that you may collect.

WARNING: Specimen information (notably, data under `./specimens`) is provided AS EXAMPLE ONLY.

Mis-identification of foraged food can be fatal. I am an amateur forager. Don't trust my field notes.

## Copyright

See [LICENSES-NOTES.md](./LICENSES-NOTES.md)
