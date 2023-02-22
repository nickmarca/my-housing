import classNames from 'classnames';

export default function ButtonOutlined(props: React.ComponentProps<'button'>) {
  const { className, children, ...otherProps } = props;
  return (
    <button
      className={classNames(
        'text-white font-sans bg-transparent p-3 border border-gray-200 rounded-xl text-sm',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
