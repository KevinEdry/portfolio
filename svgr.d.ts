// Typings for SVGR svg icons

declare module "*.svg" {
    import { IconComponentType } from "@/ui/Icon/IconComponentType";
    export const ReactComponent: IconComponentType;
  }
  
  declare module "*.svg?url" {
    const img: string;
    // eslint-disable-next-line import/no-default-export
    export default img;
  }