import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSheet } from "@/hooks/useSheet";
import Avatar from "@/components/Avatar";
import useTitle from "@/hooks/useTitle";
import { debounce, getStaticUrl } from "@/utils";

const Header = () => {
  const { user, logout } = useAuth();
  const { sheetDetail, handleTitleChange } = useSheet();

  useTitle(sheetDetail?.title);

  const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    handleTitleChange(event.target.innerText);
  }, 500);

  return (
    <div className="flex justify-between items-center h-[var(--header-height)] px-4 bg-gray-50 border-b border-gray-300 shadow">
      <div className="flex items-center gap-4">
        <Link to="/sheet/list">
          <img
            className="w-9 h-9 cursor-pointer"
            src={getStaticUrl("/logo.png")}
            alt="Logo"
          />
        </Link>
        <div
          className="text-gray-900 font-medium text-lg w-fit px-3 rounded-md 
                     outline-none hover:bg-gray-100 focus:bg-white focus:ring-2 
                     focus:ring-blue-500 transition-all"
          dangerouslySetInnerHTML={{ __html: sheetDetail?.title || "" }}
          onInput={handleChange}
          contentEditable
        ></div>
      </div>
      {user && <Avatar user={user} logout={logout} />}
    </div>
  );
};

export default Header;
