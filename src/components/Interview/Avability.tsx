import { useState } from "react";
import { BsCalendar, BsClock, BsTrash } from "react-icons/bs";

import { formatDate } from "@/lib/helpers";
import DeleteConfirmation from "../DeleteConfirmation";
import AddAvability from "./AddAvability";

const Avability = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState<string | null>(null); //id

  const times = [
    { id: 1, date: new Date() },
    { id: 2, date: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
  ];

  function toggleDeleteModal(val: boolean) {
    setdeleteModal(deleteModal === null ? "ok" : null);
  }

  return (
    <>
      <div className="grid flex-1 grid-cols-6 space-x-4">
        <div className="col-span-5 mt-4 flex flex-col gap-4">
          {times?.map((time, timeIdx) => (
            <div
              className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-md"
              key={time.id}
            >
              <div className="flex items-center gap-8">
                <p className="text-lg font-bold text-gray-500">
                  {timeIdx + 1}.
                </p>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <BsCalendar className="text-blue-500" />
                    <p className="text-lg font-semibold">
                      {formatDate(time.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsClock className="text-blue-500" />
                    <p className="text-gray-600">11:30 AM - 5:30 PM</p>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-4"
                onClick={() => toggleDeleteModal(true)}
              >
                <span className="cursor-pointer font-semibold text-red-500 underline">
                  <BsTrash className="mx-auto" /> Delete
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-1 mt-4">
          <button
            onClick={() => setShowModal(!showModal)}
            className="rounded-lg bg-red-500 px-2.5 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-red-600"
          >
            Add Availability
          </button>
        </div>
      </div>
      {showModal && (
        <AddAvability handleClose={() => setShowModal(!showModal)} />
      )}
      {deleteModal && <DeleteConfirmation handleDelete={toggleDeleteModal} />}
    </>
  );
};

export default Avability;
