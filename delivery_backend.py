class Order:
    def __init__(self, order_id, customer_name, items):
        self.order_id = order_id
        self.customer_name = customer_name
        self.items = items
        self.status = "Pending"

class DeliveryApp:
    def __init__(self):
        self.orders = []

    def create_order(self, customer_name, items):
        order_id = len(self.orders) + 1
        order = Order(order_id, customer_name, items)
        self.orders.append(order)
        return order

    def get_order_status(self, order_id):
        for order in self.orders:
            if order.order_id == order_id:
                return order.status
        return "Order not found"

    def update_order_status(self, order_id, status):
        for order in self.orders:
            if order.order_id == order_id:
                order.status = status
                break

if __name__ == "__main__":
    delivery_app = DeliveryApp()

    while True:
        print("1. Create Order")
        print("2. Get Order Status")
        print("3. Update Order Status")
        print("4. Exit")
        
        choice = input("Enter your choice: ")

        if choice == "1":
            customer_name = input("Enter customer name: ")
            items = input("Enter items (comma-separated): ").split(",")
            order = delivery_app.create_order(customer_name, items)
            print(f"Order created with ID: {order.order_id}")

        elif choice == "2":
            order_id = int(input("Enter order ID: "))
            status = delivery_app.get_order_status(order_id)
            print(f"Order status: {status}")

        elif choice == "3":
            order_id = int(input("Enter order ID: "))
            status = input("Enter new status: ")
            delivery_app.update_order_status(order_id, status)
            print("Order status updated")

        elif choice == "4":
            print("Exiting...")
            break

        else:
            print("Invalid choice. Please try again.")
