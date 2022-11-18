// Generated by https://github.com/foxglove/schemas

import { Color } from "./Color";
import { Pose } from "./Pose";

/** A primitive representing a text label */
export type TextPrimitive = {
  /** Position of the center of the text box and orientation of the text. Identity orientation means the text is oriented in the xy-plane and flows from -x to +x. */
  pose: Pose;

  /** Whether the text should respect `pose.orientation` (false) or always face the camera (true) */
  billboard: boolean;

  /** Font size (height of one line of text) */
  font_size: number;

  /** Indicates whether `font_size` is a fixed size in screen pixels (true), or specified in world coordinates and scales with distance from the camera (false) */
  scale_invariant: boolean;

  /** Color of the text */
  color: Color;

  /** Text */
  text: string;
};
