import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { LoadingSpinner as HdsLoadingSpinner } from 'hds-react';
import styled from 'styled-components';

import useHasNavigated from '../../hooks/useHasNavigated';
import { focusElement, isFocusLost } from '../../utils/focus';
import { announceLoading, finishLoading, startLoading } from './loadingStatus';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

// Full page loading spinner, centered in the viewport
function LoadingSpinner() {
  const intl = useIntl();
  const hasNavigated = useHasNavigated();
  const textRef = useRef<HTMLParagraphElement>(null);
  const movesFocusRef = useRef<boolean | undefined>(undefined);

  const loadingText = intl.formatMessage({ id: 'site.loading.text' });
  const loadingFinishedText = intl.formatMessage({
    id: 'site.loading.finished_text',
  });

  useEffect(() => {
    // Decided when the spinner is shown, so that a location change while it is
    // still shown (e.g. a redirect) doesn't change it.
    //
    // After a page change the spinner replaced the previous page and the
    // element that had focus. In a test with VoiceOver and Chrome, the live
    // region was not announced while focus was lost, so slow loading is made
    // known by moving focus to the loading text. The page that is shown next moves focus to its heading,
    // see Layout. When the app is opened, focus is not lost and slow loading
    // is announced through the live region.
    movesFocusRef.current ??= hasNavigated();

    const onSlow = movesFocusRef.current
      ? () => {
          if (textRef.current && isFocusLost()) {
            focusElement(textRef.current);
          }
        }
      : () => announceLoading(loadingText);

    startLoading(onSlow);

    return () => finishLoading(loadingFinishedText);
  }, [hasNavigated, loadingText, loadingFinishedText]);

  // The HDS texts are left empty, because its own live region is not announced
  // by screen readers. See loadingStatus.ts.
  return (
    <Wrapper>
      <HdsLoadingSpinner loadingText="" loadingFinishedText="" />
      <p ref={textRef} className="sr-only">
        {loadingText}
      </p>
    </Wrapper>
  );
}

export default LoadingSpinner;
