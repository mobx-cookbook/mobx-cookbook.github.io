import React from 'react'

function ReadContainer(props) {
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: 56 }}>
      <span
        style={{
          color: '#fff',
          fontSize: 32,
        }}
      >
        {props.children}
      </span>
    </div>
  )
}

export default ReadContainer
