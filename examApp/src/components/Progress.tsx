import { ProgressProps } from "../assets/models/models";

const Progress: React.FC<ProgressProps> = ({ currentQuestionIndex, totalQuestions }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {[...Array(totalQuestions)].map((_, index) => (
          <div
            key={index}
            style={{
              width: '30px',
              height: '10px',
              backgroundColor: index <= currentQuestionIndex ? '#61dafbaa' : 'white',
              border: '1px solid black',
              margin: '0 5px',
            }}
          />
        ))}
      </div>
    );
  };

  export default Progress;
