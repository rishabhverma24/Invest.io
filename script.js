// Fetch and render company overview
fetch('http://localhost/backend_project/api/company_overview.php')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('company-overview');
        if (data.status === 'success') {
            container.innerHTML = `<h2>Overview</h2>${data.data.map(company => `
                <p><strong>${company.company_name}</strong></p>
                <p>${company.industry}</p>
                <p>${company.description}</p>
                <img src="${company.logo_url}" alt="Logo" width="100">
            `).join('')}`;
        } else {
            container.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    });

// Repeat similar logic for profit_loss, balance_sheet, and documents
function fetchData(endpoint, containerId, title) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            if (data.status === 'success') {
                container.innerHTML = `<h2>${title}</h2>${JSON.stringify(data.data, null, 2)}`;
            } else {
                container.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        });
}

// Fetch profit/loss, balance sheet, and documents
fetchData('http://localhost/backend_project/api/profit_loss.php?company_id=1', 'profit-loss', 'Profit & Loss');
fetchData('http://localhost/backend_project/api/balance_sheet.php?company_id=1', 'balance-sheet', 'Balance Sheet');
fetchData('http://localhost/backend_project/api/documents.php?company_id=1', 'documents', 'Documents');
