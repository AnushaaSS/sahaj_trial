const readline = require('readline');

class Order {
    constructor(orderId, customerName, items) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.items = items;
        this.status = 'Pending';
    }
}

class DeliveryApp {
    constructor() {
        this.orders = [];
        this.orderIdCounter = 1;
    }

    createOrder(customerName, items) {
        const order = new Order(this.orderIdCounter, customerName, items);
        this.orders.push(order);
        this.orderIdCounter++;
        return order;
    }

    getOrderStatus(orderId) {
        const order = this.orders.find(order => order.orderId === orderId);
        return order ? order.status : 'Order not found';
    }

    updateOrderStatus(orderId, status) {
        const order = this.orders.find(order => order.orderId === orderId);
        if (order) {
            order.status = status;
        }
    }
}

const deliveryApp = new DeliveryApp();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createOrderPrompt() {
    rl.question('Enter customer name: ', customerName => {
        rl.question('Enter items (comma-separated): ', items => {
            const itemList = items.split(',');
            const order = deliveryApp.createOrder(customerName, itemList);
            console.log(`Order created with ID: ${order.orderId}`);
            mainMenu();
        });
    });
}

function getOrderStatusPrompt() {
    rl.question('Enter order ID: ', orderId => {
        const status = deliveryApp.getOrderStatus(Number(orderId));
        console.log(`Order status: ${status}`);
        mainMenu();
    });
}

function updateOrderStatusPrompt() {
    rl.question('Enter order ID: ', orderId => {
        rl.question('Enter new status: ', status => {
            deliveryApp.updateOrderStatus(Number(orderId), status);
            console.log('Order status updated');
            mainMenu();
        });
    });
}

function mainMenu() {
    console.log('1. Create Order');
    console.log('2. Get Order Status');
    console.log('3. Update Order Status');
    console.log('4. Exit');

    rl.question('Enter your choice: ', choice => {
        switch (choice) {
            case '1':
                createOrderPrompt();
                break;
            case '2':
                getOrderStatusPrompt();
                break;
            case '3':
                updateOrderStatusPrompt();
                break;
            case '4':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                mainMenu();
        }
    });
}

mainMenu();
