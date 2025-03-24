let orders = []; // Array to store ordered items
let inventory = []; // Array to store inventory items
let feedbacks = []; // Array to store customer feedback
let totalSales = 0; // Track total sales

// Order Management
document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = document.getElementById('order-item').value;
    const quantity = parseInt(document.getElementById('order-quantity').value);

    const itemInInventory = inventory.find(inv => inv.item === item);
    if (!itemInInventory) {
        document.getElementById('order-message').innerText = 'Food item is not available.';
        return;
    }

    const costPerItem = itemInInventory.cost;
    const totalCost = costPerItem * quantity;

    orders.push({ item, quantity, costPerItem, totalCost });
    totalSales += totalCost;
    updateOrderList();
    document.getElementById('order-message').innerText = `Order placed: ${item} (Quantity: ${quantity})`;
});

// Inventory Management
document.getElementById('inventory-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = document.getElementById('inventory-item').value;
    const quantity = parseInt(document.getElementById('inventory-quantity').value);
    const cost = parseFloat(document.getElementById('inventory-cost').value);

    inventory.push({ item, quantity, cost });
    addToInventoryList(item, quantity, cost);
    document.getElementById('inventory-message').innerText = `Item added: ${item} (Quantity: ${quantity}, Cost: ₹${cost.toFixed(2)})`;
});

// Generate Bill
document.getElementById('generate-bill').addEventListener('click', () => {
    const billList = document.getElementById('bill-list');
    billList.innerHTML = '';
    let totalBill = 0;

    orders.forEach(order => {
        const billItemDiv = document.createElement('div');
        billItemDiv.innerText = `${order.item} (Quantity: ${order.quantity}, Cost per Item: ₹${order.costPerItem.toFixed(2)}, Total: ₹${order.totalCost.toFixed(2)})`;
        billList.appendChild(billItemDiv);
        totalBill += order.totalCost;
    });

    document.getElementById('total-bill').innerText = `Total Bill: ₹${totalBill.toFixed(2)}`;
});

// Reporting Feature
document.getElementById('generate-report').addEventListener('click', () => {
    const reportOutput = document.getElementById('report-output');
    reportOutput.innerHTML = '';
    reportOutput.style.color = 'black';

    if (orders.length === 0) {
        reportOutput.innerHTML = '<p>No orders have been placed yet.</p>';
        return;
    }

    let orderSummary = '<h3>Order Summary</h3><ul>';
    orders.forEach(order => {
        orderSummary += `<li>${order.item} - Quantity: ${order.quantity}, Total: ₹${order.totalCost.toFixed(2)}</li>`;
    });
    orderSummary += '</ul>';
    
    let inventorySummary = '<h3>Inventory Summary</h3><ul>';
    inventory.forEach(item => {
        inventorySummary += `<li>${item.item} - Quantity: ${item.quantity}, Cost per Item: ₹${item.cost.toFixed(2)}</li>`;
    });
    inventorySummary += '</ul>';

    reportOutput.innerHTML += orderSummary + inventorySummary + `<h3>Total Sales: ₹${totalSales.toFixed(2)}</h3>`;
});

// Customer Feedback
document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const customerName = document.getElementById('customer-name').value;
    const feedbackComment = document.getElementById('feedback-comment').value;

    feedbacks.push({ customerName, feedbackComment });
    updateFeedbackList();
    document.getElementById('feedback-form').reset();
});

function updateFeedbackList() {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';
    feedbacks.forEach(feedback => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.innerHTML = `<strong>${feedback.customerName}</strong>: ${feedback.feedbackComment}`;
        feedbackList.appendChild(feedbackDiv);
    });
}

// Sales Summary
document.getElementById('sales-timeframe').addEventListener('change', (e) => {
    const timeframe = e.target.value;
    let salesSummaryData = document.getElementById('sales-summary-data');
    salesSummaryData.innerHTML = `<p>Total sales ${timeframe}: ₹${totalSales.toFixed(2)}</p>`;
});

// User Authentication
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById('login-message').innerText = (username === 'admin' && password === 'admin') ? 'Login successful!' : 'Invalid username or password!';
});

// Helper Functions
function addToInventoryList(item, quantity, cost) {
    const inventoryList = document.getElementById('inventory-list');
    const itemDiv = document.createElement('div');
    itemDiv.innerText = `${item} (Quantity: ${quantity}, Cost: ₹${cost.toFixed(2)})`;
    inventoryList.appendChild(itemDiv);
}

function updateOrderList() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.innerText = `${order.item} (Quantity: ${order.quantity})`;
        orderList.appendChild(orderDiv);
    });
}

// Attendance Management
document.getElementById('attendance-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const workerId = document.getElementById('worker-id').value;
    const status = document.getElementById('attendance-status').value;

    if (!workerId || !status) {
        alert('Please fill in all fields');
        return;
    }

    const attendanceData = document.createElement('div');
    attendanceData.innerHTML = `<p>Worker ID: ${workerId} - Status: ${status}</p>`;
    document.getElementById('attendance-list').appendChild(attendanceData);
    document.getElementById('attendance-form').reset();
});
