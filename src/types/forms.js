// @flow

export type CustomEvent<T> = {
  target: {
    id?: string,
    name?: string,
    value: T
  }
};

export type handleEvent<T> = (
  CustomEvent<T> | SyntheticEvent<HTMLButtonElement | HTMLInputElement | HTMLSelectElement>
) => void;

export type WithForm<T> = {
  values: T,
  errors: T,
  touched: T,
  dirty: T,
  // flowlint-next-line unclear-type:off
  handleChange?: handleEvent<any>,
  // flowlint-next-line unclear-type:off
  handleBlur?: handleEvent<any>,
  // flowlint-next-line unclear-type:off
  handleSubmit?: handleEvent<any>,
  // flowlint-next-line unclear-type:off
  handleReset?: handleEvent<any>,
  isSubmitting?: boolean
};
