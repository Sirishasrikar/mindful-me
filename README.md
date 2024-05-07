# mindful-me
This is a MERN(MongoDB, Express, React, NodeJS) stack project, as part of the completion of the WISE course at Per Scholas.  
This project is about self care and how healthy habist can lead to a healthier version of ourselves.
The user, after logging in , would be in the Home page, with information to know more, if they require to do so. If first time, the user can signup and returning users, login. 
There are 2 pages that are having the functionality. 
Goals page has all CRUD functionalities, while teh JournalEntry page has just the Creat functionality.
The other 2 pages, are for further enhancements.
I have used Sticky Navbar for all my pages, used useState, useEffect and useNavigate to move around pages.
In the Goals page, the user can add as many goals as they want, but the last 3 goals will be displayed both on the Goals page and also on the Dashboard page. 
When the user clciks on the update button, the AddGoal button will change to Confirm Update and then after entering all the detials, the user can update the entry. If the user wants to delete the goal, a pop up asking for the confirmation comes up, and after "ok", the data is deleted.
In the Signup page, there are validations given to all the fields to make sure that the right information is added.
I have used @mui/material for some of the styling. 
AuthContext along with AuthProvider has been used so that it can be called in different pages. 
App.css has been used for all the styling. 
After the user signs up, message id displayed that the sign up has been successful and then the link to Login page is provided. Now the user can click on the link and login. 
The user then is directed to the Dashboard page. 
https://github.com/Sirishasrikar/mindful-me