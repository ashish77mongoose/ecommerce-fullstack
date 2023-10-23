import { Menu } from "@headlessui/react";
import React from "react";
import { reactIcons } from "../../utils/icons";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";

const ActionButton = ({ option }) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <Menu as="div" className="relative inline-block  text-left">
      <div>
        <Menu.Button
          ref={setReferenceElement}
          className="w-10 h-10 flex-center hover:bg-zinc-700 bg-zinc-800 rounded-md text-18"
        >
          {reactIcons.threeDots}
        </Menu.Button>
      </div>
      {createPortal(
        <Menu.Items
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className=" z-[10]    mt-2 w-44  divide-y border-c divide-zinc-800 rounded-md bg-primary-bggray shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1 ">
            {option?.map((item) => (
              <Menu.Item key={item}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={`${
                      active ? "bg-primary-100 text-white" : "text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>,
        document.querySelector("#popper")
      )}
    </Menu>
  );
};
ActionButton.propTypes = {
  option: PropTypes.array,
};
export default ActionButton;
