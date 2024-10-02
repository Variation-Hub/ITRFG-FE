import { FaCirclePlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

import { RegisterForm } from "@/types/register";
import InputField from "../InputField";

const EducationInfo: React.FC<{
  formData: Partial<RegisterForm>;
  setFormData: (data: Partial<RegisterForm>) => void;
  errors: Partial<RegisterForm>;
}> = ({ formData, errors, setFormData }) => {
  const handleAddCertification = () => {
    const newCertifications = formData.certifications
      ? [...formData.certifications]
      : [];
    newCertifications.push({ certificationName: "", certificationYear: "" });

    const tempData = { ...formData, certifications: newCertifications };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleRemoveCertification = (index: number) => {
    const newCertifications = formData.certifications
      ? [...formData.certifications]
      : [];
    newCertifications.splice(index, 1);
    const tempData = { ...formData, certifications: newCertifications };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleChangeCertificationField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newCertifications = formData.certifications
      ? [...formData.certifications]
      : [];
    newCertifications[index] = { ...newCertifications[index], [name]: value };
    const tempData = { ...formData, certifications: newCertifications };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleChangeEducationField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newEducation = formData?.education ? [...formData.education] : [];
    newEducation[index] = { ...newEducation[index], [name]: value };
    const tempData = { ...formData, education: newEducation };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleAddEducation = () => {
    const newEducation = formData?.education ? [...formData.education] : [];
    newEducation.push({
      field: "",
      yearOfPassing: "",
      university: "",
      duration: "",
    });

    const tempData = { ...formData, education: newEducation };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = formData?.education ? [...formData.education] : [];
    newEducation.splice(index, 1);
    const tempData = { ...formData, education: newEducation };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  return (
    <div className="">
      <p
        className="mb-2 flex cursor-pointer items-center text-lg font-semibold text-[#B60000]"
        onClick={handleAddEducation}
      >
        Education: <FaCirclePlus className="ml-2" />
      </p>{" "}
      <hr className="mb-4" />
      <div className="grid gap-4 lg:grid-cols-2">
        {formData.education?.map((education, index) => (
          <div key={index} className="space-y-2">
            <InputField
              label={`Course Name (${index + 1})`}
              name={`field`}
              className="w-5/6"
              value={education.field}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeEducationField(e, index)}
              placeholder="Course name"
              error={String(
                errors?.education ? errors?.education[index]?.field : ""
              )}
            />
            <div className="flex items-center space-x-2">
              <InputField
                label={`Year of Passout (${index + 1})`}
                name={`yearOfPassing`}
                value={education.yearOfPassing}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChangeEducationField(e, index)}
                placeholder="YYYY"
                error={String(
                  errors?.education
                    ? errors?.education[index]?.yearOfPassing
                    : ""
                )}
              />
              <InputField
                label={`Institute Name (${index + 1})`}
                name={`university`}
                value={education.university}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChangeEducationField(e, index)}
                placeholder="Institute name"
                error={String(
                  errors?.education ? errors?.education[index]?.university : ""
                )}
              />
              <InputField
                label={`Duration (${index + 1})`}
                name={`duration`}
                value={education.duration}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleChangeEducationField(e, index)}
                placeholder="YYYY"
                error={String(
                  errors?.education ? errors?.education[index]?.duration : ""
                )}
              />
              <button
                onClick={() => handleRemoveEducation(index)}
                className="group relative mt-5 flex items-center rounded-md border border-gray-300 bg-white p-2 text-red-600 transition duration-150 ease-in-out hover:border-red-400 hover:bg-red-100"
              >
                <RxCross1 clasName="h-8 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p
        className="mb-2 mt-4 flex cursor-pointer items-center text-lg font-semibold text-[#B60000]"
        onClick={handleAddCertification}
      >
        Professional Certificate: <FaCirclePlus className="ml-2" />
      </p>{" "}
      <hr className="mb-4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {formData.certifications?.map((certification, index) => (
          <div key={index} className="space-y-2">
            <InputField
              label={`Certification Name (${index + 1})`}
              name={`certificationName`}
              value={certification.certificationName || ""}
              onChange={(e) => handleChangeCertificationField(e, index)}
              placeholder="Certification name"
              error=""
            />
            <div className="flex items-center justify-between space-x-2">
              <InputField
                label={`Year of Completion (${index + 1})`}
                name={`certificationYear`}
                value={certification.certificationYear || ""}
                onChange={(e) => handleChangeCertificationField(e, index)}
                placeholder="YYYY"
                error=""
              />

              <button
                onClick={() => handleRemoveCertification(index)}
                className="group relative mt-5 flex items-center rounded-md border border-gray-300 bg-white p-2 text-red-600 transition duration-150 ease-in-out hover:border-red-400 hover:bg-red-100"
              >
                <RxCross1 clasName="h-8 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationInfo;
