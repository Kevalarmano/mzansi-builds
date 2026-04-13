#  MzansiBuilds

MzansiBuilds is a modern web platform that allows developers to **build in public**, track their progress, and collaborate with others in real time.

##  Overview

The platform enables developers to:
- Create and manage personal projects
- Share progress updates through milestones
- View a live feed of other developers’ work
- Collaborate via comments and requests
- Celebrate completed projects in a public wall

---

##  Features

###  Authentication
- User registration and login (Firebase Authentication)
- Protected routes for secure access

###  Project Management
- Create new projects with:
  - Title
  - Description
  - Stage (Idea, MVP, Production)
  - Support needed
- Edit and delete your own projects

###  Live Feed
- Real-time updates using Firebase Firestore
- View all developers’ projects
- Clean Apple-inspired UI

###  Collaboration
- Comment on projects
- Request collaboration (“raise hand”)

###  Progress Tracking
- Add and manage milestones
- Mark milestones as completed
- Automatic project completion tracking

###  Celebration Wall
- Displays all completed projects
- Highlights developers who built in public

---

## Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend-as-a-Service:** Firebase
  - Authentication
  - Firestore (real-time database)
- **Routing:** React Router
- **Animations:** Framer Motion

---

##  Project Structure
src/
├── components/
├── context/
├── pages/
│ ├── auth/
│ ├── dashboard/
│ ├── projects/
├── services/
└── App.jsx


---

##  Setup Instructions

1. Clone the repository

git clone https://github.com/Kevalarmano/mzansi-builds.git
cd frontend

2. Install dependencies
npm install
3. Run the app
npm run dev
4. Open in browser
http://localhost:5173

Key Concepts Applied
Component-based architecture
State management using React hooks
Separation of concerns (services layer)
Real-time data handling
User-centric design principles

 Ethical Use of AI

AI tools were used as a development assistant to:

Improve UI/UX design
Debug issues
Structure code effectively

All implementation, logic, and decision-making reflect independent understanding and development.

 Author

Keval Armano Ramchander
 Final Notes

This project demonstrates:

Full-stack thinking using Firebase
Clean UI/UX design
Real-time application development
Collaborative software concepts
