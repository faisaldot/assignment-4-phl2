# 📚 Minimal Library Management System

A clean and modern client-side application for managing a small library. This project allows users to view a list of books, perform full CRUD (Create, Read, Update, Delete) operations, borrow books, and view a summary of borrowed items.

**Live Demo:** https://assignment-4-phl2.vercel.app/

---

## ✨ Features

This project implements all the core requirements of a minimal library system:

- **Full Book Management**: A complete CRUD interface for managing the book inventory.
  - **Create**: Add new books to the library through a type-safe form.
  - **Read**: View all books in a responsive table and see detailed information on a dedicated page for each book.
  - **Update**: Edit existing book information with pre-filled forms.
  - **Delete**: Remove books from the system with a confirmation dialog to prevent accidental deletion.
- **Borrowing System**:
  - Users can borrow available books using a simple form.
  - The system validates that the borrow quantity does not exceed available copies.
  - The book's availability status is automatically updated based on the number of copies.
- **Borrow Summary**: A dedicated page that displays an aggregated summary of all borrowed books, showing the total quantity borrowed for each title.
- **Responsive Design**: The entire user interface is fully responsive and optimized for mobile, tablet, and desktop devices.
- **User-Friendly Notifications**: Toast notifications (using Sonner) provide clear feedback for actions like creating, updating, or deleting books.
- **Type-Safe Forms**: All forms are built with `react-hook-form` and `zod` for robust, type-safe validation, ensuring data integrity.

---

## 🛠️ Technology Stack

This project leverages a modern, type-safe technology stack for both frontend and backend.

| Layer                | Technology                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Frontend**         | [React](https://react.dev/) (`v18`), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) with [RTK Query](https://redux-toolkit.js.org/rtk-query/)        |
| **Routing**          | [React Router](https://reactrouter.com/) (`v7`)                                                                 |
| **UI Components**    | [shadcn/ui](https://ui.shadcn.com/)                                                                             |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/) (`v4`)                                                                 |
| **Form Management**  | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)                                       |
| **Backend**          | Node.js, Express.js                                                                                             |
| **Database**         | MongoDB with Mongoose                                                                                           |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation) (or your preferred package manager)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/faisaldot/assignment-4-phl2
    cd assignment-4-phl2
    ```

2.  **Install dependencies:**

    ```sh
    pnpm install
    ```

3.  **Run the development server:**
    ```sh
    pnpm run dev
    ```
    The application should now be running on [http://localhost:5173](http://localhost:5173).

---
