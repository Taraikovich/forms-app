import { Form, InputGroup } from 'react-bootstrap';
import FormGroup from './form-group';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './create-template-form';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/constants';
import { useEffect, useState } from 'react';

const defaultTopic = [{ id: 1, name: 'Other' }];

interface TopicInputProps {
  register: UseFormRegister<Inputs>;
}

export default function TopicSelector({ register }: TopicInputProps) {
  const [topics, setTopics] = useState(defaultTopic);

  useEffect(() => {
    async function getTopics() {
      const res = await axios.get(`${BACKEND_URL}/templates/topics`);
      setTopics(res.data);
    }
    getTopics();
  }, []);

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
            <option key={topic.id} value={topic.id}>
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
