import React from 'react';

interface Props {
  valueCounter: number;
  setCounter: (a: number) => void;
  setProgress: (a: number) => void;
  setAnswerReponse: (a: { id: string; answer: string; reponse: string }[]) => void;
  setForm: (a: { Q1: string; Q2: string; Q3: string; Q4: string; Q5: string }) => void;
  form: { Q1: string; Q2: string; Q3: string; Q4: string; Q5: string };
  answerReponse: { id: string; answer: string; reponse: string }[];
}

export default function Stepper({
  valueCounter,
  setCounter,
  setProgress,
  setAnswerReponse,
  setForm,
  answerReponse,
  form,
}: Props) {
  const specialPercentage: { [field: number]: string } = {
    1: '0px',
    2: '100px',
    3: '180px',
    4: '250px',
    5: '100%',
  };
  const questions = [{ field: 'Q1' }, { field: 'Q2' }, { field: 'Q3' }, { field: 'Q4' }, { field: 'Q5' }];
  return (
    <div className=" flex gap-6 relative">
      <div style={{ border: 'dashed 1px rgb(173, 167, 167)' }} className="w-full h-px absolute top-1/2 bg-grey-900" />
      <div style={{ width: specialPercentage[valueCounter] }} className="  h-1 absolute top-1/2 bg-green" />
      {questions.map((e, i) => (
        <div
          onClick={() => {
            if (valueCounter >= i + 1) {
              const keyForm: string = `Q${valueCounter - 1}`;
              setAnswerReponse([...answerReponse.filter((ee) => ee?.id !== keyForm)]);
              setForm({ ...form, [keyForm]: '' });
              setCounter(i + 1);
              setProgress((i + 1) * 20);
            }
          }}
          style={{ backgroundColor: valueCounter >= i + 1 ? 'rgba(0, 161, 162)' : 'rgb(173 167 167)' }}
          className={`w-12 h-12 z-10 rounded-full flex justify-center items-center text-xl text-white ${
            valueCounter >= i + 1 && 'cursor-pointer'
          }`}
        >
          {e?.field}
        </div>
      ))}
    </div>
  );
}
