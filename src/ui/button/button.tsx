export default function Button(props: {
  onClick?: (e: React.MouseEventHandler<HTMLButtonElement>) => {
    //This is empty because this will be implemented by the user of this component
  };
  children: React.ReactNode;
}) {
  const { onClick, children } = props;
  return (
    <button className="h-10 w-32 rounded-md bg-primary font-bold hover:bg-primary/90">
      {children}
    </button>
  );
}
