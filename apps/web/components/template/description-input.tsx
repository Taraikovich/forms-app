import { Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import FormGroup from './form-group';
import Markdown from 'react-markdown';
import { Control, UseFormRegister, useWatch } from 'react-hook-form';
import { Inputs } from './create-template-form';

interface DescriptionInputProps {
  register: UseFormRegister<Inputs>;
  control: Control<Inputs>;
}

export default function DescriptionInput({
  register,
  control,
}: DescriptionInputProps) {
  const description = useWatch({
    control,
    name: 'description',
    defaultValue: '',
  });
  return (
    <FormGroup label="Description:">
      <Tabs defaultActiveKey="editor">
        <Tab eventKey="editor" title="Editor">
          <InputGroup hasValidation>
            <Form.Control
              as="textarea"
              rows={3}
              required
              style={{ height: '120px' }}
              {...register('description', {
                required: true,
              })}
            />
            <Form.Control.Feedback type="invalid">
              * This field is required
            </Form.Control.Feedback>
          </InputGroup>
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <section
            className="border-1 p-2"
            style={{
              height: '120px',
              overflow: 'auto',
            }}
          >
            <Markdown>{description}</Markdown>
          </section>
        </Tab>
      </Tabs>
      <Form.Text className="text-muted">You can use Markdown.</Form.Text>
    </FormGroup>
  );
}
