import { useState, useEffect, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCdzjFcWhSsPY6EHPZoLL24X-CigYPipsM",
  authDomain: "erden-gbr.firebaseapp.com",
  databaseURL: "https://erden-gbr-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "erden-gbr",
  storageBucket: "erden-gbr.firebasestorage.app",
  messagingSenderId: "857742397928",
  appId: "1:857742397928:web:4573af88872a333914545d"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const DB_PATH = "erden-gbr-data";
const LS_KEY = "erden-gbr-data-v1";
function lsSave(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch(e) {}
}
function lsLoad() {
  try { const d = localStorage.getItem(LS_KEY); return d ? JSON.parse(d) : null; } catch(e) { return null; }
}
const USERS_KEY = "erden-gbr-users-v1";
function getUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    if(saved) return JSON.parse(saved);
  } catch(e) {}
  return [{ username:"Erden", password:"1234", email:"hayrettin@erden-gbr.de", role:"admin" }];
}
function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch(e) {}
}
const months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];const EDIT_PASS="1234", PRIVAT_PASS="1234", YEAR_PASS="1234";const YEARS=[2025,2026,2027,2028,2029,2030], ACTIVE_YEAR=2026;const OWNER={name:"Erden GbR",street:"Weselerstr. 119",city:"47169 Duisburg",tel1:"0173-710 2388",tel2:"0174-266 1000",iban:"DE12 0001 2345 6789 0123 45"};const BUILDING_LAYOUTS={  W134:[[{id:"6",label:"DG Li"},{
id:"7",label:"DG Re"}],[{id:"5",label:"3.OG"}],[{id:"4",label:"2.OG"}],[{id:"3",label:"1.OG"}],[{id:"1",label:"Laden"},{id:"2",label:"Anbau"}]],  W152:[[{id:"3",label:"2.OG"}],[{id:"2",label:"1.OG"}],[{id:"1",label:"Laden"}]],  W152A:[[{id:"6",label:"DG"}],[{id:"4",label:"1OG Re"},{id:"5",label:"1OG Li"}],[{id:"1",label:"Laden"},{id:"8",label:"AnbauRe"},{
id:"7",label:"AnbauLi"}]],  D30:[[{id:"5",label:"4.OG"}],[{id:"4",label:"3.OG"}],[{id:"3",label:"2.OG"}],[{id:"2",label:"1.OG"}],[{id:"1",label:"EG"}]],  D32:[[{id:"5",label:"DG"}],[{id:"4",label:"3.OG"}],[{id:"3",label:"2.OG"}],[{id:"2",label:"1.OG"}],[{id:"1",label:"EG"}]],  WI44:[[{id:"8",label:"DGRe"},{id:"9",label:"DGLi"}],[{id:"6",label:"3Re"},{id:"7",label:"3Li"}],[{id:"4",label:"2Re"},{id:"5",label:"2Li"}],[{id:"2",label:"1Re"},{id:"3",label:"1Li"}],[{id:"1",label:"EGRe"},{
id:"10",label:"EGLi"}]],  R1:[[{id:"5",label:"DG"}],[{id:"4",label:"2.OG"}],[{id:"3",label:"1.OG"}],[{id:"1",label:"EGRe"},{id:"2",label:"EGLi"}]],  D68:[[{id:"5",label:"2Re"},{id:"6",label:"2Li"}],[{id:"3",label:"1Re"},{id:"4",label:"1Li"}],[{id:"1",label:"EGRe"},{id:"2",label:"EGLi"}]],  D70:[[{id:"5",label:"2Re"},{id:"6",label:"2Li"}],[{id:"3",label:"1Re"},{id:"4",label:"1Li"}],[{id:"1",label:"EGRe"},{
id:"2",label:"EGLi"}]],};const INIT_NEBEN_DATA = {  "WI44": {    label:"Wilfriedstr. 44", year:2024,    tenants:[      {nr:"008",name:"Rashad Ismael",etage:"DG Rechts",personen:1,qm:12.5,monate:2,vz_bk:null,vz_hz:null,bk_mo:15,hz_mo:10},      {nr:"008b",name:"Rashad Ismael",etage:"DG Links",personen:0,qm:12.5,monate:2,vz_bk:null,vz_hz:null,bk_mo:10,hz_mo:10},      {nr:"006",name:"Costel Fernando Serban",etage:"3.OG Rechts",personen:4,qm:44.22,monate:5,vz_bk:null,vz_hz:null,bk_mo:135,hz_mo:165},
      {nr:"007",name:"Borisov Slavcho",etage:"3.OG Links",personen:6,qm:62.89,monate:12,vz_bk:null,vz_hz:null,bk_mo:85,hz_mo:75},      {nr:"004",name:"Bahica Bobi",etage:"2.OG Rechts",personen:4,qm:44.22,monate:12,vz_bk:null,vz_hz:null,bk_mo:50,hz_mo:50},      {nr:"005",name:"Yasmin Nassan",etage:"2.OG Links",personen:4,qm:62.89,monate:12,vz_bk:null,vz_hz:null,bk_mo:190,hz_mo:160},
      {nr:"002",name:"Marinov Zahari",etage:"1.OG Rechts",personen:3,qm:44.22,monate:12,vz_bk:null,vz_hz:null,bk_mo:90,hz_mo:90},      {nr:"003",name:"Wian Abubakar",etage:"1.OG Links",personen:5,qm:62.89,monate:12,vz_bk:null,vz_hz:null,bk_mo:175,hz_mo:120},      {nr:"001",name:"Wahida Ismael",etage:"EG Rechts und Links",personen:7,qm:107.11,monate:12,vz_bk:-3600,vz_hz:-3000,bk_mo:250,hz_mo:150},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:3780.86,art:"Person"},
      {nr:2,name:"Abwasser",betrag:4056.63,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:2463.08,art:"Person"},      {nr:4,name:"Allgemeinstrom",betrag:715.23,art:"Fläche"},      {nr:5,name:"Gebäudeversicherung",betrag:1543.38,art:"Fläche"},      {nr:6,name:"Gemeinschaftsantennen",betrag:0,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1332.68,art:"Fläche"},      {nr:8,name:"Hausmeisterkosten",betrag:1500,art:"Fläche"},
      {nr:9,name:"Niederschlagwasser",betrag:165,art:"Fläche"},      {nr:10,name:"Straßenreinigung",betrag:938.56,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},      {nr:12,name:"Winterdienst",betrag:17,art:"Fläche"},      {nr:13,name:"Treppenreinigung",betrag:1200,art:"Fläche"},      {nr:14,name:"Heizkosten 50% (Fläche)",betrag:7384.09,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:7384.09,art:"Fläche"},    ]  },
  "R1": {    label:"Reinerstr. 1", year:2024,    tenants:[      {nr:"013",name:"Danka Kalova",etage:"DG",personen:6,qm:120,monate:12,vz_bk:null,vz_hz:null,bk_mo:100,hz_mo:150},      {nr:"012",name:"Yulian Mihaylov",etage:"2.OG",personen:4,qm:120,monate:12,vz_bk:null,vz_hz:null,bk_mo:165,hz_mo:150},      {nr:"011",name:"Alexander Baydakov",etage:"1.OG",personen:1,qm:120,monate:12,vz_bk:null,vz_hz:null,bk_mo:110,hz_mo:180},
      {nr:"009",name:"Yosif Mihaylov",etage:"EG Rechts",personen:2,qm:40,monate:12,vz_bk:null,vz_hz:null,bk_mo:50,hz_mo:50},      {nr:"010",name:"Darius Wroblewsky",etage:"EG Links",personen:1,qm:40,monate:12,vz_bk:null,vz_hz:null,bk_mo:50,hz_mo:50},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:4799.69,art:"Person"},{nr:2,name:"Abwasser",betrag:5836.04,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:1211.68,art:"Person"},{nr:4,name:"Allgemeinstrom",betrag:483.4,art:"Fläche"},
      {nr:5,name:"Gebäudeversicherung",betrag:1405.57,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:0,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1353,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:1200,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:174.24,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:135.2,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{nr:12,name:"Winterdienst",betrag:0,art:"Fläche"},
      {nr:13,name:"Treppenreinigung",betrag:960,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:4823.51,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:4823.51,art:"Fläche"},    ]  },  "W134": {    label:"Weselerstr. 134", year:2024,    tenants:[      {nr:"020",name:"Cevdet Demir",etage:"DG Links",personen:1,qm:25,monate:12,vz_bk:-300,vz_hz:-300,bk_mo:25,hz_mo:25},
      {nr:"019",name:"Nedzde Petrova",etage:"DG Rechts",personen:2,qm:40,monate:12,vz_bk:-540,vz_hz:-540,bk_mo:45,hz_mo:45},      {nr:"018",name:"Krasmir Velchov",etage:"3. OG",personen:3,qm:85,monate:12,vz_bk:-900,vz_hz:-900,bk_mo:75,hz_mo:75},      {nr:"017",name:"Familie Stoilov",etage:"2. OG",personen:7,qm:85.56,monate:12,vz_bk:-900,vz_hz:-900,bk_mo:75,hz_mo:75},      {nr:"016",name:"Angelova Bodanka",etage:"1. OG",personen:4,qm:85.56,monate:12,vz_bk:-900,vz_hz:-900,bk_mo:75,hz_mo:75},
      {nr:"014",name:"Miles Berufsbekleidung",etage:"EG",personen:1,qm:85,monate:12,vz_bk:-900,vz_hz:-900,bk_mo:75,hz_mo:75},      {nr:"015",name:"Aleksandria Eser",etage:"Anbau",personen:2,qm:31.15,monate:12,vz_bk:-780,vz_hz:-780,bk_mo:65,hz_mo:65},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:1944.48,art:"Person"},{nr:2,name:"Abwasser",betrag:2067.09,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:1015.53,art:"Person"},{nr:4,name:"Allgemeinstrom",betrag:882.77,art:"Fläche"},
      {nr:5,name:"Gebäudeversicherung",betrag:1227.64,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:0,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1419.88,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:1000,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:267.96,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:253.6,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{nr:12,name:"Winterdienst",betrag:20,art:"Fläche"},
      {nr:13,name:"Treppenreinigung",betrag:960,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:6443.66,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:6443.66,art:"Fläche"},    ]  },  "W152": {    label:"Weselerstr. 152", year:2024,    tenants:[      {nr:"023",name:"Daniel Nae",etage:"2.OG",personen:10,qm:85,monate:8,vz_bk:null,vz_hz:null,bk_mo:200,hz_mo:200},
      {nr:"022",name:"Familie Zeqiri",etage:"1.OG Re+Li",personen:8,qm:120,monate:12,vz_bk:null,vz_hz:null,bk_mo:200,hz_mo:150},      {nr:"021",name:"Murat Saglam",etage:"EG Ladenlokal",personen:1,qm:185,monate:9,vz_bk:null,vz_hz:null,bk_mo:100,hz_mo:50},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:1833.15,art:"Person"},{nr:2,name:"Abwasser",betrag:2043.42,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:1439.76,art:"Person"},{
nr:4,name:"Allgemeinstrom",betrag:346.24,art:"Fläche"},      {nr:5,name:"Gebäudeversicherung",betrag:1852.94,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:250,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:688.52,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:300,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:311.52,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:253.6,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{
nr:12,name:"Winterdienst",betrag:20,art:"Fläche"},      {nr:13,name:"Treppenreinigung",betrag:300,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:4734.3,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:4734.3,art:"Fläche"},    ]  },  "W152A": {    label:"Weselerstr. 152a", year:2024,    tenants:[      {nr:"027",name:"Mustafa Shakir",etage:"DG",personen:2,qm:67.87,monate:12,vz_bk:null,vz_hz:null,bk_mo:35,hz_mo:30},
      {nr:"026",name:"Angel Asenov",etage:"1.OG Rechts",personen:5,qm:58.87,monate:12,vz_bk:null,vz_hz:null,bk_mo:125,hz_mo:125},      {nr:"025",name:"Sevdalin Georgiev",etage:"1.OG Links",personen:4,qm:74.88,monate:12,vz_bk:null,vz_hz:null,bk_mo:100,hz_mo:100},      {nr:"024",name:"Delbar Mahmoud",etage:"Ladenlokal",personen:1,qm:83,monate:12,vz_bk:null,vz_hz:null,bk_mo:75,hz_mo:75},
      {nr:"029",name:"Mustan Mustan",etage:"Anbau Rechts",personen:4,qm:50,monate:12,vz_bk:null,vz_hz:null,bk_mo:50,hz_mo:50},      {nr:"028",name:"Familie Raim",etage:"Anbau Links",personen:7,qm:65,monate:12,vz_bk:null,vz_hz:null,bk_mo:75,hz_mo:75},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:2262.87,art:"Person"},{nr:2,name:"Abwasser",betrag:2643.14,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:1175.8,art:"Person"},{nr:4,name:"Allgemeinstrom",betrag:150.76,art:"Fläche"},
      {nr:5,name:"Gebäudeversicherung",betrag:1852.94,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:250,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1071.04,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:1250,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:324.72,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:152.16,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{nr:12,name:"Winterdienst",betrag:12,art:"Fläche"},
      {nr:13,name:"Treppenreinigung",betrag:0,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:4974.24,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:4974.24,art:"Fläche"},    ]  },  "D30": {    label:"Dahlstr. 30", year:2024,    tenants:[      {nr:"034",name:"Leerstand",etage:"4.OG",personen:0,qm:45,monate:12,vz_bk:null,vz_hz:null,bk_mo:0,hz_mo:0},      {nr:"033",name:"Angel Manev",etage:"3.OG",personen:4,qm:60,monate:12,vz_bk:null,vz_hz:null,bk_mo:150,hz_mo:100},
      {nr:"032",name:"Katalin Busok",etage:"2.OG",personen:6,qm:60,monate:1,vz_bk:null,vz_hz:null,bk_mo:150,hz_mo:100},      {nr:"031",name:"Sahel Sohila Mahmod Azizi",etage:"1.OG",personen:3,qm:60,monate:12,vz_bk:null,vz_hz:null,bk_mo:165,hz_mo:78},      {nr:"030",name:"Daniel Stan",etage:"EG",personen:7,qm:60,monate:6,vz_bk:null,vz_hz:null,bk_mo:196,hz_mo:180},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:2423.35,art:"Person"},{nr:2,name:"Abwasser",betrag:2595.92,art:"Person"},
      {nr:3,name:"Abfallentsorgung",betrag:1283,art:"Person"},{nr:4,name:"Allgemeinstrom",betrag:754.53,art:"Fläche"},      {nr:5,name:"Gebäudeversicherung",betrag:910.31,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:0,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1220,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:950,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:125.4,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:234.64,art:"Fläche"},
      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{nr:12,name:"Winterdienst",betrag:0,art:"Fläche"},      {nr:13,name:"Treppenreinigung",betrag:600,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:5248.8,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:5248.8,art:"Fläche"},    ]  },
  "D32": {    label:"Dahlstr. 32", year:2024,    tenants:[      {nr:"039",name:"Nacho Yordanov",etage:"DG",personen:2,qm:42.86,monate:12,vz_bk:-1200,vz_hz:0,bk_mo:100,hz_mo:0},      {nr:"038",name:"Vazile Marius Dragusi",etage:"3. OG",personen:5,qm:57,monate:12,vz_bk:-2400,vz_hz:0,bk_mo:200,hz_mo:0},      {nr:"037",name:"Familie Epka",etage:"2. OG",personen:2,qm:0,monate:12,vz_bk:-1200,vz_hz:0,bk_mo:100,hz_mo:0},
      {nr:"036",name:"Stefan Catalin und Simona Nicolae",etage:"1. OG",personen:7,qm:57.14,monate:12,vz_bk:-2160,vz_hz:0,bk_mo:180,hz_mo:0},      {nr:"035",name:"Danil Busuioc und Monica Mihail",etage:"EG",personen:6,qm:57.14,monate:12,vz_bk:-1800,vz_hz:0,bk_mo:150,hz_mo:0},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:2769.44,art:"Person"},{nr:2,name:"Abwasser",betrag:3086.41,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:1639.24,art:"Person"},{
nr:4,name:"Allgemeinstrom",betrag:2657.65,art:"Fläche"},      {nr:5,name:"Gebäudeversicherung",betrag:1383.72,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:0,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1220,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:950,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:134.64,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:301.68,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{
nr:12,name:"Winterdienst",betrag:0,art:"Fläche"},      {nr:13,name:"Treppenreinigung",betrag:720,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:3692.45,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:3692.45,art:"Fläche"},    ]  },  "D68": {    label:"Dahlstr. 68", year:2024,    tenants:[      {nr:"044",name:"Kai Wagner",etage:"2.OG Rechts",personen:1,qm:48.13,monate:12,vz_bk:null,vz_hz:null,bk_mo:95,hz_mo:105},
      {nr:"045",name:"Ali Kemal",etage:"2.OG Links",personen:1,qm:48.13,monate:12,vz_bk:null,vz_hz:null,bk_mo:95,hz_mo:44.4},      {nr:"042",name:"Mesut Akkaya",etage:"1.OG Rechts",personen:1,qm:48.13,monate:12,vz_bk:null,vz_hz:null,bk_mo:95,hz_mo:60},      {nr:"043",name:"Hüseyin Dalli",etage:"1.OG Links",personen:1,qm:48.13,monate:12,vz_bk:null,vz_hz:null,bk_mo:95,hz_mo:45},
      {nr:"040",name:"Hasan Ari",etage:"EG Rechts",personen:1,qm:48.13,monate:12,vz_bk:null,vz_hz:null,bk_mo:95,hz_mo:80},      {nr:"041",name:"Hüseyin Cagritekin",etage:"EG Links",personen:1,qm:48.13,monate:12,vz_bk:null,vz_hz:null,bk_mo:95,hz_mo:60},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:3780.86,art:"Person"},{nr:2,name:"Abwasser",betrag:4056.63,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:2463.08,art:"Person"},{
nr:4,name:"Allgemeinstrom",betrag:715.23,art:"Fläche"},      {nr:5,name:"Gebäudeversicherung",betrag:1543.38,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:310,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1332.68,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:1500,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:165,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:938.56,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{
nr:12,name:"Winterdienst",betrag:17,art:"Fläche"},      {nr:13,name:"Treppenreinigung",betrag:1200,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:3692.45,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:3692.45,art:"Fläche"},    ]  },  "D70": {    label:"Dahlstr. 70", year:2024,    tenants:[      {nr:"050",name:"Ender Michael",etage:"2. OG R.",personen:1,qm:48.13,monate:12,vz_bk:-1140,vz_hz:-848.52,bk_mo:95,hz_mo:70.71},
      {nr:"051",name:"Hans Werner",etage:"2. OG L.",personen:1,qm:48.13,monate:12,vz_bk:-1140,vz_hz:-660,bk_mo:95,hz_mo:55},      {nr:"048",name:"Bernewski Denis",etage:"1. OG R.",personen:1,qm:48.13,monate:12,vz_bk:-1140,vz_hz:-795.36,bk_mo:95,hz_mo:66.28},      {nr:"049",name:"Halil Aksu",etage:"1. OG L.",personen:2,qm:48.13,monate:12,vz_bk:-1140,vz_hz:-540,bk_mo:95,hz_mo:45},
      {nr:"046",name:"Henchen Inge",etage:"EG R.",personen:1,qm:48.13,monate:12,vz_bk:-1140,vz_hz:-720,bk_mo:95,hz_mo:60},      {nr:"047",name:"Gendlin Peter",etage:"EG L.",personen:1,qm:48.13,monate:12,vz_bk:-1140,vz_hz:-960,bk_mo:95,hz_mo:80},    ],    kosten:[      {nr:1,name:"Trinkwasser",betrag:3780.86,art:"Person"},{nr:2,name:"Abwasser",betrag:4056.63,art:"Person"},      {nr:3,name:"Abfallentsorgung",betrag:2463.08,art:"Person"},{nr:4,name:"Allgemeinstrom",betrag:715.23,art:"Fläche"},
      {nr:5,name:"Gebäudeversicherung",betrag:1543.38,art:"Fläche"},{nr:6,name:"Gemeinschaftsantennen",betrag:0,art:"Fläche"},      {nr:7,name:"Grundsteuer",betrag:1332.68,art:"Fläche"},{nr:8,name:"Hausmeisterkosten",betrag:1500,art:"Fläche"},      {nr:9,name:"Niederschlagwasser",betrag:165,art:"Fläche"},{nr:10,name:"Straßenreinigung",betrag:938.56,art:"Fläche"},      {nr:11,name:"Abrechnungsgebühr",betrag:400,art:"Fläche"},{nr:12,name:"Winterdienst",betrag:17,art:"Fläche"},
      {nr:13,name:"Treppenreinigung",betrag:1200,art:"Fläche"},{nr:14,name:"Heizkosten 50% (Fläche)",betrag:3692.45,art:"Fläche"},      {nr:15,name:"Heizkosten 50% (Verbrauch)",betrag:3692.45,art:"Fläche"},    ]  },};function calcTenantShare(bld, tenant) {  const totalP = bld.tenants.reduce((s,t)=>s+t.personen*t.monate,0);  const totalQm = bld.tenants.reduce((s,t)=>s+t.qm,0);
  let bkShare=0, hzShare=0;  for(const k of bld.kosten) {    let anteil=0;    if(k.art==="Person") { anteil = totalP>0 ? (k.betrag/totalP)*(tenant.personen*tenant.monate) : 0; }    else { anteil = totalQm>0 ? (k.betrag/totalQm)*tenant.qm : 0; }    if(k.nr<=13) bkShare+=anteil; else hzShare+=anteil;  }  const vz_bk = tenant.vz_bk!==null ? Math.abs(tenant.vz_bk) : tenant.bk_mo*tenant.monate;  const vz_hz = tenant.vz_hz!==null ? Math.abs(tenant.vz_hz) : tenant.hz_mo*tenant.monate;  const saldo_bk =
 vz_bk - bkShare;  const saldo_hz = vz_hz - hzShare;  return {bkShare, hzShare, vz_bk, vz_hz, saldo_bk, saldo_hz, saldo: saldo_bk+saldo_hz,    perTenant: bld.kosten.map(k=>{      const totalP2=bld.tenants.reduce((s,t)=>s+t.personen*t.monate,0);      const totalQm2=bld.tenants.reduce((s,t)=>s+t.qm,0);
      let a=0;      if(k.art==="Person") a=totalP2>0?(k.betrag/totalP2)*(tenant.personen*tenant.monate):0;      else a=totalQm2>0?(k.betrag/totalQm2)*tenant.qm:0;      return {nr:k.nr,name:k.name,art:k.art,gesamt:k.betrag,anteil:a};    })  };}const initBuildings=[  {id:"W134",name:"Weselerstr. 134",address:"Weselerstraße 134, 47169 Duisburg",tenants:[    {id:"1",name:"MB Berufsbekleidung",apartment:"Laden Lokal",rent:1300,phone:""},
    {id:"2",name:"Asya Eseva und Aleksandar Esev",apartment:"Anbau",rent:600,phone:""},    {id:"3",name:"Angelova Bogdanka",apartment:"1. OG",rent:700,phone:""},    {id:"4",name:"Hristo Stoilov",apartment:"2. OG",rent:850,phone:""},    {id:"5",name:"Kadri / Velchov",apartment:"3. OG",rent:740,phone:""},    {id:"6",name:"Cevdet",apartment:"DG Links",rent:300,phone:""},    {id:"7",name:"Ana Ilieva Shalamanova",apartment:"DG Rechts",rent:550,phone:""},  ]},
  {id:"W152",name:"Weselerstr. 152",address:"Weselerstraße 152, 47169 Duisburg",tenants:[    {id:"1",name:"Murat Saglam",apartment:"Laden Lokal",rent:1650,phone:""},    {id:"2",name:"Beqir Zeqiri",apartment:"1. OG Rechts und Links",rent:1050,phone:""},    {id:"3",name:"Daniel Nae",apartment:"2. OG",rent:1200,phone:""},  ]},  {id:"W152A",name:"Weselerstr. 152a",address:"Weselerstraße 152a, 47169 Duisburg",tenants:[    {id:"1",name:"Helin Travel",apartment:"Laden Lokal",rent:700,phone:""},
    {id:"2",name:"Rahim",apartment:"EG Links",rent:800,phone:""},    {id:"3",name:"Mustan Mustan",apartment:"EG Rechts",rent:600,phone:""},    {id:"4",name:"Hasan Asenov",apartment:"1. OG Rechts",rent:700,phone:""},    {id:"5",name:"Ismet Sevdalin",apartment:"1. OG Links",rent:700,phone:""},    {id:"6",name:"Mustafa Shakir",apartment:"DG",rent:600,phone:""},    {id:"7",name:"Familie Raim",apartment:"Anbau Links",rent:600,phone:""},
    {id:"8",name:"Mustan Mustan",apartment:"Anbau Rechts",rent:550,phone:""},  ]},  {id:"D30",name:"Dahlstr. 30",address:"Dahlstraße 30, 47169 Duisburg",tenants:[    {id:"1",name:"Stan Daniel und Monika",apartment:"EG",rent:849.60,phone:""},    {id:"2",name:"Sahel Sohila Mahmod Azizi",apartment:"1. OG",rent:608,phone:""},    {id:"3",name:"Catalin Busuioc",apartment:"2. OG",rent:800,phone:""},    {id:"4",name:"Angel Manev, Sevda Maneva",apartment:"3. OG",rent:800,phone:""},
    {id:"5",name:"Tinka Ruseva",apartment:"4. OG",rent:648.20,phone:""},  ]},  {id:"D32",name:"Dahlstr. 32",address:"Dahlstraße 32, 47169 Duisburg",tenants:[    {id:"1",name:"Daniel Busuioc",apartment:"EG",rent:780,phone:""},    {id:"2",name:"Catalin Stefan",apartment:"1. OG",rent:680,phone:""},    {id:"3",name:"Lucian Stanescu",apartment:"2. OG",rent:850,phone:""},    {id:"4",name:"Familie Dragusi",apartment:"3. OG",rent:800,phone:""},
    {id:"5",name:"Nazmi / Nacho Yordanov",apartment:"DG",rent:500,phone:""},  ]},  {id:"WI44",name:"Wilfriedstr. 44",address:"Wilfriedstraße 44, 47169 Duisburg",tenants:[    {id:"1",name:"Ismail Adel",apartment:"EG Rechts",rent:650,phone:""},    {id:"10",name:"Ismail Adel",apartment:"EG Links",rent:650,phone:""},    {id:"2",name:"Iliya Yanev",apartment:"1. OG Rechts",rent:800,phone:""},    {id:"3",name:"Wian Abubakar",apartment:"1. OG Links",rent:850,phone:""},
    {id:"4",name:"Bahika Bobby",apartment:"2. OG Rechts",rent:600,phone:""},    {id:"5",name:"Yasmin Nassan Marwan Hajioman",apartment:"2. OG Links",rent:800,phone:""},    {id:"6",name:"Bianca und Costel Fernando Serban",apartment:"3. OG Rechts",rent:700,phone:""},    {id:"7",name:"Slavkov Borisov",apartment:"3. OG Links",rent:800,phone:""},    {id:"8",name:"Yosif Mitev",apartment:"DG Rechts",rent:750,phone:""},    {id:"9",name:"Hanifi / Yosif Mitev",apartment:"DG Links",rent:200,phone:""},  ]},
  {id:"R1",name:"Reinerstr. 1",address:"Reinerstraße 1, 47169 Duisburg",tenants:[    {id:"1",name:"Yosif Mihaylov",apartment:"EG Rechts",rent:500,phone:""},    {id:"2",name:"Mehmet Sirin Manus",apartment:"EG Links",rent:550,phone:""},    {id:"3",name:"Ion und Lamiita Stănescu",apartment:"1. OG",rent:900,phone:""},    {id:"4",name:"Danka Kalova",apartment:"2. OG",rent:850,phone:""},    {id:"5",name:"Mihaylov und Eseva",apartment:"DG",rent:780,phone:""},  ]},
  {id:"D68",name:"Dahlstr. 68",address:"Dahlstraße 68, 47169 Duisburg",tenants:[    {id:"1",name:"Hasan Ari",apartment:"EG Rechts",rent:550,phone:""},    {id:"2",name:"Hüseyin Cagritekin",apartment:"EG Links",rent:550,phone:""},    {id:"3",name:"Mesut Akkaya",apartment:"1. OG Rechts",rent:500,phone:""},    {id:"4",name:"Kai Wagner",apartment:"1. OG Links",rent:506.77,phone:""},    {id:"5",name:"Redzhep Kadir",apartment:"2. OG Rechts",rent:750,phone:""},
    {id:"6",name:"Hüseyin Dalli",apartment:"2. OG Links",rent:450,phone:""},  ]},  {id:"D70",name:"Dahlstr. 70",address:"Dahlstraße 70, 47169 Duisburg",tenants:[    {id:"1",name:"Yanko Dzhurtev",apartment:"EG Rechts",rent:700,phone:""},    {id:"2",name:"Gelu Boboc",apartment:"EG Links",rent:750,phone:""},    {id:"3",name:"Bernewski Denis",apartment:"1. OG Rechts",rent:472.26,phone:""},    {id:"4",name:"Halil Aksu",apartment:"1. OG Links",rent:550,phone:""},
    {id:"5",name:"Dura Ionut",apartment:"2. OG Rechts",rent:700,phone:""},    {id:"6",name:"Stefan Stoilov",apartment:"2. OG Links",rent:700,phone:""},  ]},];const privCats=["Handwerker","Temizlikçi","Versicherung","Strom/Gas","Wasser","Reparatur","Bankeinzahlung","Sonstiges"];const BP="#e8e4dc",BG="#f2f0ec";const S={  btn:(x={})=>({background:BP,color:"#000",fontFamily:"Tahoma,sans-serif",fontWeight:"bold",fontSize:11,cursor:"pointer",padding:"3px 8px",border:"2px solid",borderTopColor:"#fff",b
orderLeftColor:"#fff",borderRightColor:"#888",borderBottomColor:"#888",outline:"none",whiteSpace:"nowrap",...x}),  panel:(x={})=>({background:BP,border:"2px solid",borderTopColor:"#fff",borderLeftColor:"#fff",borderRightColor:"#888",borderBottomColor:"#888",...x}),  inset:(x={})=>({border:"2px solid",borderTopColor:"#888",borderLeftColor:"#888",borderRightColor:"#fff",borderBottomColor:"#fff",background:"#fff",...x}),  tbar:(bg="linear-gradient(to right,#0a246a,#a6caf0)")=>({background:bg,color:
"#fff",padding:"4px 10px",fontSize:13,fontWeight:"bold",fontFamily:"Tahoma,sans-serif",display:"flex",justifyContent:"space-between",alignItems:"center",userSelect:"none"}),  inp:{border:"2px solid",borderTopColor:"#888",borderLeftColor:"#888",borderRightColor:"#fff",borderBottomColor:"#fff",background:"#fff",fontFamily:"Tahoma,sans-serif",fontSize:12,padding:"3px 6px",outline:"none",boxSizing:"border-box",width:"100%",display:"block"},
  ta:{border:"2px solid",borderTopColor:"#888",borderLeftColor:"#888",borderRightColor:"#fff",borderBottomColor:"#fff",background:"#fff",fontFamily:"Tahoma,sans-serif",fontSize:11,padding:"3px 6px",outline:"none",boxSizing:"border-box",width:"100%",display:"block",resize:"vertical"},};const fmt=n=>Number(n).toLocaleString("de-DE",{minimumFractionDigits:2});
const fmtE=n=>(n>=0?"+":"")+fmt(n)+" €";function numToWords(n){  const ones=["","ein","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"];  const tens=["","","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"];  if(!n||n===0)return"null";  const abs=Math.abs(n),euros=Math.floor(abs),cents=Math.round((abs-euros)*100);
  const toW=m=>{if(m===0)return"";if(m<20)return ones[m];if(m<100)return ones[m%10]?(ones[m%10]+"und"+tens[Math.floor(m/10)]):tens[Math.floor(m/10)];return ones[Math.floor(m/100)]+"hundert"+toW(m%100);};  let w=toW(euros)+" Euro";if(cents>0)w+=" und "+toW(cents)+" Cent";  return(n<0?"Minus ":"")+w.charAt(0).toUpperCase()+w.slice(1);
}function makeQuittungHTML(tenant,building,month,year,no,amount,isPartial){  const date=new Date().toLocaleDateString("de-DE"),amtFmt=fmt(amount),amtWords=numToWords(amount);  const zweck=`Miete ${months[month]} ${year} — ${tenant.apartment}${isPartial?" (Teilzahlung — Offen: "+fmt(tenant.rent-amount)+" €)":""}`;  const css=`@page{size:A4 portrait;margin:0}*{margin:0;padding:0;box-sizing:border-box}body{width:210mm;height:297mm;font-family:Arial,sans-serif;font-size:10pt}.page{width:210mm;height
:297mm;display:flex;flex-direction:column}.block{width:100%;height:128mm;display:flex;overflow:hidden}.divider{width:100%;height:11mm;display:flex;align-items:center;justify-content:center;border-top:1.5px dashed #999;border-bottom:1.5px dashed #999;font-size:8pt;color:#999;letter-spacing:6px}.left-strip{width:18mm;background:#eef3fa;border-right:1.5px solid #99b3cc;display:flex;align-items:center;justify-content:center;flex-shrink:0}.strip-text{writing-mode:vertical-rl;transform:rotate(180deg);
color:#cc0000;font-size:12pt;font-weight:bold;letter-spacing:3px}.content{flex:1;padding:4mm 7mm 3mm 5mm;display:flex;flex-direction:column}.top-title{text-align:right;font-size:18pt;font-weight:bold;color:#0a246a;margin-bottom:2mm}.form-grid{flex:1;display:flex;flex-direction:column;border-top:1px solid #99b3cc}.row-line{display:flex;border-bottom:1px solid #99b3cc;min-height:10mm}.row-line.full{padding:1.5mm 2mm;flex-direction:column;justify-content:center}.row-line.dankend{justify-content:fle
x-end;align-items:center;padding:1mm 3mm;font-size:9pt}.row-line.last{border-bottom:none}.cell{flex:1;padding:1.5mm 2mm;border-right:1px solid #99b3cc;display:flex;flex-direction:column;justify-content:center}.cell:last-child{border-right:none}.cell.blue{width:52mm;flex:none;background:#c8d8ee}.cell-lbl{font-size:7pt;color:#555;margin-bottom:.5mm}.cell-val{font-size:10pt;font-weight:bold}.footer{display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #99b3cc;padding-
top:2mm;margin-top:2mm}.footer-left{font-size:7pt;color:#666}.footer-right{text-align:center}.footer-label{font-size:7pt;color:#666;margin-bottom:1mm}.footer-name{color:#cc0000;font-weight:bold;font-size:9pt;line-height:1.5}`;  const block=`<div class="block"><div class="left-strip"><div class="strip-text">E r d e n &nbsp; G b r .</div></div><div class="content"><div class="top-title">Quittung</div><div class="form-grid"><div class="row-line"><div class="cell" style="flex:1"></div><div class="ce
ll blue"><div class="cell-lbl">Netto EUR</div><div class="cell-val">${amtFmt} €</div></div></div><div class="row-line"><div class="cell"><div class="cell-lbl">Nr.</div><div class="cell-val">${no}</div></div><div class="cell blue"><div class="cell-lbl">Gesamt EUR</div><div class="cell-val">${amtFmt} €</div></div></div><div class="row-line full"><div class="cell-lbl">EUR in Worten</div><div class="cell-val" style="font-size:9pt">${amtWords}</div></div><div class="row-line full"><div class="cell-lb
l">von</div><div class="cell-val">${tenant.name} · ${building.address}</div></div><div class="row-line full"><div class="cell-lbl">für</div><div class="cell-val" style="font-size:9pt">${zweck}</div></div><div class="row-line dankend">dankend erhalten.</div><div class="row-line full last"><div class="cell-lbl">Ort/Datum</div><div class="cell-val">Duisburg, ${date}</div></div></div><div class="footer"><div class="footer-left">Buchungsvermerke</div><div class="footer-right"><div class="footer-label
">Stempel/Unterschrift des Empfängers</div><div class="footer-name">${OWNER.name}<br>${OWNER.street}<br>${OWNER.city}<br>${OWNER.tel1} &nbsp; ${OWNER.tel2}</div></div></div></div></div>`;  return`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quittung</title><style>${css}</style></head><body><div class="page">${block}<div class="divider">✂ &nbsp; ✂</div>${block}</div></body></html>`;}function makeAbrechnungHTML(bld, tenant, calc) {  const date = new Date().toLocaleDateString("de-DE");
  const pos = calc.saldo >= 0;  const totalP = bld.tenants.reduce((s,t)=>s+t.personen*t.monate,0);  const totalQm = bld.tenants.reduce((s,t)=>s+t.qm,0);  const bkKosten = bld.kosten.filter(k=>k.nr<=13);  const hzKosten = bld.kosten.filter(k=>k.nr>13);  const bkTotal = bkKosten.reduce((s,k)=>s+k.betrag,0);  const hzTotal = hzKosten.reduce((s,k)=>s+k.betrag,0);  const bkRows = bkKosten.map((k,i)=>{    const pc = calc.perTenant.find(p=>p.nr===k.nr);
    const totalCol = k.art==="Person" ? `${tenant.personen*tenant.monate} / ${totalP}` : `${tenant.qm} / ${totalQm.toFixed(2)}`;    return `<tr style="background:${i%2===0?'#f9f9f9':'#fff'}"><td>${k.nr}</td><td>${k.name}</td><td>${k.art}</td><td style="text-align:right">${totalCol}</td><td style="text-align:right">${fmt(k.betrag)} €</td><td style="text-align:right;font-weight:bold">${fmt(pc?.anteil||0)} €</td></tr>`;  }).join('');
  const hzRows = hzKosten.map((k,i)=>{    const pc = calc.perTenant.find(p=>p.nr===k.nr);    const totalCol = k.art==="Person" ? `${tenant.personen*tenant.monate} / ${totalP}` : `${tenant.qm} / ${totalQm.toFixed(2)}`;    return `<tr style="background:${i%2===0?'#f9f9f9':'#fff'}"><td>${k.nr}</td><td>${k.name}</td><td>${k.art}</td><td style="text-align:right">${totalCol}</td><td style="text-align:right">${fmt(k.betrag)} €</td><td style="text-align:right;font-weight:bold">${fmt(pc?.anteil||
0)} €</td></tr>`;  }).join('');  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Nebenkostenabrechnung ${tenant.name}</title><style>@page{size:A4 portrait;margin:18mm 15mm}*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:9.5pt;color:#222;line-height:1.5;background:#fff}.page{max-width:176mm;margin:0 auto;padding:5mm 0}.hdr{display:flex;justify-content:space-between;margin-bottom:8mm}.sender{font-size:7.5pt;color:#888;border-bottom:1px solid #
ccc;padding-bottom:2px;margin-bottom:5px;text-decoration:underline}.to strong{font-size:11pt;display:block;margin-bottom:2px}.date-line{text-align:right;margin-bottom:8mm;font-size:9pt;color:#333}.greeting{margin-bottom:5mm;font-size:9.5pt}.info-row{display:flex;gap:6mm;margin-bottom:6mm}.info-box{border:1px solid #ccc;padding:2.5mm 4mm;flex:1;background:#f8f8f8}.info-box .lbl{font-size:7pt;color:#777;margin-bottom:1mm}.info-box .val{font-size:10pt;font-weight:bold}table{width:100%;border-collap
se:collapse;margin-bottom:4mm;font-size:8pt}table th{background:#e0e0e0;padding:3px 5px;text-align:left;border:1px solid #bbb;font-size:7.5pt}table td{padding:2px 5px;border:1px solid #ddd}.section-title{font-weight:bold;font-size:9pt;margin:5mm 0 2mm;color:#000;text-decoration:underline}.summary-table{width:100%;border-collapse:collapse;margin-bottom:4mm}.summary-table td{padding:2px 6px;font-size:9pt}.summary-table .sum-label{width:65%}.summary-table .sum-val{text-align:right}.summary-table tr
.result td{font-weight:bold;background:#f0f0f0;border:1px solid #888;padding:3px 6px}.final-table{width:100%;border-collapse:collapse;margin:5mm 0 3mm}.final-table td{padding:3px 6px;border:1px solid #888;font-size:9.5pt}.final-table tr.highlight td{background:#e8e8e8;font-weight:bold}.final-table tr.total td{background:#d0d8f0;font-weight:bold;font-size:11pt}.saldo-text{font-size:10pt;margin:4mm 0 8mm;line-height:1.8}.footer-sig{font-size:9pt;margin-top:10mm;line-height:1.8;color:#333}.footer-b
ank{font-size:7.5pt;color:#777;border-top:1px solid #ccc;padding-top:3mm;margin-top:6mm}.print-btn{display:block;text-align:center;margin:8mm auto 0;padding:6px 24px;background:#0a246a;color:#fff;font-size:10pt;font-family:Arial,sans-serif;border:none;cursor:pointer;border-radius:2px}@media print{.print-btn{display:none}}</style></head><body><div class="page"><div class="hdr">  <div><div class="sender">${OWNER.name} · ${OWNER.street} · ${OWNER.city}</div>  <div class="to"><strong>${tenant.name}<
/strong>${tenant.etage}<br>${bld.label}<br>47169 Duisburg</div></div>  <div style="text-align:right"><div style="font-size:13pt;font-weight:bold;color:#0a246a">Erden GbR</div>  <div style="font-size:8pt;color:#888">${OWNER.street} · ${OWNER.city}</div>  <div style="font-size:8pt;color:#888">Tel: ${OWNER.tel1} / ${OWNER.tel2}</div></div></div><div class="date-line">Duisburg, ${date}</div><div class="greeting">Sehr geehrte/r <strong>${tenant.name}</strong>,<br><br>sie erhalten nachfolgend die Betr
iebskosten- und Heizkostenabrechnung für die Abrechnungsperiode 01.01.2024 bis 31.12.2024.</div><div class="info-row">  <div class="info-box"><div class="lbl">Gesamt in m²</div><div class="val">${totalQm.toFixed(2)}</div></div>  <div class="info-box"><div class="lbl">Gesamt in Person</div><div class="val">${totalP}</div></div>  <div class="info-box"><div class="lbl">Ihre Fläche</div><div class="val">${tenant.qm} m²</div></div>  <div class="info-box"><div class="lbl">Ihre Personen (Monate)</div><
div class="val">${tenant.personen} (${tenant.monate} Mon.)</div></div></div><div class="section-title">Betriebskosten</div><table><thead><tr><th>#</th><th>Betriebskosten</th><th>Art</th><th style="text-align:right">Anteil/Gesamt</th><th style="text-align:right">Ausgaben</th><th style="text-align:right">Anteil</th></tr></thead><tbody>${bkRows}</tbody><tfoot><tr style="background:#e8e8e8;font-weight:bold"><td colspan="4" style="text-align:right">Summe:</td><td style="text-align:right">${fmt(bkTota
l)} €</td><td style="text-align:right">${fmt(calc.bkShare)} €</td></tr></tfoot></table><table class="summary-table">  <tr><td class="sum-label">Gesamte Betriebskosten Summe</td><td class="sum-val">${fmt(bkTotal)} €</td></tr>  <tr><td class="sum-label">Ihre Betriebskosten</td><td class="sum-val">${fmt(calc.bkShare)} €</td></tr>  <tr><td class="sum-label">Ihre Betriebskosten Vorauszahlung</td><td class="sum-val">-${fmt(Math.abs(calc.vz_bk))} €</td></tr>  <tr class="result"><td class="sum-label" st
yle="text-decoration:underline">Ihre Betriebskosten Abrechnung</td><td class="sum-val" style="color:${calc.saldo_bk>=0?'#005500':'#cc0000'}">${fmt(calc.saldo_bk)} €</td></tr></table><div class="section-title">Heizkosten</div><table><thead><tr><th>#</th><th>Heizkosten</th><th>Art</th><th style="text-align:right">m²</th><th style="text-align:right">Ausgaben</th><th style="text-align:right">Anteil</th></tr></thead><tbody>${hzRows}</tbody><tfoot><tr style="background:#e8e8e8;font-weight:bold"><td co
lspan="4" style="text-align:right">Summe:</td><td style="text-align:right">${fmt(hzTotal)} €</td><td style="text-align:right">${fmt(calc.hzShare)} €</td></tr></tfoot></table><table class="summary-table">  <tr><td class="sum-label">Gesamte Heizkosten Summe</td><td class="sum-val">${fmt(hzTotal)} €</td></tr>  <tr><td class="sum-label">Ihre Heizkosten</td><td class="sum-val">${fmt(calc.hzShare)} €</td></tr>  <tr><td class="sum-label">Ihre Heizkosten Vorauszahlung</td><td class="sum-val">-${fmt(Math
.abs(calc.vz_hz))} €</td></tr>  <tr class="result"><td class="sum-label" style="text-decoration:underline">Ihre Heizkosten Abrechnung</td><td class="sum-val" style="color:${calc.saldo_hz>=0?'#005500':'#cc0000'}">${fmt(calc.saldo_hz)} €</td></tr></table><table class="final-table">  <tr class="highlight"><td>Ihre Betriebskosten Abrechnung</td><td style="text-align:right;color:${calc.saldo_bk>=0?'#005500':'#cc0000'}">${fmt(calc.saldo_bk)} €</td></tr>  <tr class="highlight"><td>Ihre Heizkosten Abrec
hnung *</td><td style="text-align:right;color:${calc.saldo_hz>=0?'#005500':'#cc0000'}">${fmt(calc.saldo_hz)} €</td></tr>  <tr class="total"><td>Ihre Betriebs und Heizkosten Abrechnung</td><td style="text-align:right;color:${pos?'#005500':'#cc0000'}">${fmt(calc.saldo)} €</td></tr></table><div class="saldo-text">${pos?`<strong>Guthaben:</strong> Wir überweisen Ihnen das Guthaben von <strong>${fmt(Math.abs(calc.saldo))} €</strong> auf Ihr Konto.`:`<strong>Nachzahlung:</strong> Bitte überweisen Sie 
den Nachzahlungsbetrag von <strong>${fmt(Math.abs(calc.saldo))} €</strong> innerhalb von 21 Tagen.`}</div><div class="footer-sig">IBAN: ${OWNER.iban} · Bank: SPARKASSE DUISBURG · BIC: DUIBDEXXX<br><br><em style="color:#555">Unterschrift und Stempel</em></div><div class="footer-bank">* Heizkosten werden je 50% nach Fläche und 50% nach Verbrauch aufgeteilt.</div><div style="display:flex;gap:8px;justify-content:center;margin:8mm auto 0">
<button class="print-btn" onclick="window.print()">🖨 Drucken / PDF</button>
<button class="print-btn" style="background:#1a5276" onclick="downloadWord()">📄 Word herunterladen</button>
</div>
<script>
function downloadWord(){
  var content = document.documentElement.outerHTML;
  var blob = new Blob(['\ufeff', content], {type:'application/msword'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Nebenkostenabrechnung.doc';
  a.click();
}
</script></div></body></html>`;}function getPS(payments,bid,tid,mi){const v=payments[`${bid}-${tid}-${mi}`];if(!v)return{status:"unpaid"};if(v.type==="bank")return{status:"bank"};if(v.amount===true)return{status:"cash_full"};return{status:"cash_partial",paid:v.amount};}function tenantOpenDebt(getP,bid,tid,rent,curMonth){return months.reduce((s,_,i)=>{if(i>curMonth)return s;const ps=getP(bid,tid,i);if(ps.status==="unpaid")return s+rent;if(ps.status==="cash_partial")return s+(rent-ps.paid);
return s;},0);}function ErdenLogoSmall(){  return(    <div style={{display:"flex",alignItems:"center",gap:6,fontFamily:"Tahoma,sans-serif"}}>      <svg width={32} height={28} viewBox="0 0 72 64" xmlns="http://www.w3.org/2000/svg">        <polygon points="16,34 28,16 40,34" fill="#1a3a6b"/><rect x="19" y="34" width="22" height="20" fill="#1a3a6b"/>        <rect x="26" y="44" width="8" height="10" fill="#c8a84b" rx="1"/><rect x="21" y="37" width="6" height="5" fill="#a8c4e8" rx="1"/>        <rect 
x="33" y="37" width="6" height="5" fill="#a8c4e8" rx="1"/><rect x="32" y="18" width="5" height="10" fill="#1a3a6b"/>        <polygon points="38,40 48,26 58,40" fill="#2255aa"/><rect x="40" y="40" width="16" height="16" fill="#2255aa"/>        <rect x="42" y="43" width="5" height="5" fill="#a8c4e8" rx="1"/><rect x="51" y="43" width="5" height="5" fill="#a8c4e8" rx="1"/>        <rect x="45" y="48" width="6" height="8" fill="#c8a84b" rx="1"/><rect x="10" y="53" width="55" height="2" fill="#c8a84b" 
rx="1"/>      </svg>      <div>        <div style={{fontSize:11,fontWeight:"bold",color:"#1a3a6b",letterSpacing:1,lineHeight:1}}>Erden GbR</div>        <div style={{fontSize:8,color:"#555",lineHeight:1.2}}>Weselerstr. 119 · 47169 Duisburg</div>      </div>    </div>  );
}function ErdenLogo(){  return(    <div style={{display:"flex",alignItems:"center",gap:10,fontFamily:"Tahoma,sans-serif"}}>      <svg width={72} height={64} viewBox="0 0 72 64" xmlns="http://www.w3.org/2000/svg">        <polygon points="16,34 28,16 40,34" fill="#1a3a6b"/><rect x="19" y="34" width="22" height="20" fill="#1a3a6b"/>        <rect x="26" y="44" width="8" height="10" fill="#c8a84b" rx="1"/><rect x="21" y="37" width="6" height="5" fill="#a8c4e8" rx="1"/>        <rect x="33" y="37" widt
h="6" height="5" fill="#a8c4e8" rx="1"/><rect x="32" y="18" width="5" height="10" fill="#1a3a6b"/>        <polygon points="38,40 48,26 58,40" fill="#2255aa"/><rect x="40" y="40" width="16" height="16" fill="#2255aa"/>        <rect x="42" y="43" width="5" height="5" fill="#a8c4e8" rx="1"/><rect x="51" y="43" width="5" height="5" fill="#a8c4e8" rx="1"/>        <rect x="45" y="48" width="6" height="8" fill="#c8a84b" rx="1"/><rect x="10" y="53" width="55" height="2" fill="#c8a84b" rx="1"/>      </sv
g>      <div>        <div style={{fontSize:20,fontWeight:"bold",color:"#1a3a6b",letterSpacing:1,lineHeight:1}}>Erden</div>        <div style={{fontSize:14,color:"#2255aa",letterSpacing:4,lineHeight:1.2}}>GbR</div>        <div style={{fontSize:10,color:"#555",lineHeight:1.3,marginTop:1}}>Weselerstr. 119 · 47169 Duisburg</div>        <div style={{width:76,height:1.5,background:"#c8a84b",marginTop:2}}/>      </div>    </div>  );
}function BuildingFloorPlanNeben({bldId,nebenTenants,onSelectTenant,selTenIdx}){  const layout=BUILDING_LAYOUTS[bldId];if(!layout)return null;  const maxCols=Math.max(...layout.map(r=>r.length));  const cellW=maxCols===1?100:78,cellH=54,gap=3;  const totalW=maxCols*(cellW+gap)-gap+14;  const allCells=layout.flatMap(row=>row);
  return(    <div style={{display:"inline-block",background:"#c8d4e8",border:"3px solid #7a8fab",padding:"6px 7px 5px",userSelect:"none",flexShrink:0}}>      <svg width={totalW} height={19} style={{display:"block",marginBottom:3}}>        <polygon points={`${totalW/2},2 2,17 ${totalW-2},
17`} fill="#8899aa" stroke="#556688" strokeWidth="1.5"/>        <line x1={totalW/2} y1={2} x2={totalW/2} y2={17} stroke="#6677aa" strokeWidth="1"/>      </svg>      <div style={{display:"flex",flexDirection:"column",gap}}>        {layout.map((floor,fi)=>(          <div key={fi} style={{display:"flex",gap,justifyContent:"center"}}>            {floor.map((cell)=>{              const cellIdx=allCells.indexOf(cell);              const tenant=nebenTenants[cellIdx]||
null;              const tIdx=tenant?nebenTenants.indexOf(tenant):-1;              const isSel=tIdx===selTenIdx;              const bg=isSel?"#a0c0ff":tenant?"#d8f0d8":"#e8e0d0";              const firstName=tenant?tenant.name.split(" ")[0]:"";              return(                <div key={cell.id} onClick={()=>tenant&&
onSelectTenant(tIdx)}                  style={{width:cellW,height:cellH,background:bg,border:isSel?"2px solid #0a246a":"1.5px solid #7a8fab",cursor:tenant?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",boxSizing:"border-box",padding:"3px 2px"}}>                  <div style={{display:"flex",gap:3}}>                    <div style={{width:10,height:7,background:"#b8d4ee",border:"1.5px solid #7799bb"}}/>                    <div style={{wid
th:10,height:7,background:"#b8d4ee",border:"1.5px solid #7799bb"}}/>                  </div>                  <div style={{fontSize:10,fontWeight:"bold",color:"#0a246a",lineHeight:1}}>{cell.label}</div>                  {tenant&&<div style={{fontSize:9,color:"#222",textAlign:"center",maxWidth:cellW-6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{firstName}</div>}                </div>              );
            })}          </div>        ))}        <div style={{height:11,background:"#7a8fab",display:"flex",alignItems:"center",justifyContent:"center"}}>          <div style={{width:13,height:9,background:"#556688"}}/>        </div>      </div>    </div>  );}function BuildingFloorPlan({building,payments,year,onSelectTenant,curMonth,selectedId=null}){  const layout=BUILDING_LAYOUTS[building.id];if(!layout)return null;  const yp=payments[year]||
{};  const getP=(tid,mi)=>getPS(yp,building.id,tid,mi);  const maxCols=Math.max(...layout.map(r=>r.length));  const cellW=maxCols===1?100:78,cellH=54,gap=3;  const totalW=maxCols*(cellW+gap)-gap+14;  return(    <div style={{display:"inline-block",background:"#c8d4e8",border:"3px solid #7a8fab",padding:"6px 7px 5px",userSelect:"none",flexShrink:0}}>      <svg width={totalW} height={19} style={{display:"block",marginBottom:3}}>        <polygon points={`${totalW/2},2 2,17 ${totalW-2},
17`} fill="#8899aa" stroke="#556688" strokeWidth="1.5"/>        <line x1={totalW/2} y1={2} x2={totalW/2} y2={17} stroke="#6677aa" strokeWidth="1"/>      </svg>      <div style={{display:"flex",flexDirection:"column",gap}}>        {layout.map((floor,fi)=>(          <div key={fi} style={{display:"flex",gap,justifyContent:"center"}}>            {floor.map(cell=>{              const tenant=building.tenants.find(t=>t.id===cell.id);
              const debt=tenant?tenantOpenDebt(getP,building.id,cell.id,tenant.rent,curMonth):0;              const isSelected=selectedId===cell.id;              const bg=isSelected?"#40e0d0":tenant&&debt===0?"#b8f0b8":"#ffb8b8";              const firstName=tenant?tenant.name.split(" ")[0]:"";              return(                <div key={cell.id} onClick={()=>tenant&&
onSelectTenant(cell.id)}                  style={{width:cellW,height:cellH,background:bg,border:isSelected?"2.5px solid #008b8b":"1.5px solid #7a8fab",cursor:tenant?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",boxSizing:"border-box",padding:"3px 2px"}}>                  <div style={{display:"flex",gap:3}}>                    <div style={{width:10,height:7,background:"#b8d4ee",border:"1.5px solid #7799bb"}}/>                    <div s
tyle={{width:10,height:7,background:"#b8d4ee",border:"1.5px solid #7799bb"}}/>                  </div>                  <div style={{fontSize:10,fontWeight:"bold",color:"#0a246a",lineHeight:1}}>{cell.label}</div>                  {tenant&&<div style={{fontSize:9,color:"#222",textAlign:"center",maxWidth:cellW-6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{firstName}</div>}                </div>              );
            })}          </div>        ))}        <div style={{height:11,background:"#7a8fab",display:"flex",alignItems:"center",justifyContent:"center"}}>          <div style={{width:13,height:9,background:"#556688"}}/>        </div>      </div>    </div>  );
}function ConfirmModal({msg,onYes,onNo}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,60,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99999}}><div style={{...S.panel(),maxWidth:300,width:"90%"}}><div style={S.tbar("linear-gradient(to right,#6a3a00,#cc7700)")}><span>⚠ Bestätigung</span></div><div style={{padding:14}}><div style={{fontSize:12,marginBottom:12,lineHeight:1.5,whiteSpace:"pre-line"}}>{msg}</div><div style={{display:"flex",gap:8,justifyC
ontent:"flex-end"}}><button onClick={onYes} style={S.btn({background:"#d4ffd4",padding:"4px 16px"})}>✓ Ja</button><button onClick={onNo} style={S.btn({background:"#ffd4d4",padding:"4px 16px"})}>✗ Nein</button></div></div></div></div>);
}function Modal({title,bg,onClose,children,maxW=460}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,60,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:10,overflowY:"auto"}}><div style={{...S.panel(),width:"100%",maxWidth:maxW,boxSizing:"border-box",maxHeight:"94vh",overflowY:"auto"}}><div style={S.tbar(bg)}><span>{title}</span><button onClick={onClose} style={S.btn({padding:"1px 5px",fontSize:10})}>✗</button></div><div style={{padding:12}}
>{children}</div></div></div>);}function IsolatedInput({value,onChange,placeholder=""}){const [v,setV]=useState(value);return<input value={v} onChange={e=>setV(e.target.value)} onBlur={e=>onChange(e.target.value)} placeholder={placeholder} style={S.inp}/>;}function IField({label,value,onChange,placeholder=""}){return(<div style={{marginBottom:6}}>{label&&<div style={{fontSize:11,fontWeight:"bold",marginBottom:2}}>{label}:</div>}<IsolatedInput value={String(value||
"")} onChange={onChange} placeholder={placeholder}/></div>);}function PartialInput({onSave}){const [val,setVal]=useState("");return(<div style={{display:"flex",gap:2,marginTop:2}}><input type="text" inputMode="decimal" placeholder="€" value={val} onChange={e=>setVal(e.target.value)} style={{...S.inp,fontSize:10,padding:"1px 3px",width:"50px"}}/><button onClick={()=>{const n=parseFloat(val.replace(",","."));if(n>0){onSave(n);setVal("");
}}} style={S.btn({fontSize:9,padding:"1px 3px",background:"#fffbe0",flex:1})}>OK</button></div>);}function MonthCard({m,i,bid,tid,rent,yp,curMonth,showPartial,setShowPartial,bookCashF,bookBank,bookCashP,cancelP,openReceipt,tName}){  const key=`${bid}-${tid}-${i}`;const ps=getPS(yp,bid,tid,i);
const future=i>curMonth;  const bg=future?"#ebebeb":ps.status==="cash_full"?"#d0f0d0":ps.status==="bank"?"#d0e4f8":ps.status==="cash_partial"?"#fdf5c0":"#f8d0d0";  const hdrBg=future?"#999":ps.status==="cash_full"?"#2a7a2a":ps.status==="bank"?"#0a246a":ps.status==="cash_partial"?"#8a6000":"#900000";  const badge=future?"–":ps.status==="cash_full"?"✓":ps.status==="bank"?"B":ps.status==="cash_partial"?"⚠":"✗";  const showP=!!showPartial[key];  return(<div style={{...S.panel({background:bg}),flex:"
1 1 0",minWidth:60,maxWidth:100,display:"flex",flexDirection:"column"}}>    <div style={{background:hdrBg,color:"#fff",fontFamily:"Tahoma,sans-serif",fontWeight:"bold",fontSize:8,padding:"1px 3px",display:"flex",justifyContent:"space-between",alignItems:"center",whiteSpace:"nowrap"}}><span>{m.slice(0,3).toUpperCase()}</span><span style={{fontSize:10,marginLeft:2}}>{badge}</span></div>    <div style={{padding:"2px 3px"}}><div style={S.inset({padding:"2px 3px",textAlign:"center"})}>      {ps.statu
s==="cash_partial"?(<div><div style={{fontSize:8,fontWeight:"bold",color:"#8a6000",whiteSpace:"nowrap"}}>{fmt(ps.paid)}€</div><div style={{fontSize:6,color:"#cc0000",whiteSpace:"nowrap"}}>–{fmt(rent-ps.paid)}€</div></div>):(<div style={{fontSize:8,fontWeight:"bold",color:future?"#999":hdrBg,whiteSpace:"nowrap"}}>{fmt(rent)}€</div>)}    </div></div>    {!future&&(<div style={{padding:"0 1px 1px",display:"flex",flexDirection:"column",gap:1}}>      {ps.status==="unpaid"&&
<><button onClick={()=>bookCashF(bid,tid,i)} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#c8f0c8"})}>💵 Kasse</button><button onClick={()=>bookBank(bid,tid,i)} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#c8dcf4"})}>🏦 Bank</button><button onClick={()=>setShowPartial(x=>({...x,[key]:!x[key]}))} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#f8f0c0"})}>⚠ Teil</button></>}      {ps.status==="cash_partial"&&
<><button onClick={()=>bookCashF(bid,tid,i)} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#c8f0c8"})}>✓ Voll</button><button onClick={()=>bookBank(bid,tid,i)} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#c8dcf4"})}>🏦 Bank</button><button onClick={()=>setShowPartial(x=>({...x,[key]:!x[key]}))} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#f8f0c0"})}>✏ Änd.</button></>}      {(ps.status==="cash_full"||ps.status==="bank")&&
<button onClick={()=>openReceipt(i)} style={S.btn({fontSize:7,padding:"1px 0",width:"100%",background:"#c8d8ee"})}>🧾 Quit.</button>}      {ps.status!=="unpaid"&&<button onClick={()=>cancelP(bid,tid,i,tName,m)} style={S.btn({fontSize:6,padding:"1px 0",width:"100%",color:"#900"})}>✗ Sto.</button>}      {showP&&<PartialInput onSave={amt=>bookCashP(bid,tid,i,amt,rent)}/>}    </div>)}  </div>);
}function BldCheckboxList({buildings,selected,onChange}){  const toggle=id=>onChange(sel=>sel.includes(id)?sel.filter(x=>x!==id):[...sel,id]);  const allSel=selected.length===buildings.length;  return(<div><div style={{display:"flex",alignItems:"center",gap:6,padding:"3px 6px",background:"#d8d4cc",marginBottom:3,cursor:"pointer"}} onClick={()=>onChange(allSel?[]:buildings.map(b=>b.id))}><div style={{width:13,height:13,...S.inset(),display:"flex",alignItems:"center",justifyContent:"center",flexSh
rink:0}}>{allSel&&<span style={{fontSize:10,fontWeight:"bold",lineHeight:1}}>✓</span>}</div><span style={{fontSize:11,fontWeight:"bold"}}>Alle Gebäude</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2}}>{buildings.map(b=>(<div key={b.id} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 6px",cursor:"pointer",background:selected.includes(b.id)?"#d0e8d0":BP}} onClick={()=>toggle(b.id)}><div style={{width:12,height:12,...S.inset(),display:"flex",alignItems:"cen
ter",justifyContent:"center",flexShrink:0}}>{selected.includes(b.id)&&<span style={{fontSize:9,fontWeight:"bold",lineHeight:1}}>✓</span>}</div><span style={{fontSize:10}}>{b.name}</span></div>))}</div></div>);}
function MietvertraegeSeite({onBack, t, buildings}) {
  const [view, setView] = useState("list"); // list | building | form | upload
  const [selBldId, setSelBldId] = useState(null);
  const [contracts, setContracts] = useState(() => {
    try { const d = localStorage.getItem("erden-gbr-contracts"); return d ? JSON.parse(d) : {}; } catch(e) { return {}; }
  });
  const [form, setForm] = useState({
    vorname:"", nachname:"", geburtsdatum:"", nationalitaet:"",
    strasse:"", hausnr:"", plz:"47169", ort:"Duisburg",
    telefon:"", email:"", miete:"", kaution:"", einzug:"",
    wohnung:"", qm:"", zimmer:"", etage:"",
    nebenkosten:"", heizung:"", strom:"nein", internet:"nein",
    befristet:"nein", befristetBis:"",
    haustier:"nein", rauchen:"nein",
    notfallName:"", notfallTel:"",
    personalausweis:"", ibanMieter:"",
  });
  const [formMsg, setFormMsg] = useState("");
  const selBld = buildings.find(b=>b.id===selBldId);
  const saveContracts = (c) => {
    setContracts(c);
    try { localStorage.setItem("erden-gbr-contracts", JSON.stringify(c)); } catch(e) {}
  };
  const saveContract = () => {
    if(!form.vorname||!form.nachname||!form.miete||!form.einzug) {
      setFormMsg("❌ Pflichtfelder ausfüllen: Name, Miete, Einzugsdatum!");
      return;
    }
    const key = selBldId||"allgemein";
    const existing = contracts[key]||[];
    const newC = {...form, id:Date.now(), erstellt:new Date().toLocaleDateString("de-DE")};
    saveContracts({...contracts, [key]: [...existing, newC]});
    setFormMsg("✓ Vertrag gespeichert!");
    setTimeout(()=>{setFormMsg("");setView("building");},1500);
  };
  const deleteContract = (bldId, cId) => {
    const updated = (contracts[bldId]||[]).filter(c=>c.id!==cId);
    saveContracts({...contracts, [bldId]: updated});
  };
  const printContract = (c, bld) => {
    const html = makeMietvertragHTML(c, bld);
    const w = window.open("","_blank");
    w.document.write(html);
    w.document.close();
  };
  const GT = S.tbar("linear-gradient(to right,#4a004a,#8a208a)");
  const IFld = ({label,value,onChange,type="text",placeholder=""}) => (
    <div style={{marginBottom:6}}>
      <div style={{fontSize:10,fontWeight:"bold",color:"#555",marginBottom:2}}>{label}:</div>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{...S.inp,fontSize:11}}/>
    </div>
  );
  const ISelect = ({label,value,onChange,options}) => (
    <div style={{marginBottom:6}}>
      <div style={{fontSize:10,fontWeight:"bold",color:"#555",marginBottom:2}}>{label}:</div>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{...S.inp,fontSize:11}}>
        {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
  const ff = (k,v) => setForm(f=>({...f,[k]:v}));
  if(view==="list") return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={GT}><span>📄 {"Mietverträge"}</span><button onClick={onBack} style={S.btn({fontSize:10,padding:"1px 6px"})}>⌂ {"Hauptmenü"}</button></div>
      <div style={{flex:1,padding:10,overflowY:"auto",background:BG}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:7,maxWidth:960,margin:"0 auto"}}>
          {buildings.map(b=>{
            const cnt = (contracts[b.id]||[]).length;
            return(
              <div key={b.id} style={S.panel({padding:"7px 9px"})}>
                <div style={{fontSize:12,fontWeight:"bold",color:"#4a004a",marginBottom:3}}>🏠 {b.name}</div>
                <div style={{fontSize:10,color:"#666",marginBottom:6}}>{cnt} {"Mietverträge"}</div>
                <button onClick={()=>{setSelBldId(b.id);setView("building");}} style={S.btn({width:"100%",fontSize:11})}>
                  {"Mietverträge"} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  if(view==="building"&&selBld) return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={GT}>
        <span>📄 {selBld.name} — {"Mietverträge"}</span>
        <div style={{display:"flex",gap:4}}>
          <button onClick={()=>setView("list")} style={S.btn({fontSize:10,padding:"1px 6px"})}>← {"Gebäude"}</button>
          <button onClick={onBack} style={S.btn({fontSize:10,padding:"1px 6px"})}>⌂ {"Hauptmenü"}</button>
        </div>
      </div>
      <div style={{background:BP,padding:"4px 8px",borderBottom:"1px solid #aaa",display:"flex",gap:4}}>
        <button onClick={()=>{setForm({vorname:"",nachname:"",geburtsdatum:"",nationalitaet:"",strasse:selBld.address?.split(",")[0]||"",hausnr:"",plz:"47169",ort:"Duisburg",telefon:"",email:"",miete:"",kaution:"",einzug:"",wohnung:"",qm:"",zimmer:"",etage:"",nebenkosten:"",heizung:"",strom:"nein",internet:"nein",befristet:"nein",befristetBis:"",haustier:"nein",rauchen:"nein",notfallName:"",notfallTel:"",personalausweis:"",ibanMieter:""});setFormMsg("");setView("form");
}} style={S.btn({background:"#e8d4ff",fontSize:10})}>
          ✚ {"Neuer Mietvertrag"}
        </button>
      </div>
      <div style={{flex:1,padding:10,overflowY:"auto",background:BG}}>
        {(contracts[selBldId]||[]).length===0 && <div style={S.inset({padding:16,textAlign:"center",color:"#888"})}>Kein Vertrag vorhanden.</div>}
        {(contracts[selBldId]||[]).map(c=>(
          <div key={c.id} style={S.panel({padding:"6px 10px",marginBottom:5,overflow:"hidden"})}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <span style={{fontWeight:"bold",fontSize:12,color:"#4a004a"}}>{c.vorname} {c.nachname}</span>
                <span style={{fontSize:10,color:"#666",marginLeft:8}}>{c.wohnung} · {c.miete}€/Mo · ab {c.einzug}</span>
              </div>
              <div style={{display:"flex",gap:4}}>
                <button onClick={()=>printContract(c,selBld)} style={S.btn({fontSize:9,background:"#d4e8ff"})}>🖨 {"Drucken"}</button>
                <button onClick={()=>deleteContract(selBldId,c.id)} style={S.btn({fontSize:9,color:"#cc0000"})}>✗</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  if(view==="form") return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={GT}>
        <span>✚ {"Neuer Mietvertrag"} — {selBld?.name}</span>
        <button onClick={()=>setView("building")} style={S.btn({fontSize:10,padding:"1px 6px"})}>← {"← Zurück"}</button>
      </div>
      <div style={{flex:1,overflowY:"auto",background:BG,padding:10}}>
        <div style={{maxWidth:700,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {/* Kişisel Bilgiler */}
          <div style={{...S.panel({padding:10}),gridColumn:"1/-1"}}>
            <div style={S.tbar("linear-gradient(to right,#4a004a,#8a208a)")}><span style={{fontSize:10}}>👤 Persönliche Daten / Kişisel Bilgiler</span></div>
            <div style={{padding:"8px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <IFld label="Vorname / Ad" value={form.vorname} onChange={v=>ff("vorname",v)} placeholder="Max"/>
              <IFld label="Nachname / Soyad" value={form.nachname} onChange={v=>ff("nachname",v)} placeholder="Mustermann"/>
              <IFld label="Geburtsdatum / Doğum Tarihi" value={form.geburtsdatum} onChange={v=>ff("geburtsdatum",v)} type="date"/>
              <IFld label="Nationalität / Uyruk" value={form.nationalitaet} onChange={v=>ff("nationalitaet",v)} placeholder="Deutsch"/>
              <IFld label="Personalausweis Nr. / Kimlik No" value={form.personalausweis} onChange={v=>ff("personalausweis",v)}/>
              <IFld label="Telefon" value={form.telefon} onChange={v=>ff("telefon",v)} placeholder="0170 1234567"/>
              <IFld label="E-Mail" value={form.email} onChange={v=>ff("email",v)} type="email"/>
              <IFld label="IBAN (Mieter / Kiracı)" value={form.ibanMieter} onChange={v=>ff("ibanMieter",v)}/>
            </div>
          </div>
          {/* Wohnung */}
          <div style={S.panel({padding:10})}>
            <div style={S.tbar("linear-gradient(to right,#1a4a1a,#3a8a3a)")}><span style={{fontSize:10}}>🏠 Wohnung / Daire</span></div>
            <div style={{padding:"8px 0"}}>
              <IFld label="Wohnung / Daire" value={form.wohnung} onChange={v=>ff("wohnung",v)} placeholder="2. OG Links"/>
              <IFld label="Etage / Kat" value={form.etage} onChange={v=>ff("etage",v)}/>
              <IFld label="Fläche m² / Alan" value={form.qm} onChange={v=>ff("qm",v)} placeholder="65"/>
              <IFld label="Zimmer / Oda" value={form.zimmer} onChange={v=>ff("zimmer",v)} placeholder="3"/>
            </div>
          </div>
          {/* Miete */}
          <div style={S.panel({padding:10})}>
            <div style={S.tbar("linear-gradient(to right,#0a246a,#2255aa)")}><span style={{fontSize:10}}>💶 Miete / Kira</span></div>
            <div style={{padding:"8px 0"}}>
              <IFld label="Kaltmiete € / Net Kira" value={form.miete} onChange={v=>ff("miete",v)} placeholder="700"/>
              <IFld label="Nebenkosten € / Yan Giderler" value={form.nebenkosten} onChange={v=>ff("nebenkosten",v)} placeholder="150"/>
              <IFld label="Kaution € / Depozito" value={form.kaution} onChange={v=>ff("kaution",v)} placeholder="1400"/>
              <IFld label="Einzugsdatum / Giriş Tarihi" value={form.einzug} onChange={v=>ff("einzug",v)} type="date"/>
              <ISelect label="Befristet / Süreli" value={form.befristet} onChange={v=>ff("befristet",v)} options={[{v:"nein",l:"Nein / Hayır"},{v:"ja",l:"Ja / Evet"}]}/>
              {form.befristet==="ja"&&<IFld label="Befristet bis / Bitiş Tarihi" value={form.befristetBis} onChange={v=>ff("befristetBis",v)} type="date"/>}
            </div>
          </div>
          {/* Konditionen */}
          <div style={{...S.panel({padding:10}),gridColumn:"1/-1"}}>
            <div style={S.tbar("linear-gradient(to right,#4a2a00,#8a6010)")}><span style={{fontSize:10}}>📋 Konditionen / Koşullar</span></div>
            <div style={{padding:"8px 0",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              <ISelect label="Heizung / Isıtma" value={form.heizung} onChange={v=>ff("heizung",v)} options={[{v:"zentral",l:"Zentral"},{v:"gas",l:"Gas"},{v:"elektro",l:"Elektro"},{v:"oel",l:"Öl"}]}/>
              <ISelect label="Strom inkl. / Elektrik dahil" value={form.strom} onChange={v=>ff("strom",v)} options={[{v:"nein",l:"Nein / Hayır"},{v:"ja",l:"Ja / Evet"}]}/>
              <ISelect label="Internet inkl. / İnternet dahil" value={form.internet} onChange={v=>ff("internet",v)} options={[{v:"nein",l:"Nein / Hayır"},{v:"ja",l:"Ja / Evet"}]}/>
              <ISelect label="Haustier / Evcil Hayvan" value={form.haustier} onChange={v=>ff("haustier",v)} options={[{v:"nein",l:"Nein / Hayır"},{v:"ja",l:"Ja / Evet"}]}/>
              <ISelect label="Rauchen / Sigara" value={form.rauchen} onChange={v=>ff("rauchen",v)} options={[{v:"nein",l:"Nein / Hayır"},{v:"ja",l:"Ja / Evet"}]}/>
            </div>
          </div>
          {/* Notfall */}
          <div style={{...S.panel({padding:10}),gridColumn:"1/-1"}}>
            <div style={S.tbar("linear-gradient(to right,#6a0000,#cc0000)")}><span style={{fontSize:10}}>🚨 Notfallkontakt / Acil Kişi</span></div>
            <div style={{padding:"8px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <IFld label="Name / Ad Soyad" value={form.notfallName} onChange={v=>ff("notfallName",v)}/>
              <IFld label="Telefon" value={form.notfallTel} onChange={v=>ff("notfallTel",v)}/>
            </div>
          </div>
        </div>
        {formMsg&&<div style={{maxWidth:700,margin:"6px auto",padding:"8px 12px",borderRadius:6,background:formMsg.startsWith("✓")?"#d4ffd4":"#ffd4d4",color:formMsg.startsWith("✓")?"#005500":"#cc0000",fontSize:12,textAlign:"center"}}>{formMsg}</div>}
        <div style={{maxWidth:700,margin:"8px auto",display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={saveContract} style={S.btn({background:"#d4ffd4",padding:"5px 16px"})}>💾 {"Speichern"}</button>
          <button onClick={()=>setView("building")} style={S.btn({padding:"5px 16px"})}>✗ {"Abbrechen"}</button>
        </div>
      </div>
    </div>
  );
  return null;
}
function makeMietvertragHTML(c, bld) {
  const date = new Date().toLocaleDateString("de-DE");
  const warmmiete = (parseFloat(c.miete)||0) + (parseFloat(c.nebenkosten)||0);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Mietvertrag ${c.vorname} ${c.nachname}</title>
<style>@page{size:A4;margin:20mm 15mm}body{font-family:Arial,sans-serif;font-size:10pt;color:#222;line-height:1.6}
h1{font-size:16pt;color:#1a3a6b;text-align:center;margin-bottom:4mm}
h2{font-size:11pt;color:#1a3a6b;border-bottom:1px solid #1a3a6b;padding-bottom:2px;margin:6mm 0 3mm}
.row{display:flex;gap:8mm;margin-bottom:2mm}.col{flex:1}
.label{font-size:8pt;color:#888}.value{font-weight:bold;font-size:10pt}
.sig{display:flex;gap:20mm;margin-top:15mm}.sig-box{flex:1;border-top:1px solid #333;padding-top:3mm;font-size:9pt;color:#666}
.box{border:1px solid #ccc;padding:3mm;margin:3mm 0;background:#f9f9f9}
@media print{.no-print{display:none}}</style></head><body>
<h1>MIETVERTRAG</h1>
<div style="text-align:center;font-size:9pt;color:#888;margin-bottom:6mm">Erden GbR · Weselerstr. 119 · 47169 Duisburg · Tel: 0173-710 2388</div>
<h2>1. Vertragsparteien</h2>
<div class="box">
<div class="row"><div class="col"><div class="label">Vermieter</div><div class="value">Erden GbR</div><div>Weselerstr. 119, 47169 Duisburg</div></div>
<div class="col"><div class="label">Mieter / Kiracı</div><div class="value">${c.vorname} ${c.nachname}</div><div>geb. ${c.geburtsdatum||"–"} · ${c.nationalitaet||"–"}</div><div>${c.personalausweis?`Ausweis: ${c.personalausweis}`:""}</div></div></div>
</div>
<h2>2. Mietobjekt</h2>
<div class="box"><div class="row">
<div class="col"><div class="label">Anschrift</div><div class="value">${bld?.address||bld?.name||""}</div></div>
<div class="col"><div class="label">Wohnung</div><div class="value">${c.wohnung||"–"} ${c.etage?`(${c.etage})`:""}</div></div>
<div class="col"><div class="label">Fläche / Zimmer</div><div class="value">${c.qm||"–"} m² · ${c.zimmer||"–"} Zi.</div></div>
</div></div>
<h2>3. Mietdauer</h2>
<div class="box"><div class="row">
<div class="col"><div class="label">Einzug</div><div class="value">${c.einzug||"–"}</div></div>
<div class="col"><div class="label">Befristet</div><div class="value">${c.befristet==="ja"?`Ja, bis ${c.befristetBis}`:"Unbefristet"}</div></div>
</div></div>
<h2>4. Miete und Nebenkosten</h2>
<div class="box"><div class="row">
<div class="col"><div class="label">Kaltmiete</div><div class="value">${parseFloat(c.miete||0).toFixed(2)} €</div></div>
<div class="col"><div class="label">Nebenkosten VZ</div><div class="value">${parseFloat(c.nebenkosten||0).toFixed(2)} €</div></div>
<div class="col"><div class="label">Warmmiete gesamt</div><div class="value" style="color:#1a3a6b">${warmmiete.toFixed(2)} €</div></div>
<div class="col"><div class="label">Kaution</div><div class="value">${parseFloat(c.kaution||0).toFixed(2)} €</div></div>
</div>
<div style="margin-top:3mm;font-size:9pt">Heizung: ${c.heizung||"–"} · Strom inkl.: ${c.strom==="ja"?"Ja":"Nein"} · Internet inkl.: ${c.internet==="ja"?"Ja":"Nein"}</div>
</div>
<h2>5. Hausordnung</h2>
<div style="font-size:9pt">Haustiere: ${c.haustier==="ja"?"Erlaubt":"Nicht erlaubt"} · Rauchen: ${c.rauchen==="ja"?"Erlaubt":"Nicht erlaubt"}</div>
${c.notfallName?`<h2>6. Notfallkontakt</h2><div>${c.notfallName} · ${c.notfallTel||""}</div>`:""}
<h2>7. Unterschriften</h2>
<div class="sig">
<div class="sig-box">Ort, Datum: Duisburg, ${date}<br><br>Vermieter: Erden GbR</div>
<div class="sig-box">Ort, Datum: Duisburg, ${date}<br><br>Mieter: ${c.vorname} ${c.nachname}</div>
</div>
<div style="margin-top:8mm;font-size:7pt;color:#aaa;text-align:center">Erstellt am ${date} · ZIN Verwaltungsprogramm · Erden GbR</div>
<button class="no-print" onclick="window.print()" style="display:block;margin:8mm auto;padding:6px 24px;background:#1a3a6b;color:#fff;border:none;cursor:pointer;font-size:10pt">🖨 Drucken / PDF</button>
</body></html>`;
}
function NebenkostenPage({onBack}){  const NEBEN_YEARS=[2025,2026,2027,2028,2029,2030],NEBEN_ACTIVE=2026;  const [nebenYear,setNebenYear]=useState(NEBEN_ACTIVE);  const [nebenUnlocked,setNebenUnlocked]=useState({[NEBEN_ACTIVE]:true});  const [nebenPassInput,setNebenPassInput]=useState("");  const [nebenPassErr,setNebenPassErr]=useState(false);  const [nebenPassTarget,setNebenPassTarget]=useState(null);  const [showNebenPass,setShowNebenPass]=useState(false);
  const selectNebenYear=y=>{if(y===NEBEN_ACTIVE||nebenUnlocked[y]){setNebenYear(y);return;}setNebenPassTarget(y);setNebenPassInput("");setNebenPassErr(false);setShowNebenPass(true);};  const checkNebenPass=()=>{if(nebenPassInput===YEAR_PASS){setNebenUnlocked(u=>({...u,[nebenPassTarget]:true}));setNebenYear(nebenPassTarget);setShowNebenPass(false);}else{setNebenPassErr(true);setNebenPassInput("");}};  const [nebenData,setNebenData]=useState(JSON.parse(JSON.stringify(INIT_NEBEN_DATA)));
  const [nebenView,setNebenView]=useState("list");  const [selBldKey,setSelBldKey]=useState(null);  const [selTenIdx,setSelTenIdx]=useState(null);  const [editKosten,setEditKosten]=useState(false);  const [editKostenData,setEditKostenData]=useState(null);  const [editNeben,setEditNeben]=useState(false);  const [editNebenData,setEditNebenData]=useState(null);  const bld=selBldKey?nebenData[selBldKey]:null;  const tenant=(bld&&selTenIdx!==null)?bld.tenants[selTenIdx]:null;  const calc=(bld&&
tenant)?calcTenantShare(bld,tenant):null;  const GT=S.tbar("linear-gradient(to right,#1a4a1a,#3a8a3a)");  const openEditKosten=()=>{setEditKostenData(JSON.parse(JSON.stringify(bld.kosten)));setEditKosten(true);};  const saveKosten=()=>{setNebenData(d=>({...d,[selBldKey]:{...d[selBldKey],kosten:editKostenData}}));setEditKosten(false);};  const openEditNeben=()=>{setEditNebenData(JSON.parse(JSON.stringify(bld.tenants)));setEditNeben(true);
};  const saveNeben=()=>{setNebenData(d=>({...d,[selBldKey]:{...d[selBldKey],tenants:editNebenData}}));setEditNeben(false);};  const EditNebenModal=()=>editNeben&&editNebenData?(<Modal title={`✏ Mieter bearbeiten — ${bld.label}`} bg="linear-gradient(to right,#4a0a6a,#8a4aaa)" onClose={()=>setEditNeben(false)} maxW={640}><div style={{fontSize:11,color:"#555",marginBottom:8}}>Mieter, Fläche, Personen, Monate und Vorauszahlungen anpassen:</div>{editNebenData.map((t,i)=>(<div key={t.nr} style={{...S
.panel({padding:6,marginBottom:6}),background:"#f8f4ff"}}><div style={{fontSize:11,fontWeight:"bold",color:"#4a0a6a",marginBottom:5,borderBottom:"1px solid #ccc",paddingBottom:3}}>Nr. {t.nr} · {t.etage}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:4}}><IField label="Name" value={t.name} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,name:v}:x))}/><IField label="Etage" value={t.etage} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,etage:v
}:x))}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:4}}><IField label="m²" value={String(t.qm)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,qm:parseFloat(v)||0}:x))}/><IField label="Personen" value={String(t.personen)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,personen:parseInt(v)||0}:x))}/><IField label="Monate" value={String(t.monate)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,monate:parseInt(v)||
0}:x))}/><IField label="BK €/Mo" value={String(t.bk_mo)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,bk_mo:parseFloat(v)||0,vz_bk:null}:x))}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4}}><IField label="HK €/Mo" value={String(t.hz_mo)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,hz_mo:parseFloat(v)||
0,vz_hz:null}:x))}/><IField label="VZ BK gesamt €" value={String(t.vz_bk!==null?Math.abs(t.vz_bk):t.bk_mo*t.monate)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,vz_bk:-(parseFloat(v)||0)}:x))}/><IField label="VZ HK gesamt €" value={String(t.vz_hz!==null?Math.abs(t.vz_hz):t.hz_mo*t.monate)} onChange={v=>setEditNebenData(d=>d.map((x,j)=>j===i?{...x,vz_hz:-(parseFloat(v)||
0)}:x))}/><div style={{display:"flex",alignItems:"flex-end",paddingBottom:6}}><div style={{fontSize:9,color:"#888"}}>Saldo: <strong style={{color:calcTenantShare({...bld,tenants:editNebenData},editNebenData[i]).saldo>=0?"#005500":"#cc0000"}}>{fmtE(calcTenantShare({...bld,tenants:editNebenData},
editNebenData[i]).saldo)}</strong></div></div></div></div>))}<div style={{display:"flex",gap:6,justifyContent:"flex-end",marginTop:4}}><button onClick={saveNeben} style={S.btn({background:"#d4ffd4"})}>💾 Speichern</button><button onClick={()=>setEditNeben(false)} style={S.btn()}>Abbrechen</button></div></Modal>):null;  const EditModal=()=>editKosten&&
editKostenData?(    <Modal title={`✏ Betriebskosten — ${bld.label}`} bg="linear-gradient(to right,#1a4a1a,#3a8a3a)" onClose={()=>setEditKosten(false)} maxW={560}>      <div style={{marginBottom:6,fontSize:11,color:"#555"}}>Beträge können hier angepasst werden:</div>      {editKostenData.map((k,i)=>(        <div key={k.nr} style={{display:"flex",alignItems:"center",gap:4,marginBottom:4,padding:"3px 5px",background:k.betrag===0?"#f0f0f0":BP,...S.panel()}}>          <div style={{width:20,fontSize:1
0,color:"#888"}}>{k.nr}.</div>          <div style={{flex:1,fontSize:10,fontWeight:"bold"}}>{k.name}</div>          <div style={{fontSize:9,color:"#888",width:40,textAlign:"center"}}>{k.art}</div>          <input type="text" inputMode="decimal" value={editKostenData[i].betrag}            onChange={e=>{const v=e.target.value;setEditKostenData(d=>d.map((x,j)=>j===i?{...x,betrag:parseFloat(v)||0}:x));
}}            style={{...S.inp,width:90,textAlign:"right"}}/>          <span style={{fontSize:10}}>€</span>        </div>      ))}      <div style={{borderTop:"2px solid #888",padding:"6px 4px",marginTop:4,display:"flex",justifyContent:"space-between",alignItems:"center"}}>        <span style={{fontSize:11,fontWeight:"bold"}}>Gesamt: {fmt(editKostenData.reduce((s,k)=>s+k.betrag,0))} €</span>        <div style={{display:"flex",gap:6}}>          <button onClick={()=>setEditKostenData(d=>[...d,{
nr:d.length+1,name:"Neue Position",betrag:0,art:"Fläche"}])} style={S.btn({background:"#d4ffd4"})}>+ Neue Zeile</button>          <button onClick={saveKosten} style={S.btn({background:"#d4ffd4"})}>💾 Speichern</button>          <button onClick={()=>setEditKosten(false)} style={S.btn()}>Abbrechen</button>        </div>      </div>    </Modal>  ):null;  if(nebenView==="list"){return(    <div style={{flex:1,display:"flex",flexDirection:"column"}}>      {showNebenPass&&
(<div style={{position:"fixed",inset:0,background:"rgba(0,0,60,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}}><div style={{...S.panel(),width:280}}><div style={S.tbar()}><span>🔒 Jahr {nebenPassTarget}</span></div><div style={{padding:12}}><div style={{fontSize:11,marginBottom:6,color:"#555"}}>Jahr {nebenPassTarget} ist gesperrt:</div><input type="password" value={nebenPassInput} onChange={e=>setNebenPassInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&
checkNebenPass()} style={S.inp} autoFocus/>{nebenPassErr&&<div style={{color:"#cc0000",fontSize:11,marginTop:3}}>❌ Falsches Passwort!</div>}<div style={{display:"flex",gap:6,justifyContent:"flex-end",marginTop:10}}><button onClick={checkNebenPass} style={S.btn()}>OK</button><button onClick={()=>setShowNebenPass(false)} style={S.btn()}>Abbrechen</button></div></div></div></div>)}      <div style={GT}><span>📋 Nebenkostenabrechnung {nebenYear}</span><button onClick={onBack} style={S.btn({fontSize:1
0,padding:"1px 6px"})}>⌂ Hauptmenü</button></div>      <div style={{background:BP,borderBottom:"1px solid #aaa",padding:"3px 8px",display:"flex",gap:3,alignItems:"center",flexWrap:"wrap"}}><span style={{fontSize:11,fontWeight:"bold",color:"#555"}}>Jahr:</span>{NEBEN_YEARS.map(y=>{const isActive=nebenYear===y,locked=y!==NEBEN_ACTIVE&&!nebenUnlocked[y];return(<button key={y} onClick={()=>selectNebenYear(y)} style={S.btn({padding:"2px 6px",fontSize:11,background:isActive?"#a0c0ff":BP})}>{locked&&
<span style={{fontSize:9,marginRight:2}}>🔒</span>}{y}{isActive&&<span style={{fontSize:8,marginLeft:2,color:"#004499"}}>▼</span>}</button>);})}</div>      <div style={{flex:1,padding:10,overflowY:"auto",background:BG}}>        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:7,maxWidth:960,margin:"0 auto"}}>          {Object.entries(nebenData).map(([k,v])=>{            const totalSaldo=v.tenants.reduce((s,t)=>{const c=calcTenantShare(v,t);
return s+c.saldo;},0);            const allOk=totalSaldo>=0;            return(              <div key={k} style={S.panel({padding:"7px 9px",background:allOk?"#e8ffe8":BP,outline:allOk?"2px solid #00aa00":"none"})}>                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>                  <div><div style={{fontSize:12,fontWeight:"bold",color:allOk?"#005500":"#1a4a1a"}}>{v.label}</div>                  <div style={{fontSize:10,color:"#666"
}}>{v.tenants.length} Mieter · 2024</div></div>                </div>                <div style={S.inset({padding:"2px 6px",marginBottom:4,display:"flex",justifyContent:"space-between"})}>                  <span style={{fontSize:11,fontWeight:"bold",color:"#005500"}}>Saldo:</span>                  {allOk?<span style={{fontSize:10,color:"#005500",fontWeight:"bold"}}>✓ Ausgeglichen</span>:<span style={{fontSize:10,color:"#cc0000",fontWeight:"bold"}}>⚠ {fmt(Math.abs(totalSaldo))} €</span>}         
       </div>                <button onClick={()=>{setSelBldKey(k);setSelTenIdx(null);setNebenView("building");}} style={S.btn({width:"100%",padding:"3px 0",fontSize:11,textAlign:"center"})}>Mieter →</button>              </div>            );          })}        </div>      </div>    </div>  );}  if(nebenView==="building"&&
bld){return(    <div style={{flex:1,display:"flex",flexDirection:"column"}}>      <div style={GT}>        <span>📋 {bld.label} — Nebenkostenabrechnung 2024</span>        <div style={{display:"flex",gap:4}}>          <button onClick={()=>{setNebenView("list");setSelBldKey(null);
}} style={S.btn({fontSize:10,padding:"1px 6px"})}>← Gebäude</button>          <button onClick={onBack} style={S.btn({fontSize:10,padding:"1px 6px"})}>⌂ Hauptmenü</button>        </div>      </div>      <div style={{background:BP,padding:"4px 8px",borderBottom:"1px solid #aaa",display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>        <button onClick={openEditKosten} style={S.btn({background:"#d4ffd4",fontSize:10})}>✏ Betriebskosten bearbeiten</button>        <button onClick={openEditNebe
n} style={S.btn({background:"#e0d4ff",fontSize:10})}>👤 Mieter bearbeiten</button>        <div style={{flex:1}}/>        <div style={S.inset({padding:"2px 6px",fontSize:10})}>Gesamtkosten: <strong>{fmt(bld.kosten.reduce((s,k)=>s+k.betrag,0))} €</strong></div>      </div>      <div style={{flex:1,overflowY:"auto",background:BG,padding:"8px 10px"}}>        <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>          <div style={{flexShrink:0}}>            <BuildingFloorPlanNeben bldId={se
lBldKey} nebenTenants={bld.tenants} onSelectTenant={idx=>{setSelTenIdx(idx);setNebenView("tenant");}} selTenIdx={selTenIdx}/>            <div style={{marginTop:6,fontSize:9,color:"#555",textAlign:"center"}}>Klicken zum Öffnen</div>          </div>          <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:4}}>            {bld.tenants.map((t,i)=>{              const c=calcTenantShare(bld,t);
              return(                <div key={t.nr} style={S.panel({overflow:"hidden",cursor:"pointer"})} onClick={()=>{setSelTenIdx(i);setNebenView("tenant");}}>                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 8px",background:BP,borderBottom:"1px solid #ccc"}}>                    <div style={{flex:1,minWidth:0}}>                      <span style={{fontSize:12,fontWeight:"bold",color:"#0a246a"}}>{t.name}</span>                      <span style={{fontSize:10,c
olor:"#666",marginLeft:5}}>{t.etage} · {t.personen} Pers. · {t.qm} m²</span>                    </div>                    <div style={S.inset({padding:"1px 8px",fontSize:11,fontWeight:"bold",color:c.saldo>=0?"#005500":"#cc0000",whiteSpace:"nowrap"})}>{fmtE(c.saldo)}</div>                    <span style={{fontSize:10,color:"#0a246a",marginLeft:4}}>→</span>                  </div>                  <div style={{display:"flex",gap:0,background:"#f8f8f8"}}>                    {[["BK",c.vz_bk,c.bkShar
e,c.saldo_bk],["HK",c.vz_hz,c.hzShare,c.saldo_hz]].map(([lbl,vz,share,sld])=>(                      <div key={lbl} style={{flex:1,padding:"3px 8px",borderRight:lbl==="BK"?"1px solid #ddd":"none"}}>                        <div style={{fontSize:9,color:"#777"}}>{lbl}: VZ {fmt(vz)}€ / Anteil {fmt(share)}€</div>                        <div style={{fontSize:10,fontWeight:"bold",color:sld>=0?"#005500":"#cc0000"}}>Saldo: {fmtE(sld)}</div>                      </div>                    ))}              
    </div>                </div>              );            })}          </div>        </div>      </div>      <EditModal/>      <EditNebenModal/>    </div>  );}  if(nebenView==="tenant"&&bld&&tenant&&calc){    const totalKosten=bld.kosten.reduce((s,k)=>s+k.betrag,0);    const bkKosten=bld.kosten.filter(k=>k.nr<=13);    const hzKosten=bld.kosten.filter(k=>k.nr>13);    const totalP=bld.tenants.reduce((s,t)=>s+t.personen*t.monate,0);    const totalQm=bld.tenants.reduce((s,t)=>s+t.qm,0);
    const printAbrechnung=()=>{const w=window.open("","_blank");w.document.write(makeAbrechnungHTML(bld,tenant,calc));w.document.close();};    return(      <div style={{flex:1,display:"flex",flexDirection:"column"}}>        <div style={GT}>          <span>📋 {tenant.name} — Abrechnung 2024</span>          <div style={{display:"flex",gap:4}}>            <button onClick={()=>setNebenView("building")} style={S.btn({fontSize:10,padding:"1px 6px"})}>← {bld.label}</button>            <button onClick={(
)=>{setNebenView("list");setSelBldKey(null);}} style={S.btn({fontSize:10,padding:"1px 6px"})}>← Gebäude</button>            <button onClick={onBack} style={S.btn({fontSize:10,padding:"1px 6px"})}>⌂ Hauptmenü</button>          </div>        </div>        <div style={{flex:1,overflowY:"auto",background:BG,padding:8}}>          <div style={{display:"flex",gap:8,alignItems:"flex-start",flexWrap:"wrap"}}>            <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>             
 <BuildingFloorPlanNeben bldId={selBldKey} nebenTenants={bld.tenants} onSelectTenant={idx=>{setSelTenIdx(idx);}} selTenIdx={selTenIdx}/>              <div style={{...S.panel({minWidth:220})}}>                <div style={S.tbar("linear-gradient(to right,#1a4a1a,#3a8a3a)")}><span style={{fontSize:10}}>Betriebskosten — {bld.label}</span></div>                <div style={{padding:4}}>                  {bld.kosten.map(k=>(                    <div key={k.nr} style={{display:"flex",justifyContent:"spac
e-between",alignItems:"center",padding:"1px 4px",fontSize:9,borderBottom:"1px solid #ddd",background:k.betrag===0?"#eee":BP}}>                      <span style={{color:k.betrag===0?"#aaa":"#222"}}>{k.nr}. {k.name}</span>                      <span style={{fontWeight:"bold",color:k.betrag===0?"#aaa":"#0a246a",whiteSpace:"nowrap",marginLeft:4}}>{fmt(k.betrag)} €</span>                    </div>                  ))}                  <div style={{display:"flex",justifyContent:"space-between",padding
:"3px 4px",fontSize:10,fontWeight:"bold",borderTop:"2px solid #888",marginTop:2,background:"#d0e8ff"}}>                    <span>Gesamt:</span><span>{fmt(totalKosten)} €</span>                  </div>                  <button onClick={openEditKosten} style={S.btn({marginTop:4,width:"100%",fontSize:9,background:"#d4ffd4"})}>✏ Bearbeiten</button>                </div>              </div>            </div>            <div style={{flex:1,minWidth:260,display:"flex",flexDirection:"column",gap:6}}>   
           <div style={S.panel({padding:0,overflow:"hidden"})}>                <div style={S.tbar("linear-gradient(to right,#4a0a6a,#8a4aaa)")}><span style={{fontSize:11}}>{tenant.name}</span></div>                <div style={{padding:6}}>                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:6}}>                    {[["Etage",tenant.etage],["Personen",tenant.personen],["Fläche",tenant.qm+" m²"],["Monate",tenant.monate]].map(([l,v])=>(             
         <div key={l} style={S.inset({padding:"3px 5px"})}><div style={{fontSize:8,color:"#666"}}>{l}</div><div style={{fontSize:10,fontWeight:"bold"}}>{v}</div></div>                    ))}                  </div>                  <div style={{fontSize:9,color:"#666"}}>Gesamt Fläche: {totalQm.toFixed(2)} m² · Gesamt Personen×Monate: {totalP}</div>                </div>              </div>              <div style={S.panel({padding:0,overflow:"hidden"})}>                <div style={S.tbar("linear
-gradient(to right,#1a4a1a,#3a8a3a)")}><span style={{fontSize:10}}>Betriebskosten — Aufgliederung</span></div>                <div style={{padding:4,overflowX:"auto"}}>                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:9}}>                    <thead><tr style={{background:"#d0e8d0"}}>                      <th style={{padding:"2px 4px",textAlign:"left",borderBottom:"1px solid #aaa"}}>#</th>                      <th style={{padding:"2px 4px",textAlign:"left",borderBot
tom:"1px solid #aaa"}}>Position</th>                      <th style={{padding:"2px 4px",textAlign:"center",borderBottom:"1px solid #aaa"}}>Art</th>                      <th style={{padding:"2px 4px",textAlign:"right",borderBottom:"1px solid #aaa"}}>Ges./Anteil</th>                      <th style={{padding:"2px 4px",textAlign:"right",borderBottom:"1px solid #aaa"}}>Ausgaben</th>                      <th style={{padding:"2px 4px",textAlign:"right",borderBottom:"1px solid #aaa"}}>Anteil</th>       
             </tr></thead>                    <tbody>                      {bkKosten.map((k,i)=>{                        const pc=calc.perTenant.find(p=>p.nr===k.nr);                        const tc=k.art==="Person"?`${tenant.personen*tenant.monate}/${totalP}`:`${tenant.qm}/${totalQm.toFixed(0)}`;                        return(<tr key={k.nr} style={{background:i%2===0?"#f5f5f5":"#fff"}}>                          <td style={{padding:"1px 4px"}}>{k.nr}</td><td style={{padding:"1px 4px"}}>{k.name}<
/td>                          <td style={{padding:"1px 4px",textAlign:"center",color:"#666"}}>{k.art}</td>                          <td style={{padding:"1px 4px",textAlign:"right",color:"#555"}}>{tc}</td>                          <td style={{padding:"1px 4px",textAlign:"right"}}>{fmt(k.betrag)} €</td>                          <td style={{padding:"1px 4px",textAlign:"right",fontWeight:"bold",color:"#0a246a"}}>{fmt(pc?.anteil||0)} €</td>                        </tr>);
                      })}                    </tbody>                    <tfoot><tr style={{background:"#d0e8ff",fontWeight:"bold"}}>                      <td colSpan={4} style={{padding:"2px 4px"}}>Summe BK:</td>                      <td style={{padding:"2px 4px",textAlign:"right"}}>{fmt(bkKosten.reduce((s,k)=>s+k.betrag,0))} €</td>                      <td style={{padding:"2px 4px",textAlign:"right"}}>{fmt(calc.bkShare)} €</td>                    </tr></tfoot>                  </table>        
          <div style={{marginTop:4,display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>                    <div style={S.inset({padding:"2px 6px",flex:1})}><span style={{fontSize:9,color:"#555"}}>VZ BK: </span><strong>{fmt(calc.vz_bk)} €</strong></div>                    <div style={S.inset({padding:"2px 6px",flex:1})}><span style={{fontSize:9,color:"#555"}}>Anteil BK: </span><strong>{fmt(calc.bkShare)} €</strong></div>                    <div style={{...S.panel({padding:"2px 8px",flex:1}
),background:calc.saldo_bk>=0?"#d0ffd0":"#ffd0d0"}}><span style={{fontSize:9}}>Saldo BK: </span><strong style={{color:calc.saldo_bk>=0?"#005500":"#cc0000"}}>{fmtE(calc.saldo_bk)}</strong></div>                  </div>                </div>              </div>              <div style={S.panel({padding:0,overflow:"hidden"})}>                <div style={S.tbar("linear-gradient(to right,#4a2a00,#8a6010)")}><span style={{fontSize:10}}>Heizkosten — Aufgliederung</span></div>                <div style=
{{padding:4}}>                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:9}}>                    <thead><tr style={{background:"#f0e0c0"}}>                      <th style={{padding:"2px 4px",textAlign:"left",borderBottom:"1px solid #aaa"}}>#</th>                      <th style={{padding:"2px 4px",textAlign:"left",borderBottom:"1px solid #aaa"}}>Position</th>                      <th style={{padding:"2px 4px",textAlign:"center",borderBottom:"1px solid #aaa"}}>Art</th>       
               <th style={{padding:"2px 4px",textAlign:"right",borderBottom:"1px solid #aaa"}}>m²</th>                      <th style={{padding:"2px 4px",textAlign:"right",borderBottom:"1px solid #aaa"}}>Ausgaben</th>                      <th style={{padding:"2px 4px",textAlign:"right",borderBottom:"1px solid #aaa"}}>Anteil</th>                    </tr></thead>                    <tbody>                      {hzKosten.map((k,i)=>{                        const pc=calc.perTenant.find(p=>p.nr===k.n
r);                        return(<tr key={k.nr} style={{background:i%2===0?"#fdf8f0":"#fff"}}>                          <td style={{padding:"1px 4px"}}>{k.nr}</td><td style={{padding:"1px 4px"}}>{k.name}</td>                          <td style={{padding:"1px 4px",textAlign:"center",color:"#666"}}>{k.art}</td>                          <td style={{padding:"1px 4px",textAlign:"right",color:"#555"}}>{tenant.qm}/{totalQm.toFixed(0)}</td>                          <td style={{padding:"1px 4px",textAli
gn:"right"}}>{fmt(k.betrag)} €</td>                          <td style={{padding:"1px 4px",textAlign:"right",fontWeight:"bold",color:"#8a4a00"}}>{fmt(pc?.anteil||0)} €</td>                        </tr>);
                      })}                    </tbody>                    <tfoot><tr style={{background:"#f0ddb0",fontWeight:"bold"}}>                      <td colSpan={4} style={{padding:"2px 4px"}}>Summe HK:</td>                      <td style={{padding:"2px 4px",textAlign:"right"}}>{fmt(hzKosten.reduce((s,k)=>s+k.betrag,0))} €</td>                      <td style={{padding:"2px 4px",textAlign:"right"}}>{fmt(calc.hzShare)} €</td>                    </tr></tfoot>                  </table>        
          <div style={{marginTop:4,display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>                    <div style={S.inset({padding:"2px 6px",flex:1})}><span style={{fontSize:9,color:"#555"}}>VZ HK: </span><strong>{fmt(calc.vz_hz)} €</strong></div>                    <div style={S.inset({padding:"2px 6px",flex:1})}><span style={{fontSize:9,color:"#555"}}>Anteil HK: </span><strong>{fmt(calc.hzShare)} €</strong></div>                    <div style={{...S.panel({padding:"2px 8px",flex:1}
),background:calc.saldo_hz>=0?"#d0ffd0":"#ffd0d0"}}><span style={{fontSize:9}}>Saldo HK: </span><strong style={{color:calc.saldo_hz>=0?"#005500":"#cc0000"}}>{fmtE(calc.saldo_hz)}</strong></div>                  </div>                </div>              </div>              <div style={{...S.panel({padding:8}),background:calc.saldo>=0?"#c0f0c0":"#f0c0c0"}}>                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>                  <span style={{fontSize:13,fo
ntWeight:"bold"}}>Gesamtsaldo:</span>                  <span style={{fontSize:15,fontWeight:"bold",color:calc.saldo>=0?"#005500":"#cc0000"}}>{fmtE(calc.saldo)}</span>                </div>                <div style={{fontSize:10,color:"#555",marginTop:3}}>{calc.saldo>=0?"✓ Guthaben — Rückzahlung an Mieter":"⚠ Nachzahlung erforderlich"}</div>                <button onClick={printAbrechnung} style={S.btn({marginTop:8,background:"#c8d8ee",width:"50%",padding:"5px 0",fontSize:11})}>📄 Drucken / PDF</
button><button onClick={()=>{const html=makeAbrechnungHTML(bld,tenant,calc);const blob=new Blob(['\ufeff',html],{type:'application/msword'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Abrechnung_'+tenant.name.replace(/ /g,'_')+'.doc';a.click();
}} style={S.btn({marginTop:8,background:"#1a5276",color:"#fff",width:"50%",padding:"5px 0",fontSize:11})}>📄 Word (.doc                </button>              </div>            </div>          </div>        </div>        <EditModal/>      </div>    );  }  return null;}export default function App(){  
  const [loggedIn,setLoggedIn]=useState(false);  const [currentUser,setCurrentUser]=useState(null);  const [loginUser,setLoginUser]=useState("");  const [loginPass,setLoginPass]=useState("");  const [loginErr,setLoginErr]=useState(false);  const [showReset,setShowReset]=useState(false);  const [resetStep,setResetStep]=useState(1);  const [resetEmail,setResetEmail]=useState("");  const [resetCode,setResetCode]=useState("");  const [resetNewPass,setResetNewPass]=useState("");
  const [resetCodeSent,setResetCodeSent]=useState("");  const [resetMsg,setResetMsg]=useState("");  const [showProfile,setShowProfile]=useState(false);  const [profileName,setProfileName]=useState("");  const [profileEmail,setProfileEmail]=useState("");  const [profileOldPass,setProfileOldPass]=useState("");  const [profileNewPass,setProfileNewPass]=useState("");  const [profileMsg,setProfileMsg]=useState("");  const [page,setPage]=useState("home");  const [year,setYear]=useState(ACTIVE_YEAR);
  const [unlockedYears,setUnlockedYears]=useState({[ACTIVE_YEAR]:true});  const [curMonth]=useState(new Date().getMonth());  const [buildings,setBuildings]=useState(initBuildings);  const [selBld,setSelBld]=useState(null);  const [allPay,setAllPay]=useState({});  const [expenses,setExpenses]=useState([]);  const [rcCounter,setRcCounter]=useState(1001);  const [showPartial,setShowPartial]=useState({});  const [modal,setModal]=useState(null);  const [confirm,setConfirm]=useState(null);
  const [passInput,setPassInput]=useState("");  const [passErr,setPassErr]=useState(false);  const [passTarget,setPassTarget]=useState(null);  const [editBld,setEditBld]=useState(null);  const [mahnData,setMahnData]=useState(null);  const [mahnLevel,setMahnLevel]=useState(1);  const [mahnMonth,setMahnMonth]=useState(0);  const [mahnText,setMahnText]=useState("");  const [rcData,setRcData]=useState(null);  const [expEditId,setExpEditId]=useState(null);  const [expDesc,setExpDesc]=useState("");
  const [expAmount,setExpAmount]=useState("");  const [expIsNeg,setExpIsNeg]=useState(false);  const [expCat,setExpCat]=useState(privCats[0]);  const [expBlds,setExpBlds]=useState([]);  const [selTenId,setSelTenId]=useState(null);
  const manualSave = () => {
    const data = {buildings, allPay, expenses, rcCounter, version:1, savedAt:new Date().toISOString()};
    saveData(data);
  }
  const safeSetPage = (newPage) => {
    if(hasUnsaved) {
      const ok = window.confirm("Kaydedilmemiş değişiklikler var!\n\n💾 Speichern → Kaydet ve çık\n✗ Abbrechen → Çıkma");
      if(ok) { manualSave(); setPage(newPage); }
    } else {
      setPage(newPage);
    }
  };
  const [saveStatus,setSaveStatus]=useState("");  const [hasUnsaved,setHasUnsaved]=useState(false);
  const saveTimer = useRef(null);
  const isFirstLoad = useRef(true);
  useEffect(() => {
    const dbRef = ref(db, DB_PATH);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.version) {
        if (data.buildings) setBuildings(data.buildings);
        if (data.allPay) setAllPay(data.allPay);
        if (data.expenses) setExpenses(data.expenses);
        if (data.rcCounter) setRcCounter(data.rcCounter);
        setSaveStatus("saved");
        lsSave(data); // localStorage yedek
      } else {
        const saved = lsLoad();
        if (saved && saved.version) {
          if (saved.buildings) setBuildings(saved.buildings);
          if (saved.allPay) setAllPay(saved.allPay);
          if (saved.expenses) setExpenses(saved.expenses);
          if (saved.rcCounter) setRcCounter(saved.rcCounter);
        }
      }
      isFirstLoad.current = false;
    });
  }, []);
  useEffect(() => {
    if (isFirstLoad.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaveStatus("unsaved");
    setHasUnsaved(true);
    saveTimer.current = null;
  }, [buildings, allPay, expenses, rcCounter]);
  const saveData = (data) => {
    setSaveStatus("saving");
    set(ref(db, DB_PATH), data)
      .then(()=>{ lsSave(data); setSaveStatus("saved"); setHasUnsaved(false); })
      .catch(()=>{ lsSave(data); setSaveStatus("saved"); setHasUnsaved(false); });
  };
;
  const yp=allPay[year]||{};  const setYP=fn=>setAllPay(a=>({...a,[year]:fn(a[year]||{})}));  const pk=(bid,tid,mi)=>`${bid}-${tid}-${mi}`;  const getP=(bid,tid,mi)=>getPS(yp,bid,tid,mi);  const askConfirm=(msg,onYes)=>setConfirm({msg,onYes});  const doConfirm=()=>{confirm?.onYes();setConfirm(null);};  const selectYear=y=>{if(y===ACTIVE_YEAR||unlockedYears[y]){setYear(y);return;}setPassTarget(`year:${y}`);setPassInput("");setPassErr(false);setModal("pass");
};  const bookBank=(bid,tid,mi)=>{setYP(p=>({...p,[pk(bid,tid,mi)]:{type:"bank"}}));setShowPartial(x=>({...x,[pk(bid,tid,mi)]:false}));};  const bookCashF=(bid,tid,mi)=>{setYP(p=>({...p,[pk(bid,tid,mi)]:{type:"cash",amount:true}}));setShowPartial(x=>({...x,[pk(bid,tid,mi)]:false}));};  const bookCashP=(bid,tid,mi,amt,rent)=>{if(amt>=rent){bookCashF(bid,tid,mi);return;}setYP(p=>({...p,[pk(bid,tid,mi)]:{type:"cash",amount:amt}}));setShowPartial(x=>({...x,[pk(bid,tid,mi)]:false}));
};  const cancelP=(bid,tid,mi,tName,mName)=>askConfirm(`"${tName}" — ${mName}\nZahlung stornieren?`,()=>{setYP(p=>{const n={...p};delete n[pk(bid,tid,mi)];return n;});setShowPartial(x=>({...x,[pk(bid,tid,mi)]:false}));});  const tenCashCollected=(bid,tid,rent)=>months.reduce((s,_,i)=>{const ps=getP(bid,tid,i);return ps.status==="cash_full"?s+rent:ps.status==="cash_partial"?s+ps.paid:s;},0);  const getBldDebt=b=>b.tenants.reduce((s,t)=>s+tenantOpenDebt(getP,b.id,t.id,t.rent,curMonth),0);
  const getTenDebt=(bid,tid,rent)=>tenantOpenDebt(getP,bid,tid,rent,curMonth);  const totalCash=buildings.reduce((s,b)=>s+b.tenants.reduce((ss,t)=>ss+tenCashCollected(b.id,t.id,t.rent),0),0);  const totalExp=expenses.reduce((s,e)=>s+e.amount,0);  const netBal=totalCash-totalExp;  const openPass=t=>{setPassTarget(t);setPassInput("");setPassErr(false);setModal("pass");};  const checkPass=()=>{    if(passTarget?.startsWith("year:")){if(passInput===YEAR_PASS){const y=parseInt(passTarget.slice(5));
setUnlockedYears(u=>({...u,[y]:true}));setYear(y);setModal(null);}else{setPassErr(true);setPassInput("");}return;}    const ok=passTarget?.startsWith("edit:")?EDIT_PASS:PRIVAT_PASS;    if(passInput===ok){setPassInput("");setPassErr(false);setModal(null);if(passTarget==="privat")setPage("privat");else if(passTarget?.startsWith("edit:")){const b=buildings.find(b=>b.id===passTarget.slice(5));setEditBld(JSON.parse(JSON.stringify(b)));setModal("edit_bld");}}else{setPassErr(true);setPassInput("");
}  };  const saveEditBld=()=>askConfirm("Änderungen speichern?",()=>{setBuildings(bs=>bs.map(b=>b.id===editBld.id?editBld:b));if(selBld?.id===editBld.id)setSelBld(editBld);setModal(null);});  const openAddExp=()=>{setExpEditId(null);setExpDesc("");setExpAmount("");setExpIsNeg(false);setExpCat(privCats[0]);setExpBlds([]);setModal("exp");};  const openEditExp=e=>{setExpEditId(e.id);setExpDesc(e.desc);const isNeg=e.amount<0;setExpIsNeg(isNeg);setExpAmount(String(Math.abs(e.amount)));
setExpCat(e.category);setExpBlds(e.buildings||[]);setModal("exp");};  const saveExp=()=>{const absAmt=parseFloat(expAmount.replace(",","."));if(!expDesc||isNaN(absAmt)||absAmt<=0)return;const finalAmt=expIsNeg?-absAmt:absAmt;const bldLabel=expBlds.length===0?"Allgemein":expBlds.length===buildings.length?"Alle":expBlds.map(id=>buildings.find(b=>b.id===id)?.name||id).join(", ");
if(expEditId)setExpenses(p=>p.map(e=>e.id===expEditId?{...e,desc:expDesc,amount:finalAmt,category:expCat,buildings:expBlds,building:bldLabel}:e));else setExpenses(p=>[...p,{desc:expDesc,amount:finalAmt,category:expCat,buildings:expBlds,building:bldLabel,date:new Date().toLocaleDateString("de-DE"),id:Date.now()}]);setModal(null);};  const defMahn=(t,b,lv,yr,mo)=>{const n=t.name,r=fmt(t.rent),mn=months[mo];if(lv===1)return`Sehr geehrte/r ${n},
\n\nmit dieser Mahnung weisen wir Sie darauf hin, dass die Miete für ${mn} ${yr} in Höhe von ${r} € bisher nicht eingegangen ist.\n\nBitte überweisen Sie den Betrag umgehend:\n\nIBAN: ${OWNER.iban}\n\nZahlungsfrist: 7 Tage.`;if(lv===2)return`Sehr geehrte/r ${n},\n\ntrotz unserer 1. Mahnung ist die Miete für ${mn} ${yr} (${r} €) weiterhin offen.\n\nIBAN: ${OWNER.iban}\n\nZahlungsfrist: 5 Tage. Bei Nichtzahlung werden rechtliche Schritte eingeleitet.`;return`Sehr geehrte/r ${n},
\n\nDIES IST UNSERE LETZTE MAHNUNG.\n\nDie Miete für ${mn} ${yr} (${r} €) ist nicht eingegangen.\n\nZahlungsfrist: 3 Tage. IBAN: ${OWNER.iban}\n\nBei Nichtzahlung kündigen wir fristlos.`;};  const openMahn=(t,b,lv)=>{const idx=months.findIndex((_,i)=>i<=curMonth&&getP(b.id,t.id,i).status==="unpaid");const m=idx>=0?idx:curMonth;setMahnData({t,b});setMahnLevel(lv);setMahnMonth(m);setMahnText(defMahn(t,b,lv,year,m));setModal("mahn");
};  const printMahn=()=>{const{t,b}=mahnData,lv=mahnLevel,mo=mahnMonth;const lc=lv===1?"#b8860b":lv===2?"#cc5500":"#cc0000";const lt=lv===1?"1. Mahnung":lv===2?"2. Mahnung":"3. Mahnung (Letzte)";const w=window.open("","_blank");
w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;padding:50px 60px;font-size:14px;line-height:1.7}.s{font-size:13px;color:#555;margin-bottom:28px}.r{margin-bottom:28px}.subj{font-weight:bold;font-size:15px;color:${lc};padding:8px 12px;border-left:4px solid ${lc};background:#fafafa;margin-bottom:22px}.body{white-space:pre-line;margin-bottom:30px}.sig{margin-top:40px}</style></head><body><div clas
s="s"><strong>${OWNER.name}</strong><br>${OWNER.street}<br>${OWNER.city}<br>${new Date().toLocaleDateString("de-DE")}</div><div class="r"><strong>${t.name}</strong><br>${t.apartment}<br>${b.address}</div><div class="subj">Betreff: ${lt} — Miete ${months[mo]} ${year}</div><div class="body">${mahnText}</div><div class="sig">Mit freundlichen Grüßen<br><br><strong>${OWNER.name}</strong><br>${OWNER.street}<br>${OWNER.city}<br>${OWNER.tel1} / ${OWNER.tel2}</div></body></html>`);w.document.close();
setTimeout(()=>w.print(),600);};  const openReceipt=(t,b,mi)=>{const ps=getP(b.id,t.id,mi);setRcData({tenant:t,building:b,month:mi,no:String(rcCounter),paid:ps.status==="cash_partial"?ps.paid:null});setRcCounter(c=>c+1);setModal("receipt");};  const printReceipt=()=>{const{tenant:t,building:b,month:mi,no,paid:pa}=rcData;const w=window.open("","_blank");w.document.write(makeQuittungHTML(t,b,mi,year,no,pa??t.rent,pa!==null&&pa!==undefined&&pa<t.rent));w.document.close();
setTimeout(()=>w.print(),700);};  const Btn=({onClick,children,style={}})=><button onClick={onClick} style={S.btn(style)}>{children}</button>;  const YearBtn=({y})=>{const isActive=year===y,locked=y!==ACTIVE_YEAR&&!unlockedYears[y];return<button onClick={()=>selectYear(y)} style={S.btn({padding:"2px 6px",fontSize:11,background:isActive?"#a0c0ff":BP})}>{locked&&<span style={{fontSize:9,marginRight:2}}>🔒</span>}{y}{isActive&&
<span style={{fontSize:8,marginLeft:2,color:"#004499"}}>▼</span>}</button>;};  const TopBar=({title})=>(    <div style={{background:BP,borderBottom:"2px solid #888",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"3px 8px",userSelect:"none"}}>      <div style={{display:"flex",alignItems:"center",gap:10}}>        <ErdenLogoSmall/>        {title&&
<><div style={{width:1,background:"#aaa",height:30}}/><span style={{fontSize:12,fontWeight:"bold",color:"#0a246a",fontFamily:"Tahoma,sans-serif"}}>{title}</span></>}      </div>      <div style={{display:"flex",alignItems:"center",gap:4}}>
        {page!=="home"&&<button onClick={()=>safeSetPage("home")} style={S.btn({fontSize:10,padding:"1px 7px"})}>⌂ Hauptmenü</button>}
        <button onClick={()=>{setProfileName(currentUser?.username||"");setProfileEmail(currentUser?.email||"");setProfileOldPass("");setProfileNewPass("");setProfileMsg("");setShowProfile(true);}} style={{...S.btn({fontSize:10,padding:"1px 7px"}),background:"#c8a84b",color:"#1a3a6b"}}>👤 {currentUser?.username||"Profil"}</button>
      </div>      <div style={{fontSize:9,color:saveStatus==="saving"?"#aa6600":saveStatus==="saved"?"#005500":"#cc0000",fontFamily:"Tahoma",marginLeft:6}}>{saveStatus==="saving"?"💾":saveStatus==="saved"?"✓":""}</div>    </div>  );  const doLogin = () => {
    const users = getUsers();
    const user = users.find(u => u.username.toLowerCase() === loginUser.toLowerCase() && u.password === loginPass);
    if(user){setLoggedIn(true);setCurrentUser({...user});setLoginErr(false);}
    else{setLoginErr(true);setLoginPass("");}
  };
  const sendResetCode = () => {
    const users = getUsers();
    const user = users.find(u => u.email && u.email.toLowerCase() === resetEmail.toLowerCase());
    if(!user){ setResetMsg("❌ Bu e-posta ile kayıtlı kullanıcı bulunamadı!"); return; }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setResetCodeSent(code);
    setResetStep(2);
    setResetMsg("✓ Kod gönderildi: " + code + " (Test modu - not edin)");
  };
  const verifyResetCode = () => {
    if(resetCode === resetCodeSent){ setResetStep(3); setResetMsg(""); }
    else{ setResetMsg("❌ Yanlış kod!"); }
  };
  const doResetPass = () => {
    if(resetNewPass.length < 4){ setResetMsg("❌ Şifre en az 4 karakter olmalı!"); return; }
    const users = getUsers();
    const updated = users.map(u => u.email && u.email.toLowerCase() === resetEmail.toLowerCase() ? {...u, password:resetNewPass} : u);
    saveUsers(updated);
    setResetMsg("✓ Şifre başarıyla değiştirildi!");
    setTimeout(()=>{ setShowReset(false); setResetStep(1); setResetEmail(""); setResetCode(""); setResetNewPass(""); setResetCodeSent(""); setResetMsg(""); }, 2000);
  };
  const saveProfile = () => {
    const users = getUsers();
    const updated = users.map(u => {
      if(u.username === currentUser.username) {
        if(profileOldPass && profileOldPass !== u.password){ setProfileMsg("❌ Mevcut şifre yanlış!"); return u; }
        const newU = {...u, username: profileName||u.username, email: profileEmail||u.email};
        if(profileNewPass) newU.password = profileNewPass;
        setCurrentUser(newU);
        setProfileMsg("✓ Profil kaydedildi!");
        return newU;
      }
      return u;
    });
    saveUsers(updated);
    setTimeout(()=>setProfileMsg(""), 2000);
  };
  if(!loggedIn) return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#1a3a6b 0%,#0d2144 50%,#1a3a6b 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",fontFamily:"Tahoma,sans-serif",position:"relative"}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" style={{marginBottom:12}}>
            <circle cx="45" cy="45" r="44" fill="none" stroke="#c8a84b" strokeWidth="2"/>
            <polygon points="45,12 22,32 68,32" fill="#c8a84b"/>
            <rect x="26" y="32" width="38" height="32" fill="#2255aa"/>
            <rect x="32" y="36" width="8" height="7" fill="#a8c4e8" rx="1"/>
            <rect x="50" y="36" width="8" height="7" fill="#a8c4e8" rx="1"/>
            <rect x="32" y="48" width="8" height="7" fill="#a8c4e8" rx="1"/>
            <rect x="50" y="48" width="8" height="7" fill="#a8c4e8" rx="1"/>
            <rect x="38" y="55" width="14" height="9" fill="#c8a84b" rx="1"/>
            <rect x="20" y="63" width="50" height="3" fill="#c8a84b" rx="1"/>
          </svg>
          <div style={{fontSize:30,fontWeight:"bold",color:"#c8a84b",letterSpacing:4,lineHeight:1}}>ZIN</div>
          <div style={{fontSize:12,color:"rgba(200,168,75,0.7)",letterSpacing:6,marginTop:4}}>VERWALTUNG</div>
          <div style={{width:120,height:1.5,background:"#c8a84b",margin:"10px auto"}}/>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",letterSpacing:2}}>IMMOBILIEN MANAGEMENT</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(200,168,75,0.25)",borderRadius:14,padding:"2rem"}}>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",textAlign:"center",marginBottom:"1.5rem",fontWeight:"bold",letterSpacing:1}}>ANMELDUNG</div>
          <div style={{marginBottom:"1rem"}}>
            <div style={{fontSize:10,color:"#c8a84b",letterSpacing:1,marginBottom:6}}>BENUTZERNAME</div>
            <input value={loginUser} onChange={e=>setLoginUser(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="Benutzername eingeben..." style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:8,padding:"11px 14px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Tahoma"}}/>
          </div>
          <div style={{marginBottom:"1.5rem"}}>
            <div style={{fontSize:10,color:"#c8a84b",letterSpacing:1,marginBottom:6}}>PASSWORT</div>
            <input type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="••••••••" style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:8,padding:"11px 14px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Tahoma"}}/>
          </div>
          {loginErr&&<div style={{background:"rgba(200,0,0,0.2)",border:"1px solid rgba(200,0,0,0.4)",borderRadius:6,padding:"8px 12px",color:"#ff8888",fontSize:12,marginBottom:"1rem",textAlign:"center"}}>❌ Falscher Benutzername oder Passwort!</div>}
          <button onClick={doLogin} style={{width:"100%",background:"linear-gradient(135deg,#c8a84b,#e8c86b)",borderRadius:8,padding:13,textAlign:"center",fontSize:14,fontWeight:"bold",color:"#1a3a6b",letterSpacing:2,cursor:"pointer",border:"none",fontFamily:"Tahoma"}}>EINLOGGEN / GİRİŞ</button>
          <div style={{textAlign:"center",marginTop:14}}>
            <button onClick={()=>{setShowReset(true);setResetStep(1);setResetMsg("");}} style={{background:"none",border:"none",color:"rgba(200,168,75,0.6)",fontSize:11,cursor:"pointer",fontFamily:"Tahoma",textDecoration:"underline",letterSpacing:1}}>Passwort vergessen?</button>
          </div>
        </div>
      {/* Reset Password Modal */}
      {showReset&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"1rem"}}>
        <div style={{background:"#0d2144",border:"1px solid rgba(200,168,75,0.3)",borderRadius:14,padding:"2rem",width:"100%",maxWidth:360}}>
          <div style={{color:"#c8a84b",fontWeight:"bold",fontSize:14,marginBottom:"1.5rem",textAlign:"center",letterSpacing:1}}>🔑 PASSWORT ZURÜCKSETZEN</div>
          {resetStep===1&&<>
            <div style={{fontSize:10,color:"#c8a84b",letterSpacing:1,marginBottom:6}}>E-MAIL ADRESSE</div>
            <input value={resetEmail} onChange={e=>setResetEmail(e.target.value)} placeholder="E-Mail eingeben..." style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:8,padding:"10px 14px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Tahoma",marginBottom:12}}/>
            <button onClick={sendResetCode} style={{width:"100%",background:"linear-gradient(135deg,#c8a84b,#e8c86b)",borderRadius:8,padding:11,fontSize:13,fontWeight:"bold",color:"#1a3a6b",border:"none",cursor:"pointer",fontFamily:"Tahoma"}}>CODE SENDEN</button>
          </>}
          {resetStep===2&&<>
            <div style={{fontSize:10,color:"#c8a84b",letterSpacing:1,marginBottom:6}}>BESTÄTIGUNGSCODE</div>
            <input value={resetCode} onChange={e=>setResetCode(e.target.value)} placeholder="6-stelligen Code eingeben..." style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:8,padding:"10px 14px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Tahoma",marginBottom:12}}/>
            <button onClick={verifyResetCode} style={{width:"100%",background:"linear-gradient(135deg,#c8a84b,#e8c86b)",borderRadius:8,padding:11,fontSize:13,fontWeight:"bold",color:"#1a3a6b",border:"none",cursor:"pointer",fontFamily:"Tahoma"}}>BESTÄTIGEN</button>
          </>}
          {resetStep===3&&<>
            <div style={{fontSize:10,color:"#c8a84b",letterSpacing:1,marginBottom:6}}>NEUES PASSWORT</div>
            <input type="password" value={resetNewPass} onChange={e=>setResetNewPass(e.target.value)} placeholder="Neues Passwort..." style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:8,padding:"10px 14px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Tahoma",marginBottom:12}}/>
            <button onClick={doResetPass} style={{width:"100%",background:"linear-gradient(135deg,#c8a84b,#e8c86b)",borderRadius:8,padding:11,fontSize:13,fontWeight:"bold",color:"#1a3a6b",border:"none",cursor:"pointer",fontFamily:"Tahoma"}}>PASSWORT SPEICHERN</button>
          </>}
          {resetMsg&&<div style={{marginTop:10,padding:"8px 12px",borderRadius:6,background:resetMsg.startsWith("✓")?"rgba(0,150,0,0.2)":"rgba(200,0,0,0.2)",color:resetMsg.startsWith("✓")?"#88ff88":"#ff8888",fontSize:12,textAlign:"center"}}>{resetMsg}</div>}
          <button onClick={()=>setShowReset(false)} style={{width:"100%",background:"none",border:"1px solid rgba(200,168,75,0.2)",borderRadius:8,padding:10,fontSize:12,color:"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"Tahoma",marginTop:10}}>Abbrechen</button>
        </div>
      </div>}
      </div>
      <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:1,whiteSpace:"nowrap"}}>© 2026 ZIN Verwaltungsprogramm</div>
      <div style={{position:"absolute",bottom:12,left:14,fontSize:9,color:"rgba(200,168,75,0.4)",fontFamily:"Tahoma",lineHeight:1.4,pointerEvents:"none"}}>
        <div style={{fontWeight:"bold"}}>🛠 Designed &amp; Developed by</div>
        <div>Hayrettin Erden — 2026</div>
      </div>
    </div>
  );
  return(    <div style={{fontFamily:"Tahoma,sans-serif",minHeight:"100vh",background:"#008080",display:"flex",flexDirection:"column",padding:"6px",boxSizing:"border-box"}}>      {showProfile&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,60,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:10}}>
        <div style={{...S.panel(),width:"100%",maxWidth:420,maxHeight:"90vh",overflowY:"auto"}}>
          <div style={S.tbar("linear-gradient(to right,#1a3a6b,#2255aa)")}><span>👤 Profil — {currentUser?.username}</span><button onClick={()=>setShowProfile(false)} style={S.btn({padding:"1px 5px",fontSize:10})}>✗</button></div>
          <div style={{padding:16}}>
            <IField label="BENUTZERNAME" value={profileName} onChange={setProfileName}/>
            <IField label="E-MAIL" value={profileEmail} onChange={setProfileEmail}/>
            <div style={{borderTop:"1px solid #ccc",marginTop:12,paddingTop:12}}>
              <div style={{fontSize:11,fontWeight:"bold",color:"#555",marginBottom:8}}>ŞİFRE DEĞİŞTİR:</div>
              <IField label="Mevcut Şifre" value={profileOldPass} onChange={setProfileOldPass}/>
              <IField label="Yeni Şifre" value={profileNewPass} onChange={setProfileNewPass}/>
            </div>
            {profileMsg&&<div style={{padding:"8px 12px",borderRadius:6,background:profileMsg.startsWith("✓")?"#d4ffd4":"#ffd4d4",color:profileMsg.startsWith("✓")?"#005500":"#cc0000",fontSize:12,marginBottom:10,textAlign:"center"}}>{profileMsg}</div>}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:12}}>
              <button onClick={saveProfile} style={S.btn({background:"#d4ffd4"})}>💾 Speichern</button>
              <button onClick={()=>setShowProfile(false)} style={S.btn()}>Schließen</button>
            </div>
          </div>
        </div>
      </div>}
      {confirm&&<ConfirmModal msg={confirm.msg} onYes={doConfirm} onNo={()=>setConfirm(null)}/>}      {modal==="pass"&&(<Modal title={passTarget?.startsWith("year:")?"🔒 Jahr "+passTarget.slice(5):"🔒 Passwort"} bg="linear-gradient(to right,#0a246a,#a6caf0)" onClose={()=>setModal(null)}>{passTarget?.startsWith("year:")&&
<div style={{fontSize:11,marginBottom:6,color:"#555"}}>Jahr {passTarget.slice(5)} ist gesperrt:</div>}<input type="password" value={passInput} onChange={e=>setPassInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&checkPass()} style={S.inp} autoFocus/>{passErr&&
<div style={{color:"#cc0000",fontSize:11,marginTop:3}}>❌ Falsches Passwort!</div>}<div style={{display:"flex",gap:6,justifyContent:"flex-end",marginTop:10}}><Btn onClick={checkPass}>OK</Btn><Btn onClick={()=>setModal(null)}>Abbrechen</Btn></div></Modal>)}      {modal==="exp"&&
(<Modal title={expEditId?"✏ Ausgabe bearbeiten":"✚ Neue Ausgabe"} bg={expEditId?"linear-gradient(to right,#6a0000,#cc0000)":"linear-gradient(to right,#006400,#009900)"} onClose={()=>setModal(null)} maxW={500}><IField label="BESCHREIBUNG" value={expDesc} onChange={setExpDesc}/><div style={{marginBottom:8}}><div style={{fontSize:11,fontWeight:"bold",marginBottom:4}}>BETRAG (€):</div><div style={{display:"flex",gap:0,alignItems:"stretch"}}><button onClick={()=>setExpIsNeg(v=>!v)} style={S.btn({padd
ing:"4px 12px",fontSize:14,fontWeight:"bold",background:expIsNeg?"#ffd0d0":"#d0ffd0",color:expIsNeg?"#cc0000":"#005500",borderRight:"none",minWidth:42,textAlign:"center"})}>{expIsNeg?"−":"+"}</button><input type="text" inputMode="decimal" placeholder="0.00" value={expAmount} onChange={e=>setExpAmount(e.target.value)} style={{...S.inp,flex:1}}/></div><div style={{marginTop:4,padding:"4px 8px",fontSize:10,background:expIsNeg?"#fff0f0":"#f0fff0",border:`1px solid ${expIsNeg?"#ffaaaa":"#aaddaa"}`,co
lor:expIsNeg?"#880000":"#006600"}}>{expIsNeg?"⬇ Kassenabgang / Bankeinzahlung":"⬆ Normale Ausgabe"}</div></div><div style={{marginBottom:6}}><div style={{fontSize:11,fontWeight:"bold",marginBottom:2}}>KATEGORIE:</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{privCats.map(c=><button key={c} onClick={()=>setExpCat(c)} style={S.btn({padding:"2px 8px",fontSize:10,background:expCat===c?"#a0c0ff":BP,outline:expCat===c?"2px solid #0a246a":"none"})}>{c}</button>)}</div></div><div style={{marg
inBottom:10}}><div style={{fontSize:11,fontWeight:"bold",marginBottom:4}}>GEBÄUDE:</div><div style={S.inset({padding:4})}><BldCheckboxList buildings={buildings} selected={expBlds} onChange={setExpBlds}/></div></div><div style={{display:"flex",gap:6,justifyContent:"flex-end"}}><Btn onClick={saveExp} style={{background:"#d4ffd4"}}>{expEditId?"Speichern":"Hinzufügen"}</Btn><Btn onClick={()=>setModal(null)}>Abbrechen</Btn></div></Modal>)}      {modal==="receipt"&&rcData&&
(<Modal title={`🧾 Quittung Nr. ${rcData.no}`} onClose={()=>setModal(null)}><div style={S.inset({padding:10,marginBottom:8,background:"#eef3fa"})}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:6}}>{[["Mieter",rcData.tenant.name],["Wohnung",rcData.tenant.apartment],["Zeitraum",`${months[rcData.month]} ${year}`],["Nr.",rcData.no]].map(([l,v])=>(<div key={l}><div style={{fontSize:9,color:"#888"}}>{l}:</div><div style={{fontSize:11,fontWeight:"bold"}}>{v}</div></div>))}
</div><div style={{background:"#c8d8ee",padding:"6px 8px",textAlign:"center",border:"1px solid #99b3cc"}}><div style={{fontSize:9,color:"#444"}}>Gesamt EUR</div><div style={{fontSize:20,fontWeight:"bold",color:"#0a246a"}}>{fmt(rcData.paid??rcData.tenant.rent)} €</div><div style={{fontSize:9,color:"#555"}}>{numToWords(rcData.paid??rcData.tenant.rent)}</div></div>{rcData.paid&&rcData.paid<rcData.tenant.rent&&
(<div style={{background:"#fff3a0",padding:"3px 6px",marginTop:4,fontSize:9,color:"#7a5800",fontWeight:"bold",textAlign:"center"}}>Teilzahlung — Offen: {fmt(rcData.tenant.rent-rcData.paid)} €</div>)}</div><div style={{display:"flex",gap:6,justifyContent:"flex-end"}}><Btn onClick={printReceipt} style={{background:"#c8d8ee"}}>🖨 Drucken A4</Btn><Btn onClick={()=>{const{tenant:t,building:b,month:mi,no,paid:pa}=rcData;const html=makeQuittungHTML(t,b,mi,year,no,pa??t.rent,pa!==null&&pa!==undefined&&
pa<t.rent);const blob=new Blob(['\ufeff',html],{type:'application/msword'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Quittung_'+no+'.doc';a.click();}} style={{background:"#1a5276",color:"#fff"}}>📄 Word</Btn><Btn onClick={()=>setModal(null)}>Schließen</Btn></div></Modal>)}      {modal==="edit_bld"&&editBld&&
(<Modal title={`✏ ${editBld.name}`} bg="linear-gradient(to right,#006400,#009900)" onClose={()=>setModal(null)} maxW={560}><IField label="GEBÄUDENAME" value={editBld.name} onChange={v=>setEditBld(b=>({...b,name:v}))}/><IField label="ADRESSE" value={editBld.address} onChange={v=>setEditBld(b=>({...b,address:v}))}/><div style={{fontSize:11,fontWeight:"bold",marginBottom:4}}>MIETER:</div>{editBld.tenants.map(t=>(<div key={t.id} style={S.panel({padding:6,marginBottom:4})}><div style={{display:"grid"
,gridTemplateColumns:"1fr 1fr 70px 24px",gap:4,marginBottom:3}}><IField value={t.name} onChange={v=>setEditBld(b=>({...b,tenants:b.tenants.map(x=>x.id===t.id?{...x,name:v}:x)}))} placeholder="Name"/><IField value={t.apartment} onChange={v=>setEditBld(b=>({...b,tenants:b.tenants.map(x=>x.id===t.id?{...x,apartment:v}:x)}))} placeholder="Wohnung"/><IField value={String(t.rent)} onChange={v=>setEditBld(b=>({...b,tenants:b.tenants.map(x=>x.id===t.id?{...x,rent:parseFloat(v)||
0}:x)}))} placeholder="€"/><button onClick={()=>askConfirm(`"${t.name}" löschen?`,()=>setEditBld(b=>({...b,tenants:b.tenants.filter(x=>x.id!==t.id)})))} style={S.btn({color:"#cc0000",padding:"1px 3px",fontSize:10,alignSelf:"start",marginTop:14})}>✗</button></div><IField value={t.phone||""} onChange={v=>setEditBld(b=>({...b,tenants:b.tenants.map(x=>x.id===t.id?{...x,phone:v}:x)}))} placeholder="📞 Telefon"/></div>))}<Btn onClick={()=>setEditBld(b=>({...b,tenants:[...b.tenants,{
id:String(Date.now()),name:"Neuer Mieter",apartment:"EG",rent:500,phone:""}]}))} style={{background:"#d4ffd4",marginBottom:8}}>+ Mieter</Btn><div style={{display:"flex",gap:6,justifyContent:"flex-end"}}><Btn onClick={saveEditBld} style={{background:"#d4ffd4"}}>💾 Speichern</Btn><Btn onClick={()=>setModal(null)}>Abbrechen</Btn></div></Modal>)}      {modal==="mahn"&&mahnData&&
(<Modal title={`📋 Mahnung — ${mahnData.t.name}`} bg="linear-gradient(to right,#6a0000,#cc0000)" onClose={()=>setModal(null)} maxW={520}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:8}}>{[1,2,3].map(l=>(<button key={l} onClick={()=>{setMahnLevel(l);setMahnText(defMahn(mahnData.t,mahnData.b,l,year,mahnMonth));
}} style={S.btn({background:mahnLevel===l?"#ffd0a0":BP,padding:"3px 0",width:"100%"})}>{l}. Mahnung</button>))}</div><div style={{marginBottom:6}}><div style={{fontSize:11,fontWeight:"bold",marginBottom:2}}>MONAT:</div><select value={mahnMonth} onChange={e=>{const m=parseInt(e.target.value);setMahnMonth(m);setMahnText(defMahn(mahnData.t,mahnData.b,mahnLevel,year,m));
}} style={S.inp}>{months.map((m,i)=><option key={i} value={i}>{m}</option>)}</select></div><textarea value={mahnText} onChange={e=>setMahnText(e.target.value)} style={{...S.ta,minHeight:160}}/><div style={{display:"flex",gap:6,justifyContent:"flex-end",marginTop:8}}><Btn onClick={printMahn} style={{background:"#ffd0a0"}}>🖨 Drucken</Btn><Btn onClick={()=>{const{t,b}=mahnData,lv=mahnLevel,mo=mahnMonth;const lc=lv===1?"#b8860b":lv===2?"#cc5500":"#cc0000";const lt=lv===1?"1. Mahnung":lv===2?"2. Mahn
ung":"3. Mahnung (Letzte)";const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0}body{font-family:Arial,sans-serif;padding:50px 60px;font-size:14px;line-height:1.7}.s{margin-bottom:28px}.r{margin-bottom:28px}.subj{font-weight:bold;font-size:15px;color:${lc};padding:8px 12px;border-left:4px solid ${lc};background:#fafafa;margin-bottom:22px}.body{white-space:pre-line;margin-bottom:30px}.sig{margin-top:40px}</style></head><body><div class="s"><strong>${OWNER.name}
</strong><br>${OWNER.street}<br>${OWNER.city}<br>${new Date().toLocaleDateString("de-DE")}</div><div class="r"><strong>${t.name}</strong><br>${t.apartment}<br>${b.address}</div><div class="subj">Betreff: ${lt} — Miete ${months[mo]} ${year}</div><div class="body">${mahnText}</div><div class="sig">Mit freundlichen Grüßen<br><br><strong>${OWNER.name}</strong><br>${OWNER.street}<br>${OWNER.city}<br>${OWNER.tel1} / ${OWNER.tel2}</div></body></html>`;const blob=new Blob(["﻿",html],{
type:"application/msword"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Mahnung_"+t.name.replace(/ /g,"_")+".doc";a.click();}} style={S.btn({background:"#1a5276",color:"#fff"})}>📄 Word</Btn><Btn onClick={()=>setModal(null)}>Schließen</Btn></div></Modal>)}      <div style={{...S.panel(),flex:1,display:"flex",flexDirection:"column",margin:0,borderRadius:3}}>        {page==="home"&&
(          <div style={{flex:1,display:"flex",flexDirection:"column",background:BG}}>            <div style={{background:BP,borderBottom:"2px solid #888",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",userSelect:"none"}}>
              <ErdenLogo/>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{fontSize:9,color:saveStatus==="saving"?"#aa6600":saveStatus==="saved"?"#005500":"#888",fontFamily:"Tahoma",textAlign:"right"}}>
                  {saveStatus==="saving"?"💾...":saveStatus==="saved"?"✓":""}
                </div>
                <button onClick={()=>{setProfileName(currentUser?.username||"");setProfileEmail(currentUser?.email||"");setProfileOldPass("");setProfileNewPass("");setProfileMsg("");setShowProfile(true);}} style={{...S.btn({fontSize:10,padding:"3px 10px"}),background:"linear-gradient(135deg,#c8a84b,#e8c86b)",color:"#1a3a6b",fontWeight:"bold"}}>👤 {currentUser?.username||"Profil"}</button>
              </div>
            </div>            </div>            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>              <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",maxWidth:400}}>                {[                  {key:"buildings",icon:"🏠",title:"Mieterverwaltung",sub:"Mieterverwaltung"Sub,bg:S.tbar()},
                  {key:"neben",icon:"📋",title:"Nebenkostenabrechnung",sub:"Betriebskosten · Heizung · Wasser · Strom",bg:S.tbar("linear-gradient(to right,#1a4a1a,#3a8a3a)")},                  {key:"steuer",icon:"📊",title:"Einkommensteuererklärung",sub:"Einnahmen · Ausgaben · Steuerübersicht",bg:S.tbar("linear-gradient(to right,#4a3000,#8a6010)")},                  {key:"vertraege",icon:"📄",title:"Mietverträge",sub:"Mietverträge"Sub,bg:S.tbar("linear-gradient(to right,#4a004a,#8a208a)")},
                ].map(item=>(                  <button key={item.key} onClick={()=>setPage(item.key)}                    style={{...item.bg,padding:"14px 18px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14,border:"2px solid",borderTopColor:"#fff",borderLeftColor:"#fff",borderRightColor:"#444",borderBottomColor:"#444"}}>                    <span style={{fontSize:24}}>{item.icon}</span>                    <div style={{flex:1}}><div style={{fontSize:14,fontWeight:"bold
"}}>{item.title}</div><div style={{fontSize:10,opacity:0.8,marginTop:1}}>{item.sub}</div></div>                    <span style={{fontSize:14,opacity:0.7}}>▶</span>                  </button>                ))}                <div style={{textAlign:"center",fontSize:10,color:"#666",marginTop:4,fontFamily:"Tahoma,sans-serif"}}>{OWNER.street} · {OWNER.city} · {OWNER.tel1} · {OWNER.tel2}</div>              </div>            </div>          </div>        )}        {page==="neben"&&
<NebenkostenPage onBack={()=>setPage("home")}/>}
        {page==="vertraege"&&<MietvertraegeSeite onBack={()=>setPage("home")} buildings={buildings}/>}        {page==="steuer"&&(          <div style={{flex:1,display:"flex",flexDirection:"column"}}>            <TopBar title="📊 Einkommensteuererklärung"/>            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:BG}}>              <div style={S.panel({padding:"24px 32px",textAlign:"center",maxWidth:420})}>                <div style={{fontSize:28,marginB
ottom:8}}>📊</div>                <div style={{fontSize:14,fontWeight:"bold",marginBottom:6}}>Einkommensteuererklärung</div>                <div style={S.inset({padding:10,textAlign:"left",marginTop:10})}>                  <div style={{fontSize:11,fontWeight:"bold",marginBottom:6}}>Vorschau {year}</div>                  {[["Gesamtmieteinnahmen",totalCash,"#005500"],["Ausgaben",totalExp,"#cc0000"],["Netto",netBal,netBal>=0?"#005500":"#cc0000"]].map(([l,v,c],i)=>(                    <div key={l} st
yle={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0",borderTop:i===2?"1px solid #888":"none",fontWeight:i===2?"bold":"normal"}}>                      <span>{l}:</span><span style={{color:c}}>{i===1?"−":"+"} {fmt(v)} €</span>                    </div>                  ))}                </div>              </div>            </div>          </div>        )}        {page==="buildings"&&
(          <>            <TopBar title={`🏠 Mieterverwaltung — ${year}`}/>            <div style={{background:BP,padding:"4px 8px",borderBottom:"1px solid #aaa",display:"flex",gap:3,alignItems:"center",flexWrap:"wrap"}}>              <span style={{fontSize:11,fontWeight:"bold",color:"#555"}}>Jahr:</span>              {YEARS.map(y=><YearBtn key={y} y={y}/>)}              <div style={{width:1,background:"#aaa",height:16,margin:"0 3px"}}/>              <button onClick={()=>openPass("privat")} style=
{S.btn({background:"#ffd0d0",fontSize:11})}>💸 Privat</button>
                            <div style={{flex:1}}/>              <div style={S.panel({padding:"2px 8px",textAlign:"right"})}>                <div style={{fontSize:9,color:"#555"}}>💰 KASSE {year}</div>                <div style={{fontSize:13,fontWeight:"bold",color:netBal>=0?"#005500":"#cc0000"}}>{fmt(netBal)} €</div>                <div style={{fontSize:8,color:"#777"}}>+{fmt(totalCash)} / −{fmt(totalExp)} €</div>              </div>            </div>            <div style={{flex:1,padding:10,ov
erflowY:"auto",background:BG}}>              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:7,maxWidth:960,margin:"0 auto"}}>                {buildings.map(b=>{const cash=b.tenants.reduce((s,t)=>s+tenCashCollected(b.id,t.id,t.rent),0);const debt=getBldDebt(b);const allPaid=debt===0;const mo=b.tenants.reduce((s,t)=>s+t.rent,0);
return(<div key={b.id} style={S.panel({padding:"7px 9px",background:allPaid?"#e8ffe8":BP,outline:allPaid?"2px solid #00aa00":"none"})}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}><div><div style={{fontSize:12,fontWeight:"bold",color:allPaid?"#005500":"#0a246a"}}>{b.name}</div><div style={{fontSize:10,color:"#666"}}>{b.tenants.length} Mieter · {fmt(mo)} €/Mo</div></div><button onClick={()=>openPass(`edit:${b.id}`)} style={S.btn({padding:"1px
 4px",fontSize:9,background:"#d4ffd4"})}>✏</button></div><div style={S.inset({padding:"2px 6px",marginBottom:4,display:"flex",justifyContent:"space-between"})}><span style={{fontSize:11,fontWeight:"bold",color:"#005500"}}>+{fmt(cash)} €</span>{allPaid?<span style={{fontSize:10,color:"#005500",fontWeight:"bold"}}>✓ OK</span>:<span style={{fontSize:10,color:"#cc0000",fontWeight:"bold"}}>✗ {fmt(debt)} €</span>}</div><button onClick={()=>{setSelBld(b);setPage("tenants");
}} style={S.btn({width:"100%",padding:"3px 0",fontSize:11,textAlign:"center"})}>Mieter →</button></div>);})}              </div>            </div>            <div style={{background:BP,borderTop:"1px solid #aaa",padding:"2px 8px",display:"flex",gap:4,fontSize:11}}>              <div style={S.inset({padding:"1px 5px"})}>Jahr: {year}</div>              <div style={S.inset({padding:"1px 5px",color:"#005500"})}>+{fmt(totalCash)} €</div>              <div style={S.inset({padding:"1px 5px",color:"#cc0
000"})}>−{fmt(totalExp)} €</div>              <div style={S.inset({padding:"1px 5px",fontWeight:"bold",color:netBal>=0?"#005500":"#cc0000"})}>Netto: {fmt(netBal)} €</div>            </div>          </>        )}        {page==="privat"&&
(          <>            <TopBar title="💸 Privatausgaben"/>            <div style={{background:BP,padding:"4px 8px",borderBottom:"1px solid #aaa",display:"flex",gap:4,alignItems:"center"}}>              <button onClick={()=>setPage("buildings")} style={S.btn()}>← Zurück</button>              <button onClick={openAddExp} style={S.btn({background:"#d4ffd4"})}>+ Neue Ausgabe</button>              <div style={{flex:1}}/>              <div style={S.inset({padding:"2px 8px",fontSize:12,fontWeight:"bol
d",color:netBal>=0?"#005500":"#cc0000"})}>Kasse: {fmt(netBal)} €</div>            </div>            <div style={{flex:1,padding:10,overflowY:"auto",background:BG}}>              {expenses.length===0&&<div style={S.inset({padding:16,textAlign:"center",color:"#888"})}>Keine Ausgaben.</div>}              <div style={{display:"flex",flexDirection:"column",gap:5,maxWidth:760,margin:"0 auto"}}>                {expenses.map(e=>{const isNeg=e.amount<0;return(<div key={e.id} style={S.panel({padding:"5px 
8px",display:"flex",justifyContent:"space-between",alignItems:"center",background:isNeg?"#f0fff4":BP,outline:isNeg?"1.5px solid #66cc88":"none"})}><div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:13,fontWeight:"bold",color:isNeg?"#005500":"#cc0000"}}>{isNeg?"⬇":"⬆"}</span><span style={{fontWeight:"bold",fontSize:11}}>{e.desc}</span></div><div style={{fontSize:10,color:"#666"}}>{e.category} · {e.building} · {e.date}</div></div><div st
yle={{display:"flex",gap:3,alignItems:"center",marginLeft:6}}><div style={S.inset({padding:"2px 7px",fontWeight:"bold",color:isNeg?"#005500":"#cc0000",whiteSpace:"nowrap"})}>{isNeg?"+":"-"}{fmt(Math.abs(e.amount))} €</div><button onClick={()=>openEditExp(e)} style={S.btn({background:"#d0d4ff",fontSize:10})}>✏</button><button onClick={()=>askConfirm(`"${e.desc}" löschen?`,()=>setExpenses(p=>p.filter(x=>x.id!==e.id)))} style={S.btn({color:"#cc0000",fontSize:10})}>✗</button></div></div>);
})}              </div>            </div>          </>        )}        {page==="tenants"&&selBld&&(()=>{          const b=selBld;const tc=b.tenants.reduce((s,t)=>s+tenCashCollected(b.id,t.id,t.rent),0);const bDebt=getBldDebt(b);
          return(<>            <TopBar title={`🏠 ${b.name} — ${year}`}/>            <div style={{background:BP,padding:"4px 8px",borderBottom:"1px solid #aaa",display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>              <button onClick={()=>safeSetPage("buildings")} style={S.btn()}>← Gebäude</button>              <button onClick={()=>openPass(`edit:${b.id}`)} style={S.btn({background:"#d4ffd4",fontSize:10})}>✏ Bearbeiten</button>              <div style={{flex:1}}/>              <div
 style={S.inset({padding:"2px 6px",fontSize:11,color:"#005500",fontWeight:"bold"})}>+{fmt(tc)} €</div>              {bDebt>0&&<div style={S.inset({padding:"2px 6px",fontSize:11,color:"#cc0000",fontWeight:"bold"})}>Offen: {fmt(bDebt)} €</div>}            </div>            <div style={{flex:1,overflowY:"auto",background:BG,padding:"8px 10px"}}>              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>                <div style={{flexShrink:0}}>                  <BuildingFloorPlan 
building={b} payments={allPay} year={year} onSelectTenant={tid=>{setSelTenId(tid);document.getElementById(`ten-${tid}`)?.scrollIntoView({behavior:"smooth",block:"center"});}} curMonth={curMonth} selectedId={selTenId}/>                  <div style={{marginTop:4,display:"flex",gap:4}}>{[["#b8f0b8","✓"],["#ffb8b8","✗"]].map(([c,l])=>(<div key={l} style={{display:"flex",alignItems:"center",gap:2,fontSize:9}}><div style={{width:9,height:9,background:c,border:"1px solid #888"}}/><span>{l}</span></div>
))}</div>                </div>                <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:5}}>                  {b.tenants.map(t=>{                    const debt=getTenDebt(b.id,t.id,t.rent);const cash=tenCashCollected(b.id,t.id,t.rent);const unpaid=months.filter((_,i)=>i<=curMonth&&
getP(b.id,t.id,i).status==="unpaid").length;                    const isTenSel=selTenId===t.id;return(<div id={`ten-${t.id}`} key={t.id} onClick={()=>setSelTenId(t.id)} style={{...S.panel({overflow:"hidden"}),outline:isTenSel?"3px solid #008b8b":"none",cursor:"pointer"}}>                      <div style={{display:"flex",alignItems:"center",gap:6,padding:"3px 8px",background:isTenSel?"#40e0d0":BP,borderBottom:"1px solid #ccc"}}>                        <div style={{flex:1,minWidth:0}}><span style=
{{fontSize:12,fontWeight:"bold",color:"#0a246a"}}>{t.name}</span><span style={{fontSize:10,color:"#666",marginLeft:5}}>{t.apartment} · {fmt(t.rent)} €/Mo</span>{t.phone&&<span style={{fontSize:10,color:"#0055aa",marginLeft:5}}>📞 {t.phone}</span>}</div>                        <span style={{fontSize:11,fontWeight:"bold",color:"#005500",flexShrink:0}}>+{fmt(cash)} €</span>                        {debt>0?<span style={{fontSize:10,fontWeight:"bold",color:"#cc0000",flexShrink:0}}>✗ {fmt(debt)} €</span
>:<span style={{fontSize:10,color:"#005500",flexShrink:0}}>✓</span>}                        {unpaid>0&&[1,2,3].map(l=>(<button key={l} onClick={()=>openMahn(t,b,l)} style={S.btn({background:l===1?"#fff3a0":l===2?"#ffd8a0":"#ffa0a0",fontSize:8,padding:"1px 5px"})}>M{l}</button>))}                      </div>                      <div style={{padding:"4px 8px",display:"flex",gap:4,flexWrap:"nowrap",overflowX:"auto",justifyContent:"space-between"}}>                        {months.map((m,i)=>(<Month
Card key={i} m={m} i={i} bid={b.id} tid={t.id} rent={t.rent} yp={yp} curMonth={curMonth} showPartial={showPartial} setShowPartial={setShowPartial} bookCashF={bookCashF} bookBank={bookBank} bookCashP={bookCashP} cancelP={cancelP} openReceipt={(mi)=>openReceipt(t,b,mi)} tName={t.name}/>))}                      </div>                    </div>);                  })}                </div>              </div>            </div>          </>);        })()}      </div>
      <button onClick={()=>{if(window.confirm("Çıkış yapmak istiyor musunuz?")){setLoggedIn(false);setCurrentUser(null);setLoginUser("");setLoginPass("");setPage("home");}}} style={{position:"fixed",bottom:12,left:12,zIndex:1001,background:"linear-gradient(135deg,#1a3a6b,#2255aa)",color:"#fff",border:"2px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"7px 14px",fontSize:11,fontWeight:"bold",cursor:"pointer",boxShadow:"0 3px 10px rgba(0,0,0,0.35)",fontFamily:"Tahoma,sans-serif",display:"fl
ex",alignItems:"center",gap:6,letterSpacing:0.5}} title="Çıkış"><span style={{fontSize:15}}>⏻</span> Çıkış</button>
      {hasUnsaved&&<button onClick={manualSave} style={{position:"fixed",bottom:10,left:"50%",transform:"translateX(-50%)",zIndex:1001,background:saveStatus==="saving"?"linear-gradient(135deg,#888,#aaa)":"linear-gradient(135deg,#005500,#00aa00)",color:"#fff",border:"none",borderRadius:24,padding:"10px 28px",fontSize:13,fontWeight:"bold",cursor:"pointer",boxShadow:"0 3px 10px rgba(0,0,0,0.4)",fontFamily:"Tahoma",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap"}}>{saveStatus==="saving"
?"⏳ Kaydediliyor...":"💾 Speichern / Kaydet"}</button>}    </div>  );}