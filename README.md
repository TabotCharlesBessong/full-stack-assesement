This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Nextise Full-Stack Developer Recruitment Test

Thank you for participating in our full-stack coding test. This challenge involves building a tool for managing seminars, allowing users to sign in, create a course, assign a trainer, and send notifications to trainers upon assignment.

The challenge involves working on a project similar to our "Seminar Management" example, which is provided to give you a starting point.

The focus of this test is on implementing the core **functionalities**, not UI design. You should be able to complete the task within **1 hour**.

## Grading Criteria

Your submission will be evaluated on:

- Correctness and implementation of the requested features.
- Functional Docker Compose setup.
- Proper Git usage with clear commit history.
- Backend security, input validation, and error handling.
- Handling of external services (email notifications).

## Prerequisites/Environment Setup

Refer to the `seminar-management` project for:

- Basic page structure and component examples.
- Initial styling using Tailwind CSS.
- Sample data models for courses and trainers.

  **Technologies required**:

- **Next.js** (LTS): You can choose between the App Router or Pages structure.
- **Node.js**: LTS/Gallium (^16.19.0)
- **MongoDB or MySQL**: For data storage.
- **Docker**: For containerization.
- **Mailhog**: For testing email notifications.

## Task

### Features

1. **Course Model**:

   - Course Name
   - Course Date
   - Course Subject (e.g., React.js, Next.js)
   - Course Location
   - Course Participants
   - Course Notes
   - Course Price
   - Course Trainer Price

2. **Trainer Model**:
   - Trainer Name
   - Trainer Training Subjects (e.g., React.js, Next.js)
   - Trainer Location
   - Trainer Email

### Sample Model Data:

```json
{
  "course": {
    "name": "Advanced React.js",
    "date": "2024-09-15",
    "subject": "React.js",
    "location": "Stuttgart",
    "participants": 20,
    "notes": "Focus on hooks and context API",
    "price": 2000,
    "trainer_price": 500
  },
  "trainer": {
    "name": "John Doe",
    "training_subjects": ["React.js", "Next.js"],
    "location": "Berlin",
    "email": "john.doe@example.com"
  }
}
```

### Functional Requirements:

- **Login Page**: User login with a username and password (hardcoded credentials are acceptable).
- **Home Page**: Display a list of all courses.
- **Create Course**: A form to create a new course with the fields described above.
- **Create Trainer**: A form to create a new trainer.
- **Assign Trainer**: Functionality to assign a trainer to a course.
- **Email Notification**: Once a trainer is assigned, send an email to the trainer with all course details using **Node.js SMTP mailer** (Mailhog for local testing).

### Algorithmic Challenge:

**Combined Problem:**

1. **Course Scheduling Conflict Detection**:

   - Implement a function that checks if two courses are scheduled at the same time and location. If there's a conflict, return a warning message.

2. **Optimal Trainer Matching**:

   - Before assigning a trainer to a course, the system should suggest the best-matching trainer based on their availability and subject expertise.
   - If a selected trainer is already scheduled for another course on the same day, the system should reject the assignment to avoid conflicts.

   - **Requirements**:
     - Write a function to detect scheduling conflicts when a new course is created.
     - Write a function to suggest the most qualified trainer for a course considering both availability and subject expertise.
     - Ensure that the system prevents assigning a trainer who already has a course scheduled on the same day.

### Docker Setup

### Install Dependencies

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd kodschul-management-hub
```

Install the project dependencies using Yarn:

```bash
yarn install
```

The project must be containerized using **Docker Compose**, including:

- Frontend (Next.js)
- Backend (Node.js)
- Database (MongoDB or MySQL)
- **Mailhog** for email testing

## Running the Project

### Frontend:

- `npm start`: Start the application in development mode.
- `npm run build`: Create a production-optimized build.
- `npm test`: Run any frontend tests.

### Backend:

- Ensure the Node.js server is running and all API endpoints are functional (login, course creation, trainer assignment, etc.).

### Docker Compose:

- Create a `docker-compose.yml` file to manage all services.
- Ensure frontend and backend services are containerized and communicating properly.
- Set up **Mailhog** for testing email notifications.

## Submission Guidelines

- You must create your own Git repository for the project.
- Proper Git usage is a key part of the evaluation, so ensure a clean and logical commit history.
- Once completed, share the link to your repository with us for review.
- Do **not** include the `node_modules` folder.
- Include a `FOLLOW-UP.md` file with answers to any additional questions or notes about the process.
