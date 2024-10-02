import React from "react";

type Props = {
  handleClose: () => void;
};

const AddAvability: React.FC<Props> = ({ handleClose }) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 md:inset-0"
    >
      <div className="z-100 relative h-full w-full max-w-md p-4 opacity-100 md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add your avability
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
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

          <div className="px-4 pt-4 md:p-5">
            <form>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time1"
                  className="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start time:
                </label>
                <input
                  type="time"
                  name="time1"
                  id="time1"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time2"
                  className="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  End time:
                </label>
                <input
                  type="time"
                  name="time2"
                  id="time2"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  required
                />
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

export default AddAvability;
