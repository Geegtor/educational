export default function ResultsOutput (props: Record<string, string>) {

    return (
        <div className="results">
            <p>
                {props.result}
            </p>
        </div>
    )
}
