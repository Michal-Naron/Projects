# Online Shop Project

## Overview

This project is an initial version of an e-commerce platform that allows users to browse, add to cart, and purchase products. The project currently implements a basic framework with functionality for both customers and an admin user, allowing product management directly within the interface.

## Features

### 1. Navigation
- The application provides a simple navigation bar with three links: `Shop`, `Products`, and `Home`.
- Currently, both `Shop` and `Products` pages display the same content, though this is a temporary setup and will be differentiated in future iterations.

### 2. User Authentication
- Upon visiting the site, users are automatically logged in as the admin user. There is no need to input any credentials at this time (this will be enhanced in future updates to include proper user authentication).
- Session management is handled via cookies and sessions, ensuring persistent login states for users.

### 3. Admin Capabilities
- As the admin user, you have full control over the products displayed in the store.
- Product Management:
  - Add New Products: Admin can create new product entries that will be visible to all users.
  - Edit Existing Products: Admin has the ability to edit product details, including name, description, price, and availability.
  - Delete Products: Admin can remove products from the store's inventory with a single click.

### 4. Customer Experience
- As both admin and a potential customer, the admin can simulate typical shopping interactions:
  - Add to Cart: Products can be added to a shopping cart.
  - Modify Cart: The admin can adjust the quantity of items or remove them entirely.
  - Place Orders: The admin can proceed with the checkout process, simulating an order placement.

This setup helps with testing both user and admin functionality seamlessly.

### 5. Data Persistence
- All product data, cart details, and orders are stored and managed using MongoDB.
- The application interacts with the database through the Mongoose library, enabling efficient and flexible database operations (CRUD - Create, Read, Update, Delete).

## Technologies Used

- Frontend: HTML, CSS, JavaScript (For navigation and dynamic rendering of content).
- Backend: Node.js with Express.js (for server-side logic and routing).
- Database: MongoDB (for storing product and order data) with Mongoose (for object modeling and seamless interaction with MongoDB).
- Authentication: Session and cookies are utilized to manage user sessions and provide a persistent login state across the site.

## Future Plans

- User Authentication: Implementing a complete authentication system with proper login, registration, and password management.
- Separate Product and Shop Pages: Differentiating the `Shop` and `Products` sections to display distinct content.
- Customer Accounts: Introduce user roles, where customers can create accounts, manage their orders, and track order history.
- Enhanced Admin Dashboard: Developing a dedicated admin panel with advanced analytics, order management, and inventory tracking.

