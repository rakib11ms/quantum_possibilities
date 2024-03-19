import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

export default function DeleteModal({ open, handleClose,handleDelete}) {
  return (
    <div>
          <Dialog
              open={open}
              onClose={handleClose}
              // fullWidth
              maxWidth='md'
          >
              <DialogTitle>
                  Do you really want to delete?
              </DialogTitle>

              <DialogActions>
                  <Button size="small" variant='contained' onClick={handleClose}>Cancel</Button>
                  <Button size="small" variant="contained" color="error" onClick={handleDelete} autoFocus>
                      Confirm
                  </Button>
              </DialogActions>
          </Dialog>
    </div>
  )
}
