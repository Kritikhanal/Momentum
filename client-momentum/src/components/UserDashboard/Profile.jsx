import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../index";
import Tabs from "@mui/joy/Tabs";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Box,
  Typography,
  Stack,
  Card,
  Divider,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  CardActions,
  Select,
  Option,
  Avatar,
  Modal,
} from "@mui/joy";
import {
  EditRounded as EditRoundedIcon,
  EmailRounded as EmailRoundedIcon,
  Close as CloseIcon, // Import the Close icon
} from "@mui/icons-material";
import Application from "../Application/MyApplications";
import MyResumes from "../Resume-gen/MyResume/MyResume";

export default function MyProfile() {
  const { isAuthorized, user } = useContext(Context);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    user?.profilePicture?.url || "default-image-url"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
    timezone: "1",
    bio: "",
    values: "",
    achievements: "",
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        role: user.role || "",
        timezone: user.timezone || "1",
        bio: user.bio || "",
        values: user.values || "",
        achievements: user.achievements || "",
      });
      if (user.profilePicture) {
        setPreviewImage(user.profilePicture?.url || "default-image-url");
      }
    }
  }, [user]);

  if (!isAuthorized || !user) return null;

  const isEmployer = user.role === "Employer";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsSaveEnabled(true); // Enable the Save button
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("profilePicture", profileImage);

    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updateprofile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(data.message);

      setPreviewImage(data.profilePicture?.url || "default-image-url");
      setIsSaveEnabled(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error saving profile picture"
      );
    }
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            top: { sm: -100, md: -110 },
            bgcolor: "background.body",
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Users
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                My profile
              </Typography>
            </Breadcrumbs>
            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
              My profile
            </Typography>
          </Box>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ bgcolor: "transparent" }}
          >
            <TabList
              tabFlex={1}
              size="sm"
              sx={{
                pl: { xs: 0, md: 4 },
                justifyContent: "left",
                [`&& .${tabClasses.root}`]: {
                  fontWeight: "600",
                  flex: "initial",
                  color: "text.tertiary",
                  [`&.${tabClasses.selected}`]: {
                    bgcolor: "transparent",
                    color: "text.primary",
                    "&::after": {
                      height: "2px",
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={0}
              >
                Personal Info
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={1}
              >
                My Applications
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={2}
              >
                {isEmployer ? "Achievement" : "Experience"}
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={3}
              >
                {isEmployer ? "Company Values" : "Education"}
              </Tab>
            </TabList>
          </Tabs>
          {activeTab === 1 && <Application />}
          {activeTab === 3 && <MyResumes />}
        </Box>
      </Box>

      <Stack
        sx={{
          display: "flex",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 1, md: 1 },
          py: { xs: 1, md: 1 },
        }}
      >
        {activeTab === 0 && (
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">
                {isEmployer ? "Company info" : "Personal info"}
              </Typography>

              <Typography level="body-sm">
                Customize how your profile information will appear.
              </Typography>
            </Box>
            <Divider />

            <Stack direction="row" spacing={3} sx={{ my: 1 }}>
              <Stack direction="column" spacing={1}>
                <Avatar
                  alt="Profile"
                  src={previewImage || "default-image-url"}
                  sx={{ width: 150, height: 150 }}
                />
                <IconButton
                  aria-label="edit profile picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "100%",
                    left: 130,
                    top: 190,
                    boxShadow: "sm",
                  }}
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>

            {/* ----------------- Editable Form Fields Section ---------------- */}
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>{isEmployer ? "Company Name" : "Name"}</FormLabel>
                <Input
                  size="sm"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder={isEmployer ? "Company Name" : "First name"}
                  disabled={!isEditing}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                {!isEmployer && (
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input
                      size="sm"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                )}

                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    disabled={!isEditing}
                  />
                </FormControl>
              </Stack>

              {!isEmployer && (
                <FormControl sx={{ display: "contents" }}>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    size="sm"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleFormChange}
                    disabled={!isEditing}
                  >
                    <Option value="1">Indochina Time (Bangkok)</Option>
                    <Option value="2">Hong Kong Time</Option>
                    <Option value="3">Australian Central Time</Option>
                  </Select>
                </FormControl>
              )}

              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>{isEmployer ? "Company Bio" : "Bio"}</FormLabel>
                <Textarea
                  minRows={4}
                  size="sm"
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </Stack>

            {/* ----------------- Actions (Edit/Save/Cancel) ---------------- */}
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveProfile}>
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  startDecorator={<EditRoundedIcon />}
                >
                  Edit Profile
                </Button>
              )}
            </CardActions>
          </Card>
        )}
        {/* ----------------- Profile Picture Section ---------------- */}

        {/* ---------------- Modal to show image upload options ---------------- */}
        <Modal
          open={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{ position: "relative", textAlign: "center", width: 300, p: 3 }}
          >
            <IconButton
              onClick={() => setIsImageModalOpen(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Avatar
              src={previewImage || "default-image-url"}
              alt="Profile"
              sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
            />
            <Button component="label" variant="outlined" sx={{ mb: 2 }}>
              Upload Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={!isSaveEnabled}
              variant="solid"
            >
              Save
            </Button>
          </Card>
        </Modal>
      </Stack>
    </Box>
  );
}
