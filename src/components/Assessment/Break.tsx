import React from "react";

import Timer from "./Timer";

type Props = {
  title: string;
  goToNextSection: () => void;
};

const Break: React.FC<Props> = ({ title, goToNextSection }) => {
  return (
    <div className="container mx-auto flex h-screen flex-col">
      <div className="my-4">
        <p className="text-2xl font-semibold text-[#5F6FFF]">ITRFG</p>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="border border-[#D7D7D7] p-4 px-12 text-center">
            <p className="font-medium">Remaining break time :</p>
            <p className="text-3xl font-semibold">
              <Timer
                startTime={120}
                sectionName={title || "Break"}
                handleSubmit={goToNextSection}
              />
            </p>
          </div>

          <button
            className="mt-6 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-400"
            onClick={goToNextSection}
          >
            Go to Next Section
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-8">
            <p className="text-2xl font-semibold">Take a Break</p>

            <p className="w-4/5 py-2 text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="w-4/5 py-2 text-[#424242]">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. ficia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Break;
