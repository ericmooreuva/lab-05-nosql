// Step 2:
// use bookstore
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list authors and books
// (printjson + toArray so results print when run as a file)
printjson(db.authors.find().toArray())
printjson(db.books.find().toArray())

// Step 6: insert two new books
db.books.insertMany([
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    published_year: 1979,
    author_ids: ["author_004"]
  },
  {
    title: "Pride and Prejudice and Zombies",
    published_year: 2009,
    author_ids: ["author_001", "author_005"]
  }
])

// Step 7: add missing authors
db.authors.insertMany([
  {
    _id: "author_004",
    name: "Douglas Adams",
    nationality: "British",
    bio: {
      short: "English author best known for The Hitchhiker's Guide to the Galaxy.",
      long: "Douglas Adams (1952-2001) was an English author, humorist, and screenwriter. The Hitchhiker's Guide to the Galaxy began as a BBC radio comedy in 1978 and grew into a series of novels, a TV series, and a film. He also wrote the Dirk Gently novels and was a noted advocate for conservation."
    }
  },
  {
    _id: "author_005",
    name: "Seth Grahame-Smith",
    nationality: "American",
    bio: {
      short: "American author of literary mashups such as Pride and Prejudice and Zombies.",
      long: "Seth Grahame-Smith is an American novelist, screenwriter, and producer. He popularized the literary mashup genre with Pride and Prejudice and Zombies (2009), built on Jane Austen's original text, and followed it with Abraham Lincoln: Vampire Hunter."
    }
  }
])

// Step 8: filter books by a list of authors
printjson(db.books.find({ author_ids: { $in: ["author_001", "author_004"] } }).toArray())
