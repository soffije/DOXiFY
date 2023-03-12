import React from 'react'

import { Button, Spinner } from 'react-bootstrap'

export default function Loader({
  style = 'primary',
  userLoading,
  onClick,
  buttonText,
}) {
  return userLoading === 'pending' ? (
    <Button variant={style} disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span> Loading...</span>
    </Button>
  ) : (
    <Button variant={style} onClick={onClick}>
      {buttonText}
    </Button>
  )
}
