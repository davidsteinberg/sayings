import "./Arrows.css";
import { useEffect, useState } from "react";

type ArrowLoadState = null | "loaded" | "errored";

type ArrowParameters = {
  disabled: boolean;
  onPointerUp: VoidFunction;
};

const Arrow = (
  p: ArrowParameters & {
    direction: "Back" | "Forward";
    onTransitionEnd: VoidFunction;
  }
) => {
  const { direction, disabled, onTransitionEnd, onPointerUp } = p;
  const [loadState, setLoadState] = useState<ArrowLoadState>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // Consider errors a transition end,
    // since we won't get a load-caused transition end event
    if (loadState === "errored") {
      onTransitionEnd();
    }
  }, [loadState, onTransitionEnd]);

  return (
    <div
      className={`Arrow ${direction.toLowerCase()} ${loadState} ${
        disabled ? "disabled" : ""
      } ${pressed ? "pressed" : ""}`}
    >
      <div
        className="img-container"
        onTransitionEnd={onTransitionEnd}
        onPointerDown={disabled ? undefined : () => setPressed(true)}
        onPointerUp={
          disabled
            ? undefined
            : () => {
                setPressed(false);
                onPointerUp();
              }
        }
      >
        <img
          alt={direction}
          src="img/arrow.png"
          onLoad={() => setLoadState("loaded")}
          onError={(event) => {
            console.error(event);
            setLoadState("errored");
          }}
        />
      </div>
    </div>
  );
};

const Arrows = (p: {
  back: ArrowParameters;
  forward: ArrowParameters;
  onTransitionEnd: VoidFunction;
}) => {
  const { onTransitionEnd } = p;
  const [backTransitionEnded, setBackTransitionEnded] = useState(false);
  const [forwardTransitionEnded, setForwardTransitionEnded] = useState(false);

  useEffect(() => {
    // Complete transition when both arrows have transitioned
    if (backTransitionEnded && forwardTransitionEnded) {
      onTransitionEnd();
    }
  }, [backTransitionEnded, forwardTransitionEnded, onTransitionEnd]);

  return (
    <div className="Arrows">
      <Arrow
        {...p.back}
        direction="Back"
        onTransitionEnd={() => setBackTransitionEnded(true)}
      ></Arrow>
      <Arrow
        {...p.forward}
        direction="Forward"
        onTransitionEnd={() => setForwardTransitionEnded(true)}
      ></Arrow>
    </div>
  );
};

export default Arrows;
