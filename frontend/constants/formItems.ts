export const steps = [
    {
      key: "basic",
      title: "Basic Information",
      fields: [
        {
          key: "firstName",
          label: "First Name",
          id: "first_name",
          type: "text",
          autoComplete: "given-name",
          required: true,
        },
        {
          key: "middleName",
          label: "Middle Name",
          id: "middle_name",
          type: "text",
          autoComplete: "additional-name",
          required: false,
        },
        {
          key: "lastName",
          label: "Last Name",
          id: "last_name",
          type: "text",
          autoComplete: "family-name",
          required: true,
        },
      ],
    },
    {
      key: "contact",
      title: "Contact Information",
      fields: [
        {
          key: "phone",
          label: "Phone",
          id: "phone",
          type: "tel",
          autoComplete: "tel",
          required: true,
        },
        {
          key: "email",
          label: "Email",
          id: "email",
          type: "email",
          autoComplete: "email",
          required: true,
        },
        {
          key: "address",
          label: "Address",
          id: "address",
          type: "text",
          autoComplete: "street-address",
          required: true,
        },
      ],
    },
    {
      key: "password",
      title: "Set Password",
      fields: [
        {
          key: "password",
          label: "Password",
          id: "password",
          type: "password",
          autoComplete: "new-password",
          required: true,
        },
        {
          key: "confirmPassword",
          label: "Confirm Password",
          id: "confirm_password",
          type: "password",
          autoComplete: "new-password",
          required: true,
        },
      ],
    },
  ];