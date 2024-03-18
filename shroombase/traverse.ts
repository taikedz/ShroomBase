export function descend(obj, path) {
    let seen = []

    path.forEach( (token) => {
        try {
            seen.push(token)
            obj = obj[token]

            if (obj === undefined)
                throw TypeError("Accessed undefined path")
        } catch (e) {
            console.log(`WARNING: Not found : ${seen.join('/')}`)
            return null;
        }
    })
    return obj
}
