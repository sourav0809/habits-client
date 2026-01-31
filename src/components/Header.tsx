import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_NAME } from "../modules/recipes/constants";
import { DEFAULT_USER_IMAGE } from "@/constants";
import { getFirstLetter } from "@/utils";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Hello {USER_NAME}
        </h1>
        <p className="text-gray-500 mt-1.5 text-sm sm:text-base">
          What are you having today?
        </p>
      </div>
      <Avatar
        className="h-14 w-14 sm:h-16 sm:w-16 ring-2 ring-gray-100 cursor-pointer hover:ring-teal-500 transition-all duration-300"
        onClick={() => navigate("/profile")}
      >
        <AvatarImage src={DEFAULT_USER_IMAGE} />
        <AvatarFallback className="bg-amber-400 text-gray-900 font-semibold text-lg">
          {getFirstLetter(USER_NAME)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
