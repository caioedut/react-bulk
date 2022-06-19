import React from 'react';
import { ImageProps as RNImageProps } from 'react-native';
declare const Image: React.ForwardRefExoticComponent<RNImageProps & import("@react-bulk/core/types").Bindings & import("@react-bulk/core/types").CustomStyles & {
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
    source: string | number | {
        uri: string;
    };
    mode?: "cover" | "contain" | "fill" | undefined;
    width?: string | number | undefined;
    height?: string | number | undefined;
} & React.RefAttributes<unknown>>;
export default Image;
