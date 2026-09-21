import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function Brand({ light }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap text-[19px] font-bold tracking-[-.02em]" aria-label="CP Atlas home">
      <Icon name="logo" className={cn("size-[30px]", light ? "text-white" : "text-forest")} />
      <span>CP Atlas</span>
    </a>
  );
}
