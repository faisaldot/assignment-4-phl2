import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          FCB Library
        </Link>
        <div className="space-x-4">
          <Link to="/books" className="hover:text-gray-300">
            All Books
          </Link>
          <Link to="/create-book" className="hover:text-gray-300">
            Add Book
          </Link>
          <Link to="/borrow-summery" className="hover:text-gray-300">
            Borrow Summary
          </Link>
        </div>
      </div>
    </nav>
  );
}
