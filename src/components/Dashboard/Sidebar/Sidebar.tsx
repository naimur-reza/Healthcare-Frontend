import { Box, Divider, List, Stack, Typography } from "@mui/material";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import generateDrawerItems from "@/utils/generateDrawerItems";
import SidebarItems from "./SidebarItems";
import { UserRole } from "@/types";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const userInfo = getUserInfo();

  const [userRole, setUserRole] = useState<UserRole>();

  useEffect(() => {
    const { role } = userInfo;
    setUserRole(role);
  }, []);

  const drawerOptions = generateDrawerItems(userRole);

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
