Step 1: Project Structure
In a new directory (e.g., mysql-volume-compose), create the following files:

docker-compose.yml
.env
Step 2: Writing the docker-compose.yml File
yaml
Copy code
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: mydb
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
Explanation:
version: '3.8': Specifies the version of Docker Compose syntax.
services: Defines the services in the application; here, only mysql.
image: mysql:8.0: Specifies the MySQL 8.0 image.
container_name: Sets the container name to mysql-container.
environment: Sets environment variables from the .env file.
ports: Maps port 3306 to the host.
volumes:
mysql_data:/var/lib/mysql: Mounts the mysql_data volume to store MySQL data.
Step 3: Setting Up the .env File
In the same directory, create the .env file:

plaintext
Copy code
MYSQL_ROOT_PASSWORD=mysecretpassword
Step 4: Running with Docker Compose
Run the container with Docker Compose:

bash
Copy code
docker-compose up -d
This command starts the MySQL container with the defined volume.

Step 5: Testing the Volume
Follow the same steps to test the persistence as in the Dockerfile setup:

Connect to the MySQL instance:

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
Stop and restart the container with Docker Compose:

bash
Copy code
docker-compose down
docker-compose up -d
Verify persistence by reconnecting and checking data:

sql
Copy code
USE testdb;
SELECT * FROM users;
If the data is still there, the volume is functioning as expected.

