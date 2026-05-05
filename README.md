# Restaurant Table Manager

Restaurant Table Manager is a client-side web application designed to simulate a real-time table and order management system for a restaurant. It allows staff to manage table availability, take customer orders from a dynamic menu, and process checkouts. All data is persisted locally in the user's browser using IndexedDB, making it a fast and offline-first capable solution.



## Features

-   **Table Management**: Add new tables, clear all tables, and view the status (Available/Occupied) of each table.
-   **Status Toggling**: Easily switch a table's status between "Available" and "Occupied".
-   **Order Placement**: Select a table and add items from the menu to its active order.
-   **Dynamic Menu**: The application populates with a default menu, and all items are stored in the local database.
-   **Live Checkout Panel**: View the current order for a selected table, including a list of items and a running total price.
-   **Order Finalization**: Complete the checkout process to clear the order and set the table's status back to "Available".
-   **Data Persistence**: Utilizes **Dexie.js**, a wrapper for IndexedDB, to store all table, menu, and order data persistently in the browser.

## Tech Stack

-   **Frontend**: HTML, CSS, Vanilla JavaScript (ES Modules)
-   **Database**: IndexedDB
-   **Library**: [Dexie.js](https://dexie.org/) (for simplifying IndexedDB operations)

## Architecture

The project is structured with a clear separation of concerns, following a layered architecture pattern:

-   **`dal` (Data Access Layer)**: This layer is responsible for all direct interactions with the IndexedDB database. It uses Dexie.js to perform CRUD (Create, Read, Update, Delete) operations on the `restaurantTables`, `menu`, and `orders` object stores.
-   **`dll` (Data Logic Layer)**: This layer acts as an intermediary between the UI logic and the DAL. It contains business logic, validation, and data processing rules before passing data to or from the database.
-   **`js` (UI and Application Logic)**: This layer handles DOM manipulation, event handling, and rendering.
    -   `app.js` is the main entry point that initializes the application and orchestrates the different modules.
    -   The `collections` directory contains modules that render lists of items (e.g., `tablesCollection`, `menuCollection`).
    -   The `items` directory contains modules for creating the individual DOM elements for each table, menu item, or order.

## Getting Started

To run this project locally, you need a web server to handle the ES Modules.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abod-ogc/Restaurant-Table-Manager.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd Restaurant-Table-Manager
    ```

3.  **Serve the application:**
    You can use any simple HTTP server. A popular choice is the `Live Server` extension for Visual Studio Code. Alternatively, if you have Node.js installed, you can use the `serve` package:
    ```sh
    npx serve
    ```

4.  **Open the application:**
    Open your web browser and navigate to the local address provided by your server (e.g., `http://localhost:3000`).

## File Structure

```
└── abod-ogc-restaurant-table-manager/
    ├── index.html                # Main HTML file for the UI
    ├── style.css                 # All styles for the application
    ├── dal/                      # Data Access Layer (interacts with DB)
    │   ├── database.connection.js  # Dexie.js database setup and schema
    │   ├── menu.dal.js           # DAL for menu items
    │   ├── orders.dal.js         # DAL for orders
    │   └── tables.dal.js         # DAL for tables
    ├── dll/                      # Data Logic Layer (business logic and validation)
    │   ├── menu.dll.js           # Business logic for menu
    │   ├── orders.dll.js         # Business logic for orders
    │   └── tables.dll.js         # Business logic for tables
    └── js/                       # UI and Application Logic
        ├── app.js                  # Main application script
        ├── collections/            # Modules for rendering item collections
        │   ├── menu.collection.js
        │   ├── orders.collection.js
        │   └── tables.collection.js
        └── items/                  # Modules for creating individual UI item elements
            ├── menu.item.js
            ├── order.item.js
            └── table.item.js
