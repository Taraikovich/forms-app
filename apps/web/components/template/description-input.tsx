import { Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import FormGroup from './form-group';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './create-template-form';

interface DescriptionInputProps {
  register: UseFormRegister<Inputs>;
}

export default function DescriptionInput({ register }: DescriptionInputProps) {
  const [textarea, setTextarea] = useState('');

  return (
    <FormGroup label="Description:">
      <Tabs defaultActiveKey="editor">
        <Tab eventKey="editor" title="Editor">
          <InputGroup hasValidation>
            <Form.Control
              as="textarea"
              rows={3}
              value={textarea}
              required
              style={{ height: '120px' }}
              {...register('description', {
                required: true,
                onChange: (e) =>
                  setTextarea((e.target as HTMLTextAreaElement).value),
              })}
            />
            <Form.Control.Feedback type="invalid">
              * This field is required
            </Form.Control.Feedback>
          </InputGroup>
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <section
            className="border-1 p-2 bg-light"
            style={{
              height: '120px',
              overflow: 'auto',
            }}
          >
            <Markdown>{textarea}</Markdown>
          </section>
        </Tab>
      </Tabs>
      <Form.Text className="text-muted">You can use Markdown.</Form.Text>
    </FormGroup>
  );
}
