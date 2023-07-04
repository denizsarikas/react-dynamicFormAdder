import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex justify-between bg-gray-200 p-4">
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 font-bold text-lg"
      >
        Create
      </Link>
      <Link
        to="/formmanage"
        className="text-blue-500 hover:text-blue-700 font-bold text-lg"
      >
        Manage
      </Link>
    </div>
  );
}
