const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '../docs/commercetools/api-client.md')

function extractSlot (slot, file) {
  const data = fs.readFileSync(file, 'utf8');
  const start = "<!-- @partial " + slot + " -->"
  const end = "<!-- @partial-end " + slot + " -->"
  return data.substring(
    data.lastIndexOf(start) + start.length + 1, 
    data.lastIndexOf(end)
  );
}


/**
 * TODO:
 * CHANGE TO: @partial { name } and @partial-end { name }
 */
function getSlotValues(file) {
  const data = fs.readFileSync(file, 'utf8');
  const slotNames =  data.match(/@partial-end (.*)-->/g).map(el => el.replace('@partial-end ', '').replace(' -->',''));

  return slotNames.map(slot => { return { name: slot, content: extractSlot(slot, file) }})
}

console.log(getSlotValues(dir))