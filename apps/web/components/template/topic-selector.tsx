import { Form, InputGroup } from 'react-bootstrap';
import FormGroup from './form-group';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './create-template-form';

interface TopicInputProps {
  register: UseFormRegister<Inputs>;
}

export default function TopicSelector({ register }: TopicInputProps) {
  const topics = [
    { id: 1, name: 'Education' },
    { id: 2, name: 'Quiz' },
    { id: 3, name: 'Technology' },
    { id: 4, name: 'Health' },
    { id: 5, name: 'Science' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Finance' },
    { id: 8, name: 'Sports' },
    { id: 9, name: 'Entertainment' },
    { id: 10, name: 'Travel' },
    { id: 11, name: 'Lifestyle' },
    { id: 12, name: 'History' },
    { id: 13, name: 'Art' },
    { id: 14, name: 'Music' },
    { id: 15, name: 'Gaming' },
    { id: 16, name: 'Food' },
    { id: 17, name: 'Politics' },
    { id: 18, name: 'News' },
    { id: 19, name: 'Other' },
  ];

  return (
    <FormGroup label="Topic:">
      <InputGroup hasValidation>
        <Form.Select
          required
          defaultValue=""
          {...register('topic', { required: true })}
        >
          <option value="" disabled>
            Select topic
          </option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          * This field is required
        </Form.Control.Feedback>
      </InputGroup>
    </FormGroup>
  );
}
