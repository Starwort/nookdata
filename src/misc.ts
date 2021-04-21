type Dict<V> = {
    [key: string]: V;
}
function decodeURLParams(url: string): Dict<string> {
    return Object.fromEntries(
        url
            .split('?')[1]
            ?.split('&')
            ?.map(
                i => {
                    return i.split('=', 2).map(j => decodeURIComponent(j));
                }
            )
        ?? []
    );
}
function encodeURLParams(newParams: Dict<string>, url: string) {
    return url.split('?')[0] + '?' + Object.entries(newParams).map(
        i => i.map(
            j => encodeURIComponent(j)
        ).join('=')
    ).join('&');
}
export type { Dict };
export { decodeURLParams, encodeURLParams };

