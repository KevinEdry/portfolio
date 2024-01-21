import clsx from "clsx";
import Link from "next/link";

export default function MenuItem(props: {
    name: string;
    route: string;
    active: boolean;
}) {

    const { name, route, active} = props;

  return (
    <li className="flex-1 flex gap-1 h-full cursor-pointer">
        <Link href={route} className={clsx("[writing-mode:vertical-rl] rotate-180 transition-all hover:text-text/80", active ? "font-bold" : "")}>
            {name}
        </Link>

        {
            active ?
            <div className="w-[2px] h-auto bg-primary"></div>
            :
            <div className="w-[2px] h-auto bg-primary/0"></div>
        }
    </li>
  );
}



