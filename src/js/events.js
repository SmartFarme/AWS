function addEvents(grid, id) {
  const g = (id !== undefined ? 'grid' + id + ' ' : '');

  grid.on('added removed change', function(event, items) {
    let str = '';
    items.forEach(function(item) {
      str += ' (' + item.x + ',' + item.y + ' ' + item.w + 'x' + item.h + ')';
    });
    console.log(g + event.type + ' ' + items.length + ' items (x,y w h):' + str );
  });

  grid.on('enable', function(event) {
    const grid = event.target;
    console.log(g + 'enable');
  });

  grid.on('disable', function(event) {
    const grid = event.target;
    console.log(g + 'disable');
  });

  grid.on('dragstart', function(event, el) {
    const node = el.gridstackNode;
    const x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
    const y = el.getAttribute('gs-y');
    console.log(g + 'dragstart ' + el.textContent + ' pos: (' + node.x + ',' + node.y + ') = (' + x + ',' + y + ')');
  });

  grid.on('drag', function(event, el) {
    const node = el.gridstackNode;
    const x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
    const y = el.getAttribute('gs-y');
    // console.log(g + 'drag ' + el.textContent + ' pos: (' + node.x + ',' + node.y + ') = (' + x + ',' + y + ')');
  });

  grid.on('dragstop', function(event, el) {
    const node = el.gridstackNode;
    const x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
    const y = el.getAttribute('gs-y');
    console.log(g + 'dragstop ' + el.textContent + ' pos: (' + node.x + ',' + node.y + ') = (' + x + ',' + y + ')');
  });

  grid.on('dropped', function(event, previousNode, newNode) {
    if (previousNode) {
      console.log(g + 'dropped - Removed widget from grid:', previousNode);
    }
    if (newNode) {
      console.log(g + 'dropped - Added widget in grid:', newNode);
    }
  });

  grid.on('resizestart', function(event, el) {
    const n = el.gridstackNode;
    const w = parseInt(el.getAttribute('gs-w')); // verify node (easiest) and attr are the same
    const h = parseInt(el.getAttribute('gs-h'));
    if (w !== n.w || h !== n.h) alert('resizestart missmatch');
    const rec = el.getBoundingClientRect();
    console.log(`${g} resizestart ${el.textContent} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
  });

  grid.on('resize', function(event, el) {
    const n = el.gridstackNode;
    const rec = el.getBoundingClientRect();
    console.log(`${g} resize ${el.textContent} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
  });

  grid.on('resizestop', function(event, el) {
    const n = el.gridstackNode;
    const w = parseInt(el.getAttribute('gs-w')); // verify node (easiest) and attr are the same
    const h = parseInt(el.getAttribute('gs-h'));
    if (w !== n.w || h !== n.h) alert('resizestop missmatch');
    const rec = el.getBoundingClientRect();
    console.log(`${g} resizestop ${el.textContent} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
  });
}


