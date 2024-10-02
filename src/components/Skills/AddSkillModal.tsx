import { useState } from "react";

const levels = [
  "Entry level(0)",
  "Trainee (>=6months)",
  "Foundation(>=2years)",
  "Mid-Level(>=5years)",
  "Consultant(>=7.5years)",
  "Sr. Consultant(>=10years)",
  "SME-Expert(>=15years)",
];

const AddSkillModal = ({handleClose}: any) => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLevel(parseFloat(event.target.value));
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 md:inset-0"
    >
      <div className="z-100 relative h-full w-full max-w-md p-4 opacity-100 md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add a new skill
            </h3>
            <button
              type="button"
              className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={handleClose}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form>
              <div>
                <label
                  htmlFor="skillId"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter skill name:
                </label>
                <input
                  type="text"
                  name="skill"
                  id="skillId"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="JavaScript"
                  required
                />
              </div>

              <div className="relative my-4">
                <label
                  htmlFor="steps-range"
                  className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Skill Level: {levels[selectedLevel]}
                </label>
                <input
                  id="steps-range"
                  type="range"
                  min={0}
                  max={6}
                  value={selectedLevel}
                  onChange={handleChange}
                  step="1"
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                />
                <span className="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400">
                  {levels[0]}
                </span>

                <span className="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">
                  {levels[levels?.length - 1]}
                </span>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-lg bg-[#b60000] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#d12828] focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;
