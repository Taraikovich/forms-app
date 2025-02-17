import { useState } from 'react';
import { Badge, Button, Form, Stack, ListGroup } from 'react-bootstrap';
import FormGroup from './form-group';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './create-template-form';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';

export default function InputTags({
  register,
}: {
  register: UseFormRegister<Inputs>;
}) {
  const [tags, setTags] = useState<string[] | []>([]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<
    { id: number; name: string }[] | []
  >([]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/templates/tags/search?q=${query}`
      );
      const data = response.data;
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

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
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {suggestions.length > 0 && (
        <ListGroup className="mt-2">
          {suggestions.map((tag) => (
            <ListGroup.Item
              key={tag.id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setTags((tags) => [...tags, tag.name]);
                setValue('');
                setSuggestions([]);
              }}
            >
              {tag.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
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
