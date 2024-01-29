export default function Button(props: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const { onClick, children } = props;
  return (
    <button
      onClick={onClick}
      className="h-10 w-32 rounded-md bg-primary font-bold hover:bg-primary/90"
    >
      {children}
    </button>
  );
}
