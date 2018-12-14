// @flow
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as modals from './modals';
import IntlComponent from '../common/IntlComponent';

type Props = {
  isOpen: boolean,
  modal: string,
  meta: any,
  closeModal: Function,
  dispatch: Function
};

export default ({ isOpen, closeModal, modal, meta, dispatch }: Props) => {
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
            <IntlComponent
              key={intl}
              Component={Button}
              onClick={() => {
                closeModal();
                if (typeof action === 'function') {
                  action(dispatch, meta);
                }
              }}
              id={intl}
              values={meta}
              color={color}
            />
          ))}
        </ModalFooter>
      )}
    </Modal>
  );
};
