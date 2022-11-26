import "./About.css";
import { useEffect, useRef } from "react";

const About = (p: { hidden: boolean }) => {
  const { hidden } = p;
  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => ref.current?.scrollTo({ top: 0 });
  const onTransitionEnd = () => {
    if (hidden) {
      scrollToTop();
    }
  };

  useEffect(() => {
    if (!hidden) {
      // Scroll to top when showing, if reduced motion,
      // since there won't be a transition end event
      if (window.matchMedia("(prefers-reduced-motion)").matches) {
        scrollToTop();
      }
    }
  }, [hidden]);

  return (
    <div
      ref={ref}
      className={`About ${hidden ? "hidden" : ""}`}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="header">About</div>
      <div className="text">
        <p>
          <span className="title">As they say</span> is a random saying
          generator based on sayings from:
        </p>
        <ul>
          <li>
            <a href="https://en.wikipedia.org/wiki/List_of_proverbial_phrases">
              Wikipedia&rsquo;s list of proverbial phrases
            </a>
          </li>
          <li>
            <a href="https://en.wikiquote.org/wiki/English_proverbs">
              Wikiquote&rsquo;s English proverbs
            </a>
          </li>
          <li>
            <a href="https://en.wikiquote.org/wiki/English_proverbs_(alphabetically_by_proverb)">
              Wikiquote&rsquo;s list of alphabetical English proverbs
            </a>
          </li>
          <li>
            <a href="https://en.wiktionary.org/wiki/Category:English_idioms">
              Wiktionary&rsquo;s English idioms
            </a>
          </li>
        </ul>
        <p>
          Using the natural language processing library,{" "}
          <a href="https://compromise.cool">compromise</a>, each saying is
          parsed into a grammatical template, with its words&rsquo; parts of
          speech and texts stored as a series of connections in a lookup table.
        </p>
        <p>
          To generate a new saying, a random grammatical template is chosen. For
          each part of speech in the template, a random word is looked up using
          the previous word&rsquo;s part of speech and text.
        </p>
        <p>
          Take, for example, the saying &ldquo;
          <span className="emphasis">a dog is a man&rsquo;s best friend</span>
          .&rdquo; Compromise tags it as follows:
        </p>
        <ul className="pos-list">
          <li>
            <span>a</span> → Determiner
          </li>
          <li>
            <span>dog</span> → Singular, Noun
          </li>
          <li>
            <span>is</span> → Verb, Copula, PresentTense
          </li>
          <li>
            <span>a</span> → Determiner
          </li>
          <li>
            <span>man&rsquo;s</span> → Noun, Singular, Possessive
          </li>
          <li>
            <span>best</span> → Adjective
          </li>
          <li>
            <span>friend</span> → Noun, Singular
          </li>
        </ul>
        <p>
          When this saying&rsquo;s grammatical template is chosen for a new
          saying, it begins by looking up all{" "}
          <span className="emphasis">determiners</span> that start a saying and
          randomly chosing one of them.
        </p>
        <p>
          Let&rsquo;s say the determiner &ldquo;
          <span className="emphasis">the</span>&rdquo; is chosen. The next step
          is to look up all <span className="emphasis">singular nouns</span>{" "}
          that follow the word &ldquo;the&rdquo; used as a determiner.
        </p>
        <p>
          Let&rsquo;s say the singular noun &ldquo;
          <span className="emphasis">place</span>&rdquo; is chosen. The next
          step is to look up all{" "}
          <span className="emphasis">present tense verbs</span> that follow the
          word &ldquo;place&rdquo; used as a singular noun (as opposed to a
          verb, for example).
        </p>
        <p>
          This process repeats until each part of speech in the template has
          been filled.
        </p>
        <p>
          Finally, the app checks to make sure the generated saying isn&rsquo;t
          an exact match with any actual saying.
        </p>
        <p>
          Check out the project&rsquo;s source on{" "}
          <a href="https://github.com/davidsteinberg/sayings">GitHub</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
