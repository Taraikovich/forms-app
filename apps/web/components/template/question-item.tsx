'use client';

import { useRef } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';

export type AnswerType = 'single_line' | 'multi_line' | 'integer' | 'checkbox';

export interface Question {
  id: string;
  title: string;
  description: string;
  answerType: AnswerType;
}

export const questionTypes: { value: AnswerType; label: string }[] = [
  { value: 'single_line', label: 'Single-line Text' },
  { value: 'multi_line', label: 'Multi-line Text' },
  { value: 'integer', label: 'Positive Integer' },
  { value: 'checkbox', label: 'Checkbox' },
];

export default function QuestionItem({
  question,
  index,
  moveQuestion,
  updateQuestion,
}: {
  question: Question;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  updateQuestion: (index: number, field: keyof Question, value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'QUESTION',
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'QUESTION',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      className="mb-2 p-2"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <Form.Group>
        <Form.Label>{`Question #${index + 1} (${questionTypes.find((q) => q.value === question.answerType)?.label})`}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            className="mb-2"
            type="text"
            placeholder="Title"
            value={question.title}
            onChange={(e) => updateQuestion(index, 'title', e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            * This field is required
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup hasValidation>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Description"
            value={question.description}
            onChange={(e) => updateQuestion(index, 'description', e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            * This field is required
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Card>
  );
}
