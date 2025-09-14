declare module "react-native-vector-icons/Ionicons" {
  import React from "react";
  import { TextProps } from "react-native";

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class Ionicons extends React.Component<IconProps> { }
}

declare module "react-native-vector-icons/FontAwesome" {
  import React from "react";
  import { TextProps } from "react-native";

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class FontAwesome extends React.Component<IconProps> { }
}

declare module "react-native-vector-icons/MaterialIcons" {
  import React from "react";
  import { TextProps } from "react-native";

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class MaterialIcons extends React.Component<IconProps> { }
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}