import React from 'react';
import Button from '../components/atoms/Button';
import ButtonSizeVariants from '../types/enums/ButtonSizeVariants';
import ButtonColorVariants from '../types/enums/ButtonColorVariants';

export default function WelcomePage() {
  return (
    <>
      <Button>Create</Button>
      <Button
        size={ButtonSizeVariants.small}
        color={ButtonColorVariants.danger}
      >
        Create
      </Button>
    </>
  );
}
