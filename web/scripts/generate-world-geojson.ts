/**
 * Generate world GeoJSON data from world-atlas
 * Run with: pnpm tsx scripts/generate-world-geojson.ts
 */

import { feature } from "topojson-client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Country code to name mapping (ISO 3166-1 alpha-2)
const countryCodeToName: Record<string, string> = {
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua and Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "Saint Barthélemy",
  BM: "Bermuda",
  BN: "Brunei Darussalam",
  BO: "Bolivia",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos Islands",
  CD: "Congo",
  CF: "Central African Republic",
  CG: "Congo",
  CH: "Switzerland",
  CI: "Côte d'Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cabo Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia and the South Sandwich Islands",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard Island and McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KM: "Comoros",
  KN: "Saint Kitts and Nevis",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Lao People's Democratic Republic",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "Saint Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macao",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  PN: "Pitcairn",
  PR: "Puerto Rico",
  PS: "Palestine",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "Saint Helena",
  SI: "Slovenia",
  SJ: "Svalbard and Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "Sao Tome and Principe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syrian Arab Republic",
  SZ: "Eswatini",
  TC: "Turks and Caicos Islands",
  TD: "Chad",
  TF: "French Southern Territories",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Turkey",
  TT: "Trinidad and Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "United States Minor Outlying Islands",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Holy See",
  VC: "Saint Vincent and the Grenadines",
  VE: "Venezuela",
  VG: "Virgin Islands",
  VI: "Virgin Islands",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis and Futuna",
  WS: "Samoa",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

// Visitor count per country (mock data for the choropleth map)
const visitorCounts: Record<string, number> = {
  ID: 98500, // Indonesia
  US: 67800, // United States
  MY: 42300, // Malaysia
  SG: 31200, // Singapore
  PH: 18900, // Philippines
  TH: 15600, // Thailand
  VN: 12400, // Vietnam
  IN: 28000, // India
  JP: 9800, // Japan
  AU: 8500, // Australia
  GB: 11200, // United Kingdom
  DE: 7600, // Germany
  FR: 8900, // France
  CA: 9200, // Canada
  BR: 5400, // Brazil
  SA: 4200, // Saudi Arabia
  AE: 3800, // UAE
  KR: 6500, // South Korea
  CN: 11500, // China
  HK: 4800, // Hong Kong
  TW: 3600, // Taiwan
  NL: 5200, // Netherlands
  IT: 6100, // Italy
  ES: 5800, // Spain
  MX: 4900, // Mexico
  AR: 2100, // Argentina
  CO: 2800, // Colombia
  ZA: 3200, // South Africa
  NG: 2400, // Nigeria
  EG: 1900, // Egypt
  KE: 1600, // Kenya
  RU: 4300, // Russia
  TR: 3400, // Turkey
  PK: 2200, // Pakistan
  BD: 1800, // Bangladesh
};

// Find the world-atlas path in pnpm
const findWorldAtlasPath = (): string => {
  const possiblePaths = [
    resolve("./node_modules/.pnpm/world-atlas@2.0.2/node_modules/world-atlas/countries-50m.json"),
    resolve("./node_modules/world-atlas/countries-50m.json"),
  ];

  for (const p of possiblePaths) {
    try {
      const { existsSync } = require("fs");
      if (existsSync(p)) {
        return p;
      }
    } catch {
      continue;
    }
  }

  throw new Error("Could not find world-atlas countries-50m.json");
};

try {
  const worldAtlasPath = findWorldAtlasPath();
  const topoJson = JSON.parse(readFileSync(worldAtlasPath, "utf-8"));

  // Convert TopoJSON to GeoJSON
  const geoJson = feature(topoJson, topoJson.objects.countries);

  if (!geoJson || geoJson.type !== "FeatureCollection") {
    throw new Error("Failed to convert TopoJSON to GeoJSON");
  }

  // Transform GeoJSON with enhanced properties
  const worldGeoJson = {
    type: "FeatureCollection" as const,
    features: geoJson.features.map((f: any) => {
      const countryCode = f.properties?.iso_a2 || f.properties?.ISO_A2 || f.id;
      const countryName = countryCodeToName[countryCode] || f.properties?.name || "Unknown";
      const visitors = visitorCounts[countryCode];

      return {
        type: "Feature" as const,
        id: f.id,
        geometry: f.geometry,
        properties: {
          name: countryName,
          visitors: visitors,
        },
      };
    }),
  };

  // Write to file
  const outputPath = "./src/data/world-geojson.ts";
  const fileContent = `import type { FeatureCollection, Geometry } from "geojson";

// Auto-generated world GeoJSON data from world-atlas
export const worldGeoJson: FeatureCollection<Geometry, { name: string; visitors?: number }> = ${JSON.stringify(worldGeoJson, null, 2)};
`;

  const { writeFileSync } = require("fs");
  writeFileSync(outputPath, fileContent);
  console.log(`✅ Generated ${outputPath}`);
  console.log(`   Features: ${worldGeoJson.features.length}`);
} catch (error) {
  console.error("❌ Error:", error);
  process.exit(1);
}
