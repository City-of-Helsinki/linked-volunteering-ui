import { addMinutes, isEqual, isSameDay, startOfDay } from 'date-fns';
import React from 'react';
import { useIntl } from 'react-intl';
import { FormFeedback, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';

import InstructionText from '../InstructionText';
import Label from '../Label';
import ListItem from './ListItem';

import formatTime from '../../../../utils/formatTime';

const Triangle = styled.div`
  position: absolute;
  border: 8px solid transparent;
  height: 0;
  width: 1px;
  margin-top: -16px;
  left: 42px;
  border-bottom-color: #f0f0f0;

  &:before {
    content: '';
    z-index: -1;
    border-width: 8px;
    left: -8px;
    top: -9px;
    position: absolute;
    border: 8px solid transparent;
    height: 0;
    width: 1px;
    border-bottom-color: #aeaeae;
  }
`;
const DropdownMenu = styled.div`
  background: white;
  position: absolute;
  margin-top: 0.5rem;
  z-index: 5000;
  width: 6.5rem;
  border: 1px solid #aeaeae;
  border-radius: 0.3rem;
`;

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 15rem;
`;

const DateList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TimeCaption = styled.div`
  text-align: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #aeaeae;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  position: relative;
`;

interface Props {
  defaultDate?: Date;
  error?: any;
  id: string;
  label?: string;
  onChange: Function;
  placeholder?: string;
  required?: boolean;
  selected: Date | null | undefined;
  text?: string;
  timeCaption: string;
  timeFormat: string;
  timeIntervals: number;
  touched: boolean;
}

const TimePicker: React.FC<Props> = ({
  defaultDate,
  error,
  id,
  label,
  onChange,
  placeholder,
  required,
  selected,
  text,
  timeCaption,
  timeFormat,
  timeIntervals,
  touched,
}) => {
  const container = React.useRef<HTMLDivElement | null>(null);
  const listWrapper = React.useRef<HTMLDivElement | null>(null);
  const intl = useIntl();
  const { formatMessage, locale } = intl;
  const [focusedOption, setFocusedOption] = React.useState(-1);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const timeOptions: Date[] = React.useMemo(() => {
    const defaultDay = defaultDate ? startOfDay(defaultDate) : startOfDay(new Date());
    const startDay = selected ? startOfDay(selected) : defaultDay;
    let day = startDay;
    const options: Date[] = [];

    while (isSameDay(day, startDay)) {
      options.push(day);
      day = addMinutes(day, timeIntervals);
    }

    return options;
  }, [defaultDate, selected, timeIntervals]);

  const selectedIndex = React.useMemo(() => {
    return selected ? timeOptions.findIndex((option) => isEqual(option, selected)) : -1;
  }, [selected, timeOptions]);

  const isComponentFocused = () => {
    const active = document.activeElement;
    const current = container && container.current;

    return current && active instanceof Node && current.contains(active);
  };

  const onDocumentClick = (event: FocusEvent) => {
    const { target } = event;
    const current = container && container.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const openMenu = () => {
    if (!isMenuOpen) {
      setFocusedOption(selectedIndex);
      setIsMenuOpen(true);
    }
  };

  const onDocumentFocusin = (event: FocusEvent) => {
    const { target } = event;
    const current = container && container.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    } else {
      openMenu();
    }
  };

  const focusOptionUp = () => {
    setFocusedOption(focusedOption > 0 ? focusedOption - 1 : 0);
  };

  const focusOptionDown = () => {
    setFocusedOption(
      focusedOption < timeOptions.length - 1 ? focusedOption + 1 : timeOptions.length - 1,
    );
  };

  const handleChange = (date: Date) => {
    onChange(date);
    setIsMenuOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    // Handle keyboard events only if current element is focused
    if (!isComponentFocused()) return;

    switch (event.key) {
      case 'ArrowUp':
        if (isMenuOpen) {
          focusOptionUp();
        } else {
          openMenu();
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (isMenuOpen) {
          focusOptionDown();
        } else {
          openMenu();
        }
        event.preventDefault();
        break;
      case 'Escape':
        setIsMenuOpen(false);
        event.preventDefault();
        break;
      case 'Enter':
        if (timeOptions[focusedOption]) {
          handleChange(timeOptions[focusedOption]);
        }
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('focusin', onDocumentFocusin);
    document.addEventListener('keydown', onKeyDown);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('focusin', onDocumentFocusin);
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  React.useEffect(() => {
    // Scroll to the middle of menu when time is not selected
    if (isMenuOpen && selectedIndex === -1) {
      const scrollHeight = (listWrapper.current && listWrapper.current.scrollHeight) || 0;
      const height = (listWrapper.current && listWrapper.current.offsetHeight) || 0;

      if (listWrapper.current) {
        listWrapper.current.scrollTop = (scrollHeight - height) / 2;
      }
    }
  }, [isMenuOpen, selectedIndex]);

  return (
    <FormGroup>
      {label && (
        <Label htmlFor={id} required={required}>
          {formatMessage({ id: label })}
        </Label>
      )}
      {text && <InstructionText text={text} />}
      <div ref={container}>
        <Input
          id={id}
          invalid={!!error && touched}
          onChange={() => {}}
          placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
          value={selected ? formatTime(selected, timeFormat, locale) : ''}
        />
        {isMenuOpen && (
          <DropdownMenu>
            <Triangle />
            <TimeCaption>{timeCaption}</TimeCaption>
            <ListWrapper ref={listWrapper}>
              <DateList role="listbox">
                {timeOptions.map((option, index) => {
                  return (
                    <ListItem
                      key={option.getMilliseconds as any}
                      container={listWrapper}
                      date={option}
                      id={`${id}--item_${index}`}
                      isFocused={focusedOption === index}
                      isSelected={!!selected && isEqual(option, selected)}
                      locale={locale}
                      onClick={handleChange}
                      timeFormat={timeFormat}
                    />
                  );
                })}
              </DateList>
            </ListWrapper>
          </DropdownMenu>
        )}
      </div>
      <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    </FormGroup>
  );
};

export default TimePicker;
