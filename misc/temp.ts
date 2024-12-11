function parseInput(input) {
  return input.split('\n').map(line => {
    const [text, number] = line.split(' - ');
    return { text, number: parseInt(number, 10) };
  });
}
