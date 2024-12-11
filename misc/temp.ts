function parseInput(input) {
  return input.split('\n').map(line => {
    const [text, number] = line.split(' - ');
    return { text, number: parseInt(number, 10) };
  });
}


<div *ngFor="let item of data">
  <div class="align-column">
    <span class="left-align">{{ item.text }}</span>
    <span class="right-align">{{ item.number }}</span>
  </div>
</div>


.align-column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-align {
  text-align: left;
  flex-grow: 1;
}

.right-align {
  text-align: right;
  flex-shrink: 0;
}
