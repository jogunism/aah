// 나라별 대한민국 공관(비자 접수처) 목록. 2026-11-23 overseas.mofa.go.kr 공식 페이지 기준으로 조사
// 독일(베를린 관할)·프랑스·네덜란드·영국은 대사관이 일반 비자를 받지 않고 비자신청센터(KVAC)에서 접수한다.

export interface VisaCenter {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface Mission {
  country: string; // ISO 3166-1 alpha-2
  name: string;
  city: string;
  address: string;
  phone: string;
  visaPhone?: string;
  email: string | null;
  website: string | null;
  jurisdiction: string[]; // as written by the mission (English / local names)
  visaCenter?: VisaCenter; // visas are lodged here instead of at the mission
}

export const MISSIONS: Mission[] = [
  {
    "country": "DE",
    "name": "Embassy of the Republic of Korea in Germany",
    "city": "Berlin",
    "address": "Stülerstraße 8, 10787 Berlin, Germany (Consular Section; main embassy/postal address: Stülerstraße 10, 10787 Berlin)",
    "phone": "+49 30 260650",
    "email": null,
    "website": "https://overseas.mofa.go.kr/de-de/index.do",
    "jurisdiction": [
      "Berlin",
      "Brandenburg",
      "Sachsen-Anhalt",
      "Sachsen",
      "Mecklenburg-Vorpommern",
      "Thüringen"
    ],
    "visaCenter": {
      "name": "Korea Visa Application Center (KVAC) Berlin",
      "address": "Charlottenstraße 68, 5th floor, 10117 Berlin",
      "phone": "+49 30 2902245550",
      "email": "kvacdeinfo@iom.int",
      "website": "https://www.visaforkorea.eu"
    }
  },
  {
    "country": "DE",
    "name": "Embassy of the Republic of Korea in Germany, Bonn Office",
    "city": "Bonn",
    "address": "Godesberger Allee 142-148, 3. Obergeschoss, 53175 Bonn, Germany",
    "phone": "+49 228 943790",
    "email": "admin-bn@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/de-bonn-de/index.do",
    "jurisdiction": [
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland"
    ]
  },
  {
    "country": "DE",
    "name": "Consulate General of the Republic of Korea in Frankfurt",
    "city": "Frankfurt am Main",
    "address": "Lyoner Straße 34, 60528 Frankfurt am Main, Germany (OLIVETTI Turm 2; consular/visa counter on 11th floor)",
    "phone": "+49 69 9567520",
    "email": "k-frankfurt@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/de-frankfurt-de/index.do",
    "jurisdiction": [
      "Hessen",
      "Baden-Württemberg",
      "Bayern"
    ]
  },
  {
    "country": "DE",
    "name": "Consulate General of the Republic of Korea in Hamburg",
    "city": "Hamburg",
    "address": "Kaiser-Wilhelm-Straße 9 (3. OG), 20355 Hamburg, Germany",
    "phone": "+49 40 650677600",
    "email": "gkhamburg@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/de-hamburg-de/index.do",
    "jurisdiction": [
      "Hamburg",
      "Bremen",
      "Niedersachsen",
      "Schleswig-Holstein"
    ],
    "visaPhone": "+49 40 650677614"
  },
  {
    "country": "AT",
    "name": "Embassy of the Republic of Korea in the Republic of Austria",
    "city": "Vienna",
    "address": "Gregor-Mendel-Straße 25, 1180 Wien, Austria",
    "phone": "+43 1 4781991",
    "email": "austria@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/at-en/index.do",
    "jurisdiction": [
      "Austria",
      "Kosovo"
    ],
    "visaPhone": "+43 1 4781991-68"
  },
  {
    "country": "CH",
    "name": "Embassy of the Republic of Korea to the Swiss Confederation",
    "city": "Bern",
    "address": "Kalcheggweg 38, 3006 Bern, Switzerland (postal: P.O. Box 1220, 3000 Bern 16)",
    "phone": "+41 31 356 2444",
    "email": "swiss@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/ch-en/index.do",
    "jurisdiction": [
      "Switzerland",
      "Liechtenstein"
    ],
    "visaPhone": "+41 31 356 2459"
  },
  {
    "country": "FR",
    "name": "Embassy of the Republic of Korea in France",
    "city": "Paris",
    "address": "Consular Section: 2 Avenue d'Iéna, 75116 Paris, France (postal: CS 11861, 75783 Paris Cedex); Embassy: 41-43 rue Saint-Dominique, 75007 Paris",
    "phone": "+33 1 47 53 01 01",
    "email": null,
    "website": "https://overseas.mofa.go.kr/fr-fr/index.do",
    "jurisdiction": [
      "France",
      "Monaco"
    ],
    "visaCenter": {
      "name": "Korea Visa Application Center (KVAC) Paris",
      "address": "56 Rue Crozatier, 75012 Paris",
      "phone": "+33 1 43 14 31 37",
      "email": "kvacfrinfo@iom.int",
      "website": "https://www.visaforkorea.eu"
    }
  },
  {
    "country": "BE",
    "name": "Embassy of the Republic of Korea to the Kingdom of Belgium and the European Union",
    "city": "Brussels",
    "address": "Chaussée de la Hulpe 173-175, 1170 Brussels (Watermael-Boitsfort), Belgium",
    "phone": "+32 2 675 5777",
    "email": "euconsul@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/be-en/index.do",
    "jurisdiction": [
      "Belgium"
    ],
    "visaPhone": "+32 2 661 0035"
  },
  {
    "country": "LU",
    "name": "Embassy of the Republic of Korea in Luxembourg",
    "city": "Luxembourg",
    "address": "5 Rue Pierre d'Aspelt, L-1142 Luxembourg",
    "phone": "+352 2699 7012",
    "email": "luxconsul@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/lu-en/index.do",
    "jurisdiction": [
      "Luxembourg"
    ]
  },
  {
    "country": "NL",
    "name": "Embassy of the Republic of Korea to the Kingdom of the Netherlands",
    "city": "The Hague",
    "address": "Verlengde Tolweg 8, 2517 JV The Hague, Netherlands",
    "phone": "+31 70 740 0200",
    "email": null,
    "website": "https://overseas.mofa.go.kr/nl-en/index.do",
    "jurisdiction": [
      "Netherlands"
    ],
    "visaCenter": {
      "name": "Korea Visa Application Center (KVAC) Netherlands",
      "address": "Carnegielaan 12, 2517 KH Den Haag",
      "phone": "+31 70 318 1590",
      "email": "kvacnlinfo@iom.int",
      "website": "https://www.visaforkorea.eu"
    }
  },
  {
    "country": "IT",
    "name": "Embassy of the Republic of Korea in Italy",
    "city": "Rome",
    "address": "Via Piemonte 54, 00187 Roma, Italy",
    "phone": "+39 06 4204021",
    "email": "consul-it@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/it-it/index.do",
    "jurisdiction": [
      "Toscana",
      "Umbria",
      "Lazio",
      "Abruzzo",
      "Marche",
      "Campania",
      "Puglia",
      "Molise",
      "Basilicata",
      "Calabria",
      "Sardegna",
      "Sicilia",
      "Malta",
      "San Marino"
    ],
    "visaPhone": "+39 06 420402226"
  },
  {
    "country": "IT",
    "name": "Consulate General of the Republic of Korea in Milan",
    "city": "Milan",
    "address": "Piazza Cavour 3 (4th floor), 20121 Milano, Italy",
    "phone": "+39 02 29062641",
    "email": "milano@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/it-milano-it/index.do",
    "jurisdiction": [
      "Lombardia",
      "Veneto",
      "Emilia-Romagna",
      "Piemonte",
      "Liguria",
      "Friuli-Venezia Giulia",
      "Trentino-Alto Adige",
      "Valle d'Aosta"
    ]
  },
  {
    "country": "ES",
    "name": "Embassy of the Republic of Korea in Spain",
    "city": "Madrid",
    "address": "Calle González Amigó 15, 28033 Madrid, Spain",
    "phone": "+34 91 353 2000",
    "email": "sc_madrid@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/es-es/index.do",
    "jurisdiction": [
      "Spain (all regions except Cataluña, Comunidad Valenciana, Islas Baleares and Canarias)"
    ]
  },
  {
    "country": "ES",
    "name": "Consulate General of the Republic of Korea in Barcelona",
    "city": "Barcelona",
    "address": "Passeig de Gràcia 103, 3rd floor, 08008 Barcelona, Spain",
    "phone": "+34 93 487 3153",
    "email": "barcelona@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/es-barcelona-es/index.do",
    "jurisdiction": [
      "Cataluña",
      "Comunidad Valenciana",
      "Islas Baleares"
    ]
  },
  {
    "country": "ES",
    "name": "Consulate of the Republic of Korea in Las Palmas de Gran Canaria",
    "city": "Las Palmas de Gran Canaria",
    "address": "Calle Luis Doreste Silva 60, 1ª planta, 35004 Las Palmas de Gran Canaria, Spain",
    "phone": "+34 928 250404",
    "email": "laspalmas@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/es-las-es/index.do",
    "jurisdiction": [
      "Canarias (provinces of Las Palmas and Santa Cruz de Tenerife)"
    ]
  },
  {
    "country": "PT",
    "name": "Embassy of the Republic of Korea in Portugal",
    "city": "Lisbon",
    "address": "Avenida Miguel Bombarda 36, 7º, 1050-165 Lisboa, Portugal",
    "phone": "+351 21 781 7130",
    "email": "consulpt@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/pt-pt/index.do",
    "jurisdiction": [
      "Portugal"
    ]
  },
  {
    "country": "GB",
    "name": "Embassy of the Republic of Korea in the United Kingdom",
    "city": "London",
    "address": "60 Buckingham Gate, London SW1E 6AJ, United Kingdom",
    "phone": "+44 20 7227 5500",
    "email": null,
    "website": "https://overseas.mofa.go.kr/gb-en/index.do",
    "jurisdiction": [
      "United Kingdom"
    ],
    "visaCenter": {
      "name": "Korea Visa Application Center (KVAC) London",
      "address": "Heron House, 1st floor, 10 Dean Farrar Street, London SW1H 0DX",
      "phone": "+44 20 7811 6098",
      "email": "kvacukinfo@iom.int",
      "website": "https://www.visaforkorea.eu"
    }
  },
  {
    "country": "IE",
    "name": "Embassy of the Republic of Korea in Ireland",
    "city": "Dublin",
    "address": "72 Merrion Square South, Dublin 2, D02 TW54, Ireland",
    "phone": "+353 1 609 9111",
    "email": "irekoremb@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/ie-en/index.do",
    "jurisdiction": [
      "Ireland"
    ]
  },
  {
    "country": "SE",
    "name": "Embassy of the Republic of Korea in the Kingdom of Sweden",
    "city": "Stockholm",
    "address": "Laboratoriegatan 10, P.O.Box 27237, SE-102 53 Stockholm, Sweden",
    "phone": "+46 8 545 894 00",
    "email": "koremb.sweden@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/se-en/index.do",
    "jurisdiction": [
      "Sweden"
    ]
  },
  {
    "country": "NO",
    "name": "Embassy of the Republic of Korea to Norway",
    "city": "Oslo",
    "address": "Holbergs gate 1, 0166 Oslo, Norway (Postal: PO Box 4059 AMB, 0244 Oslo)",
    "phone": "+47 225 47 090",
    "email": "kornor@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/no-en/index.do",
    "jurisdiction": [
      "Norway",
      "Iceland"
    ],
    "visaPhone": "+47 225 47 091"
  },
  {
    "country": "DK",
    "name": "Embassy of the Republic of Korea in Denmark",
    "city": "Hellerup (Copenhagen)",
    "address": "Svanemøllevej 104, DK-2900 Hellerup, Denmark",
    "phone": "+45 39 46 04 00",
    "email": "korembdk@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/dk-en/index.do",
    "jurisdiction": [
      "Denmark"
    ],
    "visaPhone": "+45 39 46 04 09"
  },
  {
    "country": "FI",
    "name": "Embassy of the Republic of Korea in Finland",
    "city": "Helsinki",
    "address": "Pohjoinen Makasiinikatu 4, 3rd Floor, 00130 Helsinki, Finland",
    "phone": "+358 9 2515 000",
    "email": "korembfi@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/fi-en/index.do",
    "jurisdiction": [
      "Finland"
    ]
  },
  {
    "country": "PL",
    "name": "Embassy of the Republic of Korea in Poland",
    "city": "Warsaw",
    "address": "ul. Szwoleżerów 6, 00-464 Warszawa, Poland",
    "phone": "+48 22 559 2900",
    "email": "korcon_waw@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/pl-ko/index.do",
    "jurisdiction": [
      "Poland"
    ],
    "visaPhone": "+48 22 559 2907"
  },
  {
    "country": "CZ",
    "name": "Embassy of the Republic of Korea in the Czech Republic",
    "city": "Prague",
    "address": "Pelléova 15, 160 00 Praha 6 - Bubeneč, Czech Republic",
    "phone": "+420 234 090 411",
    "email": "czech@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/cz-cs/index.do",
    "jurisdiction": [
      "Czech Republic"
    ]
  },
  {
    "country": "HU",
    "name": "Embassy of the Republic of Korea to Hungary",
    "city": "Budapest",
    "address": "Andrássy út 109, H-1062 Budapest, Hungary",
    "phone": "+36 1 462 3080",
    "email": "hun.consul@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/hu-hu/index.do",
    "jurisdiction": [
      "Hungary"
    ],
    "visaPhone": "+36 1 462 3097"
  },
  {
    "country": "GR",
    "name": "Embassy of the Republic of Korea to the Hellenic Republic",
    "city": "Athens",
    "address": "Athens Tower A Building, 19th Fl., 2-4 Messogion Ave., 115 27 Athens, Greece",
    "phone": "+30 210 698 4080",
    "email": "gremb@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/gr-en/index.do",
    "jurisdiction": [
      "Greece"
    ]
  },
  {
    "country": "US",
    "name": "Embassy of the Republic of Korea in the USA (Consular Section / Consulate General in Washington D.C.)",
    "city": "Washington, D.C.",
    "address": "2320 Massachusetts Avenue N.W., Washington, D.C. 20008 (consular); Embassy: 2450 Massachusetts Avenue N.W., Washington, D.C. 20008",
    "phone": "+1-202-939-5600",
    "email": "consular.usa@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-en/index.do",
    "jurisdiction": [
      "Virginia",
      "Maryland",
      "District of Columbia",
      "West Virginia"
    ],
    "visaPhone": "+1-202-939-5653"
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in New York",
    "city": "New York",
    "address": "101 East 56th St., New York, NY 10022 (Passport & Visa Section: 1st & 2nd Fl.)",
    "phone": "+1-646-674-6000",
    "email": "kcg_ny@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-newyork-en/index.do",
    "jurisdiction": [
      "New York",
      "New Jersey",
      "Pennsylvania",
      "Connecticut",
      "Delaware"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in San Francisco",
    "city": "San Francisco",
    "address": "3500 Clay Street, San Francisco, CA 94118",
    "phone": "+1-415-921-2251",
    "email": "koreavisa1@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-sanfrancisco-en/index.do",
    "jurisdiction": [
      "Northern California",
      "Colorado",
      "Utah",
      "Wyoming"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Los Angeles",
    "city": "Los Angeles",
    "address": "3243 Wilshire Blvd, Los Angeles, CA 90010",
    "phone": "+1-213-385-9300",
    "email": "service-la@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-losangeles-en/index.do",
    "jurisdiction": [
      "Southern California",
      "Arizona",
      "Nevada",
      "New Mexico"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Boston",
    "city": "Newton (Boston area)",
    "address": "300 Washington Street (One Gateway Center), Suite 800, Newton, MA 02458",
    "phone": "+1-617-641-2830",
    "email": "kcgboston@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-boston-en/index.do",
    "jurisdiction": [
      "Massachusetts",
      "New Hampshire",
      "Rhode Island",
      "Maine",
      "Vermont"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Chicago",
    "city": "Chicago",
    "address": "NBC Tower Suite 2700, 455 North Cityfront Plaza Drive, Chicago, IL 60611",
    "phone": "+1-312-822-9485",
    "email": "chicagovisa@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-chicago-en/index.do",
    "jurisdiction": [
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Michigan",
      "Minnesota",
      "Missouri",
      "Nebraska",
      "North Dakota",
      "Ohio",
      "South Dakota",
      "Wisconsin"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Seattle",
    "city": "Seattle",
    "address": "115 W Mercer St, Seattle, WA 98119",
    "phone": "+1-206-441-1011",
    "email": "seattlevisa@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-seattle-en/index.do",
    "jurisdiction": [
      "Washington",
      "Oregon",
      "Idaho",
      "Montana",
      "Alaska"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Atlanta",
    "city": "Atlanta",
    "address": "229 Peachtree St, Suite 2100, International Tower, Atlanta, GA 30303",
    "phone": "+1-404-522-1611",
    "email": "ATL03@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-atlanta-en/index.do",
    "jurisdiction": [
      "Alabama",
      "Florida",
      "Georgia",
      "North Carolina",
      "Puerto Rico",
      "South Carolina",
      "Tennessee",
      "Virgin Islands"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Houston",
    "city": "Houston",
    "address": "1990 Post Oak Blvd, STE 1250, Houston, TX 77056",
    "phone": "+1-713-961-0186",
    "email": "con-hu04@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-houston-en/index.do",
    "jurisdiction": [
      "Arkansas",
      "Louisiana",
      "Mississippi",
      "Oklahoma",
      "Texas (except Dallas and Fort Worth)"
    ]
  },
  {
    "country": "US",
    "name": "Consulate General of the Republic of Korea in Honolulu",
    "city": "Honolulu",
    "address": "2756 Pali Highway, Honolulu, HI 96817",
    "phone": "+1-808-595-6109",
    "email": "visapasshi@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-honolulu-en/index.do",
    "jurisdiction": [
      "Hawaii",
      "American Samoa"
    ]
  },
  {
    "country": "US",
    "name": "Consulate of the Republic of Korea in Hagatna",
    "city": "Tamuning (Guam)",
    "address": "153 Zoilo St., Tamuning, Guam 96913 (P.O.Box 12489, Tamuning, Guam 96931)",
    "phone": "+1-671-647-6488",
    "email": "kconsul_guam@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/us-hagatna-en/index.do",
    "jurisdiction": [
      "Guam",
      "Commonwealth of the Northern Mariana Islands (CNMI)"
    ]
  },
  {
    "country": "CA",
    "name": "Embassy of the Republic of Korea to Canada",
    "city": "Ottawa",
    "address": "150 Boteler Street, Ottawa, Ontario K1N 5A6, Canada",
    "phone": "+1-613-244-5010",
    "email": "canada@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/ca-en/index.do",
    "jurisdiction": [
      "Ottawa (Ontario)",
      "Nunavut"
    ],
    "visaPhone": "+1-613-244-5030"
  },
  {
    "country": "CA",
    "name": "Consulate General of the Republic of Korea in Toronto",
    "city": "Toronto",
    "address": "555 Avenue Road, Toronto, Ontario M4V 2J7, Canada",
    "phone": "+1-416-920-3809",
    "email": "torvisa@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/ca-toronto-en/index.do",
    "jurisdiction": [
      "Ontario (except Ottawa)",
      "Manitoba"
    ]
  },
  {
    "country": "CA",
    "name": "Consulate General of the Republic of Korea in Montreal",
    "city": "Montreal",
    "address": "1250 René-Lévesque Boulevard West, Suite 3600 (36th Floor), Montreal, Quebec H3B 4W8, Canada",
    "phone": "+1-514-845-2555",
    "email": "montrealvisa@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/ca-montreal-en/index.do",
    "jurisdiction": [
      "Quebec",
      "Newfoundland and Labrador",
      "New Brunswick",
      "Nova Scotia",
      "Prince Edward Island"
    ]
  },
  {
    "country": "CA",
    "name": "Consulate General of the Republic of Korea in Vancouver",
    "city": "Vancouver",
    "address": "#1600-1090 West Georgia St., Vancouver, British Columbia V6E 3V7, Canada",
    "phone": "+1-604-681-9581",
    "email": "vanvisa@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/ca-vancouver-en/index.do",
    "jurisdiction": [
      "Alberta",
      "British Columbia",
      "Saskatchewan",
      "Yukon",
      "Northwest Territories"
    ]
  },
  {
    "country": "AU",
    "name": "Embassy of the Republic of Korea in the Commonwealth of Australia",
    "city": "Canberra (Barton)",
    "address": "Level 3/42 Macquarie St, Barton ACT 2600, Australia",
    "phone": "+61-2-6270-4100",
    "email": "visa-au@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/au-en/index.do",
    "jurisdiction": [
      "ACT",
      "SA",
      "WA",
      "TAS"
    ],
    "visaPhone": "+61-2-6270-4151"
  },
  {
    "country": "AU",
    "name": "Consulate General of the Republic of Korea in Sydney",
    "city": "Sydney",
    "address": "Level 10, 44 Market Street, Sydney NSW 2000, Australia (Postal: PO Box Q506 QVB NSW 1230)",
    "phone": "+61-2-9210-0200",
    "email": "consyd@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/au-sydney-en/index.do",
    "jurisdiction": [
      "New South Wales",
      "Northern Territory"
    ]
  },
  {
    "country": "AU",
    "name": "Consulate of the Republic of Korea in Melbourne",
    "city": "Melbourne",
    "address": "Level 10, 636 St Kilda Road, Melbourne VIC 3004, Australia",
    "phone": "+61-3-9533-3800",
    "email": "conmel@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/au-melbourne-en/index.do",
    "jurisdiction": [
      "Victoria"
    ]
  },
  {
    "country": "AU",
    "name": "Consulate of the Republic of Korea in Brisbane",
    "city": "Brisbane",
    "address": "Level 1, 102 Adelaide St, Brisbane City QLD 4000, Australia (Postal: PO Box 5804, Brisbane QLD 4001)",
    "phone": "+61-7-3221-1440",
    "email": "brisbane@korea.kr",
    "website": "https://overseas.mofa.go.kr/au-brisbane-en/index.do",
    "jurisdiction": [
      "Queensland"
    ]
  },
  {
    "country": "NZ",
    "name": "Embassy of the Republic of Korea to New Zealand",
    "city": "Wellington",
    "address": "Level 20, ANZ Centre, 171 Featherston Street, Wellington 6011, New Zealand (Postal: P.O.Box 11-143, Manners Street, Wellington)",
    "phone": "+64-4-473-9073",
    "email": "consular-nz@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/nz-en/index.do",
    "jurisdiction": [
      "Part of the North Island (Wellington, Taranaki, Hawke's Bay, Manawatū-Whanganui)",
      "Entire South Island",
      "Cook Islands",
      "Samoa",
      "Tonga",
      "Niue"
    ]
  },
  {
    "country": "NZ",
    "name": "Consulate of the Republic of Korea in Auckland",
    "city": "Auckland",
    "address": "Level 12, Tower 1, 205 Queen Street, Auckland Central, New Zealand (Postal: P.O.Box 5744 Wellesley Street, Auckland)",
    "phone": "+64-9-379-0818",
    "email": "auckland@mofa.go.kr",
    "website": "https://overseas.mofa.go.kr/nz-auckland-en/index.do",
    "jurisdiction": [
      "Part of the North Island (Auckland, Waikato, Bay of Plenty, Northland, Gisborne)"
    ]
  }
];

export const MISSION_COUNTRIES = Array.from(new Set(MISSIONS.map((m) => m.country)));
