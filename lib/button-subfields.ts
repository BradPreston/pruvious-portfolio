import { checkboxField, linkField, selectField, textField } from "#pruvious";

export const buttonVariantChoices = {
  primary: "Primary",
  outline: "Outline",
  link: "Link",
} as const;

export type ButtonVariant = keyof typeof buttonVariantChoices;

export const buttonSubfields = {
  link: linkField({ required: true }),
  title: textField({ required: true }),
  variant: selectField({
    choices: buttonVariantChoices,
    default: "primary",
    required: true,
  }),
  newTab: checkboxField({
    default: false,
  }),
};
