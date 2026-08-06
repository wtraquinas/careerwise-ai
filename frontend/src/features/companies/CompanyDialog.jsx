import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

export default function CompanyDialog({
    open,
    onClose,
}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Add Company

            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Company Name"
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Website"
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Industry"
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Location"
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    label="Notes"
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}