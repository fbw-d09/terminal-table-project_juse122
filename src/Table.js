// wir schreiben ein programm zum anzeigen von tabelle in der konsole

// wir benötigen eine klasse, die die komplette applikation beinhaltet

// wir nennen die klasse table, da wir eine tabelle damit erstellen wollen, und das der sinnvollste name ist

// die klasse sollte ein konfigurationsobjekt in den constructor bekommen m um dynamisch einstellbar zu sein
// prperty die den namen der tabelle angibt, denn wir wollten diesen über der tabelle stehen haben
// property für breite der tabelle, default wert breite der konsole
// property für alle columns der tabelle und deren werte
// property für alle rows der tabelle

// getter und setter für alle property

// methoden für berechnungen

// methode, die titel anzeigt und dafür sorgt, dass dieser horizontal zentriert über der tabelle angezeigt wird
// methode zum neue spalte erstellen
// methode um eine neue zeile zu erstellen und spalten einfügen
// methode, um tabellen header zu erstellen, also die schlüssel über dem spalteninhalt
// methode, um einen divider zu erstellen
// methode, um die tabelle anzuzeigen

// klasse exportieren, um an die ínhalte zu kommen und das programm zu starten

class Table {

    tableTitle;
    tableWidth;
    tableColumns;
    tableRows;

    /**
     * @constructor
     */

    constructor({ title, width, columns, rows } = {}) {
        this.tableTitle = title || "Default Table";
        this.tableWidth = width || process.stdout.columns;
        this.tableColumns = columns || [];
        this.tableRows = rows || [];
    };

    get title() { return this.tableTitle };
    get width() { return this.tableWidth };
    get columns() { return this.tableColumns };
    get rows() { return this.tableRows };

    set title(input) { this.tableTitle = input };
    set width(input) { this.tableWidth = input };
    set columns(input) { this.tableColumns = input };
    set rows(input) { this.tableRows = input };

    /**
     * @method createTitle
     * @description Erstellt den über der Tabelle zentrierten Titel.
     * @returns { string }
     */

    createTitle = () => {
        const padding = Math.round((this.width - this.title.length) / 2);

        return `${ " ".repeat(padding) }${ this.title }${ " ".repeat(padding) }`;
    };

    /**
     * @method createColumn
     * @description Erstellt eine Spalte mit der angegebenen Breite sowie Text.
     * @param { string } text
     * @param { string } width
     * @returns { string }
     */

    createColumn = (text, width) => {
        const columnWidth = width - text.toString().length || 20;
        
        return ` ${ text }${ " ".repeat(columnWidth - 3) }|`
    };

    /**
     * @method createRow
     * @description Erstellt eine Zeile mit nacheinander dargestellten Spalten.
     * @param { object } rows
     * @returns { string }
     */

    createRow = (rows) => {
        let tempString = "|";

        for (let row in rows) {
            let width = this.width;

            this.columns.forEach((column, i) => {
                if (column.key === row) {
                    if (this.columns.length === i + 1) {
                        tempString += this.createColumn(rows[row], width + 2);
                    } else {
                        tempString += this.createColumn(rows[row], column.width);
                    };
                };

                width -= column.width;
            });
        };

        return tempString;
    };

    /**
     * @method createDivider
     * @description Erstellt eine Trennlinie mit den definierten Breiten der Spalten.
     * @returns { string }
     */

    createDivider = () => {
        let tempString = "|";
        let width = this.width;

        this.columns.forEach((column, i) => {
            if (this.columns.length === i +1) {
                tempString += "-".repeat(width) + "|";
            } else {
                tempString += "-".repeat(column.width - 2) + "|";
            };

            width -= column.width;
        });

        return tempString;
    };

    /**
     * @method createHeader
     * @description Erstellt eine Kopfzeile mit den jeweiligen Spaltenbezeichnungen.
     * @returns { string }
     */

    createHeader = () => {
        let tempString = "|";
        let width = this.width;

        this.columns.forEach((column, i) => {
            if (this.columns.length === i + 1) {
                tempString += this.createColumn(column.title, width + 2);
            } else {
                tempString += this.createColumn(column.title, column.width);
            }

            width -= column.width;
        });

        return tempString;
    };

    /**
     * @method showTable
     * @description Zeigt die gesamte Tabelle an.
     */

    showTable = () => {
        console.log(`\n${ "=".repeat(process.stdout.columns) }\n`)
        console.log(this.createTitle());
        console.log(this.createHeader());
        console.log(this.createDivider());
        this.rows.forEach((row) => {
            console.log(this.createRow(row));
        });
        console.log();
    };
};

module.exports = Table;
