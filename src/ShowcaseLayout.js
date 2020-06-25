import React, { useState, useEffect } from 'react'
import lodash from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)

const generateLayout = () => {
  return lodash.range(0, 25).map((empty, index) => {
    const y = Math.ceil(Math.random() * 4) + 1
    return {
      x: (lodash.random(0, 5) * 2) % 12,
      y: Math.floor(index / 6) * y,
      w: 2,
      h: y,
      i: index.toString(),
      static: Math.random() < 0.05,
    }
  })
}

const generateGrid = layouts => {
  return layouts.lg.map((item, index) => {
    return (
      <div key={index} className={item.static ? 'static' : ''}>
        {item.static ? (
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            Static - {index}
          </span>
        ) : (
          <span className="text">{index}</span>
        )}
      </div>
    )
  })
}

const ShowcaseLayout = ({
  className = 'layout',
  rowHeight = 30,
  onLayoutChange = () => {},
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout = { lg: generateLayout() },
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [compactType, setCompactType] = useState('vertical')
  const [mounted, setMounted] = useState(false)
  const [layouts, setLayouts] = useState(initialLayout)

  const settings = {
    className,
    rowHeight,
    onLayoutChange,
    cols,
    initialLayout,
    layouts,
    compactType,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const onCompactTypeChange = () => {
    setCompactType(oldCompactType => {
      if (oldCompactType === 'horizontal') {
        return 'vertical'
      } else if (oldCompactType === 'vertical') {
        return null
      } else {
        return 'horizontal'
      }
    })
  }

  const layout = () => setLayouts({ lg: generateLayout() })

  return (
    <section>
      <div>
        <p>
          Current Breakpoint: {currentBreakpoint} ({cols[currentBreakpoint]}{' '}
          columns) <br />
          Compaction type: {lodash.capitalize(compactType) || 'No Compaction'}
        </p>
        <button onClick={layout}>Generate New Layout</button>
        <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      </div>
      {/* Grid */}
      <ResponsiveReactGridLayout
        {...settings}
        onBreakpointChange={setCurrentBreakpoint}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        preventCollision={!compactType}
      >
        {generateGrid(layouts)}
      </ResponsiveReactGridLayout>
    </section>
  )
}

export default ShowcaseLayout
