export function descend(obj, path) {
    path.forEach( (token) => {
        try {
            obj = obj[token]
        } catch (e) {
            console.log(`${token} --> ${e}`)
            throw e
        }
    })
    return obj
}
