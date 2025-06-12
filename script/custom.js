document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("#rag-leaderboard tbody");
    const rows = Array.from(table.rows);
    const divider = rows.find(r => r.cells[0]?.colSpan === 13);
    const dataRows = rows.filter(r => !r.cells[0]?.hasAttribute("colspan"));

    // Sort by last column
    dataRows.sort((a, b) =>
        (parseFloat(b.cells[11].textContent) || 0) -
        (parseFloat(a.cells[11].textContent) || 0)
    );

    // Rebuild table with divider after second row
    table.innerHTML = "";
    dataRows.forEach((row, i) => {
        table.appendChild(row);
        if (i === 1 && divider) table.appendChild(divider);
    });

    // Highlight max per column (cols 3–11, after divider)
    const dividerIndex = Array.from(table.rows).indexOf(divider);
    const rowsAfterDivider = Array.from(table.rows).slice(dividerIndex + 1);

    for (let col = 3; col <= 11; col++) {
        const max = Math.max(...rowsAfterDivider.map(r =>
            parseFloat(r.cells[col]?.textContent) || -Infinity
        ));

        rowsAfterDivider.forEach(r => {
            const cell = r.cells[col];
            if (cell && parseFloat(cell.textContent) === max) {
                cell.style.backgroundColor = "#ffe599";
                cell.style.fontWeight = "bold";
            }
        });
    }
});