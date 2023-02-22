import classNames from 'classnames';

export default function ButtonWithIcon(props: React.ComponentProps<'button'>) {
  const { children, className, ...otherProps } = props;
  return (
    <button
      {...otherProps}
      className={classNames(
        'rounded-xl py-3 px-[1.065rem] bg-white text-neutral-900',
        className,
      )}
    >
      {children}
    </button>
  );
}
