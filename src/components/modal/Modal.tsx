import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as modals from './modals';
import IntlComponent from '../common/IntlComponent';
import Button from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModal, modalSelector } from '../../store/reducers/modal';

export default () => {
  const dispatch = useAppDispatch();
  const { isOpen, modal, meta } = useAppSelector(modalSelector);

  if (!isOpen || !modal) {
    return null;
  }
  const { header, Body, footer } = modals[modal];

  return (
    <Modal isOpen={isOpen} toggle={() => dispatch(closeModal())} backdrop>
      {header && <IntlComponent Component={ModalHeader} id={header} values={meta} />}
      <ModalBody>{Body && <Body values={meta} />}</ModalBody>
      {footer && (
        <ModalFooter>
          {footer.map(({ intl, color, action }) => (
            <Button
              key={intl}
              onClick={() => {
                dispatch(closeModal());
                if (typeof action === 'function') {
                  action(dispatch, meta);
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
