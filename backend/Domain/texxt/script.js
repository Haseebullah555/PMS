function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Dummy JS to handle form submission and table rendering
function addRowToTable(tableId, rowData) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    const tr = document.createElement('tr');
    rowData.forEach(d => {
        const td = document.createElement('td');
        td.textContent = d;
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
}

// Example: Add supplier form
document.getElementById('supplierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('supplierName').value;
    const phone = document.getElementById('supplierPhone').value;
    const address = document.getElementById('supplierAddress').value;
    addRowToTable('suppliersTable', [Math.floor(Math.random()*1000), name, phone, address, 'Edit/Delete']);
    this.reset();
});

// Similar JS can be written for customers, stock, purchases, sales, partners
