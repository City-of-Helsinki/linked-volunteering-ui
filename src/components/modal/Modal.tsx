import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as modals from './modals';
import IntlComponent from '../common/IntlComponent';
import Button from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModal, modalSelector } from '../../store/reducers/modal';
import { ModalMeta } from '../../types';
import { Event } from '../../store/types';

export const ModalComponent = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modal, meta } = useAppSelector(modalSelector);

  if (!isOpen || !modal) {
    return null;
  }

  const { header, Body, footer } = modals[modal];
  const typedMeta = meta as ModalMeta;

  return (
    <Modal isOpen={isOpen} toggle={() => dispatch(closeModal())} backdrop>
      {header && (
        <IntlComponent
          Component={ModalHeader}
          id={header}
          values={typedMeta as Record<string, React.ReactNode>}
        />
      )}
      <ModalBody>{Body && <Body values={typedMeta} />}</ModalBody>
      {footer && (
        <ModalFooter>
          {footer.map(({ intl, color, action }) => (
            <Button
              key={intl}
              onClick={() => {
                dispatch(closeModal());
                if (typeof action === 'function' && typedMeta.event) {
                  action(dispatch, {
                    event: typedMeta.event as unknown as Event,
                    apiAccessToken: typedMeta.apiAccessToken,
                  });
                }
              }}
              translate={intl}
              values={
                typedMeta as unknown as Record<
                  string,
                  string | number | boolean | Date
                >
              }
              color={color}
            />
          ))}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ModalComponent;
