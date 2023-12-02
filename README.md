# MovieTheater Club Application - Reel Rover 

## TEAM NAME - STRAWHATS

| TEAM | SJSU ID |
| --- | --- |
| Shiva Ram Reddy Bethi |  017408482 |
| Jatin Bhandari | 017425447 |
| Charles Fathima Bhumpala | 016773055 |
| Sohan Leburu |  017408768 |



## Team Members and Contribution gist:

| TEAM | Contribution |
| --- | --- |
| Shiva Ram Reddy Bethi |  Front end and Backend API implementation - Designed and configured MongoDB models, cinemaController logic, worked on cinema route module,worked on Admin Route for client logic, Designed and worked on Home, Register, Purchase front-end client webpages, developed Navbar, TheatreListByMovie, CinemaLists, DateSelector React Components, loadbalancer |
| Jatin Bhandari | Front end and Backend API implementation -  authController & theaterController logic, worked on auth route & theater module, Designed and worked on Tickets, Analytics, Login front-end client webpages, developed MovieLists, NowShowing, ShowtimeDetails, Showtimes React Components, AWS deployment and Autoscaling AWS Deployment EC2 instances |
| Charles Fathima Bhumpala | Front end and Backend API implementation - movieController logic, worked on movie route module, Developed Location Context, Designed and worked on Movie, Showtime, Cinema front-end client webpages, developed Theater, TheaterListsByCinema, TheaterShort, UpcomingMovies React Components |
| Sohan Leburu | Front end and Backend API implementation - showtimeController logic, worked on showtime route module,Developed Auth Context, Designed and worked on Schedule, Search, User front-end client webpages, developed SelectedMovie, Seat, ScheduleTable, Loading React Components, Black box Testing |

## Tech stack
REACTJS, TAILWIND CSS, NODEJS, EXPRESSJS, MONGODB

## Design Choices:

### Why NoSQL in a database?

- We chose NoSQL over a relational architecture because of its own access languages for interpreting data being stored.
- It offers a developer-centric database, which simplifies database design and access to application programming interfaces.
- Before employing databases, developers do not need to be concerned about their internal workings.
- NoSQL databases allow you to work on what you need rather than pushing a schema on the database.

### Why is MongoDB used?

- MongoDB allows different data hierarchies. - Secondary indexes provide for flexibility in datamodel.
- Because Mongo DB is schemaless, we do not define the schema at the outset.

### Why MERN Stack - Performance and User Interface Rendering

- React JS is the best when it comes to UI layer abstraction. Because React is only a library, you may build the application and structure the code anyway you like. As a consequence, in terms of UI rendering and performance, it exceeds Angular.
- Cost-effective
  Because MERN Stack uses only one language throughout, Javascript, a firm will benefit from hiring only Javascript experts rather than specialists for each technology. This choice will save you both time and money.
- Open Source and Free
  MERN employs only open-source technology. This feature allows a developer to use open sources to find answers to challenges that may emerge during development.

## XP Core Values Maintained by Team
- **Simplicity** <br> We made sure to include just the most straightforward solutions that worked. In order for everyone on the team to understand the code and make changes in the future, if necessary, we made it modular and reusable. As much as possible, we have reduced code smells and included pertinent comments to our code. Our code base is straightforward, making maintenance simple.

- **Feedback** <br> We were able to learn, adjust to the adjustments, and prevent repeating mistakes by providing and receiving regular feedback. This encouraged us to work more effectively. We made pull requests and submitted our changes to a branch during the development stage. We pushed the changes to the master branch after another team member gave the code their seal of approval. We ensured that any modifications to the master branch of the code were always stable and did not affect the code of the other team members. We were able to unify our objectives and duties thanks to ongoing feedback.

- **Communication** <br> Our team had good communication throughout the project. We brainstormed the idea of the project initially and divided the tasks among ourselves. We had frequent sprint meetings where we used to dicuss the issues faced by team members and retrospected what did not go well.

## Architecture Diagram
![Architecture diagram.png](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Images/Architecture%20diagram.png)

## Deployment Diagram
![Component Diagram.jpeg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Images/Deployment%20diagram.png)

## UML Diagram
![Deployment diagram.png](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Images/UML%20diagram.png)

## Component Diagram
![Component Diagram.jpeg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Images/Component%20Diagram.jpeg)

# Feature Set

### For all users:
View Home/Landing page showing information about the Theaters, locations, current movie schedules, and upcoming movies,
View membership option - Regular and Premium
View Registration/Signup page - viewable by all users
Book tickets for a movie
Each booking will include an online service fee ($1.50 per ticket)


### For Enrolled and logged in Members:
View members page - showing movie tickets purchased, rewards points accumulated
Regular membership is free
Premium membership is for an annual fee of 15 dollars
View list of Movies watched in the past 30 days
Book multiple seats (upto 8) for a movie show - using rewards points or payment method (pre-selected) - seats selected by the user
Cancel previous tickets before showtime and request refund
Accumulate rewards points (all members) 1 point per dollar
Premium members get online service fee waived for any booking


### Theater employees :
Add/update/remove movies/showtimes/theater assignment in the schedule
Configure seating capacity for each theater in a multiplex
View analytics dashboard showing Theater occupancy for the last 30/60/90 days
Summarized by location
Summarized by movies
Configure discount prices for shows before 6pm and for Tuesday shows

## UI Wireframes
![Adding page.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Adding%20page.jpg)
![Admin page UI.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Admin%20page%20UI.jpg)
![Analytics page UI.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Analytics%20page%20UI.jpg))
![Choosing a seat.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Choosing%20a%20seat.jpg)
![Adding page.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Adding%20page.jpg)
![Home Page UI.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Home%20Page%20UI.jpg)
![Movie theatre and showtime.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Movie%20theatre%20and%20showtime.jpg)
![Regsiter page web UI.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Regsiter%20page%20web%20UI.jpg)
![Rewards page.jpg](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Web%20UI%20Raw%20Designs/Rewards%20page.jpg)

## Sprint BurnDown Chart
[Sprint Task Sheet and burndown strawhats.xlsx](https://github.com/gopinathsjsu/teamproject-strawhats/blob/main/Sprint%20Task%20Sheet%20and%20burndown%20strawhats.xlsx)

## Steps to run the application

1. git clone [repo](https://github.com/gopinathsjsu/team-project-ysmp.git)
2. Install dependencies for both frontend and backend npm install `npm install`
3. Run backend - `npm run Devstart`
   Run frontend - `npm run start`
