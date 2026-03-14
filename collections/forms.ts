import { defineCollection } from "~/.pruvious";

export default defineCollection({
  name: "forms",
  mode: "multi",
  fields: {
    name: {
      type: "text",
      options: {
        required: true,
      },
    },
    fields: {
      type: "repeater",
      options: {
        required: true,
        subfields: {
          type: {
            type: "select",
            options: {
              required: true,
              choices: {
                text: "Text",
                textarea: "Textarea",
                number: "Number",
                tel: "Phone",
                email: "Email",
                url: "URL",
                password: "Password",
                date: "Date",
                checkbox: "Checkbox",
              },
            },
          },
          required: {
            type: "checkbox",
            options: {
              required: false,
            },
          },
          label: {
            type: "text",
            options: {
              required: true,
            },
          },
          placeholder: {
            type: "text",
            options: {
              required: false,
            },
          },
          width: {
            type: "select",
            options: {
              required: true,
              choices: {
                quarter: "Quarter",
                third: "Third",
                half: "Half",
                full: "Full",
              },
            },
          },
        },
      },
    },
    submitText: {
      type: "text",
      options: {
        default: "Submit",
      },
    },
  },
});
