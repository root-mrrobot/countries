export interface Country {
    altSpellings: string[];
    area: number;
    borders: string[];
    capital: string[];
    car: { signs: string[]; side: string };
    cca2: string;
    cca3: string;
    ccn3: string;
    cioc: string;
    continents: string[];
    currencies: { code: string; name: string; symbol: string }[];
    demonyms: { [key: string]: { f: string; m: string } };
    flags: {
        alt: string;
        png: string;
        svg: string;
    }      
    government: string;
    languages: { [key: string]: string };
    name: { common: string; official: string; nativeName: { [key: string]: { official: string; common: string } } };
    population: number;
    region: string;
    subregion: string;
    timezones: string[];
    latlng: number[];
  }
  