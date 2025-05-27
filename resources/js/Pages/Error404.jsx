import React from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';

import { router } from '@inertiajs/react';

function Error404() {
  const goHome = () => router.visit('/');

  return (
    <Container className="min-h-screen flex flex-col justify-center items-center text-center">
      <Title order={1} size={60} mb="sm" fw={900} c="gray">
        404
      </Title>
      <Text size="xl" c="dimmed" mb="lg">
        Oops! The page you’re looking for doesn’t exist.
      </Text>
      <Group position="center">
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="md"
          
          onClick={goHome}
        >
          Go back home
        </Button>
      </Group>
    </Container>
  );
}

export default Error404;
