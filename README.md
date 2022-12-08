# Foundations-Capstone
Full Stack Foundations Capstone Website From DevMountain iOS Coding Bootcamp

Youtube Link to video explaining project: 

Hi!  I created this project so anyone would be able to track their bills/commitments and easily see certain statistics about their

Upon downloading the project you'll need to run npm i and doublecheck that the dependencies in the package.json are the same as what you are using/have.

Ater that you'll need to create a .env file and paste in "PORT = 3737" and "CONNECTION_STRING = http://localhost:3737".

Some things to check would be the "currentYear" variable in the controller.js file.  This may need to be updated to the current year.
You may also wish to update the dates in the seed file.  Anything having last years date and a value of "true" will be deleted from the database.

By running node server/controller.js your server will start.

If using VSCode you'll be able to use thunderclient to hit the seed endpoint which adds the admin user to your database.

If you wish to use it, the admin users login information is adminaccount1, adminpassword1*.

Thank you for checking this out!!
