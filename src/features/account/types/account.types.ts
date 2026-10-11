export type Address = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; message: string };