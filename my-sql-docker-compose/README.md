Step 1: Project Structure
Create a new directory for the project, e.g., mysql-volume-dockerfile.
Inside this directory, create the following files:
Dockerfile
.env (to store environment variables like MySQL root password)
Step 2: Writing the Dockerfile
Here’s how the Dockerfile would look:

Dockerfile
Copy code
# Dockerfile

# Use MySQL 8 image
FROM mysql:8.0

# Set environment variables for MySQL root user
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=mydb

# Expose MySQL port
EXPOSE 3306
Explanation:
FROM mysql:8.0: This line pulls the MySQL version 8.0 image from Docker Hub.
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}: Sets the root password from the environment variable (we’ll set it in the .env file).
ENV MYSQL_DATABASE=mydb: Automatically creates a database called mydb during initialization.
EXPOSE 3306: Exposes port 3306, the default MySQL port, for external connections.
Step 3: Creating the .env File
Create a .env file in the same directory to store sensitive data:

plaintext
Copy code
MYSQL_ROOT_PASSWORD=mysecretpassword
Step 4: Building and Running the Docker Container
In the VS Code terminal, navigate to your project directory and build the Docker image:

bash
Copy code
docker build -t mysql-volume .
Run the container with a volume:
bash
Copy code
docker run -d -p 3306:3306 --name mysql-container \
  --env-file .env \
  -v mysql_data:/var/lib/mysql \
  mysql-volume
Explanation:
docker build -t mysql-volume .: Builds an image called mysql-volume from the Dockerfile.
docker run -d -p 3306:3306 --name mysql-container: Runs the container in detached mode, maps port 3306, and names it mysql-container.
--env-file .env: Loads environment variables from .env.
-v mysql_data:/var/lib/mysql: Creates a named volume called mysql_data to store MySQL data in /var/lib/mysql (MySQL's default data storage path).
Step 5: Testing the Volume
Connect to the MySQL instance using a MySQL client or directly from the container:

bash
Copy code
docker exec -it mysql-container mysql -u root -p
Add sample data:

sql
Copy code
CREATE DATABASE testdb;
USE testdb;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));
INSERT INTO users (name) VALUES ('Alice');
Stop and restart the container:

bash
Copy code
docker stop mysql-container
docker start mysql-container
Reconnect and check if data persists:

sql
Copy code
USE testdb;
SELECT * FROM users;
If the data remains, the volume is working correctly.

