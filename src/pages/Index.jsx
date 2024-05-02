import { useState } from 'react';
import { Box, Button, Flex, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Flex direction="column" align="center" p={5}>
      <Text fontSize="2xl" mb={4}>To-Do List</Text>
      <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} mb={4}>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          mr={2}
        />
        <Button leftIcon={<FaPlus />} colorScheme="blue" px={5} onClick={addTask}>Add</Button>
      </Flex>
      <VStack spacing={4} align="stretch" w="100%">
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Flex justify="space-between" align="center">
                <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
                <Flex>
                  <Button size="sm" onClick={() => toggleComplete(task.id)} mr={2}>
                    <FaCheck />
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => deleteTask(task.id)}>
                    <FaTrash />
                  </Button>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Flex>
  );
};

export default Index;