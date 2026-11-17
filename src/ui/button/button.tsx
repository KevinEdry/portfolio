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
        "h-11 cursor-pointer whitespace-nowrap rounded-full px-6 font-bold transition-all duration-200 lg:px-8",
        type === "solid" &&
          "bg-primary text-background shadow-lg shadow-primary/25 hover:bg-primary/90",
        type === "outline" && "glass text-primary hover:bg-white/75",
      )}
    >
      {children}
    </button>
  );
}
