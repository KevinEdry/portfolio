import clsx from "clsx";

export default function Button(props: {
  type: "solid" | "outline";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const { type, onClick, children } = props;
  return (
    <button
      onClick={onClick}
      className={clsx(
        "h-10 rounded-md  px-10 font-bold transition-all hover:bg-primary/90",
        type === "solid" && "bg-primary",
        type === "outline" && "border border-primary",
      )}
    >
      {children}
    </button>
  );
}
