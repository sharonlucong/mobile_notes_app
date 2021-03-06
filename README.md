Mobile Note App
=====================

# Installation

- Terminal: cd mobile_notes_app/src
- Run a simple HTTP server: python -m SimpleHTTPServer 8888

# Use

- Open a mobile browser and connect to <ip address:8888, e.g. 10.0.0.3:8888>
- Login to the homepage. <username: lucong92@gmail.com, password: admin>
- Press "+" to create a new note
- Click each note to edit
- Drag the note to right for deletion
- This web app has a "list view" and a "card view", click corresponding icon to change the view
- Each note represents one "to-do" item, use the checkbox to determine whether it is completed.
- Once finished, click "LOGOUT" to quit

# Technology stack

- Language: JavaScript
- Frontend framework: AngularJS, Mobile Angular UI
- Login Authentication: Firebase

# Project Description

This project realized required functions of the notes and used the local storage to store note data locally, within the client web browser. The data persists after navigate away from the website, close the browser tab, exit the browser, etc. This app injected a Firebase service for user authentication.

Besides of the basic required functions, I also added some logics for input restrictions such as setting the input length limitations, checking whether the input is null, checking whether the total number of notes exceeds a certain number(the number is 50 in this project).

This web app is in a water-color visual style and I would like to offer users a simple, fresh and elegant experience.
