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
  handleChange?: handleEvent<mixed>,
  handleBlur?: handleEvent<mixed>,
  handleSubmit?: handleEvent<mixed>,
  handleReset?: handleEvent<mixed>,
  isSubmitting?: boolean
};
