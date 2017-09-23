import React, { Component } from 'react';
import InputMask from 'react-input-mask';

const DATE_FORMAT = 'MM/YY';

import MonthCalendar from './calendar';
import { valuesToMask, valuesFromMask } from './utils';

import './styles/index.css';

type OnChange = (maskedValue: string, year: number, month: number) => any;

export interface IProps {
  year?: number,
  month?: number,
  inputProps?: {
    name?: string,
    id?: string,
  },
  onChange?: OnChange,
};

export interface IState {
  year: void|number,
  month: void|number,
  inputValue: string,
  showCalendar: boolean,
};

class MonthPickerInput extends Component<IProps, IState> {
  wrapper: HTMLDivElement;
  input: { input: Element };

  public static defaultProps: Partial<IProps> = {
    inputProps: {}
  };

  constructor(props) {
    super(props);
    const { year, month } = this.props;
    let inputValue = '';

    if (typeof year == 'number' && typeof month == 'number') {
      inputValue = valuesToMask(month, year);
    }

    this.state = {
      year,
      month,
      inputValue,
      showCalendar: false
    }
  };

  onCalendarChange = (year, month): void => {
    const inputValue = valuesToMask(month, year);
    this.setState({ inputValue, year, month });
    this.onChange(inputValue, year, month);
  };

  onInputChange = (e: { target: { value: string }}): void => {
    const mask = e.target.value;

    if (mask.length && mask.indexOf('_') === -1) {
      const [month, year] = valuesFromMask(mask);
      const inputValue = valuesToMask(month, year);
      this.setState({ year, month, inputValue });
      this.onChange(inputValue, year, month);
    } else this.setState({ inputValue: mask });
  };

  onChange = (inputValue, year, month) => {
    if (this.props.onChange) {
      this.props.onChange(inputValue, year, month);
    }
  };

  onInputBlur = (e): void => {
    if (!this.wrapper.contains(e.target)) {
      this.setState({ showCalendar: false })
    }
  };

  onInputFocus = (e): void => {
    if (this.wrapper.contains(e.target)) {
      this.setState({ showCalendar: true });
    }
  };

  onCalendarOutsideClick = (e): void => {
    this.setState({ showCalendar: this.input.input == e.target });
  };

  calendar = (): JSX.Element => {
    const { year, month } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        <MonthCalendar
          year={year}
          month={month}
          onChange={this.onCalendarChange}
          onOutsideClick={this.onCalendarOutsideClick}
        />
      </div>
    )
  };

  inputProps = (): object => {
    return Object.assign({}, {
      ref: input => { if(input) this.input = input; },
      mask: "99/99",
      placeholder: DATE_FORMAT,
      className: "calendar-input-field",
      type: 'text',
      onBlur: this.onInputBlur,
      onFocus: this.onInputFocus,
      onChange: this.onInputChange,
    }, this.props.inputProps)
  };

  render() {
    const { inputValue, showCalendar } = this.state;

    return (
      <div className="calendar-input-wrapper" ref={wrap => { if(wrap) this.wrapper = wrap; }}>
        <InputMask
          value={inputValue}
          {...this.inputProps()}
        />

        { showCalendar && this.calendar() }
      </div>
    );
  };
};

export default MonthPickerInput;
