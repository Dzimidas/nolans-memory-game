import "./App.css";
import { useState, useEffect } from "react";
import ColorCard from "./components/ColorCard";
import timeout from "./utilites/timeout";

function App() {
  const [isOn, setIsOn] = useState(false);
  const initPlay = {
    isDisplayed: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initPlay);
  const [flashColor, setFlashColor] = useState("");

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplayed: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplayed) {
      let newColor = "color" + Math.floor(Math.random() * 9);

      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplayed]);

  useEffect(() => {
    if (isOn && play.isDisplayed && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplayed, play.colors.length]);

  async function displayColors() {
    await timeout(300);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(300);
      setFlashColor("");
      await timeout(300);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplayed: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function cardClickHandler(color) {
    if (!play.isDisplayed && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();

      setFlashColor(color);

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(300);
          setPlay({
            ...play,
            isDisplayed: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(300);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(300);
      setFlashColor("");
      await timeout(300);
    }
  }

  function closeHandle() {
    setIsOn(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isOn && (play.isDisplayed || play.userPlay) && (
          <div className="score">{play.score}</div>
        )}
        <div className="cardWrapper">
          <ColorCard
            color="color0"
            onClick={() => {
              cardClickHandler("color0");
            }}
            flash={flashColor === "color0"}
          />
          <ColorCard
            color="color1"
            onClick={() => {
              cardClickHandler("color1");
            }}
            flash={flashColor === "color1"}
          />
          <ColorCard
            color="color2"
            onClick={() => {
              cardClickHandler("color2");
            }}
            flash={flashColor === "color2"}
          />
          <ColorCard
            color="color3"
            onClick={() => {
              cardClickHandler("color3");
            }}
            flash={flashColor === "color3"}
          />
          <ColorCard
            color="color4"
            onClick={() => {
              cardClickHandler("color4");
            }}
            flash={flashColor === "color4"}
          />
          <ColorCard
            color="color5"
            onClick={() => {
              cardClickHandler("color5");
            }}
            flash={flashColor === "color5"}
          />
          <ColorCard
            color="color6"
            onClick={() => {
              cardClickHandler("color6");
            }}
            flash={flashColor === "color6"}
          />
          <ColorCard
            color="color7"
            onClick={() => {
              cardClickHandler("color7");
            }}
            flash={flashColor === "color7"}
          />
          <ColorCard
            color="color8"
            onClick={() => {
              cardClickHandler("color8");
            }}
            flash={flashColor === "color8"}
          />
        </div>
        {isOn && !play.isDisplayed && !play.userPlay && play.score && (
          <div className="score"> 
            <div>Final Score: {play.score}</div>
            <button onClick={closeHandle} className="restartButton">Click here to play again</button>
          </div>
        )}

        {!isOn && !play.score && (
          <button onClick={startHandle} className="startButton">
            Click here to start
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
