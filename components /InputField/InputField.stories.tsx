import { useState } from "react";
import { InputField } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
} as const;

export const Default = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Username"
      placeholder="Enter username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="This is a helper text"
      clearable
    />
  );
};

export const Error = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Email"
      placeholder="Enter email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      invalid={Boolean(value && !value.includes("@"))}
      errorMessage="Invalid email"
    />
  );
};

export const Password = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Password"
      placeholder="Enter password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="password"
    />
  );
};

export const Loading = () => (
  <InputField label="Loading" placeholder="Fetching..." loading />
);

export const Disabled = () => (
  <InputField label="Disabled" placeholder="Can't type here" disabled />
);
