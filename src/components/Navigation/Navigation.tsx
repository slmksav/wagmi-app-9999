import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const baseLinkClasses = 'p-1 text-blue-100 hover:underline';
const currentLinkClasses = 'font-bold italic text-blue-200';

export default function Navigation() {
  // Get the current location so we can tell which route we're on.
  const location = useLocation();

  return (
    <nav className="px-2 pt-2 text-xl">
      <Link
        className={clsx(
          baseLinkClasses,
          location.pathname === '/' && currentLinkClasses,
          'text-blue-100 audiowide' // Change text color to red for Home link
        )}
        to="/"
      >
        Home
      </Link>
      <Link
        className={clsx(
          baseLinkClasses,
          location.pathname === '/about' && currentLinkClasses,
          'text-blue-100 audiowide ml-5' // Change text color to green for About link
        )}
        to="/about"
      >
        FAQ
      </Link>
    </nav>
  );
}
