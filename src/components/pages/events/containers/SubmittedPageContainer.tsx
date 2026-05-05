import { useAppSelector } from '../../../../store/hooks';
import SubmittedPage from '../SubmittedPage';
import { submittedEventSelector } from '../../../../store/reducers/event';

const SubmittedPageContainer = () => {
  const submittedEvent = useAppSelector(submittedEventSelector);

  return <SubmittedPage submittedEvent={submittedEvent} />;
};

export default SubmittedPageContainer;
