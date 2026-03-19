"use client";

import { PatternLines as VisxPatternLines } from "@visx/pattern";
import type { PatternLinesProps as VisxPatternLinesProps } from "@visx/pattern";

export interface PatternLinesProps extends Omit<VisxPatternLinesProps, "id"> {
  id: string;
}

export function PatternLines({ id, ...props }: PatternLinesProps) {
  return (
    <VisxPatternLines
      id={id}
      {...props}
    />
  );
}

PatternLines.displayName = "PatternLines";

export default PatternLines;
