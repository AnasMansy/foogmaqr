import React from 'react'

const Test = () => {
  return (
    <aside class="control-sidebar control-sidebar-dark">
<h1>sidebar</h1>
<button class="btn btn-primary" data-widget="pushmenu">Toggle Sidebar</button>
<ul data-widget="treeview">
  <li><a href="#">One Level</a></li>
  <li class="treeview">
    <a href="#">Multilevel</a>
    <ul class="treeview-menu">
      <li><a href="#">Level 2</a></li>
    </ul>
  </li>
</ul>
  </aside>
  )
}

export default Test
