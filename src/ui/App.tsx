import "./App.css";
import About from "./About";
import Arrows from "./Arrows";
import Quote from "./Quote";
import Title from "./Title";
import getSayingsMetadata from "../util/getSayingsMetadata";
import makeGenerator from "../util/makeGenerator";
import randomInt from "../util/randomInt";
import { useEffect, useState } from "react";

type Generator = ReturnType<typeof makeGenerator>;

const App = () => {
  // State
  const [aboutHidden, setAboutHidden] = useState(true);
  const [arrowsTransitionEnded, setArrowsTransitionEnded] = useState(false);
  const [generator, setGenerator] = useState<Generator | null>(null);
  const [index, setIndex] = useState(-1);
  const [sayings, setSayings] = useState<string[]>([]);

  // Title or quote showing
  const showTitle = index === -1;
  const content = showTitle ? (
    <Title arrowsTransitionEnded={arrowsTransitionEnded}></Title>
  ) : (
    <Quote text={sayings[index]}></Quote>
  );

  // Arrow functionality
  const back = {
    disabled: showTitle,
    onPointerUp() {
      setIndex(index - 1);
    },
  };

  const forward = {
    disabled: generator === null,
    onPointerUp() {
      if (index === sayings.length - 1) {
        let saying: string;
        try {
          saying = generator!.next().value;
        } catch (error) {
          console.error(error);
          saying = "Uh oh, something went wrong! Please reload the page";
        }
        setSayings([...sayings, saying]);
      }

      setIndex(index + 1);
    },
  };

  // Event handlers
  const onArrowsTransitionEnd = () => setArrowsTransitionEnded(true);
  const toggleAbout = () => setAboutHidden(!aboutHidden);

  // Set up generator
  useEffect(() => {
    if (generator === null) {
      getSayingsMetadata().then((metadata) => {
        const newGenerator = makeGenerator({
          metadata,
          randomInt,
        });

        setGenerator(newGenerator);
      });
    }
  }, [generator]);

  return (
    <div className="App">
      <div className={`content ${aboutHidden ? "" : "hidden"}`}>
        {content}
        <Arrows
          back={back}
          forward={forward}
          onTransitionEnd={onArrowsTransitionEnd}
        ></Arrows>
      </div>
      <About hidden={aboutHidden}></About>
      <div className="toggle" onPointerUp={toggleAbout}>
        {aboutHidden ? "=" : "x"}
      </div>
    </div>
  );
};

export default App;
