import urlRegex from "url-regex";

export function isValidType(
  string: string,
  type: "url" | "email" | "number" | "linkedinUrl" | "password"
): boolean {
  /* eslint-disable */

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

  const numberPattern = /^(?:\+?[0-9]+(?:[\s][0-9]+)?)$/;

  const linkedinUrl = /^(https?:\/\/)?www\.linkedin\.com\//;

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  /* eslint-disable */
  if (type === "url") {
    return urlRegex({ exact: true }).test(string);
  }

  if (type === "number") {
    return numberPattern.test(string);
  }

  if (type === "linkedinUrl") {
    return linkedinUrl.test(string);
  }

  if (type === "password") {
    return passwordPattern.test(string);
  }

  return emailPattern.test(string);
}

export function validRegex(
  option: "email" | "url" | "mobile_number" | "name"
): RegExp {
  if (option === "email") {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
  }

  if (option === "mobile_number") {
    return /^(?!0[0-9])[0-9]+$/;
  }

  if (option === "name") {
    //Added space check regex(will be removed once trimming of sapces is deployed)
    return /^(?=[A-Za-z])\b[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/;
    //return /^[A-Za-z][A-Za-z0-9 ]*$/;
  }

  return /0/;
}

export function HideEmail(email: string) {
  if (!email) {
    console.log("Provide an Email to Hide");
    return;
  }

  const [localPart, domainPart] = email.split("@");

  const hiddenLocalPart =
    localPart.length > 3
      ? "*".repeat(Math.floor(localPart.length / 2)) +
        localPart.slice(Math.floor(localPart.length / 2))
      : "*".repeat(Math.floor(localPart.length));

  return `${hiddenLocalPart}@${domainPart}`;
}

export function isPasswordCorrect(password: string) {
  if (password.length < 8) {
    return "Password invalid length (min 8 characters)";
  }

  if (!/[a-z]/.test(password)) {
    return "Password missing lowercase letter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password missing uppercase letter";
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return "Password missing special character";
  }
  if (!/\d/.test(password)) {
    return "Password missing number";
  }
}
