# [CE SOIR](www.cesoir.herokuapp.com)
## It is a marketing platform for new or existing restaurant owners.
## It is also a platform provided to new or loyal customers to visit and review their newly visited or favorite places.

Food has always been playing a big part in our lives. The combination of different herbs and spices, together with sauces and condiments, has accentuated the food we put into our mouths and has differentiated the many cultures and businesses.

CE SOIR is here as a platform for new or small restaurants as an advertising choice. New restaurants often go unnoticed until a good marketing decision happened. Many new restaurants developed recipes to stand out or engaged in promotions to garner traction. With this app, restaurant owners are given an alternative to promote their businesses. Owners can simply sign up as our users and input the details of their restaurants and current promotions to this website.

Being able to stand out in the variety of cuisines available these days has now got to do more than just the taste, but also requires the understanding of the role of marketing tactics and food aesthetics.

### Models
1. User
2. Business
3. Review

### Functionalities of the Website
1. Sign Up - Reviewing User / Business User
2. Login / Logout
3. User Profile Edit / Delete
4. Business Profile Edit / Delete / Add New Businesses
5. Search Function for List of Restaurants
6. Review Box to Leave Comments

### Code and Database
1. Node.Js
2. Express
3. MongoDB / Mongoose

This project is designed based on the four basic functions for persistent storage (create, read, update and delete, more commonly known as CRUD). It is also an attempt on RESTful routing such that appropriate design patterns for data manipulation are achieved by mapping between HTTP verbs and CRUD actions.

Going through the functions of the website, we would notice that:
1. Sign Up - Reviewing User / Business User
  * Create (through GET / POST)
2. Login / Logout
  * Read (through GET / POST)
3. User Profile Edit / Delete
  * Read and Update and Delete (through GET / POST / PUT / DELETE)
4. Business Profile Edit / Delete
  * Read and Update and Delete (through GET / POST / PUT / DELETE)
5. Search Function for List of Restaurants
  * Read (through GET / POST)
6. Review Box to Leave Comments
  * Create / Read (through GET / POST)

The code exhibits a demonstration of embedding different models through fields in the Mongoose Schema to smoothen the process of retrieving data across different models. It is a straightforward and basic application of CRUD and RESTful routing which makes use of unique ObjectIDs, that were assigned to a saved entry in the database, in the URL for consistency and ease of data retrieval.

## Done By
### Koh Bao Ling
