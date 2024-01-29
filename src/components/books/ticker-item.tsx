import TintedImage from "~/ui/tinted-image/tinted-image";

export default function TickerItem({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <li key={index}>
      <TintedImage src={src} alt={alt} height={253} width={158} />
    </li>
  );
}
