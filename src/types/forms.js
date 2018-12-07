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
  errors: $ObjMap<$Shape<T>, (mixed) => string>,
  touched: $ObjMap<$Shape<T>, (mixed) => boolean>,
  dirty: $ObjMap<$Shape<T>, (mixed) => boolean>,
  handleChange?: handleEvent<mixed>,
  handleBlur?: handleEvent<mixed>,
  handleSubmit?: handleEvent<mixed>,
  handleReset?: handleEvent<mixed>,
  isSubmitting?: boolean
};
