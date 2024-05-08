import { DrawerItem } from "@/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

const SidebarItems = (item: DrawerItem) => {
  return (
    <Link href={item.path}>
      <ListItem key={item.title} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItems;
