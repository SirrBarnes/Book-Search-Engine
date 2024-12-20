# Book-Search-Engine

Back-End Specifications
You'll need to complete the following tasks in each of these back-end files:

auth.ts: Update the auth middleware function to work with the GraphQL API.

server.ts: Implement the Apollo Server and apply it to the Express server as middleware.

Schemas directory:

index.ts: Export your typeDefs and resolvers.

resolvers.ts: Define the query and mutation functionality to work with the Mongoose models.

hint
typeDefs.ts: Define the necessary Query and Mutation types:

Query type:

me: Which returns a User type.
Mutation type:

login: Accepts an email and password as parameters; returns an Auth type.

addUser: Accepts a username, email, and password as parameters; returns an Auth type.

saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)

removeBook: Accepts a book's bookId as a parameter; returns a User type.

User type:

_id

username

email

bookCount

savedBooks (This will be an array of the Book type.)

Book type:

bookId (Not the _id, but the book's id value returned from Google's Book API.)

authors (An array of strings, as there may be more than one author.)

description

title

image

link

Auth type:

token

user (References the User type.)

Front-End Specifications
You'll need to create the following front-end files:

queries.ts: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

mutations.ts:

LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

ADD_USER will execute the addUser mutation.

SAVE_BOOK will execute the saveBook mutation.

REMOVE_BOOK will execute the removeBook mutation.

Additionally, you'll need to complete the following tasks in each of these front-end files:

App.tsx: Create an Apollo Provider to make every request work with the Apollo Server.

SearchBooks.tsx:

Use the Apollo useMutation() hook to execute the SAVE_BOOK mutation in the handleSaveBook() function instead of the saveBook() function imported from the API file.

Make sure you keep the logic for saving the book's ID to state in the try...catch block!

SavedBooks.tsx:

Remove the useEffect() hook that sets the state for UserData.

Instead, use the useQuery() hook to execute the GET_ME query on load and save it to a variable named userData.

Use the useMutation() hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from the API file. (Make sure you keep the removeBookId() function in place!)

SignupForm.tsx: Replace the addUser() functionality imported from the API file with the ADD_USER mutation functionality.

LoginForm.tsx: Replace the loginUser() functionality imported from the API file with the LOGIN_USER mutation functionality.