function renderTable(container, columns, rows, options = {}) {
    if (!container) {
        return;
    }

    const emptyMessage = options.emptyMessage || "No records found";

    if (!rows.length) {
        container.innerHTML = `
            <div class="table-empty">
                <i data-lucide="inbox"></i>
                <p>${emptyMessage}</p>
            </div>
        `;

        if (window.lucide) {
            lucide.createIcons();
        }

        return;
    }

    const header = columns
        .map(column => `<th>${column.label}</th>`)
        .join("");

    const body = rows.map(row => {
        return `
            <tr>
                ${columns.map(column => {
                    const value = column.render
                        ? column.render(row)
                        : row[column.key] ?? "";

                    return `<td>${value}</td>`;
                }).join("")}
            </tr>
        `;
    }).join("");

    container.innerHTML = `
        <div class="table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>${header}</tr>
                </thead>
                <tbody>
                    ${body}
                </tbody>
            </table>
        </div>
    `;

    if (window.lucide) {
        lucide.createIcons();
    }
}

window.renderTable = renderTable;