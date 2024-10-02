import { FaCirclePlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

import { RegisterForm } from "@/types/register";
import Dropdown from "../Dropdown";
import InputField from "../InputField";

const levels = [
  "Entry level(0)",
  "Trainee (>=6months)",
  "Foundation(>=2years)",
  "Mid-Level(>=5years)",
  "Consultant(>=7.5years)",
  "Sr. Consultant(>=10years)",
  "SME-Expert(>=15years)",
];

const EmploymentInfo: React.FC<{
  formData: Partial<RegisterForm>;
  errors: Partial<RegisterForm>;
  setFormData: (data: Partial<RegisterForm>) => void;
}> = ({ formData, errors, setFormData }) => {
  const handleAddPreviousEmployment = () => {
    const tempData = {
      ...formData,
    };
    tempData.previousEmploymentDetail?.push({
      serviceLength: { years: "", months: "" },
      designation: "",
      organisationName: "",
      referenceDetails: {
        name: "",
        phoneNumber: "",
        companyEmail: "",
      },
      description: "",
    });
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleRemovePreviousEmployment = (index: number) => {
    const updatedPreviousEmployment = formData.previousEmploymentDetail
      ? [...formData.previousEmploymentDetail]
      : [];
    updatedPreviousEmployment.splice(index, 1);
    const tempData = {
      ...formData,
      previousEmploymentDetail: updatedPreviousEmployment,
    };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleChangePreviousEmployment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedPreviousEmployment = formData.previousEmploymentDetail
      ? [...formData.previousEmploymentDetail]
      : [];

    if (name === "serviceLength.years") {
      const prevVal = updatedPreviousEmployment[index].serviceLength;
      updatedPreviousEmployment[index].serviceLength = {
        years: value,
        months: prevVal?.months || "",
      };
    } else if (name === "serviceLength.months") {
      const prevVal = updatedPreviousEmployment[index].serviceLength;
      updatedPreviousEmployment[index].serviceLength = {
        years: prevVal?.years || "",
        months: value,
      };
    } else if (name === "designation") {
      updatedPreviousEmployment[index].designation = value;
    } else if (name === "description") {
      updatedPreviousEmployment[index].description = value;
    } else if (name === "organisationName") {
      updatedPreviousEmployment[index].organisationName = value;
    } else if (name === "referenceDetails") {
      // updatedPreviousEmployment[index].referenceDetails = value;
    }

    const tempData = {
      ...formData,
      previousEmploymentDetail: updatedPreviousEmployment,
    };

    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleChangeCurrentEmployment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const currentEmployment = { ...formData.currentEmployment } as any;
    if (name === "workingSince.years") {
      currentEmployment.workingSince.years = value;
    } else if (name === "workingSince.months") {
      currentEmployment.workingSince.months = value;
    } else {
      currentEmployment[name] = value;
    }

    const tempData = {
      ...formData,
      currentEmployment: currentEmployment,
    };

    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleJobType = (jobType: string) => {
    const tempData = {
      ...formData,
      currentEmployment: { ...formData.currentEmployment, jobType: jobType },
    };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  return (
    <div className="mt-3">
      <p
        className="mb-2 flex cursor-pointer items-center text-lg font-semibold text-[#B60000]"
        onClick={handleAddPreviousEmployment}
      >
        Employment History: <FaCirclePlus className="ml-2" />
      </p>{" "}
      <hr className="mb-4" />
      <div className="grid gap-4 lg:grid-cols-2">
        {formData.previousEmploymentDetail?.map((employment, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-sm font-semibold">
              # Previous Employment ({index + 1})
            </h3>

            <div className="flex items-center space-x-2">
              <InputField
                label="Organisation Name"
                name={`organisationName`}
                value={employment.organisationName || ""}
                onChange={(e) => handleChangePreviousEmployment(e, index)}
                placeholder="Organisation Name"
                error={String(
                  errors?.previousEmploymentDetail
                    ? errors?.previousEmploymentDetail[index]?.organisationName
                    : ""
                )}
                className="flex-1"
              />
              <InputField
                label="Designation"
                name={`designation`}
                value={employment.designation || ""}
                onChange={(e) => handleChangePreviousEmployment(e, index)}
                placeholder="Designation"
                error={String(
                  errors?.previousEmploymentDetail
                    ? errors?.previousEmploymentDetail[index]?.designation
                    : ""
                )}
                className="flex-1"
              />
            </div>

            <InputField
              label="Description"
              name={`description`}
              value={employment.description || ""}
              onChange={(e) => handleChangePreviousEmployment(e, index)}
              placeholder="Description about your role"
              error={String(
                errors?.previousEmploymentDetail
                  ? errors?.previousEmploymentDetail[index]?.description
                  : ""
              )}
              type="textarea"
            />

            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-4">
                <InputField
                  label="Service Length (Years)"
                  name={`serviceLength.years`}
                  value={employment.serviceLength?.years || ""}
                  onChange={(e) => handleChangePreviousEmployment(e, index)}
                  placeholder="Years"
                  error={String(
                    errors?.previousEmploymentDetail
                      ? errors?.previousEmploymentDetail[index]?.serviceLength
                          ?.years
                      : ""
                  )}
                />
                <InputField
                  label="Service Length (Months)"
                  name={`serviceLength.months`}
                  value={employment.serviceLength?.months || ""}
                  onChange={(e) => handleChangePreviousEmployment(e, index)}
                  placeholder="Months"
                  error={String(
                    errors?.previousEmploymentDetail
                      ? errors?.previousEmploymentDetail[index]?.serviceLength
                          ?.months
                      : ""
                  )}
                />
              </div>

              <button
                onClick={() => handleRemovePreviousEmployment(index)}
                className="group relative mt-5 flex items-center rounded-md border border-gray-300 bg-white p-2 text-red-600 transition duration-150 ease-in-out hover:border-red-400 hover:bg-red-100"
              >
                <RxCross1 clasName="h-8 w-5" />
              </button>
            </div>

            {/* <InputField
              label="Reference Details"
              name={`referenceDetails`}
              value={employment.referenceDetails}
              onChange={(e) => handleChangePreviousEmployment(e, index)}
              placeholder="Reference Details"
              error=""
            /> */}
          </div>
        ))}
      </div>
      {/* Current Employment */}
      <div className="mt-3">
        <div className="mb-2 flex items-center">
          <label
            htmlFor="currentlyWorking"
            className="flex cursor-pointer items-center text-lg font-semibold text-[#B60000]"
          >
            Current Employment:
          </label>
          <input
            type="checkbox"
            checked={formData.currentlyWorking}
            onChange={() =>
              setFormData({
                ...formData,
                currentlyWorking: !formData.currentlyWorking,
              })
            }
            className="ml-2"
            id="currentlyWorking"
          />
        </div>
        <hr className="mb-4" />

        {formData?.currentlyWorking && (
          <>
            <div className="flex w-1/2 items-center space-x-2">
              <InputField
                label="Organization Name"
                name="organisationName"
                value={formData.currentEmployment?.organisationName || ""}
                onChange={handleChangeCurrentEmployment}
                placeholder="Name of your organisation"
                error={String(
                  errors?.currentEmployment
                    ? errors?.currentEmployment?.organisationName
                    : ""
                )}
                className="flex-1"
              />
              <InputField
                label="Designation"
                name="designation"
                value={formData.currentEmployment?.designation || ""}
                onChange={handleChangeCurrentEmployment}
                placeholder="Designation"
                error={String(
                  errors?.currentEmployment
                    ? errors?.currentEmployment?.designation
                    : ""
                )}
                className="flex-1"
              />
            </div>

            <InputField
              label="Description"
              name={`description`}
              value={formData.currentEmployment?.description || ""}
              onChange={handleChangeCurrentEmployment}
              placeholder="Description about your role"
              error={String(
                errors?.currentEmployment
                  ? errors?.currentEmployment?.description
                  : ""
              )}
              type="textarea"
              className="w-1/2"
            />

            <div className="flex items-center space-x-4">
              <InputField
                label="Working Since (Years)"
                name="workingSince.years"
                value={formData.currentEmployment?.workingSince?.years || ""}
                onChange={handleChangeCurrentEmployment}
                placeholder="Years"
                error={String(
                  errors?.currentEmployment
                    ? errors?.currentEmployment?.workingSince?.years
                    : ""
                )}
              />
              <InputField
                label="Working Since (Months)"
                name="workingSince.months"
                value={formData.currentEmployment?.workingSince?.months || ""}
                onChange={handleChangeCurrentEmployment}
                placeholder="Months"
                error={String(
                  errors?.currentEmployment
                    ? errors?.currentEmployment?.workingSince?.months
                    : ""
                )}
              />
              <Dropdown
                label="Select Job Type"
                options={levels}
                selectedOption={formData.currentEmployment?.jobType || ""}
                onChange={(selectedOption) => handleJobType(selectedOption)}
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-4">
        <button
          disabled
          type="button"
          className="me-2 inline-flex cursor-pointer items-center rounded-lg bg-green-700 px-7 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Update Info
        </button>
      </div>
    </div>
  );
};

export default EmploymentInfo;
