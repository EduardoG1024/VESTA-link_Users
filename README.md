# VESTAlink
- **VESTAlink** is a web application that allow you to save URL's, but why would this be helpful? **VESTAlink** has functions that transform the url's into new elements.
- Example: 
    ```https://www.youtube.com/watch?v=X1aFkAkFASk```-->```https://www.youtube.com/embed/X1aFkAkFASk```.
- Also before you save a new url you will be able to link that url to 3 categories that you make.
- Example: 
    ```NEW URL```-->```Category_1: movies```, ```Category_2: superheores```, ```Category_3: comics```
- All the categories are not required but each URL needs at least one category, this will be helpful because if you want to see all your URL's that are related to an specific topic(category).

## DESIGN
![Design Image](./design/VESTAlink%20Design.png)

## DATABASE - POSTGRESQL
```
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    usertag VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```
```
CREATE TABLE links(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    link VARCHAR(2048),
    category_1 VARCHAR(20),
    category_2 VARCHAR(20),
    category_3 VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)
```

- NOTE: this app uses images of Galacta(Marvel Rivals) but it doesn't mean that **VESTAlink** is part of **Marvel Rivals**