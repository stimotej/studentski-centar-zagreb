import React, { useState } from "react";
import {
  MdAccessibilityNew,
  MdContrast,
  MdFilterBAndW,
  MdFormatSize,
  MdLink,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface AccessibilitySettingsProps {
  children?: React.ReactNode;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = (props) => {
  const [opened, setOpened] = useState(false);

  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [grayScale, setGrayScale] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  const handleLargeTextToggle = () => {
    setLargeText(!largeText);
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
  };

  const handleGrayScaleToggle = () => {
    setGrayScale(!grayScale);
  };

  const handleUnderlineLinksToggle = () => {
    setUnderlineLinks(!underlineLinks);
  };

  return (
    <div
      className={clsx(
        underlineLinks ? "underline-links" : "",
        highContrast ? "contrast-filter" : "",
        grayScale ? "grayscale-filter" : "",
        largeText ? "text-[22px]" : ""
      )}
    >
      {props.children}
      <div className="fixed top-1/3 right-0 flex items-start z-50">
        <button
          onClick={() => setOpened(!opened)}
          className="bg-primary text-white p-2 rounded-l-lg"
        >
          <MdAccessibilityNew size={24} />
        </button>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
              className="overflow-hidden bg-white whitespace-nowrap rounded-bl-lg shadow-[0_10px_60px_0px_rgba(39,39,52,0.06)]"
            >
              <div className="p-2">
                <h1 className="text-lg font-bold mb-2">Pristupačnost</h1>
                <div className="flex flex-col gap-1">
                  <ButtonToggle
                    onClick={handleLargeTextToggle}
                    label="Povećani tekst"
                    icon={<MdFormatSize />}
                    active={largeText}
                  />
                  <ButtonToggle
                    onClick={handleHighContrastToggle}
                    label="Visoki kontrast"
                    icon={<MdContrast />}
                    active={highContrast}
                  />
                  <ButtonToggle
                    onClick={handleGrayScaleToggle}
                    label="Sivi tonovi"
                    icon={<MdFilterBAndW />}
                    active={grayScale}
                  />
                  <ButtonToggle
                    onClick={handleUnderlineLinksToggle}
                    label="Podcrtaj poveznice"
                    icon={<MdLink />}
                    active={underlineLinks}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ButtonToggleProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

const ButtonToggle: React.FC<ButtonToggleProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        "px-2 py-1 rounded flex gap-2 items-center w-full focus:ring-1 ring-primary ring-offset-1",
        props.active
          ? "bg-primary hover:bg-primary/80 text-white"
          : "hover:bg-gray-100"
      )}
    >
      <div>{props.icon}</div>
      {props.label}
    </button>
  );
};

export default AccessibilitySettings;
