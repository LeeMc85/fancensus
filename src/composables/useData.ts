import _ from "lodash";
import {v4 as uuidv4} from 'uuid';
import iso2 from "@/assets/iso2.json";
interface Dataset {
    countrycode: string;
    date: string;
    headline: string;
    name: string;
    product: string;
}

interface JsonData {
    [key: string]: any;
}

// Create an instance of the object
const countryNames: JsonData = iso2;

export default function useData(data: Dataset[]) {

    let formattedData = data.map((item: Dataset) => {
        // Convert UK to GB
        let isoCode = item.countrycode === "UK" ? "GB" : item.countrycode;

        // Add the country name and iso2 code to the object
        return {
            id: uuidv4(),
            iso2: isoCode,
            countryname: countryNames[isoCode],
            countrycode: item.countrycode,
            date: item.date,
            headline: item.headline,
            name: item.name,
            product: item.product,
        }
    });

    const orderByKey = (key: string, ascending: boolean): Object => {
        return _.orderBy(formattedData, key, ascending ? 'asc' : 'desc');
    };

    const groupByKey = (key: string, data?: object): Object => {
        if (data) {
            return _.groupBy(data, key)
        }
        return _.groupBy(formattedData, key)
    };

    const getIsoFromCountryName = (countryName: string): string => {
        let iso2Code = Object.keys(countryNames).find(key => countryNames[key] === countryName);
        return iso2Code ? iso2Code : "";
    }

    const getCountryNameFromIso = (iso2Code: string): string => {
        return countryNames[iso2Code];
    }

    return {
        groupByKey,
        orderByKey,
        getIsoFromCountryName,
        getCountryNameFromIso,
    };
}
