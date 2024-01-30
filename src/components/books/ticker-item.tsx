import TintedImage from "~/ui/tinted-image/tinted-image";

export default function TickerItem({
  src,
  alt,
  index,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  onClick?: () => void;
}) {
  return (
    <li key={index} onClick={onClick}>
      <TintedImage src={src} alt={alt} height={253} width={158} />
    </li>
  );
}
