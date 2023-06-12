

# Express REST API

This is a REST API built with Node, Express, Typescript, MongoDB, and Jest. The aim of this project is to provide an example solution with those techs for performing simple CRUD operations, along with authentication and authorization features.

## Start

```bash
# Clone the repo
git clone git@github.com:ml4907498/BurdaAPI.git

# Install dependencies
npm i

# Option 1: run docker containers, serve with hot reload at localhost:3000
docker-compose up -d

# Option 2: put your credentials in the .env file and run locally at localhost:3000
npm start

```

## Testing

```bash
# run tests
npm test
```



## APIs

#### User

- `GET /users` - Retrieves all users.

- `GET /user/:id` - Retrieves a specific user by their ID.

- `POST /user` - Adds a new user.

  - Body parameters in **Request**:

    - `partnerId` (string) 

    - `key` (string)

#### Permission

- `GET /permissions` - Retrieves all permissions.
- `GET /permission/:partnerId` - Retrieves a specific permission by its **partnerId**.
- `POST /permission` - Adds a new permission.
  - Body parameters in **Request**:
    - `partnerId` (string) 
    - `access` ( enum:  READ, WRITE or BOTH)

#### Authentication

Authentication is required for the operations related to contents. Otherwise, you will receive a "Forbidden" message.

- `Post /auth/login` -  login with **partnerId**
  - Body parameters in **Request**:
    - `partnerId` (string) 

#### Content

- `GET /content/:id` - Retrieves a specific content item by its ID.
- `DELETE /content/:id` - Deletes a content item by its ID.
- `GET /contents` - Retrieves all content items.
- `POST /content` - Adds a new content item.
  - Body parameters in **Request**:
    - `title` (string)
    - `partnerId` (string)
    - `description` (string)
    - `originalUrl` (string)
    - `publishDate` (string)
    - `paragraph` (string)

## License

This project is licensed under the MIT License.
