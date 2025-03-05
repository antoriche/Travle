/* eslint-disable -- file copied from another project */
import React, { FC, useEffect, useMemo, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { useResizeDetector } from "react-resize-detector";
import * as d3 from "d3";

type Props = {
  options: Plot.PlotOptions;
  fit?: boolean;
  fit_ratio?: number;
  style?: React.CSSProperties;
  transform?: <T extends d3.Selection<SVGSVGElement, unknown, null, undefined>>(elt: T) => void;
};

const PlotFigure: FC<Props> = ({ options: options_, style, fit, transform, fit_ratio }) => {
  const latestKnownDimensions = useRef<{
    width: number;
    height: number;
  }>();
  const { ref, width = latestKnownDimensions.current?.width, height = latestKnownDimensions.current?.height } = useResizeDetector();
  const options = useMemo(
    () => ({
      ...options_,
      width: fit ? options_.width ?? width : options_.width,
      height: fit ? (fit_ratio ? (options_.width ?? width ?? 0) * fit_ratio : options_.height ?? height) : options_.height,
    }),
    [options_, width, height, fit],
  );

  useEffect(() => {
    if (width && height) latestKnownDimensions.current = { width, height };
    const plot = Plot.plot(options);
    const element = ref.current;
    if (element) {
      const child = element.children[0];
      if (child) {
        child.remove();
      }

      if (transform) {
        transform(d3.select(plot as SVGSVGElement));
      }

      element.appendChild(plot);
    }
  }, [ref, options, width, height, transform]);

  return (
    <div
      key={JSON.stringify({
        options_,
      })}
      style={style}
      ref={ref}
    />
  );
};

export default PlotFigure;
