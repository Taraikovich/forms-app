import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button, Card, Form, Stack } from 'react-bootstrap';
import FormGroup from './form-group';
import { Inputs } from './create-template-form';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface ImageInputProps {
  register: UseFormRegister<Inputs>;
  errors?: FieldErrors<Inputs>;
}

export default function ImagePicker({ register, errors }: ImageInputProps) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const imageInput = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register('image', { required: true });

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <FormGroup label="Add cover:">
      <Stack direction="horizontal" gap={2} className="align-items-start">
        <Form.Control
          className="visually-hidden"
          type="file"
          accept="image/png image/jpeg"
          {...rest}
          name="image"
          ref={(e) => {
            ref(e);
            imageInput.current = e;
          }}
          onChange={(e) => {
            handleImageChange(e as React.ChangeEvent<HTMLInputElement>);
            if (rest.onChange) {
              rest.onChange(e);
            }
          }}
        />
        <Card
          style={{
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {!pickedImage && (
            <Form.Text className="text-muted">No image</Form.Text>
          )}
          {pickedImage && typeof pickedImage === 'string' && (
            <Image src={pickedImage} alt="User's image" fill />
          )}
        </Card>
        <Button
          type="button"
          variant="outline-primary"
          onClick={handlePickClick}
        >
          <i className="bi bi-upload" /> Upload
        </Button>
        {errors?.image && (
          <span className="text-danger">* This field is required</span>
        )}
      </Stack>
    </FormGroup>
  );
}
