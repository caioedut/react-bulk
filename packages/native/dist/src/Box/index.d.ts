/// <reference types="react" />
import { ViewProps } from 'react-native';
declare const Box: import("react").ForwardRefExoticComponent<ViewProps & import("@react-bulk/core/types").Bindings & import("@react-bulk/core/types").CustomStyles & {
    component?: any;
    className?: any;
    children?: import("react").ReactNode;
    style?: (import("react").CSSProperties & import("@react-bulk/core/types").CustomStyles) | undefined;
    flexbox?: boolean | "flex" | "flex-inline" | undefined;
    direction?: "row" | "row-reverse" | "column" | "column-reverse" | undefined;
    wrap?: boolean | "nowrap" | "wrap" | "wrap-reverse" | undefined;
    flow?: string | undefined;
    justifyContent?: import("@react-bulk/core/types").FlexAlign | undefined;
    alignContent?: import("@react-bulk/core/types").FlexAlign | undefined;
    justifyItems?: import("@react-bulk/core/types").FlexAlign | undefined;
    alignItems?: import("@react-bulk/core/types").FlexAlign | undefined;
    center?: boolean | undefined;
    gap?: number | boolean | undefined;
    flex?: boolean | undefined;
    order?: number | undefined;
    grow?: number | undefined;
    shrink?: number | undefined;
    basis?: string | number | undefined;
    align?: import("@react-bulk/core/types").FlexAlign | undefined;
    justify?: import("@react-bulk/core/types").FlexAlign | undefined;
} & import("react").RefAttributes<unknown>>;
export default Box;
