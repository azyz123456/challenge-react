import React, {useState} from 'react';
import './App.css';
import Question from "./Question";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DATA from "./data.js";

//use react router
//change data.js to data.json and have it still work
//change header to the computer version

function App() {
  const data = JSON.parse(DATA);
  const questionList = [];
  const [answers, setAnswers] = useState(Array.apply(null, Array(data.questions.length)).map(function () {}));
  const [resultIndex, setResultIndex] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  const resultBox = resultIndex === -1 ? null : (
    <div id="resultDiv">
      <h3 id="resultDivTitle" className="result">Congratulations!</h3>
      <p id="resultDivText" className="result">{data.results[resultIndex]}</p>
    </div>
  );
  //answers is the list of chosen options for each question i.e. ["A", "B", "C"]

  for (let i=0; i<data.questions.length; i++) {
    let question = <Question
      questionNumber={i}
      prompt={data.questions[i].prompt}
      options={data.questions[i].options}
      answer={answers[i]}
      handleClick={handleClickOption}
    />;
    questionList.push(question);
  }
  console.log(questionList);
  console.log("answers: ", answers);

  function mode(a) {
      a = a.slice().sort((x, y) => x - y);
      var bestStreak = 1;
      var bestElem = a[0];
      var currentStreak = 1;
      var currentElem = a[0];
      for (let i = 1; i < a.length; i++) {
        if (a[i-1] !== a[i]) {
          if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            bestElem = currentElem;
          }
          currentStreak = 0;
          currentElem = a[i];
        }
        currentStreak++;
      }
      const letter = currentStreak > bestStreak ? currentElem : bestElem;
      return letter.charCodeAt(0) - 65; //return number version of letter e.g. A --> 0, B --> 1
  };

  function handleClickOption(questionNumber, key) {    
    //if already submitted, then clicking should not do anything
    if (submitted) {
      return;
    }

    const newAnswers = answers.map((answer, index) =>
        {        
          if (index === questionNumber) {
              return answers[index] === key ? undefined : key;
          } else {
            //answer remains the same
            return answers[index];
          }
        }
    );
    setAnswers(newAnswers);
    console.log("Question #: ", questionNumber);
    console.log("Option: ", key);
  }

  function handleClickResults(e) {
    //if there is no undefined answer in answers, then show the results
    for (let i=0; i<answers.length; i++) {
      if (answers[i] === undefined) {
        return;
      }
    }
    setResultIndex(mode(answers));
    setSubmitted(true);
  }

  function handleRetake(e) {
    //reset variables
    setAnswers(Array.apply(null, Array(data.questions.length)).map(function () {}));
    setResultIndex(-1);
    setSubmitted(false);
  }

  return (
    <div className="App">
      <Navbar />
      <h1>Quiz: Do Your Parents Miss You or Do They Just Feel Obligated to Talk to You?</h1>
      <img src="https://snworksceo.imgix.net/dpn-utb/e6f44799-1365-49ec-930a-61c7c2522cc0.sized-1000x1000.jpg?w=1000" alt="6158516754_21432e9f04_o" className="img img-responsive parents"></img>
      <figcaption className="image-caption">
        <p>Photo by <a href="https://flickr.com/photos/stephen-oung/6158516754/in/photolist-6GDd5r-2givwhH-BR3qWW-nNBypT-aod1tm-o5Z7Uu-516Aoz-fXXpq-2sgmYm-ajrqZX-agikk7-iegj7-24pFv4t-4jR4bJ-516FmD-6QF5sj-4RJJwW-51aNks-4RJJCd-4RJJyw-4RJJvb-dFFiz8-sDiX-51aRTu-51aQpw-CRdQyF-Ho6w5e-4EQuuC-8H1oo-51aJ7J-VTamb6-JmDMUt-2a6dGWJ-MBap2-6MXsw2-2ozaz-ahQS2K-awu6Y-2hQ7WBv-2hPqCdc-2hQ7J13-2hQ2d6Q-516DXD-2Tf4bm-e1bVZ4-5KvTnL-4p9mjt-YDuVtG-4oYfnD-4RJJFw" target="_blank">SteFou!</a> / CC BY 2.0</p>
      </figcaption>
      <a className="author-name" href="https://www.underthebutton.com/staff/josh-campbell">JOSH CAMPBELL</a>
      <p className="publish-time">January 30, 2020 at 12:00 am</p>
      {questionList}
      {submitted ? (<button id="resultBtn" className="results-btn" onClick={handleRetake}>Retake Quiz</button>) : (<button className="results-btn" onClick={handleClickResults}>Show me my results!</button>)}
      {resultBox}
      <Footer />
    </div>
  );
}

export default App;
