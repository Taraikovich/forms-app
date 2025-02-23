import React, { useState, useCallback } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import QuestionItem, {
  AnswerType,
  Question,
  questionTypes,
} from './question-item';
import FormGroup from './form-group';

export default function AddQuestion({
  questions,
  onAddQuestion,
}: {
  questions: Question[] | [];
  onAddQuestion: React.Dispatch<React.SetStateAction<Question[] | []>>;
}) {
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: Date.now().toString(),
    title: '',
    description: '',
    answerType: 'single_line',
  });

  const moveQuestion = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      onAddQuestion((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(dragIndex, 1);
        if (moved) {
          updated.splice(hoverIndex, 0, moved);
        }
        return updated;
      });
    },
    [onAddQuestion]
  );

  const updateQuestion = useCallback(
    (index: number, field: keyof Question, value: string) => {
      onAddQuestion((prev) =>
        prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
      );
    },
    [onAddQuestion]
  );

  const addQuestion = () => {
    onAddQuestion((prev) => [
      ...prev,
      { ...newQuestion, id: Date.now().toString() },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FormGroup label="Add question:">
        {questions.map((question, i) => (
          <div key={question.id}>
            <Button
              variant="outline-danger"
              size="sm"
              style={{ position: 'absolute', right: '5%', zIndex: '100' }}
              onClick={() => {
                onAddQuestion((prev) =>
                  prev.filter((q) => q.id !== question.id)
                );
              }}
            >
              <i className="bi bi-x-lg"></i>
            </Button>
            <QuestionItem
              question={question}
              index={i}
              moveQuestion={moveQuestion}
              updateQuestion={updateQuestion}
            />
          </div>
        ))}

        <FormGroup label="New question:">
          <Stack direction="horizontal">
            <p className="m-0 p-0">Answer type:</p>
            <Form.Select
              className="m-1"
              style={{ maxWidth: '165px' }}
              value={newQuestion.answerType}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  answerType: e.target.value as AnswerType,
                })
              }
            >
              {questionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Select>
            <Button variant="outline-primary" onClick={addQuestion}>
              <i className="bi bi-plus-lg" /> Add
            </Button>
          </Stack>
        </FormGroup>
      </FormGroup>
    </DndProvider>
  );
}
