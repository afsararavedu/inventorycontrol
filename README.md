# inventorycontrol


To run this application locally and connect it with a Spring Boot backend, you'll need to follow a few 4erdc  steps. Note that this project currently uses an Express (Node.js) backend, so if you want to use Spring Boot, you would be replacing the backend layer while keeping the React frontend.

Step 1: Run the current application locally
Download the Code: Download the project as a ZIP file and extract it.
Install Node.js: Ensure you have Node.js (v18+) and npm installed.

**1. Open PowerShell as Administrator 
You must have administrative privileges to modify the execution policy. 
 
2. Change the Execution Policy 

Run the following command:
powershell
	Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Alternatively, to apply the change for all users on the machine, you can use:
powershell
	Set-ExecutionPolicy RemoteSigned -Scope LocalMachine**
  
Install Dependencies: Open a terminal in the project folder and run:
npm install
Set Up PostgreSQL:
Install PostgreSQL locally.
Create a database (e.g., sales_pro).
Create a .env file in the root directory and add your connection string:
DATABASE_URL=postgresql://postgres:waycup2020@localhost:5432/sales_pro
-------------------------
If using AWS RDS, use the endpoint from the RDS console:
DATABASE_URL=postgresql://admin:yourpassword@your-rds-endpoint.amazonaws.com:5432/sales_pro
-----------------------

Run Database Migrations:
npm run db:push
npm install cross-env --save-dev
npm install dotenv

Start the App:
npm run dev
The app will typically be available at http://localhost:5000.
Step 2: Connecting a Spring Boot Application
If you want to replace the Node.js backend with Spring Boot:

Create REST APIs in Spring Boot:

Create a Spring Boot project (using Spring Initializr) with Spring Web, Spring Data JPA, and PostgreSQL Driver.
Define your Entities to match the tables in shared/schema.ts (e.g., DailySale, Order).
Create Controllers with the exact same endpoints defined in shared/routes.ts:
GET /api/sales
POST /api/sales/bulk
GET /api/orders
POST /api/orders/bulk
POST /api/upload (using MultipartFile)
Handle CORS:

In your Spring Boot WebMvcConfigurer, allow requests from the React dev server (usually http://localhost:5173 if running Vite separately, or http://localhost:5000 if proxied).
Configure PostgreSQL in Spring Boot:

In src/main/resources/application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/sales_pro
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Update React Frontend:

By default, the React app uses fetch(api.path). Since the paths start with /api, you need to ensure your React dev server (Vite) proxies these requests to your Spring Boot server (usually running on port 8080).
Update vite.config.ts to add a proxy:
proxy: {
  '/api': 'http://localhost:8080'
}
This setup will allow your React frontend to communicate with your Spring Boot REST APIs while storing data in your local PostgreSQL database.
