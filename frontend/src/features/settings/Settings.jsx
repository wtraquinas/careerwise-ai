import {
    useEffect,
    useState,
} from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import toast from "react-hot-toast";

import {
    AuthAPI,
    ProfileAPI,
} from "../../shared/services/api";

import AppSnackbar from "../../shared/components/AppSnackbar";

const createEmptyProfileData = () => ({
    skills: [],
    projects: [],
    experience: [],
    education: [],
    target_roles: [],
});

import {
    useProfile,
    useUploadCV,
    useUpdateProfile,
} from "./hooks";


export default function Settings() {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showSnackbar = (
        message,
        severity = "success"
    ) => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const closeSnackbar = () => {
        setSnackbar((current) => ({
            ...current,
            open: false,
        }));
    };

    const updateProfileMutation = useUpdateProfile();

    const [editingProjects, setEditingProjects] =
        useState(false);
    const [editingExperience, setEditingExperience] =
        useState(false);
    
    const saveProfileSection = (
        message = "Profile updated successfully"
    ) => {

        updateProfileMutation.mutate(
            {
                profile_data: profileData,
            },
            {
                onSuccess: () => {
                    showSnackbar(
                        message,
                        "success"
                    );
                },

                onError: (error) => {
                    console.error(error);

                    showSnackbar(
                        "Could not save profile changes",
                        "error"
                    );
                },
            }
        );

    };

    // -----------------------------------------
    // Password state
    // -----------------------------------------

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showCurrent, setShowCurrent] =
        useState(false);

    const [showNew, setShowNew] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    const [isChanging, setIsChanging] =
        useState(false);

    const [error, setError] =
        useState("");


    // -----------------------------------------
    // CV / Profile state
    // -----------------------------------------

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [profile, setProfile] =
        useState(null);

    const [profileData, setProfileData] =
        useState(createEmptyProfileData());

    const [isUploading, setIsUploading] =
        useState(false);

    const [isSavingProfile, setIsSavingProfile] =
        useState(false);

    const [profileLoading, setProfileLoading] =
        useState(true);

    const [cvError, setCvError] =
        useState("");

    const [newSkill, setNewSkill] =
        useState("");

    const [newTargetRole, setNewTargetRole] =
        useState("");




    // -----------------------------------------
    // Load Profile
    // -----------------------------------------

    const loadProfile = async () => {

        try {

            setProfileLoading(true);

            const response =
                await ProfileAPI.getProfile();

            const loadedProfile =
                response.data;

            setProfile(loadedProfile);

            setProfileData({
                ...createEmptyProfileData(),
                ...(loadedProfile.profile_data || {}),
            });

        } catch (error) {

            console.error(
                "Unable to load profile:",
                error
            );

            toast.error(
                "Unable to load career profile."
            );

        } finally {

            setProfileLoading(false);

        }

    };


    useEffect(() => {

        loadProfile();

    }, []);


    // -----------------------------------------
    // Password
    // -----------------------------------------

    const handleChangePassword = async (event) => {

        event.preventDefault();

        setError("");

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            setError(
                "Please complete all password fields."
            );

            return;

        }

        if (newPassword.length < 8) {

            setError(
                "New password must be at least 8 characters long."
            );

            return;

        }

        if (newPassword !== confirmPassword) {

            setError(
                "New password and confirmation do not match."
            );

            return;

        }

        if (currentPassword === newPassword) {

            setError(
                "New password must be different from your current password."
            );

            return;

        }

        try {

            setIsChanging(true);

            await AuthAPI.changePassword({
                current_password: currentPassword,
                new_password: newPassword,
            });

            toast.success(
                "Password changed successfully."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            const message =
                error?.response?.data?.detail ||
                "Unable to change password.";

            setError(message);

            toast.error(message);

        } finally {

            setIsChanging(false);

        }

    };


    // -----------------------------------------
    // CV Upload
    // -----------------------------------------

    const handleCVUpload = async () => {

        setCvError("");

        if (!selectedFile) {

            setCvError(
                "Please select a PDF file."
            );

            return;

        }

        if (
            selectedFile.type !==
            "application/pdf"
        ) {

            setCvError(
                "Only PDF files are supported."
            );

            return;

        }

        try {

            setIsUploading(true);

            const response =
                await ProfileAPI.uploadCV(
                    selectedFile
                );

            toast.success(
                "CV uploaded and analyzed successfully."
            );

            setSelectedFile(null);

            const uploadedProfileData =
                response.data.profile_data ||
                createEmptyProfileData();

            setProfileData({
                ...createEmptyProfileData(),
                ...uploadedProfileData,
            });

            await loadProfile();

        } catch (error) {

            const message =
                error?.response?.data?.detail ||
                "Unable to upload CV.";

            setCvError(message);

            toast.error(message);

        } finally {

            setIsUploading(false);

        }

    };


    // -----------------------------------------
    // Save Career Profile
    // -----------------------------------------

    const handleSaveProfile = async () => {

        try {

            setIsSavingProfile(true);

            const response =
                await ProfileAPI.updateProfile(
                    profileData
                );

            const updatedData =
                response.data.profile_data ||
                profileData;

            setProfileData({
                ...createEmptyProfileData(),
                ...updatedData,
            });

            setProfile((currentProfile) => ({
                ...currentProfile,
                profile_data: updatedData,
            }));

            toast.success(
                "Career profile saved successfully."
            );

        } catch (error) {

            const message =
                error?.response?.data?.detail ||
                "Unable to save career profile.";

            toast.error(message);

        } finally {

            setIsSavingProfile(false);

        }

    };


    // -----------------------------------------
    // Skills
    // -----------------------------------------

    const handleAddSkill = () => {

        const skill =
            newSkill.trim();

        if (!skill) {
            return;
        }

        const alreadyExists =
            profileData.skills.some(
                (item) =>
                    item.toLowerCase() ===
                    skill.toLowerCase()
            );

        if (alreadyExists) {

            toast.error(
                "This skill is already in your profile."
            );

            return;

        }

        setProfileData((current) => ({
            ...current,
            skills: [
                ...current.skills,
                skill,
            ],
        }));

        setNewSkill("");

    };


    const handleDeleteSkill = (skillToDelete) => {

        setProfileData((current) => ({
            ...current,
            skills:
                current.skills.filter(
                    (skill) =>
                        skill !== skillToDelete
                ),
        }));

    };


    // -----------------------------------------
    // Target Roles
    // -----------------------------------------

    const handleAddTargetRole = () => {

        const role =
            newTargetRole.trim();

        if (!role) {
            return;
        }

        const alreadyExists =
            profileData.target_roles.some(
                (item) =>
                    item.toLowerCase() ===
                    role.toLowerCase()
            );

        if (alreadyExists) {

            toast.error(
                "This target role is already in your profile."
            );

            return;

        }

        setProfileData((current) => ({
            ...current,
            target_roles: [
                ...current.target_roles,
                role,
            ],
        }));

        setNewTargetRole("");

    };


    const handleDeleteTargetRole =
        (roleToDelete) => {

            setProfileData((current) => ({
                ...current,
                target_roles:
                    current.target_roles.filter(
                        (role) =>
                            role !== roleToDelete
                    ),
            }));

        };


    // -----------------------------------------
    // Projects
    // -----------------------------------------

    const addProject = () => {

        setProfileData((current) => ({
            ...current,
            projects: [
                ...current.projects,
                {
                    name: "",
                    description: "",
                },
            ],
        }));

    };


    const updateProject =
        (index, field, value) => {

            setProfileData((current) => {

                const projects =
                    [...current.projects];

                projects[index] = {
                    ...projects[index],
                    [field]: value,
                };

                return {
                    ...current,
                    projects,
                };

            });

        };


    const deleteProject =
        (index) => {

            setProfileData((current) => ({
                ...current,
                projects:
                    current.projects.filter(
                        (_, projectIndex) =>
                            projectIndex !== index
                    ),
            }));

        };

    const saveProjects = () => {

        updateProfileMutation.mutate(
            {
                profile_data: {
                    ...profileData,
                    projects: profileData.projects,
                },
            },
            {
                onSuccess: (response) => {

                    setProfileData(
                        response.profile_data
                    );

                    setEditingProjects(false);

                    showSnackbar(
                        "Projects saved successfully"
                    );

                },

                onError: () => {

                    showSnackbar(
                        "Failed to save projects",
                        "error"
                    );

                },
            }
        );

    };

    // -----------------------------------------
    // Experience
    // -----------------------------------------

    const addExperience = () => {


        setProfileData((current) => ({
            ...current,
            experience: [
                ...current.experience,
                {
                    role: "",
                    company: "",
                    description: "",
                },
            ],
        }));

    };


    const updateExperience =
        (index, field, value) => {

            setProfileData((current) => {

                const experience =
                    [...current.experience];

                experience[index] = {
                    ...experience[index],
                    [field]: value,
                };

                return {
                    ...current,
                    experience,
                };

            });

        };


    const deleteExperience =
        (index) => {

            setProfileData((current) => ({
                ...current,
                experience:
                    current.experience.filter(
                        (_, experienceIndex) =>
                            experienceIndex !== index
                    ),
            }));

        };

    const saveExperience = () => {

        updateProfileMutation.mutate(
            {
                profile_data: profileData,
            },
            {
                onSuccess: (response) => {

                    setProfileData(
                        response.profile_data
                    );

                    setEditingExperience(false);

                    showSnackbar(
                        "Experience saved successfully"
                    );

                },

                onError: (error) => {

                    console.error(
                        "Unable to save experience:",
                        error
                    );

                    showSnackbar(
                        "Unable to save experience",
                        "error"
                    );

                },
            }
        );

    };

    // -----------------------------------------
    // Education
    // -----------------------------------------

    const addEducation = () => {

        setProfileData((current) => ({
            ...current,
            education: [
                ...current.education,
                {
                    degree: "",
                    institution: "",
                    description: "",
                },
            ],
        }));

    };


    const updateEducation =
        (index, field, value) => {

            setProfileData((current) => {

                const education =
                    [...current.education];

                education[index] = {
                    ...education[index],
                    [field]: value,
                };

                return {
                    ...current,
                    education,
                };

            });

        };


    const deleteEducation =
        (index) => {

            setProfileData((current) => ({
                ...current,
                education:
                    current.education.filter(
                        (_, educationIndex) =>
                            educationIndex !== index
                    ),
            }));

        };


    return (

        <Box
            sx={{
                maxWidth: 700,
            }}
        >

            {/* Page header */}

            <Typography
                variant="h4"
                sx={{ mb: 1 }}
            >
                Settings
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Manage your CareerWise account settings.
            </Typography>


            {/* Career Profile */}

            <Card
                sx={{
                    borderRadius: 2,
                    mb: 3,
                }}
            >

                <CardContent sx={{ p: 3 }}>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        Career Profile
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Upload your CV so CareerWise AI can
                        personalize recommendations based on
                        your skills, experience, education,
                        projects, and career goals.
                    </Typography>

                    <Divider sx={{ mb: 3 }} />


                    {profileLoading ? (

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >

                            <CircularProgress size={22} />

                            <Typography>
                                Loading career profile...
                            </Typography>

                        </Box>

                    ) : (

                        <>

                            {profile?.has_cv && (

                                <Alert
                                    severity="success"
                                    sx={{ mb: 3 }}
                                >

                                    <Typography
                                        variant="body2"
                                    >
                                        CV uploaded:
                                        {" "}
                                        <strong>
                                            {profile.cv_filename}
                                        </strong>
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 0.5 }}
                                    >
                                        Your CV information is
                                        being used to personalize
                                        CareerWise AI recommendations.
                                    </Typography>

                                </Alert>

                            )}


                            {cvError && (

                                <Alert
                                    severity="error"
                                    sx={{ mb: 3 }}
                                >
                                    {cvError}
                                </Alert>

                            )}


                            <Button
                                component="label"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            >

                                {selectedFile
                                    ? "Change CV"
                                    : "Select CV"}

                                <input
                                    hidden
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={(event) =>
                                        setSelectedFile(
                                            event.target.files?.[0]
                                            || null
                                        )
                                    }
                                />

                            </Button>


                            {selectedFile && (

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >

                                    Selected file:
                                    {" "}
                                    <strong>
                                        {selectedFile.name}
                                    </strong>

                                </Typography>

                            )}


                            <Box>

                                <Button
                                    variant="contained"
                                    onClick={handleCVUpload}
                                    disabled={
                                        !selectedFile ||
                                        isUploading
                                    }
                                >

                                    {isUploading
                                        ? "Uploading and analyzing..."
                                        : "Upload and Analyze CV"}

                                </Button>

                            </Box>

                        </>

                    )}

                </CardContent>

            </Card>


            {/* Profile Details */}

            {!profileLoading && (

                <Card
                    sx={{
                        borderRadius: 2,
                        mb: 3,
                    }}
                >

                    <CardContent sx={{ p: 3 }}>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                            }}
                        >
                            Profile Details
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Review and edit the information
                            CareerWise AI uses to personalize
                            your career recommendations.
                        </Typography>

                        <Divider sx={{ mb: 3 }} />


                        {/* Skills */}

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Skills
                        </Typography>


                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 2,
                            }}
                        >

                            {profileData.skills.length > 0
                                ? (
                                    profileData.skills.map(
                                        (skill) => (

                                            <Chip
                                                key={skill}
                                                label={skill}
                                                onDelete={() =>
                                                    handleDeleteSkill(
                                                        skill
                                                    )
                                                }
                                            />

                                        )
                                    )
                                )
                                : (

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        No skills added yet.
                                    </Typography>

                                )}

                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mb: 4,
                            }}
                        >

                            <TextField
                                fullWidth
                                size="small"
                                label="Add a skill"
                                value={newSkill}
                                onChange={(event) =>
                                    setNewSkill(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key === "Enter"
                                    ) {

                                        event.preventDefault();

                                        handleAddSkill();

                                    }

                                }}
                            />

                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddSkill}
                            >
                                Add
                            </Button>

                        </Box>


                        {/* Target Roles */}

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Target Roles
                        </Typography>


                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 2,
                            }}
                        >

                            {profileData.target_roles.length > 0
                                ? (
                                    profileData.target_roles.map(
                                        (role) => (

                                            <Chip
                                                key={role}
                                                label={role}
                                                color="primary"
                                                variant="outlined"
                                                onDelete={() =>
                                                    handleDeleteTargetRole(
                                                        role
                                                    )
                                                }
                                            />

                                        )
                                    )
                                )
                                : (

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        No target roles added yet.
                                    </Typography>

                                )}

                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mb: 4,
                            }}
                        >

                            <TextField
                                fullWidth
                                size="small"
                                label="Add a target role"
                                value={newTargetRole}
                                onChange={(event) =>
                                    setNewTargetRole(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key === "Enter"
                                    ) {

                                        event.preventDefault();

                                        handleAddTargetRole();

                                    }

                                }}
                            />

                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={
                                    handleAddTargetRole
                                }
                            >
                                Add
                            </Button>

                        </Box>


                        <Divider sx={{ mb: 4 }} />


                        {/* Projects */}

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Projects
                        </Typography>

                        {!editingProjects ? (

                            <>
                                {profileData.projects.length === 0 ? (

                                    <Typography
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        No projects added yet.
                                    </Typography>

                                ) : (

                                    profileData.projects.map(
                                        (project, index) => (

                                            <Card
                                                key={index}
                                                variant="outlined"
                                                sx={{
                                                    mb: 2,
                                                    p: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {project.name}
                                                </Typography>

                                                {project.description && (
                                                    <Typography
                                                        color="text.secondary"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        {project.description}
                                                    </Typography>
                                                )}

                                            </Card>

                                        )
                                    )

                                )}

                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() =>
                                        setEditingProjects(true)
                                    }
                                    sx={{ mb: 4 }}
                                >
                                    {profileData.projects.length > 0
                                        ? "Edit Projects"
                                        : "Add Projects"}
                                </Button>

                            </>

                        ) : (

                            <>
                                {/* Your existing editable project cards */}

                                {profileData.projects.map(
                                    (project, index) => (

                                        <Card
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    mb: 2,
                                                }}
                                            >

                                                <Typography
                                                    variant="subtitle2"
                                                >
                                                    Project {index + 1}
                                                </Typography>

                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        deleteProject(index)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                            </Box>

                                            <TextField
                                                fullWidth
                                                label="Project name"
                                                value={
                                                    project.name || ""
                                                }
                                                onChange={(event) =>
                                                    updateProject(
                                                        index,
                                                        "name",
                                                        event.target.value
                                                    )
                                                }
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={3}
                                                label="Description"
                                                value={
                                                    project.description || ""
                                                }
                                                onChange={(event) =>
                                                    updateProject(
                                                        index,
                                                        "description",
                                                        event.target.value
                                                    )
                                                }
                                            />

                                        </Card>

                                    )
                                )}

                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={addProject}
                                    sx={{ mr: 2, mb: 4 }}
                                >
                                    Add Project
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={saveProjects}
                                    disabled={
                                        updateProfileMutation.isPending
                                    }
                                    sx={{ mb: 4 }}
                                >
                                    {updateProfileMutation.isPending
                                        ? "Saving..."
                                        : "Save Projects"}
                                </Button>

                            </>

                        )}

                        {/* Experience */}

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Experience
                        </Typography>


                        {!editingExperience ? (

                            <>
                                {profileData.experience.length === 0 ? (

                                    <Typography
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        No experience added yet.
                                    </Typography>

                                ) : (

                                    profileData.experience.map(
                                        (item, index) => (

                                            <Card
                                                key={index}
                                                variant="outlined"
                                                sx={{
                                                    mb: 2,
                                                    p: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {item.role ||
                                                        "Role not specified"}
                                                </Typography>


                                                {item.company && (

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mt: 0.5 }}
                                                    >
                                                        {item.company}
                                                    </Typography>

                                                )}


                                                {item.description && (

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        {item.description}
                                                    </Typography>

                                                )}

                                            </Card>

                                        )
                                    )

                                )}


                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() =>
                                        setEditingExperience(true)
                                    }
                                    sx={{ mb: 4 }}
                                >
                                    {profileData.experience.length > 0
                                        ? "Edit Experience"
                                        : "Add Experience"}
                                </Button>

                            </>

                        ) : (

                            <>

                                {profileData.experience.map(
                                    (item, index) => (

                                        <Card
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    mb: 2,
                                                }}
                                            >

                                                <Typography
                                                    variant="subtitle2"
                                                >
                                                    Experience {index + 1}
                                                </Typography>


                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        deleteExperience(index)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                            </Box>


                                            <TextField
                                                fullWidth
                                                label="Role"
                                                value={item.role || ""}
                                                onChange={(event) =>
                                                    updateExperience(
                                                        index,
                                                        "role",
                                                        event.target.value
                                                    )
                                                }
                                                sx={{ mb: 2 }}
                                            />


                                            <TextField
                                                fullWidth
                                                label="Company"
                                                value={
                                                    item.company || ""
                                                }
                                                onChange={(event) =>
                                                    updateExperience(
                                                        index,
                                                        "company",
                                                        event.target.value
                                                    )
                                                }
                                                sx={{ mb: 2 }}
                                            />


                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={3}
                                                label="Description"
                                                value={
                                                    item.description || ""
                                                }
                                                onChange={(event) =>
                                                    updateExperience(
                                                        index,
                                                        "description",
                                                        event.target.value
                                                    )
                                                }
                                            />

                                        </Card>

                                    )
                                )}


                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={addExperience}
                                    sx={{
                                        mr: 2,
                                        mb: 4,
                                    }}
                                >
                                    Add Experience
                                </Button>


                                <Button
                                    variant="contained"
                                    onClick={saveExperience}
                                    disabled={
                                        updateProfileMutation.isPending
                                    }
                                    sx={{
                                        mb: 4,
                                    }}
                                >
                                    {updateProfileMutation.isPending
                                        ? "Saving..."
                                        : "Save Experience"}
                                </Button>

                            </>

                        )}


                        {/* Education */}

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Education
                        </Typography>


                        {profileData.education.map(
                            (item, index) => (

                                <Card
                                    key={index}
                                    variant="outlined"
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                    }}
                                >

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            mb: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="subtitle2"
                                        >
                                            Education {index + 1}
                                        </Typography>

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                deleteEducation(
                                                    index
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </Box>


                                    <TextField
                                        fullWidth
                                        label="Degree"
                                        value={
                                            item.degree || ""
                                        }
                                        onChange={(event) =>
                                            updateEducation(
                                                index,
                                                "degree",
                                                event.target.value
                                            )
                                        }
                                        sx={{ mb: 2 }}
                                    />


                                    <TextField
                                        fullWidth
                                        label="Institution"
                                        value={
                                            item.institution || ""
                                        }
                                        onChange={(event) =>
                                            updateEducation(
                                                index,
                                                "institution",
                                                event.target.value
                                            )
                                        }
                                        sx={{ mb: 2 }}
                                    />


                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        label="Additional information"
                                        value={
                                            item.description || ""
                                        }
                                        onChange={(event) =>
                                            updateEducation(
                                                index,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                    />

                                </Card>

                            )
                        )}


                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={addEducation}
                            sx={{ mb: 4 }}
                        >
                            Add Education
                        </Button>


                        <Divider sx={{ mb: 3 }} />


                        <Button
                            variant="contained"
                            onClick={handleSaveProfile}
                            disabled={isSavingProfile}
                        >

                            {isSavingProfile
                                ? "Saving profile..."
                                : "Save Career Profile"}

                        </Button>

                    </CardContent>

                </Card>

            )}


            {/* Security */}

            <Card
                sx={{
                    borderRadius: 2,
                }}
            >

                <CardContent sx={{ p: 3 }}>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        Security
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Change your CareerWise account password.
                    </Typography>

                    <Divider sx={{ mb: 3 }} />


                    {error && (

                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                        >
                            {error}
                        </Alert>

                    )}


                    <Box
                        component="form"
                        onSubmit={handleChangePassword}
                    >

                        <TextField
                            fullWidth
                            label="Current password"
                            type={
                                showCurrent
                                    ? "text"
                                    : "password"
                            }
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(
                                    event.target.value
                                )
                            }
                            sx={{ mb: 2 }}
                            autoComplete="current-password"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowCurrent(
                                                        !showCurrent
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showCurrent
                                                    ? <VisibilityOff />
                                                    : <Visibility />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />


                        <TextField
                            fullWidth
                            label="New password"
                            type={
                                showNew
                                    ? "text"
                                    : "password"
                            }
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target.value
                                )
                            }
                            sx={{ mb: 2 }}
                            autoComplete="new-password"
                            helperText="Minimum 8 characters"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowNew(
                                                        !showNew
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showNew
                                                    ? <VisibilityOff />
                                                    : <Visibility />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />


                        <TextField
                            fullWidth
                            label="Confirm new password"
                            type={
                                showConfirm
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            sx={{ mb: 3 }}
                            autoComplete="new-password"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirm(
                                                        !showConfirm
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showConfirm
                                                    ? <VisibilityOff />
                                                    : <Visibility />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />


                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isChanging}
                        >

                            {isChanging
                                ? "Changing password..."
                                : "Change Password"}

                        </Button>

                    </Box>

                </CardContent>

            </Card>
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={closeSnackbar}
            />

        </Box>

    );

}

