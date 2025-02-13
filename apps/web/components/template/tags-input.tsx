import { useState } from 'react';
import { Badge, Button, Form, Stack } from 'react-bootstrap';
import FormGroup from './form-group';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './create-template-form';

export default function InputTags({
  register,
}: {
  register: UseFormRegister<Inputs>;
}) {
  const [tags, setTags] = useState<string[] | []>([]);
  const [value, setValue] = useState('');

  return (
    <FormGroup label="Add tags:">
      <Stack direction="horizontal" gap={2} className="mb-2 flex-wrap">
        {tags.map((tag, i) => (
          <Badge
            key={i}
            pill
            bg="secondary"
            style={{ cursor: 'pointer' }}
            onClick={() => setTags((tags) => tags.filter((i) => i !== tag))}
          >
            {tag} <i className="bi bi-x" />
            <input
              className="visually-hidden"
              type="checkbox"
              checked
              value={tag}
              {...register('tags')}
            />
          </Badge>
        ))}
      </Stack>
      <Form.Control
        type="text"
        placeholder="Enter tag"
        maxLength={10}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className="mt-2"
        variant="outline-primary"
        size="sm"
        onClick={() => {
          if (!value) return;
          setTags((tags) => [...tags, value]);
          setValue('');
        }}
      >
        <i className="bi bi-plus-lg" /> Add
      </Button>
    </FormGroup>
  );
}
