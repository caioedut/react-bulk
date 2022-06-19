import React from 'react';
import { RefreshControlProps, ScrollViewProps } from 'react-native';
declare const Scrollable: React.ForwardRefExoticComponent<ScrollViewProps & RefreshControlProps & import("@react-bulk/core/types").Bindings & import("@react-bulk/core/types").CustomStyles & {
    component?: any;
    className?: any;
    children?: React.ReactNode;
    style?: (React.CSSProperties & import("@react-bulk/core/types").CustomStyles) | undefined;
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
} & {
    horizontal?: boolean | undefined;
} & {
    refreshing?: boolean | undefined;
    refreshControl?: any;
} & React.RefAttributes<unknown>>;
export default Scrollable;
