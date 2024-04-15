import { useRef } from "react"
import { findMissingNumber } from "../utils/helpers";

export default function SequenceInput (props: Record<string, CallableFunction>) {
    const inputRef = useRef(null);

    const checkInputSequence = () => props.handler((result:string) => {
        
        if (inputRef.current && (inputRef.current as HTMLInputElement).value) {
            result = String(findMissingNumber((inputRef.current as HTMLInputElement).value))
            return result === "NaN" ?  "Value is not found" : result; 
        }
        return "Sequence first missing number here";
    })

    return (
    <>
        <p>
            Enter the numeric sequence below and hit <code>Check</code> button
        </p>
        <input
            ref={inputRef}
            className="input" 
            placeholder="[5, 0, 1, 3, 2]"
        />
        <button id="checkButton" onClick={checkInputSequence}>
            Check
        </button>
    </>
    )
}
