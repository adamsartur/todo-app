# TODO App Challenge

The goal of this challenge is to implement a functional TODO list app from scratch with the following features. Below are the detailed requirements and guidelines to achieve each feature.

## Features

1. User can add an item to the list
   1. Create a form with an input field for the user to type the item content and a submit button.
   2. When the user submits the form, the input content should be added to the TODO list.
   3. Ensure that an empty item cannot be added (validation).
2. User can remove an item from the list
   1. Each item in the TODO list should have a delete button.
   2. When the delete button is clicked, the corresponding item should be removed from the list.
3. User can check an item in the list
   1. Each item should have a checkbox.
   2. When the checkbox is checked, the item should be marked as completed.
4. Unchecked items should display before checked items
   1. The TODO list should be sorted such that unchecked (incomplete) items are displayed above checked (completed) items.
   2. The list should re-sort automatically whenever an item's checked status changes.
5. User should only be able to add an item if content is provided
   1. Implement form validation to ensure that the input field is not empty before adding an item to the list.
   2. Display an error message or disable the submit button if the input is empty.
   3. After adding an item, the form should be cleared
6. Once an item is successfully added to the list, clear the input field and reset the form.

## Candidate Notes

As you implement the TODO list app, you are encouraged to make technical decisions and propose your own approach. Here are some guidelines and freedoms you have for this challenge:

### API

1. Initial TODO entries should be consumed from the following endpoint: https://everest-interview-public-files.s3.amazonaws.com/input.json
2. You do not have to persist the changes made to the server. Changes should only be available on the local client state.
3. Assume that everything that doesn't match the type definition is invalid. So you can discard entries that do not match it.
4. Assume that a valid TODO entry and list have the following types:

```typescript
type TodoEntry = { id: number; content: string; checked: boolean };
type TodoList = TodoEntry[];
```

### Implementation Details:

1. You can choose to use CSS for styling or any CSS framework (e.g., Bootstrap, Tailwind CSS) to enhance the visual appeal of the app.
2. While the core features are specified, you have the freedom to design the user interface and experience as you see fit.
3. You may choose the method of handling state management with any approach you deem appropriate.

### Additional Features:

Feel free to propose and implement additional features that you think would enhance the app. This could include, but is not limited to:

1. Edit functionality for items
2. Filtering and searching items

### Validation and Error Handling:

Implement validation and error handling as you see fit. Ensure that the user experience is smooth and errors are communicated clearly to the user.

### Code Structure:

Structure your code in a way that you believe is best for maintainability and scalability. You can organize your files, or follow any architecture pattern that you prefer.

By giving you these freedoms, we hope to see your creativity, technical expertise, and problem-solving skills in action. Good luck, and we look forward to seeing your unique approach to this challenge!

## Delivering the challenge

Once you are done, either zip the solution folder excluding the `node_modules` folder and send us back or feel free to have this in your github and share with us.
