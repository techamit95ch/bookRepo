import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAll } from '../actions/books';
import { Book } from '../interfaces';

// import yelp from '../api/yelp'
export default () => {
  const dispatch = useDispatch();
  const [filterAuthor, setFilterAuthor] = useState('All');

  const [results, setResults] = useState<any>([]);
  const [error, setError] = useState('');

  const books = useSelector((state: any) => state.books);
  const searchAuthor = (SearchTerm: string) => {
    try {
      if (SearchTerm === 'All' || SearchTerm === '') setResults(books);
      else {
        let arr: any[] = [];
        books?.forEach((book: any) =>
          SearchTerm === book.author ? arr.push(book) : null
        );
        setResults(arr);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };
  useEffect(() => {
    searchAuthor(filterAuthor);
  }, [dispatch, results]);

  return [searchAuthor, results, filterAuthor, setFilterAuthor];
};
