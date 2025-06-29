import { Link } from 'react-router-dom';

function AuthSwitchLink({ question, linkText, to }) {
  return (
    <div className="text-center mt-4 text-sm text-gray-600">
      {question}{' '}
      <Link to={to} className="text-blue-600 hover:underline font-semibold">
        {linkText}
      </Link>
    </div>
  );
}

export default AuthSwitchLink; 