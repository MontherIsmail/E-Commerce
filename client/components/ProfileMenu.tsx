import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/20/solid";
import { ChartPieIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline";

const solutions = [
  { name: "Profile", href: "#", icon: UserIcon },
  { name: "Logout", href: "#", icon: CursorArrowRaysIcon },
];

const ProfileMenu = () => {
  return (
    <Popover className="relative mr-5">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 focus:outline-none">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        />
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="max-w-md flex-auto overflow-hidden bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-1">
            {solutions.map((item) => (
              <div
                key={item.name}
                className="group relative pr-5 pl-2 py-1.5 flex gap-x-2 rounded-lg p-0 hover:bg-gray-50"
              >
                <div className="mt-1 flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-gray-900"
                  />
                </div>
                <div className="mt-3">
                  <a href={item.href} className="font-semibold text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default ProfileMenu;
