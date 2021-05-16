# TalentQlSecondStageAssessment

### Usage and Setup
- Clone this repo. Go into the root folder and run *yarn* to install the dependencies.
- Download XAMPP from here https://www.apachefriends.org/download.html, Install and run it. Then start Apache & MySQL services in XAMPP
- Create a .env file in the root folder, and input these fields:
```
NODE_ENV=development
PORT=4000
APP_DOMAIN=localhost

#DATABASE
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=database_user
DB_PASSWORD=database_password
JWT_SECRET=Random_String_Of_Characters

#EMAIL
MAIL_HOST=email_host
MAIL_PORT=email_port
MAIL_USER=email_user
MAIL_PASSWORD=email_password
```
- Run *yarn test* to validate the tests(unit & integration)
- Run *yarn dev* to start the app in development mode
- Change NODE_ENV to *production*, run *yarn build* to build the app. Then deploy the content of *dist* folder for production. 
