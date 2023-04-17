import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const pages = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Users",
    url: "/users",
  },
  {
    title: "Profile",
    url: "/profile",
  },
];

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters sx={{ mx: 3 }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 500,
            }}
          >
            LEARN APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                href={page.url}
                sx={{ m: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <Avatar alt="Remy Sharp" src=" " />
            <Button
              size="small"
              sx={{
                ml: 3,
                height: "fit-content",
                fontWeight: 500,
                fontSize: 12,
                color: "white",
                backgroundColor: "#fe4d45",
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
