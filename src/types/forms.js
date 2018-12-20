// @flow

export type CustomEvent<T> = {
  target: {
    id?: string,
    name?: string,
    value: T
  }
};

export type handleEvent<T, V = HTMLInputElement | HTMLSelectElement> = (
  CustomEvent<T> | SyntheticEvent<V>
) => void;

export type WithForm<T> = {
  values: T,
  errors: $Shape<T>,
  touched: $Shape<T>,
  dirty: $Shape<T>,
  handleChange?: handleEvent<mixed>,
  handleBlur?: handleEvent<mixed>,
  handleSubmit?: handleEvent<mixed, HTMLButtonElement>,
  handleReset?: handleEvent<mixed, HTMLButtonElement>,
  isSubmitting?: boolean
};
