// Step 2: use bookstore
db = db.getSiblingDB("bookstore")

// Step 3: add authors from  json file
db.authors.drop()
let authors = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(authors)

// Step 4: add books from json file
db.books.drop()
let books = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(books)

// Step 5: show all authors and books
printjson(db.authors.find().toArray())
printjson(db.books.find().toArray())

// Step 6: add two books
db.books.insertMany([
  {
    title: "Harry Potter and the Sorcerer's Stone",
    published_year: 1997,
    author_ids: ["author_004"]
  },
  {
    title: "The Shining",
    published_year: 1977,
    author_ids: ["author_005"]
  }
])

// Step 7: add authors
db.authors.insertMany([
  {
    _id: "author_004",
    name: "J.K. Rowling",
    nationality: "British",
    bio: {
      short: "Author of the Harry Potter books.",
      long: "J.K. Rowling is a British author who wrote the Harry Potter series."
    }
  },
  {
    _id: "author_005",
    name: "Stephen King",
    nationality: "American",
    bio: {
      short: "Author known for horror books.",
      long: "Stephen King is an American author famous for horror stories."
    }
  }
])

// Step 8: find books by authors
printjson(
  db.books.find({
    author_ids: { $in: ["author_001", "author_004"] }
  }).toArray()
)
