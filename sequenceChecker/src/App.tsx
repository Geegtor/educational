import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import ResultsOutput from './components/ResultsOutput';
import SequenceInput from './components/SequenceInput';

function App() {
    const [result, setResult] = useState("Sequence check results area");


    return (
    <>
        <Header />
        <div className="card">
        <SequenceInput handler={setResult} />
        <ResultsOutput result = {result}/>
        </div>
    </>
    )
}

export default App
