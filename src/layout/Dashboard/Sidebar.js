import { Link } from "react-router-dom";
import { AiFillHome, AiFillFolderAdd } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="col-span-2 bg-indigo-200 h-[calc(100vh-25px)] p-5 rounded-lg">
      <ul className="flex gap-3  flex-col h-full">
        <li className="flex items-center gap-1">
          {" "}
          <MdAdminPanelSettings size={24} /> Admin Dashboard
        </li>
        <li>
          <Link to="/dashboard" className="flex items-center gap-2">
            {" "}
            <FaProductHunt size={24} /> Product List
          </Link>
        </li>
        <li>
          <Link to="add-product" className="flex items-center gap-2">
            {" "}
            <AiFillFolderAdd size={24} /> Add Product{" "}
          </Link>
        </li>
        <li className="mt-auto">
          <Link to="/" className="flex items-center gap-2">
            {" "}
            <AiFillHome size={24} /> Back to Home{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
