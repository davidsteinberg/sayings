import "./Title.css";

const Title = (p: { arrowsTransitionEnded: boolean }) => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion)").matches;
  const showPrompt = reduceMotion || p.arrowsTransitionEnded;

  return (
    <div className="Title">
      <div className="top">
        <div className="name">As they say&hellip;</div>
      </div>
      <div className="bottom">
        <div className={`prompt ${showPrompt ? "" : "hidden"}`}>
          Tap hands to navigate
        </div>
      </div>
    </div>
  );
};

export default Title;
