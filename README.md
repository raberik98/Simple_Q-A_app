# Stackoverlow
Here I make a simple fullstack web application, note: for the .env file ask me directly for it won't be published 

# Stack Over*low*

Your task is to implement a crowdsourced Q&A site, similar to Stack Overflow, but call it Stack Over*low*, because we want you to make it as simple as possible.

1. For the backend use Node.js with Express.js (or an equivalent framework)
1. For the frontend use React (or an equivalent framework) - you can mix client- and server-side rendering techniques freely
1. For storage use MongoDB (or an equivalent NoSQL solution) or PostgreSQL (or an equivalent RDBMS)
1. For the looks ... keep it simple, focus on the fuctionality, meaning minimal CSS is enough or use a CSS framework, e.g. Bootstrap
1. Use Git to track your work, preferably a privately hosted repository (e.g. GitHub) and invite your interviewer/point of contact as a collaborator with read-access

No need to max out every task/user story, feel free to skip redundant parts, but be prepared to explain why you'd skipped something (e.g. *I have already showed how I'd handle a many-to-many relationship here ...*). Also, feel free to reinterpret tasks if they don't make sense to you - you can change *anything*, but keep it simple (the user stories are *vague* on purpose). When in doubt just imitate StackOverflow.

## Tasks

1. As a user I'd like to have the possibility to register a new account in the system.
    - New users can register into the system (e.g. via a form)
    - During registration an email address and a password is asked from new users
    - After registration users are notified about the status of the registration (successful or not)
    - For user accounts the following data is stored: an email address, a hashed password and the date/time of the registration

1. As a registered user, I'd like to be able to login to the system with my previously saved email and password.
    - Existing users can login into the system (e.g. via a form)
    - During login an email address and a password is asked from users
    - After successful login users are notified about the status of the login process (successful or not)
    - It is only possible to ask or answer a question when a user is logged in

1. As a user I'd like to see all questions available on the site.
    - Load and display question related data from storage
    - Sort questions by the latest question on top

1. As a registered user I'd like to be able to ask/post a new question on/to the site.
    - When creating a question users need to provide the title of the question and a message (the content of the message)
    - Users can optionally provide/upload an image (.jpg or .png) along with the question

1. As a user I'd like to see the details of a single question (with all answers for the question at hand).
    - Individual detail pages of questions are accessible from the view/page where all questions are listed
    - The page displays the question title, message, when it was posted to the site and an optional image (if it was provided when posting)
    - The page displays all the answers to a question in chronological order

1. As a registered user I'd like to be able to edit my own questions that I've posted to the site.
    - The title and message fields are pre-filled with the existing question's data
    - After a successful edit the user is notified about whether it was successful or not

1. As a registered user I'd like to be able to delete my own questions.
    - There should be a button/link to delete question the question's detail page
    - After deleting a question the user see the list of all questions on the main page

1. As a registered user I'd like to be able to vote on questions.
    - Vote numbers are displayed next to questions on the question list page
    - There are "vote up/down" buttons/links next to questions on the question list page

1. As a registered user I'd like to post answers to questions.
    - Users can post answers on the the detail page of questions
    - Users need to provide a message text when posting an answer

1. As a registered user I'd like edit my posted answers
    - The message is pre-filled with existing answer's data when the answer is edited
    - Answers can only be edited when they are the last answer among all answers

1. As a registered user I'd like be able to delete my own answers
    - There should be a deletion link on the question page, next to an answer
    - Deleting redirects you back to the question detail page

1. As a user I'd like to searching in questions and answers.
    - There is a search box and "Search" button on the main page
    - When you write something and press the button, you see a results list of questions (same data as in the list page)
    - The results list contains questions for which the title or description contains the searched phrase
    - The results list also contains questions which have answers for which the message contains the searched phrase

1. As a registered user I'd like to be able to mark an answer as accepted on my own questions
    - On the detail page of questions, for every answer there is a link/button that can be used to mark an answer as accepted
    - When there is an accepted answer there is an option to remove the accepted state
    - Only the user who asked the question can change the accepted state of answers
    - An accepted answer has a visual distinction from other answers

