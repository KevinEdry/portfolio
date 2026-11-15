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
        "h-10 cursor-pointer rounded-md px-8 font-bold transition-colors duration-200",
        type === "solid" && "bg-primary text-background hover:bg-primary/90",
        type === "outline" &&
          "border border-primary text-primary hover:bg-primary/10",
      )}
    >
      {children}
    </button>
  );
}
