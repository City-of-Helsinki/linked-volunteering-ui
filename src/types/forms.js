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
  errors: $ObjMap<$Shape<T>, (mixed) => string>,
  touched: $ObjMap<$Shape<T>, (mixed) => boolean>,
  dirty: boolean,
  handleChange?: handleEvent<mixed>,
  handleBlur?: handleEvent<mixed>,
  handleSubmit?: handleEvent<mixed, HTMLButtonElement>,
  handleReset?: handleEvent<mixed, HTMLButtonElement>,
  isSubmitting?: boolean
};
