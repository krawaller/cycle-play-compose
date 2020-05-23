import { basicFactory } from "../../common/actions";

export const [enable, isEnableAction] = basicFactory("CONFBTN::ENABLE");
export const [disable, isDisableAction] = basicFactory("CONFBTN::DISABLE");
export const [maybe, isMaybeAction] = basicFactory("CONFBTN::MAYBE");
export const [cancel, isCancelAction] = basicFactory("CONFBTN::CANCEL");
export const [confirm, isConfirmAction] = basicFactory("CONFBTN::CONFIRM");

export type ConfirmButtonAction =
  | ReturnType<typeof enable>
  | ReturnType<typeof disable>
  | ReturnType<typeof maybe>
  | ReturnType<typeof cancel>
  | ReturnType<typeof confirm>;
