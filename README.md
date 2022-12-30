# What Does This Repo Do?

This repo allows the user to create, run, and track personalized pomodoro timer sessions. The user is able to create a custom combination of
work time and break time intervals, backed with optional concentration-improving soundtracks to choose from.
With the goal of improving productivity, the user can report the number of times they get distracted in a timer session.
This data is processed and then output on the user's Dashboard page where they can see their stats visualized.

This is a fullstack application built in React and Django.

# How to Run

## Prerequisites

You will need to install [Python](https://www.python.org/downloads/) and [Node.js](https://nodejs.org/en/download/) to run this repo.

### Frontend Dependencies

Run the following commands in terminal to install the necessary packages:

    npm install create-react-app

    npm install axios

    npm install chart.js

Run the webpage:

    npm start

### Backend Dependencies

Before installing packages, you will need to setup a virtual environment.

To do this, you must first navigate to the backend directory. Run the following command:

    cd backend

Then we must setup a virtual environment named .venv:

    py venv .venv

To activate the virtual environment run:

    source .venv/Scripts/activate

Then install the backend dependencies as follows:

    pip install django

    pip install django-cors-headers

    pip install django-rest-framework

To start the backend:

    py manage.py runserver
