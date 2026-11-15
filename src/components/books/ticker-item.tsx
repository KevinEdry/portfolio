import TintedImage from "~/ui/tinted-image/tinted-image";

export default function TickerItem({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Show details for ${alt}`}
        className="cursor-pointer"
      >
        <TintedImage src={src} alt={alt} height={253} width={158} />
      </button>
    </li>
  );
}
