export interface RegisterForm {
  fullName: string;
  displayName?: string; //todo
  email: string;
  password: string;
  dob: string;
  nationality: string;
  currentLocation: string;
  countryCode: string;
  phoneNumber: string;
  referralCode: string;
  summary: string; //TODO:
  skills: {
    skill: string;
    level: string;
  }[];
  education: {
    field: string;
    yearOfPassing: string;
    university: string;
    duration: string;
  }[];
  certifications: {
    certificationName?: string;
    certificationYear?: string;
  }[];
  previousEmploymentDetail: {
    serviceLength?: { years: string; months: string };
    designation?: string;
    organisationName?: string;
    description?: string;
    referenceDetails?: {
      name: string;
      phoneNumber: string;
      companyEmail: string;
    };
  }[];
  currentEmployment: {
    organisationName?: string;
    designation?: string;
    description?: string;
    workingSince?: { years: string; months: string };
    jobType?: string; // this should be enum
  };
  currentlyWorking: boolean;
  destinationCountry: string;
  socCodes?: string; //TODO:
  acceptTnC: boolean;
}

export type HeaderType = {
  [key: number]: string;
};
