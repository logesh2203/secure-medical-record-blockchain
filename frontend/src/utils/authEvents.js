export const UNAUTHORIZED_EVENT = "app:unauthorized";

export const emitUnauthorized = () => {
  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
};
