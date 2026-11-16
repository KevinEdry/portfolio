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
        "h-11 cursor-pointer rounded-full px-8 font-bold transition-all duration-200",
        type === "solid" &&
          "bg-primary text-background shadow-lg shadow-primary/25 hover:bg-primary/90",
        type === "outline" && "glass text-primary hover:bg-white/10",
      )}
    >
      {children}
    </button>
  );
}
