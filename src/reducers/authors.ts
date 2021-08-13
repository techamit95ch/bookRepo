export default (authors: string[] = [], action: any) => {
  switch (action.type) {
    case 'GET_AUTHORS':
      return action.payload;
    case 'CREATE_AUTHOR':
      return [...authors, action.payload];
    default:
      return authors;
  }
};
