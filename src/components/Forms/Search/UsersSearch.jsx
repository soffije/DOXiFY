import React from 'react'

import { Form } from 'react-bootstrap'

function UsersSearch({ placeholder, value, onChange }) {
  return (
    <div className="mb-2">
      <Form.Control
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default UsersSearch
