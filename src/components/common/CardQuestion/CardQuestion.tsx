import Button from 'components/Button';
import Progress from 'components/common/ProgressCircle/CircleProgress';
import PreviousIcon from 'components/icons/Previous';
import React from 'react';
import classNames from 'utils/classNames';
import classes from './CardQuestion.module.scss';
import Stepper from './Stepper';

interface CardQuestionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  desc: string;
  valueCounter: number;
  counter: number;
  valueProgress: number;
  possibleAnswersLength: number;
  hiddenValue: boolean;
  yesFunction: (a: string) => void;
  noFunction: (a: string) => void;
  idkFunction: (a: string) => void;
  backFunction: () => void;
  setCounter: (a: number) => void;
  setProgress: (a: number) => void;
  setAnswerReponse: (a: { id: string; answer: string; reponse: string }[]) => void;
  setForm: (a: { Q1: string; Q2: string; Q3: string; Q4: string; Q5: string }) => void;
  form: { Q1: string; Q2: string; Q3: string; Q4: string; Q5: string };
  answerReponse: { id: string; answer: string; reponse: string }[];
}

const CardQuestion: React.FC<CardQuestionProps> = ({
  desc,
  valueCounter,
  valueProgress,
  hiddenValue,
  possibleAnswersLength,
  yesFunction,
  noFunction,
  idkFunction,
  backFunction,
  setCounter,
  setProgress,
  setAnswerReponse,
  setForm,
  form,
  answerReponse,
  ...rest
}) => {
  return hiddenValue ? (
    <div className={classNames('flex flex-col bg-white text-black  w-full pb-12 sm:pb-4', classes.container)}>
      <div {...rest} className="flex flex-col  items-center p-2 w-full">
        <Stepper
          form={form}
          answerReponse={answerReponse}
          setForm={setForm}
          setAnswerReponse={setAnswerReponse}
          setCounter={setCounter}
          setProgress={setProgress}
          valueCounter={valueCounter}
        />
        <div className="mt-4 ml-16">
          <Progress value={valueCounter} valueProgress={valueProgress} />
        </div>
        <div className=" font-semibold sm:font-medium text-22 text-blue-600 h-20 flex items-center justify-center sm:mt-4 text-center 3xl:w-7/12 sm:text-base md:text-base  sm:w-10/12 md:w-9/12 lg:w-11/12 md:justify-start md:text-left">
          {desc.replace(/^./, desc[0].toUpperCase())}
        </div>

        <div className="flex-col flex relative items-center justify-center  h-40 rounded-md  mt-16 sm:mt-5  lg:w-6/12 3xl:w-3/12 2xl:w-4/12 sm:w-10/12 md:w-9/12">
          <Button className="w-full mb-4" variant="octoExtraordinary" onClick={() => yesFunction(desc)}>
            <div className="flex h-10 items-center justify-center w-full">
              <div className="xl:text-sm "> Oui</div>
            </div>
          </Button>
          <Button className="w-full  mb-4" variant="septenary" onClick={() => noFunction(desc)}>
            <div className="flex h-10 items-center justify-center w-full">
              <div className="xl:text-sm "> Non</div>
            </div>
          </Button>
          {possibleAnswersLength === 3 && (
            <Button className="w-full h-20" variant="octonary" onClick={() => idkFunction(desc)}>
              <div className="flex h-10 items-center justify-center  w-full">
                <div className="xl:text-sm "> Ne sait pas</div>
              </div>
            </Button>
          )}
          {valueCounter !== 1 && (
            <div
              className="w-full mt-4 flex  items-center sm:ml-0 cursor-pointer text-blue-650 hover:text-green"
              onClick={backFunction}
            >
              <PreviousIcon height="15" width="10" />
              <div className="xl:text-sm  underline cursor-pointer ml-1 "> Question précédente</div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default CardQuestion;
