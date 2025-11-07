import { useContext, useState, useRef } from "react";
import { LogOut, Settings } from "lucide-react";
import { GeneralContext } from "../../context/GeneralContext";
import { scale } from "framer-motion";

export default function HoverMenu() {
  const [open, setOpen] = useState(false);
  const { userData, logoutUser } = useContext(GeneralContext);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current); // Cancel closing
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 180); // ✅ Close delay = 300ms
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <div
        className={`cursor-pointer select-none transition-transform duration-200 ${
          open ? "scale-90" : "scale-100"
        }`}
      >
        <LetterAvatar name={userData?.name} />
      </div>

      {/* Dropdown */}
      <div
        className={` flex flex-col justify-center
          absolute right-0 top-full translate-y-1 w-auto px-3 py-2 rounded-md gap-[7px]
          bg-[#2B2D31] text-white border border-[#202225] shadow-lg z-[100]
          transition-all duration-200 ease-out 
          ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="dropdown_profile flex justify-center items-center flex-col gap-2 bg-[#45474e] px-4 py-2 rounded-md border border-[var(--dropdown_menu_items_border)] mb-[7px]">
          <LetterAvatar name={userData?.name} />
          <span className="text-[13px]">{userData?.email}</span>
        </div>
        <Item icon={<Settings size={16} />} title="Settings" />
        <Item
          icon={<LogOut size={16} />}
          title="Logout"
          hoverBg="var(--logout_button_hover)"
          onClickFunction={() => logoutUser()}
        />
      </div>
    </div>
  );
}

function Item({
  icon,
  title,
  hoverBg = "var(--dropdown_menu_items_hover_bg)",
  backgroundColor = "var(--dropdown_menu_items_bg)",
  border = "var(--dropdown_menu_items_border)",
  onClickFunction,
}) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer transition-all duration-150"
      onClick={onClickFunction}
      style={{
        backgroundColor,
        border: `1px solid ${border}`, // ✅ Apply thin border
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = backgroundColor)
      }
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}

const LetterAvatar = ({ name, size = 40 }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-semibold uppercase select-none"
      style={{
        backgroundColor: "#454040",
        width: size,
        height: size,
        fontSize: size * 0.45,
      }}
    >
      {getInitials(name)}
    </div>
  );
};
