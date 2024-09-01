import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

// Profile Dropdown
const ProfileDropDown = () => {
  const [state, setState] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <button
            onClick={logout}
            className="bg-blue-600 rounded-full py-2 px-6 text-white font-medium"
          >
            Logout
          </button>{" "}
          {/* Logout button */}
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a
            href="/signup"
            className="bg-blue-600 rounded-full py-2 px-6 text-white font-medium"
            onClick={() => setState(!state)}
          >
            Signup
          </a>
        </>
      )}
      {/* <a href="/login">Login</a>
      <a
        href="/signup"
        className="bg-blue-600 rounded-full py-2 px-6 text-white font-medium"
        onClick={() => setState(!state)}
      >
        Signup
      </a> */}
    </div>
  );
};

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);

  // Replace # path with your path
  const navigation = [
    { title: "Customers", path: "/services/create" },
    { title: "Careers", path: "#" },
    { title: "Guides", path: "#" },
    { title: "Partners", path: "#" },
  ];
  return (
    <nav className="bg-white">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <a href="/" className="font-bold">
            SoftLife Group
          </a>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
            <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-secondary hover:text-black">
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <form className="flex items-center space-x-2 border rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-none text-secondary/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="w-full outline-none appearance-none placeholder-secondary text-secondary sm:w-auto"
                type="text"
                placeholder="Search"
              />
            </form>
            <ProfileDropDown />
            <button
              className="outline-none text-secondary block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
