# Jan's Would You Rather Project - Twitter Style

The Would You Rather Project is an app that allows you to view different "would you rather" questions asked by different users. You have the ability to see answered and unanswered questions, answer any and view the results of any poll, and as well as create your own "would you rather question". Clicking on the Leader Board page will give you a glance of how you rank amongst other users in the page.

The `_DATA.js` file represents a fake database and methods that let you access the data.   

I used the starter code provided in this application and used [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## TL;DR

To get started opening the project right away:

* clone the project using `git clone https://github.com/jedecast/project-would-you-rather`
* install all project dependencies with `npm install`
* start the development server with `npm start`

## What's included
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions
    │   ├── authedUser.js #handles dispatching Authenticated User to store
    │   ├── questions.js #handles dispatching new questions and saving replies of existing questions to store
    │   ├── shared.js #handles initializing data (users and questions) from API to store
    │   └── users.js #handles dispatching which questions users answered and created to store
    ├── components
    │   ├── App.js # Root of app. Checks if AUTHED_USER has been set (not set = show login, set = show dashboard)
    │   ├── BarPoll.js # Component for the individual poll bar chart
    │   ├── CreateQuestion.js # Page for creating new questions.
    │   ├── Dashboard.js  # The home page. Holds two tabs for unanswered/answered questions
    │   ├── LeaderBoard.js  # The home page. Holds two tabs that toggles between unanswered/answered questions
    │   ├── Nav.js # Left panel navigation menu. Holds link to /, /add, /leaderboard, and logout button
    │   ├── QuestionCard.js # Component for rendering individual question cards, the polls, and results
    │   ├── QuestionPage.js # Page that renders individual question when user navigates to /question/:id
    │   ├── RightContainer.js # Right container that persists across home, leaderboard, and question creation
    │   └── SignIn.js # Page that handles dispatching authenticated user to store and loading dashboard
    ├── middleware
    │   ├── index.js # Combines and applies thunk and logger
    │   └── logger.js  # Middleware for console logging actions that affects the store
    ├── reducers
    │   ├── authedUser.js # handles returning the changed state to store that relates to authed user
    │   ├── index.js # combines authedUser, questions, users, and loading bar reducer to one
    │   ├── questions.js
    │   └── users.js
    ├── utils
    │   ├── _DATA.js  # data api provided in the starter code
    │   └── api.js # some exportable functions imported from the api
    ├── index.css # Didn't use index.css starter file. Instead, I used styled components to create a custom design fo the app
    └── index.js # initiates store
```

## Extra Packages Downloaded

Downloaded react bootstrap (https://react-bootstrap.github.io/) and styled components (https://styled-components.com/) to help with custom styling. Redux and router has also been installed like the previous lessons.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Contributing

This repository is the starter code for *all* Udacity students. Therefore, we most likely will not accept pull requests. For details, check out [CONTRIBUTING.md](https://github.com/udacity/reactnd-project-would-you-rather-starter/blob/master/CONTRIBUTING.md).
