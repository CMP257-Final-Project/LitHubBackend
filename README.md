#  LitHub - Backend

<div align="center">

![Java](https://img.shields.io/badge/Java-21-orange)
![Servlets](https://img.shields.io/badge/Jakarta-Servlets-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

**REST API for LitHub Book Tracking Application**

</div>

---

##  Overview

Backend REST API for LitHub - a book tracking and book club web application. Built with Java Servlets and MySQL.

### Features
- User authentication and session management
- Book wishlist and read-list management
- Book rating system (1-5 stars)
- Blog CRUD operations
- Book club management
- Reading statistics tracking

---

##  Tech Stack

- **Java 21** - Core language
- **Jakarta Servlets 6.0** - HTTP request handling
- **Jackson Databind** - JSON parsing
- **JDBC** - Database connectivity
- **MySQL 8.0** - Database
- **Apache Tomcat 10.1** - Servlet container

---

##  API Endpoints

### Dashboard
```
GET /api/dashboard?userId={id}
```

### Book Operations
```
POST /api/book-action
```

**Request Body:**
```json
{
    "userId": 1,
    "action": "markRead",
    "userBookId": 101
}
```

**Available Actions:**
- `markRead` - Move book from wishlist to read
- `removeWishlist` - Remove from wishlist
- `removeRead` - Remove from read list
- `rate` - Rate a book (include "rating" field)

### Blogs
```
GET  /api/blogs?userId={id}
POST /api/blogs
```

### Book Clubs
```
GET /api/user-clubs?userId={id}
```

### Save Book
```
POST /LitHubBackend/SaveBookServlet?userId={id}&bookId={id}
```

---

## 📁 Project Structure

```
lithub-backend/
├── src/main/java/lithub/
│   ├── servlets/
│   │   ├── BookActionServlet.java
│   │   ├── SaveBookServlet.java
│   │   ├── DashboardServlet.java
│   │   ├── BlogsServlet.java
│   │   └── ClubsServlet.java
│   ├── utils/
│   │   └── DatabaseUtil.java
│   └── models/
│       ├── User.java
│       ├── Book.java
│       └── UserBook.java
├── database/
│   ├── schema.sql
│   └── sample_data.sql
├── README.md
└── LICENSE
```

---

##  Related Repositories

- **Frontend:** [LitHub-Frontend](https://github.com/CMP257-Final-Project/LitHub-Frontend)
- **Full Project:** [LitHub](https://github.com/CMP257-Final-Project/LitHub-Final-Implementation)
