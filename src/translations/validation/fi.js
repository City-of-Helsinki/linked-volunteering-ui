const types = {
  number: 'numero'
};

export default {
  mixed: {
    required: 'Pakollinen kenttä!',
    notType: ({ type }) => `Kentän tulee olla ${types[type]}!`
  },
  string: {
    matches: 'Kenttä tulee olla tietyssä muodossa!',
    email: 'Kentän tulee olla sähköpostiosoite!'
  }
};
