import React, { useEffect, useState } from 'react'
import "./App.css"
import useClipboard from "react-use-clipboard";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const App = () => {

  let {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [copyText, setCopyText] = useState('');
  const [isCopied, setCopied] = useClipboard(copyText, {
    successDuration: 1000
  });

  useEffect(() => {
    setCopyText(transcript);
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div>
      <div className="container">
        <h2>Speach to Text Converter</h2>
        <p>Sebuah WebApp yang memberi pengguna kemampuan untuk mengubah kata-kata lisan menjadi teks tertulis dengan mudah. Aplikasi ini dirancang untuk memungkinkan pengguna berbicara melalui mikrofon, dan aplikasi akan mentranskripsikan ucapan mereka ke dalam format teks secara real-time.</p>
        <div className="main-content">
          {copyText}
        </div>
        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied" : "Copy to clipboard"}
          </button>
          <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'in-en' })}>StartListening</button>
          <button onClick={SpeechRecognition.stopListening}>StopListening</button>
          <button className='reset-btn' onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
