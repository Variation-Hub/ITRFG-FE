export const errorMessage = (error: any, custom?: string) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    custom ||
    "Something went wrong, Try again"
  );
};

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isPasswordValid(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{4,15}$/;
  return passwordRegex.test(password);
}
