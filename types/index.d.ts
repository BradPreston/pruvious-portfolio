import type { Icon } from "~/.pruvious";
import type { ButtonVariant } from "~/lib/button-subfields";

declare type IButton = {
  icon?: Icon;
  href?: string;
  target?: "_blank" | "_self";
  variant?: ButtonVariant;
};

export { IButton };
declare global {
}
