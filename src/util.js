import React from "react";
import numeral from "numeral";
import {Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        mutiplier: 800,
    },
    recovered: { 
        hex: "#7dd71d",
        mutiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        mutiplier: 2000,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases) ? -1 : 1);
     
};

export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";



//DRAW circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType= "cases") => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
             fillOpacity={0.4}
             pathOptions={{ 
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
        }}
           
            
           
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].mutiplier
            }
            >
             <Popup> 
               <div className="info-container">
               <div
                    className="info-flag"
                    style={{backgroundImage: `url(${country.countryInfo.flag})`}}
               />
               <div className="info-name">{country.country}</div>
               <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
               <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
               <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
               </div>
            </Popup>
        </Circle>
    ))
);
    


