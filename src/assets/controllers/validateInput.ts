export const validateUser = (name: string, lastName: string, age: number) => {
  const nameRegex = /^[a-z]{3,20}$/i;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let nameValid: boolean = nameRegex.test(name);
  let lastNameValid: boolean = nameRegex.test(lastName);
  let ageValid: boolean = age >= 18 && age <= 99 ? true : false;
  console.log(nameValid, lastNameValid, ageValid);
  return { name: nameValid, lastName: lastNameValid, age: ageValid };
};
