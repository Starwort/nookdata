interface SearchParameters {
    name: string;
    location: string;
    size: string;
    activeRequired: boolean;
    leavingRequired: boolean;
    unobtainedRequired: boolean;
    unmodelledRequired: boolean;
    priceComparison: '>=' | '=' | '<=';
    price: number;
}
export default SearchParameters;