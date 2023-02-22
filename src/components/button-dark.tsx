import classNames from 'classnames';

export default function ButtonDark(props: React.ComponentProps<'button'>) {
  const { children, className, ...otherProps } = props;

  return (
    <button
      className={classNames(
        'rounded-xl bg-zinc-800 p-4 font-sans text-white text-sm',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
