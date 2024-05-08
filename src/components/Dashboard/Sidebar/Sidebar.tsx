import { Box, Divider, List, Stack, Typography } from "@mui/material";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import generateDrawerItems from "@/utils/generateDrawerItems";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const role = "admin" as UserRole;

  const drawerOptions = generateDrawerItems(role);

  const drawer = (
    <div>
      <Divider />
      <List>
        {drawerOptions.map((item, index) => (
          <SidebarItems key={index} {...item} />
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Box>
        <Stack
          sx={{
            py: 1,
            mt: 1,
          }}
          component={Link}
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={1}
          href="/"
        >
          <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              cursor: "pointer",
            }}
          >
            PH Health Care
          </Typography>
        </Stack>
        {drawer}
      </Box>
    </>
  );
};

export default Sidebar;
