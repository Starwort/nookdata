import { bugs, fish } from './data.json';

type Critter = typeof bugs[0] | typeof fish[0];
export type { Critter };
export {
    getCritterName,
    getCritterQuote,
    getCritterLocation
};


function getCritterName(critter: Critter, type: 'bug' | 'fish', t: (key: string, props?: Object) => string) {
    return t(`critterpedia.${type}.name.${critter.normal_name}`);
}

function getCritterQuote(critter: Critter, type: 'bug' | 'fish', playername: string, t: (key: string, props?: Object) => string) {
    return t(`critterpedia.${type}.quote.${critter.normal_name}`, { playername });
}

function getCritterLocation(critter: Critter, type: 'bug' | 'fish', t: (key: string, props?: Object) => string) {
    return t(`critterpedia.${type}.location.${critter.location}`);
}


