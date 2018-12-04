// @flow
// flowlint unclear-type:off

export type WithForm<T> = {
  values: T,
  errors: T,
  touched: T,
  dirty: T,
  handleChange?: Function,
  handleBlur?: Function,
  handleSubmit?: Function,
  handleReset?: Function,
  isSubmitting?: boolean
};
