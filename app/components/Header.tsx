import Link from "next/link";

const Header = ({ user, onSignOut }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <a href="/" className="flex items-center">
        <h1 className="text-xl font-bold">Kodschul Management Hub</h1>
      </a>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Welcome, {user}</span>
        <a
          href="/login"
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Sign Out
        </a>
      </div>
    </header>
  );
};

export default Header;
