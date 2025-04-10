const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"}) ;
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
  return res.status(300).json({message: "Yet to be implemented"});
});

// // Task 10
// // Get book lists

// const getBooks = () => {
//     return new Promise((resolve, reject)) => {
//         resolve(books);
//     });
// };

    // Task 1
// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  try {
    const bookList = await getBooks();
    res.json(bookList);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving book list"});
  }
});

// Task 11
// Get book details based on isbn
const getByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        let isbnNum = parseInt(isbn);
        if (books[isbnNum]) {
            resolve(books[isbnNum]);
        } else {
            reject({ status: 404, message: 'ISBN ${isbn} not found'});
        }
    });
};

// Task 2
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  getByISBN(req.params.isbn)
  .then(
    result => res.send(result),
    error => res.status(error.status).json({message: error.message})
    // return res.status(300).json({message: "Yet to be implemented"});
  );
});
  
// Task 3 and 12
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  getBooks()
  .then((bookEntries) => Object.values(bookEntries))
  .then((books) => books.filter((book) => book.author === author))
  .then((filteredBooks) => res.send(filteredBooks));
//   return res.status(300).json({message: "Yet to be implemented"});
}); 

// Task 4
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const isbn = req.params.title;
  getBooks()
  .then((bookEntries) => Object.values(bookEntries))
  .then((books) => books.filter((book) => book.title === title))
  .then((filteredBooks) => res.send(filteredBooks));
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Task 5 and Task 13
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.review;
  getByISBN(req.params.isbn)
  .then(
    result => res.send(result.reviews),
    error => res.status(error.status).json({message: error.message})
  ); 
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
