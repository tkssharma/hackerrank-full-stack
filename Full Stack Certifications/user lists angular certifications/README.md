# User Lists

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12.18.3
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/CgD5M0JuOd1ffgjGhwyPzQ/users-list.gif)

## Functionality Requirements

There are 2 components in the app:

- DataForm component: This component is used to add a new item of type Song or Book to the list.

- DataList component: A reusable component that is used to render the list of Songs and the list of Books. Accepts the appropriate List and the dataType (One of "Song" or "Book") as input.

The app should have the following functionalities:

- The user can add items to the book list or the song list from the same form. Adding an item in the form at the top should add it to the respective list below.

- There are 3 required input fields - name, genre, creator, and a `type` input field having 2 options to choose if the current item being added is a book or a song.

- For this challenge, you can assume that each item is uniquely identified by its name. Tests take care of testing with unique names only.

- On choosing `Song`, render an extra input field `totalTime`. Initially, all fields should be empty.

- Clicking on `Add` button should add the item to the respective list and clear all the input fields.

- The DataList component renders each of book list and song list in a table having columns name, genre, creator of each item followed by a delete button. Clicking on the delete button should delete the respective item from the list. Song list has an extra column of `Time` to render `Total Time` information for the item.

- Book item should be added to `<table data-test-id="book-table">` as a `<tr>`.

- Song item should be added to `<table data-test-id="song-table">` as a `<tr>`.
 
- The interface for an item is defined in the file `src/types/Item.ts` having the following structure:

```
  interface Item {
    name: string;
    genre: string;
    creator: string;
    type: string;
    totalTime?: number;
  }
```

## Testing Requirements

- The input field for `name` has data-test-id attribute `app-input-name`.
- The input field for `genre` has data-test-id attribute `app-input-genre`.
- The input field for `creator` has data-test-id attribute `app-input-creator`.
- The input field for `total time` has data-test-id attribute `app-input-time`.
- The input field for type Book has data-test-id attribute `app-input-book-type`.
- The input field for type Song has data-test-id attribute `app-input-song-type`.
- The Add button has data-test-id attribute `add-button`.
- The book table has data-test-id attribute `book-table`.
- The song table has data-test-id attribute `song-table`.
- Rows in a single table has data-test-id attribute `list-item-0`, `list-item-1` and so on.
- The Cell having name has data-test-id attribute `item-name`.
- The Cell having name has data-test-id attribute `item-name`.
- The Cell having creator has data-test-id attribute `item-creator`.
- The Cell having total time has data-test-id attribute `item-time`.
- The Cell having delete button has data-test-id attribute `item-delete`.

## Project Specifications

**Read-only Files**
- src/app/app.component.spec.ts
- src/app/app.module.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
