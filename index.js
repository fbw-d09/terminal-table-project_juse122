const Table = require("./src/Table.js");

const columns = [
    {
        "key": "id",
        "title": "#",
        "width": 6,
    },
    {
        "key": "name",
        "title": "Name",
        "width": 10,
    },
    {
        "key": "group",
        "title": "Gruppe",
        "width": 15,
    },
    {
        "key": "role",
        "title": "Rolle",
        "width": 20,
    },
];

const rows = [
    {
        "id": 1,
        "name": "Jana",
        "group": "Klasse",
        "role": "Schüler",
    },
    {
        "id": 2,
        "name": "Paul",
        "group": "Management",
        "role": "Class Manager",
    },
    {
        "id": 3,
        "name": "Mandy",
        "group": "Klasse",
        "role": "Assistant Teacher",
    },
    {
        "id": 4,
        "name": "Ricky",
        "group": "Klasse",
        "role": "Main Teacher",
    },
];

const table = new Table({
    "title": "Table 01",
    "width": 100,
    columns,
    rows,
});

table.showTable();
