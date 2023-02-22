import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/select.module.css';
import classNames from 'classnames';

type SelectProps = React.ComponentProps<'select'> & {
  selectedClassName?: string;
  optionClassName?: string;
  optionsContainerClassName?: string;
  placeholderClassName?: string;
  renderSelectedContent?: (text: string, hidden: boolean) => React.ReactNode;
};

export default function Select(props: SelectProps) {
  const getInstanceId = () => `select-${Math.floor(Math.random() * 10000000)}`;
  const [id, setId] = useState<string>();
  const [hidden, setHidden] = useState(true);
  const selectRef = useRef<HTMLSelectElement>(null);
  const {
    children,
    value,
    placeholder,
    className,
    selectedClassName,
    optionClassName,
    optionsContainerClassName,
    placeholderClassName,
    renderSelectedContent,
    ...otherProps
  } = props;
  const validChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return child as React.ReactComponentElement<'option'>;
    }
  });

  const selected = React.Children.toArray(validChildren).find(
    (child: any) => child.props.value === value,
  );

  const text =
    (selected as React.ReactComponentElement<'option'>)?.props.children ??
    placeholder;

  const onClick = (optionIndex: number) => {
    if (selectRef.current) {
      selectRef.current.selectedIndex = optionIndex;
      const event = new Event('change', { bubbles: true });
      selectRef.current.dispatchEvent(event);
      setHidden(true);
    }
  };

  useEffect(() => {
    if (!id) {
      setId(getInstanceId());
    }
  }, [id, setId]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`#${id}`)) {
        setHidden(true);
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [setHidden, id]);

  return (
    <div className={classNames(styles.select, className)} id={id}>
      <select value={value} {...otherProps} ref={selectRef}>
        {children}
      </select>

      <div
        className={classNames(styles.selected, selectedClassName, {
          [placeholderClassName ?? '']: !value,
        })}
        onClick={() => setHidden(!hidden)}
      >
        {renderSelectedContent
          ? renderSelectedContent(String(text), hidden)
          : text}
      </div>

      <div
        className={classNames(styles.container, optionsContainerClassName, {
          [styles.hidden]: hidden,
        })}
      >
        {React.Children.map(validChildren, (child, idx) => (
          <div
            className={classNames(styles.option, optionClassName)}
            key={child?.props?.value as string}
            onClick={() => onClick(idx)}
          >
            {child?.props.children}
          </div>
        ))}
      </div>
    </div>
  );
}
