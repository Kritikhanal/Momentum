import React, { useContext } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Card,
  Divider,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  CardOverflow,
  CardActions,
  Select,
  Option,
  AspectRatio,
} from "@mui/joy";
import {
  LocationCity,
  EditRounded as EditRoundedIcon,
  EmailRounded as EmailRoundedIcon,
  AccessTimeFilledRounded as AccessTimeFilledRoundedIcon,
  InsertDriveFileRounded as InsertDriveFileRoundedIcon,
  VideocamRounded as VideocamRoundedIcon,
} from "@mui/icons-material";
import TabList from "@mui/joy/TabList";
import { tabClasses } from "@mui/joy/Tab";
import DropZone from "./DropZone";
import FileUpload from "./FileUpload";
import { Context } from "../../index";

export default function MyProfile() {
  const { isAuthorized, user } = useContext(Context);

  if (!isAuthorized || !user) return null;

  const isEmployer = user.role === "Employer";

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            {isEmployer ? "Company profile" : "My profile"}
          </Typography>
        </Box>
        <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
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
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              {isEmployer ? "Company info" : "Personal info"}
            </Tab>

            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              {isEmployer ? "Career Opportunities" : "Experience"}
            </Tab>

            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              {isEmployer ? "Company Events and Activities" : "Education"}
            </Tab>

            {!isEmployer && (
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={3}
              >
                Skills
              </Tab>
            )}
          </TabList>
        </Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">
              {isEmployer ? "Company info" : "Personal info"}
            </Typography>

            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>{isEmployer ? "Company Name" : "Name"}</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    placeholder={isEmployer ? "Company Name" : "First name"}
                  />

                  {!isEmployer && (
                    <Input
                      size="sm"
                      placeholder="Last name"
                      sx={{ flexGrow: 1 }}
                    />
                  )}
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                {!isEmployer && (
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input size="sm" defaultValue="UI Developer" />
                  </FormControl>
                )}
                {user && isEmployer && (
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Company Address</FormLabel>
                    <Input
                      size="sm"
                      type="text"
                      startDecorator={<LocationCity />}
                      placeholder="Company Address"
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                )}

                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    defaultValue="siriwatk@test.com"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>

              <div>
                {!isEmployer && (
                  <FormControl sx={{ display: { sm: "contents" } }}>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      size="sm"
                      startDecorator={<AccessTimeFilledRoundedIcon />}
                      defaultValue="1"
                    >
                      <Option value="1">
                        Indochina Time (Bangkok){" "}
                        <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                          — GMT+07:00
                        </Typography>
                      </Option>
                      <Option value="2">
                        Indochina Time (Ho Chi Minh City){" "}
                        <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                          — GMT+07:00
                        </Typography>
                      </Option>
                    </Select>
                  </FormControl>
                )}
              </div>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 85,
                    top: 180,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">
              {isEmployer ? "Company Overview" : "Bio"}
            </Typography>

            <Typography level="body-sm">
              Write a short introduction to be displayed on your profile
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={1} sx={{ my: 1 }}>
            <Typography level="body-sm">
              {isEmployer ? "Company Values and Mission" : "About Yourself"}
            </Typography>
            <Textarea
              size="sm"
              minRows={3}
              defaultValue={
                isEmployer
                  ? "We are a software development company based in Bangkok, Thailand. Our mission is to solve UI problems with neat CSS without using too much JavaScript."
                  : "I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
              }
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              275 characters left
            </FormHelperText>
          </Stack>
          {isAuthorized && isEmployer && (
            <Stack spacing={1} sx={{ my: 0.5 }}>
              <Typography level="body-sm">
                Company Achievements and Awards
              </Typography>
              <Textarea
                size="sm"
                minRows={3}
                defaultValue="We have been awarded the Best UI Design Award in 2020 and 2021."
              />
              <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                275 characters left
              </FormHelperText>
            </Stack>
          )}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        {isAuthorized && !isEmployer && (
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Portfolio projects</Typography>
              <Typography level="body-sm">
                Share a few snippets of your work.
              </Typography>
            </Box>
            <Divider />
            <Stack spacing={2} sx={{ my: 1 }}>
              <DropZone />
              <FileUpload
                icon={<InsertDriveFileRoundedIcon />}
                fileName="Tech design requirements.pdf"
                fileSize="200 kB"
                progress={100}
              />
              <FileUpload
                icon={<VideocamRoundedIcon />}
                fileName="Dashboard prototype recording.mp4"
                fileSize="16 MB"
                progress={40}
              />
            </Stack>
            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                  Cancel
                </Button>
                <Button size="sm" variant="solid">
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
