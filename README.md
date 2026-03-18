# Whitty —  Social Network 

Whitty is a social network platform designed to demonstrate advanced database concepts, including ACID transactions, pessimistic locking, complex analytical queries, and integration testing with isolated environments.

This project was developed as a coursework assignment.

---

## <span style="font-size : 40px">🛠</span>  Technology Stack

* **Runtime:** [Node.js](https://nodejs.org/en)
* **Framework:** [Express.js](https://expressjs.com)
* **Database:** [PostgreSQL (v15)](https://postgresapp.com)
* **ORM:** [Prisma.js](https://www.prisma.io)
* **Containerization:** [Docker & Docker Compose](https://www.docker.com)
* **Testing:** [Jest.js](https://jestjs.io)

---
## <span style="font-size : 40px">👨‍💻</span> **My team : *Ivan Vitkovskiy* (do it by myself)** 

---


<span style="font-size : 25px">**🚀 Getting Started :**</span>
 
1. Prerequisites

**Docker & Docker Desktop installed.**

**Node.js (v16+) installed.**

2. Clone and Install


Clone the repository and install dependencies:
```bash
git clone https://github.com/1tssayzy/Whitty.git
cd Whitty
npm install
```

3. Environment setup 

**The project comes with a docker-compose configuration for PostgreSQL.**

```bash
docker compose up -d postgres
```
You need to create (.env) file based on your docker config:

```bash
DATABASE_URL="postgresql://{login}:{password}@localhost:{own_port}/{db_name}?schema=public"
```
After some set-ups you need to push your db using prisma 
```bash
npx prisma migrate dev
```
After all this steps you finally can start the project 
```bash
npm start
```
<span style="font-size : 25px">**🧪 Testing :**</span>

The project uses a dedicated test database **(whitty_test)** to ensure data isolation. The test script automatically creates the database schema before running tests.

**Lets start testing our app :**

## 1. U need to verify that u have installed Jest.js
How we can do it ? Simple 
```
npx jest --version
```
You will see something like :
```
itssayzy@Ivans-MacBook-Air Whitty % npx jest --version
11.4.2
```
**Then run this command :**
```
npm run test:integration
```

