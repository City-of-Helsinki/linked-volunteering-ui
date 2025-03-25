import { useSelector } from 'react-redux';
import SubmittedPage from '../SubmittedPage';
import { submittedEventSelector } from '../../../../store/reducers/event';

const SubmittedPageContainer = () => {
  const submittedEvent = useSelector(submittedEventSelector);

  return <SubmittedPage submittedEvent={submittedEvent} />;
};

export default SubmittedPageContainer;
