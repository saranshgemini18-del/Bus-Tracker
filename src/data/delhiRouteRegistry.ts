/**
 * Master Registry of Delhi Transport Corporation (DTC) & DIMTS bus routes.
 * Maps internal GTFS feed IDs (e.g. "1707", "2114", "2223", "2061") to public LED board display routes (e.g. "354", "892", "740").
 */

export interface DelhiRouteInfo {
  displayRoute: string;
  startPoint: string;
  lastPoint: string;
  operator?: string;
  description?: string;
  name?: string;
  stops?: string[];
}

export const DELHI_ROUTE_REGISTRY: Record<string, DelhiRouteInfo> = {
  "1": {
    "displayRoute": "1",
    "startPoint": "Shivalik Zanskar",
    "lastPoint": "Hospital",
    "operator": "IIT Delhi"
  },
  "6": {
    "displayRoute": "6",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "8": {
    "displayRoute": "8",
    "startPoint": "Noida Ph 2 Phool Mandi",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "10": {
    "displayRoute": "10",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "CLSTR"
  },
  "17": {
    "displayRoute": "17",
    "startPoint": "Ramzan Pur Village / Kushak Pur Village / SS International School",
    "lastPoint": "Old Delhi Railway Station (Fatehpuri)",
    "operator": "DTC"
  },
  "19": {
    "displayRoute": "19",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "29": {
    "displayRoute": "29",
    "startPoint": "Rani Khera Depot II",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "CLSTR"
  },
  "30": {
    "displayRoute": "30",
    "startPoint": "Lampur Border",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "CLSTR"
  },
  "32": {
    "displayRoute": "32",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "33": {
    "displayRoute": "33",
    "startPoint": "Noida Sec-43 Police Chowki SadarPur",
    "lastPoint": "Bhajanpura",
    "operator": "DTC"
  },
  "34": {
    "displayRoute": "34",
    "startPoint": "Noida Sector-32 Terminal",
    "lastPoint": "Mehrauli Terminal",
    "operator": "DTC"
  },
  "39": {
    "displayRoute": "39",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "Jheel Terminal",
    "operator": "DTC"
  },
  "46": {
    "displayRoute": "46",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "CLSTR"
  },
  "48": {
    "displayRoute": "48",
    "startPoint": "Jawaharlal Nehru Stadium",
    "lastPoint": "Ring Road (near Gupta Market)",
    "operator": "Delhi Transport Corporation"
  },
  "49": {
    "displayRoute": "49",
    "startPoint": "Ramdev Chowk Narela Terminal",
    "lastPoint": "Mori Gate Terminal",
    "operator": "CLSTR"
  },
  "50": {
    "displayRoute": "50",
    "startPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "lastPoint": "Badu sarai Village",
    "operator": "CLSTR"
  },
  "54": {
    "displayRoute": "54",
    "startPoint": "Sultanpuri Terminal",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "CLSTR"
  },
  "61": {
    "displayRoute": "61",
    "startPoint": "Keshav Nagar Mukti Ashram",
    "lastPoint": "ISBT Nitayanand Marg",
    "operator": "DTC"
  },
  "66": {
    "displayRoute": "66",
    "startPoint": "Vasant Vihar Depot",
    "lastPoint": "Rama Krishna Puram, Sector - 9",
    "operator": "Delhi Transport Corporation"
  },
  "70": {
    "displayRoute": "70",
    "startPoint": "Auchandi Border",
    "lastPoint": "Rani Khera Depot III",
    "operator": "MATCH"
  },
  "72": {
    "displayRoute": "72",
    "startPoint": "ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "73": {
    "displayRoute": "73",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "78": {
    "displayRoute": "78",
    "startPoint": "Inderpuri Krishi Kunj (T)",
    "lastPoint": "Azadpur Metro Station / Terminal",
    "operator": "DTC"
  },
  "83": {
    "displayRoute": "83",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Ajmeri Gate / Kamla Market",
    "operator": "DTC"
  },
  "85": {
    "displayRoute": "85",
    "startPoint": "Punjabi Bagh Terminal",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "88": {
    "displayRoute": "88",
    "startPoint": "Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "Delhi Transport Corporation"
  },
  "89": {
    "displayRoute": "89",
    "startPoint": "Safdarjung Tomb",
    "lastPoint": "Safdarjung Airport",
    "operator": "Delhi Transport Corporation"
  },
  "90": {
    "displayRoute": "90",
    "startPoint": "New Seema Puri Depot Cluster",
    "lastPoint": "CPWD Colony Vasant Vihar",
    "operator": "CLSTR"
  },
  "98": {
    "displayRoute": "98",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Kanjhawala Village",
    "operator": "CLSTR"
  },
  "100": {
    "displayRoute": "100",
    "startPoint": "Kendriya Terminal",
    "lastPoint": "Adarsh Nagar",
    "operator": "Delhi Transport Corporation"
  },
  "102": {
    "displayRoute": "102",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "103": {
    "displayRoute": "103",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "DTC"
  },
  "105": {
    "displayRoute": "105",
    "startPoint": "Mukhmel Pur Village",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "DTC"
  },
  "106": {
    "displayRoute": "106",
    "startPoint": "Qutubgarh Village (Terminal)",
    "lastPoint": "Old Delhi Railway Station (Fatehpuri)",
    "operator": "DTC"
  },
  "107": {
    "displayRoute": "107",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Katewara Village",
    "operator": "Delhi Transit"
  },
  "108": {
    "displayRoute": "108",
    "startPoint": "Nehru Vihar",
    "lastPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "operator": "DTC"
  },
  "109": {
    "displayRoute": "109",
    "startPoint": "Bankner Village",
    "lastPoint": "Azadpur Terminal (Bara Bagh Road)",
    "operator": "DTC"
  },
  "112": {
    "displayRoute": "112",
    "startPoint": "Safiabad Border / Shiv Mandir",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "DTC"
  },
  "113": {
    "displayRoute": "113",
    "startPoint": "Sannoth Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "114": {
    "displayRoute": "114",
    "startPoint": "Qutub Garh Village (T)",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "115": {
    "displayRoute": "115",
    "startPoint": "Wazir Pur JJ Colony",
    "lastPoint": "Old Delhi Railway Station (Fatehpuri)",
    "operator": "DTC"
  },
  "116": {
    "displayRoute": "116",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Bawana J J Colony F-Block",
    "operator": "DTC"
  },
  "117": {
    "displayRoute": "117",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Bhalswa JJ Colony",
    "operator": "DTC"
  },
  "118": {
    "displayRoute": "118",
    "startPoint": "Patparganj Mor",
    "lastPoint": "Mori Gate",
    "operator": "Delhi Transport Corporation"
  },
  "119": {
    "displayRoute": "119",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Bajitpur Village",
    "operator": "DTC"
  },
  "120": {
    "displayRoute": "120",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "121": {
    "displayRoute": "121",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "123": {
    "displayRoute": "123",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Harewali Border",
    "operator": "Delhi Transit"
  },
  "124": {
    "displayRoute": "124",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Mukhmel Pur Village",
    "operator": "DTC"
  },
  "125": {
    "displayRoute": "125",
    "startPoint": "Palla Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "126": {
    "displayRoute": "126",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Badli Village / Badli school",
    "operator": "Delhi Transit"
  },
  "127": {
    "displayRoute": "127",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Haider Pur Village",
    "operator": "DTC"
  },
  "128": {
    "displayRoute": "128",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Khera Khurd Community Center",
    "operator": "Delhi Transit"
  },
  "129": {
    "displayRoute": "129",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Jhingola Village",
    "operator": "Delhi Transit"
  },
  "130": {
    "displayRoute": "130",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Ghoga Village",
    "operator": "DTC"
  },
  "131": {
    "displayRoute": "131",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Lampur Border (T)",
    "operator": "Delhi Transit"
  },
  "133": {
    "displayRoute": "133",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Mori Gate Terminal",
    "operator": "Delhi Transit"
  },
  "134": {
    "displayRoute": "134",
    "startPoint": "Ibrahimpur Village",
    "lastPoint": "ISBT Kashmiri Gate",
    "operator": "DTC"
  },
  "135": {
    "displayRoute": "135",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "136": {
    "displayRoute": "136",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Ghoga Village",
    "operator": "Delhi Transit"
  },
  "137": {
    "displayRoute": "137",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Holambi Kalan Terminal",
    "operator": "Delhi Transit"
  },
  "138": {
    "displayRoute": "138",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Hamidpur Village",
    "operator": "DTC"
  },
  "139": {
    "displayRoute": "139",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Bhalswa JJ Colony",
    "operator": "Delhi Transit"
  },
  "140": {
    "displayRoute": "140",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "Mori Gate Terminal",
    "operator": "Delhi Transit"
  },
  "141": {
    "displayRoute": "141",
    "startPoint": "Rohini Sec 23 Pocket 1 (Green Hill Aptt.)",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "142": {
    "displayRoute": "142",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "143": {
    "displayRoute": "143",
    "startPoint": "Keshav Nagar Mukti Ashram",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "144": {
    "displayRoute": "144",
    "startPoint": "Singhu Border GT Road",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "145": {
    "displayRoute": "145",
    "startPoint": "Rohini Sec 18 Pocket A",
    "lastPoint": "Nehru Vihar Terminal",
    "operator": "DTC"
  },
  "146": {
    "displayRoute": "146",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Hiranki",
    "operator": "DTC"
  },
  "147": {
    "displayRoute": "147",
    "startPoint": "Tiggi Pur Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "148": {
    "displayRoute": "148",
    "startPoint": "Tikri Khurd",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "149": {
    "displayRoute": "149",
    "startPoint": "Taj Pur Kalan",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "153": {
    "displayRoute": "153",
    "startPoint": "Shani Mandir Shiv Vihar / Hastsal JJ Colony",
    "lastPoint": "Mukherji Nagar Baandh",
    "operator": "Delhi Transit"
  },
  "154": {
    "displayRoute": "154",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Dahisara Border",
    "operator": "DTC"
  },
  "156": {
    "displayRoute": "156",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "158": {
    "displayRoute": "158",
    "startPoint": "Jahangirpuri Metro Station GT Road",
    "lastPoint": "Ghoga Village",
    "operator": "Delhi Transit"
  },
  "159": {
    "displayRoute": "159",
    "startPoint": "Inder Puri",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "160": {
    "displayRoute": "160",
    "startPoint": "Shalimar Bagh BH Block",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "DTC"
  },
  "161": {
    "displayRoute": "161",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Bawana Dispensary",
    "operator": "Delhi Transit"
  },
  "162": {
    "displayRoute": "162",
    "startPoint": "Tiggi Pur Village",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "164": {
    "displayRoute": "164",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Hanuman Mandir / Shivaji Stadium",
    "operator": "DTC"
  },
  "165": {
    "displayRoute": "165",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "166": {
    "displayRoute": "166",
    "startPoint": "Shalimar Bagh BH Block",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "DTC"
  },
  "167": {
    "displayRoute": "167",
    "startPoint": "Uttri Pitam Pura",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "DTC"
  },
  "168": {
    "displayRoute": "168",
    "startPoint": "Laxmi Bai College",
    "lastPoint": "Hauz Khass Terminal",
    "operator": "DTC"
  },
  "169": {
    "displayRoute": "169",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Katevara Village",
    "operator": "Delhi Transit"
  },
  "171": {
    "displayRoute": "171",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Holambi Kalan JJ Colony",
    "operator": "Delhi Transit"
  },
  "172": {
    "displayRoute": "172",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Holambi Khurd",
    "operator": "Delhi Transit"
  },
  "173": {
    "displayRoute": "173",
    "startPoint": "Narela A-5",
    "lastPoint": "J L Nehru Stadium",
    "operator": "DTC"
  },
  "174": {
    "displayRoute": "174",
    "startPoint": "Kanjhawala Village (T)",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "175": {
    "displayRoute": "175",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Lampur Border",
    "operator": "DTC"
  },
  "179": {
    "displayRoute": "179",
    "startPoint": "Ramdev Chowk Narela Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "181": {
    "displayRoute": "181",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "183": {
    "displayRoute": "183",
    "startPoint": "Rohini Sec-15 E-2",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "DTC"
  },
  "185": {
    "displayRoute": "185",
    "startPoint": "Natthupura",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "DTC"
  },
  "188": {
    "displayRoute": "188",
    "startPoint": "Qutubgarh Village (Terminal)",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "191": {
    "displayRoute": "191",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Harewali Village (T)",
    "operator": "Delhi Transit"
  },
  "192": {
    "displayRoute": "192",
    "startPoint": "Keshav Nagar Mukti Ashram",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "DTC"
  },
  "193": {
    "displayRoute": "193",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "194": {
    "displayRoute": "194",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Bakuli Temple",
    "operator": "DTC"
  },
  "199": {
    "displayRoute": "199",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Samaypur Badli Metro / Badli Railway Staion",
    "operator": "DTC"
  },
  "205": {
    "displayRoute": "205",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "New Seema Puri",
    "operator": "DTC"
  },
  "207": {
    "displayRoute": "207",
    "startPoint": "Bhajanpura",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "Delhi Transit"
  },
  "208": {
    "displayRoute": "208",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "210": {
    "displayRoute": "210",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "211": {
    "displayRoute": "211",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mayur Vihar Phase-3 Church / Mayur Vihar Ph-III paper Market",
    "operator": "DTC"
  },
  "212": {
    "displayRoute": "212",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "213": {
    "displayRoute": "213",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Harsh Vihar",
    "operator": "DTC"
  },
  "214": {
    "displayRoute": "214",
    "startPoint": "New Seema Puri",
    "lastPoint": "PS Kamla Market",
    "operator": "DTC"
  },
  "215": {
    "displayRoute": "215",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Bawana JJ Colony Terminal",
    "operator": "Delhi Transit"
  },
  "216": {
    "displayRoute": "216",
    "startPoint": "Mundka Village Metro Station",
    "lastPoint": "Rithala Metro Station",
    "operator": "MATCH"
  },
  "217": {
    "displayRoute": "217",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Gokul Puri Terminal / Gokul Puri",
    "operator": "Delhi Transit"
  },
  "218": {
    "displayRoute": "218",
    "startPoint": "Shadipur Depot",
    "lastPoint": "Babarpur Ext / Maujpur Crossing",
    "operator": "DTC"
  },
  "219": {
    "displayRoute": "219",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Hiran Kudna Crossing",
    "operator": "DTC"
  },
  "220": {
    "displayRoute": "220",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "CLSTR"
  },
  "221": {
    "displayRoute": "221",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "222": {
    "displayRoute": "222",
    "startPoint": "BBM Cluster Depot",
    "lastPoint": "Chauhan Patti (Terminal)",
    "operator": "CLSTR"
  },
  "229": {
    "displayRoute": "229",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "Inderlok Metro Station",
    "operator": "DTC"
  },
  "232": {
    "displayRoute": "232",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "PS Mangol Puri",
    "operator": "DTC"
  },
  "233": {
    "displayRoute": "233",
    "startPoint": "Sayed Gaon Nangloi (T)",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "234": {
    "displayRoute": "234",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "235": {
    "displayRoute": "235",
    "startPoint": "Wazirpur JJ Colony",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "236": {
    "displayRoute": "236",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Anand Vihar (ISBT) / Gazi Pur Telco",
    "operator": "DTC"
  },
  "237": {
    "displayRoute": "237",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Babarpur Ext Terminal",
    "operator": "Delhi Transit"
  },
  "239": {
    "displayRoute": "239",
    "startPoint": "New Seema Puri",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "240": {
    "displayRoute": "240",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Malik Pur Village",
    "operator": "CLSTR"
  },
  "241": {
    "displayRoute": "241",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "243": {
    "displayRoute": "243",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "DDA Flats Kalkaji",
    "operator": "DTC"
  },
  "244": {
    "displayRoute": "244",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "247": {
    "displayRoute": "247",
    "startPoint": "Kanjhawala Chowk",
    "lastPoint": "ISBT Kashmere Gate Terminal",
    "operator": "DTC"
  },
  "248": {
    "displayRoute": "248",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Johri Pur",
    "operator": "DTC"
  },
  "251": {
    "displayRoute": "251",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Rithala Village",
    "operator": "CLSTR"
  },
  "253": {
    "displayRoute": "253",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "C-Block Yamuna Vihar / C4 YAMUNA VIHAR TERMINAL",
    "operator": "DTC"
  },
  "254": {
    "displayRoute": "254",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Babarpur Ext Terminal",
    "operator": "Delhi Transit"
  },
  "258": {
    "displayRoute": "258",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "CHAUHAN PATTI (TERMINAL)",
    "operator": "DTC"
  },
  "259": {
    "displayRoute": "259",
    "startPoint": "Harsh Vihar Terminal",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "260": {
    "displayRoute": "260",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "C-Block Yamuna Vihar / C4 YAMUNA VIHAR TERMINAL",
    "operator": "DTC"
  },
  "261": {
    "displayRoute": "261",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "265": {
    "displayRoute": "265",
    "startPoint": "Khera Khurd Village",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "CLSTR"
  },
  "267": {
    "displayRoute": "267",
    "startPoint": "Kalyan Puri Terminal",
    "lastPoint": "Ajmeri Gate / Kamla Market",
    "operator": "Delhi Transit"
  },
  "269": {
    "displayRoute": "269",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Mubarakpur Dabas",
    "operator": "CLSTR"
  },
  "270": {
    "displayRoute": "270",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Karawal Nagar Terminal",
    "operator": "DTC"
  },
  "272": {
    "displayRoute": "272",
    "startPoint": "Bawana Sec 5 Cluster Depot",
    "lastPoint": "Bawana Soap Factory",
    "operator": "MATCH"
  },
  "273": {
    "displayRoute": "273",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "274": {
    "displayRoute": "274",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "BabarPur Extension Terminal",
    "operator": "DTC"
  },
  "281": {
    "displayRoute": "281",
    "startPoint": "Kendriya Terminal / Gurudwara Rakab Ganj",
    "lastPoint": "New Seema Puri",
    "operator": "Delhi Transit"
  },
  "292": {
    "displayRoute": "292",
    "startPoint": "Old Delhi Railway Station (Terminal)",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "CLSTR"
  },
  "295": {
    "displayRoute": "295",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Mehrauli Terminal",
    "operator": "CLSTR"
  },
  "306": {
    "displayRoute": "306",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Kalyanpuri",
    "operator": "DTC"
  },
  "307": {
    "displayRoute": "307",
    "startPoint": "Trilokpuri 27/31 block",
    "lastPoint": "Ajmeri Gate / Kamla Market",
    "operator": "DTC"
  },
  "309": {
    "displayRoute": "309",
    "startPoint": "Kalyan Puri Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "310": {
    "displayRoute": "310",
    "startPoint": "Jheel Terminal",
    "lastPoint": "Inder Puri",
    "operator": "DTC"
  },
  "311": {
    "displayRoute": "311",
    "startPoint": "Uttam Nagar Terminal",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "CLSTR"
  },
  "312": {
    "displayRoute": "312",
    "startPoint": "Chhatarpur Ext / Nanda Hospital",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "CLSTR"
  },
  "315": {
    "displayRoute": "315",
    "startPoint": "ISBT Kashmere Gate Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "CLSTR"
  },
  "316": {
    "displayRoute": "316",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Jheel Terminal",
    "operator": "DTC"
  },
  "317": {
    "displayRoute": "317",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Shahdara Terminal",
    "operator": "Delhi Transit"
  },
  "318": {
    "displayRoute": "318",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Karampura Terminal",
    "operator": "DTC"
  },
  "319": {
    "displayRoute": "319",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Noida Sec 43 Police Chowki",
    "operator": "DTC"
  },
  "320": {
    "displayRoute": "320",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "323": {
    "displayRoute": "323",
    "startPoint": "Noida Sec-62 (Electronic City)",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "DTC"
  },
  "333": {
    "displayRoute": "333",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "E Block Jahangir Puri Terminal",
    "operator": "DTC"
  },
  "334": {
    "displayRoute": "334",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "335": {
    "displayRoute": "335",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "IIT Gate",
    "operator": "DTC"
  },
  "336": {
    "displayRoute": "336",
    "startPoint": "New Seema Puri",
    "lastPoint": "Munirka Village (T)",
    "operator": "DTC"
  },
  "340": {
    "displayRoute": "340",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "operator": "DTC"
  },
  "344": {
    "displayRoute": "344",
    "startPoint": "Kalyan Puri Terminal",
    "lastPoint": "Hauz Khas Terminal",
    "operator": "DTC"
  },
  "345": {
    "displayRoute": "345",
    "startPoint": "Rani Khera Depot III",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "CLSTR"
  },
  "347": {
    "displayRoute": "347",
    "startPoint": "Noida Sec-35-51",
    "lastPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "348": {
    "displayRoute": "348",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mayur Vihar Phase III (T) Paper Market",
    "operator": "DTC"
  },
  "349": {
    "displayRoute": "349",
    "startPoint": "Mayur Vihar Phase 2 Pkt C Metro Station",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "DTC"
  },
  "351": {
    "displayRoute": "351",
    "startPoint": "Super Bazar",
    "lastPoint": "Kalyanpuri Terminal",
    "operator": "Delhi Transport Corporation"
  },
  "352": {
    "displayRoute": "352",
    "startPoint": "Wazirpur JJ Colony",
    "lastPoint": "Shahdara Terminal",
    "operator": "DTC"
  },
  "353": {
    "displayRoute": "353",
    "startPoint": "Babarpur Ext Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "354": {
    "displayRoute": "354",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Inderlok Metro Station",
    "operator": "Delhi Transit"
  },
  "355": {
    "displayRoute": "355",
    "startPoint": "Noida Sector-32 Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "356": {
    "displayRoute": "356",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Mayur Vihar Phase III (T) Paper Market",
    "operator": "DTC"
  },
  "359": {
    "displayRoute": "359",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Mayur Vihar Phase III (T) Paper Market",
    "operator": "Delhi Transit"
  },
  "370": {
    "displayRoute": "370",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "374": {
    "displayRoute": "374",
    "startPoint": "Nehru Place",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "375": {
    "displayRoute": "375",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "A Block Dilshad Garden Bloomfield Public School",
    "operator": "Delhi Transit"
  },
  "378": {
    "displayRoute": "378",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "DTC"
  },
  "380": {
    "displayRoute": "380",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "operator": "Delhi Transit"
  },
  "390": {
    "displayRoute": "390",
    "startPoint": "Trilokpuri 13 Block",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "391": {
    "displayRoute": "391",
    "startPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "lastPoint": "Kalyan Puri",
    "operator": "DTC"
  },
  "392": {
    "displayRoute": "392",
    "startPoint": "Noida Sec-62 (Electronic City)",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "DTC"
  },
  "396": {
    "displayRoute": "396",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "New Seema Puri",
    "operator": "DTC"
  },
  "398": {
    "displayRoute": "398",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "DTC"
  },
  "400": {
    "displayRoute": "400",
    "startPoint": "Vivekanand Marg / Minto Road",
    "lastPoint": "Okhla Extension (Abul Fazl Encalve)",
    "operator": "DTC"
  },
  "402": {
    "displayRoute": "402",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "403": {
    "displayRoute": "403",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "404": {
    "displayRoute": "404",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Madan Pur Khadar Village",
    "operator": "DTC"
  },
  "405": {
    "displayRoute": "405",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "408": {
    "displayRoute": "408",
    "startPoint": "Raghubir Nagar F Block",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "DTC"
  },
  "410": {
    "displayRoute": "410",
    "startPoint": "Subhash Nagar Crossing / Mukherji Park",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "DTC"
  },
  "411": {
    "displayRoute": "411",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Lado Sarai Firni Road (T)",
    "operator": "DTC"
  },
  "412": {
    "displayRoute": "412",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "C-Block Yamuna Vihar / C4 YAMUNA VIHAR TERMINAL",
    "operator": "DTC"
  },
  "413": {
    "displayRoute": "413",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Mehrauli Terminal",
    "operator": "DTC"
  },
  "414": {
    "displayRoute": "414",
    "startPoint": "Nehru Place",
    "lastPoint": "Ring Road (near Gupta Market)",
    "operator": "Delhi Transport Corporation"
  },
  "416": {
    "displayRoute": "416",
    "startPoint": "Nehru Place",
    "lastPoint": "Ring Road (near Gupta Market)",
    "operator": "Delhi Transport Corporation"
  },
  "419": {
    "displayRoute": "419",
    "startPoint": "Lado Sarai",
    "lastPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "422": {
    "displayRoute": "422",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "423": {
    "displayRoute": "423",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Lado Sarai Firni Road (T)",
    "operator": "DTC"
  },
  "424": {
    "displayRoute": "424",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Institutional Area Vasant Kunj",
    "operator": "DTC"
  },
  "425": {
    "displayRoute": "425",
    "startPoint": "ISBT Kashmere Gate Terminal",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "427": {
    "displayRoute": "427",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Mehrauli Terminal",
    "operator": "DTC"
  },
  "428": {
    "displayRoute": "428",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Aya Nagar Terminal",
    "operator": "DTC"
  },
  "429": {
    "displayRoute": "429",
    "startPoint": "ISBT Kashmere Gate Terminal",
    "lastPoint": "Alaknanda Apartments",
    "operator": "DTC"
  },
  "430": {
    "displayRoute": "430",
    "startPoint": "New Delhi Post Office",
    "lastPoint": "Sant Nagar",
    "operator": "Delhi Transport Corporation"
  },
  "433": {
    "displayRoute": "433",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "434": {
    "displayRoute": "434",
    "startPoint": "Jasola Vihar",
    "lastPoint": "Bhati Mines (T)",
    "operator": "DTC"
  },
  "440": {
    "displayRoute": "440",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Lado Sarai Firni Road (T)",
    "operator": "DTC"
  },
  "442": {
    "displayRoute": "442",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Azadpur Metro Station",
    "operator": "DTC"
  },
  "443": {
    "displayRoute": "443",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "445": {
    "displayRoute": "445",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "DDA Flats KalkaJi",
    "operator": "DTC"
  },
  "447": {
    "displayRoute": "447",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Bhalaswa Crossing / Bhalaswa Golf Course",
    "operator": "DTC"
  },
  "448": {
    "displayRoute": "448",
    "startPoint": "Punjabi Bagh Crossing / PUNJABI BAGH",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "449": {
    "displayRoute": "449",
    "startPoint": "ISBT Kashmiri Gate",
    "lastPoint": "Ambedkar Nagar Sec 5 (T)",
    "operator": "DTC"
  },
  "450": {
    "displayRoute": "450",
    "startPoint": "Jal Vihar Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "456": {
    "displayRoute": "456",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "Delhi Transit"
  },
  "460": {
    "displayRoute": "460",
    "startPoint": "Vivekanand Marg / Minto Road",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "463": {
    "displayRoute": "463",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "Mehrauli Terminal",
    "operator": "DTC"
  },
  "465": {
    "displayRoute": "465",
    "startPoint": "Safdurjang Terminal",
    "lastPoint": "Madanpur Khadar JJ Colony",
    "operator": "DTC"
  },
  "469": {
    "displayRoute": "469",
    "startPoint": "Lado Sarai Firni Road (T)",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "473": {
    "displayRoute": "473",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "476": {
    "displayRoute": "476",
    "startPoint": "Peera Garhi Depot",
    "lastPoint": "Tikri Border Metro Station",
    "operator": "CLSTR"
  },
  "479": {
    "displayRoute": "479",
    "startPoint": "Punjabi Bagh Crossing / PUNJABI BAGH",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "480": {
    "displayRoute": "480",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "DDA Flats KalkaJi",
    "operator": "DTC"
  },
  "489": {
    "displayRoute": "489",
    "startPoint": "Daulat Pur Village",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "CLSTR"
  },
  "490": {
    "displayRoute": "490",
    "startPoint": "R Block Rajendra Nagar",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "492": {
    "displayRoute": "492",
    "startPoint": "Noida Sec-62 (Electronic City)",
    "lastPoint": "Nehru Place",
    "operator": "DTC"
  },
  "493": {
    "displayRoute": "493",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Mayur Vihar Phase-3 Church / Mayur Vihar Ph-III paper Market",
    "operator": "DTC"
  },
  "500": {
    "displayRoute": "500",
    "startPoint": "Saket J Block",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "DTC"
  },
  "501": {
    "displayRoute": "501",
    "startPoint": "The Mother's International School",
    "lastPoint": "Zammaya пещера бар",
    "operator": "Delhi Transport Corporation"
  },
  "502": {
    "displayRoute": "502",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Kashmere Gate City Bus Terminal",
    "operator": "DTC"
  },
  "505": {
    "displayRoute": "505",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "N.D. Rly. Station Gate No. 2 / Ajmeri Gate",
    "operator": "DTC"
  },
  "507": {
    "displayRoute": "507",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "DTC"
  },
  "511": {
    "displayRoute": "511",
    "startPoint": "Dhaula Kuan ARSD College",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "512": {
    "displayRoute": "512",
    "startPoint": "R K PURAM SEC1 2",
    "lastPoint": "Ambedkar Nagar Sec-4 / Virat Cinema Crossing",
    "operator": "DTC"
  },
  "514": {
    "displayRoute": "514",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Rohini Sec1 Avantika",
    "operator": "MATCH"
  },
  "516": {
    "displayRoute": "516",
    "startPoint": "dera village",
    "lastPoint": "Safdurjung Terminal",
    "operator": "DTC"
  },
  "517": {
    "displayRoute": "517",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Aya Nagar Terminal",
    "operator": "DTC"
  },
  "518": {
    "displayRoute": "518",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "519": {
    "displayRoute": "519",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Mandi Village",
    "operator": "DTC"
  },
  "521": {
    "displayRoute": "521",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Ambedkar Nagar Sec-4 / Virat Cinema Crossing",
    "operator": "DTC"
  },
  "522": {
    "displayRoute": "522",
    "startPoint": "Lado Sarai Firni Road (T)",
    "lastPoint": "Inderpuri Krishi Kunj (T)",
    "operator": "DTC"
  },
  "523": {
    "displayRoute": "523",
    "startPoint": "Dhaula Kuan (Ring Road)",
    "lastPoint": "Bhati Mines (T)",
    "operator": "DTC"
  },
  "525": {
    "displayRoute": "525",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Aya Nagar Terminal",
    "operator": "DTC"
  },
  "529": {
    "displayRoute": "529",
    "startPoint": "Sayed Gaon Nangloi (T)",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "534": {
    "displayRoute": "534",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "536": {
    "displayRoute": "536",
    "startPoint": "R K PURAM SEC1 2",
    "lastPoint": "Chhatarpur Extension",
    "operator": "DTC"
  },
  "539": {
    "displayRoute": "539",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Mehrauli Terminal",
    "operator": "Delhi Transit"
  },
  "540": {
    "displayRoute": "540",
    "startPoint": "Tara Apartments Terminal",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "DTC"
  },
  "543": {
    "displayRoute": "543",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "DTC"
  },
  "544": {
    "displayRoute": "544",
    "startPoint": "RK Puram Sec1",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "545": {
    "displayRoute": "545",
    "startPoint": "Delhi Development Authority Flats Munirka/Family Planning Association of India",
    "lastPoint": "Sangam Cinema",
    "operator": "Delhi Transport Corporation"
  },
  "546": {
    "displayRoute": "546",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "Delhi Transit"
  },
  "547": {
    "displayRoute": "547",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "548": {
    "displayRoute": "548",
    "startPoint": "Minto Road Terminal",
    "lastPoint": "Hamdard Nagar",
    "operator": "Delhi Transport Corporation"
  },
  "549": {
    "displayRoute": "549",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "567": {
    "displayRoute": "567",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "DTC"
  },
  "568": {
    "displayRoute": "568",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "QBlock Mangolpuri",
    "operator": "DTC"
  },
  "569": {
    "displayRoute": "569",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Safdurjung Terminal",
    "operator": "Delhi Transit"
  },
  "578": {
    "displayRoute": "578",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Najafgarh Terminal",
    "operator": "DTC"
  },
  "580": {
    "displayRoute": "580",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Ambedkar Nagar Sec 5 (T)",
    "operator": "DTC"
  },
  "584": {
    "displayRoute": "584",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Q-Block Mangolpuri",
    "operator": "CLSTR"
  },
  "585": {
    "displayRoute": "585",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "ISBT Kashmere Gate Terminal",
    "operator": "CLSTR"
  },
  "588": {
    "displayRoute": "588",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "operator": "Delhi Transit"
  },
  "597": {
    "displayRoute": "597",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Nehru Place Terminal",
    "operator": "CLSTR"
  },
  "598": {
    "displayRoute": "598",
    "startPoint": "Nehru Bus Stand Goyla Dairy",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "604": {
    "displayRoute": "604",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Chhatarpur Metro Station",
    "operator": "DTC"
  },
  "605": {
    "displayRoute": "605",
    "startPoint": "Old Police Station / C-8 Vasant Kunj",
    "lastPoint": "Mori Gate Terminal",
    "operator": "Delhi Transit"
  },
  "606": {
    "displayRoute": "606",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "MATCH"
  },
  "610": {
    "displayRoute": "610",
    "startPoint": "Wazirpur Depot",
    "lastPoint": "RK Puram Sec 1",
    "operator": "DTC"
  },
  "611": {
    "displayRoute": "611",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "DTC"
  },
  "615": {
    "displayRoute": "615",
    "startPoint": "Poorvanchal Hostel (T)",
    "lastPoint": "Vivekanand Marg / Minto Road",
    "operator": "DTC"
  },
  "616": {
    "displayRoute": "616",
    "startPoint": "C 4 Yamuna Vihar",
    "lastPoint": "Kendriya Terminal (Church Road)",
    "operator": "CLSTR"
  },
  "619": {
    "displayRoute": "619",
    "startPoint": "Karawal Nagar Terminal",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "CLSTR"
  },
  "620": {
    "displayRoute": "620",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Hauz Khas",
    "operator": "DTC"
  },
  "621": {
    "displayRoute": "621",
    "startPoint": "Poorvanchal Hostel (T)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "623": {
    "displayRoute": "623",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Nangal Dewat",
    "operator": "DTC"
  },
  "625": {
    "displayRoute": "625",
    "startPoint": "Daulat Pur Village",
    "lastPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "operator": "CLSTR"
  },
  "627": {
    "displayRoute": "627",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "West Enclave / Sansad Vihar (T)",
    "operator": "CLSTR"
  },
  "628": {
    "displayRoute": "628",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Safdurjung Terminal",
    "operator": "Delhi Transit"
  },
  "630": {
    "displayRoute": "630",
    "startPoint": "NANAK PURA GURUDWARA MOTI BAGH",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "DTC"
  },
  "638": {
    "displayRoute": "638",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "CLSTR"
  },
  "641": {
    "displayRoute": "641",
    "startPoint": "China Embassy",
    "lastPoint": "Chanakyapuri Police Station",
    "operator": "Delhi Transport Corporation"
  },
  "642": {
    "displayRoute": "642",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Malik Pur Village",
    "operator": "MATCH"
  },
  "654": {
    "displayRoute": "654",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "DWARKA MOR",
    "operator": "MATCH"
  },
  "655": {
    "displayRoute": "655",
    "startPoint": "BBM Cluster Depot",
    "lastPoint": "C 4 Yamuna Vihar",
    "operator": "CLSTR"
  },
  "656": {
    "displayRoute": "656",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Kalyan Puri Terminal",
    "operator": "CLSTR"
  },
  "673": {
    "displayRoute": "673",
    "startPoint": "Bawana Sec 1 Cluster Depot",
    "lastPoint": "Tikri Khurd",
    "operator": "CLSTR"
  },
  "679": {
    "displayRoute": "679",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "DWARKA MOR",
    "operator": "MATCH"
  },
  "680": {
    "displayRoute": "680",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Ambedkar Nagar Sec-4 / Virat Cinema Crossing",
    "operator": "DTC"
  },
  "701": {
    "displayRoute": "701",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "702": {
    "displayRoute": "702",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Lajpat Nagar Ring Road / VINOBA PURI METRO STATAION",
    "operator": "DTC"
  },
  "703": {
    "displayRoute": "703",
    "startPoint": "Uttam Nagar Terminal (In Gate)",
    "lastPoint": "Jheel Terminal",
    "operator": "DTC"
  },
  "706": {
    "displayRoute": "706",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "Delhi Transit"
  },
  "708": {
    "displayRoute": "708",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "709": {
    "displayRoute": "709",
    "startPoint": "Mangolpuri DDA Market / Mangol Puri S Block",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "Delhi Transit"
  },
  "711": {
    "displayRoute": "711",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "DTC"
  },
  "712": {
    "displayRoute": "712",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "Delhi Transit"
  },
  "713": {
    "displayRoute": "713",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Daraula Border",
    "operator": "MATCH"
  },
  "715": {
    "displayRoute": "715",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Madhu Vihar",
    "operator": "DTC"
  },
  "716": {
    "displayRoute": "716",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Dhool Siras",
    "operator": "DTC"
  },
  "717": {
    "displayRoute": "717",
    "startPoint": "Shahbad Mohammad Pur",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "718": {
    "displayRoute": "718",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Kapashera Border",
    "operator": "DTC"
  },
  "719": {
    "displayRoute": "719",
    "startPoint": "Sunehari Pulla Depot",
    "lastPoint": "Pandwala Khurd",
    "operator": "Delhi Transit"
  },
  "720": {
    "displayRoute": "720",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "B-1 Janak Puri",
    "operator": "DTC"
  },
  "721": {
    "displayRoute": "721",
    "startPoint": "Manglapuri / Palam Village",
    "lastPoint": "ISBT Bridge",
    "operator": "DTC"
  },
  "722": {
    "displayRoute": "722",
    "startPoint": "Nanak Heri Border",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "723": {
    "displayRoute": "723",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "724": {
    "displayRoute": "724",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "725": {
    "displayRoute": "725",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Inder Puri JJ Colony",
    "operator": "DTC"
  },
  "727": {
    "displayRoute": "727",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "729": {
    "displayRoute": "729",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "DTC"
  },
  "738": {
    "displayRoute": "738",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Indraprastha Cluster Depot",
    "operator": "CLSTR"
  },
  "739": {
    "displayRoute": "739",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "operator": "MATCH"
  },
  "740": {
    "displayRoute": "740",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "741": {
    "displayRoute": "741",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "Jonti Village",
    "operator": "Delhi Transit"
  },
  "742": {
    "displayRoute": "742",
    "startPoint": "Inder Puri JJ Colony",
    "lastPoint": "Jheel Terminal",
    "operator": "CLSTR"
  },
  "743": {
    "displayRoute": "743",
    "startPoint": "Lajpat Nagar",
    "lastPoint": "Ramakrishna Puram Sector 9",
    "operator": "Delhi Transport Corporation"
  },
  "745": {
    "displayRoute": "745",
    "startPoint": "Sunehari Pulla Depot",
    "lastPoint": "Daulat Pur Village / DaulatPur",
    "operator": "Delhi Transit"
  },
  "746": {
    "displayRoute": "746",
    "startPoint": "Uttam Nagar",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "CLSTR"
  },
  "750": {
    "displayRoute": "750",
    "startPoint": "Rani Khera Depot II",
    "lastPoint": "Q Block Mangolpuri",
    "operator": "CLSTR"
  },
  "751": {
    "displayRoute": "751",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "Kamla Market / Ajmeri Gate / N.D RLY STATION GATE NO-2",
    "operator": "Delhi Transit"
  },
  "752": {
    "displayRoute": "752",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "BAMNOLI VILLAGE",
    "operator": "DTC"
  },
  "753": {
    "displayRoute": "753",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "760": {
    "displayRoute": "760",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "Kendriya Terminal (Church Road)",
    "operator": "CLSTR"
  },
  "761": {
    "displayRoute": "761",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "763": {
    "displayRoute": "763",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "764": {
    "displayRoute": "764",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Jharoda Kalan Border (Satyam Puram)",
    "operator": "DTC"
  },
  "765": {
    "displayRoute": "765",
    "startPoint": "Loknayak Puram / Bakkarwala",
    "lastPoint": "Hauz Khas Terminal",
    "operator": "DTC"
  },
  "770": {
    "displayRoute": "770",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Delhi Secretariat",
    "operator": "DTC"
  },
  "772": {
    "displayRoute": "772",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "Delhi Transit"
  },
  "773": {
    "displayRoute": "773",
    "startPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "lastPoint": "Bharthal Village (Shyam Mandir)",
    "operator": "Delhi Transit"
  },
  "774": {
    "displayRoute": "774",
    "startPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "775": {
    "displayRoute": "775",
    "startPoint": "Dilshad Garden Depot Cluster",
    "lastPoint": "Munirka Village (T)",
    "operator": "CLSTR"
  },
  "776": {
    "displayRoute": "776",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "operator": "Delhi Transit"
  },
  "778": {
    "displayRoute": "778",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Inderlok Metro Station",
    "operator": "DTC"
  },
  "780": {
    "displayRoute": "780",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "Delhi Transit"
  },
  "781": {
    "displayRoute": "781",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Dwarka Sec 16C/GGS IP University",
    "operator": "Delhi Transit"
  },
  "782": {
    "displayRoute": "782",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "DWARKA MOR",
    "operator": "MATCH"
  },
  "783": {
    "displayRoute": "783",
    "startPoint": "Dhansa Bus Stand / Dhansa Bus Stand Metro Station",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "784": {
    "displayRoute": "784",
    "startPoint": "Gokul Puri Terminal",
    "lastPoint": "Ajmeri Gate / Kamla Market",
    "operator": "Delhi Transit"
  },
  "788": {
    "displayRoute": "788",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Nanak Heri Village",
    "operator": "CLSTR"
  },
  "790": {
    "displayRoute": "790",
    "startPoint": "Kapashera Border",
    "lastPoint": "Bhartiya Sadhu Samaj",
    "operator": "Delhi Transport Corporation"
  },
  "792": {
    "displayRoute": "792",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Bharthal Village (Shyam Mandir)",
    "operator": "Delhi Transit"
  },
  "793": {
    "displayRoute": "793",
    "startPoint": "H3 Vikas Puri Terminal",
    "lastPoint": "Delhi Sectt Gate No 7 (End)",
    "operator": "DTC"
  },
  "794": {
    "displayRoute": "794",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "DTC"
  },
  "796": {
    "displayRoute": "796",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Samaspur Khalsa",
    "operator": "CLSTR"
  },
  "798": {
    "displayRoute": "798",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "CPWD Colony Vasant Vihar",
    "operator": "CLSTR"
  },
  "801": {
    "displayRoute": "801",
    "startPoint": "Kapashera Border",
    "lastPoint": "Inderlok Metro Station",
    "operator": "DTC"
  },
  "803": {
    "displayRoute": "803",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Dwarka Sec-2 Depot",
    "operator": "DTC"
  },
  "804": {
    "displayRoute": "804",
    "startPoint": "Kapashera Border",
    "lastPoint": "E Block Jahangir Puri Terminal",
    "operator": "DTC"
  },
  "806": {
    "displayRoute": "806",
    "startPoint": "Paprawat Village",
    "lastPoint": "Karampura Terminal",
    "operator": "Delhi Transit"
  },
  "808": {
    "displayRoute": "808",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "QBlock Mangolpuri",
    "operator": "DTC"
  },
  "809": {
    "displayRoute": "809",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Neelwal Village",
    "operator": "DTC"
  },
  "810": {
    "displayRoute": "810",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "811": {
    "displayRoute": "811",
    "startPoint": "Rewla Khanpur Village",
    "lastPoint": "Tilak Nagar Terminal",
    "operator": "CLSTR"
  },
  "813": {
    "displayRoute": "813",
    "startPoint": "Manglapuri / Palam Village",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "DTC"
  },
  "816": {
    "displayRoute": "816",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "817": {
    "displayRoute": "817",
    "startPoint": "Kair Village",
    "lastPoint": "Inderlok Metro Station",
    "operator": "Delhi Transit"
  },
  "818": {
    "displayRoute": "818",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Jhatikra Village",
    "operator": "DTC"
  },
  "819": {
    "displayRoute": "819",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Pandwala Kalan (T)",
    "operator": "Delhi Transit"
  },
  "821": {
    "displayRoute": "821",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Jaffar Pur Kalan",
    "operator": "DTC"
  },
  "822": {
    "displayRoute": "822",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Issapur Village Temple",
    "operator": "Delhi Transit"
  },
  "824": {
    "displayRoute": "824",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Kair Village",
    "operator": "Delhi Transit"
  },
  "825": {
    "displayRoute": "825",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Satyapuram Jharoda",
    "operator": "DTC"
  },
  "826": {
    "displayRoute": "826",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Khera Dabar Village",
    "operator": "DTC"
  },
  "827": {
    "displayRoute": "827",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Dauralla Border",
    "operator": "DTC"
  },
  "828": {
    "displayRoute": "828",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Galib Pur Village",
    "operator": "Delhi Transit"
  },
  "829": {
    "displayRoute": "829",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Shikar Pur Village",
    "operator": "DTC"
  },
  "831": {
    "displayRoute": "831",
    "startPoint": "Surakh Pur Village",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "CLSTR"
  },
  "832": {
    "displayRoute": "832",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "D Block Janak Puri",
    "operator": "DTC"
  },
  "834": {
    "displayRoute": "834",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Nanak Heri Village",
    "operator": "DTC"
  },
  "835": {
    "displayRoute": "835",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Dhansa Border (T)",
    "operator": "DTC"
  },
  "836": {
    "displayRoute": "836",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Mundhela Khurd Village",
    "operator": "Delhi Transit"
  },
  "837": {
    "displayRoute": "837",
    "startPoint": "Shaheed Bhagat Singh Colony Karawal Nagar",
    "lastPoint": "BBM Cluster Depot",
    "operator": "CLSTR"
  },
  "838": {
    "displayRoute": "838",
    "startPoint": "Uttam Nagar Terminal (In Gate)",
    "lastPoint": "ISBT Kashmere Gate Terminal",
    "operator": "Delhi Transit"
  },
  "839": {
    "displayRoute": "839",
    "startPoint": "BBM Cluster Depot",
    "lastPoint": "Mori Gate Terminal",
    "operator": "CLSTR"
  },
  "840": {
    "displayRoute": "840",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "DTC"
  },
  "842": {
    "displayRoute": "842",
    "startPoint": "Raghubir Nagar F Block",
    "lastPoint": "ISBT Bridge",
    "operator": "DTC"
  },
  "844": {
    "displayRoute": "844",
    "startPoint": "Sarang Pur Village",
    "lastPoint": "Najafgarh Terminal",
    "operator": "Delhi Transit"
  },
  "845": {
    "displayRoute": "845",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Daulat Pur Village / DaulatPur",
    "operator": "DTC"
  },
  "847": {
    "displayRoute": "847",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Dilshad Garden Depot Cluster",
    "operator": "Delhi Transit"
  },
  "848": {
    "displayRoute": "848",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Bakkargarh Border",
    "operator": "DTC"
  },
  "849": {
    "displayRoute": "849",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "Delhi Transit"
  },
  "850": {
    "displayRoute": "850",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "857": {
    "displayRoute": "857",
    "startPoint": "Raghubir Nagar F Block",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "858": {
    "displayRoute": "858",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Ajmeri Gate / Kamla Market",
    "operator": "Delhi Transit"
  },
  "859": {
    "displayRoute": "859",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Najafgarh Terminal",
    "operator": "Delhi Transit"
  },
  "861": {
    "displayRoute": "861",
    "startPoint": "Tilak Nagar Terminal / Tilak Nagar",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "Delhi Transit"
  },
  "864": {
    "displayRoute": "864",
    "startPoint": "South Moti Bagh",
    "lastPoint": "Sector - 9, Rama Krishna Puram",
    "operator": "Delhi Transport Corporation"
  },
  "865": {
    "displayRoute": "865",
    "startPoint": "Lady Sriram College",
    "lastPoint": "Sector - 9, Rama Krishna Puram",
    "operator": "Delhi Transport Corporation"
  },
  "869": {
    "displayRoute": "869",
    "startPoint": "Babarpur Ext Maujpur Crossing",
    "lastPoint": "Okhla Extension (Abul Fazl Encalve)",
    "operator": "CLSTR"
  },
  "871": {
    "displayRoute": "871",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "H3 Vikas Puri Terminal",
    "operator": "Delhi Transit"
  },
  "872": {
    "displayRoute": "872",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Surakh Pur Village",
    "operator": "Delhi Transit"
  },
  "873": {
    "displayRoute": "873",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "Taj Pur Khurd",
    "operator": "DTC"
  },
  "874": {
    "displayRoute": "874",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "876": {
    "displayRoute": "876",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Dichau Village",
    "operator": "DTC"
  },
  "877": {
    "displayRoute": "877",
    "startPoint": "Kalyan Puri Terminal",
    "lastPoint": "Kamla Market / Ajmeri Gate",
    "operator": "CLSTR"
  },
  "879": {
    "displayRoute": "879",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "D Block Janak Puri",
    "operator": "DTC"
  },
  "883": {
    "displayRoute": "883",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Kashmere Gate City Bus Terminal",
    "operator": "DTC"
  },
  "885": {
    "displayRoute": "885",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Rewla Khanpur Village",
    "operator": "Delhi Transit"
  },
  "886": {
    "displayRoute": "886",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Mehrauli Terminal",
    "operator": "Delhi Transit"
  },
  "887": {
    "displayRoute": "887",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Ghuman Hera Village Main Road / Ghumanhera school",
    "operator": "DTC"
  },
  "889": {
    "displayRoute": "889",
    "startPoint": "Rohini Sec-27 Temple",
    "lastPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "operator": "DTC"
  },
  "890": {
    "displayRoute": "890",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Hastsal Village LIG Flats",
    "operator": "Delhi Transit"
  },
  "891": {
    "displayRoute": "891",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "892": {
    "displayRoute": "892",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Khera Village 2 / Khera School",
    "operator": "Delhi Transit"
  },
  "893": {
    "displayRoute": "893",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "894": {
    "displayRoute": "894",
    "startPoint": "Okhla Village",
    "lastPoint": "Karampura Terminal",
    "operator": "DTC"
  },
  "897": {
    "displayRoute": "897",
    "startPoint": "ARSD College / Dhaula Kuan",
    "lastPoint": "Bhajan Pura",
    "operator": "CLSTR"
  },
  "899": {
    "displayRoute": "899",
    "startPoint": "Kendriya Terminal / Gurudwara Rakab Gunj",
    "lastPoint": "Madhu Vihar",
    "operator": "CLSTR"
  },
  "901": {
    "displayRoute": "901",
    "startPoint": "PS Kamla Market / Vivekanand Marg Crossing",
    "lastPoint": "Mangolpuri Y Block / Mangol Puri D Block",
    "operator": "DTC"
  },
  "905": {
    "displayRoute": "905",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "906": {
    "displayRoute": "906",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "DTC"
  },
  "907": {
    "displayRoute": "907",
    "startPoint": "Nilothi Village",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "908": {
    "displayRoute": "908",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Karampura Terminal",
    "operator": "DTC"
  },
  "910": {
    "displayRoute": "910",
    "startPoint": "Sayed Gaon Nangloi (T)",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "DTC"
  },
  "911": {
    "displayRoute": "911",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "DTC"
  },
  "912": {
    "displayRoute": "912",
    "startPoint": "VISHNU GARDEN NW CHOWK",
    "lastPoint": "Natthupura Terminal",
    "operator": "DTC"
  },
  "913": {
    "displayRoute": "913",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Karawal Nagar Terminal",
    "operator": "DTC"
  },
  "915": {
    "displayRoute": "915",
    "startPoint": "Majra Dabas Village",
    "lastPoint": "Karampura",
    "operator": "DTC"
  },
  "917": {
    "displayRoute": "917",
    "startPoint": "Madipur JJ Colony Terminal",
    "lastPoint": "Delhi Sectt Gate No 7 (Start)",
    "operator": "DTC"
  },
  "918": {
    "displayRoute": "918",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Delhi Secretariat",
    "operator": "DTC"
  },
  "919": {
    "displayRoute": "919",
    "startPoint": "D Block Mangol Puri (T)",
    "lastPoint": "Bawana JJ Colony Terminal",
    "operator": "Delhi Transit"
  },
  "921": {
    "displayRoute": "921",
    "startPoint": "Rani Khera School / Bhagya Vihar",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "DTC"
  },
  "922": {
    "displayRoute": "922",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Najafgarh Terminal",
    "operator": "DTC"
  },
  "923": {
    "displayRoute": "923",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "924": {
    "displayRoute": "924",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Majra Dabas Village",
    "operator": "DTC"
  },
  "925": {
    "displayRoute": "925",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Nilothi Village",
    "operator": "DTC"
  },
  "926": {
    "displayRoute": "926",
    "startPoint": "Tikri Border",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "928": {
    "displayRoute": "928",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Garhi Randhala Village",
    "operator": "DTC"
  },
  "929": {
    "displayRoute": "929",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Mubarakpur Dabas Village",
    "operator": "Delhi Transit"
  },
  "930": {
    "displayRoute": "930",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "931": {
    "displayRoute": "931",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Bakkarwala Village",
    "operator": "DTC"
  },
  "932": {
    "displayRoute": "932",
    "startPoint": "Mangol Puri Y Block",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "934": {
    "displayRoute": "934",
    "startPoint": "Primary School Neelwal",
    "lastPoint": "Karampura Terminal",
    "operator": "DTC"
  },
  "935": {
    "displayRoute": "935",
    "startPoint": "Majra Dabas Village",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "939": {
    "displayRoute": "939",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "D Block Mangolpuri",
    "operator": "DTC"
  },
  "940": {
    "displayRoute": "940",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "QBlock Mangolpuri",
    "operator": "DTC"
  },
  "941": {
    "displayRoute": "941",
    "startPoint": "Katewara Village",
    "lastPoint": "Karampura Terminal",
    "operator": "DTC"
  },
  "942": {
    "displayRoute": "942",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Kair Village",
    "operator": "Delhi Transit"
  },
  "943": {
    "displayRoute": "943",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "944": {
    "displayRoute": "944",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "945": {
    "displayRoute": "945",
    "startPoint": "QBlock Mangolpuri",
    "lastPoint": "Keshav Nagar Mukti Ashram",
    "operator": "DTC"
  },
  "946": {
    "displayRoute": "946",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "947": {
    "displayRoute": "947",
    "startPoint": "Savda JJ Colony",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "DTC"
  },
  "948": {
    "displayRoute": "948",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Kanjhawala Chowk",
    "operator": "DTC"
  },
  "949": {
    "displayRoute": "949",
    "startPoint": "Tikri Border",
    "lastPoint": "Delhi Secretariat",
    "operator": "DTC"
  },
  "950": {
    "displayRoute": "950",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "operator": "DTC"
  },
  "951": {
    "displayRoute": "951",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Ajmeri Gate / Kamla Market",
    "operator": "DTC"
  },
  "953": {
    "displayRoute": "953",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "Kamala Market / Ajmeri Gate",
    "operator": "DTC"
  },
  "954": {
    "displayRoute": "954",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "955": {
    "displayRoute": "955",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "CLSTR"
  },
  "956": {
    "displayRoute": "956",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Ekta Apartment Paschim Vihar",
    "operator": "Delhi Transit"
  },
  "957": {
    "displayRoute": "957",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "ROHINI SEC 22 POCKET 7",
    "operator": "DTC"
  },
  "961": {
    "displayRoute": "961",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Jharoda Crossing / Najafgarh",
    "operator": "Delhi Transit"
  },
  "962": {
    "displayRoute": "962",
    "startPoint": "Kanjhawala Village (T)",
    "lastPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "operator": "Delhi Transit"
  },
  "963": {
    "displayRoute": "963",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "BAKARWALA JJ Colony",
    "operator": "DTC"
  },
  "964": {
    "displayRoute": "964",
    "startPoint": "Sraswati Vihar Water Tank",
    "lastPoint": "Nehru Place",
    "operator": "DTC"
  },
  "966": {
    "displayRoute": "966",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "DTC"
  },
  "968": {
    "displayRoute": "968",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "Dhansa Border (T)",
    "operator": "DTC"
  },
  "970": {
    "displayRoute": "970",
    "startPoint": "Sunehari Pulla Depot",
    "lastPoint": "Rohini Sectocr -1 Avantika",
    "operator": "DTC"
  },
  "971": {
    "displayRoute": "971",
    "startPoint": "Rohini Sec1 Avantika",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "DTC"
  },
  "972": {
    "displayRoute": "972",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Harewali Village (T)",
    "operator": "DTC"
  },
  "973": {
    "displayRoute": "973",
    "startPoint": "Nangloi Metro Station",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "974": {
    "displayRoute": "974",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "975": {
    "displayRoute": "975",
    "startPoint": "ROHINI SEC-11 EXTN SFS FLTS",
    "lastPoint": "Kendriya Terminal (Church Road)",
    "operator": "DTC"
  },
  "976": {
    "displayRoute": "976",
    "startPoint": "Nithari Village",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "978": {
    "displayRoute": "978",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "979": {
    "displayRoute": "979",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Nangloi Metro Station",
    "operator": "Delhi Transit"
  },
  "980": {
    "displayRoute": "980",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "Delhi Transit"
  },
  "981": {
    "displayRoute": "981",
    "startPoint": "Tikri Border M Stn (T)",
    "lastPoint": "Singhu Border Ramdev Marg",
    "operator": "Delhi Transit"
  },
  "982": {
    "displayRoute": "982",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "New Seema Puri",
    "operator": "DTC"
  },
  "983": {
    "displayRoute": "983",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Harewali Village (T)",
    "operator": "DTC"
  },
  "984": {
    "displayRoute": "984",
    "startPoint": "South Moti Bagh",
    "lastPoint": "Satya Niketan",
    "operator": "Delhi Transport Corporation"
  },
  "988": {
    "displayRoute": "988",
    "startPoint": "Regal / Palika Kendra",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "DTC"
  },
  "989": {
    "displayRoute": "989",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "Delhi Transit"
  },
  "990": {
    "displayRoute": "990",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Rithala Village / Vijay Vihar",
    "operator": "DTC"
  },
  "991": {
    "displayRoute": "991",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Mubarakpur Dabas Village",
    "operator": "Delhi Transit"
  },
  "992": {
    "displayRoute": "992",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "993": {
    "displayRoute": "993",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "998": {
    "displayRoute": "998",
    "startPoint": "Raghubir Nagar F Block",
    "lastPoint": "Loknayak Puram / Bakkarwala",
    "operator": "Delhi Transit"
  },
  "1003": {
    "displayRoute": "1003",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Babar Pur Ext Terminal",
    "operator": "CLSTR"
  },
  "1005": {
    "displayRoute": "1005",
    "startPoint": "YMCA / Palika Kendra",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "CLSTR"
  },
  "1010": {
    "displayRoute": "1010",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "CLSTR"
  },
  "1011": {
    "displayRoute": "817",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "Kair Village",
    "operator": "MATCH"
  },
  "1041": {
    "displayRoute": "1041",
    "startPoint": "Harsh Vihar Terminal",
    "lastPoint": "New Seema Puri Depot Cluster",
    "operator": "CLSTR"
  },
  "1061": {
    "displayRoute": "1061",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "MATCH"
  },
  "1064": {
    "displayRoute": "D-6602",
    "startPoint": "Jankpuri South DabriMor Metro Station",
    "lastPoint": "Ramesh nagar / Basai Darapur / Ramesh Nagar Metro Station",
    "operator": "MATCH"
  },
  "1067": {
    "displayRoute": "1067",
    "startPoint": "Nangloi Metro Station",
    "lastPoint": "Bawana Village Chowk",
    "operator": "CLSTR"
  },
  "1070": {
    "displayRoute": "606",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "CLSTR"
  },
  "1088": {
    "displayRoute": "1088",
    "startPoint": "Tikri Border Metro Station",
    "lastPoint": "Old Delhi Railway Station (Terminal)",
    "operator": "CLSTR"
  },
  "1089": {
    "displayRoute": "100",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "1090": {
    "displayRoute": "113",
    "startPoint": "Ghoga Village",
    "lastPoint": "Azadpur Terminal",
    "operator": "CLSTR"
  },
  "1115": {
    "displayRoute": "1115",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "1124": {
    "displayRoute": "1124",
    "startPoint": "Rohini Sec 23 (Green Hill Aptt.)",
    "lastPoint": "Karampura Terminal",
    "operator": "MATCH"
  },
  "1144": {
    "displayRoute": "1144",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Ramdev Chowk / Pitori Johad",
    "operator": "CLSTR"
  },
  "1149": {
    "displayRoute": "1149",
    "startPoint": "Old Delhi Railway Station (Terminal)",
    "lastPoint": "Ghoga Village",
    "operator": "MATCH"
  },
  "1151": {
    "displayRoute": "251",
    "startPoint": "Rithala Village",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "CLSTR"
  },
  "1153": {
    "displayRoute": "1153",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Jharoda Village (Burari)",
    "operator": "CLSTR"
  },
  "1154": {
    "displayRoute": "606",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "MATCH"
  },
  "1158": {
    "displayRoute": "1158",
    "startPoint": "Badli Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "CLSTR"
  },
  "1176": {
    "displayRoute": "1176",
    "startPoint": "Tara Apartments Terminal",
    "lastPoint": "Kendriya Terminal (Church Road)",
    "operator": "CLSTR"
  },
  "1180": {
    "displayRoute": "708",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "CLSTR"
  },
  "1183": {
    "displayRoute": "113",
    "startPoint": "Sannoth Village",
    "lastPoint": "Bawana Sec 1 Cluster Depot",
    "operator": "CLSTR"
  },
  "1206": {
    "displayRoute": "137",
    "startPoint": "Holambi Kalan Terminal",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "CLSTR"
  },
  "1219": {
    "displayRoute": "1219",
    "startPoint": "OKHLA DEPOT",
    "lastPoint": "Jasola Vihar",
    "operator": "CLSTR"
  },
  "1233": {
    "displayRoute": "1233",
    "startPoint": "Tikri Border Metro Station",
    "lastPoint": "Old Delhi Railway Station (Terminal)",
    "operator": "MATCH"
  },
  "1234": {
    "displayRoute": "172",
    "startPoint": "Holambi Khurd",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "1241": {
    "displayRoute": "836",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Tikri Border Metro Station",
    "operator": "CLSTR"
  },
  "1244": {
    "displayRoute": "1244",
    "startPoint": "Jonti Border",
    "lastPoint": "Rani Khera Depot III",
    "operator": "CLSTR"
  },
  "1245": {
    "displayRoute": "1245",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "New Seema Puri Depot Cluster",
    "operator": "CLSTR"
  },
  "1249": {
    "displayRoute": "887",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Ghuman Hera Village",
    "operator": "CLSTR"
  },
  "1250": {
    "displayRoute": "708",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "1266": {
    "displayRoute": "606",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "MATCH"
  },
  "1280": {
    "displayRoute": "913",
    "startPoint": "Karawal Nagar Terminal",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "CLSTR"
  },
  "1285": {
    "displayRoute": "891",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "operator": "CLSTR"
  },
  "1288": {
    "displayRoute": "1288",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Auchandi Border",
    "operator": "CLSTR"
  },
  "1303": {
    "displayRoute": "1303",
    "startPoint": "Ajmeri Gate / Kamla Market",
    "lastPoint": "Trilok Puri 27 Block Terminal",
    "operator": "CLSTR"
  },
  "1309": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "1313": {
    "displayRoute": "719",
    "startPoint": "Pandwala Kalan (T)",
    "lastPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "operator": "CLSTR"
  },
  "1314": {
    "displayRoute": "728E",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Kair Depot",
    "operator": "CLSTR"
  },
  "1317": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "1319": {
    "displayRoute": "1319",
    "startPoint": "Satyapuram Jharoda",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "CLSTR"
  },
  "1320": {
    "displayRoute": "D-014",
    "startPoint": "Ambedkar Nagar Sec 5 (T)",
    "lastPoint": "Lajpat Nagar (Ring Road)",
    "operator": "MATCH"
  },
  "1321": {
    "displayRoute": "522",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "1324": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "1326": {
    "displayRoute": "792",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Bharthal Village",
    "operator": "CLSTR"
  },
  "1327": {
    "displayRoute": "390",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Trilok Puri 13 Block",
    "operator": "CLSTR"
  },
  "1328": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "1332": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "1336": {
    "displayRoute": "1336",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "BBM Cluster Depot",
    "operator": "CLSTR"
  },
  "1338": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "1340": {
    "displayRoute": "836LNK",
    "startPoint": "Mundhela Khurd Village",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "CLSTR"
  },
  "1341": {
    "displayRoute": "886",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Mehrauli Terminal",
    "operator": "CLSTR"
  },
  "1344": {
    "displayRoute": "523A",
    "startPoint": "Dhaula Kuan ARSD College",
    "lastPoint": "Chhatarpur Ext / Nanda Hospital",
    "operator": "CLSTR"
  },
  "1346": {
    "displayRoute": "893",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "1347": {
    "displayRoute": "1347",
    "startPoint": "Tara Apartments Terminal",
    "lastPoint": "South Extension",
    "operator": "CLSTR"
  },
  "1349": {
    "displayRoute": "1349",
    "startPoint": "Bawana Sec 5 Cluster Depot",
    "lastPoint": "Sultanpuri Terminal",
    "operator": "CLSTR"
  },
  "1350": {
    "displayRoute": "1350",
    "startPoint": "Tehkhand Depot DTC",
    "lastPoint": "Inder Puri JJ Colony",
    "operator": "MATCH"
  },
  "1351": {
    "displayRoute": "1351",
    "startPoint": "Inderpuri A-Block",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "MATCH"
  },
  "1353": {
    "displayRoute": "U-SPL-25",
    "startPoint": "C9 Vasant Kunj",
    "lastPoint": "Delhi University / North Campus",
    "operator": "MATCH"
  },
  "1357": {
    "displayRoute": "1357",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Indraprastha Cluster Depot",
    "operator": "CLSTR"
  },
  "1367": {
    "displayRoute": "1367",
    "startPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "lastPoint": "Ramdev Chowk Narela Terminal",
    "operator": "CLSTR"
  },
  "1371": {
    "displayRoute": "1371",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Dhansa Border (T)",
    "operator": "CLSTR"
  },
  "1379": {
    "displayRoute": "1379",
    "startPoint": "Hastsal JJ Colony",
    "lastPoint": "Mukherji Nagar Baandh",
    "operator": "CLSTR"
  },
  "1406": {
    "displayRoute": "1406",
    "startPoint": "BBM Cluster Depot",
    "lastPoint": "Karawal Nagar Terminal",
    "operator": "CLSTR"
  },
  "1407": {
    "displayRoute": "1407",
    "startPoint": "Burari Crossing",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "CLSTR"
  },
  "1410": {
    "displayRoute": "143",
    "startPoint": "Anand Vihar ISBT",
    "lastPoint": "Keshav Nagar Mukti Ashram",
    "operator": "MATCH"
  },
  "1411": {
    "displayRoute": "1411",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Nehru Place Terminal",
    "operator": "CLSTR"
  },
  "1412": {
    "displayRoute": "1412",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Uttam Nagar",
    "operator": "CLSTR"
  },
  "1416": {
    "displayRoute": "850",
    "startPoint": "Kair Depot",
    "lastPoint": "Ghuman Hera Village",
    "operator": "CLSTR"
  },
  "1417": {
    "displayRoute": "1417",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "MATCH"
  },
  "1427": {
    "displayRoute": "1427",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "Trilok Puri 27 Block Terminal",
    "operator": "CLSTR"
  },
  "1434": {
    "displayRoute": "1434",
    "startPoint": "Ghuman Hera Cluster Depot 1",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "CLSTR"
  },
  "1444": {
    "displayRoute": "1444",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Singhu School (T)",
    "operator": "CLSTR"
  },
  "1463": {
    "displayRoute": "434",
    "startPoint": "Jasola Vihar",
    "lastPoint": "Okhla Depot IV CWS II",
    "operator": "CLSTR"
  },
  "1484": {
    "displayRoute": "817",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Kair Village",
    "operator": "CLSTR"
  },
  "1497": {
    "displayRoute": "1497",
    "startPoint": "Sunehari Pulla Depot / Jawaharlal Nehru Stadium Terminal",
    "lastPoint": "Sec A 5 Crossing Narela",
    "operator": "CLSTR"
  },
  "1498": {
    "displayRoute": "1498",
    "startPoint": "Sabhapur Crossing",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "MATCH"
  },
  "1510": {
    "displayRoute": "109",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Bankner Village",
    "operator": "MATCH"
  },
  "1512": {
    "displayRoute": "1512",
    "startPoint": "Munirka Village (T)",
    "lastPoint": "New Seema Puri Depot Cluster",
    "operator": "CLSTR"
  },
  "1514": {
    "displayRoute": "1514",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Jahangir Puri Crossing",
    "operator": "MATCH"
  },
  "1515": {
    "displayRoute": "901",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "1516": {
    "displayRoute": "1516",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Dilshad Garden Depot Cluster",
    "operator": "CLSTR"
  },
  "1521": {
    "displayRoute": "1521",
    "startPoint": "Rani Khera Depot I",
    "lastPoint": "Holambi Kalan JJ Colony",
    "operator": "CLSTR"
  },
  "1522": {
    "displayRoute": "1522",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Singhu School (T)",
    "operator": "MATCH"
  },
  "1523": {
    "displayRoute": "806",
    "startPoint": "Paprawat Village",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "CLSTR"
  },
  "1524": {
    "displayRoute": "1524",
    "startPoint": "GTK Depot",
    "lastPoint": "Bankner Village",
    "operator": "MATCH"
  },
  "1529": {
    "displayRoute": "910",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "1530": {
    "displayRoute": "1530",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "1534": {
    "displayRoute": "476",
    "startPoint": "Tikri Border Metro Station",
    "lastPoint": "Peera Garhi Depot",
    "operator": "CLSTR"
  },
  "1543": {
    "displayRoute": "1543",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "1547": {
    "displayRoute": "1547",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "1548": {
    "displayRoute": "106A",
    "startPoint": "Bawana J J Colony F-Block",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "MATCH"
  },
  "1551": {
    "displayRoute": "413",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "CLSTR"
  },
  "1552": {
    "displayRoute": "118EXT",
    "startPoint": "Mayur Vihar Phase 3",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "1560": {
    "displayRoute": "882A",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "MATCH"
  },
  "1563": {
    "displayRoute": "489",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Daulat Pur Village",
    "operator": "CLSTR"
  },
  "1564": {
    "displayRoute": "834",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Nanak Heri Village",
    "operator": "CLSTR"
  },
  "1565": {
    "displayRoute": "129",
    "startPoint": "Jhingola Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "MATCH"
  },
  "1566": {
    "displayRoute": "1566",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "1582": {
    "displayRoute": "169",
    "startPoint": "Katevara Village",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "1590": {
    "displayRoute": "1590",
    "startPoint": "Alipur Village GT Road",
    "lastPoint": "Safiabad Border",
    "operator": "CLSTR"
  },
  "1595": {
    "displayRoute": "1595",
    "startPoint": "Bawana Sec 1 Cluster Depot",
    "lastPoint": "Tiggi Pur Village",
    "operator": "MATCH"
  },
  "1596": {
    "displayRoute": "597",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Nehru Place Terminal",
    "operator": "CLSTR"
  },
  "1597": {
    "displayRoute": "103",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "operator": "MATCH"
  },
  "1598": {
    "displayRoute": "131",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Narela Terminal",
    "operator": "MATCH"
  },
  "1600": {
    "displayRoute": "1600",
    "startPoint": "Bakauli Village (GT Road)",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "CLSTR"
  },
  "1601": {
    "displayRoute": "107",
    "startPoint": "Katewara Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "MATCH"
  },
  "1602": {
    "displayRoute": "1602",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Inderlok Metro Station",
    "operator": "CLSTR"
  },
  "1608": {
    "displayRoute": "106",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "MATCH"
  },
  "1616": {
    "displayRoute": "118",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Rajghat Depot",
    "operator": "CLSTR"
  },
  "1626": {
    "displayRoute": "502",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Shahbad Dairy",
    "operator": "MATCH"
  },
  "1627": {
    "displayRoute": "1627",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Holambi Khurd",
    "operator": "CLSTR"
  },
  "1629": {
    "displayRoute": "91EXP",
    "startPoint": "ROHINI SEC-11 EXTN SFS FLTS",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "1631": {
    "displayRoute": "D-3202",
    "startPoint": "Haiderpur Metro Station",
    "lastPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "operator": "MATCH"
  },
  "1644": {
    "displayRoute": "780",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "1654": {
    "displayRoute": "193A",
    "startPoint": "Ramdev Chowk Narela Terminal",
    "lastPoint": "GTK Depot",
    "operator": "CLSTR"
  },
  "1655": {
    "displayRoute": "1655",
    "startPoint": "Loknayak Puram",
    "lastPoint": "Raghubir Nagar F Block",
    "operator": "CLSTR"
  },
  "1656": {
    "displayRoute": "1656",
    "startPoint": "Inder Puri JJ Colony",
    "lastPoint": "Tehkhand Depot DTC",
    "operator": "MATCH"
  },
  "1657": {
    "displayRoute": "836",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Mundhela Khurd Village",
    "operator": "CLSTR"
  },
  "1665": {
    "displayRoute": "505",
    "startPoint": "Ajmeri Gate / Kamla Market",
    "lastPoint": "Mehrauli Terminal",
    "operator": "CLSTR"
  },
  "1671": {
    "displayRoute": "192",
    "startPoint": "ISBT Nityanand Marg",
    "lastPoint": "Keshav Nagar Mukti Ashram",
    "operator": "MATCH"
  },
  "1672": {
    "displayRoute": "1672",
    "startPoint": "Karawal Nagar Terminal",
    "lastPoint": "BBM Cluster Depot",
    "operator": "CLSTR"
  },
  "1678": {
    "displayRoute": "1678",
    "startPoint": "IP Power House (ITO Ring Road)",
    "lastPoint": "Kalyan Puri Terminal",
    "operator": "CLSTR"
  },
  "1679": {
    "displayRoute": "12",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Bawana JJ Colony KL- Block / Bawana JJ Colony Terminal",
    "operator": "MATCH"
  },
  "1684": {
    "displayRoute": "1684",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Rohini Sec 23 (Green Hill Aptt.)",
    "operator": "MATCH"
  },
  "1687": {
    "displayRoute": "1687",
    "startPoint": "Khalsa College",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "CLSTR"
  },
  "1693": {
    "displayRoute": "886A",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "CLSTR"
  },
  "1697": {
    "displayRoute": "836",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Mundhela Khurd Village",
    "operator": "CLSTR"
  },
  "1699": {
    "displayRoute": "98",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Azadpur Terminal",
    "operator": "CLSTR"
  },
  "1706": {
    "displayRoute": "1706",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "Kamla Market / Ajmeri Gate",
    "operator": "CLSTR"
  },
  "1707": {
    "displayRoute": "354",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Inderlok Metro Station",
    "operator": "CLSTR"
  },
  "1708": {
    "displayRoute": "212",
    "startPoint": "Anand Parvat Terminal",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "MATCH"
  },
  "1709": {
    "displayRoute": "165",
    "startPoint": "Anand Vihar ISBT",
    "lastPoint": "Shahbad Dairy",
    "operator": "MATCH"
  },
  "1713": {
    "displayRoute": "850",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "1714": {
    "displayRoute": "801LNK",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Dwarka Sec 22 Cluster Depot",
    "operator": "CLSTR"
  },
  "1720": {
    "displayRoute": "1720",
    "startPoint": "Ghuman Hera Depot 1",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "1724": {
    "displayRoute": "1724",
    "startPoint": "Lampur Border",
    "lastPoint": "NajafGarh Terminal",
    "operator": "MATCH"
  },
  "1725": {
    "displayRoute": "1725",
    "startPoint": "Bhati Mines (T)",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "CLSTR"
  },
  "1727": {
    "displayRoute": "260",
    "startPoint": "C 4 Yamuna Vihar crossing / Yamuna Vihar C-4 Terminal",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "MATCH"
  },
  "1735": {
    "displayRoute": "207",
    "startPoint": "Bhajanpura",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "CLSTR"
  },
  "1738": {
    "displayRoute": "1738",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Zakhira (Rohtak Road)",
    "operator": "MATCH"
  },
  "1739": {
    "displayRoute": "1739",
    "startPoint": "NCERT",
    "lastPoint": "Mundhela Khurd Village",
    "operator": "CLSTR"
  },
  "1743": {
    "displayRoute": "1743",
    "startPoint": "Ajmeri Gate / Kamla Market",
    "lastPoint": "Gokul Puri",
    "operator": "CLSTR"
  },
  "1744": {
    "displayRoute": "213",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "CLSTR"
  },
  "1746": {
    "displayRoute": "971",
    "startPoint": "Anand Vihar ISBT",
    "lastPoint": "Rohini Sectocr -1 Avantika",
    "operator": "MATCH"
  },
  "1747": {
    "displayRoute": "1747",
    "startPoint": "Sarai Kale Khan ISBT Terminal",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "CLSTR"
  },
  "1750": {
    "displayRoute": "175",
    "startPoint": "Mundhela Khurd Village",
    "lastPoint": "NCERT",
    "operator": "CLSTR"
  },
  "1752": {
    "displayRoute": "1752",
    "startPoint": "Rani Khera Depot III",
    "lastPoint": "Jhingola Village",
    "operator": "CLSTR"
  },
  "1755": {
    "displayRoute": "1755",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Anand Vihar ISBT Main Road",
    "operator": "MATCH"
  },
  "1756": {
    "displayRoute": "1756",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "CLSTR"
  },
  "1759": {
    "displayRoute": "1759",
    "startPoint": "Mubarak Pur Dabas",
    "lastPoint": "ISBT Kashmere Gate (Lothian Road)",
    "operator": "MATCH"
  },
  "1769": {
    "displayRoute": "412",
    "startPoint": "C 4 Yamuna Vihar crossing / Yamuna Vihar C-4 Terminal",
    "lastPoint": "Nehru Place Terminal",
    "operator": "MATCH"
  },
  "1774": {
    "displayRoute": "156",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "CLSTR"
  },
  "1775": {
    "displayRoute": "261",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "ISBT Sarai Kale Khan",
    "operator": "MATCH"
  },
  "1776": {
    "displayRoute": "1776",
    "startPoint": "Trilok Puri 13 Block",
    "lastPoint": "Indraprastha Cluster Depot",
    "operator": "CLSTR"
  },
  "1788": {
    "displayRoute": "405A",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Kashmere Gate City Bus Terminal",
    "operator": "MATCH"
  },
  "1795": {
    "displayRoute": "717A",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Kapashera Border",
    "operator": "CLSTR"
  },
  "1796": {
    "displayRoute": "1796",
    "startPoint": "Hari Nagar Depot",
    "lastPoint": "Hastsal JJ Colony",
    "operator": "CLSTR"
  },
  "1797": {
    "displayRoute": "1797",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Jai Mata Market Tri Nagar Terminal",
    "operator": "MATCH"
  },
  "1798": {
    "displayRoute": "1798",
    "startPoint": "Uttam Nagar",
    "lastPoint": "South Moti Bagh (Ring Road)",
    "operator": "CLSTR"
  },
  "1811": {
    "displayRoute": "319A",
    "startPoint": "Noida Sec-43 Police Chowki SadarPur",
    "lastPoint": "Shahdra Terminal",
    "operator": "MATCH"
  },
  "1815": {
    "displayRoute": "129",
    "startPoint": "Jhingola Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "CLSTR"
  },
  "1825": {
    "displayRoute": "102A",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "CLSTR"
  },
  "1829": {
    "displayRoute": "33",
    "startPoint": "Noida Sec 43 Police Chowki",
    "lastPoint": "Bhajanpura",
    "operator": "MATCH"
  },
  "1830": {
    "displayRoute": "540",
    "startPoint": "Akshardham Metro Station",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "MATCH"
  },
  "1836": {
    "displayRoute": "717B",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "CLSTR"
  },
  "1839": {
    "displayRoute": "1839",
    "startPoint": "Ghuman Hera Depot 1",
    "lastPoint": "Q Block Mangolpuri",
    "operator": "CLSTR"
  },
  "1840": {
    "displayRoute": "1840",
    "startPoint": "Uttam Nagar Terminal",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "CLSTR"
  },
  "1841": {
    "displayRoute": "131",
    "startPoint": "Lampur Border",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "CLSTR"
  },
  "1842": {
    "displayRoute": "1842",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Shahstri Park DMRC Depot",
    "operator": "MATCH"
  },
  "1846": {
    "displayRoute": "1846",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Rohini Sec 23 (Green Hill Aptt.)",
    "operator": "CLSTR"
  },
  "1850": {
    "displayRoute": "1850",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "1853": {
    "displayRoute": "476",
    "startPoint": "Tikri Border Metro Station",
    "lastPoint": "Peera Garhi Depot",
    "operator": "CLSTR"
  },
  "1881": {
    "displayRoute": "1881",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "1886": {
    "displayRoute": "1886",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "1888": {
    "displayRoute": "RL-77",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "1890": {
    "displayRoute": "167",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Uttri Pitam Pura",
    "operator": "MATCH"
  },
  "1893": {
    "displayRoute": "1893",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "1895": {
    "displayRoute": "780",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "CLSTR"
  },
  "1899": {
    "displayRoute": "405",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "1900": {
    "displayRoute": "405A",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Kashmere Gate City Bus Terminal",
    "operator": "MATCH"
  },
  "1901": {
    "displayRoute": "1901",
    "startPoint": "Inder Puri Krishi Kunj",
    "lastPoint": "Mehrauli Terminal",
    "operator": "CLSTR"
  },
  "1905": {
    "displayRoute": "810",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "MATCH"
  },
  "1906": {
    "displayRoute": "413",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "MATCH"
  },
  "1907": {
    "displayRoute": "1907",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "CLSTR"
  },
  "1908": {
    "displayRoute": "837",
    "startPoint": "BBM Cluster Depot",
    "lastPoint": "Shaheed Bhagat Singh Colony Karawal Nagar",
    "operator": "CLSTR"
  },
  "1911": {
    "displayRoute": "405",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "1913": {
    "displayRoute": "1913",
    "startPoint": "Kair Depot",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "1914": {
    "displayRoute": "1914",
    "startPoint": "Holambi Kalan Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "CLSTR"
  },
  "1919": {
    "displayRoute": "1919",
    "startPoint": "Bhalaswa Crossing",
    "lastPoint": "Nehru Place Terminal",
    "operator": "MATCH"
  },
  "1923": {
    "displayRoute": "413",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "MATCH"
  },
  "1924": {
    "displayRoute": "433",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Anand Vihar ISBT Main Road",
    "operator": "MATCH"
  },
  "1926": {
    "displayRoute": "1926",
    "startPoint": "Mundhela Khurd Village",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "CLSTR"
  },
  "1927": {
    "displayRoute": "433A",
    "startPoint": "Central Workshop II",
    "lastPoint": "Safdurjung Terminal",
    "operator": "MATCH"
  },
  "1928": {
    "displayRoute": "1928",
    "startPoint": "ISBT Kashmere Gate Terminal",
    "lastPoint": "Ambedkar Nagar Terminal / DIPSAR",
    "operator": "MATCH"
  },
  "1929": {
    "displayRoute": "1929",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "1931": {
    "displayRoute": "1931",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Kanjhawala Village",
    "operator": "CLSTR"
  },
  "1933": {
    "displayRoute": "1933",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "CLSTR"
  },
  "1934": {
    "displayRoute": "1934",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Nehru Bus Stand Goyla Dairy",
    "operator": "CLSTR"
  },
  "1937": {
    "displayRoute": "1937",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "Mehrauli",
    "operator": "MATCH"
  },
  "1938": {
    "displayRoute": "440",
    "startPoint": "Lado Sarai Firni Road (T)",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "MATCH"
  },
  "1941": {
    "displayRoute": "1941",
    "startPoint": "Swaroop Nagar GT Road",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "CLSTR"
  },
  "1946": {
    "displayRoute": "1946",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Dichau Kalan School",
    "operator": "CLSTR"
  },
  "1948": {
    "displayRoute": "107",
    "startPoint": "Katewara Village",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "CLSTR"
  },
  "1949": {
    "displayRoute": "405A",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "CLSTR"
  },
  "1951": {
    "displayRoute": "1951",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Nilothi Crossing",
    "operator": "MATCH"
  },
  "1952": {
    "displayRoute": "29",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Rani Khera Depot II",
    "operator": "CLSTR"
  },
  "1957": {
    "displayRoute": "905",
    "startPoint": "Bawana Sec 5 Cluster Depot",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "CLSTR"
  },
  "1958": {
    "displayRoute": "1958",
    "startPoint": "R K Puram Sec-1 2",
    "lastPoint": "Badarpur Border (T)",
    "operator": "MATCH"
  },
  "1961": {
    "displayRoute": "1961",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "1965": {
    "displayRoute": "708",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "1966": {
    "displayRoute": "CBD2(+)",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "1968": {
    "displayRoute": "413",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "MATCH"
  },
  "1972": {
    "displayRoute": "90",
    "startPoint": "CPWD Colony Vasant Vihar",
    "lastPoint": "New Seema Puri Depot Cluster",
    "operator": "CLSTR"
  },
  "1973": {
    "displayRoute": "156",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Azadpur Terminal",
    "operator": "CLSTR"
  },
  "1977": {
    "displayRoute": "214",
    "startPoint": "C 4 Yamuna Vihar",
    "lastPoint": "Nehru Place Terminal",
    "operator": "MATCH"
  },
  "1978": {
    "displayRoute": "1978",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "MATCH"
  },
  "1979": {
    "displayRoute": "1979",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Ch Brahm Parkash Ayurvedic Hospital",
    "operator": "CLSTR"
  },
  "1980": {
    "displayRoute": "1980",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "1985": {
    "displayRoute": "1985",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "C 4 Yamuna Vihar",
    "operator": "CLSTR"
  },
  "1992": {
    "displayRoute": "1992",
    "startPoint": "Inderpuri A-Block",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "MATCH"
  },
  "1996": {
    "displayRoute": "761",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "CLSTR"
  },
  "1999": {
    "displayRoute": "49",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Ramdev Chowk Narela Terminal",
    "operator": "CLSTR"
  },
  "2007": {
    "displayRoute": "706A",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Kapashera Border",
    "operator": "CLSTR"
  },
  "2014": {
    "displayRoute": "2014",
    "startPoint": "Inder Puri JJ Colony",
    "lastPoint": "Tehkhand Depot DTC",
    "operator": "MATCH"
  },
  "2031": {
    "displayRoute": "922",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "2034": {
    "displayRoute": "2034",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Inderpuri ABlock",
    "operator": "MATCH"
  },
  "2035": {
    "displayRoute": "2035",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "H-3 Vikas Puri",
    "operator": "MATCH"
  },
  "2036": {
    "displayRoute": "817N",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "NajafGarh Terminal",
    "operator": "CLSTR"
  },
  "2037": {
    "displayRoute": "2037",
    "startPoint": "Badarpur Border (T)",
    "lastPoint": "Aya Nagar",
    "operator": "MATCH"
  },
  "2038": {
    "displayRoute": "BPG",
    "startPoint": "Badarpur Border",
    "lastPoint": "Gurgaon",
    "operator": "MATCH"
  },
  "2039": {
    "displayRoute": "2039",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Indraprastha Cluster Depot",
    "operator": "CLSTR"
  },
  "2044": {
    "displayRoute": "818A",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Jhatikra Village",
    "operator": "CLSTR"
  },
  "2045": {
    "displayRoute": "106",
    "startPoint": "Qutub Garh Village (T)",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "CLSTR"
  },
  "2050": {
    "displayRoute": "2050",
    "startPoint": "New Seema Puri Depot Cluster",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "CLSTR"
  },
  "2051": {
    "displayRoute": "114C",
    "startPoint": "Bawana Sec 5 Cluster Depot",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "CLSTR"
  },
  "2053": {
    "displayRoute": "836",
    "startPoint": "Mundhela Khurd Village",
    "lastPoint": "Tilak Nagar Terminal",
    "operator": "MATCH"
  },
  "2054": {
    "displayRoute": "743B",
    "startPoint": "ISBT Sarai Kale Khan",
    "lastPoint": "Pochan Pur Village Dwarka Sec 23",
    "operator": "CLSTR"
  },
  "2061": {
    "displayRoute": "2061",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "CLSTR"
  },
  "2065": {
    "displayRoute": "2065",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "MATCH"
  },
  "2066": {
    "displayRoute": "724",
    "startPoint": "Sec A 5 Crossing Narela",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "CLSTR"
  },
  "2073": {
    "displayRoute": "405",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "2074": {
    "displayRoute": "741",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "Jonti Village",
    "operator": "CLSTR"
  },
  "2089": {
    "displayRoute": "2089",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "2097": {
    "displayRoute": "816",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Indraprastha Cluster Depot",
    "operator": "CLSTR"
  },
  "2098": {
    "displayRoute": "598",
    "startPoint": "Nehru Bus Stand Goyla Dairy",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "2105": {
    "displayRoute": "680",
    "startPoint": "Ambedkar Nagar Sec-4 / Virat Cinema Crossing",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "MATCH"
  },
  "2106": {
    "displayRoute": "BPG",
    "startPoint": "Badarpur Border",
    "lastPoint": "Gurgaon",
    "operator": "MATCH"
  },
  "2114": {
    "displayRoute": "354",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "Shahdara Terminal",
    "operator": "CLSTR"
  },
  "2117": {
    "displayRoute": "D-123",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Pandwala Kalan (T)",
    "operator": "CLSTR"
  },
  "2122": {
    "displayRoute": "2122",
    "startPoint": "Rani Khera Depot I",
    "lastPoint": "Lampur Border",
    "operator": "CLSTR"
  },
  "2140": {
    "displayRoute": "727",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "operator": "CLSTR"
  },
  "2141": {
    "displayRoute": "429",
    "startPoint": "Mayur Vihar Ph 1 Terminal",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "2142": {
    "displayRoute": "2142",
    "startPoint": "Qutub Garh Village (T)",
    "lastPoint": "YMCA / Palika Kendra",
    "operator": "CLSTR"
  },
  "2143": {
    "displayRoute": "956",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "CLSTR"
  },
  "2156": {
    "displayRoute": "2156",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "MATCH"
  },
  "2161": {
    "displayRoute": "701",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "operator": "MATCH"
  },
  "2163": {
    "displayRoute": "2163",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "MATCH"
  },
  "2165": {
    "displayRoute": "2165",
    "startPoint": "Jaffar Pur Kalan",
    "lastPoint": "Tilak Nagar Terminal",
    "operator": "MATCH"
  },
  "2166": {
    "displayRoute": "717B",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "MATCH"
  },
  "2169": {
    "displayRoute": "2169",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Q Block Mangol Puri Terminal",
    "operator": "MATCH"
  },
  "2170": {
    "displayRoute": "717",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Shahbad Mohammad Pur",
    "operator": "MATCH"
  },
  "2173": {
    "displayRoute": "433A",
    "startPoint": "Central Workshop II",
    "lastPoint": "Safdurjung Terminal",
    "operator": "MATCH"
  },
  "2179": {
    "displayRoute": "803",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "2183": {
    "displayRoute": "721",
    "startPoint": "ISBT Kashmere Gate Terminal",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "MATCH"
  },
  "2204": {
    "displayRoute": "729",
    "startPoint": "Kapashera Border",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "2205": {
    "displayRoute": "776",
    "startPoint": "Sunehari Pulla Depot",
    "lastPoint": "Uttam Nagar Terminal (In Gate)",
    "operator": "MATCH"
  },
  "2223": {
    "displayRoute": "892",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Najafgarh Terminal",
    "operator": "MATCH"
  },
  "2224": {
    "displayRoute": "752",
    "startPoint": "BAMNOLI VILLAGE",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "MATCH"
  },
  "2226": {
    "displayRoute": "893",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "MATCH"
  },
  "2227": {
    "displayRoute": "711",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Rohini Sec 23 Pocket 1 (Green Hill Aptt.)",
    "operator": "MATCH"
  },
  "2228": {
    "displayRoute": "761",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "MATCH"
  },
  "2229": {
    "displayRoute": "729",
    "startPoint": "Jharoda Kalan Border (Satyam Puram)",
    "lastPoint": "Nehru Place Terminal",
    "operator": "MATCH"
  },
  "2232": {
    "displayRoute": "817",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "2245": {
    "displayRoute": "778",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "Dwarka Sec-2 Depot",
    "operator": "MATCH"
  },
  "2246": {
    "displayRoute": "2246",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "2250": {
    "displayRoute": "891",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "operator": "MATCH"
  },
  "2251": {
    "displayRoute": "2251",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Inderpuri (Krishi Kunj)",
    "operator": "MATCH"
  },
  "2257": {
    "displayRoute": "2257",
    "startPoint": "H-3 Vikas Puri Terminal",
    "lastPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "operator": "MATCH"
  },
  "2283": {
    "displayRoute": "2283",
    "startPoint": "Jaffar Pur Kalan",
    "lastPoint": "Tilak Nagar Terminal",
    "operator": "MATCH"
  },
  "2303": {
    "displayRoute": "2303",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Mundela Kalan Depot",
    "operator": "MATCH"
  },
  "2308": {
    "displayRoute": "721",
    "startPoint": "ISBT Kashmere Gate Terminal",
    "lastPoint": "Mangla Puri Terminal",
    "operator": "MATCH"
  },
  "2314": {
    "displayRoute": "2314",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "MATCH"
  },
  "2315": {
    "displayRoute": "832",
    "startPoint": "D Block Janak Puri (Pankha Road)",
    "lastPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "operator": "MATCH"
  },
  "2317": {
    "displayRoute": "968",
    "startPoint": "Dhansa Border (T)",
    "lastPoint": "Inderlok Metro Station",
    "operator": "MATCH"
  },
  "2339": {
    "displayRoute": "2339",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Raja Puri",
    "operator": "MATCH"
  },
  "2340": {
    "displayRoute": "2340",
    "startPoint": "Khayala Colony Terminal",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "MATCH"
  },
  "2341": {
    "displayRoute": "2341",
    "startPoint": "West Enclave Terminal",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "MATCH"
  },
  "2342": {
    "displayRoute": "2342",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Kanjhawala Village",
    "operator": "MATCH"
  },
  "2343": {
    "displayRoute": "313",
    "startPoint": "Delhi Secretariat",
    "lastPoint": "Inder Puri JJ Colony",
    "operator": "MATCH"
  },
  "2344": {
    "displayRoute": "107",
    "startPoint": "Katewara Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "MATCH"
  },
  "2345": {
    "displayRoute": "2345",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Jahangirpuri E-Block",
    "operator": "MATCH"
  },
  "2364": {
    "displayRoute": "889",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Rohini Sec-27 Temple",
    "operator": "MATCH"
  },
  "2366": {
    "displayRoute": "2366",
    "startPoint": "Uttam Nagar",
    "lastPoint": "Bawana Soap Factory",
    "operator": "MATCH"
  },
  "2369": {
    "displayRoute": "882A",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "MATCH"
  },
  "2372": {
    "displayRoute": "713",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Daraula Border",
    "operator": "MATCH"
  },
  "2373": {
    "displayRoute": "740",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "MATCH"
  },
  "2382": {
    "displayRoute": "891",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "operator": "MATCH"
  },
  "2390": {
    "displayRoute": "479A",
    "startPoint": "Badarpur Border",
    "lastPoint": "Wazirpur Depot",
    "operator": "MATCH"
  },
  "2392": {
    "displayRoute": "8",
    "startPoint": "Noida Ph 2 Phool Mandi",
    "lastPoint": "Badarpur Border (T)",
    "operator": "MATCH"
  },
  "2393": {
    "displayRoute": "DS-9",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Nehru Place Terminal",
    "operator": "MATCH"
  },
  "2394": {
    "displayRoute": "2394",
    "startPoint": "Kashmere Gate City Bus Terminal",
    "lastPoint": "Mubarak Pur Crossing",
    "operator": "MATCH"
  },
  "2406": {
    "displayRoute": "2406",
    "startPoint": "Majra Dabas Village",
    "lastPoint": "Hanuman Mandir / Shivaji Stadium",
    "operator": "MATCH"
  },
  "2409": {
    "displayRoute": "2409",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "Delhi Secretariat",
    "operator": "MATCH"
  },
  "2417": {
    "displayRoute": "2417",
    "startPoint": "Mubarakpur Xing",
    "lastPoint": "Karampura Terminal",
    "operator": "MATCH"
  },
  "2433": {
    "displayRoute": "2433",
    "startPoint": "Hiran Kudna Crossing",
    "lastPoint": "Old Delhi Railway Station (Fatehpuri)",
    "operator": "MATCH"
  },
  "2442": {
    "displayRoute": "2442",
    "startPoint": "Bakkargarh Village",
    "lastPoint": "Karampura Terminal",
    "operator": "MATCH"
  },
  "2448": {
    "displayRoute": "2448",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "2451": {
    "displayRoute": "2451",
    "startPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "lastPoint": "Ramdev Chowk Narela Terminal",
    "operator": "MATCH"
  },
  "2452": {
    "displayRoute": "971",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "2454": {
    "displayRoute": "2454",
    "startPoint": "Bakkargarh Village",
    "lastPoint": "Karampura Terminal",
    "operator": "MATCH"
  },
  "2455": {
    "displayRoute": "2455",
    "startPoint": "Bawana JJ Colony KL- Block",
    "lastPoint": "Shadipur Depot",
    "operator": "MATCH"
  },
  "2458": {
    "displayRoute": "606",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "MATCH"
  },
  "2459": {
    "displayRoute": "992",
    "startPoint": "Nand Nagari Terminal",
    "lastPoint": "Sultan Puri (T)",
    "operator": "MATCH"
  },
  "2465": {
    "displayRoute": "2465",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Sultanpuri Terminal",
    "operator": "MATCH"
  },
  "2474": {
    "displayRoute": "2474",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "MATCH"
  },
  "2480": {
    "displayRoute": "131",
    "startPoint": "Lampur Border",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "MATCH"
  },
  "2484": {
    "displayRoute": "713",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Daraula Border",
    "operator": "MATCH"
  },
  "2487": {
    "displayRoute": "2487",
    "startPoint": "N D R Station G No 2",
    "lastPoint": "Bahadurgarh",
    "operator": "MATCH"
  },
  "2489": {
    "displayRoute": "2489",
    "startPoint": "Kendriya Terminal (Church Road)",
    "lastPoint": "Q-Block Mangolpuri",
    "operator": "MATCH"
  },
  "2492": {
    "displayRoute": "2492",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "NajafGarh Terminal",
    "operator": "MATCH"
  },
  "2493": {
    "displayRoute": "2493",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Sultanpuri Terminal",
    "operator": "MATCH"
  },
  "2498": {
    "displayRoute": "2498",
    "startPoint": "NARELA RAILWAY X-ING",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "2500": {
    "displayRoute": "2500",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "2515": {
    "displayRoute": "740",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "MATCH"
  },
  "2516": {
    "displayRoute": "892",
    "startPoint": "Khera Village 2 / Khera School",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "MATCH"
  },
  "2525": {
    "displayRoute": "D-5506",
    "startPoint": "Karawal Nagar Terminal / SBS Colony Karawal Nagar pusta Road Gali No.4",
    "lastPoint": "Mauj Pur Babar Pur Metro Station / Babarpur Ext.",
    "operator": "MATCH"
  },
  "2527": {
    "displayRoute": "840",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "2530": {
    "displayRoute": "764",
    "startPoint": "Mayur Vihar Phase 2 Pkt C Metro Station",
    "lastPoint": "Mayur Vihar Phase-II - Pkt C - Metro Station - Terminal",
    "operator": "MATCH"
  },
  "2536": {
    "displayRoute": "879A",
    "startPoint": "D Block Janak Puri (Pankha Road)",
    "lastPoint": "Badli Railway Staion / Badli Metro Station",
    "operator": "MATCH"
  },
  "2539": {
    "displayRoute": "740",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "MATCH"
  },
  "2543": {
    "displayRoute": "2543",
    "startPoint": "Mundhela Khurd Village",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "MATCH"
  },
  "2544": {
    "displayRoute": "107",
    "startPoint": "Katewara Village",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "MATCH"
  },
  "2549": {
    "displayRoute": "606",
    "startPoint": "Kanjhawala Village",
    "lastPoint": "Kashmere Gate City bus Terminal",
    "operator": "MATCH"
  },
  "2556": {
    "displayRoute": "2556",
    "startPoint": "YMCA / Palika Kendra",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "MATCH"
  },
  "2557": {
    "displayRoute": "2557",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Auchandi Border",
    "operator": "MATCH"
  },
  "2561": {
    "displayRoute": "85",
    "startPoint": "Avantika Sec 1",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "MATCH"
  },
  "2595": {
    "displayRoute": "BPEXP",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "MATCH"
  },
  "2693": {
    "displayRoute": "90",
    "startPoint": "CPWD Colony Vasant Vihar",
    "lastPoint": "New Seema Puri Depot Cluster",
    "operator": "MATCH"
  },
  "2694": {
    "displayRoute": "340",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "MATCH"
  },
  "2734": {
    "displayRoute": "355",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "2735": {
    "displayRoute": "310",
    "startPoint": "Jheel Terminal",
    "lastPoint": "Rajghat Depot",
    "operator": "MATCH"
  },
  "2783": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "2789": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "2794": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "2818": {
    "displayRoute": "2818",
    "startPoint": "Uttam Nagar Terminal",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "MATCH"
  },
  "2834": {
    "displayRoute": "405",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "2859": {
    "displayRoute": "2859",
    "startPoint": "NARELA RAILWAY X-ING",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "2880": {
    "displayRoute": "2880",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Shahstri Park DMRC Depot",
    "operator": "MATCH"
  },
  "2893": {
    "displayRoute": "33",
    "startPoint": "Bhajanpura",
    "lastPoint": "Noida Sec 43 Police Chowki",
    "operator": "MATCH"
  },
  "2980": {
    "displayRoute": "2980",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "MATCH"
  },
  "2983": {
    "displayRoute": "2983",
    "startPoint": "Hauz Khas",
    "lastPoint": "Loknayak Puram",
    "operator": "MATCH"
  },
  "2986": {
    "displayRoute": "801",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "Kapashera Border",
    "operator": "MATCH"
  },
  "2988": {
    "displayRoute": "2988",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "D Block Janak Puri (Pankha Road)",
    "operator": "MATCH"
  },
  "3015": {
    "displayRoute": "3015",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "3017": {
    "displayRoute": "3017",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "3022": {
    "displayRoute": "889",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Rohini Sec-27 Temple",
    "operator": "MATCH"
  },
  "3024": {
    "displayRoute": "114C",
    "startPoint": "Azadpur Terminal",
    "lastPoint": "Qutubgarh Village (Terminal)",
    "operator": "MATCH"
  },
  "3029": {
    "displayRoute": "750",
    "startPoint": "Rani Khera Depot II",
    "lastPoint": "Q Block Mangolpuri",
    "operator": "MATCH"
  },
  "3033": {
    "displayRoute": "3033",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "MATCH"
  },
  "3034": {
    "displayRoute": "MC-137D",
    "startPoint": "Mayur Vihar Phase 3",
    "lastPoint": "Shastri Park Metro Station",
    "operator": "MATCH"
  },
  "3035": {
    "displayRoute": "3035",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Shahstri Park DMRC Depot",
    "operator": "MATCH"
  },
  "3037": {
    "displayRoute": "3037",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "3039": {
    "displayRoute": "3039",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "3048": {
    "displayRoute": "3048",
    "startPoint": "Mubarakpur Dabas",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "MATCH"
  },
  "3061": {
    "displayRoute": "3061",
    "startPoint": "Dera Kalan Terminal",
    "lastPoint": "Jasola Vihar",
    "operator": "MATCH"
  },
  "3068": {
    "displayRoute": "3068",
    "startPoint": "R K Puram Sec-1 2",
    "lastPoint": "Badarpur Border (T)",
    "operator": "MATCH"
  },
  "3072": {
    "displayRoute": "D-7702",
    "startPoint": "Devoli Village",
    "lastPoint": "North Point (Nursing Home)",
    "operator": "MATCH"
  },
  "3073": {
    "displayRoute": "715A",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Mehrauli / Qutub Minar",
    "operator": "MATCH"
  },
  "3088": {
    "displayRoute": "3088",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Dwarka Sec 22 Cluster Depot",
    "operator": "MATCH"
  },
  "3089": {
    "displayRoute": "RL77B",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "MATCH"
  },
  "3094": {
    "displayRoute": "3094",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "NajafGarh Terminal",
    "operator": "MATCH"
  },
  "3097": {
    "displayRoute": "546",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Uttam Nagar Terminal (In Gate)",
    "operator": "MATCH"
  },
  "3102": {
    "displayRoute": "3102",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "NajafGarh Terminal",
    "operator": "MATCH"
  },
  "3104": {
    "displayRoute": "3104",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "NajafGarh Terminal",
    "operator": "MATCH"
  },
  "3106": {
    "displayRoute": "713",
    "startPoint": "Tilak Nagar Jail Road",
    "lastPoint": "Daraula Border",
    "operator": "MATCH"
  },
  "3147": {
    "displayRoute": "728",
    "startPoint": "Delhi Terminal",
    "lastPoint": "Delhi Terminal",
    "operator": "DTC"
  },
  "3148": {
    "displayRoute": "3148",
    "startPoint": "OKHLA DEPOT",
    "lastPoint": "Badarpur Border (T)",
    "operator": "MATCH"
  },
  "3201": {
    "displayRoute": "3201",
    "startPoint": "Sec A-9 Narela",
    "lastPoint": "Anand Vihar ISBT Terminal",
    "operator": "MATCH"
  },
  "3212": {
    "displayRoute": "274A",
    "startPoint": "Babarpur Ext Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "MATCH"
  },
  "3213": {
    "displayRoute": "D-5403",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Shastri Park Metro Station",
    "operator": "MATCH"
  },
  "3222": {
    "displayRoute": "120C",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Pkt G-8 Narela",
    "operator": "MATCH"
  },
  "3247": {
    "displayRoute": "889",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Rohini Sec-27 Temple",
    "operator": "MATCH"
  },
  "3338": {
    "displayRoute": "3338",
    "startPoint": "SAFDAR JANG TERM.",
    "lastPoint": "Lakhi Ram Park (Rohini Sector-22)",
    "operator": "MATCH"
  },
  "3346": {
    "displayRoute": "850LTD",
    "startPoint": "Ghuman Hera Village",
    "lastPoint": "Krishi Bhawan",
    "operator": "MATCH"
  },
  "3370": {
    "displayRoute": "D-9918",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "MATCH"
  },
  "3387": {
    "displayRoute": "131",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Narela Terminal",
    "operator": "MATCH"
  },
  "3390": {
    "displayRoute": "3390",
    "startPoint": "Anand Vihar ISBT Terminal",
    "lastPoint": "Rohini  Sec-1 Avantika",
    "operator": "MATCH"
  },
  "3407": {
    "displayRoute": "33A",
    "startPoint": "Chauhan Patti (Terminal)",
    "lastPoint": "Noida Sec 43 Police Chowki",
    "operator": "MATCH"
  },
  "3436": {
    "displayRoute": "773",
    "startPoint": "Bharthal Village",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "MATCH"
  },
  "3449": {
    "displayRoute": "405",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "MATCH"
  },
  "3467": {
    "displayRoute": "323",
    "startPoint": "Dhaula Kuan (Ring Road)",
    "lastPoint": "Noida Sec 62 (Eletronic City)",
    "operator": "MATCH"
  },
  "3468": {
    "displayRoute": "3468",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Uttam Nagar",
    "operator": "MATCH"
  },
  "3471": {
    "displayRoute": "522SPL",
    "startPoint": "Andrews Ganj",
    "lastPoint": "New Delhi Railway Station Gate Number 2",
    "operator": "MATCH"
  },
  "3476": {
    "displayRoute": "546",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Uttam Nagar Terminal (In Gate)",
    "operator": "MATCH"
  },
  "3511": {
    "displayRoute": "D-9912",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Sarang Pur Village",
    "operator": "MATCH"
  },
  "3550": {
    "displayRoute": "750",
    "startPoint": "Rani Khera Depot II",
    "lastPoint": "Q Block Mangolpuri",
    "operator": "MATCH"
  },
  "3559": {
    "displayRoute": "3559",
    "startPoint": "Inderpuri A-Block",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "MATCH"
  },
  "3600": {
    "displayRoute": "Nanaksar To Old Gaziabad Bus Stand",
    "startPoint": "Old Gaziabad Bus Stand",
    "lastPoint": "NanakSar",
    "operator": "MATCH"
  },
  "3642": {
    "displayRoute": "3642",
    "startPoint": "Q Block Mangol Puri Terminal",
    "lastPoint": "Ghuman Hera Depot 1",
    "operator": "MATCH"
  },
  "3676": {
    "displayRoute": "3676",
    "startPoint": "Sarai Kale Khan ISBT Terminal",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "MATCH"
  },
  "3682": {
    "displayRoute": "3682",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "MATCH"
  },
  "3685": {
    "displayRoute": "922",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Najafgarh Terminal",
    "operator": "MATCH"
  },
  "3699": {
    "displayRoute": "3699",
    "startPoint": "Ch Brahm Parkash Ayurvedic Hospital",
    "lastPoint": "Tilak Nagar Terminal",
    "operator": "MATCH"
  },
  "3715": {
    "displayRoute": "3715",
    "startPoint": "Rani Khera Depot III",
    "lastPoint": "Rohini Sec 23 (Green Hill Aptt.)",
    "operator": "MATCH"
  },
  "3725": {
    "displayRoute": "3725",
    "startPoint": "Badli Railway Staion",
    "lastPoint": "JAT KHOR",
    "operator": "MATCH"
  },
  "3729": {
    "displayRoute": "153",
    "startPoint": "Mukherji Nagar Baandh",
    "lastPoint": "Shani Mandir Shiv Vihar / Hastsal JJ Colony",
    "operator": "MATCH"
  },
  "3744": {
    "displayRoute": "3744",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "3745": {
    "displayRoute": "3745",
    "startPoint": "Daraula Border",
    "lastPoint": "Nangali Jalib",
    "operator": "MATCH"
  },
  "3748": {
    "displayRoute": "952A",
    "startPoint": "Dhaula Kuan (Ring Road)",
    "lastPoint": "Harewali Village (T)",
    "operator": "MATCH"
  },
  "3758": {
    "displayRoute": "433A",
    "startPoint": "Central Workshop II",
    "lastPoint": "Safdurjung Terminal",
    "operator": "MATCH"
  },
  "0114(NS)": {
    "displayRoute": "114",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Qutubgarh Village (Terminal)",
    "operator": "DTC"
  },
  "0118EXT(NS) Ext": {
    "displayRoute": "118EXT",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mayur Vihar Phase III (T) Paper Market",
    "operator": "DTC"
  },
  "012(NS)": {
    "displayRoute": "12",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Bawana JJ Colony KL- Block / Bawana JJ Colony Terminal",
    "operator": "DTC"
  },
  "0131(NS)": {
    "displayRoute": "131",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Narela Terminal",
    "operator": "DTC"
  },
  "0236(NS)": {
    "displayRoute": "236",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "DTC"
  },
  "0261(NS)": {
    "displayRoute": "261",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Nand Nagari Terminal",
    "operator": "DTC"
  },
  "03": {
    "displayRoute": "3",
    "startPoint": "Shalimar Bagh Desu Colony",
    "lastPoint": "ISBT Sarai Kale Khan",
    "operator": "DTC"
  },
  "0405(NS)": {
    "displayRoute": "405",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "0419(NS)": {
    "displayRoute": "419",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Madangir DDA Flats / Madangir Village",
    "operator": "DTC"
  },
  "044(NS)": {
    "displayRoute": "44",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Okhla Extension (Abul Fazl Encalve)",
    "operator": "DTC"
  },
  "0502(NS)": {
    "displayRoute": "502",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Mehrauli Terminal",
    "operator": "DTC"
  },
  "0543A(NS)": {
    "displayRoute": "543A",
    "startPoint": "Kapashera Border",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "0604(NS)": {
    "displayRoute": "604",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Andheria Mor / Chhattar Pur Metro Station",
    "operator": "DTC"
  },
  "0729(NS)": {
    "displayRoute": "729",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "DTC"
  },
  "072(NS)": {
    "displayRoute": "72",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Najafgarh Terminal",
    "operator": "DTC"
  },
  "0740": {
    "displayRoute": "740",
    "startPoint": "Uttam Nagar Terminal",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "Delhi Transport Corporation"
  },
  "0740(NS)": {
    "displayRoute": "740",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "0753(NS)": {
    "displayRoute": "753",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "0901(NS)": {
    "displayRoute": "901",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "DTC"
  },
  "0926(NS)": {
    "displayRoute": "926",
    "startPoint": "PVC Market",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "DTC"
  },
  "0929(NS)": {
    "displayRoute": "929",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Mubarak Pur Dabas",
    "operator": "DTC"
  },
  "0943(NS)": {
    "displayRoute": "943",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "0AIRPORT EXP-4 (NS)": {
    "displayRoute": "0AIRPORT EXP-4",
    "startPoint": "ISBT Kashmiri Gate",
    "lastPoint": "IGI Airport Terminal 3",
    "operator": "DTC"
  },
  "0GL-23": {
    "displayRoute": "0GL-23",
    "startPoint": "Kashmiri Gate",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "Delhi Transport Corporation"
  },
  "0GL-23(NS)": {
    "displayRoute": "0GL-23",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "0OMS(-)(NS)": {
    "displayRoute": "0OMS(-)",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "operator": "DTC"
  },
  "0OMS(+)(NS)": {
    "displayRoute": "0OMS(+)",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "0TMS(+)(NS)": {
    "displayRoute": "0TMS(+)",
    "startPoint": "Netaji Subhas Place/Wazirpur Depot",
    "lastPoint": "Netaji Subhas Place/Wazirpur Depot",
    "operator": "DTC"
  },
  "0TMS(-)(NS)": {
    "displayRoute": "0TMS(-)",
    "startPoint": "Wazirpur Depot",
    "lastPoint": "Wazirpur Depot",
    "operator": "DTC"
  },
  "100A": {
    "displayRoute": "100A",
    "startPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "lastPoint": "Samaypur Badli Metro / Badli Railway Staion",
    "operator": "DTC"
  },
  "100A STL": {
    "displayRoute": "100A",
    "startPoint": "Samaypur Badli Metro / Badli Railway Staion",
    "lastPoint": "Rohini Depot II",
    "operator": "DTC"
  },
  "100 Ext": {
    "displayRoute": "100",
    "startPoint": "Samay Pur Badli",
    "lastPoint": "Kendriya Terminal (Church Road)",
    "operator": "DTC"
  },
  "102A": {
    "displayRoute": "102A",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "102A STL": {
    "displayRoute": "102A",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "Delhi Transit"
  },
  "102 STL": {
    "displayRoute": "102",
    "startPoint": "Rohini Sec 22 Terminal",
    "lastPoint": "Rani Khera Depot 3",
    "operator": "Delhi Transit"
  },
  "103B+": {
    "displayRoute": "103B+",
    "startPoint": "Botanic Garden Bus Station",
    "lastPoint": "Greater Noida Authority",
    "operator": "Delhi Transport Corporation"
  },
  "103B": {
    "displayRoute": "103B",
    "startPoint": "Botanical Garden Metro Station",
    "lastPoint": "Noida Sector 37",
    "operator": "Delhi Transport Corporation"
  },
  "103E": {
    "displayRoute": "103E",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Alipur Village GT Road",
    "operator": "Delhi Transit"
  },
  "103 STL": {
    "displayRoute": "103",
    "startPoint": "Rani Khera Depot 2",
    "lastPoint": "A-9 Narela",
    "operator": "DTC"
  },
  "105 STL": {
    "displayRoute": "105",
    "startPoint": "Mukhmel Pur Village",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "DTC"
  },
  "106A": {
    "displayRoute": "106A",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Bawana JJ Colony KL- Block / Bawana JJ Colony Terminal",
    "operator": "DTC"
  },
  "107 STL": {
    "displayRoute": "107",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Katewara Village",
    "operator": "Delhi Transit"
  },
  "108A": {
    "displayRoute": "108A",
    "startPoint": "Hari Nagar Shaheed Pawan Sahni Chowk",
    "lastPoint": "Shakti Nagar Nangia Park",
    "operator": "Delhi Transit"
  },
  "109A": {
    "displayRoute": "109A",
    "startPoint": "Bankner Village",
    "lastPoint": "Alipur Village GT Road",
    "operator": "Delhi Transit"
  },
  "109 STL": {
    "displayRoute": "109",
    "startPoint": "Bawana Sec 1 Cluster Depot",
    "lastPoint": "Bankner Village",
    "operator": "Delhi Transit"
  },
  "112A": {
    "displayRoute": "112A",
    "startPoint": "Safiabad Border Shiv Mandir",
    "lastPoint": "Alipur Village GT Road",
    "operator": "Delhi Transit"
  },
  "112 STL": {
    "displayRoute": "112",
    "startPoint": "Safiabad Border Shiv Mandir",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "113A": {
    "displayRoute": "113A",
    "startPoint": "Sannoth Village",
    "lastPoint": "Rohini Sec 16 (Maharaja Aggarsen Dharam Sthal)",
    "operator": "Delhi Transit"
  },
  "113 Ext": {
    "displayRoute": "113",
    "startPoint": "Ghoga Village",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "113 STL": {
    "displayRoute": "113",
    "startPoint": "Sannoth Village",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "114A": {
    "displayRoute": "114A",
    "startPoint": "Majlis Park Metro Station",
    "lastPoint": "Auchandi Border",
    "operator": "DTC"
  },
  "114A STL": {
    "displayRoute": "114A",
    "startPoint": "Rani Khera Depot 2",
    "lastPoint": "Auchandi Border",
    "operator": "Delhi Transit"
  },
  "114B": {
    "displayRoute": "114B",
    "startPoint": "Majlis Park Metro Station",
    "lastPoint": "Katewara Village",
    "operator": "DTC"
  },
  "114B STL": {
    "displayRoute": "114B",
    "startPoint": "Rani Khera Depot 2",
    "lastPoint": "Katevara Village",
    "operator": "Delhi Transit"
  },
  "114C": {
    "displayRoute": "114C",
    "startPoint": "Qutub Garh Village (T)",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "114C STL": {
    "displayRoute": "114C",
    "startPoint": "Qutubgarh Village (Terminal)",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "114 Ext": {
    "displayRoute": "114",
    "startPoint": "Majlis Park Metro Station",
    "lastPoint": "Jat Khor Crossing",
    "operator": "DTC"
  },
  "118 Ext": {
    "displayRoute": "118",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mayur Vihar Phase-3 Church / Mayur Vihar Ph-III paper Market",
    "operator": "DTC"
  },
  "118EXTN Ext": {
    "displayRoute": "118EXTN",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mayur Vihar Phase III (T) Paper Market",
    "operator": "Delhi Transit"
  },
  "119LNK STL": {
    "displayRoute": "119LNK",
    "startPoint": "Bawana Sec 1 Cluster Depot",
    "lastPoint": "Bawana Dispensary",
    "operator": "Delhi Transit"
  },
  "119 STL": {
    "displayRoute": "119",
    "startPoint": "Bawana Sec 5 Cluster Depot",
    "lastPoint": "Bajitpur Village",
    "operator": "Delhi Transit"
  },
  "120A": {
    "displayRoute": "120A",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Jahangir Puri Crossing",
    "operator": "Delhi Transit"
  },
  "120B": {
    "displayRoute": "120B",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Ghoga Village",
    "operator": "DTC"
  },
  "120C": {
    "displayRoute": "120C",
    "startPoint": "Pkt G-8 Narela",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "DTC"
  },
  "120C STL": {
    "displayRoute": "120C",
    "startPoint": "Pkt G-8 Narela",
    "lastPoint": "Narela EV Depot",
    "operator": "DTC"
  },
  "120E": {
    "displayRoute": "120E",
    "startPoint": "Ramdev Chowk Narela Terminal / A-5 Narela / Police Colony",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "DTC"
  },
  "120E STL": {
    "displayRoute": "120E",
    "startPoint": "Narela EV Depot",
    "lastPoint": "NARELA GOLDEN APARTMENT POCKET- A-1",
    "operator": "DTC"
  },
  "120 STL": {
    "displayRoute": "120",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "Delhi Transit"
  },
  "124 STL": {
    "displayRoute": "124",
    "startPoint": "Narela EV Depot",
    "lastPoint": "Mukhmel Pur Village",
    "operator": "DTC"
  },
  "125A- Ext": {
    "displayRoute": "125A-",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "125 Ext": {
    "displayRoute": "125",
    "startPoint": "Swaroop Nagar GT Road",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "125 STL": {
    "displayRoute": "125",
    "startPoint": "Narela EV Depot",
    "lastPoint": "Dahisara Border",
    "operator": "DTC"
  },
  "128 STL": {
    "displayRoute": "128",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Khera Khurd Community Center",
    "operator": "Delhi Transit"
  },
  "129 STL": {
    "displayRoute": "129",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Jhingola Village",
    "operator": "Delhi Transit"
  },
  "130A": {
    "displayRoute": "130A",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "Ghoga Village",
    "operator": "Delhi Transit"
  },
  "131 STL": {
    "displayRoute": "131",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Lampur Border",
    "operator": "DTC"
  },
  "133 STL": {
    "displayRoute": "133",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "136A": {
    "displayRoute": "136A",
    "startPoint": "Singhu Border Ramdev Marg",
    "lastPoint": "Ghoga Village",
    "operator": "Delhi Transit"
  },
  "136LNK STL": {
    "displayRoute": "136LNK",
    "startPoint": "Ghoga Village",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "137A": {
    "displayRoute": "137A",
    "startPoint": "Jahangir Puri Crossing / Jahangirpuri GT Road",
    "lastPoint": "Holambi Kalan Terminal",
    "operator": "Delhi Transit"
  },
  "137 STL": {
    "displayRoute": "137",
    "startPoint": "Holambi Kalan Terminal",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "138 STL": {
    "displayRoute": "138",
    "startPoint": "Hamidpur Village",
    "lastPoint": "GTK Depot",
    "operator": "DTC"
  },
  "139 STL": {
    "displayRoute": "139",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Bhalswa JJ Colony",
    "operator": "Delhi Transit"
  },
  "141A": {
    "displayRoute": "141A",
    "startPoint": "Rohini Sec 23 Pocket 1 (Green Hill Aptt.)",
    "lastPoint": "Inderlok Metro Station",
    "operator": "Delhi Transit"
  },
  "143A": {
    "displayRoute": "143A",
    "startPoint": "ISBT Anand Vihar",
    "lastPoint": "Burari Crossing",
    "operator": "Delhi Transit"
  },
  "143LINK STL": {
    "displayRoute": "143LINK",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "Delhi Transit"
  },
  "143 STL": {
    "displayRoute": "143",
    "startPoint": "Burari EV Depot (Outshed)",
    "lastPoint": "Azadpur Metro Station / Terminal",
    "operator": "Delhi Transit"
  },
  "144A": {
    "displayRoute": "144A",
    "startPoint": "Singhu Border GT Road",
    "lastPoint": "Kamala Market / Ajmeri Gate",
    "operator": "DTC"
  },
  "144 STL": {
    "displayRoute": "144",
    "startPoint": "Singhu School (T)",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "146 STL": {
    "displayRoute": "146",
    "startPoint": "GTK Depot",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "147 STL": {
    "displayRoute": "147",
    "startPoint": "Tiggi Pur Village",
    "lastPoint": "Rani Khera Depot 2",
    "operator": "Delhi Transit"
  },
  "148A": {
    "displayRoute": "148A",
    "startPoint": "Tikri Khurd",
    "lastPoint": "GTK Depot",
    "operator": "Delhi Transit"
  },
  "148 STL": {
    "displayRoute": "148",
    "startPoint": "Tikri Khurd",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "149B": {
    "displayRoute": "149B",
    "startPoint": "Old Delhi Railway Station (T)",
    "lastPoint": "Alipur Village GT Road",
    "operator": "Delhi Transit"
  },
  "153LINK STL": {
    "displayRoute": "153LINK",
    "startPoint": "Hastsal Village LIG Flats",
    "lastPoint": "Hari Nagar Depot 3",
    "operator": "Delhi Transit"
  },
  "153 STL": {
    "displayRoute": "153",
    "startPoint": "Shani Mandir Shiv Vihar / Hastsal JJ Colony",
    "lastPoint": "Hari Nagar Depot",
    "operator": "Delhi Transit"
  },
  "156 STL": {
    "displayRoute": "156",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "159 STL": {
    "displayRoute": "159",
    "startPoint": "Netaji Subash Place Depot",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "161A": {
    "displayRoute": "161A",
    "startPoint": "GTK Depot",
    "lastPoint": "Bawana Dispensary",
    "operator": "Delhi Transit"
  },
  "161 STL": {
    "displayRoute": "161",
    "startPoint": "Rani Khera Depot 3",
    "lastPoint": "Bawana Dispensary",
    "operator": "Delhi Transit"
  },
  "164A": {
    "displayRoute": "164A",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "Delhi Transit"
  },
  "164B": {
    "displayRoute": "164B",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Azadpur Metro Station",
    "operator": "Delhi Transit"
  },
  "164 STL": {
    "displayRoute": "164",
    "startPoint": "WEST ENCLAVE TERMINAL",
    "lastPoint": "Rohini Sec 37 E Bus Depot",
    "operator": "DTC"
  },
  "165A": {
    "displayRoute": "165A",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "165 STL": {
    "displayRoute": "165",
    "startPoint": "Burari EV Depot (Outshed)",
    "lastPoint": "Bhajanpura",
    "operator": "Delhi Transit"
  },
  "171 STL": {
    "displayRoute": "171",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Holambi Kalan JJ Colony",
    "operator": "Delhi Transit"
  },
  "172A": {
    "displayRoute": "172A",
    "startPoint": "Jahangir Puri Crossing / Jahangirpuri GT Road",
    "lastPoint": "Holambi Khurd",
    "operator": "Delhi Transit"
  },
  "172B": {
    "displayRoute": "172B",
    "startPoint": "Metro Vihar Holambi Khurd Terminal",
    "lastPoint": "Jahangirpuri Metro Station GT Road",
    "operator": "Delhi Transit"
  },
  "172E": {
    "displayRoute": "172E",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Metro Vihar Holambi Khurd Terminal",
    "operator": "Delhi Transit"
  },
  "172E STL": {
    "displayRoute": "172E",
    "startPoint": "Metro Vihar Holambi Khurd Terminal",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "172 STL": {
    "displayRoute": "172",
    "startPoint": "Holambi Khurd",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "173 STL": {
    "displayRoute": "173",
    "startPoint": "Sec A 5 Crossing Narela",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "Delhi Transit"
  },
  "174B": {
    "displayRoute": "174B",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Jounti Village Shivalaya",
    "operator": "DTC"
  },
  "174B STL": {
    "displayRoute": "174B",
    "startPoint": "Mangolpuri Y Block",
    "lastPoint": "Jonti Border",
    "operator": "Delhi Transit"
  },
  "174 STL": {
    "displayRoute": "174",
    "startPoint": "Majlis Park Metro Station",
    "lastPoint": "Jonti Border",
    "operator": "DTC"
  },
  "175 STL": {
    "displayRoute": "175",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Lampur Border (T)",
    "operator": "Delhi Transit"
  },
  "17 STL": {
    "displayRoute": "17",
    "startPoint": "RAMZAN PUR VILLAGE",
    "lastPoint": "Narela EV Depot",
    "operator": "DTC"
  },
  "181A": {
    "displayRoute": "181A",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "181 STL": {
    "displayRoute": "181",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Sunehari Pulla Depot",
    "operator": "Delhi Transit"
  },
  "182A": {
    "displayRoute": "182A",
    "startPoint": "Kanjhawala Depot (Narela Road)",
    "lastPoint": "ISBT Kashmere Gate Terminal",
    "operator": "DTC"
  },
  "182A STL": {
    "displayRoute": "182A",
    "startPoint": "Rohini Sec 37 E Bus Depot",
    "lastPoint": "Kanjhawala Village (T)",
    "operator": "DTC"
  },
  "185 STL": {
    "displayRoute": "185",
    "startPoint": "Natthupura Terminal",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "DTC"
  },
  "188LINK STL": {
    "displayRoute": "188LINK",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "Delhi Transit"
  },
  "188LNK STL": {
    "displayRoute": "188LNK",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "Delhi Transit"
  },
  "192 STL": {
    "displayRoute": "192",
    "startPoint": "Keshav Nagar Mukti Ashram",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "DTC"
  },
  "193A": {
    "displayRoute": "193A",
    "startPoint": "Ramdev Chowk Narela Terminal / A-5 Narela / Police Colony",
    "lastPoint": "GTK Depot",
    "operator": "Delhi Transit"
  },
  "193 STL": {
    "displayRoute": "193",
    "startPoint": "Ramdev Chowk (Narela)",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "19A": {
    "displayRoute": "19A",
    "startPoint": "Regal / Palika Kendra",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "19B": {
    "displayRoute": "19B",
    "startPoint": "Jama Masjid",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "202A": {
    "displayRoute": "202A",
    "startPoint": "Old Delhi Railway Station",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "205LINK STL": {
    "displayRoute": "205LINK",
    "startPoint": "Rajghat Depot",
    "lastPoint": "ISBT Nitayanand Marg",
    "operator": "Delhi Transit"
  },
  "205LNK STL": {
    "displayRoute": "205LNK",
    "startPoint": "Rajghat Depot",
    "lastPoint": "Old Delhi Railway Station (T)",
    "operator": "Delhi Transit"
  },
  "206A": {
    "displayRoute": "206A",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Bhajanpura",
    "operator": "DTC"
  },
  "207 STL": {
    "displayRoute": "207",
    "startPoint": "Yamuna Vihar Cluster Depot",
    "lastPoint": "Bhajanpura",
    "operator": "Delhi Transit"
  },
  "208A": {
    "displayRoute": "208A",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "208LNK STL": {
    "displayRoute": "208LNK",
    "startPoint": "New Seema Puri",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "211A STL": {
    "displayRoute": "211A",
    "startPoint": "Trilok Puri 26 Block",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "211B": {
    "displayRoute": "211B",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mayur Vihar Ph III Paper Market",
    "operator": "DTC"
  },
  "211B STL": {
    "displayRoute": "211B",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "211C": {
    "displayRoute": "211C",
    "startPoint": "Mayur Vihar Phase-3 Church / Mayur Vihar Ph-III paper Market",
    "lastPoint": "Id Ghah",
    "operator": "DTC"
  },
  "212B STL": {
    "displayRoute": "212B",
    "startPoint": "Sabha Pur X-ing",
    "lastPoint": "Nand Nagari Depot",
    "operator": "DTC"
  },
  "213 STL": {
    "displayRoute": "213",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Rajghat Depot",
    "operator": "DTC"
  },
  "214B": {
    "displayRoute": "214B",
    "startPoint": "New Seema Puri",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "DTC"
  },
  "215A": {
    "displayRoute": "215A",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "Bawana JJ Colony Terminal",
    "operator": "Delhi Transit"
  },
  "215 STL": {
    "displayRoute": "215",
    "startPoint": "Bawana Sec 5 Cluster Depot",
    "lastPoint": "Bawana JJ Colony Terminal",
    "operator": "Delhi Transit"
  },
  "218C STL": {
    "displayRoute": "218C",
    "startPoint": "Shadipur Depot",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "219 STL": {
    "displayRoute": "219",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Hiran Kudna Crossing",
    "operator": "DTC"
  },
  "227A": {
    "displayRoute": "227A",
    "startPoint": "Sabha Pur X-ing",
    "lastPoint": "Old Delhi Railway Station",
    "operator": "DTC"
  },
  "233 STL": {
    "displayRoute": "233",
    "startPoint": "Nihal Vihar Xing",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "DTC"
  },
  "234A": {
    "displayRoute": "234A",
    "startPoint": "Tilak Nagar Terminal / Tilak Nagar",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "DTC"
  },
  "234 STL": {
    "displayRoute": "234",
    "startPoint": "Shadipur Depot",
    "lastPoint": "GTB Nagar / GTB Nagar Metro Station",
    "operator": "DTC"
  },
  "236A": {
    "displayRoute": "236A",
    "startPoint": "Jai Vihar",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "236E": {
    "displayRoute": "236E",
    "startPoint": "Punjabi Bagh Terminal (Rohtak Road) / Punjabi Bagh Railway Colony",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "236 Ext": {
    "displayRoute": "236",
    "startPoint": "Savda Village",
    "lastPoint": "Anand Vihar (ISBT) / Gazi Pur Telco",
    "operator": "DTC"
  },
  "237A": {
    "displayRoute": "237A",
    "startPoint": "Babarpur Ext / Maujpur Crossing",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "243A": {
    "displayRoute": "243A",
    "startPoint": "Shakarpur Crossing",
    "lastPoint": "Hamdard Nagar",
    "operator": "Delhi Transport Corporation"
  },
  "254A": {
    "displayRoute": "254A",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Bhajanpura",
    "operator": "Delhi Transit"
  },
  "258SPL": {
    "displayRoute": "258SPL",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Chauhan Patti (Terminal)",
    "operator": "DTC"
  },
  "261LNK STL": {
    "displayRoute": "261LNK",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Rajghat Depot",
    "operator": "Delhi Transit"
  },
  "261 STL": {
    "displayRoute": "261",
    "startPoint": "Nand Nagri Depot",
    "lastPoint": "Gokul Puri Terminal / Gokul Puri",
    "operator": "DTC"
  },
  "274A": {
    "displayRoute": "274A",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Babarpur Ext / Maujpur Crossing",
    "operator": "Delhi Transit"
  },
  "274A STL": {
    "displayRoute": "274A",
    "startPoint": "Shahstri Park DMRC Depot",
    "lastPoint": "Seelampur Gt Road",
    "operator": "Delhi Transit"
  },
  "274 Ext": {
    "displayRoute": "274",
    "startPoint": "Yamuna Vihar Cluster Depot",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "274LNIK STL": {
    "displayRoute": "274LNIK",
    "startPoint": "Shahstri Park DMRC Depot",
    "lastPoint": "BabarPur Extension Terminal",
    "operator": "Delhi Transit"
  },
  "281A": {
    "displayRoute": "281A",
    "startPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "lastPoint": "A Block Dilshad Garden Bloomfield Public School",
    "operator": "Delhi Transit"
  },
  "281 STL": {
    "displayRoute": "281",
    "startPoint": "Yamuna Vihar Cluster Depot",
    "lastPoint": "Dilshad Garden Depot Cluster",
    "operator": "Delhi Transit"
  },
  "307A": {
    "displayRoute": "307A",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Mayur Vihar Phase 2 Pkt A / Mayur Vihar Phase-2 Market /(TERMINAL)",
    "operator": "DTC"
  },
  "307A STL": {
    "displayRoute": "307A",
    "startPoint": "RAJ GHAT DEPOT 3",
    "lastPoint": "RAJ GHAT DEPOT 3",
    "operator": "DTC"
  },
  "307B STL": {
    "displayRoute": "307B",
    "startPoint": "Rajghat Depot",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "DTC"
  },
  "307LNK STL": {
    "displayRoute": "307LNK",
    "startPoint": "Trilok Puri 13 Block",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "307 STL": {
    "displayRoute": "307",
    "startPoint": "Kamla Market / Ajmeri Gate / N.D RLY STATION GATE NO-2",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "310 STL": {
    "displayRoute": "310",
    "startPoint": "Rajghat Depot",
    "lastPoint": "Jheel Terminal",
    "operator": "Delhi Transit"
  },
  "311A": {
    "displayRoute": "311A",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "Delhi Transit"
  },
  "313LSPL": {
    "displayRoute": "313LSPL",
    "startPoint": "Inder Puri JJ Colony",
    "lastPoint": "Delhi Secretariat",
    "operator": "DTC"
  },
  "317A STL": {
    "displayRoute": "317A",
    "startPoint": "Rajghat Depot",
    "lastPoint": "Jheel Terminal",
    "operator": "DTC"
  },
  "317 STL": {
    "displayRoute": "317",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "318 STL": {
    "displayRoute": "318",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "319A": {
    "displayRoute": "319A",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Noida Sec 43 Police Chowki",
    "operator": "DTC"
  },
  "333 STL": {
    "displayRoute": "333",
    "startPoint": "C4 Yamuna Vihar Crossing / C-4 Yamuna Vihar",
    "lastPoint": "BBM Depot",
    "operator": "DTC"
  },
  "336A": {
    "displayRoute": "336A",
    "startPoint": "Safdarjung Airport",
    "lastPoint": "New Seemapuri",
    "operator": "Delhi Transport Corporation"
  },
  "33A": {
    "displayRoute": "33A",
    "startPoint": "Noida Sec-43 Police Chowki SadarPur",
    "lastPoint": "Chauhan Patti (Terminal)",
    "operator": "DTC"
  },
  "33ELINK STL": {
    "displayRoute": "33ELINK",
    "startPoint": "Ghazipur Depot (T)",
    "lastPoint": "New Seema Puri",
    "operator": "Delhi Transit"
  },
  "33LINK STL": {
    "displayRoute": "33LINK",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "New Seema Puri",
    "operator": "Delhi Transit"
  },
  "33LNK STL": {
    "displayRoute": "33LNK",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Dilshad Garden Depot Cluster",
    "operator": "Delhi Transit"
  },
  "340 STL": {
    "displayRoute": "340",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "New Seema Puri",
    "operator": "Delhi Transit"
  },
  "344 STL": {
    "displayRoute": "344",
    "startPoint": "Kalyan Puri Terminal",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "349A": {
    "displayRoute": "349A",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Mayur Vihar Phase-II Pocket-A",
    "operator": "DTC"
  },
  "34A": {
    "displayRoute": "34A",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Lado Sarai",
    "operator": "DTC"
  },
  "353 STL": {
    "displayRoute": "353",
    "startPoint": "Yamuna Vihar Cluster Depot",
    "lastPoint": "Babarpur Ext Terminal",
    "operator": "Delhi Transit"
  },
  "356LINK STL": {
    "displayRoute": "356LINK",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "Delhi Transit"
  },
  "356 STL": {
    "displayRoute": "356",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "375 STL": {
    "displayRoute": "375",
    "startPoint": "Dilshad Garden Depot Cluster",
    "lastPoint": "A Block Dilshad Garden Bloomfield Public School",
    "operator": "Delhi Transit"
  },
  "378 STL": {
    "displayRoute": "378",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "391 STL": {
    "displayRoute": "391",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "Kalyan Puri Terminal",
    "operator": "Delhi Transit"
  },
  "392B": {
    "displayRoute": "392B",
    "startPoint": "Noida Sec-62 (Electronic City)",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "DTC"
  },
  "392 STL": {
    "displayRoute": "392",
    "startPoint": "Noida Sec-62 (Electronic City)",
    "lastPoint": "Maya Puri Depot",
    "operator": "DTC"
  },
  "396 STL": {
    "displayRoute": "396",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Indraprastha Depot",
    "operator": "DTC"
  },
  "39A": {
    "displayRoute": "39A",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "DTC"
  },
  "39 STL": {
    "displayRoute": "39",
    "startPoint": "Jheel Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "403 STL": {
    "displayRoute": "403",
    "startPoint": "Okhla Extension (Abul Fazl Encalve)",
    "lastPoint": "Okhla Depot IV CWS IIb / Tehkhand Village",
    "operator": "DTC"
  },
  "405A": {
    "displayRoute": "405A",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "405D": {
    "displayRoute": "405D",
    "startPoint": "Delhi University / North Campus",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "405E": {
    "displayRoute": "405E",
    "startPoint": "Shri Ram College",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "405EA STL": {
    "displayRoute": "405EA",
    "startPoint": "Supreme Court",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "405ELINK STL": {
    "displayRoute": "405ELINK",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Delhi Sectt Gate No 7 (End)",
    "operator": "Delhi Transit"
  },
  "405 STL": {
    "displayRoute": "405",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Delhi Sectt Gate No 7 (End)",
    "operator": "DTC"
  },
  "408E": {
    "displayRoute": "408E",
    "startPoint": "Kendriya Terminal",
    "lastPoint": "New Delhi Post Office",
    "operator": "Delhi Transport Corporation"
  },
  "408 STL": {
    "displayRoute": "408",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "410A": {
    "displayRoute": "410A",
    "startPoint": "Subhash Nagar Crossing",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "Delhi Transport Corporation"
  },
  "410 STL": {
    "displayRoute": "410",
    "startPoint": "Subhash Nagar Crossing / Mukherji Park",
    "lastPoint": "Keshopur Depot",
    "operator": "DTC"
  },
  "411LNK STL": {
    "displayRoute": "411LNK",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "412 STL": {
    "displayRoute": "412",
    "startPoint": "Yamuna Vihar Cluster Depot",
    "lastPoint": "C 4 Yamuna Vihar crossing / Yamuna Vihar C-4 Terminal",
    "operator": "Delhi Transit"
  },
  "418A": {
    "displayRoute": "418A",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "419A": {
    "displayRoute": "419A",
    "startPoint": "Lado Sarai Firni Road (T)",
    "lastPoint": "Delhi Gate / Ambedkar Stadium / ARUN JETLI STADIUM",
    "operator": "Delhi Transit"
  },
  "425A": {
    "displayRoute": "425A",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Delhi Gate / Ambedkar Stadium / ARUN JETLI STADIUM",
    "operator": "Delhi Transit"
  },
  "427 STL": {
    "displayRoute": "427",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "DTC"
  },
  "429 STL": {
    "displayRoute": "429",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "DDA Flats KalkaJi",
    "operator": "DTC"
  },
  "433A": {
    "displayRoute": "433A",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Central Work Shop II",
    "operator": "DTC"
  },
  "433B": {
    "displayRoute": "433B",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "433 Ext": {
    "displayRoute": "433",
    "startPoint": "TUGHLAQABAD VILLAGE XING",
    "lastPoint": "Lajpat Nagar Ring Road",
    "operator": "DTC"
  },
  "433LINK STL": {
    "displayRoute": "433LINK",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "Delhi Transit"
  },
  "433 STL": {
    "displayRoute": "433",
    "startPoint": "TUGHLAQABAD VILLAGE XING",
    "lastPoint": "Okhla Depot IV CWS IIb / Tehkhand Village",
    "operator": "DTC"
  },
  "434 STL": {
    "displayRoute": "434",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "Jasola Vihar",
    "operator": "DTC"
  },
  "440A": {
    "displayRoute": "440A",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "445A": {
    "displayRoute": "445A",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "447 STL": {
    "displayRoute": "447",
    "startPoint": "Burari EV Depot (Inshed)",
    "lastPoint": "Bhalaswa Crossing / Bhalaswa Golf Course",
    "operator": "DTC"
  },
  "448A": {
    "displayRoute": "448A",
    "startPoint": "Punjabi Bagh Terminal",
    "lastPoint": "Hamdard Nagar",
    "operator": "Delhi Transport Corporation"
  },
  "448B": {
    "displayRoute": "448B",
    "startPoint": "Madipur JJ Colony Madipuri JJ Colony Metro Station",
    "lastPoint": "Ambedkar Nagar Terminal",
    "operator": "DTC"
  },
  "451A": {
    "displayRoute": "451A",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Meetha Pur Chowk",
    "operator": "DTC"
  },
  "456A": {
    "displayRoute": "456A",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Ambedkar Nagar Depot",
    "operator": "Delhi Transit"
  },
  "463 STL": {
    "displayRoute": "463",
    "startPoint": "SNPD DEPOT",
    "lastPoint": "Okhla Extension (Abul Fazl Encalve)",
    "operator": "DTC"
  },
  "465A": {
    "displayRoute": "465A",
    "startPoint": "Safdurjang Terminal",
    "lastPoint": "Meetha Pur Chowk",
    "operator": "DTC"
  },
  "473E": {
    "displayRoute": "473E",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "Delhi Transit"
  },
  "479A": {
    "displayRoute": "479A",
    "startPoint": "Wazirpur Depot",
    "lastPoint": "Badarpur Border",
    "operator": "Delhi Transport Corporation"
  },
  "47A": {
    "displayRoute": "47A",
    "startPoint": "Tehkhand Depot DTC",
    "lastPoint": "Inder Puri",
    "operator": "DTC"
  },
  "47ALNK STL": {
    "displayRoute": "47ALNK",
    "startPoint": "Tehkhand Depot DTC",
    "lastPoint": "Okhla Depot IV CWS IIb / Tehkhand Village",
    "operator": "Delhi Transit"
  },
  "47A STL": {
    "displayRoute": "47A",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "DTC"
  },
  "47B": {
    "displayRoute": "47B",
    "startPoint": "Tehkhand Depot DTC",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "Delhi Transit"
  },
  "480 STL": {
    "displayRoute": "480",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Krishi Bhawan / Rail Bhawan Metro Station / Central Secretariat Metro Station",
    "operator": "Delhi Transit"
  },
  "490LINK STL": {
    "displayRoute": "490LINK",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "C R Park",
    "operator": "Delhi Transit"
  },
  "501A": {
    "displayRoute": "501A",
    "startPoint": "Saket Court",
    "lastPoint": "Delhi High Court",
    "operator": "DTC"
  },
  "501A STL": {
    "displayRoute": "501A",
    "startPoint": "Rajghat Depot",
    "lastPoint": "Delhi High Court",
    "operator": "DTC"
  },
  "502A": {
    "displayRoute": "502A",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Delhi Gate",
    "operator": "Delhi Transit"
  },
  "506 STL": {
    "displayRoute": "506",
    "startPoint": "Lado Sarai Firni Road (T)",
    "lastPoint": "Jheer Khore Temple",
    "operator": "DTC"
  },
  "507B": {
    "displayRoute": "507B",
    "startPoint": "R K PURAM SEC1 2",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "DTC"
  },
  "507E": {
    "displayRoute": "507E",
    "startPoint": "Lajpat Nagar Ring Road / VINOBA PURI METRO STATAION",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "Delhi Transit"
  },
  "508 STL": {
    "displayRoute": "508",
    "startPoint": "VISHNU GARDEN NW CHOWK",
    "lastPoint": "Maya Puri Depot",
    "operator": "DTC"
  },
  "511A": {
    "displayRoute": "511A",
    "startPoint": "Dhaula Kuan ARSD College",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "511A STL": {
    "displayRoute": "511A",
    "startPoint": "Tehkhand Depot DTC",
    "lastPoint": "Badarpur Border (T)",
    "operator": "Delhi Transit"
  },
  "511BLNK STL": {
    "displayRoute": "511BLNK",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "Aurobindo College",
    "operator": "Delhi Transit"
  },
  "511E": {
    "displayRoute": "511E",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "Delhi Transit"
  },
  "522A": {
    "displayRoute": "522A",
    "startPoint": "R Block Rajendra Nagar",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "522B": {
    "displayRoute": "522B",
    "startPoint": "Lodhi Colony / LODHI ROAD CROSSING",
    "lastPoint": "Inderpuri Krishi Kunj (T)",
    "operator": "Delhi Transit"
  },
  "522SPL": {
    "displayRoute": "522SPL",
    "startPoint": "New Delhi Railway Station Gate Number 2",
    "lastPoint": "Sheikh Sarai",
    "operator": "Delhi Transport Corporation"
  },
  "522 STL": {
    "displayRoute": "522",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "DTC"
  },
  "523A": {
    "displayRoute": "523A",
    "startPoint": "Dhaula Kuan ARSD College",
    "lastPoint": "Chhatarpur Ext / Nanda Hospital",
    "operator": "Delhi Transit"
  },
  "525 STL": {
    "displayRoute": "525",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "529SPL": {
    "displayRoute": "529SPL",
    "startPoint": "Nihal Vihar Xing",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "534A": {
    "displayRoute": "534A",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "DTC"
  },
  "534E": {
    "displayRoute": "534E",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "539A": {
    "displayRoute": "539A",
    "startPoint": "Satyapuram Jharoda",
    "lastPoint": "Lado Sarai Firni Road (T)",
    "operator": "DTC"
  },
  "540A": {
    "displayRoute": "540A",
    "startPoint": "Tara Apartment",
    "lastPoint": "Safdarjung Terminal",
    "operator": "Delhi Transport Corporation"
  },
  "543A": {
    "displayRoute": "543A",
    "startPoint": "Kapashera Border",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "543A STL": {
    "displayRoute": "543A",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Ghazipur Depot (T)",
    "operator": "DTC"
  },
  "543B": {
    "displayRoute": "543B",
    "startPoint": "Lajpat Nagar Ring Road / Vinoba Puri Metro Station",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "Delhi Transit"
  },
  "543E STL": {
    "displayRoute": "543E",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Ghazipur Depot (T)",
    "operator": "Delhi Transit"
  },
  "544A": {
    "displayRoute": "544A",
    "startPoint": "R K PURAM SEC1 2",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "546A": {
    "displayRoute": "546A",
    "startPoint": "Hamdard Nagar / Sangam Vihar",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "Delhi Transit"
  },
  "546 STL": {
    "displayRoute": "546",
    "startPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "DTC"
  },
  "567A": {
    "displayRoute": "567A",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Mubarak Pur Crossing",
    "operator": "DTC"
  },
  "567B STL": {
    "displayRoute": "567B",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "Delhi Transit"
  },
  "567 STL": {
    "displayRoute": "567",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Ghuman Hera Depot 1",
    "operator": "Delhi Transit"
  },
  "568A": {
    "displayRoute": "568A",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "Delhi Transit"
  },
  "569A": {
    "displayRoute": "569A",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Maya Puri Crossing Ring Road",
    "operator": "Delhi Transit"
  },
  "569 Ext": {
    "displayRoute": "569",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Rohini Sec-22 Pocket -9",
    "operator": "DTC"
  },
  "578A": {
    "displayRoute": "578A",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "DTC"
  },
  "605A": {
    "displayRoute": "605A",
    "startPoint": "Vasant Kunj C8 (Vasant Kunj Road)",
    "lastPoint": "Delhi Gate / Ambedkar Stadium / ARUN JETLI STADIUM",
    "operator": "Delhi Transit"
  },
  "605B": {
    "displayRoute": "605B",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Nangal Dewat",
    "operator": "DTC"
  },
  "610A": {
    "displayRoute": "610A",
    "startPoint": "Nangal Dewat",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "DTC"
  },
  "610SPL": {
    "displayRoute": "610SPL",
    "startPoint": "Red Cross Road",
    "lastPoint": "R K Puram Sec2",
    "operator": "DTC"
  },
  "610 STL": {
    "displayRoute": "610",
    "startPoint": "Wazirpur Depot",
    "lastPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "operator": "DTC"
  },
  "611A": {
    "displayRoute": "611A",
    "startPoint": "subhash nagar",
    "lastPoint": "Mayur Vihar Phase 2 Pkt C Metro Station",
    "operator": "DTC"
  },
  "611B": {
    "displayRoute": "611B",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Lajpat Nagar Ring Road / VINOBA PURI METRO STATAION",
    "operator": "Delhi Transit"
  },
  "611BEXP": {
    "displayRoute": "611BEXP",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Mayur Vihar Phase III (T) Paper Market",
    "operator": "DTC"
  },
  "611E STL": {
    "displayRoute": "611E",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Ghazipur Depot (T)",
    "operator": "Delhi Transit"
  },
  "611 STL": {
    "displayRoute": "611",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "Delhi Transit"
  },
  "623LNK STL": {
    "displayRoute": "623LNK",
    "startPoint": "Shahdra Terminal",
    "lastPoint": "New Seema Puri",
    "operator": "Delhi Transit"
  },
  "624A": {
    "displayRoute": "624A",
    "startPoint": "Munirka Village (T)",
    "lastPoint": "Anand Vihar ISBT Main Road",
    "operator": "DTC"
  },
  "624 STL": {
    "displayRoute": "624",
    "startPoint": "Lodhi Colony",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "DTC"
  },
  "628 STL": {
    "displayRoute": "628",
    "startPoint": "Uttam Nagar Terminal (In Gate)",
    "lastPoint": "Ghuman Hera Depot 1",
    "operator": "Delhi Transit"
  },
  "631 STL": {
    "displayRoute": "631",
    "startPoint": "Shalimar Bagh BH Block",
    "lastPoint": "Wazirpur Depot",
    "operator": "DTC"
  },
  "680EXT": {
    "displayRoute": "680EXT",
    "startPoint": "NCERT",
    "lastPoint": "DDA Flats Munirka",
    "operator": "Delhi Transport Corporation"
  },
  "706A": {
    "displayRoute": "706A",
    "startPoint": "Kapashera Border",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "Delhi Transit"
  },
  "706 STL": {
    "displayRoute": "706",
    "startPoint": "Kapashera Border",
    "lastPoint": "Dwarka Sec 22 Cluster Depot",
    "operator": "DTC"
  },
  "708 STL": {
    "displayRoute": "708",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "Delhi Transit"
  },
  "709A": {
    "displayRoute": "709A",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Rajdhani College",
    "operator": "Delhi Transit"
  },
  "711A": {
    "displayRoute": "711A",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "DTC"
  },
  "715A": {
    "displayRoute": "715A",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "717A": {
    "displayRoute": "717A",
    "startPoint": "Kapashera Border",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "717B": {
    "displayRoute": "717B",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "717E": {
    "displayRoute": "717E",
    "startPoint": "Kapashera Border",
    "lastPoint": "Ambedkar Nagar Depot",
    "operator": "Delhi Transit"
  },
  "717LINK STL": {
    "displayRoute": "717LINK",
    "startPoint": "Okhla Depot IV CWS II",
    "lastPoint": "C9 Vasant Kunj",
    "operator": "Delhi Transit"
  },
  "718 STL": {
    "displayRoute": "718",
    "startPoint": "Dwarka Sec21 Metro Station",
    "lastPoint": "Dwarka Sec-2 Depot",
    "operator": "DTC"
  },
  "719A": {
    "displayRoute": "719A",
    "startPoint": "Sunehari Pulla Depot",
    "lastPoint": "Kapashera Border",
    "operator": "Delhi Transit"
  },
  "721B": {
    "displayRoute": "721B",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "D Block Janak Puri",
    "operator": "Delhi Transit"
  },
  "724A": {
    "displayRoute": "724A",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "724 Ext": {
    "displayRoute": "724",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Dwarka Sec-19 Pkt. -3",
    "operator": "DTC"
  },
  "727B": {
    "displayRoute": "727B",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "BINDA PUR TERMINAL",
    "operator": "Delhi Transit"
  },
  "727B STL": {
    "displayRoute": "727B",
    "startPoint": "BINDA PUR TERMINAL",
    "lastPoint": "Dwarka Sec-2 Depot",
    "operator": "DTC"
  },
  "727 STL": {
    "displayRoute": "727",
    "startPoint": "Dwarka Sec 2/6",
    "lastPoint": "Dwarka Metro Station",
    "operator": "DTC"
  },
  "728A": {
    "displayRoute": "728A",
    "startPoint": "Shyam Vihar pahse 1",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "Delhi Transit"
  },
  "728B": {
    "displayRoute": "728B",
    "startPoint": "Goyla Dairy / Nehru Bus Stand",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "Delhi Transit"
  },
  "728E": {
    "displayRoute": "728E",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Kair Depot",
    "operator": "Delhi Transit"
  },
  "728LNK STL": {
    "displayRoute": "728LNK",
    "startPoint": "Kair Depot",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "Delhi Transit"
  },
  "729B": {
    "displayRoute": "729B",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Kapashera Border",
    "operator": "Delhi Transit"
  },
  "73LNK STL": {
    "displayRoute": "73LNK",
    "startPoint": "Rajghat Depot",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "73 STL": {
    "displayRoute": "73",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Ghazipur Depot (T)",
    "operator": "DTC"
  },
  "740A": {
    "displayRoute": "740A",
    "startPoint": "Manglapuri / Palam Village",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "DTC"
  },
  "740B": {
    "displayRoute": "740B",
    "startPoint": "Government Model School",
    "lastPoint": "Bindapur Terminal",
    "operator": "Delhi Transport Corporation"
  },
  "740C": {
    "displayRoute": "740C",
    "startPoint": "Dichau Kalan Depot",
    "lastPoint": "Jivan park",
    "operator": "DTC"
  },
  "740EX": {
    "displayRoute": "740EX",
    "startPoint": "Uttam Nagar Terminal",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "Delhi Transport Corporation"
  },
  "740 Ext": {
    "displayRoute": "740",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "DTC"
  },
  "741B": {
    "displayRoute": "741B",
    "startPoint": "Mangolpuri Y Block",
    "lastPoint": "Jonti Village",
    "operator": "Delhi Transit"
  },
  "741 STL": {
    "displayRoute": "741",
    "startPoint": "Jonti Village Shivalaya / Jonti Village",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "743B": {
    "displayRoute": "743B",
    "startPoint": "Pochan Pur Village Dwarka Sec 23",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "Delhi Transit"
  },
  "743E": {
    "displayRoute": "743E",
    "startPoint": "RK Puram Sec 1",
    "lastPoint": "Pochan Pur Village Dwarka Sec 23",
    "operator": "Delhi Transit"
  },
  "751A": {
    "displayRoute": "751A",
    "startPoint": "Mayapuri Metro Station",
    "lastPoint": "Kakrola Village (Mata Sahaj Kaur Barat Bhawan)",
    "operator": "DTC"
  },
  "752A": {
    "displayRoute": "752A",
    "startPoint": "East Patel Nagar",
    "lastPoint": "BAMNOLI VILLAGE",
    "operator": "DTC"
  },
  "761 STL": {
    "displayRoute": "761",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Keshopur Depot",
    "operator": "DTC"
  },
  "763A": {
    "displayRoute": "763A",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Mayapuri Depot Crossing",
    "operator": "Delhi Transit"
  },
  "764B": {
    "displayRoute": "764B",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "BINDA PUR TERMINAL",
    "operator": "DTC"
  },
  "764B STL": {
    "displayRoute": "764B",
    "startPoint": "Dwarka Sec-2 Depot",
    "lastPoint": "BINDA PUR TERMINAL",
    "operator": "DTC"
  },
  "764 STL": {
    "displayRoute": "764",
    "startPoint": "Dwarka Sec-2 Depot",
    "lastPoint": "Najafghar Dhansa Stand More / Dhansa Stand Najafgarh Metro Station",
    "operator": "DTC"
  },
  "770A": {
    "displayRoute": "770A",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Delhi Secretariat",
    "operator": "DTC"
  },
  "770ALTD": {
    "displayRoute": "770ALTD",
    "startPoint": "Surehra Village",
    "lastPoint": "Krishi Bhawan",
    "operator": "Delhi Transit"
  },
  "770C": {
    "displayRoute": "770C",
    "startPoint": "Madhu Vihar",
    "lastPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "operator": "Delhi Transit"
  },
  "772A STL": {
    "displayRoute": "772A",
    "startPoint": "Dwarka Sec8 Metro Station",
    "lastPoint": "Dwarka Sec 22 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "774B": {
    "displayRoute": "774B",
    "startPoint": "Vasant Vihar Depot / Poorvi Marg RK Puram Sec 5",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "Delhi Transit"
  },
  "775E": {
    "displayRoute": "775E",
    "startPoint": "Pochan Pur Village Dwarka Sec 23",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "Delhi Transit"
  },
  "775LINK STL": {
    "displayRoute": "775LINK",
    "startPoint": "Mangla Puri Terminal",
    "lastPoint": "Dwarka Sec 22 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "776 STL": {
    "displayRoute": "776",
    "startPoint": "Uttam Nagar Terminal (In Gate)",
    "lastPoint": "Hari Nagar Depot",
    "operator": "Delhi Transit"
  },
  "783 Ext": {
    "displayRoute": "783",
    "startPoint": "Rail Bhawan Metro Station / Krishi Bhawan / Central Secretariat Metro Station",
    "lastPoint": "Dada Dev Mandir",
    "operator": "DTC"
  },
  "784A": {
    "displayRoute": "784A",
    "startPoint": "ISBT Nityanand Marg",
    "lastPoint": "Gokul Puri Terminal / Gokul Puri",
    "operator": "Delhi Transit"
  },
  "784LINK STL": {
    "displayRoute": "784LINK",
    "startPoint": "Shahstri Park DMRC Depot",
    "lastPoint": "Gokul Puri Terminal / Gokul Puri",
    "operator": "Delhi Transit"
  },
  "784 STL": {
    "displayRoute": "784",
    "startPoint": "Yamuna Vihar Cluster Depot",
    "lastPoint": "Gokul Puri Terminal / Gokul Puri",
    "operator": "Delhi Transit"
  },
  "78B STL": {
    "displayRoute": "78B",
    "startPoint": "Shadipur Depot",
    "lastPoint": "Sarai Rohila",
    "operator": "DTC"
  },
  "790B": {
    "displayRoute": "790B",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "Delhi Transit"
  },
  "792A": {
    "displayRoute": "792A",
    "startPoint": "Dhaula Kuan (NH8)",
    "lastPoint": "Bharthal Village",
    "operator": "Delhi Transit"
  },
  "792 STL": {
    "displayRoute": "792",
    "startPoint": "Dwarka sector 22 Cluster Depot",
    "lastPoint": "Bharthal Village",
    "operator": "Delhi Transit"
  },
  "794A STL": {
    "displayRoute": "794A",
    "startPoint": "Dwarka Sec 2/6",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "DTC"
  },
  "801A": {
    "displayRoute": "801A",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Dwarka Sec 8 Metro Station",
    "operator": "Delhi Transit"
  },
  "801LNK STL": {
    "displayRoute": "801LNK",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Dwarka sector 22 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "801 STL": {
    "displayRoute": "801",
    "startPoint": "IGI Airport Terminal 3",
    "lastPoint": "Dwarka Sec-2 Depot",
    "operator": "DTC"
  },
  "803 STL": {
    "displayRoute": "803",
    "startPoint": "Madhu Vihar",
    "lastPoint": "Dwarka Sec-2 Depot",
    "operator": "DTC"
  },
  "805A": {
    "displayRoute": "805A",
    "startPoint": "Saint Stephen's Hospital",
    "lastPoint": "Kashmere Gate ISBT",
    "operator": "Delhi Transport Corporation"
  },
  "806 STL": {
    "displayRoute": "806",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Paprawat Village",
    "operator": "Delhi Transit"
  },
  "807A": {
    "displayRoute": "807A",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "Delhi Transit"
  },
  "807B": {
    "displayRoute": "807B",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "East Patel Nagar",
    "operator": "Delhi Transit"
  },
  "808ST": {
    "displayRoute": "808ST",
    "startPoint": "Rohini Sec 37 E Bus Depot",
    "lastPoint": "QBlock Mangolpuri",
    "operator": "Delhi Transit"
  },
  "808 STL": {
    "displayRoute": "808",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "Rohini Sec 37 E Bus Depot",
    "operator": "Delhi Transit"
  },
  "810 STL": {
    "displayRoute": "810",
    "startPoint": "Tilak Nagar Terminal / Tilak Nagar",
    "lastPoint": "Naraina Depot",
    "operator": "DTC"
  },
  "813LNK STL": {
    "displayRoute": "813LNK",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "BBM Depot",
    "operator": "Delhi Transit"
  },
  "816B": {
    "displayRoute": "816B",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Inderlok Metro Station",
    "operator": "Delhi Transit"
  },
  "817B STL": {
    "displayRoute": "817B",
    "startPoint": "Samaspur Khalsa",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "Delhi Transit"
  },
  "817E STL": {
    "displayRoute": "817E",
    "startPoint": "Kair Depot",
    "lastPoint": "Dichau Kalan School",
    "operator": "Delhi Transit"
  },
  "817 Ext": {
    "displayRoute": "817",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Kair Village",
    "operator": "Delhi Transit"
  },
  "817LNK STL": {
    "displayRoute": "817LNK",
    "startPoint": "Kair Village",
    "lastPoint": "Kair Depot",
    "operator": "Delhi Transit"
  },
  "817N": {
    "displayRoute": "817N",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "ISBT Kashmiri Gate",
    "operator": "DTC"
  },
  "817N STL": {
    "displayRoute": "817N",
    "startPoint": "Kair Depot",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "Delhi Transit"
  },
  "818A": {
    "displayRoute": "818A",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Jhatikra Village",
    "operator": "Delhi Transit"
  },
  "818A STL": {
    "displayRoute": "818A",
    "startPoint": "Kair Depot",
    "lastPoint": "Jhatikra Village",
    "operator": "Delhi Transit"
  },
  "818B": {
    "displayRoute": "818B",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Jhatikra Village",
    "operator": "Delhi Transit"
  },
  "818B STL": {
    "displayRoute": "818B",
    "startPoint": "Keshopur Depot",
    "lastPoint": "Tilak Nagar Terminal / Tilak Nagar",
    "operator": "DTC"
  },
  "818 STL": {
    "displayRoute": "818",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Jhatikra Village",
    "operator": "DTC"
  },
  "822 STL": {
    "displayRoute": "822",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Issapur Village Temple",
    "operator": "Delhi Transit"
  },
  "824 STL": {
    "displayRoute": "824",
    "startPoint": "Pandwala Khurd",
    "lastPoint": "Kair Depot",
    "operator": "Delhi Transit"
  },
  "825A": {
    "displayRoute": "825A",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Jharoda Kalan",
    "operator": "DTC"
  },
  "825ALINK STL": {
    "displayRoute": "825ALINK",
    "startPoint": "Satyapuram Jharoda",
    "lastPoint": "Kair Depot",
    "operator": "Delhi Transit"
  },
  "825A STL": {
    "displayRoute": "825A",
    "startPoint": "Kair Depot",
    "lastPoint": "Satyapuram Jharoda",
    "operator": "DTC"
  },
  "825B STL": {
    "displayRoute": "825B",
    "startPoint": "Satyapuram Jharoda",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "Delhi Transit"
  },
  "826LINK STL": {
    "displayRoute": "826LINK",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Choudhary Bhram Prakash Ayurvedic Hospital",
    "operator": "Delhi Transit"
  },
  "826 STL": {
    "displayRoute": "826",
    "startPoint": "Khera Dabar Village",
    "lastPoint": "Kair Depot",
    "operator": "Delhi Transit"
  },
  "827E": {
    "displayRoute": "827E",
    "startPoint": "Uttam Nagar Terminal (In Gate)",
    "lastPoint": "Dauralla Border",
    "operator": "Delhi Transit"
  },
  "827E STL": {
    "displayRoute": "827E",
    "startPoint": "Dauralla Border",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "Delhi Transit"
  },
  "827LNK STL": {
    "displayRoute": "827LNK",
    "startPoint": "Samaspur Khalsa",
    "lastPoint": "Kair Depot",
    "operator": "Delhi Transit"
  },
  "828A": {
    "displayRoute": "828A",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Galib Pur Village",
    "operator": "Delhi Transit"
  },
  "828E": {
    "displayRoute": "828E",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Galib Pur Village",
    "operator": "Delhi Transit"
  },
  "828LNK STL": {
    "displayRoute": "828LNK",
    "startPoint": "Kair Depot",
    "lastPoint": "Galib Pur Village",
    "operator": "Delhi Transit"
  },
  "828LTD": {
    "displayRoute": "828LTD",
    "startPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "lastPoint": "Galib Pur Village",
    "operator": "Delhi Transit"
  },
  "832A": {
    "displayRoute": "832A",
    "startPoint": "Karampura Terminal",
    "lastPoint": "C1 Janak Puri",
    "operator": "DTC"
  },
  "832 STL": {
    "displayRoute": "832",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "Shadipur Depot",
    "operator": "DTC"
  },
  "833A": {
    "displayRoute": "833A",
    "startPoint": "Shyam Vihar pahse 1",
    "lastPoint": "Karampura Terminal",
    "operator": "Delhi Transit"
  },
  "833LNK STL": {
    "displayRoute": "833LNK",
    "startPoint": "Kair Depot",
    "lastPoint": "Goyla Dairy / Nehru Bus Stand",
    "operator": "Delhi Transit"
  },
  "833 STL": {
    "displayRoute": "833",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Goyla Dairy / Nehru Bus Stand",
    "operator": "Delhi Transit"
  },
  "835 STL": {
    "displayRoute": "835",
    "startPoint": "MUNDHELA KALAN DEPOT",
    "lastPoint": "Dhansa Village",
    "operator": "DTC"
  },
  "836LNK STL": {
    "displayRoute": "836LNK",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Mundhela Khurd Village",
    "operator": "Delhi Transit"
  },
  "836 STL": {
    "displayRoute": "836",
    "startPoint": "MUNDHELA KALAN DEPOT",
    "lastPoint": "Najafgarh Terminal",
    "operator": "DTC"
  },
  "844E": {
    "displayRoute": "844E",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Sarang Pur Village",
    "operator": "Delhi Transit"
  },
  "844LNK STL": {
    "displayRoute": "844LNK",
    "startPoint": "Sarang Pur Village",
    "lastPoint": "Ghuman Hera Depot 1",
    "operator": "Delhi Transit"
  },
  "847A": {
    "displayRoute": "847A",
    "startPoint": "New Seema Puri",
    "lastPoint": "Inderlok Metro Station",
    "operator": "Delhi Transit"
  },
  "849 STL": {
    "displayRoute": "849",
    "startPoint": "Rani Khera Depot 2",
    "lastPoint": "Qamruddin Nagar Terminal",
    "operator": "Delhi Transit"
  },
  "850B": {
    "displayRoute": "850B",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "D Block Janakpuri (Pankha Road)",
    "operator": "Delhi Transit"
  },
  "850LTD": {
    "displayRoute": "850LTD",
    "startPoint": "Krishi Bhawan",
    "lastPoint": "Ghuman Hera Village",
    "operator": "Delhi Transit"
  },
  "850 STL": {
    "displayRoute": "850",
    "startPoint": "Kair Depot",
    "lastPoint": "Ghuman Hera Village",
    "operator": "Delhi Transit"
  },
  "859A": {
    "displayRoute": "859A",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "Delhi Transit"
  },
  "859 STL": {
    "displayRoute": "859",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "85A Ext": {
    "displayRoute": "85A",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "85 Ext": {
    "displayRoute": "85",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "85 STL": {
    "displayRoute": "85",
    "startPoint": "WEST ENCLAVE TERMINAL",
    "lastPoint": "Rohini Depot 1 Sec 6 (Ambedkar Hospital) / D Mall Sec-10",
    "operator": "DTC"
  },
  "861A": {
    "displayRoute": "861A",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "Jahangirpuri EBlock",
    "operator": "DTC"
  },
  "872 STL": {
    "displayRoute": "872",
    "startPoint": "Surakh Pur Village",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "Delhi Transit"
  },
  "876LINK STL": {
    "displayRoute": "876LINK",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Dichau Kalan School",
    "operator": "Delhi Transit"
  },
  "878_": {
    "displayRoute": "878_",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Malik Pur Village",
    "operator": "Delhi Transit"
  },
  "879A": {
    "displayRoute": "879A",
    "startPoint": "Samaypur Badli Metro / Badli Railway Staion",
    "lastPoint": "D Block Janak Puri",
    "operator": "DTC"
  },
  "879B": {
    "displayRoute": "879B",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "D Block Janak Puri",
    "operator": "DTC"
  },
  "879 STL": {
    "displayRoute": "879",
    "startPoint": "Hari Nagar Depot",
    "lastPoint": "D Block Janak Puri (Pankha Road)",
    "operator": "Delhi Transit"
  },
  "882A": {
    "displayRoute": "882A",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "operator": "DTC"
  },
  "882A STL": {
    "displayRoute": "882A",
    "startPoint": "Sec A9 Narela / Narela Pocket 13",
    "lastPoint": "Narela EV Depot",
    "operator": "DTC"
  },
  "883B_LTD_": {
    "displayRoute": "883B_LTD_",
    "startPoint": "Samaspur Khalsa",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "Delhi Transit"
  },
  "883 STL": {
    "displayRoute": "883",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "Nangloi Depot / Jwala Puri",
    "operator": "DTC"
  },
  "885E": {
    "displayRoute": "885E",
    "startPoint": "Uttam Nagar Terminal",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "Delhi Transit"
  },
  "885 STL": {
    "displayRoute": "885",
    "startPoint": "Rewla Khanpur Village",
    "lastPoint": "Rewla Khanpur Depot",
    "operator": "Delhi Transit"
  },
  "886A": {
    "displayRoute": "886A",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Kapashera Border",
    "operator": "Delhi Transit"
  },
  "886 STL": {
    "displayRoute": "886",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Najafgarh Terminal",
    "operator": "Delhi Transit"
  },
  "887 STL": {
    "displayRoute": "887",
    "startPoint": "Ghuman Hera Depot 1",
    "lastPoint": "GHUMANHERA HOLI CHOWK",
    "operator": "DTC"
  },
  "889 STL": {
    "displayRoute": "889",
    "startPoint": "Rohini Sec11 (Aggarwal Sabha) / Rohini SFS Flats",
    "lastPoint": "Rohini Depot 1 Sec 6 (Ambedkar Hospital) / D Mall Sec-10",
    "operator": "DTC"
  },
  "88A": {
    "displayRoute": "88A",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "891 STL": {
    "displayRoute": "891",
    "startPoint": "GTK Depot",
    "lastPoint": "E Block Jahangir Puri Terminal",
    "operator": "DTC"
  },
  "892D STL": {
    "displayRoute": "892D",
    "startPoint": "Dwarka Sec-2 Depot",
    "lastPoint": "Bamnoli / Bamnoli Crossing",
    "operator": "DTC"
  },
  "892SPL": {
    "displayRoute": "892SPL",
    "startPoint": "Dhool Siras",
    "lastPoint": "Chhawla School",
    "operator": "DTC"
  },
  "892 STL": {
    "displayRoute": "892",
    "startPoint": "Nanak Heri Village",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "Delhi Transit"
  },
  "893A": {
    "displayRoute": "893A",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "East Patel Nagar",
    "operator": "Delhi Transit"
  },
  "8A": {
    "displayRoute": "8A",
    "startPoint": "Noida Ph 2 Phool Mandi",
    "lastPoint": "Nehru Place",
    "operator": "DTC"
  },
  "901A": {
    "displayRoute": "901A",
    "startPoint": "Mangol Puri Y Block",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "Delhi Transit"
  },
  "901 STL": {
    "displayRoute": "901",
    "startPoint": "Mangolpuri Y Block",
    "lastPoint": "Rohini Sec 37 E Bus Depot",
    "operator": "Delhi Transit"
  },
  "903 STL": {
    "displayRoute": "903",
    "startPoint": "Shadipur Depot",
    "lastPoint": "RBlock Rajendra Nagar",
    "operator": "DTC"
  },
  "905A": {
    "displayRoute": "905A",
    "startPoint": "Saint Stephen's Hospital",
    "lastPoint": "ISBT Nityanand Marg",
    "operator": "Delhi Transport Corporation"
  },
  "905 STL": {
    "displayRoute": "905",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "910A": {
    "displayRoute": "910A",
    "startPoint": "Nihal Vihar T Point",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "DTC"
  },
  "910 STL": {
    "displayRoute": "910",
    "startPoint": "Sayed Gaon Nangloi (T)",
    "lastPoint": "Nangloi Depot / Jwala Puri",
    "operator": "DTC"
  },
  "917A": {
    "displayRoute": "917A",
    "startPoint": "Madipur JJ Colony Madipuri JJ Colony Metro Station",
    "lastPoint": "Delhi Sachivalaya (Rajghat Power House)",
    "operator": "Delhi Transit"
  },
  "918 STL": {
    "displayRoute": "918",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Nangloi Depot / Jwala Puri",
    "operator": "DTC"
  },
  "919 STL": {
    "displayRoute": "919",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "91EXP": {
    "displayRoute": "91EXP",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "ROHINI SEC-11 EXTN SFS FLTS",
    "operator": "DTC"
  },
  "921A Ext": {
    "displayRoute": "921A",
    "startPoint": "Mubarakpur Dabas Village",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "921 Ext": {
    "displayRoute": "921",
    "startPoint": "Mubarakpur Dabas Village",
    "lastPoint": "ISBT Kashmiri Gate",
    "operator": "Delhi Transit"
  },
  "921 STL": {
    "displayRoute": "921",
    "startPoint": "Rani Khera Village",
    "lastPoint": "Rani Khera Depot 3",
    "operator": "DTC"
  },
  "923A_": {
    "displayRoute": "923A_",
    "startPoint": "Nangloi Metro Station",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "Delhi Transit"
  },
  "926A": {
    "displayRoute": "926A",
    "startPoint": "Tikri Border M Stn (T)",
    "lastPoint": "Peera Garhi Chowk",
    "operator": "Delhi Transit"
  },
  "926 STL": {
    "displayRoute": "926",
    "startPoint": "Nangloi Depot / Jwala Puri",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "928A": {
    "displayRoute": "928A",
    "startPoint": "Nangloi Metro Station",
    "lastPoint": "Garhi Randhala",
    "operator": "Delhi Transit"
  },
  "928 STL": {
    "displayRoute": "928",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Garhi Randhala",
    "operator": "Delhi Transit"
  },
  "929E": {
    "displayRoute": "929E",
    "startPoint": "Zakhira (Rohtak Road)",
    "lastPoint": "Mubarakpur Dabas Village",
    "operator": "Delhi Transit"
  },
  "932 STL": {
    "displayRoute": "932",
    "startPoint": "Mangolpuri Y Block",
    "lastPoint": "Rohini Sec 37 E Bus Depot",
    "operator": "DTC"
  },
  "934A": {
    "displayRoute": "934A",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Neelwal Village 2",
    "operator": "DTC"
  },
  "934A STL": {
    "displayRoute": "934A",
    "startPoint": "Nangloi Depot / Jwala Puri",
    "lastPoint": "Dichau Kalan School",
    "operator": "DTC"
  },
  "937A": {
    "displayRoute": "937A",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Old Delhi Railway Station (Fatehpuri)",
    "operator": "DTC"
  },
  "938A": {
    "displayRoute": "938A",
    "startPoint": "Tikri Border",
    "lastPoint": "Majlis Park Metro Station",
    "operator": "DTC"
  },
  "938B": {
    "displayRoute": "938B",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Mundka Village (Metro Station)",
    "operator": "Delhi Transit"
  },
  "938B STL": {
    "displayRoute": "938B",
    "startPoint": "Rani Khera Depot 3",
    "lastPoint": "Mundka Village (Metro Station)",
    "operator": "Delhi Transit"
  },
  "938E": {
    "displayRoute": "938E",
    "startPoint": "Qamruddin Nagar Terminal",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transit"
  },
  "939 STL": {
    "displayRoute": "939",
    "startPoint": "Rani Khera Depot 3",
    "lastPoint": "D Block Mangolpuri",
    "operator": "Delhi Transit"
  },
  "940A": {
    "displayRoute": "940A",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "East Patel Nagar",
    "operator": "Delhi Transit"
  },
  "940LINK STL": {
    "displayRoute": "940LINK",
    "startPoint": "Ghuman Hera Village",
    "lastPoint": "Ghuman Hera Depot 1",
    "operator": "Delhi Transit"
  },
  "941A": {
    "displayRoute": "941A",
    "startPoint": "Qutubgarh Village (Terminal)",
    "lastPoint": "N.D. Rly. Station Gate No. 2 / Ajmeri Gate",
    "operator": "DTC"
  },
  "942 STL": {
    "displayRoute": "942",
    "startPoint": "Kair Village",
    "lastPoint": "Hari Nagar Depot",
    "operator": "Delhi Transit"
  },
  "943 STL": {
    "displayRoute": "943",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "944A STL": {
    "displayRoute": "944A",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Rohini Sec 37 E Bus Depot",
    "operator": "Delhi Transit"
  },
  "944LINK STL": {
    "displayRoute": "944LINK",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Kendriya Terminal (Church Road) / North Block Lane",
    "operator": "DTC"
  },
  "944 STL": {
    "displayRoute": "944",
    "startPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "945A": {
    "displayRoute": "945A",
    "startPoint": "QBlock Mangolpuri",
    "lastPoint": "Keshav Nagar Mukti Ashram",
    "operator": "Delhi Transit"
  },
  "945LINK STL": {
    "displayRoute": "945LINK",
    "startPoint": "E Block Jahangir Puri Terminal",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "Delhi Transit"
  },
  "945 STL": {
    "displayRoute": "945",
    "startPoint": "Keshav Nagar Mukti Ashram",
    "lastPoint": "Burari EV Depot (Inshed)",
    "operator": "DTC"
  },
  "946 STL": {
    "displayRoute": "946",
    "startPoint": "Indraprastha Depot",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "947A": {
    "displayRoute": "947A",
    "startPoint": "Savda JJ Colony",
    "lastPoint": "Bhati Mines (T)",
    "operator": "DTC"
  },
  "949A": {
    "displayRoute": "949A",
    "startPoint": "Savda Village",
    "lastPoint": "Jheel Terminal",
    "operator": "DTC"
  },
  "949 Ext": {
    "displayRoute": "949",
    "startPoint": "Savda JJ Colony",
    "lastPoint": "ISBT Sarai Kale Khan",
    "operator": "DTC"
  },
  "952A": {
    "displayRoute": "952A",
    "startPoint": "Harewali Village (T)",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "DTC"
  },
  "952A STL": {
    "displayRoute": "952A",
    "startPoint": "Harewali Village (T)",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "DTC"
  },
  "953 STL": {
    "displayRoute": "953",
    "startPoint": "R Block Rajendra Nagar",
    "lastPoint": "D Block Mangol Puri (T)",
    "operator": "Delhi Transit"
  },
  "954A STL": {
    "displayRoute": "954A",
    "startPoint": "Rani Khera Depot 1",
    "lastPoint": "Sultan Puri (T)",
    "operator": "Delhi Transit"
  },
  "956 STL": {
    "displayRoute": "956",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "957B": {
    "displayRoute": "957B",
    "startPoint": "Zakhira (Rohtak Road)",
    "lastPoint": "Rohini Sec 22 Terminal",
    "operator": "Delhi Transit"
  },
  "957 STL": {
    "displayRoute": "957",
    "startPoint": "Rohini Sec 37 E Bus Depot",
    "lastPoint": "ROHINI SEC 22 POCKET 7",
    "operator": "DTC"
  },
  "961 STL": {
    "displayRoute": "961",
    "startPoint": "Bawana Sec 1 Cluster Depot",
    "lastPoint": "A-9 Narela",
    "operator": "DTC"
  },
  "962A": {
    "displayRoute": "962A",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Majra Dabas Village",
    "operator": "DTC"
  },
  "962A STL": {
    "displayRoute": "962A",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "Police Station Begumpur",
    "operator": "Delhi Transit"
  },
  "962B": {
    "displayRoute": "962B",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Kanjhawala Village (T)",
    "operator": "Delhi Transit"
  },
  "962LINK STL": {
    "displayRoute": "962LINK",
    "startPoint": "Rohini Sec 37 E Bus Depot",
    "lastPoint": "Kanjhawala Village (T)",
    "operator": "Delhi Transit"
  },
  "962SPL": {
    "displayRoute": "962SPL",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Majra Dabas Village",
    "operator": "DTC"
  },
  "966B": {
    "displayRoute": "966B",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "DTC"
  },
  "966EX": {
    "displayRoute": "966EX",
    "startPoint": "Super Bazar",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transport Corporation"
  },
  "966 Ext": {
    "displayRoute": "966",
    "startPoint": "Q Block Mangolpuri",
    "lastPoint": "Shivaji Stadium Terminal",
    "operator": "DTC"
  },
  "970B": {
    "displayRoute": "970B",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "DTC"
  },
  "971A": {
    "displayRoute": "971A",
    "startPoint": "Shalimar Bagh BH Block",
    "lastPoint": "Anand Vihar (ISBT) / Gazi Pur Telco",
    "operator": "DTC"
  },
  "971 STL": {
    "displayRoute": "971",
    "startPoint": "Loni Road X-ing",
    "lastPoint": "BBM Depot",
    "operator": "DTC"
  },
  "972A Ext": {
    "displayRoute": "972A",
    "startPoint": "West Enclave / Sansad Vihar (T)",
    "lastPoint": "Bawana Soap Factory",
    "operator": "Delhi Transit"
  },
  "972E": {
    "displayRoute": "972E",
    "startPoint": "Bawana Soap Factory",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "Delhi Transit"
  },
  "972EX": {
    "displayRoute": "972EX",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Auchandi Border",
    "operator": "Delhi Transit"
  },
  "972 Ext": {
    "displayRoute": "972",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Bawana Soap Factory",
    "operator": "Delhi Transit"
  },
  "972LINK STL": {
    "displayRoute": "972LINK",
    "startPoint": "Rohini Sec 37 E Bus Depot",
    "lastPoint": "Harewali Village (T)",
    "operator": "Delhi Transit"
  },
  "975 STL": {
    "displayRoute": "975",
    "startPoint": "Rithala Depot",
    "lastPoint": "ROHINI SEC-11 EXTN SFS FLTS",
    "operator": "DTC"
  },
  "978LTD": {
    "displayRoute": "978LTD",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Samaspur Khalsa",
    "operator": "Delhi Transit"
  },
  "978 STL": {
    "displayRoute": "978",
    "startPoint": "Nangloi Depot / Jwala Puri",
    "lastPoint": "Dhansa Stand / Dhansa Bus Stand Metro",
    "operator": "DTC"
  },
  "979A": {
    "displayRoute": "979A",
    "startPoint": "Nangloi Metro Station",
    "lastPoint": "Bawana / Bawana Village Chowk",
    "operator": "Delhi Transit"
  },
  "979LNK STL": {
    "displayRoute": "979LNK",
    "startPoint": "Rani Khera Depot 2",
    "lastPoint": "Nangloi Metro Station",
    "operator": "Delhi Transit"
  },
  "981A": {
    "displayRoute": "981A",
    "startPoint": "Tikri Border M Stn (T)",
    "lastPoint": "Bawana / Bawana Village Chowk",
    "operator": "Delhi Transit"
  },
  "981 STL": {
    "displayRoute": "981",
    "startPoint": "Tikri Border M Stn (T)",
    "lastPoint": "Rani Khera Depot 1",
    "operator": "Delhi Transit"
  },
  "982A": {
    "displayRoute": "982A",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "GTK Depot",
    "operator": "Delhi Transit"
  },
  "984A": {
    "displayRoute": "984A",
    "startPoint": "Rohini Sectocr -1 Avantika",
    "lastPoint": "Lajpat Nagar (Ring Road)",
    "operator": "DTC"
  },
  "985_": {
    "displayRoute": "985_",
    "startPoint": "Shahbad Dairy",
    "lastPoint": "RBlock Rajendra Nagar",
    "operator": "Delhi Transit"
  },
  "989A": {
    "displayRoute": "989A",
    "startPoint": "Zakhira (Rohtak Road)",
    "lastPoint": "QBlock Mangolpuri",
    "operator": "Delhi Transit"
  },
  "989 STL": {
    "displayRoute": "989",
    "startPoint": "QBlock Mangolpuri",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "Delhi Transit"
  },
  "990A": {
    "displayRoute": "990A",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Prehlad Vihar (Deep Vihar) Rohini Sec 25",
    "operator": "DTC"
  },
  "990A STL": {
    "displayRoute": "990A",
    "startPoint": "VIJAY VIHAR",
    "lastPoint": "Rithala Depot",
    "operator": "DTC"
  },
  "990B_": {
    "displayRoute": "990B_",
    "startPoint": "Rithala Village / Vijay Vihar",
    "lastPoint": "East Patel Nagar",
    "operator": "Delhi Transit"
  },
  "990C": {
    "displayRoute": "990C",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Auchandi Border",
    "operator": "DTC"
  },
  "990 Ext": {
    "displayRoute": "990",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Rohini Sec 23 Pocket C",
    "operator": "DTC"
  },
  "990 STL": {
    "displayRoute": "990",
    "startPoint": "Rohini Sec 37 E Bus Depot",
    "lastPoint": "Rohini Sec 23 Pocket 1 (Green Hill Aptt.)",
    "operator": "Delhi Transit"
  },
  "991A STL": {
    "displayRoute": "991A",
    "startPoint": "Peera Garhi Chowk",
    "lastPoint": "Mubarakpur Dabas Village",
    "operator": "Delhi Transit"
  },
  "991 STL": {
    "displayRoute": "991",
    "startPoint": "Mubarakpur Dabas Village",
    "lastPoint": "Karampura",
    "operator": "Delhi Transit"
  },
  "992A STL": {
    "displayRoute": "992A",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Bawana Sec 1 Depot Bus Stop",
    "operator": "Delhi Transit"
  },
  "992 STL": {
    "displayRoute": "992",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Bawana Sec 5 Cluster Depot",
    "operator": "Delhi Transit"
  },
  "AIR-05": {
    "displayRoute": "AIR-05",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Azadpur Terminal",
    "operator": "DTC"
  },
  "AIR-06": {
    "displayRoute": "AIR-06",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "DTC"
  },
  "AIR-06 STL": {
    "displayRoute": "AIR-06",
    "startPoint": "Sultan Puri (T)",
    "lastPoint": "Rohini Sec 37 E Bus Depot",
    "operator": "DTC"
  },
  "AIR-08ST": {
    "displayRoute": "AIR-08ST",
    "startPoint": "Ghuman Hera Depot 1",
    "lastPoint": "Khera Village 2 / Khera School",
    "operator": "Delhi Transit"
  },
  "AIR08 STL": {
    "displayRoute": "AIR08",
    "startPoint": "Ghuman Hera Depot 1",
    "lastPoint": "Jharoda Crossing / Najafgarh",
    "operator": "Delhi Transit"
  },
  "AIRPORTEXP08": {
    "displayRoute": "AIRPORTEXP08",
    "startPoint": "Khera Village 2 / Khera School",
    "lastPoint": "IGI Airport Terminal 2 (Air India Office)",
    "operator": "Delhi Transit"
  },
  "AIRPORTEXP08 STL": {
    "displayRoute": "AIRPORTEXP08",
    "startPoint": "Khera Village 2 / Khera School",
    "lastPoint": "Ghuman Hera Depot 1",
    "operator": "Delhi Transit"
  },
  "AIR PORT EXP.-4": {
    "displayRoute": "AIR PORT EXP.-4",
    "startPoint": "ISBT Kashmiri Gate",
    "lastPoint": "IGI Airport Terminal 3",
    "operator": "DTC"
  },
  "AIR PORT SHUTTLE SERVICE": {
    "displayRoute": "AIR PORT SHUTTLE SERVICE",
    "startPoint": "Palam Airport / IGI Airport T1",
    "lastPoint": "IGI Airport Terminal 3",
    "operator": "DTC"
  },
  "Anand Vihar ISBT → Gurgaon": {
    "displayRoute": "Anand Vihar ISBT → Gurgaon",
    "startPoint": "Anand Vihar ISBT",
    "lastPoint": "Gurgaon",
    "operator": "Delhi Transport Corporation"
  },
  "ANAND VIHAR ISBT TO GURGAON": {
    "displayRoute": "ANAND VIHAR ISBT TO GURGAON",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Gurugram ISBT / Gurgaon",
    "operator": "DTC"
  },
  "ANDHERIA BAGH MORE / CHHATARPUR METRO STATION - VASANT VIHAR METRO STATION": {
    "displayRoute": "ANDHERIA BAGH MORE / CHHATARPUR METRO STATION - VASANT VIHAR METRO STATION",
    "startPoint": "Andheria More / Chhatarpur Metro Station",
    "lastPoint": "Vasant Vihar Metro Station",
    "operator": "DTC"
  },
  "AS4 STL": {
    "displayRoute": "AS4",
    "startPoint": "Maya Puri Depot",
    "lastPoint": "ANCHAL SCHOOL KAUTILYA MARG",
    "operator": "DTC"
  },
  "BADARPUR BORDER TO GURGAON": {
    "displayRoute": "BADARPUR BORDER TO GURGAON",
    "startPoint": "Badarpur Border(T)",
    "lastPoint": "Gurugram ISBT / Gurgaon",
    "operator": "DTC"
  },
  "BAHADURGARH TO KARAM PURA TERMINAL": {
    "displayRoute": "BAHADURGARH TO KARAM PURA TERMINAL",
    "startPoint": "Bahadurgarh / Bahadurgarh Old Bus Stand",
    "lastPoint": "Karampura Terminal",
    "operator": "DTC"
  },
  "BAHADURGARH TO NARELA A-9 TERMINAL": {
    "displayRoute": "BAHADURGARH TO NARELA A-9 TERMINAL",
    "startPoint": "Bahadurgarh / Bahadurgarh Old Bus Stand",
    "lastPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "operator": "DTC"
  },
  "BAHADURGARH TO N.D.RLY. ST. G.-2": {
    "displayRoute": "BAHADURGARH TO N.D.RLY. ST. G.-2",
    "startPoint": "Bahadurgarh / Bahadurgarh Old Bus Stand",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "DTC"
  },
  "Baraut To Maharana Pratap ISBT": {
    "displayRoute": "Baraut To Maharana Pratap ISBT",
    "startPoint": "Baraut",
    "lastPoint": "ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "BPEXP": {
    "displayRoute": "BPEXP",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "ISBT Sarai Kale Khan",
    "operator": "Delhi Transit"
  },
  "BPEXPA": {
    "displayRoute": "BPEXPA",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Burari Crossing",
    "operator": "Delhi Transit"
  },
  "BPG": {
    "displayRoute": "BPG",
    "startPoint": "Gurgaon",
    "lastPoint": "Badarpur Border",
    "operator": "Delhi Transport Corporation"
  },
  "BYPASS EXPRESS": {
    "displayRoute": "BYPASS EXPRESS",
    "startPoint": "Uttam Nagar (Najafgarh Road)",
    "lastPoint": "ISBT Sarai Kale Khan",
    "operator": "DTC"
  },
  "CBD1+": {
    "displayRoute": "CBD1+",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mori Gate Terminal",
    "operator": "Delhi Transit"
  },
  "CBD2(+)": {
    "displayRoute": "CBD2(+)",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "Delhi Transit"
  },
  "CBD2(-)": {
    "displayRoute": "CBD2(-)",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "New Delhi Railway Station Gate 2",
    "operator": "Delhi Transit"
  },
  "CBD CIRCULATOR-3 (+)": {
    "displayRoute": "CBD CIRCULATOR-3 (+)",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "CBD CIRCULATOR-3 (-)": {
    "displayRoute": "CBD CIRCULATOR-3 (-)",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "D-0001": {
    "displayRoute": "D-0001",
    "startPoint": "St Stephen Hospital",
    "lastPoint": "PWD Office / Aruna Nagar Ring Road / Majnu Ka Tila",
    "operator": "DTC"
  },
  "D-0002(+)": {
    "displayRoute": "D-0002(+)",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "delhi univercity gate no -1",
    "operator": "DTC"
  },
  "D-0002(-)": {
    "displayRoute": "D-0002(-)",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "INS Hostel",
    "operator": "DTC"
  },
  "D-0002 STL": {
    "displayRoute": "D-0002",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "Nangloi Depot / Jwala Puri",
    "operator": "DTC"
  },
  "D-0003": {
    "displayRoute": "D-0003",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Balak Ram Hospital",
    "operator": "DTC"
  },
  "D-0004": {
    "displayRoute": "D-0004",
    "startPoint": "Sarai Rohila (Rohtak Road)",
    "lastPoint": "Rana Pratap Bagh",
    "operator": "DTC"
  },
  "D-0005": {
    "displayRoute": "D-0005",
    "startPoint": "Sarai Rohilla (Rohtak Road)",
    "lastPoint": "Karol Bagh Metro Station",
    "operator": "DTC"
  },
  "D-001": {
    "displayRoute": "D-001",
    "startPoint": "St Stephen Hospital",
    "lastPoint": "PWD Office / Aruna Nagar Ring Road / Majnu Ka Tila",
    "operator": "DTC"
  },
  "D-002(+)": {
    "displayRoute": "D-002(+)",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "Delhi University / North Campus",
    "operator": "DTC"
  },
  "D-002(-)": {
    "displayRoute": "D-002(-)",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "INS Hostel",
    "operator": "DTC"
  },
  "D-002 STL": {
    "displayRoute": "D-002",
    "startPoint": "Lok Kalyan Marg Metro Station",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-003": {
    "displayRoute": "D-003",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Balak Ram Hospital",
    "operator": "DTC"
  },
  "D-004": {
    "displayRoute": "D-004",
    "startPoint": "Sarai Rohila",
    "lastPoint": "Rana Pratap Bagh",
    "operator": "DTC"
  },
  "D-004 STL": {
    "displayRoute": "D-004",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D004 STL": {
    "displayRoute": "D004",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Vasant Vihar Depot",
    "operator": "Delhi Transit"
  },
  "D-005": {
    "displayRoute": "D-005",
    "startPoint": "Sarai Rohila (Rohtak Road)",
    "lastPoint": "Karol Bagh Metro Station",
    "operator": "DTC"
  },
  "D-006": {
    "displayRoute": "D-006",
    "startPoint": "Sunehari Pulla Depot / Jawahar Lal Nehru Stadium Terminal",
    "lastPoint": "ISBT Anand Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-007": {
    "displayRoute": "D-007",
    "startPoint": "Madanpur Khadar JJ Colony",
    "lastPoint": "Hauz Khass Terminal",
    "operator": "DTC"
  },
  "D-008": {
    "displayRoute": "D-008",
    "startPoint": "Safdurjang Terminal",
    "lastPoint": "Safdurjung Terminal",
    "operator": "Delhi Transit"
  },
  "D-008 STL": {
    "displayRoute": "D-008",
    "startPoint": "Safdurjang Terminal",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-009": {
    "displayRoute": "D-009",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "D-010": {
    "displayRoute": "D-010",
    "startPoint": "Sunehari Pulla Depot",
    "lastPoint": "CPWD Colony Vasant Vihar",
    "operator": "Delhi Transit"
  },
  "D-011": {
    "displayRoute": "D-011",
    "startPoint": "Savitri Cinema",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "DTC"
  },
  "D-013": {
    "displayRoute": "D-013",
    "startPoint": "Mithapur Chowk (T)",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "DTC"
  },
  "D-014": {
    "displayRoute": "D-014",
    "startPoint": "Lajpat Nagar Ring Road",
    "lastPoint": "Ambedkar Nagar Depot",
    "operator": "Delhi Transit"
  },
  "D-014 STL": {
    "displayRoute": "D-014",
    "startPoint": "Lajpat Nagar Ring Road",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-015(-)": {
    "displayRoute": "D-015(-)",
    "startPoint": "Mayur Vihar Phase 2 Pkt C Metro Station",
    "lastPoint": "Mayur Vihar Phase-II - Pkt C - Metro Station - Terminal",
    "operator": "DTC"
  },
  "D-015(+)": {
    "displayRoute": "D-015(+)",
    "startPoint": "Mayur Vihar Phase-II - Pkt C - Metro Station - Terminal",
    "lastPoint": "Mayur Vihar Phase 2 Pkt C Metro Station",
    "operator": "DTC"
  },
  "D-017": {
    "displayRoute": "D-017",
    "startPoint": "Mayur Vihar Ph-1 Metro Station",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "D-018": {
    "displayRoute": "D-018",
    "startPoint": "Jheel Terminal",
    "lastPoint": "CGO Complex",
    "operator": "Delhi Transit"
  },
  "D-018 STL": {
    "displayRoute": "D-018",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "CGO Complex",
    "operator": "Delhi Transit"
  },
  "D-019": {
    "displayRoute": "D-019",
    "startPoint": "Shastri Park Metro Station",
    "lastPoint": "Karawal Nagar Terminal",
    "operator": "DTC"
  },
  "D-020 STL": {
    "displayRoute": "D-020",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Jor Bagh Metro Station",
    "operator": "Delhi Transit"
  },
  "D-021": {
    "displayRoute": "D-021",
    "startPoint": "Mayur Vihar Phase-3 Church / Mayur Vihar Ph-III paper Market",
    "lastPoint": "Kali Mata Mandir New Ashok Nagar / Ashok Nagar Border",
    "operator": "DTC"
  },
  "D-022": {
    "displayRoute": "D-022",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Madanpur Khadar JJ Colony",
    "operator": "Delhi Transit"
  },
  "D-023": {
    "displayRoute": "D-023",
    "startPoint": "Seelampur /Seelampur Metro Station",
    "lastPoint": "Mayur Vihar Phase-1 Metro Station",
    "operator": "DTC"
  },
  "D-024": {
    "displayRoute": "D-024",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "Karol Bagh Gurgaon Stand",
    "operator": "Delhi Transit"
  },
  "D-025": {
    "displayRoute": "D-025",
    "startPoint": "Seelampur Gt Road",
    "lastPoint": "Johri Pur Enclave",
    "operator": "DTC"
  },
  "D-026": {
    "displayRoute": "D-026",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-026A": {
    "displayRoute": "D-026A",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Krishi Bhawan / Rail Bhawan Metro Station / Central Secretariat Metro Station",
    "operator": "Delhi Transit"
  },
  "D-026B": {
    "displayRoute": "D-026B",
    "startPoint": "Rail Bhawan Metro Station / Krishi Bhawan / Central Secretariat Metro Station",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-026 STL": {
    "displayRoute": "D-026",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-027": {
    "displayRoute": "D-027",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Anand Vihar ISBT Main Road",
    "operator": "DTC"
  },
  "D-028": {
    "displayRoute": "D-028",
    "startPoint": "Sarojini Nagar Depot",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "Delhi Transit"
  },
  "D-029": {
    "displayRoute": "D-029",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Sabha Pur X-ing",
    "operator": "DTC"
  },
  "D-030": {
    "displayRoute": "D-030",
    "startPoint": "Sarai Kale Khan ISBT Terminal",
    "lastPoint": "Poorvanchal Hostel (T)",
    "operator": "Delhi Transit"
  },
  "D-031(+)": {
    "displayRoute": "D-031(+)",
    "startPoint": "Shahdara Border Seemapuri Road",
    "lastPoint": "Shahdara Border Seemapuri Road",
    "operator": "DTC"
  },
  "D-031(-)": {
    "displayRoute": "D-031(-)",
    "startPoint": "Shahdara Border Seemapuri Road",
    "lastPoint": "Shahdara Border Seemapuri Road",
    "operator": "DTC"
  },
  "D-032": {
    "displayRoute": "D-032",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "HauzKhas Metro Station",
    "operator": "Delhi Transit"
  },
  "D-033": {
    "displayRoute": "D-033",
    "startPoint": "Mayur Vihar Ph-1 Metro Station",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "D-034": {
    "displayRoute": "D-034",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "CGO Complex",
    "operator": "Delhi Transit"
  },
  "D-035": {
    "displayRoute": "D-035",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Ashok Nagar Border",
    "operator": "DTC"
  },
  "D-036": {
    "displayRoute": "D-036",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Mandi Village (T)",
    "operator": "Delhi Transit"
  },
  "D-037": {
    "displayRoute": "D-037",
    "startPoint": "Mandoli Industrial Area",
    "lastPoint": "Anand Vihar ISBT Main Road",
    "operator": "DTC"
  },
  "D-038": {
    "displayRoute": "D-038",
    "startPoint": "Sarai Kale Khan ISBT Terminal",
    "lastPoint": "Okhla Extension (Abul Fazl Encalve)",
    "operator": "Delhi Transit"
  },
  "D-039": {
    "displayRoute": "D-039",
    "startPoint": "New Ashok Nagar Metro Station",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "D04": {
    "displayRoute": "D04",
    "startPoint": "Vasant Vihar Depot (Nelson Mandela Marg)",
    "lastPoint": "Vasant Vihar Depot",
    "operator": "Delhi Transit"
  },
  "D-040": {
    "displayRoute": "D-040",
    "startPoint": "Sarojini Nagar Depot",
    "lastPoint": "RBlock Rajendra Nagar",
    "operator": "Delhi Transit"
  },
  "D-040A": {
    "displayRoute": "D-040A",
    "startPoint": "Sarojini Nagar Depot",
    "lastPoint": "Rail Bhawan Metro Station / Krishi Bhawan / Central Secretariat Metro Station",
    "operator": "Delhi Transit"
  },
  "D-040 STL": {
    "displayRoute": "D-040",
    "startPoint": "Sarojini Nagar Depot",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D040 STL": {
    "displayRoute": "D040",
    "startPoint": "Sarojini Nagar Depot",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-041(+)": {
    "displayRoute": "D-041(+)",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Shahdra Terminal",
    "operator": "DTC"
  },
  "D-041(-)": {
    "displayRoute": "D-041(-)",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Shahdra Terminal",
    "operator": "DTC"
  },
  "D-042": {
    "displayRoute": "D-042",
    "startPoint": "Tughalqabad Village",
    "lastPoint": "Safdurjung Terminal",
    "operator": "Delhi Transit"
  },
  "D-044": {
    "displayRoute": "D-044",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Hamdard Nagar / Sangam Vihar",
    "operator": "Delhi Transit"
  },
  "D-044 STL": {
    "displayRoute": "D-044",
    "startPoint": "Nizamuddin Railway Station",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-045": {
    "displayRoute": "D-045",
    "startPoint": "Kalyan Puri Terminal",
    "lastPoint": "Jamia Milia Islamia Metro Station",
    "operator": "DTC"
  },
  "D-046": {
    "displayRoute": "D-046",
    "startPoint": "Lajpat Nagar Ring Road / VINOBA PURI METRO STATAION",
    "lastPoint": "Chhatarpur Ext / Nanda Hospital",
    "operator": "Delhi Transit"
  },
  "D-047": {
    "displayRoute": "D-047",
    "startPoint": "Vivekanand Mahila College",
    "lastPoint": "Mayur Vihar Phase-1 Metro Station",
    "operator": "DTC"
  },
  "D-048": {
    "displayRoute": "D-048",
    "startPoint": "Vasant Vihar Metro Station",
    "lastPoint": "Nizamuddin Railway Station",
    "operator": "Delhi Transit"
  },
  "D-049": {
    "displayRoute": "D-049",
    "startPoint": "Swami Dayanand Hospital",
    "lastPoint": "Mayur Vihar Phase-3 Church",
    "operator": "DTC"
  },
  "D-0501": {
    "displayRoute": "D-0501",
    "startPoint": "ISBT Nityanand Marg",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-051": {
    "displayRoute": "D-051",
    "startPoint": "Seelampur Gt Road",
    "lastPoint": "Karawal Nagar Terminal",
    "operator": "DTC"
  },
  "D-052": {
    "displayRoute": "D-052",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Jor Bagh Metro Station",
    "operator": "Delhi Transit"
  },
  "D-053": {
    "displayRoute": "D-053",
    "startPoint": "Shastri Park Metro Station",
    "lastPoint": "Mayur Vihar Phase-3 Church",
    "operator": "DTC"
  },
  "D-054": {
    "displayRoute": "D-054",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "HauzKhas Metro Station",
    "operator": "Delhi Transit"
  },
  "D-054 STL": {
    "displayRoute": "D-054",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "HauzKhas Metro Station",
    "operator": "Delhi Transit"
  },
  "D-055": {
    "displayRoute": "D-055",
    "startPoint": "New Ashok Nagar Metro Station (Namo Bharat )",
    "lastPoint": "Jheel Terminal",
    "operator": "DTC"
  },
  "D-056": {
    "displayRoute": "D-056",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Anand Parvat Terminal",
    "operator": "Delhi Transit"
  },
  "D-056 STL": {
    "displayRoute": "D-056",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-058": {
    "displayRoute": "D-058",
    "startPoint": "Inderlok Metro Station",
    "lastPoint": "CGO Complex",
    "operator": "Delhi Transit"
  },
  "D-060": {
    "displayRoute": "D-060",
    "startPoint": "Mithapur Chowk (T)",
    "lastPoint": "Jal Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-064": {
    "displayRoute": "D-064",
    "startPoint": "Dwarka Metro Station",
    "lastPoint": "Dwarka Main Metro Station",
    "operator": "Delhi Transit"
  },
  "D-068": {
    "displayRoute": "D-068",
    "startPoint": "Dwarka Sec21 Metro Station",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "D-068 STL": {
    "displayRoute": "D-068",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "Dwarka Metro Station",
    "operator": "Delhi Transit"
  },
  "D-06 STL": {
    "displayRoute": "D-06",
    "startPoint": "Vasant Vihar Depot",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "Delhi Transit"
  },
  "D-070": {
    "displayRoute": "D-070",
    "startPoint": "H3 Vikas Puri",
    "lastPoint": "Dwarka Sec 16C/GGS IP University",
    "operator": "Delhi Transit"
  },
  "D-070 STL": {
    "displayRoute": "D-070",
    "startPoint": "Dwarka Sec 16C/GGS IP University",
    "lastPoint": "Dwarka Metro Station",
    "operator": "Delhi Transit"
  },
  "D-072": {
    "displayRoute": "D-072",
    "startPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "lastPoint": "Nangloi",
    "operator": "Delhi Transit"
  },
  "D-072 STL": {
    "displayRoute": "D-072",
    "startPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "lastPoint": "Dwarka Metro Station",
    "operator": "Delhi Transit"
  },
  "D-085": {
    "displayRoute": "D-085",
    "startPoint": "Rajiv Chowk Metro Station Gate No.2",
    "lastPoint": "East Patel Nagar",
    "operator": "DTC"
  },
  "D-088 STL": {
    "displayRoute": "D-088",
    "startPoint": "Singhu Border GT Road",
    "lastPoint": "Narela EV Depot",
    "operator": "DTC"
  },
  "D-091(-)": {
    "displayRoute": "D-091(-)",
    "startPoint": "Rajiv Chowk Metro Station Gate No.8",
    "lastPoint": "Rajiv Chowk Metro Station Gate No.2",
    "operator": "DTC"
  },
  "D-1101(+)": {
    "displayRoute": "D-1101(+)",
    "startPoint": "Rajiv Chowk Metro Station Gate No.8",
    "lastPoint": "Rajiv Chowk Metro Station Gate No.8",
    "operator": "DTC"
  },
  "D-1101(-)": {
    "displayRoute": "D-1101(-)",
    "startPoint": "Rajiv Chowk Metro Station Gate No.8",
    "lastPoint": "Rajiv Chowk Metro Station Gate No.8",
    "operator": "DTC"
  },
  "D-1102": {
    "displayRoute": "D-1102",
    "startPoint": "Rajiv Chowk Metro Station Gate No.2",
    "lastPoint": "Sardar Patel Marg / Officer Enclave",
    "operator": "DTC"
  },
  "D-1103": {
    "displayRoute": "D-1103",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "Anand Niketan / DU South Campus",
    "operator": "DTC"
  },
  "D-1104": {
    "displayRoute": "D-1104",
    "startPoint": "Munirka Village (T)",
    "lastPoint": "IGI Airport Terminal 2",
    "operator": "DTC"
  },
  "D112LNK STL": {
    "displayRoute": "D112LNK",
    "startPoint": "Narela Terminal",
    "lastPoint": "Narela EV Depot",
    "operator": "Delhi Transit"
  },
  "D-123": {
    "displayRoute": "D-123",
    "startPoint": "Pandwala Kalan (T)",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "D-125 STL": {
    "displayRoute": "D-125",
    "startPoint": "Palla Village",
    "lastPoint": "Narela EV Depot",
    "operator": "Delhi Transit"
  },
  "D-1901": {
    "displayRoute": "D-1901",
    "startPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "lastPoint": "Delhi High Court",
    "operator": "DTC"
  },
  "D-2001": {
    "displayRoute": "D-2001",
    "startPoint": "GTB Nagar",
    "lastPoint": "Band Road Badarpur Majra",
    "operator": "DTC"
  },
  "D-2201": {
    "displayRoute": "D-2201",
    "startPoint": "Bakhtawar Pur Primary School",
    "lastPoint": "Adarsh Nagar Metro Station / Adarsh nagar",
    "operator": "Delhi Transit"
  },
  "D-2202": {
    "displayRoute": "D-2202",
    "startPoint": "Samaypur Badli Metro / Badli Railway Staion",
    "lastPoint": "Narela Terminal",
    "operator": "Delhi Transit"
  },
  "D-2203(-)": {
    "displayRoute": "D-2203(-)",
    "startPoint": "Azadpur Metro Station",
    "lastPoint": "Azadpur Metro Station",
    "operator": "DTC"
  },
  "D-2203(+)": {
    "displayRoute": "D-2203(+)",
    "startPoint": "Azadpur Metro Station / Terminal",
    "lastPoint": "Azadpur Metro Station / Terminal",
    "operator": "DTC"
  },
  "D-2301": {
    "displayRoute": "D-2301",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Bawana Dispensary",
    "operator": "Delhi Transit"
  },
  "D-2303": {
    "displayRoute": "D-2303",
    "startPoint": "Narela A6 CPJ College",
    "lastPoint": "Jahangirpuri Metro Station GT Road",
    "operator": "DTC"
  },
  "D-3201": {
    "displayRoute": "D-3201",
    "startPoint": "Rohini Sec-18/19 Metro Station",
    "lastPoint": "Rajiv Nagar Extention",
    "operator": "DTC"
  },
  "D-3202": {
    "displayRoute": "D-3202",
    "startPoint": "Tri Nagar / Jai Mata Market Tri Nagar Terminal",
    "lastPoint": "Haiderpur Metro Station",
    "operator": "DTC"
  },
  "D-3301": {
    "displayRoute": "D-3301",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Karala Crossing",
    "operator": "DTC"
  },
  "D-3302": {
    "displayRoute": "D-3302",
    "startPoint": "Rithala Village / Vijay Vihar",
    "lastPoint": "Begumpur",
    "operator": "DTC"
  },
  "D-3303": {
    "displayRoute": "D-3303",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "MAJRA DABAS",
    "operator": "DTC"
  },
  "D-3304": {
    "displayRoute": "D-3304",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Qutub Garh Village (T)",
    "operator": "DTC"
  },
  "D-3305": {
    "displayRoute": "D-3305",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Jat Khor Village",
    "operator": "DTC"
  },
  "D-3601": {
    "displayRoute": "D-3601",
    "startPoint": "Tikri Border",
    "lastPoint": "Punjab Khor Village",
    "operator": "DTC"
  },
  "D-3901": {
    "displayRoute": "D-3901",
    "startPoint": "MAJRA DABAS",
    "lastPoint": "Dichaon Kalan Village",
    "operator": "DTC"
  },
  "D-3902": {
    "displayRoute": "D-3902",
    "startPoint": "Madhuban Chowk (Outer Ring Road) / Rohini Court",
    "lastPoint": "Dwarka Court / NHAI",
    "operator": "DTC"
  },
  "D-4401": {
    "displayRoute": "D-4401",
    "startPoint": "Mayur Vihar Phase-1 Metro Station",
    "lastPoint": "Gazi Pur Dairy Farm",
    "operator": "DTC"
  },
  "D-4402(+)": {
    "displayRoute": "D-4402(+)",
    "startPoint": "Mayur Vihar Ph-1 Metro Station",
    "lastPoint": "Mayur Vihar Phase-1 Metro Station",
    "operator": "DTC"
  },
  "D-4402(-)": {
    "displayRoute": "D-4402(-)",
    "startPoint": "Mayur Vihar Ph-1 Metro Station",
    "lastPoint": "Mayur Vihar Phase-1 Metro Station",
    "operator": "DTC"
  },
  "D-4403": {
    "displayRoute": "D-4403",
    "startPoint": "New Ashok Nagar Metro Station",
    "lastPoint": "I P Extention Metro Station",
    "operator": "DTC"
  },
  "D-4404(+)": {
    "displayRoute": "D-4404(+)",
    "startPoint": "New Rajdhani Enclave / Preet Vihar Metro Station",
    "lastPoint": "New Rajdhani Enclave / Preet Vihar Metro Station",
    "operator": "DTC"
  },
  "D-4404(-)": {
    "displayRoute": "D-4404(-)",
    "startPoint": "Preet Vihar Metro Station / New Rajdhani Enclave",
    "lastPoint": "Preet Vihar Metro Station / New Rajdhani Enclave",
    "operator": "DTC"
  },
  "D-4405(-)": {
    "displayRoute": "D-4405(-)",
    "startPoint": "New Ashok Nagar Metro Station",
    "lastPoint": "New Ashok Nagar Metro Station",
    "operator": "DTC"
  },
  "D-4405(+)": {
    "displayRoute": "D-4405(+)",
    "startPoint": "New Ashok Nagar Metro Station (Namo Bharat )",
    "lastPoint": "New Ashok Nagar Metro Station",
    "operator": "DTC"
  },
  "D-4501": {
    "displayRoute": "D-4501",
    "startPoint": "Priyadarshani Vihar",
    "lastPoint": "Patparganj Industrial Area",
    "operator": "DTC"
  },
  "D-4502": {
    "displayRoute": "D-4502",
    "startPoint": "Shastri Park Metro Station",
    "lastPoint": "Ganesh Nagar",
    "operator": "DTC"
  },
  "D-4503": {
    "displayRoute": "D-4503",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "D-5101": {
    "displayRoute": "D-5101",
    "startPoint": "ISBT Anand Vihar Terminal",
    "lastPoint": "Delhi High Court",
    "operator": "DTC"
  },
  "D-5401": {
    "displayRoute": "D-5401",
    "startPoint": "ISBT Anand Vihar",
    "lastPoint": "Akshardham Metro Station",
    "operator": "DTC"
  },
  "D-5402": {
    "displayRoute": "D-5402",
    "startPoint": "Sai Memorial School / Geeta Colony Pusta",
    "lastPoint": "Mansarovar Park Metro Station / Jain Mandir",
    "operator": "DTC"
  },
  "D-5403": {
    "displayRoute": "D-5403",
    "startPoint": "Shastri Park Metro Station",
    "lastPoint": "Mayur Vihar Phase-3 Church / Mayur Vihar Ph-III paper Market",
    "operator": "Delhi Transit"
  },
  "D-5501": {
    "displayRoute": "D-5501",
    "startPoint": "Shiv Vihar",
    "lastPoint": "Seelampur /Seelampur Metro Station",
    "operator": "DTC"
  },
  "D-5502": {
    "displayRoute": "D-5502",
    "startPoint": "New Mandoli Industrial Area",
    "lastPoint": "Karkardooma Metro Station",
    "operator": "DTC"
  },
  "D-5503": {
    "displayRoute": "D-5503",
    "startPoint": "ISBT Anand Vihar",
    "lastPoint": "Harsh Vihar Jail Road",
    "operator": "DTC"
  },
  "D-5504": {
    "displayRoute": "D-5504",
    "startPoint": "Usman Pur 2-Pusta / Lal hospital",
    "lastPoint": "Mandoli Jail Road",
    "operator": "DTC"
  },
  "D-5505": {
    "displayRoute": "D-5505",
    "startPoint": "Lal Bagh Sabzi Mandi",
    "lastPoint": "Ashok Nagar E-Block",
    "operator": "DTC"
  },
  "D-5506": {
    "displayRoute": "D-5506",
    "startPoint": "Maujpur Babarpur Metro Station",
    "lastPoint": "Karawal Nagar Terminal / SBS Colony Karawal Nagar pusta Road Gali No.4",
    "operator": "DTC"
  },
  "D-5507": {
    "displayRoute": "D-5507",
    "startPoint": "Sabha Pur Village (Niti Public School)",
    "lastPoint": "Gokul Puri Metro Station",
    "operator": "DTC"
  },
  "D-5508": {
    "displayRoute": "D-5508",
    "startPoint": "Tahir Pur X-ing (Karuna Hospital)",
    "lastPoint": "East Azad Nagar (Primery School)",
    "operator": "DTC"
  },
  "D-5509": {
    "displayRoute": "D-5509",
    "startPoint": "Mauj Pur Babar Pur Metro Station / Babarpur Ext.",
    "lastPoint": "Maujpur Babarpur Metro Station",
    "operator": "DTC"
  },
  "D-578LINK STL": {
    "displayRoute": "D-578LINK",
    "startPoint": "R K PURAM SEC1 2",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "DTC"
  },
  "D-6001": {
    "displayRoute": "D-6001",
    "startPoint": "West Patel Nagar / Patel Nagar",
    "lastPoint": "Liberty Cinema",
    "operator": "DTC"
  },
  "D-6101": {
    "displayRoute": "D-6101",
    "startPoint": "Rajiv Chowk Metro Station",
    "lastPoint": "East Patel Nagar",
    "operator": "DTC"
  },
  "D-6102": {
    "displayRoute": "D-6102",
    "startPoint": "Naraina Vihar Metro Station",
    "lastPoint": "B-1 Janak Puri",
    "operator": "DTC"
  },
  "D-6301": {
    "displayRoute": "D-6301",
    "startPoint": "Peera Garhi Metro Station / Mian Wali Nagar",
    "lastPoint": "Haiderpur Metro Station",
    "operator": "DTC"
  },
  "D-6601(+)": {
    "displayRoute": "D-6601(+)",
    "startPoint": "Madipur JJ Colony / MadiPur Metro Station",
    "lastPoint": "Madipur Village / CARI / P B Enclave",
    "operator": "DTC"
  },
  "D-6601(-)": {
    "displayRoute": "D-6601(-)",
    "startPoint": "Madipur JJ Colony Madipuri JJ Colony Metro Station",
    "lastPoint": "Madipur JJ Colony Madipuri JJ Colony Metro Station",
    "operator": "DTC"
  },
  "D-6602": {
    "displayRoute": "D-6602",
    "startPoint": "Ramesh nagar / Basai Darapur / Ramesh Nagar Metro Station",
    "lastPoint": "Jankpuri South DabriMor Metro Station",
    "operator": "DTC"
  },
  "D-6603": {
    "displayRoute": "D-6603",
    "startPoint": "Krishna Park Extention Metro Station",
    "lastPoint": "Kirti Nagar Metro Station",
    "operator": "DTC"
  },
  "D-6604(-)": {
    "displayRoute": "D-6604(-)",
    "startPoint": "Udyog Nagar Metro Station / Nangloi JJ cly No 4",
    "lastPoint": "Udyog Nagar Metro Station / Nangloi JJ cly No 4",
    "operator": "DTC"
  },
  "D-6901": {
    "displayRoute": "D-6901",
    "startPoint": "Palam Metro Station",
    "lastPoint": "M Block Vikaspuri",
    "operator": "DTC"
  },
  "D-708LINK STL": {
    "displayRoute": "D-708LINK",
    "startPoint": "Narela EV Depot",
    "lastPoint": "Bawana Dispensary",
    "operator": "Delhi Transit"
  },
  "D-7101": {
    "displayRoute": "D-7101",
    "startPoint": "Vasant Vihar Metro Station",
    "lastPoint": "Chhatarpur Metro Station",
    "operator": "DTC"
  },
  "D-7102": {
    "displayRoute": "D-7102",
    "startPoint": "Mahipal Pur Village / Sec E Pkt 2 Vasant Kunj",
    "lastPoint": "Chhatarpur Metro Station",
    "operator": "DTC"
  },
  "D-7103": {
    "displayRoute": "D-7103",
    "startPoint": "Chandan Holla",
    "lastPoint": "100 Foota Road Ghitorni",
    "operator": "DTC"
  },
  "D-7104": {
    "displayRoute": "D-7104",
    "startPoint": "Maidan Garhi",
    "lastPoint": "Munirka Family Planning / Munirka",
    "operator": "DTC"
  },
  "D-74": {
    "displayRoute": "D-74",
    "startPoint": "Uttam Nagar Terminal / Uttam Nagar East Metro Station",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "Delhi Transit"
  },
  "D-7701": {
    "displayRoute": "D-7701",
    "startPoint": "Chhatarpur Metro Station",
    "lastPoint": "Bhati Kalan Village",
    "operator": "DTC"
  },
  "D-7701A": {
    "displayRoute": "D-7701A",
    "startPoint": "Chhatarpur Metro Station",
    "lastPoint": "AIIMS-CAPFIMS",
    "operator": "DTC"
  },
  "D-7702": {
    "displayRoute": "D-7702",
    "startPoint": "North Paint Nursing Home / Panchsheel Park Metro Station",
    "lastPoint": "Devoli Village",
    "operator": "DTC"
  },
  "D-7901": {
    "displayRoute": "D-7901",
    "startPoint": "Saket Court",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "DTC"
  },
  "D-8701": {
    "displayRoute": "D-8701",
    "startPoint": "Lajpat Nagar Ring Road / Vinoba Puri Metro Station",
    "lastPoint": "Greater Kailash-1 / HSBC Bank",
    "operator": "DTC"
  },
  "D-8702": {
    "displayRoute": "D-8702",
    "startPoint": "Sangam Vihar E-Block",
    "lastPoint": "Chirag Dilli / Chirag Delhi Metro Station",
    "operator": "DTC"
  },
  "D-8801": {
    "displayRoute": "D-8801",
    "startPoint": "Jamia Milia Islamia Metro Station",
    "lastPoint": "Alakhnanda Appartement",
    "operator": "DTC"
  },
  "D-8802": {
    "displayRoute": "D-8802",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "MADANPUR KHADAR TERMINAL",
    "operator": "DTC"
  },
  "D-8803": {
    "displayRoute": "D-8803",
    "startPoint": "Tughlaqabad Extn",
    "lastPoint": "Savitri Cinema",
    "operator": "DTC"
  },
  "D-907 STL": {
    "displayRoute": "D-907",
    "startPoint": "Nilothi Village",
    "lastPoint": "Nangloi Depot / Jwala Puri",
    "operator": "DTC"
  },
  "D-9101": {
    "displayRoute": "D-9101",
    "startPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "lastPoint": "AeroCity Metro Station",
    "operator": "DTC"
  },
  "D-9102": {
    "displayRoute": "D-9102",
    "startPoint": "Terminal 1C / Domestic",
    "lastPoint": "C4E Janakpuri / Janak Puri C-4 Market",
    "operator": "DTC"
  },
  "D-9601": {
    "displayRoute": "D-9601",
    "startPoint": "Krishna Park Extention Metro Station",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "DTC"
  },
  "D-9901": {
    "displayRoute": "D-9901",
    "startPoint": "Dhansa Stand / Dhansa Bus Stand Metro",
    "lastPoint": "Dhansa Border (T)",
    "operator": "DTC"
  },
  "D-9902": {
    "displayRoute": "D-9902",
    "startPoint": "Dhansa Stand / Dhansa Bus Stand Metro",
    "lastPoint": "Dauralla Border",
    "operator": "DTC"
  },
  "D-9903(+)": {
    "displayRoute": "D-9903(+)",
    "startPoint": "Dwarka Sec-13 Metro Station",
    "lastPoint": "Dwarka Sec-13 Metro Station",
    "operator": "DTC"
  },
  "D-9903(-)": {
    "displayRoute": "D-9903(-)",
    "startPoint": "Dwarka Sec-13 Metro Station",
    "lastPoint": "Dwarka Sec-13 Metro Station",
    "operator": "DTC"
  },
  "D-9904": {
    "displayRoute": "D-9904",
    "startPoint": "Dwarka Sector-11 Metro Station Gate No.2",
    "lastPoint": "Dwarka Sec21 Metro Station",
    "operator": "DTC"
  },
  "D-9905": {
    "displayRoute": "D-9905",
    "startPoint": "Palam Metro Station",
    "lastPoint": "Dwarka Sec21 Metro Station",
    "operator": "DTC"
  },
  "D-9906(+)": {
    "displayRoute": "D-9906(+)",
    "startPoint": "Dwarka Metro Station",
    "lastPoint": "Dwarka Main Metro Station",
    "operator": "DTC"
  },
  "D-9906(-)": {
    "displayRoute": "D-9906(-)",
    "startPoint": "Dwarka Metro Station",
    "lastPoint": "Kakrola More",
    "operator": "DTC"
  },
  "D-9907": {
    "displayRoute": "D-9907",
    "startPoint": "Najafgarh Dhansa Stand / Dhansa Crossing",
    "lastPoint": "Jharoda Kalan Border (Satyam Puram)",
    "operator": "DTC"
  },
  "D-9908": {
    "displayRoute": "D-9908",
    "startPoint": "Pandwala Kalan (T)",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "D-9909(+)": {
    "displayRoute": "D-9909(+)",
    "startPoint": "Dwarka Sector-11 Metro Station Gate No.2",
    "lastPoint": "Dwarka Sec-11 Metro Station",
    "operator": "DTC"
  },
  "D-9909(-)": {
    "displayRoute": "D-9909(-)",
    "startPoint": "Dwarka Sector-11 Metro Station Gate No.2",
    "lastPoint": "Dwarka Sector-11 Metro Station Gate No.2",
    "operator": "DTC"
  },
  "D-9910": {
    "displayRoute": "D-9910",
    "startPoint": "Ghuman Hera Village Main Road / Ghumanhera school",
    "lastPoint": "Dhansa Bus Stand / Dhansa Bus Stand Metro Station",
    "operator": "DTC"
  },
  "D-9911": {
    "displayRoute": "D-9911",
    "startPoint": "Galib Pur Village",
    "lastPoint": "DICHAON KALAN DEPOT",
    "operator": "DTC"
  },
  "D-9912": {
    "displayRoute": "D-9912",
    "startPoint": "Sarang Pur Village",
    "lastPoint": "DICHAON KALAN DEPOT",
    "operator": "DTC"
  },
  "D-9913": {
    "displayRoute": "D-9913",
    "startPoint": "IssaPur D B Temple",
    "lastPoint": "Dhansa Bus Stand / Dhansa Bus Stand Metro Station",
    "operator": "DTC"
  },
  "D-9914": {
    "displayRoute": "D-9914",
    "startPoint": "Dhansa Stand / Dhansa Bus Stand Metro",
    "lastPoint": "Bakkargarh Border",
    "operator": "DTC"
  },
  "D-9915": {
    "displayRoute": "D-9915",
    "startPoint": "Dhansa Stand / Dhansa Bus Stand Metro",
    "lastPoint": "Choudhary Bhram Prakash Ayurvedic Hospital",
    "operator": "DTC"
  },
  "D-9916": {
    "displayRoute": "D-9916",
    "startPoint": "Dwarka sector 22 Cluster Depot",
    "lastPoint": "Najafgarh Dhansa Stand / Dhansa Crossing",
    "operator": "DTC"
  },
  "D-9917": {
    "displayRoute": "D-9917",
    "startPoint": "Kair Village",
    "lastPoint": "Dhansa Bus Stand / Dhansa Bus Stand Metro Station",
    "operator": "DTC"
  },
  "D-9918": {
    "displayRoute": "D-9918",
    "startPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "lastPoint": "Dichau Kalan Depot",
    "operator": "DTC"
  },
  "DCS(+)": {
    "displayRoute": "DCS(+)",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "DWARKA MOR",
    "operator": "DTC"
  },
  "DCS(-)": {
    "displayRoute": "DCS(-)",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "DWARKA MOR",
    "operator": "DTC"
  },
  "Dharuhera To Dhaula Kuan": {
    "displayRoute": "Dharuhera To Dhaula Kuan",
    "startPoint": "Dharuhera",
    "lastPoint": "Dhaula Kuan",
    "operator": "DTC"
  },
  "Dhuala Kuan to Dharuhera": {
    "displayRoute": "Dhuala Kuan to Dharuhera",
    "startPoint": "Dhaula Kuan",
    "lastPoint": "Dharuhera",
    "operator": "DTC"
  },
  "DS-1": {
    "displayRoute": "DS-1",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Dwarka Sec 6/7 - Dwarka Sec 6/7 Xing",
    "operator": "DTC"
  },
  "DS-10": {
    "displayRoute": "DS-10",
    "startPoint": "Krishi Bhawan",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "DS-11": {
    "displayRoute": "DS-11",
    "startPoint": "CGO Complex",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "DS-12": {
    "displayRoute": "DS-12",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "DS-13": {
    "displayRoute": "DS-13",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Janak Puri B-2",
    "operator": "DTC"
  },
  "DS-14": {
    "displayRoute": "DS-14",
    "startPoint": "Uttam nagar / A1 Janakpuri",
    "lastPoint": "CGO Complex",
    "operator": "DTC"
  },
  "DS-15": {
    "displayRoute": "DS-15",
    "startPoint": "Shastri Bhawan",
    "lastPoint": "C1 Janak Puri",
    "operator": "DTC"
  },
  "DS-16": {
    "displayRoute": "DS-16",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "C2 Janakpuri",
    "operator": "DTC"
  },
  "DS-17": {
    "displayRoute": "DS-17",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Balco Apartment",
    "operator": "DTC"
  },
  "DS-18": {
    "displayRoute": "DS-18",
    "startPoint": "CGO Complex",
    "lastPoint": "Balco Apartment",
    "operator": "DTC"
  },
  "DS-19": {
    "displayRoute": "DS-19",
    "startPoint": "Shastri Bhawan",
    "lastPoint": "Balco Apartment",
    "operator": "DTC"
  },
  "DS-2": {
    "displayRoute": "DS-2",
    "startPoint": "Dwarka sec 4/5 &amp; 11/12 Xing /Dwarka Sector 12 / Ashirwad Chowk",
    "lastPoint": "CGO Complex",
    "operator": "DTC"
  },
  "DS-20": {
    "displayRoute": "DS-20",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Balco Apartment",
    "operator": "DTC"
  },
  "DS-21": {
    "displayRoute": "DS-21",
    "startPoint": "Krishi Bhawan",
    "lastPoint": "Dwarka Sec23",
    "operator": "DTC"
  },
  "DS-22": {
    "displayRoute": "DS-22",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Dwarka Sec-19 Pkt-3",
    "operator": "DTC"
  },
  "DS-23": {
    "displayRoute": "DS-23",
    "startPoint": "JLN Stadium (Sunehripulla Depot)",
    "lastPoint": "Dwarka Sec 8 DTC Depot",
    "operator": "DTC"
  },
  "DS-24": {
    "displayRoute": "DS-24",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Madhu Vihar",
    "operator": "DTC"
  },
  "DS-25": {
    "displayRoute": "DS-25",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "Dwarka Sec 16C/GGS IP University",
    "operator": "DTC"
  },
  "DS-26": {
    "displayRoute": "DS-26",
    "startPoint": "JLN Stadium (Sunehripulla Depot)",
    "lastPoint": "C2B Janak Puri /Bharati College",
    "operator": "DTC"
  },
  "DS-27": {
    "displayRoute": "DS-27",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "D Block Janak Puri (Pankha Road)",
    "operator": "DTC"
  },
  "DS-28": {
    "displayRoute": "DS-28",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "B-1 Janak Puri",
    "operator": "DTC"
  },
  "DS-29": {
    "displayRoute": "DS-29",
    "startPoint": "Krishi Bhawan",
    "lastPoint": "Janakpuri C5B/C4H",
    "operator": "DTC"
  },
  "DS-3": {
    "displayRoute": "DS-3",
    "startPoint": "Shastri Bhawan",
    "lastPoint": "Dwarka Sec 19 Pocket B (T)",
    "operator": "DTC"
  },
  "DS-30": {
    "displayRoute": "DS-30",
    "startPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "lastPoint": "A3 Janak Puri",
    "operator": "DTC"
  },
  "DS-31": {
    "displayRoute": "DS-31",
    "startPoint": "Rohini Sec13 Sachdeva School / VIDYA VIHAR MARG",
    "lastPoint": "Krishi Bhawan",
    "operator": "DTC"
  },
  "DS-32": {
    "displayRoute": "DS-32",
    "startPoint": "Rohini Sectocr -1 Avantika",
    "lastPoint": "Nehru Place / Paras Cinema",
    "operator": "DTC"
  },
  "DS-33": {
    "displayRoute": "DS-33",
    "startPoint": "Rohini SFS Flats (Sector-11)",
    "lastPoint": "JLN Stadium / Sunehri Pulla Depot",
    "operator": "DTC"
  },
  "DS-34": {
    "displayRoute": "DS-34",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "Telephone Exchange",
    "operator": "DTC"
  },
  "DS-35": {
    "displayRoute": "DS-35",
    "startPoint": "Rohini sector-27",
    "lastPoint": "Kendriya Terminal (Pt. Pant Marg)",
    "operator": "DTC"
  },
  "DS-36": {
    "displayRoute": "DS-36",
    "startPoint": "Krishi Bhawan",
    "lastPoint": "I P Extantion (Madhu Vihar) / Patparganj",
    "operator": "DTC"
  },
  "DS-37": {
    "displayRoute": "DS-37",
    "startPoint": "Nehru Place / Paras Cinema",
    "lastPoint": "I P Extantion (Madhu Vihar) / Patparganj",
    "operator": "DTC"
  },
  "DS-38": {
    "displayRoute": "DS-38",
    "startPoint": "JLN Stadium / Sunehri Pulla Depot",
    "lastPoint": "I P Extantion (Madhu Vihar) / Patparganj",
    "operator": "DTC"
  },
  "DS-39": {
    "displayRoute": "DS-39",
    "startPoint": "Shivaji Stadium Terminal",
    "lastPoint": "I P Extantion (Madhu Vihar) / Patparganj",
    "operator": "DTC"
  },
  "DS-4": {
    "displayRoute": "DS-4",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Dwarka Sector-14 Vegas Mall",
    "operator": "DTC"
  },
  "DS-40": {
    "displayRoute": "DS-40",
    "startPoint": "KENDRIYA TERMINAL / Gurudwara Rakab Gunj",
    "lastPoint": "I P Extantion (Madhu Vihar) / Patparganj",
    "operator": "DTC"
  },
  "DS-6": {
    "displayRoute": "DS-6",
    "startPoint": "Rohini Sec -16",
    "lastPoint": "CGO Complex",
    "operator": "DTC"
  },
  "DS-7": {
    "displayRoute": "DS-7",
    "startPoint": "Shastri Bhawan",
    "lastPoint": "Rohini Sec 23",
    "operator": "DTC"
  },
  "DS-8": {
    "displayRoute": "DS-8",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Rohini Sec1 Avantika",
    "operator": "DTC"
  },
  "DS-9": {
    "displayRoute": "DS-9",
    "startPoint": "Nehru Place Terminal",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "DW1": {
    "displayRoute": "DW1",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "Delhi Transit"
  },
  "DW-1": {
    "displayRoute": "DW-1",
    "startPoint": "IGI Airport Terminal 2 (Air India Office)",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "DTC"
  },
  "DW-2": {
    "displayRoute": "DW-2",
    "startPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "DW3": {
    "displayRoute": "DW3",
    "startPoint": "Rohini Sec 16 (T)",
    "lastPoint": "Dwarka Sec 16C/GGS IP University",
    "operator": "Delhi Transit"
  },
  "DW-3": {
    "displayRoute": "DW-3",
    "startPoint": "Rohini Sec 16 (T)",
    "lastPoint": "Dwarka Sec 16C/GGS IP University",
    "operator": "DTC"
  },
  "DW3A": {
    "displayRoute": "DW3A",
    "startPoint": "Uttam Nagar Terminal (In Gate)",
    "lastPoint": "Rohini Sec 16 (T)",
    "operator": "Delhi Transit"
  },
  "DW3B": {
    "displayRoute": "DW3B",
    "startPoint": "Rohini Sec 16 (T)",
    "lastPoint": "Keshopur Depot",
    "operator": "Delhi Transit"
  },
  "DW3 STL": {
    "displayRoute": "DW3",
    "startPoint": "Ghuman Hera Depot 1",
    "lastPoint": "Dwarka Sec 16C/GGS IP University",
    "operator": "Delhi Transit"
  },
  "DW4": {
    "displayRoute": "DW4",
    "startPoint": "ISBT Sarai Kale Khan",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "DW4A": {
    "displayRoute": "DW4A",
    "startPoint": "Kibri Place",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "DW4 STL": {
    "displayRoute": "DW4",
    "startPoint": "Dwarka Sec 22 Cluster Depot",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "DW5": {
    "displayRoute": "DW5",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "Delhi Transit"
  },
  "DW-5": {
    "displayRoute": "DW-5",
    "startPoint": "Safdurjung Terminal",
    "lastPoint": "District Court / Indira Gandhi Hospital/ NHAI Building / Dwarka Sec-10 Metro Station",
    "operator": "DTC"
  },
  "F-253A": {
    "displayRoute": "F-253A",
    "startPoint": "Seelampur Metro",
    "lastPoint": "Mayur Vihar Phase 3",
    "operator": "Delhi Transport Corporation"
  },
  "F-403A": {
    "displayRoute": "F-403A",
    "startPoint": "Nehru Place",
    "lastPoint": "Badarpur Border",
    "operator": "Delhi Transport Corporation"
  },
  "F-404": {
    "displayRoute": "F-404",
    "startPoint": "Central School",
    "lastPoint": "Ambedkar Nagar Depot",
    "operator": "Delhi Transport Corporation"
  },
  "GL-22": {
    "displayRoute": "GL-22",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Balco Apartment",
    "operator": "DTC"
  },
  "GL-23": {
    "displayRoute": "GL-23",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "GL-91": {
    "displayRoute": "GL-91",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Mundka Village",
    "operator": "DTC"
  },
  "GL91": {
    "displayRoute": "GL91",
    "startPoint": "Shivaji Stadium Terminal ( Connaught Place )",
    "lastPoint": "Mundka Village Metro Station",
    "operator": "Delhi Transit"
  },
  "GL91A": {
    "displayRoute": "GL91A",
    "startPoint": "Zakhira",
    "lastPoint": "Mundka Village Metro Station",
    "operator": "Delhi Transit"
  },
  "GL91 STL": {
    "displayRoute": "GL91",
    "startPoint": "Mundka Village Metro Station",
    "lastPoint": "Ghuman Hera Depot 2",
    "operator": "Delhi Transit"
  },
  "GMS(+)": {
    "displayRoute": "GMS(+)",
    "startPoint": "Punjab Kesari (Subhash Palace Depot)",
    "lastPoint": "Prem Bari Pul",
    "operator": "DTC"
  },
  "GMS(+) STL": {
    "displayRoute": "GMS(+)",
    "startPoint": "Punjab Kesari (Subhash Palace Depot)",
    "lastPoint": "Punjab Kesari",
    "operator": "DTC"
  },
  "GRAMIN MUDRIKA (+)": {
    "displayRoute": "GRAMIN MUDRIKA (+)",
    "startPoint": "Azadpur Metro Station",
    "lastPoint": "Azadpur Metro Station / Terminal",
    "operator": "DTC"
  },
  "GRAMIN MUDRIKA (-)": {
    "displayRoute": "GRAMIN MUDRIKA (-)",
    "startPoint": "Azadpur Metro Station",
    "lastPoint": "Azadpur Metro Station / Terminal",
    "operator": "DTC"
  },
  "Gr. Mudrika": {
    "displayRoute": "Gr. Mudrika",
    "startPoint": "Delhi Development Authority Flats Munirka/Family Planning Association of India",
    "lastPoint": "Institute of Pharmacy (DIPSAR)",
    "operator": "Delhi Transport Corporation"
  },
  "GUBHANA MAJRI TO TILAK NAGAR": {
    "displayRoute": "GUBHANA MAJRI TO TILAK NAGAR",
    "startPoint": "GUBHANA MAJRI",
    "lastPoint": "Tilak Nagar Terminal / Tilak Nagar",
    "operator": "DTC"
  },
  "Gurgaon → Anand Vihar ISBT": {
    "displayRoute": "Gurgaon → Anand Vihar ISBT",
    "startPoint": "Gurgaon",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "Delhi Transport Corporation"
  },
  "Gurgaon → Karol Bagh": {
    "displayRoute": "Gurgaon → Karol Bagh",
    "startPoint": "Gurgaon",
    "lastPoint": "Karol Bagh",
    "operator": "Delhi Transport Corporation"
  },
  "GURGAON TO ANAND VIHAR ISBT": {
    "displayRoute": "GURGAON TO ANAND VIHAR ISBT",
    "startPoint": "Gurgaon / Gurugram ISBT",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "GURGAON TO BADARPUR BORDER": {
    "displayRoute": "GURGAON TO BADARPUR BORDER",
    "startPoint": "Gurgaon / Gurugram ISBT",
    "lastPoint": "Badarpur Border (T)",
    "operator": "DTC"
  },
  "GURGAON TO KAROL BAGH": {
    "displayRoute": "GURGAON TO KAROL BAGH",
    "startPoint": "Gurgaon / Gurugram ISBT",
    "lastPoint": "Karol Bagh Terminal",
    "operator": "DTC"
  },
  "GURGAON TO UTTAM NAGAR (T)": {
    "displayRoute": "GURGAON TO UTTAM NAGAR (T)",
    "startPoint": "Gurgaon / Gurugram ISBT",
    "lastPoint": "Uttam Nagar Terminal",
    "operator": "DTC"
  },
  "IP-MTERO-STATION-SUPREME-COURT": {
    "displayRoute": "IP-MTERO-STATION-SUPREME-COURT",
    "startPoint": "IP MTERO STATION",
    "lastPoint": "Supreme Court / Pragati Maidan Metro Station",
    "operator": "DTC"
  },
  "KARAM PURA TERMINAL TO BAHADURGARH": {
    "displayRoute": "KARAM PURA TERMINAL TO BAHADURGARH",
    "startPoint": "Karampura Terminal",
    "lastPoint": "Bahadur Garh / Bahadurgarh Old Bus Stand",
    "operator": "DTC"
  },
  "Karol Bagh → Gurgaon": {
    "displayRoute": "Karol Bagh → Gurgaon",
    "startPoint": "Dhaula Kuan",
    "lastPoint": "Shankar Vihar",
    "operator": "Delhi Transport Corporation"
  },
  "KAROL BAGH TO GURGAON": {
    "displayRoute": "KAROL BAGH TO GURGAON",
    "startPoint": "Karol Bagh Terminal",
    "lastPoint": "Gurugram ISBT / Gurgaon",
    "operator": "DTC"
  },
  "KUSHAK NALLAH DEPOT - SUPREME COURT / PRAGATI MAIDAN METRO STATIONS STL": {
    "displayRoute": "KUSHAK NALLAH DEPOT - SUPREME COURT / PRAGATI MAIDAN METRO STATIONS",
    "startPoint": "Kushak Nallah Depot",
    "lastPoint": "Supreme Court / Pragati Maidan Metro Station",
    "operator": "DTC"
  },
  "Maharana Pratap ISBT To Baraut": {
    "displayRoute": "Maharana Pratap ISBT To Baraut",
    "startPoint": "ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Baraut",
    "operator": "DTC"
  },
  "Maharana Pratap ISBT To Rohtak New Bus Stand": {
    "displayRoute": "Maharana Pratap ISBT To Rohtak New Bus Stand",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Rohtak New Bus Stand",
    "operator": "DTC"
  },
  "MAHARAN PRATAP ISBT TO PANIPAT NEW BUS STAND": {
    "displayRoute": "MAHARAN PRATAP ISBT TO PANIPAT NEW BUS STAND",
    "startPoint": "ISBT Kashmere Gate City Bus Terminal / ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "PANIPAT NEW BUS STAND",
    "operator": "DTC"
  },
  "MAHARAN PRATAP ISBT TO SONIPAT BUS STAND": {
    "displayRoute": "MAHARAN PRATAP ISBT TO SONIPAT BUS STAND",
    "startPoint": "ISBT Maharana Pratap Bus Terminal",
    "lastPoint": "Sonipat Bus Stand",
    "operator": "DTC"
  },
  "MBS-6": {
    "displayRoute": "MBS-6",
    "startPoint": "R K Puram Sec-5 / Poorvi Marg RK Puram Sec 5",
    "lastPoint": "Vasant Vihar Depot / Munirka Village (Nelson Mandela Marg)",
    "operator": "DTC"
  },
  "MC127": {
    "displayRoute": "MC127",
    "startPoint": "Kashmere Gate Metro Station Gate 4",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "MC127 STL": {
    "displayRoute": "MC127",
    "startPoint": "Shahstri Park DMRC Depot",
    "lastPoint": "ISBT Nitayanand Marg",
    "operator": "Delhi Transit"
  },
  "MC-137D": {
    "displayRoute": "MC-137D",
    "startPoint": "Shastri Park Metro Station",
    "lastPoint": "Mayur Vihar Phase 3",
    "operator": "Delhi Transport Corporation"
  },
  "MC-137U": {
    "displayRoute": "MC-137U",
    "startPoint": "Mayur Vihar Phase 3",
    "lastPoint": "Shastri Park Metro Station",
    "operator": "Delhi Transport Corporation"
  },
  "MC341": {
    "displayRoute": "MC341",
    "startPoint": "Mayur Vihar Phase III (T) Paper Market",
    "lastPoint": "Harsh Vihar Terminal",
    "operator": "Delhi Transit"
  },
  "MC715": {
    "displayRoute": "MC715",
    "startPoint": "PERAGARHI OUTER RING ROAD",
    "lastPoint": "Burari Crossing",
    "operator": "Delhi Transit"
  },
  "MC715 STL": {
    "displayRoute": "MC715",
    "startPoint": "Majlis Park DMRC Depot",
    "lastPoint": "Burari Crossing",
    "operator": "Delhi Transit"
  },
  "ML06": {
    "displayRoute": "ML06",
    "startPoint": "Vishwa Vidyalaya Metro Station",
    "lastPoint": "Keshav Nagar Mukti Ashram",
    "operator": "Delhi Transit"
  },
  "ML06 STL": {
    "displayRoute": "ML06",
    "startPoint": "Majlis Park DMRC Depot",
    "lastPoint": "Keshav Nagar Mukti Ashram",
    "operator": "Delhi Transit"
  },
  "ML-58": {
    "displayRoute": "ML-58",
    "startPoint": "Lado Sarai Terminal",
    "lastPoint": "Bhati Mines",
    "operator": "Delhi Transport Corporation"
  },
  "ML-81": {
    "displayRoute": "ML-81",
    "startPoint": "Lado Sarai Terminal",
    "lastPoint": "Modi Mill",
    "operator": "Delhi Transport Corporation"
  },
  "ML-82": {
    "displayRoute": "ML-82",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Badarpur Border",
    "operator": "Delhi Transport Corporation"
  },
  "ML96": {
    "displayRoute": "ML96",
    "startPoint": "Ramdev Chowk Narela Terminal",
    "lastPoint": "Majlis Park Metro Station",
    "operator": "Delhi Transit"
  },
  "ML-96S": {
    "displayRoute": "ML-96S",
    "startPoint": "Jahangirpuri Metro Station",
    "lastPoint": "Majlis Park Metro Station",
    "operator": "Delhi Transport Corporation"
  },
  "ML96 STL": {
    "displayRoute": "ML96",
    "startPoint": "Majlis Park Metro Station",
    "lastPoint": "Majlis Park DMRC Depot",
    "operator": "Delhi Transit"
  },
  "ML-96U": {
    "displayRoute": "ML-96U",
    "startPoint": "Ramdev Chowk Narela",
    "lastPoint": "Azadpur Terminal",
    "operator": "Delhi Transport Corporation"
  },
  "MS-3": {
    "displayRoute": "MS-3",
    "startPoint": "PNB Geetanjali",
    "lastPoint": "Kailash Colony Metro Station",
    "operator": "DTC"
  },
  "MSB04": {
    "displayRoute": "MSB04",
    "startPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "lastPoint": "Kalkaji Depot",
    "operator": "DTC"
  },
  "MSB10": {
    "displayRoute": "MSB10",
    "startPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "lastPoint": "BBM Depot",
    "operator": "DTC"
  },
  "MSB13": {
    "displayRoute": "MSB13",
    "startPoint": "Rohini Depot 1 Sec 6 (Ambedkar Hospital) / D Mall Sec-10",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSB14": {
    "displayRoute": "MSB14",
    "startPoint": "Subhash Place Depot",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSB19": {
    "displayRoute": "MSB19",
    "startPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "lastPoint": "Netaji Subash Place Depot",
    "operator": "DTC"
  },
  "MSB2": {
    "displayRoute": "MSB2",
    "startPoint": "Maya Puri Depot",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSB22": {
    "displayRoute": "MSB22",
    "startPoint": "Rohini Depot 1 Sec 6 (Ambedkar Hospital) / D Mall Sec-10",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSB24": {
    "displayRoute": "MSB24",
    "startPoint": "Punjab Kesari (Subhash Palace Depot)",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSB30": {
    "displayRoute": "MSB30",
    "startPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "MSB33": {
    "displayRoute": "MSB33",
    "startPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "MSB8": {
    "displayRoute": "MSB8",
    "startPoint": "Sukhdev Vihar Depot",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSB9": {
    "displayRoute": "MSB9",
    "startPoint": "Sukhdev Vihar Depot",
    "lastPoint": "MODERN SCHOOL BARA KHAMBA ROAD",
    "operator": "DTC"
  },
  "MSVV17": {
    "displayRoute": "MSVV17",
    "startPoint": "Modern School Vasant Vihar F Block",
    "lastPoint": "Kalkaji Depot",
    "operator": "DTC"
  },
  "MSVV19": {
    "displayRoute": "MSVV19",
    "startPoint": "Modern School Vasant Vihar F Block",
    "lastPoint": "Kalkaji Depot",
    "operator": "DTC"
  },
  "MSVV6": {
    "displayRoute": "MSVV6",
    "startPoint": "Modern School Vasant Vihar F Block",
    "lastPoint": "Kalkaji Depot",
    "operator": "DTC"
  },
  "Nanaksar To Old Gaziabad Bus Stand": {
    "displayRoute": "Nanaksar To Old Gaziabad Bus Stand",
    "startPoint": "NanakSar",
    "lastPoint": "Old Gaziabad Bus Stand",
    "operator": "DTC"
  },
  "NARELA A-9 TERMINAL TO BAHADURGARH": {
    "displayRoute": "NARELA A-9 TERMINAL TO BAHADURGARH",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Bahadur Garh / Bahadurgarh Old Bus Stand",
    "operator": "DTC"
  },
  "NCR BAHADURGAR-GURUGRAM": {
    "displayRoute": "NCR BAHADURGAR-GURUGRAM",
    "startPoint": "Bahadurgarh ISBT",
    "lastPoint": "Gurugram ISBT / Gurgaon",
    "operator": "DTC"
  },
  "NCR GURUGRAM-BAHADURGAR": {
    "displayRoute": "NCR GURUGRAM-BAHADURGAR",
    "startPoint": "Gurgaon / Gurugram ISBT",
    "lastPoint": "Bahadurgarh ISBT",
    "operator": "DTC"
  },
  "NCR JHAJJAR-NAJAFGARH": {
    "displayRoute": "NCR JHAJJAR-NAJAFGARH",
    "startPoint": "Jhajjar ISBT",
    "lastPoint": "Najafgarh Nangloi Stand",
    "operator": "DTC"
  },
  "NCR NAJAFGARH- JHAJJAR": {
    "displayRoute": "NCR NAJAFGARH- JHAJJAR",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Jhajjar ISBT",
    "operator": "DTC"
  },
  "N.D.RLY. ST. G.-2 TO BAHADURGARH": {
    "displayRoute": "N.D.RLY. ST. G.-2 TO BAHADURGARH",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Bahadur Garh / Bahadurgarh Old Bus Stand",
    "operator": "DTC"
  },
  "NS AIR PORT SHUTTLE SERVICE": {
    "displayRoute": "NS AIR PORT SHUTTLE SERVICE",
    "startPoint": "IGI Airport Terminal 3",
    "lastPoint": "Domestic Airport / Palam Airport",
    "operator": "DTC"
  },
  "Old Gaziabad Bus Stand To Nanaksar": {
    "displayRoute": "Old Gaziabad Bus Stand To Nanaksar",
    "startPoint": "Old Gaziabad Bus Stand",
    "lastPoint": "NanakSar",
    "operator": "DTC"
  },
  "OMS(+)": {
    "displayRoute": "OMS(+)",
    "startPoint": "ISBT Anand Vihar",
    "lastPoint": "ISBT Anand Vihar",
    "operator": "DTC"
  },
  "OMS(-)": {
    "displayRoute": "OMS(-)",
    "startPoint": "ISBT Anand Vihar",
    "lastPoint": "Anand Vihar ISBT",
    "operator": "DTC"
  },
  "OMS STL": {
    "displayRoute": "OMS",
    "startPoint": "Burari EV Depot (Outshed)",
    "lastPoint": "Burari Crossing",
    "operator": "Delhi Transit"
  },
  "PANIPAT NEW BUS STAND TO MAHARAN PRATAP ISBT": {
    "displayRoute": "PANIPAT NEW BUS STAND TO MAHARAN PRATAP ISBT",
    "startPoint": "PANIPAT NEW BUS STAND",
    "lastPoint": "ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "Peeragarhi Chowk To Rohtak New Bus Stand": {
    "displayRoute": "Peeragarhi Chowk To Rohtak New Bus Stand",
    "startPoint": "Peera Garhi Chowk",
    "lastPoint": "Rohtak New Bus Stand",
    "operator": "DTC"
  },
  "RL75": {
    "displayRoute": "RL75",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Dwarka sec-14 metro station",
    "operator": "Delhi Transit"
  },
  "RL75A": {
    "displayRoute": "RL75A",
    "startPoint": "Dwarka Sec 14 Metro Station",
    "lastPoint": "Dhaula Kuan",
    "operator": "Delhi Transit"
  },
  "RL75LINK STL": {
    "displayRoute": "RL75LINK",
    "startPoint": "Dwarka sector 22 Cluster Depot",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "RL-75 STL": {
    "displayRoute": "RL-75",
    "startPoint": "Dwarka Sec-2 Depot",
    "lastPoint": "Dwarka Sec-13 Metro Station",
    "operator": "DTC"
  },
  "RL75 STL": {
    "displayRoute": "RL75",
    "startPoint": "Dwarka sector 22 Cluster Depot",
    "lastPoint": "Dwarka Sec 14 Metro Station",
    "operator": "Delhi Transit"
  },
  "RL-77": {
    "displayRoute": "RL-77",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Manglapuri / Palam Village",
    "operator": "DTC"
  },
  "RL77B": {
    "displayRoute": "RL77B",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Dwarka More Metro Station (Terminal)",
    "operator": "Delhi Transit"
  },
  "RL77B Ext": {
    "displayRoute": "RL77B",
    "startPoint": "Dwarka More Metro Station (Terminal)",
    "lastPoint": "Dhaula Kuan (Ring Road)",
    "operator": "Delhi Transit"
  },
  "RL-77 Ext": {
    "displayRoute": "RL-77",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Dwarka Sec 19 Pocket B (T)",
    "operator": "DTC"
  },
  "RL77 STL": {
    "displayRoute": "RL77",
    "startPoint": "Dwarka sector 22 Cluster Depot",
    "lastPoint": "Dwarka Sec 19 Pocket B (T)",
    "operator": "Delhi Transit"
  },
  "RL-77 STL": {
    "displayRoute": "RL-77",
    "startPoint": "Dwarka Sector-11 Metro Station Gate No.2",
    "lastPoint": "Dwarka Sec 2/6",
    "operator": "DTC"
  },
  "RL-79": {
    "displayRoute": "RL-79",
    "startPoint": "New Delhi Railway Station Gate 2",
    "lastPoint": "Dwarka Sec23",
    "operator": "Delhi Transit"
  },
  "RL79A": {
    "displayRoute": "RL79A",
    "startPoint": "Dwarka Sec23",
    "lastPoint": "Dhaula Kuan",
    "operator": "Delhi Transit"
  },
  "Rohtak New Bus Stand To Maharana Pratap ISBT": {
    "displayRoute": "Rohtak New Bus Stand To Maharana Pratap ISBT",
    "startPoint": "Rohtak New Bus Stand",
    "lastPoint": "ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "Rohtak New Bus Stand To Peeragarhi Chowk": {
    "displayRoute": "Rohtak New Bus Stand To Peeragarhi Chowk",
    "startPoint": "Rohtak New Bus Stand",
    "lastPoint": "Peera Garhi Chowk",
    "operator": "DTC"
  },
  "S1": {
    "displayRoute": "S1",
    "startPoint": "Tilak Nagar Terminal",
    "lastPoint": "Pandwala Kalan (T)",
    "operator": "Delhi Transit"
  },
  "S1 STL": {
    "displayRoute": "S1",
    "startPoint": "Rewla Khanpur Depot",
    "lastPoint": "Pandwala Kalan (T)",
    "operator": "Delhi Transit"
  },
  "SC-IP-": {
    "displayRoute": "SC-IP-",
    "startPoint": "Supreme Court / Pragati Maidan Metro Station",
    "lastPoint": "Indraprastha Depot",
    "operator": "Delhi Transit"
  },
  "SONIPAT BUS STAND TO MAHARANA PRATAP ISBT": {
    "displayRoute": "SONIPAT BUS STAND TO MAHARANA PRATAP ISBT",
    "startPoint": "Sonipat Bus Stand",
    "lastPoint": "ISBT Maharana Pratap Bus Terminal",
    "operator": "DTC"
  },
  "SPV10": {
    "displayRoute": "SPV10",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Nehru Place Terminal",
    "operator": "DTC"
  },
  "SPV11": {
    "displayRoute": "SPV11",
    "startPoint": "Sukhdev Vihar Depot",
    "lastPoint": "SARDAR PATEL VIDYALAYA LODHI ESTATE",
    "operator": "DTC"
  },
  "SPV12": {
    "displayRoute": "SPV12",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Maya Puri Depot",
    "operator": "DTC"
  },
  "SPV16": {
    "displayRoute": "SPV16",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "SPV17": {
    "displayRoute": "SPV17",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Nand Nagari Depot",
    "operator": "DTC"
  },
  "SPV18": {
    "displayRoute": "SPV18",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "SPV19": {
    "displayRoute": "SPV19",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "SPV20": {
    "displayRoute": "SPV20",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "SPV21": {
    "displayRoute": "SPV21",
    "startPoint": "SARDAR PATEL VIDYALAYA LODHI ESTATE",
    "lastPoint": "BBM Depot",
    "operator": "DTC"
  },
  "SPV22": {
    "displayRoute": "SPV22",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Hasanpur Depot",
    "operator": "DTC"
  },
  "SPV23": {
    "displayRoute": "SPV23",
    "startPoint": "Naraina Depot",
    "lastPoint": "SARDAR PATEL VIDYALYA",
    "operator": "DTC"
  },
  "SPV24": {
    "displayRoute": "SPV24",
    "startPoint": "SARDAR PATEL VIDYALAYA LODHI ESTATE",
    "lastPoint": "Nehru Place / Paras Cinema",
    "operator": "DTC"
  },
  "SPV25": {
    "displayRoute": "SPV25",
    "startPoint": "Sukhdev Vihar Depot",
    "lastPoint": "SARDAR PATEL VIDYALAYA LODHI ESTATE",
    "operator": "DTC"
  },
  "SPV4": {
    "displayRoute": "SPV4",
    "startPoint": "Sukhdev Vihar Depot",
    "lastPoint": "SARDAR PATEL VIDYALAYA LODHI ESTATE",
    "operator": "DTC"
  },
  "SPV5": {
    "displayRoute": "SPV5",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Nehru Place / Paras Cinema",
    "operator": "DTC"
  },
  "SPV6": {
    "displayRoute": "SPV6",
    "startPoint": "Sukhdev Vihar Depot",
    "lastPoint": "SARDAR PATEL VIDYALYA",
    "operator": "DTC"
  },
  "SPV7": {
    "displayRoute": "SPV7",
    "startPoint": "SARDAR PATEL VIDYALYA",
    "lastPoint": "Kalkaji Depot",
    "operator": "DTC"
  },
  "SPV8": {
    "displayRoute": "SPV8",
    "startPoint": "SARDAR PATEL VIDYALAYA LODHI ESTATE",
    "lastPoint": "Kalkaji Depot",
    "operator": "DTC"
  },
  "SUPREMECOURT-IPMTEROSTATION": {
    "displayRoute": "SUPREMECOURT-IPMTEROSTATION",
    "startPoint": "Supreme Court / Supreme court metro station",
    "lastPoint": "IP MTERO STATION",
    "operator": "DTC"
  },
  "SUPREME COURT / PRAGATI MAIDAN METRO STATION - KUSHAK NALLAH DEPOT - 2 STL": {
    "displayRoute": "SUPREME COURT / PRAGATI MAIDAN METRO STATION - KUSHAK NALLAH DEPOT - 2",
    "startPoint": "Supreme Court / Pragati Maidan Metro Station",
    "lastPoint": "Kushak Nallah Depot",
    "operator": "DTC"
  },
  "TILAK NAGAR TO GUBHANA MAJRI": {
    "displayRoute": "TILAK NAGAR TO GUBHANA MAJRI",
    "startPoint": "Tilak Nagar Crossing (Najafgarh Road)",
    "lastPoint": "GUBHANA MAJRI",
    "operator": "DTC"
  },
  "TMS(+)": {
    "displayRoute": "TMS(+)",
    "startPoint": "ISBT Sarai Kale Khan",
    "lastPoint": "ISBT Sarai Kale Khan",
    "operator": "DTC"
  },
  "TMS(-)": {
    "displayRoute": "TMS(-)",
    "startPoint": "Sarai Kale Khan ISBT",
    "lastPoint": "Sarai Kale Khan ISBT",
    "operator": "DTC"
  },
  "U-SPL-01": {
    "displayRoute": "U-SPL-01",
    "startPoint": "Sec A9 Narela / Narela Pocket 13 / A9",
    "lastPoint": "Patel Chest",
    "operator": "DTC"
  },
  "U-SPL-02": {
    "displayRoute": "U-SPL-02",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Aurobindo College",
    "operator": "DTC"
  },
  "U-SPL-03": {
    "displayRoute": "U-SPL-03",
    "startPoint": "Ramjas College / Mourice Nagar 2",
    "lastPoint": "Poorvanchal Hostel (T)",
    "operator": "DTC"
  },
  "U-SPL-04": {
    "displayRoute": "U-SPL-04",
    "startPoint": "Rithala Metro Station",
    "lastPoint": "Aditi College Bawana",
    "operator": "DTC"
  },
  "U-SPL-05": {
    "displayRoute": "U-SPL-05",
    "startPoint": "Mehrauli Terminal",
    "lastPoint": "Kirodi Mal College",
    "operator": "DTC"
  },
  "U-SPL-06": {
    "displayRoute": "U-SPL-06",
    "startPoint": "Shri Ram College",
    "lastPoint": "Moti Bagh 1",
    "operator": "DTC"
  },
  "U-SPL-07": {
    "displayRoute": "U-SPL-07",
    "startPoint": "Rajouri Garden Extn.",
    "lastPoint": "Khalsa College",
    "operator": "DTC"
  },
  "U-SPL-08": {
    "displayRoute": "U-SPL-08",
    "startPoint": "Punjabi Bagh Crossing / PUNJABI BAGH",
    "lastPoint": "B.N.WOMEN COLLEGE KAIR / Bhagini Nivedita College",
    "operator": "DTC"
  },
  "U-SPL-09": {
    "displayRoute": "U-SPL-09",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Daulat Ram College",
    "operator": "DTC"
  },
  "U-SPL-10": {
    "displayRoute": "U-SPL-10",
    "startPoint": "PG DAV College / Sri Niwaspuri",
    "lastPoint": "Delhi University Art Faculty",
    "operator": "DTC"
  },
  "U-SPL-11": {
    "displayRoute": "U-SPL-11",
    "startPoint": "Katevara Village",
    "lastPoint": "Hindu Collage",
    "operator": "DTC"
  },
  "U-SPL-12": {
    "displayRoute": "U-SPL-12",
    "startPoint": "Vayusenabad (Tigri)",
    "lastPoint": "Shri Ram College",
    "operator": "DTC"
  },
  "U-SPL-13": {
    "displayRoute": "U-SPL-13",
    "startPoint": "Rohini Sec 16 (T)",
    "lastPoint": "C2B Janak Puri /Bharati College",
    "operator": "DTC"
  },
  "U-SPL-14": {
    "displayRoute": "U-SPL-14",
    "startPoint": "HauzKhas Metro Station",
    "lastPoint": "ARSD College / Dhaula Kuan",
    "operator": "DTC"
  },
  "U-SPL-15": {
    "displayRoute": "U-SPL-15",
    "startPoint": "Swami Sharda Nand Collage / Alipur Block",
    "lastPoint": "Jahangirpuri Metro Station GT Road",
    "operator": "DTC"
  },
  "U-SPL-16": {
    "displayRoute": "U-SPL-16",
    "startPoint": "Delhi University Art Faculty",
    "lastPoint": "C R Park",
    "operator": "DTC"
  },
  "U-SPL-17": {
    "displayRoute": "U-SPL-17",
    "startPoint": "Dwarka Sec 3/4",
    "lastPoint": "Delhi University / North Campus",
    "operator": "DTC"
  },
  "U-SPL-18": {
    "displayRoute": "U-SPL-18",
    "startPoint": "Sayed Gaon Nangloi (T)",
    "lastPoint": "Laxmi Bai College",
    "operator": "DTC"
  },
  "U-SPL-19": {
    "displayRoute": "U-SPL-19",
    "startPoint": "Shri Ram College",
    "lastPoint": "Inderpuri Krishi Kunj (T)",
    "operator": "DTC"
  },
  "U-SPL-20": {
    "displayRoute": "U-SPL-20",
    "startPoint": "Samachar Appartments",
    "lastPoint": "Bapu Dham",
    "operator": "DTC"
  },
  "U-SPL-21": {
    "displayRoute": "U-SPL-21",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Mata Sundari Collage",
    "operator": "DTC"
  },
  "U-SPL-22": {
    "displayRoute": "U-SPL-22",
    "startPoint": "Najafgarh Terminal",
    "lastPoint": "Maitrey Collage",
    "operator": "DTC"
  },
  "U-SPL-23": {
    "displayRoute": "U-SPL-23",
    "startPoint": "Shahdara Terminal",
    "lastPoint": "Aurobindo College",
    "operator": "DTC"
  },
  "U-SPL-24": {
    "displayRoute": "U-SPL-24",
    "startPoint": "Mayur Vihar Phase-II - Pkt C - Metro Station - Terminal",
    "lastPoint": "Dayal Singh College",
    "operator": "DTC"
  },
  "U-SPL-25": {
    "displayRoute": "U-SPL-25",
    "startPoint": "Delhi University / North Campus",
    "lastPoint": "C9 Vasant Kunj",
    "operator": "DTC"
  },
  "UTTAM NAGAR (T) TO GURGAON": {
    "displayRoute": "UTTAM NAGAR (T) TO GURGAON",
    "startPoint": "Uttam Nagar Terminal (Out Gate)",
    "lastPoint": "Gurugram ISBT / Gurgaon",
    "operator": "DTC"
  },
  "VASANT VIHAR METRO STATION - ANDHERIA BAGH MORE / CHHATARPUR METRO STATION": {
    "displayRoute": "VASANT VIHAR METRO STATION - ANDHERIA BAGH MORE / CHHATARPUR METRO STATION",
    "startPoint": "Vasant Vihar Metro Station",
    "lastPoint": "Andheria Mor / Chhattar Pur Metro Station",
    "operator": "DTC"
  },
  "YMS(+)": {
    "displayRoute": "YMS(+)",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  },
  "YMS(-)": {
    "displayRoute": "YMS(-)",
    "startPoint": "Mori Gate Terminal",
    "lastPoint": "Mori Gate Terminal",
    "operator": "DTC"
  }
};

/**
 * Resolves the true commercial route number shown on the bus LED destination board
 */
export function resolveCommercialRoute(rawRouteId: string): {
  displayRoute: string;
  startPoint?: string;
  lastPoint?: string;
  operator?: string;
} {
  if (!rawRouteId) return { displayRoute: "Delhi Transit" };
  const trimmed = rawRouteId.trim();

  // 1. Direct registry lookup
  if (DELHI_ROUTE_REGISTRY[trimmed]) {
    const item = DELHI_ROUTE_REGISTRY[trimmed];
    return {
      displayRoute: item.displayRoute,
      startPoint: item.startPoint,
      lastPoint: item.lastPoint,
      operator: item.operator,
    };
  }

  // 2. Normalization for leading zeros e.g. "0502" -> "502", "0740" -> "740", "0114" -> "114", "0804" -> "804"
  if (/^0+[1-9]\d*/.test(trimmed)) {
    const stripped = trimmed.replace(/^0+/, "").replace(/\([^)]*\)/g, "").trim();
    if (DELHI_ROUTE_REGISTRY[stripped]) {
      const item = DELHI_ROUTE_REGISTRY[stripped];
      return {
        displayRoute: item.displayRoute,
        startPoint: item.startPoint,
        lastPoint: item.lastPoint,
        operator: item.operator,
      };
    }
    return { displayRoute: stripped };
  }

  // 3. Night service clean e.g. "0118EXT(NS) Ext" -> "118 Ext"
  if (trimmed.includes("(NS)")) {
    const cleaned = trimmed.replace(/\(NS\)/gi, "").replace(/^0+/, "").trim();
    return { displayRoute: cleaned };
  }

  return { displayRoute: trimmed };
}

/**
 * Resolves the home maintenance depot in Delhi based on vehicle registration prefix & fleet number
 */
export function resolveBusDepot(vehicleId: string): string {
  const plate = vehicleId.toUpperCase().replace(/[^A-Z0-9]/g, "");
  
  // Electric Bus Depots (DL51EV...)
  if (plate.startsWith("DL51EV")) {
    const num = parseInt(plate.slice(6), 10) || 0;
    if (num < 1500) return "Rohini Depot-1 (Electric)";
    if (num < 2500) return "Mayapuri Depot (Electric)";
    if (num < 3500) return "BBM Depot (Electric)";
    if (num < 4500) return "Tehkhand Depot (Electric)";
    if (num < 5500) return "Rajghat Depot (Electric)";
    return "Kanjhawala Depot (Electric)";
  }

  // DTC CNG Depots (DL1PD...)
  if (plate.startsWith("DL1PD")) {
    const num = parseInt(plate.slice(5), 10) || 0;
    if (num < 1000) return "Wazirpur Depot-1";
    if (num < 2000) return "Hasanpur Depot";
    if (num < 3000) return "Okhla Depot";
    if (num < 4000) return "Sukhdev Vihar Depot";
    if (num < 5000) return "Dichaon Kalan Depot";
    if (num < 6000) return "Subhash Nagar Depot";
    if (num < 7000) return "Nand Nagri Depot";
    return "Banda Bahadur Marg (BBM-1) Depot";
  }

  // DIMTS Cluster Depots (DL1PC, DL1PB, etc.)
  if (plate.startsWith("DL1P")) {
    return "DIMTS Cluster Transit Depot (Delhi)";
  }

  return "Delhi Central Fleet Depot";
}

/**
 * Calculates live crowding estimate as shown in the Delhi One App
 */
export function estimateOccupancy(speedKmH: number, hour: number = new Date().getHours()): "low" | "moderate" | "crowded" {
  // Peak office rush hours in Delhi: 08:30-11:00 AM & 17:00-20:30 PM
  const isMorningPeak = hour >= 8 && hour <= 11;
  const isEveningPeak = hour >= 17 && hour <= 20;
  
  if (isMorningPeak || isEveningPeak) {
    if (speedKmH < 15) return "crowded";
    return "moderate";
  }

  if (speedKmH > 30) return "low";
  if (speedKmH < 10) return "moderate";
  return "low";
}
