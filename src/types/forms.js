// @flow
// flowlint unclear-type:off

export type WithForm = {
  values: Object,
  errors: Object,
  touched: Object,
  dirty: Object,
  handleChange: Function,
  handleBlur: Function,
  isSubmitting?: boolean
};
