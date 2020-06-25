import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ShowcaseLayout from './ShowcaseLayout'

const stringifyLayout = layout => {
  return layout.map(item => {
    return (
      <div className="layoutItem" key={item.i}>
        <b>{item.i}</b>: [{item.x}, {item.y}, {item.w}, {item.h}]
      </div>
    )
  })
}

const App = () => {
  const [layout, setLayout] = useState([])
  return (
    <section>
      <header className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout(layout)}</div>
      </header>
      <ShowcaseLayout onLayoutChange={setLayout} />
    </section>
  )
}

const contentDiv = document.getElementById('root')
const gridProps = window.gridProps || {}
ReactDOM.render(React.createElement(App, gridProps), contentDiv)
