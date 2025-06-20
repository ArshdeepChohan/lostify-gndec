
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full bg-white border border-gndec-blue/30 flex items-center justify-center overflow-hidden">
        <img src="/gndec-logo-light.png" alt="GNDEC Logo" className="h-8 w-8 object-contain" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gndec-blue leading-tight">
          Lostify
        </span>
        <span className="text-xs text-gndec-burgundy leading-tight">
          GNDEC Campus
        </span>
      </div>
    </Link>
  );
};
