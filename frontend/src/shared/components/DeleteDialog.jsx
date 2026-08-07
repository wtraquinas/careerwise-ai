import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteDialog({
  open,
  title = "Delete",
  itemName = "",
  description = "This action cannot be undone.",
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ mb: 1 }}
        >
          {itemName}
        </Typography>

        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}