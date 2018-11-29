export default {
  mixed: {
    required: 'form.validation.mixed.required',
    notType: ({ type }) => `form.validation.mixed.not.${type}`
  },
  string: {
    matches: 'form.validation.string.matches',
    email: 'form.validation.string.email'
  }
};
