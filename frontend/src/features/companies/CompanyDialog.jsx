import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { companySchema } from "./validation";
import { useCreateCompany } from "./hooks";

export default function CompanyDialog({
  open,
  onClose,
}) {
  const createCompany = useCreateCompany();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = (data) => {
    createCompany.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        <DialogTitle>
          Add Company
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Company Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Website"
            {...register("website")}
            error={!!errors.website}
            helperText={errors.website?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Industry"
            {...register("industry")}
            error={!!errors.industry}
            helperText={errors.industry?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Location"
            {...register("location")}
            error={!!errors.location}
            helperText={errors.location?.message}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Notes"
            {...register("notes")}
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={createCompany.isPending}
          >
            Save
          </Button>

        </DialogActions>

      </form>
    </Dialog>
  );
}