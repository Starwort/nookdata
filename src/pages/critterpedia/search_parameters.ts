interface SearchParameters {
    name: string;
    location: string;
    size: string;
    activeRequired: 'now' | 'month' | 'until_next' | 'any';
    stateRequired: 'unobtained' | 'unmodelled' | 'any';
    priceComparison: '>=' | '=' | '<=';
    price: number;
}
export default SearchParameters;