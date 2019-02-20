import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as modals from './modals';
import IntlComponent from '../common/IntlComponent';
import Button from '../common/Button';

export default ({ isOpen, closeModal, modal, meta, dispatch, accessToken }) => {
  if (!isOpen) {
    return null;
  }
  const { header, Body, footer } = modals[modal];

  return (
    <Modal isOpen={isOpen} toggle={closeModal} backdrop={true}>
      {header && (
        <IntlComponent Component={ModalHeader} toggle={closeModal} id={header} values={meta} />
      )}
      <ModalBody>{Body && <Body values={meta} />}</ModalBody>
      {footer && (
        <ModalFooter>
          {footer.map(({ intl, color, action }) => (
            <Button
              key={intl}
              onClick={() => {
                closeModal();
                if (typeof action === 'function') {
                  action(dispatch, meta, accessToken);
                }
              }}
              translate={intl}
              values={meta}
              color={color}
            />
          ))}
        </ModalFooter>
      )}
    </Modal>
  );
};
